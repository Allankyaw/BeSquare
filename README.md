# BeSquare

An app which aims to allow users to log their programming experiences and send post for each other to see.

# Technologies used

## Javascript

This app was built with Javascript, utilizing the React.js framework for front-end and Express.js framework for back-end.

## Front-end

### <a href="https://react.dev" target="_blank" >React.js</a>

This app was built with the React.js, wit h several grand components acting as pages, linked via React Router v6.11. For each page, specialized components were built to display information as required or enable functionality as desired.

### CSS & <a href="https://getbootstrap.com/" target="_blank" >Bootstrap</a>

Bootstrap was used to position elements to the center of the page as a starterstyle. As development progressed, a large majority of Bootstrap styling was gradually replaced with CSS.

## Back-end

### <a href="https://expressjs.com" target="_blank" >Express.js</a>

Express.js was used due to various packages that facilitated the construction of protected endpoints with which our front-end could communicate with our database.

### <a href="https://github.com/express-validator/express-validator" target="_blank" >Express-validator</a>

Express-validator was used to provide a layer of verification for user inputs when they attempted to register or log in to the app.

### <a href="https://github.com/kelektiv/node.bcrypt.js" target="_blank" >bcrypt</a>

This package was used to hash passwords, securing them in our database whilst preserving user’s privacy even from database administrators. As such, our server was reliant on bcrypt to compare passwords entered in with stored hashes.

### <a href="https://jwt.io" target="_blank" >JSON Web Token</a> & <a href="https://github.com/uuidjs/uuid" target="_blank" >uuid v4</a>

Post-authentication, payloads that would be sent over to the user on login, including the access and refresh tokens, were signed as JSON web tokens, with uuid providing unique, random IDs for each token.

### <a href="https://www.prisma.io/" target="_blank" >Primsma</a>

Primsa was used to allow our Express.js servers to communicate with our Postgres database.

## Database

### <a href="https://www.postgresql.org/" target="_blank" >Postgres</a>

Data used in our app was stored locally in postgresql, a SQL database.

# General Approach

The design of this app was generally meant to encompass alot more functionality once the creator become more adapt at programming. Hence for this prototype app, it was focused on ensuring that the whole PERN stack was working porperly with endpoints protected and encrypted.

<br/>

## Front-end

### Login page

A simple login page was set-up to allow users to login or navigate to register page. Once logged in, the logged in user will be directed to homepage.

### Register page

Similiar to login page, it allows new users to register or navigate to login page.

### Home page

The home page will allow users to either create a post or view all other posts made by other users. They can edit or delete their own post (in blue text).

## Back-end

### Models

#### Post Models

Post models are the backbone of this prototype and future development. It will be expended and referenced by other future models once more funtionality such as likes or comments is implemented.

#### User Model

User Models are to store all the information about the users of this App. When profile pages or saved pages are implemented, this model will be used more extensively as well.

### Controllers

There is a controller for each of the 2 models.

### Routers & Validation

Routers organized and named appropriate to the table their associated controllers were interacting with. To ensure that users do not enter empty email or password, we added a validation to check that.

## Challenges

1. Time was the biggest constraint in the development of this application. I had to learn how to use imported libaries, applications, and learning how to insert data into a SQL database.
2. Over development of components or trying to code in a way that encompass future expansion took up more time than expected.
3. Attempting to handle all the processes as a whole, instead of breaking them down into smaller, manageable tasks, proved to be counter-intuitive and led to excessive repetition in coding.

## Solutions and/or mitigation attempts

1. To resovle time issue, alot of the modofications or future information was dropped. Some components such as seeding was discard and dropped as well, data was manually inputted using CRUD.
2. To ensure the project move along within the timeframe given, line of codes was thought of to tackle one command.
3. Each additional function or user-experience (such as latest post appears on top), was modified and added bit by bit depending on their importance. For example, we ensured that the user_ID was tagged to the post and we can fetch the post data before we modify the endpoint to return post sorted by data in descending order.

# Dependencies

On top of React.js and Express.js, this app is dependent on the following packages.

## Front-end

- React <br/>`npm i react`
- React Router DOM v6.11 <br/>`npm i react-router-dom`
- JSON Web Token decode <br/>`npm i jwt-decode`

## Back-end

- Cors <br/>`npm i cors`
- Bcrypt <br/>`npm i bcrypt`
- dotenv <br/>`npm i dotenv`
- Uuid <br/>`npm i uuid`
- Mongoose <br/>`npm i mongoose`
- @prisma/client <br/> 'npm install prisma typescript ts-node @types/node --save-dev'
- Express Validator <br/>`npm i express-validator`
- Express <br/> `npm i express`

# User Stories

This app was created to help users to connect to each other via post. Future development will also include ability to make codings tutorials or challenges, either to log things learned or to share with others

## Features

### View and create post

Users view other's post or create their own.

### User authentication

Users can log in to their own individual accounts to access the app’s services, authenticated by access/refresh tokens.

# Created by

## Developers & Designer

- Allan Kyaw Hliang Soe
