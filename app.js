import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import testRoute from './routes/test.js';
import indexRoute from './routes/index.js';
import insectsRoute from './routes/insects.js';
import usersRoute from './routes/users.js';
import mongoStore from 'connect-mongo';
import cors from 'cors';

dotenv.config();

const app = express();

// JSON parsing
app.use(express.json());

// CORS 
app.use(cors({
  origin: "*",
}));

// Database connect
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Routes
app.use('/', indexRoute);
app.use('/test', testRoute);
app.use('/insects', insectsRoute);
app.use('/users', usersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
