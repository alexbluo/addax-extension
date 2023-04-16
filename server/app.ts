import express from "express";
import logger from "morgan";
import cors from "cors";
import bidderRouter from "./routes/advertiser";

const app = express();

app.use(cors());
app.use(logger("dev"));

app.use("/api/advertiser", bidderRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
