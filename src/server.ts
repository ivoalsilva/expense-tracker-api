import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
