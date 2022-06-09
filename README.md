# Node API

This is a demo project repository. This repository consists of the following

- How to get configuration (env variables and/or config files)
- How to add instrumentation
  - Defining errors and context
  - How to write logs
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
- Defining errors and context
- How to write logs
- How to report metrics
- How to set debug levels
- How to report traces

