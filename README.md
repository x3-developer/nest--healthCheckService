# HealthCheck Service

## Setup

Dependencies:

- Node.js 20
- npm

### Install dependencies

```bash
# npm
npm ci
```

### Setup environment

1. Create a `.env` file in the root directory of the project and copy the contents of the `.env.example` file into it. Fill in the necessary values.
2. Create a `sites.json` file in the root directory of the project and copy the contents of the `sites.example.json` file into it. Fill in the necessary values.

### Development

```bash
# Start the development server
npm run start:dev
```

### Production

```bash
# Build the project
npm run build
```
