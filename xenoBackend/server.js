import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import morgan from 'morgan';
import connectDB from './db.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import segementRoutes from './routes/segmentRoutes.js';
import campaignRoutes from "./routes/campaignRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

// ✅ CORRECT CORS SETUP
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders' , orderRoutes);
app.use('/api/segments', segementRoutes);
app.use("/api/campaigns", campaignRoutes);


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
