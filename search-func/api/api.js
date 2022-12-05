const url = "https://gik2f8-labs.herokuapp.com/books";

async function getAll() {
  const result = await fetch(url);
  const jsonData = result.json().catch((e) => e);

  return jsonData;
}
