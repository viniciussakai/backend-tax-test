import ExpressAdapter from "@/adapters/express-adapter";
import { InvestmentController } from "@/controller/investments";
import express from "express";

const PORT = 3333;

const app = express();
app.use(express.json());

app.get(
  "/investment/:id",
  ExpressAdapter.create(InvestmentController.getInvestment)
);

app.put(
  "/investment/:id",
  ExpressAdapter.create(InvestmentController.getInvestment)
);

app.listen(PORT, () => {
  console.log("[info] server initialized");
});
