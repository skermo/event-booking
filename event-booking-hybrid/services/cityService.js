const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAllCities() {
  const data = await fetch(`${API_URL}/cities`).then((data) => {
    return data.json();
  });
  return data;
}

export const cityService = { getAllCities };
