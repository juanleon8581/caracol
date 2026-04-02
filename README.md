# Caracol API

REST API that generates snail-filled square matrices.

## Prerequisites

- Node.js v18+
- pnpm or npm

## Setup

```bash
# Install dependencies
pnpm install       # or: npm install

# Configure environment
cp .env.example .env
```

`.env` defaults:

```
PORT=3000
NODE_ENV=development
```

## Run

**Development** (hot reload):

```bash
pnpm dev           # or: npm run dev
```

**Production**:

```bash
pnpm build && pnpm start   # or: npm run build && npm start
```

**Tests**:

```bash
pnpm test:run      # or: npm run test:run
```

## Endpoint

### `GET /api/caracol/:size`

Generates a square matrix filled in snail (spiral) order.

| Param | Type    | Required | Constraints  |
|-------|---------|----------|--------------|
| size  | integer | yes      | 3 ≤ size ≤ 15 |

**Response `200`**

```json
{
  "matrix": [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
  ],
  "diagonal": [1, 9, 5],
  "reverseDiagonal": [3, 9, 7]
}
```

**Response `400`** — invalid size:

```json
{ "message": "Size must be between 3 and 15" }
```

## API Documentation (Swagger)

```
http://localhost:3000/api-docs
```
