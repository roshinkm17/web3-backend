import express from "express";
import cors from "cors";
import { router } from "./routes";
import { serve, setup } from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/swagger", serve, setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📖 Swagger docs available at http://localhost:${PORT}/swagger`);
});
