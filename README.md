# Node API

`Note: This documentation is still in the making. Therfore, things are not in order.`

This is a demo project repository. This repository consists of the following

- How to get configuration (env variables and/or config files)
- Error Handling
- How to add instrumentation
  - How to write logs
  - How to report metrics
  - How to set debug levels
  - How to report traces
- How to write a basic api (ie, which frameworks we want to support)
- More


## Running this project
After git clone, run the following commands,

```bash
cp .env.example .env
```
Update the values if necessary.

```bash
npm install
```

```bash
npm run start
```
And it should start on the port set in your `.env`.

To run in `--watch` mode,
```bash
npm run start:dev
```

To start the project with node's debug level turned on,
```bash
chmod +x run-debug
```

```bash
./run-debug
```
It will also start the project in watch mode.

## How to get configuration (env variables and/or config files)
Our goal is to read value from the environment. This way, we can continue to develop, build
containers and even use tools like kubernetes without having to rebuilding our image everytime a single value changes.

With sensitive data, we will use secrets for that appropriate action. E.g: For kubernetes, we can use secrets manager with 3rd party encryption plugins.

### Reading Configuration Values
Instead of calling `process.env` all over our code, we will use a dedicated config service, which should respect the following interface.
```typescript
interface ConfigServiceInterface {
  source(source: ConfigSource)  
  get<Type>(arg : Type) : Type
}

enum ConfigSource {
   ENV, YML, YMAL, JSON, // etc
}
```
In simpler words, our config service will have a `get` function to retrieve values. And a `source` function that will set the source of configuration values.

For this project, we are using nest js's default config service. 

## How to add instrumentation
**Instrumentation** Instrumentation refers to an ability to monitor or measure the level of a product's performance, to diagnose errors and to write trace information.

We'll cover the following topics,
- How to write logs
- How to report metrics
- How to set debug levels
- How to report traces

## Error Handling & Reporting
To be able to make good error reports, we need to understand how we are defining them. 

- `Error` is a description of why an operation failed.
- `Context` is any information that is relevant to an error. Or an error report, which itself is not an error.
- `Error Report` is a printed representation of that error with all of its associated context.

PS: Printed refers to printing to the `stderr`, `log`, `some other methods / external services` etc. 

## Logging
Logs need to be stored as if our program was writing a journal of its execution: major branching points, processes starting, etc., errors and other unusual events.
If you are thinking of an event driven system, our events could be log states. Which could allow us to construct 
a scenario in any given point of time.

Logging should also maintain a specific struct. It will take more resources and time to manage unstructured data.
Therefore, we'll define a specific structure for logging.

Developer is not allowed to include sensitive user data in your logs, such as passwords or social security numbers.
For example, instead of logging 
```txt
Connecting to database db=foobar username=root password=secret-password
```
we could log,
```txt
Connecting to database db=foobar username=root password=[SENSITIVE-DATA]
```

## Code Comments 
While commenting is an anti-pattern, we would still prefer to write comments. Comments with context.
A comment above/inside a function, explaining the scenario is always better than having to guess by reading the code.

## Code Documentation
Every function, class, interface should be backed by doc blocks. The minimum requirement is to 
add supported jsdoc tags. Valuable context is always welcomed.

Check [supported doc blocks](https://jsdoc.app) for more information.

## Connecting to a database
To be able to support multiple databases, and the ability to swap database types / engines on an instant, 
we will use `repository` pattern. Our database layer needs to be separated from our business logic layer.

We will have `entity`, that communicates with the database via the `repository`. The repository can and will 
have multiple implementations based on the `interface`.

Which becomes,

```txt
ServiceLayer -> Repository that implements certain Interface -> Implementation -> Speaks with database
```

This way, we will also have a separation level. For example, maybe we will have a basic 
`users` table. In our application, maybe it's not that dynamic. And we can simply have 
`UserRepositoryInterface` that is being implemented by `MysqlUserRepository`. 

And we know that our `users` table will be using mysql database for the foreseeable future.
Therefore, we will not have / end up with `PostgresUserRepository`, `MongoUserRepository` etc.

But if we need to, we can have it. 

In our case, we are using [typeorm](typeorm.io) to support us with database entities and repositories.

## Connecting to the database,
We are currently using `mysql`. Our required `.env` variables are as follows,

```
# src/shared/configs/configuration.ts
database: {
		connection_name: process.env.CONNECTION_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
	},
```

The database connection is part of the `SharedModule`. And the `SharedModule` is included in the `AppModule`'s import.
Therefore, being able to provide for all modules.