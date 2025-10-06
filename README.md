# DEPRECATED
Now Effect TS have [HTTP API](https://github.com/Effect-TS/effect/tree/main/packages/platform) package which support both NODE and Bun in robust way.

The ideal setup is implement HTTP api in Monorepo package and share between backend which contains the HTTP API live and HTTP API Test implementions and HTTP API Client which can generate typesafe api for Frontend. 

This approach has many advantages like, E2E type-safety, on the fly OpenAPI spec generation, Typesafe Error handling, Logging, Opentelemetry and integrate well with Effect ecosystem.

--- 
# (Typescript + Effect-ts + Drizzle + Hono + Bun) Starter

<details>
<summary>.env</summary>

```.env
DB_URL=./path/to/sqlite/db
DB_DIALECT=sqlite         # dialect of the drizzle orm
```

</details>

<!-- ---  -->

## Features

- [Effect-ts](https://effect.website/) 
- [Drizzle](https://orm.drizzle.team/)
    - [Drizzle studio](https://orm.drizzle.team/drizzle-studio/overview) included
- [Hono](https://hono.dev/) 
    - Hono's [Zod OpenAPI](https://hono.dev/examples/zod-openapi) not included out of the box, since we use [@effect/schema](https://effect.website/docs/guides/schema/introduction)  

### Development toolkit

- [Bun](https://bun.sh/) 
- [Typescript](https://www.typescriptlang.org/)
- [EsLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

