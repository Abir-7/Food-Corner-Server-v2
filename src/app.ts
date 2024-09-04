import express from "express";
import cors from "cors";
import cookiePerser from "cookie-parser";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import noRouteError from "./app/middlewares/noRouteError";

const app = express();

app.use(express.json());
app.use(cookiePerser());

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(noRouteError);
export default app;
