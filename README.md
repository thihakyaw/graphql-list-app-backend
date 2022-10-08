# GraphQL List App

## Introduction

I use NestJS framework for this assignment because its use TypeScript and the framework is pretty mature with GraphQL. NestJS meets all the requirements for this assignment.

Nest (NestJS) is a framework for building efficient, scalable Node.js ****server-side applications.

[https://nestjs.com](https://nestjs.com/)

## Getting Started

- clone the repo to your local machine

`git clone [git@github.com](mailto:git@github.com):thihakyaw/graphql-list-app-backend.git`

- get into the project directory

`cd graphql-list-app-backend`

- create an `.env` file and setup database

paste those initial values from `.env.example` into `.env`

## Setup On Docker

If you are familiar with docker, I have also dockerized this assignment.

And add respective values. It should be something like this - 

** DB_HOST must be `mysql` and DB_PORT must be `3306`. Because the host name is base on the image name of the docker **

```json
#Database
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=graphql_list_app
DB_USERNAME=root
DB_PASSWORD=secret
```

Run `docker-compose up -d` and wait for the build to be completed. After the build has finished, you can skip to GraphQL Playground section of this document.

## Setup On Local

And add respective values. It should be something like this - 

```
#Database
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=graphql_list_app
DB_USERNAME=root
DB_PASSWORD=secret
```

** You need to create a database before you running project. Go to your mysql client and run this query **

`create database graphql_list_app;`

Or the database name you prefer

- install dependencies

`npm install`

- start the project

`npm run start:dev`

** When the project is initiated, the tables will automatically migrate to the database. **

## Run Unit Test

Due to the time limitation, we cannot run tests in docker container. Docker is only for testing the GraphQL. However, you can run test on locally by -

`npm test`

![Screen Shot 2022-10-08 at 01 11 50](https://user-images.githubusercontent.com/16256698/194687525-83636fee-3c8e-494d-a6d6-7705d7e18a74.png)


** Because of the time limitation, I wasn’t able to add `e2e`  tests. And if I have more time, I can improve my test suites with test database.**

## GraphQL Playground

When the project is successfully build, go to  GraphQL Playground [`http://localhost:3000/graphql`](http://localhost:3000/graphql)

You can start running queries in the GraphQL Playground

## Queries

### 1. Creating A List

Run this query in the GraphQL playground to create a list.

Replace the name of the list with `{{name}}` 

```graphql
mutation {
  createList(createListInput: {
    name: {{name}}
  }) {
    id, name
  }
}
```

Sample Response

```json
{
  "data": {
    "createList": {
      "id": 5,
      "name": "Final Test #2"
    }
  }
}
```

### 2. Creating A Task

Run this query in the GraphQL playground to create a task.

Replace the name of the task in `{{name}}` .

Replace the id of the list in `{{id}}`  that you previously created.

```graphql
mutation {
  createTask(createTaskInput: {
    name: {{name}},
    listId: {{id}}
  }) {
    id, name, status, order
  }
}
```

Sample Response

```json
{
  "data": {
    "createTask": {
      "id": 12,
      "name": "A New Task",
      "status": "incomplete",
      "order": 1
    }
  }
}
```

### 3. Get A List Of Lists

Run this query in the GraphQL playground to get a list of lists alongside with tasks. The tasks are in ascending order.

```graphql
{
  lists {
    id
    name
    tasks {
      id, name, status, order
    }
  }
}
```

Sample Response

```json
{
  "data": {
    "lists": [
      {
        "id": 1,
        "name": "Assignment #1",
        "tasks": [
          {
            "id": 2,
            "name": "Updating Finish in 22 hours",
	    "status": "in_progress",
            "order": 1
          },
          {
            "id": 4,
            "name": "The Sorting Order Task",
	    "status": "incomplete",
            "order": 2
          },
          {
            "id": 1,
            "name": "Finish in 72 hours",
	    "status": "incomplete",
            "order": 3
          },
          {
            "id": 5,
            "name": "Another Sorting Order Task #",
	    "status": "completed",
            "order": 4
          }
        ]
      },
      {
        "id": 2,
        "name": "Assignment #3",
        "tasks": [
          {
            "id": 3,
            "name": "Updating Another Task for #3",
	    "status": "completed",
            "order": 2
          }
        ]
      },
      {
        "id": 3,
        "name": "A list to test order",
        "tasks": [
          {
            "id": 6,
            "name": "Order Task",
	    "status": "incomplete",
            "order": 1
          },
          {
            "id": 7,
            "name": "Order Task #2",
	    "status": "incomplete",
            "order": 2
          },
          {
            "id": 8,
            "name": "Order Task #3",
	    "status": "incomplete",
            "order": 3
          }
        ]
      },
      {
        "id": 4,
        "name": "Final Test",
        "tasks": [
          {
            "id": 11,
            "name": "Update Final Task #3",
	    "status": "complete",
            "order": 1
          },
          {
            "id": 9,
            "name": "Final Task #1",
	    "status": "incomplete",
            "order": 2
          },
          {
            "id": 10,
            "name": "Final Task #2",
	    "status": "incomplete",
            "order": 3
          }
        ]
      },
      {
        "id": 5,
        "name": "Final Test #2",
        "tasks": [
          {
            "id": 12,
            "name": "A New Task",
	    "status": "incomplete",
            "order": 1
          }
        ]
      }
    ]
  }
}
```

### 4. Get One List

Run this query in the GraphQL playground to get one specific list alongside with tasks. The tasks are in ascending order.

Replace the id of the list that you want to retrieve in `{{id}}`  

```graphql
{
  list(id: {{id}}) {
    id
    name,
    tasks {
      id, name, status, order
    }
  }
}
```

Sample Response

```json
{
  "data": {
    "list": {
      "id": 5,
      "name": "Final Test #2",
      "tasks": [
        {
          "id": 12,
          "name": "A New Task",
	  "status": "incomplete",
          "order": 1
        }
      ]
    }
  }
}
```

### 5. Update The Task

Run this query in the GraphQL playground to update a task.

Replace the id of the task that you want to update in `{{id}}`  

Replace the name of the task that you want to update in `{{name}}`  

Replace the status of the task that you want to update in `{{status}}`  || The recommended status should be `incomplete`, `in_progress` and `completed`

```graphql
mutation {
  updateTask(updateTaskInput: {
    id: {{id}},
    name: {{name}},
    status: {{status}},
  }) {
    id, name, status
  }
}
```

Sample Response

```json
{
  "data": {
    "updateTask": {
      "id": 12,
      "name": "Update a Task",
      "status": "active"
    }
  }
}
```

### 6. Sort The Tasks

Run this query in the GraphQL playground to sort the tasks that is under a list.

Replace the id array of the task that is under a list in `{{[id]}}`  

example - `[11, 9, 10]` (Those `ids` needs to be part of the same one list)

**

This will sort the task in order of the array. Normally this should validate the array that are part of the same list or not. Since this assignment is time limited, I only focused on its main functionality. **

```graphql
mutation {
  updateTaskOrder(updateTaskOrder: {
    ids: {{[id]}}
  }) {
      id, name, status, order
  }
}
```

Sample Response - 

```json
{
  "data": {
    "updateTaskOrder": [
      {
        "id": 11,
        "name": "Update Final Task #3",
	"status": "completed",
        "order": 1
      },
      {
        "id": 9,
        "name": "Final Task #1",
	"status": "incomplete",
        "order": 2
      },
      {
        "id": 10,
        "name": "Final Task #2",
	"status": "incomplete",
        "order": 3
      }
    ]
  }
}
```
