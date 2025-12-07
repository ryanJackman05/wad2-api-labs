import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/tasks';
import usersRouter from './api/users';
import authenticate from './authenticate';
//... other imports
import cors from 'cors';
import './db';

dotenv.config();

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors()); // to enable CORS
app.use('/api/tasks', authenticate, tasksRouter); // Authenticator first to catch all /api/tasks requests
app.use('/api/tasks', tasksRouter); //Tasks Router
app.use('/api/users', usersRouter); //Users router
app.use(errHandler); // last middleware to catch all errors

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
