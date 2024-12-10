# To-Do List API

This is a simple to-do list API built with **Nest.js**, allowing users to manage tasks using basic CRUD operations (Create, Read, Update, Delete). This project is intended to help me practice backend development with Nest.js and explore its features, such as dependency injection, modules, and controllers.

## Features

- Create new tasks with descriptions.
- Retrieve a list of tasks.
- Update tasks (e.g., marking as completed).
- Delete tasks.
- Handle errors gracefully when the task is not found.

## Technologies Used

- **Nest.js**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **PostgreSQL** (optional, depending on your setup): A powerful, open-source relational database.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:   
   git clone https://github.com/yourusername/to-do-list.git

2. Navigate to the project directory:
   cd to-do-list

3. Install the dependencies:
   npm install

5. If you’re using PostgreSQL, make sure to set up your database and configure the connection in src/config/database.config.ts (or wherever you have configured your DB settings).
   
7.  Start the server.
   npm run start

The API will be available at http://localhost:3000.

