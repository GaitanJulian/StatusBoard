import express from "express";
import cors from "cors";
import morgan from "morgan";
import reportRoutes from "./reportRoutes";
import { config } from "./config";
import { errorHandler } from "./errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({ message: "StatusBoard API running" });
});

app.use("/reports", reportRoutes);

// siempre al final
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[server] Running on port ${config.port} (${config.env})`);
});
