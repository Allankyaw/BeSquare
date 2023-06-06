const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedData = async (req, res) => {
  try {
    // Delete all existing data
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    const usersData = Array.from({ length: 10 }, (_, index) => ({
      user_name: `User ${index + 1}`,
      user_email: `user${index + 1}@example.com`,
      user_password: "password",
    }));

    const users = await prisma.user.createMany({
      data: usersData,
      skipDuplicates: true,
    });

    console.log(`${users.length} users seeded successfully.`);

    if (!users || users.length === 0) {
      return res.json({ message: "No users created. Data seeding aborted." });
    }

    const postsData = Array.from({ length: 10 }, (_, index) => ({
      post_body: `Post ${index + 1}`,
      // user_id: users[index].user_id,
    }));

    const posts = await prisma.post.createMany({
      data: postsData,
      skipDuplicates: true,
    });

    console.log(`${posts.length} posts seeded successfully.`);

    res.json({ message: "Data seeding completed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = { seedData };
