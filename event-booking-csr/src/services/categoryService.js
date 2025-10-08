async function getAllCategories() {
  return [
    {
      id: "id1",
      name: "music",
    },
    {
      id: "id1",
      name: "art",
    },
    {
      id: "id1",
      name: "misc",
    },
  ];
}

export const categoryService = { getAllCategories };
