const base = "http://localhost:3001";

async function post(path, body) {
  const r = await fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return r.json();
}
async function get(path) {
  const r = await fetch(base + path);
  return r.json();
}
async function del(path, body) {
  const r = await fetch(base + path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return r.json();
}

(async () => {
  console.log("1) Add favorite:");
  console.log(await post("/favorites/add", { userID: "u1", itemID: "r123" }));

  console.log("2) List favorites for u1:");
  console.log(await get("/favorites?userID=u1"));

  console.log("3) Remove favorite:");
  console.log(await del("/favorites/remove", { userID: "u1", itemID: "r123" }));

  console.log("4) List again:");
  console.log(await get("/favorites?userID=u1"));
})();
