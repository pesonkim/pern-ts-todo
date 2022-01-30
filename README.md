
# Todo App

- Small drag-and-drop todo app and a learning experience with PERN stack and TypeScript specifically.
-  Features a simple Trello-like task management board for personal todo items, and a crude authentication for testing the app under different usernames. The state of todo items are linked to usernames, so you can continue any specific session by reusing the same name later. 

### [Live demo on Heroku](https://pern-ts-todo.herokuapp.com/todo/)


## Stack

- React
- Node.js
- TypeScript
- Express
- PostgreSQL

## Run locally
- **Git clone** repo
- Update the **.env** config file in root directory with valid [PostgreSQL](https://www.postgresql.org/) user credentials (one that is able to create new databases). The example format is:
```
#db config
DB_HOST=localhost
DB_USER=postgres
DB_PW=password
DB_NAME=todo
DB_PORT=5432

#server config
IP=http://localhost
PORT=5000
```
- Then while in the root directory:
	- Run `npm run init` to install all `client` and `server` dependencies.
	- Run `npm run setup` to initialise the database table. If you get an error during this, make sure your **.env** config file is correct and that your postgresql is up and running. Alternatively, you can also try running the commands from  `server/utils/postgre.sql` one by one inside your database directly.
	- Run `npm run build` to prepare the build library from compiled TypeScript and React code.
- With the above steps and your database prepared, run `npm start` to launch the your web server.
- Hosted address is displayed on your terminal window, and all requests for the server will be logged there too.
