import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

const corsOptions = {
  origin: [process.env.CORS_ORIGIN, "http://localhost:5173", "https://rmcportal.vercel.app",],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => res.send("App is healthy"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";

app.use('/', urlRoutes);
app.use('/api/url', redirectRoutes);


export default app;