# Bluebits - Admin-Contacts app

## Structure
 - Backend/server side is a barebone node/express.js server with Mongo - mocking data persistence
 - Frontend - Angular NX/NRWL Monorepo architecture with NGPrimeFaces 

## Patterns
 - On Angular side, used NX monorepo to showcase more realistic scenario for larger apps
 - In Admin app used Observable Streams flow, in Users app used NGRX - Store pattern, to cover/showcase both ways of dealing with async data flows

### Instructions

 This project was created with Node.js version 16.13.2 - handy tool for switching beetwen versions(https://github.com/nvm-sh/nvm)
  - run `npm install -g @angular/cli`
  - run `npm install -g nx`

  Start the server 
  - Cd to server folder
  - run `npm install`
  - run `npm start`
  - if it throws mongo/database error it could be IP blocking Mongo Atlas where I have test db,
  it should work since I whitelisted network access
  - in case of database access blocking configure your own mongo and update the .env file 

  Start the frontend
  - Cd to nx-public
  - run `npm install`
  - run `npm start`

  Once frontend and server compiles go to `http://localhost:4200/`, it should direct you to login
   - login with email: `admin@email.com` and password `password`, after you that can use the app
   - If above case where you need you own db instance, make sure to create `users` collection with the admin user(in `passwordHash` case use something like `https://www.devglan.com/online-tools/bcrypt-hash-generator` to generate hash from your password). 
   example: `{"isAdmin":true,"street":"","apartment":"","zip":"","city":"","country":"RS","name":"Admin","email":"admin@email.com","passwordHash":"$2a$10$9lIkLodJI27PMwMIs0Y86ukwVlUGWpmSFjVhcAWGRyybK7AFW6aby","phone":"(233) 232-3232"}`