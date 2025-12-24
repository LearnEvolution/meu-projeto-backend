import fs from "fs";

const DB_FILE = "./db.json";

export function getItems(req, res) {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  res.json(data.items);
}

export function createItem(req, res) {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));

  const newItem = {
    id: Date.now(),
    name: req.body.name
  };

  data.items.push(newItem);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  res.status(201).json(newItem);
}

export function deleteItem(req, res) {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  const id = Number(req.params.id);

  data.items = data.items.filter(item => item.id !== id);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  res.json({ message: "Item removido" });
}
