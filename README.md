# Microservice 2: Favorites Microservice

**Purpose:**
Allows users to add, delete, and view their favorites list.

## Communication Contract

### How to programmatically REQUEST data

### How to programmatically RECEIVE data

## UML Diagram
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

<!-- ![Favorities UML Diagram](https://lucid.app/publicSegments/view/e23a2660-5f2f-4e26-9c19-0cb82d88999e/image.png) -->
