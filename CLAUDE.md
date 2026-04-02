# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server with hot reload (tsx watch)
pnpm build            # Compile TypeScript to dist/
pnpm start            # Run compiled output
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once
pnpm test:coverage    # Run tests with coverage report
pnpm exec tsc --noEmit  # Type-check without emitting
```

Run a single test file:
```bash
pnpm exec vitest run src/presentation/health/health.controller.test.ts
```

## Architecture

Clean Architecture with 3 layers — domain has zero external dependencies, presentation handles HTTP only, infrastructure holds all third-party integrations.

```
src/
├── app.ts                      # Entry point: instantiates Server and starts it
├── domain/                     # Business logic — no framework imports allowed
│   ├── <feature>/
│   │   ├── dtos/               # Plain TypeScript DTOs — no Zod or external libs
│   │   ├── entities/           # Entities with no dependencies
│   │   ├── interfaces/         # Feature-level contracts
│   │   ├── repositories/       # Abstract classes defining DB/external contracts
│   │   └── use-cases/          # Orchestration and business rules
│   └── shared/errors/          # CustomError with static factory methods (badRequest, notFound, etc.)
├── presentation/               # Express layer: routes → controllers → use cases
│   ├── server.ts               # Express app setup (cors, json, swagger, router mount)
│   ├── routes.ts               # Mounts feature routers under /api
│   └── <feature>/
│       ├── <feature>.routes.ts     # Endpoint definitions + Swagger JSDoc comments
│       └── <feature>.controller.ts # Parses req, calls use case, sends res
└── infrastructure/
    ├── config/env.ts           # Typed env vars via dotenv
    ├── config/swagger.ts       # swagger-jsdoc config — scans presentation/**/*.routes.ts
    ├── external/               # Third-party SDK adapters
    ├── persistence/            # DB clients (Prisma, Pg, Mongo)
    └── services/               # Adapted utilities (logger, hash)
```

## Architecture rules

- **No barrel files (`index.ts`)** — always import directly from the file path.
  - ❌ `import { Foo } from '@/domain/feature/use-cases'`
  - ✅ `import { Foo } from '@/domain/feature/use-cases/foo.use-case'`
- **Adapter pattern** for all external libs: the contract (TS interface) lives in `domain/`, the implementation in `infrastructure/`. Never import third-party libraries directly in domain or presentation.
- **Zod** is used only in `presentation/` for request validation. Domain DTOs are plain TypeScript — no external validation libs.
- **Swagger docs** live as JSDoc comments in `*.routes.ts` files — `swagger-jsdoc` picks them up automatically.
- Use `IRouter` type annotation when exporting Express routers (required by strict TypeScript with `@types/express` v5).
- Domain layer must never import from `presentation/` or `infrastructure/`.

## Testing rules

- Framework: **Vitest** — not Jest.
- HTTP integration tests use **Supertest** against `server.getApp()` with port 0 — never spin up a real listener.
- Test files live **next to the source file** (`auth.service.ts` → `auth.service.test.ts`).
- Structure every test with **AAA** — Arrange / Act / Assert, one logical assertion per test.
- Name tests with **Describe → (Context) → It** pattern describing behavior, not implementation.
- Only mock external dependencies (DB, third-party APIs, infra services) — never mock internal logic of the unit under test. Prefer stubs over complex mocks.
- Use `clearMocks` between tests to prevent state leaks. No shared mutable state between tests.
- Use factories or fixtures for test data — no magic repeated literals.
- Coverage target: **lines > 80%**; branch coverage is more important than line coverage.
