import express from "express";
import cors from "cors";
import morgan from "morgan";
import reportRoutes from "./reportRoutes";
import { config } from "./config";


const app = express();

app.use(cors());
app.use(express.json());

// logs http de cada request
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "StatusBoard API running" });
});

app.use("/reports", reportRoutes);

app.listen(config.port, () => {
  console.log(
    `[server] Running on port ${config.port} (${config.env} mode)`
  );
});
