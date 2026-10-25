import express from "express";
import healthRoutes from "./routes/health.routes.js";
import {logger} from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import propertyRoutes from "./routes/property.routes.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
import enquiryRoutes from "./routes/enquiry.routes.js"
import path from "path";
import cors from "cors"

const app =express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(logger)

app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);

app.use("/api",healthRoutes);
app.use("/api",propertyRoutes)
app.use("/api",authRoutes)
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);
app.use("/api", enquiryRoutes);

app.use(errorHandler);

export default app;