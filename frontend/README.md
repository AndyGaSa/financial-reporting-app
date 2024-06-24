# Financial Dashboard Frontend

## Overview

This is the frontend application for the Financial Dashboard project, built with Vue.js. It displays various financial metrics and visualizations.

## Installation and Setup

### Prerequisites

- Node.js
- npm

### Installation

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Running the app:

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

#### Lints and fixes files

```
npm run lint
```

## Mock Data Notice

This project uses mock data coming from a dataset. The dataset includes a `portfolio_id` field, but for the purposes of this demo, all data is treated as part of one portfolio. Additionally, data entries without names are considered invalid.

## Components

- **SummaryCard:** Displays key financial metrics.
- **BarChart:** Visualizes balance distribution by investment type.
- **PieChart:** Visualizes balance distribution by currency.
- **LineChart:** Shows accumulated balance over years.
- **TreemapChart:** Represents detailed hierarchical data.

## Usage

1. Start the backend server (follow the backend `README` instructions).
2. Start the frontend server.
3. Access the application at `http://localhost:8080` (or the port specified by Vue).

## Docker Setup

If you prefer to run the project via Docker see the general app [README.md](https://github.com/AndyGaSa/financial-reporting-app) file.
