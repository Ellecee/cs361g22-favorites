// app.js — Favorites Microservice (CommonJS)
const express = require("express");
const app = express();
app.use(express.json());

let favorites = []; // in-memory demo store

// POST /favorites/add  { userID, itemID }
app.post("/favorites/add", (req, res) => {
  const { userID, itemID } = req.body || {};
  if (!userID || !itemID) {
    return res.status(400).json({ status: "error", message: "Missing userID or itemID" });
  }
  favorites.push({ userID, itemID });
  return res.status(201).json({ status: "success", message: "Added", favorites });
});

// GET /favorites?userID=u1
app.get("/favorites", (req, res) => {
  const { userID } = req.query;
  const list = userID ? favorites.filter(f => f.userID === userID) : favorites;
  return res.json({ status: "success", favorites: list });
});

// DELETE /favorites/remove  { userID, itemID }
app.delete("/favorites/remove", (req, res) => {
  const { userID, itemID } = req.body || {};
  const before = favorites.length;
  favorites = favorites.filter(f => !(f.userID === userID && f.itemID === itemID));
  const removed = favorites.length !== before;
  return res.json({ status: "success", removed });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Favorites service on http://localhost:${PORT}`));
