import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import testRoute from './routes/test.js';
import indexRoute from './routes/index.js';
import insectsRoute from './routes/insects.js';
import usersRoute from './routes/users.js';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());


   // JSON parsing

app.use(express.json());


// Database

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log('Connected to database'));


// Routes

app.use('/', indexRoute);
app.use('/test', testRoute);
app.use('/insects', insectsRoute);
app.use('/users', usersRoute);


   //Server
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
