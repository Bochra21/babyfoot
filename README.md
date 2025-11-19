# Babyfoot Project

## Overview
This is a RIA web application for managing Babyfoot games, featuring a frontend, backend, and a WebSocket server for live interactions. The project includes real-time game management and live chat, and a REST API.


## Features
- Add your name and create a game.
- Live game updates using WebSocket.
- Chat functionality (bonus feature).
- REST API for mobile or external integrations (bonus feature).


## How to Run

You will need **3 terminals** to run the project.

1. **Frontend**
   ```bash
   # Navigate to frontend folder
   cd frontend
   # Start HTTP server
   http-server

2. **Backend**
   ```bash
    # Navigate to backend folder
    cd backend
    # Run Node.js server
    node index.js

3. **Websocket server**
   ```bash
    # Navigate to backend folder 
    cd backend
    # Run WebSocket server
    node websocket-server.js


## Demo

### User adds their name
![User adds their name](./users.gif)

### User adds a game
![user adds a game](./add_game.gif)

### User deletes a game
![User deletes a game](./delete_game.gif)

### User sends a message
![User sends a message](./chat.gif)



