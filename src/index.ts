import express from "express";
import cors from "cors";
import { router } from "./routes";
import { serve, setup } from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

var jsonParser = bodyParser.json();

app.use(cors());

app.use("/api", jsonParser, router);
app.use("/swagger", serve, setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/swagger`);
});
