# EpiMax Backend Assessment

I was build a the RESTful API endpoints for handling CRUD operations on tasks, including task creation, update, and retrieval Using Node.js.

I was used MongoDB database to store data.

**Tasks API:** I Implement the business logic for task management, including task creation, assignment, status updates, and metrics calculation.

**Authentication and Authorization:** Implement user authentication and role-based access control to secure the backend API endpoints. mainly only can admin and manager can add, delete tasks to the database and employee can read and update the tasks and employee can`t add or delete task to the database

only can register user can access the data

## Tech Stack

**Server:** Node, Express

**Database:** MongoDB

**Dependencies:** bcrypt, mongoose, jsonwebtoken, nodemon

## API Reference For Authentication

#### Register User

```http
  POST /user/register
```

To Register New User Use These EndPoint

After successful Registration

```http
  {
   "success": true,
   "message": "User created successfully",
   "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzIxYTcyZmQ5NjZjZTIzNzE1MWEyZCIsImlhdCI6MTcxNDU1OTYwMn0.wpDCHPy6X3Z3T1V0CaFiOHMKjlf95BoJ3tYfdp7UqsY"
   }
```

#### Login User

```http
   POST /user/login
```

To Login Use This EndPoint

After successful Login we will get JWTToken

```http
  {
    "success": true,
    "message": "User logged in successfully",
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzIwNTU5MDlhZmFmNTMwYWYxZjcyMiIsImlhdCI6MTcxNDU1OTQwMH0.pUmgYE_qje5C-_rGLsS800MjnGWchAwECRPN2btd-fo"
   }
```

## API Reference For Task Table

#### Add Task

```http
  POST /tasks/add
```

To add New task Use These EndPoint

```http
  NOTE :- Only can admin and manager access to add new task
```

#### Examples

```json
{
  "title": "Create Promotion List sdfsdf",
  "description": "Create Promition Csdfsfsdandidates List",
  "status": "pending",
  "employee_id": "001"
}
```

After successful add task

```http
 {
   "status": 200,
   "message": "Task added successfully"
}
```

#### GET All Tasks

```http
   GET /tasks/
```

Use This EndPoint

After successful Login we will get JWTToken

```http
  {
  "status": 200,
  "data": [
    {
      "_id": "66321228e82e314d2fea53be",
      "title": "Create Intro",
      "description": "create a introduction video about expaining our company",
      "status": "pending",
      "user": [],
      "__v": 0
    },
    {
      "_id": "6632125de82e314d2fea53c3",
      "title": "Make sales Report",
      "description": "Make sales report fro these year",
      "status": "completed",
      "user": [],
      "__v": 0
    },
    {
      "_id": "66321277e82e314d2fea53c7",
      "title": "Make salary Report",
      "description": "Make salary report fro these year",
      "status": "pending",
      "user": [],
      "__v": 0
    },
    {
      "_id": "663212c2e82e314d2fea53cc",
      "title": "Create Employees List",
      "description": "Create Employees List report fro these year",
      "status": "pending",
      "user": [],
      "__v": 0
    },
    {
      "_id": "66321317d577ee4ec4eefb4f",
      "title": "Create Promotion List",
      "description": "Create Promition Candidates List",
      "status": "pending",
      "user": [],
      "__v": 0
    }
  ]
}
```

#### Get Single Task

```http
   GET /tasks/:id
```

use this EndPoint

after successful render

```http
    {
      "_id": "66321317d577ee4ec4eefb4f",
      "title": "Create Promotion List",
      "description": "Create Promition Candidates List",
      "status": "pending",
      "user": [],
      "__v": 0
    }
```

### Update Task

```http
   PUT /tasks/update/:id
```

use this EndPoint for update tasks

#### Example

```http
{
    "status" : "completed"
}
```

after successful update

```http
  {
    "status": 200,
    "message": "Task updated successfully"
  }
```

### Delete Task

```http
  DELETE /tasks/delete/:id
```

To delete task Use These EndPoint

```http
  NOTE :- Only can admin and manager access to add new task and must use employee_id in the body
```

#### Examples

```json
{
  "employee_id": "001"
}
```

## Authors

- [@Ravikumar](https://github.com/Ravikumar9398/)
