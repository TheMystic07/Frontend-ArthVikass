import mongoose from 'mongoose'

interface connectionObject {
    isConnected?: number;
}

const connection: connectionObject = {};

export  async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("DB Already Connected");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI! || '');
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB connection failed");
        process.exit(1);
    }
}