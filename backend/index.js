const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// async function main() {
//   //   ... you will write your Prisma Client queries here
//   const allUsers = await prisma.user.findMany();
//   console.log(allUsers);
// }
async function main() {
  await prisma.user.create({
    data: {
      user_id: 3,
      user_name: "Alice",
      user_email: "alice@alice.com",
      user_password: "alice",
      user_aboutme: "handsome",
      is_admin: 0,
    },
  });

  const allUsers = await prisma.user
    .findMany
    // include: {
    //   post: true,
    //   post_like: true,
    // },
    ();
  //   console.dir(allUsers, { depth: null });
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
