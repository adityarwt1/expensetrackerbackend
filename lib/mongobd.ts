import mongoose from "mongoose";

export const DBconnect = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "ExpenseTracker",
    });
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const DBdisconnect = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};
