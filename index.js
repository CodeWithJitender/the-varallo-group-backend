import dotenv from "dotenv";
dotenv.config();
import express from 'express';
const app = express();
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import authRouter from './src/routers/auth.routers.js';
import pageRouter from './src/routers/pageRouter.js';
import uploadRouter from './src/routers/uploadRouter.js';
import contactRouter from './src/routers/contactRouter.js';
const port = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: ['https://552a721652e2.ngrok-free.app','http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173','https://the-varallo-group-backend.vercel.app/'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer Configuration - for image uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only images
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpg, png, webp, gif)'));
    }
  },
});

// Make upload available globally
app.locals.upload = upload;

app.use('/api/auth', authRouter);
app.use('/api/pages', pageRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/contacts', contactRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB", err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Global error handler (handle multer errors and other errors)
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  if (err && err.name === 'MulterError') {
    return res.status(400).json({ success: false, message: err.message, code: err.code });
  }
  if (err) {
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 