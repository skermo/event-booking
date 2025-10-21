const API_URL = import.meta.env.VITE_API_URL;

async function getAllCategories() {
  const data = await fetch(`${API_URL}/categories`).then((data) => {
    return data.json();
  });
  return data;
}

export const categoryService = { getAllCategories };
