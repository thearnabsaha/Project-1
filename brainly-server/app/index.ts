import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './database/db';
import userRoutes from './routes/user.routes'
import contentRoutes from './routes/content.routes'
import shareRoutes from './routes/share.routes'

const morganFormat = ':method :url :status :response-time ms';

app.use(
  morgan(morganFormat)
);

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
connectDB()
app.use('/',userRoutes);
app.use('/content',contentRoutes);
app.use('/',shareRoutes);

app.listen(port, () => console.log('> Server is up and running on port: ' + port));