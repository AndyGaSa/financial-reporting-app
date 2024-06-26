# Financial Dashboard Frontend

## Overview

This is the frontend application for the Financial Dashboard project, built with Vue.js. It displays various financial metrics.

## Installation and Setup

### Prerequisites

- Node.js
- npm

### Installation

1. Navigate to the frontend directory:

```sh
cd frontend
```

2. Install dependencies

```sh
npm install
```

3. Environment Variables - Create a .env file in the backend directory with the following content:

```sh
MONGODB_URI=your_mongodb_uri
PORT=3000
```

4. Running the Server - Start the server:

```sh
npm start
```

## API Endpoints

- `GET /api/positions` - Retrieve all positions.
- `POST /api/positions` - Create a position.

## Data Import Script

The script importCsv.js into the scripts folder is used to import data from a CSV file into MongoDB.
To use it update the csvFilePath to your csv file path and navigate to your backend folder on your terminal, then execute the script using the `node` command:

```sh
node importCsv.js
```

## Testing

To run the test suite run the following command on your terminal:

```sh
npm test
```

## Docker Setup

If you prefer to run the project via Docker see the general app [README.md](https://github.com/AndyGaSa/financial-reporting-app) file.
