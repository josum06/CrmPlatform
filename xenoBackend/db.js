import mongoose from 'mongoose';


const connectDb = async () => {
  const rawUrl = process.env.MONGO_URL;
  const password = process.env.MONGO_PASSWORD;

if (!rawUrl || !password) {
  console.error("❌ MONGO_URL or MONGO_PASSWORD is missing");
  process.exit(1);
}

const url = rawUrl.replace('<password>', password);

  try {
    await mongoose.connect(url);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

export default connectDb;
