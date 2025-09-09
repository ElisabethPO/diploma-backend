import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const PORT = 5000;
const DB_URL = 'mongodb+srv://Elisabeth_Polska:fo517WOKg76DwRiY@cluster0.h3kkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const app = express()

app.use(cors({
  origin: 'http://localhost:1234',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)
app.use(express.urlencoded({ extended: true }));



mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


async function startApp() {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT' + PORT))
  } catch (e) {
    console.log(e)
  }
}

startApp()
