# Favorites Microservice

CS361 – Assignment 8 (Small Pool / Milestone #2)  
Author: Group 22

---

## Overview

The **Favorites Microservice** allows users to add, delete, and view their favorites list.

## How to run the microservice

### Install dependencies

```
npm install
```

### Start the microservice

```
npm start
```

You should see:

```
Favorites service running on http://localhost:3001
```

Leave this running in the **Terminal**.

---

### Communication Contract

The microservice runs on port **3001** and communicates using **HTTP requests** through endpoints.

Endpoints:
- `POST /favorites/add` - Adds a favorite
- `GET /favorites` - Retrieves all favorites
- `DELETE /favorites/remove` - Removes a favorite

The test program (`test_client.js`) demonstrates how a client program can request data from the microservice and receive a response.

## 1. Adding a Favorite

### Endpoint
`POST http://localhost:3001/favorites/add`

### Headers
`Content-Type: application/json`

### Request Body Example
```
{
  "userID": "u1",
  "itemID": "r123"
}
```

### Example Output
```
{
  status: 'success',
  message: 'Added',
  favorites: [ { userID: 'u1', itemID: 'r123' } ]
}
```

## 2. Favorites List

### Endpoint
`GET  http://localhost:3001/favorites`

### Headers
`Content-Type: application/json`

### Request Body Example
```
/favorites?userID=u1
```

### Example Output
```
{ 
  status: 'success', 
  removed: true 
}
```

## 3. Delete a Favorite

### Endpoint
`DELETE http://localhost:3001/favorites/remove`

### Headers
`Content-Type: application/json`

### Request Body Example
```
{
  "userID": "u1",
  "itemID": "r123"
}
```

### Example Output
```
{ 
  status: 'success', 
  favorites: [] 
}
```

---

## UML Sequence Diagram
```mermaid
---
config:
  theme: mc
---
sequenceDiagram
  participant Client
  participant Favorites Microservice
  participant Database@{ "type" : "database" }
    
    Note left of Client: When a user favorites an item, <br/>a request is sent to the microservice <br/>to add that item to the database
    Client ->> Favorites Microservice: User adds a favorite <br/>POST /favorites/add { userID, itemID }
    alt userID and itemID are valid
            Favorites Microservice->>Database: Item is added to the database <br/>favorites.push({ userID, itemID });
            Favorites Microservice-->>Client: Message: "Added"
        else userID and itemID are invalid
            Favorites Microservice-->>Client: Message: "Missing userID or itemID"
        end
    
    Note left of Client: When a user views their favorites list, <br/>a request is sent to the microservice <br/>to return that list
    Client ->> Favorites Microservice: User gets favorites list <br/>GET /favorites
    Favorites Microservice->>Database: Query the database
    Favorites Microservice-->>Client: Favorites list is shown
    
    Note left of Client: When a user deletes a favorite, <br/>a request is sent to the microservice <br/>to remove it from the database.
    Client ->> Favorites Microservice: User deletes a favorited item <br/>DELETE /favorites/remove  { userID, itemID }
    Favorites Microservice->>Database: Query the database
    Favorites Microservice-->>Client: Favorites list is shown
