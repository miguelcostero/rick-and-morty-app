# rick-and-morty-app

## backend

#### libraries

- express -> http server library
- pino, pino-http, pino-pretty -> logging helper libraries
- mongodb-memory-server -> in-memory mongodb server
- typegoose -> a helper library that allows to create mongoose orm models combined with typescript.
- joi -> schema validation
- dotenv-safe -> used to load env files in memory for testing purposes
- helmet -> set default headers for api
- body-parser -> body parser middleware
- cors -> used to enable cors
- jsonwebtoken -> used to generate and validate jwt tokens
- compression -> middleware to compress api responses

### how to run

1. Install dependencies:

```bash
cd backend
yarn
```

2. Copy example .env file

```bash
cp .env.example .env
```

3. Run app in dev mode

```bash
yarn dev
```

**NOTE:** this app runs _mongodb-in-memory-server_, so every time backend restarts all saved changes will be lost.

**Default user:**
email: `miguel@test.com`
password: `test`

ref: `backend/src/load-test-data.ts`

---

## frontend

- react -> ui lib for creating components.
- styled-components -> used to work with css in javascript.
- yup -> form schema validation
- vite -> create-react-app replacement, but easier to configure
- normilize.css -> css lib to reset all browser default styles
- redux, react-redux and @reduxjs/toolkit -> for global state management
- react-hook-form, @hookform/resolvers -> library for handling form states and validations.
- axios -> http request handler

### how to run

1. Install dependencies

```bash
cd frontend
yarn
```

2. Copy example .env file

```bash
cp .env.example .env
```

3. Run app in dev mode

```bash
yarn dev
```


-----

Miguel Costero
miguel3490@gmail.com
