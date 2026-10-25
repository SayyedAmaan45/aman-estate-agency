import "dotenv/config";

import app from "./app.js";
import connectMongoDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
  });
};

startServer();