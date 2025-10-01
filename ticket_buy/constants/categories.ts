// app/constants/categories.ts
export const categories = [
  { id: "lanches", name: "Lanches" },
  { id: "bebidas", name: "Bebidas" },
  { id: "sobremesas", name: "Sobremesas" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];