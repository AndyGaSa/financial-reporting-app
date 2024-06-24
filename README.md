# Financial Dashboard Project

## Overview

This project is a financial dashboard that visualizes various financial metrics and allows users to import new data via CSV files. The application consists of a frontend built with Vue.js and a backend using Node.js and Express.js.

## Features

- Visualize financial data with various charts (Bar, Pie/Donut, Line, Treemap).
- Import new financial data from CSV files.
- Dynamic updates of the dashboard.

## Project Structure

- `frontend/` - Contains the Vue.js frontend application.
- `backend/` - Contains the Node.js backend application.

## Installation and Setup

### Prerequisites

- Node.js
- npm (Node package manager)
- MongoDB

(optional)
- Docker
- Docker compose

### Clone the Repository

```sh
git clone https://github.com/yourusername/financial-dashboard.git
cd financial-dashboard
```

### Setup backend and frontend to run the project

See [backend/README.md](https://github.com/AndyGaSa/financial-reporting-app/tree/main/backend) and [frontend/README.md](https://github.com/AndyGaSa/financial-reporting-app/tree/main/frontend) for detailed instructions.

## Mock Data Notice

This project uses mock data coming from a dataset. The dataset includes a `portfolio_id` field, but for the purposes of this demo, all data is treated as part of one portfolio. Additionally, data entries without names are considered invalid.

## Docker Setup

If you prefer to run the project via Docker follow this steps:

2. **Adjust docker-compose.yml file to have your MongoDb url:**

Navigate to the root directory of the project and change the docker-compose.yml file line 15 to your actual MongoDb url

2. **Build Docker Image:**

Navigate to the root directory of the project and build the Docker image for the backend:

   ```sh
   docker build -t financial_dashboard_backend_image -f backend/Dockerfile ./backend
   ```

Do the same for the frontend:

   ```sh
   docker build -t financial_dashboard_frontend_image -f frontend/Dockerfile ./frontend
   ```

3. **Run Docker Compose:**

Start the services using Docker Compose from your terminal:

    ```sh
   docker-compose up --build
   ```
