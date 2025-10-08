async function getAllCities() {
  return [
    {
      id: "id1",
      name: "Sarajevo",
    },
    {
      id: "id1",
      name: "Zenica",
    },
    {
      id: "id1",
      name: "Banja Luka",
    },
  ];
}

export const cityService = { getAllCities };
