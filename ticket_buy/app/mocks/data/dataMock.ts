import { Product } from "../types/types";

const Productos: Product[] = [
  { "id": "1", "name": "Hambúrguer Clássico", "price": 18.9, "description": "Pão, hambúrguer bovino, queijo, alface, tomate e molho especial.", "image": "https://placehold.co/300x200/4f46e5/white?text=Hambúrguer", "category": "lanches" },
  { "id": "2", "name": "Cheeseburger Duplo", "price": 24.9, "description": "Dois hambúrgueres, queijo derretido, cebola caramelizada.", "image": "https://placehold.co/300x200/4f46e5/white?text=Cheeseburger", "category": "lanches" },
  { "id": "3", "name": "Refrigerante 500ml", "price": 6.5, "description": "Coca-Cola, Guaraná ou Fanta.", "image": "https://placehold.co/300x200/10b981/white?text=Refrigerante", "category": "bebidas" },
  { "id": "4", "name": "Suco Natural", "price": 8.0, "description": "Laranja, abacaxi ou limão.", "image": "https://placehold.co/300x200/10b981/white?text=Suco", "category": "bebidas" },
  { "id": "5", "name": "Milkshake de Chocolate", "price": 14.9, "description": "Sorvete de chocolate, leite e calda.", "image": "https://placehold.co/300x200/ec4899/white?text=Milkshake", "category": "sobremesas" },
  { "id": "6", "name": "Brownie com Sorvete", "price": 16.5, "description": "Brownie quente com bola de sorvete de baunilha.", "image": "https://placehold.co/300x200/ec4899/white?text=Brownie", "category": "sobremesas" },
  { "id": "7", "name": "Hambúrguer com Bacon", "price": 22.5, "description": "Hambúrguer bovino, queijo cheddar, fatias de bacon crocante e molho barbecue.", "image": "https://placehold.co/300x200/4f46e5/white?text=Bacon+Burger", "category": "lanches" },
  { "id": "8", "name": "Sanduíche de Frango Grelhado", "price": 20.9, "description": "Pão baguete, filé de frango grelhado, queijo branco, alface e tomate.", "image": "https://placehold.co/300x200/4f46e5/white?text=Frango", "category": "lanches" },
  { "id": "9", "name": "Batata Frita (Porção)", "price": 12.0, "description": "Porção generosa de batatas fritas crocantes com maionese da casa.", "image": "https://placehold.co/300x200/f97316/white?text=Batata+Frita", "category": "lanches" },
  { "id": "10", "name": "Anéis de Cebola", "price": 15.5, "description": "Anéis de cebola empanados e fritos, servidos com molho especial.", "image": "https://placehold.co/300x200/f97316/white?text=Onion+Rings", "category": "lanches" },
  { "id": "11", "name": "Água Mineral", "price": 4.0, "description": "Garrafa de 500ml, com ou sem gás.", "image": "https://placehold.co/300x200/10b981/white?text=Água", "category": "bebidas" },
  { "id": "12", "name": "Açaí na Tigela (300ml)", "price": 18.0, "description": "Açaí cremoso com banana fatiada, granola e um fio de mel.", "image": "https://placehold.co/300x200/ec4899/white?text=Açaí", "category": "sobremesas" },
  { "id": "13", "name": "Hambúrguer Vegetariano", "price": 23.5, "description": "Hambúrguer à base de plantas, queijo, rúcula, tomate seco e pão integral.", "image": "https://placehold.co/300x200/4f46e5/white?text=Veggie", "category": "lanches" },
  { "id": "14", "name": "Pizza Brotinho Mussarela", "price": 25.0, "description": "Molho de tomate fresco, queijo mussarela e orégano.", "image": "https://placehold.co/300x200/eab308/white?text=Mussarela", "category": "lanches" },
  { "id": "15", "name": "Pizza Brotinho Calabresa", "price": 27.5, "description": "Molho de tomate, mussarela, calabresa fatiada e cebola.", "image": "https://placehold.co/300x200/eab308/white?text=Calabresa", "category":"lanches" },
  { "id": "16", "name": "Pizza Brotinho Frango com Catupiry", "price": 29.9, "description": "Frango desfiado, catupiry cremoso, mussarela e milho.", "image": "https://placehold.co/300x200/eab308/white?text=Frango", "category": "lanches" },
  { "id": "17", "name": "Filé à Parmegiana", "price": 38.0, "description": "Filé bovino empanado, coberto com molho de tomate e queijo. Acompanha arroz e fritas.", "image": "https://placehold.co/300x200/ef4444/white?text=Parmegiana", "category": "lanches" },
  { "id": "18", "name": "Strogonoff de Frango", "price": 32.0, "description": "Cubos de frango ao molho cremoso de champignon. Acompanha arroz e batata palha.", "image": "https://placehold.co/300x200/ef4444/white?text=Strogonoff", "category": "lanches" },
  { "id": "19", "name": "Lasanha à Bolonhesa", "price": 35.5, "description": "Massa fresca, molho bolonhesa, presunto, queijo e molho branco gratinado.", "image": "https://placehold.co/300x200/ef4444/white?text=Lasanha", "category": "lanches" },
  { "id": "20", "name": "Porção de Mandioca Frita", "price": 14.0, "description": "Pedaços de mandioca cozida e frita, crocante por fora e macia por dentro.", "image": "https://placehold.co/300x200/f97316/white?text=Mandioca", "category": "lanches" },
  { "id": "21", "name": "Salada Caesar", "price": 26.0, "description": "Alface romana, croutons, queijo parmesão e tiras de frango grelhado ao molho Caesar.", "image": "https://placehold.co/300x200/ef4444/white?text=Salada", "category": "lanches" },
  { "id": "22", "name": "Mousse de Maracujá", "price": 10.0, "description": "Mousse aerado e cremoso de maracujá com calda da fruta.", "image": "https://placehold.co/300x200/ec4899/white?text=Mousse", "category": "sobremesas" },
  { "id": "23", "name": "Pudim de Leite Condensado", "price": 9.5, "description": "Fatia generosa do clássico pudim com calda de caramelo.", "image": "https://placehold.co/300x200/ec4899/white?text=Pudim", "category": "sobremesas" },
  { "id": "24", "name": "Cerveja Long Neck", "price": 9.0, "description": "Heineken, Budweiser ou Stella Artois.", "image": "https://placehold.co/300x200/10b981/white?text=Cerveja", "category": "bebidas" },
  { "id": "25", "name": "Limonada Suíça", "price": 8.5, "description": "Limão batido com casca e leite condensado. Cremosa e refrescante.", "image": "https://placehold.co/300x200/10b981/white?text=Limonada", "category": "bebidas" },
  { "id": "26", "name": "Hot Dog Especial", "price": 15.0, "description": "Pão, duas salsichas, purê de batata, vinagrete, milho e batata palha.", "image": "https://placehold.co/300x200/4f46e5/white?text=Hot+Dog", "category": "lanches" },
  { "id": "27", "name": "Pizza Brotinho Quatro Queijos", "price": 30.0, "description": "Mussarela, provolone, parmesão e catupiry.", "image": "https://placehold.co/300x200/eab308/white?text=4+Queijos", "category": "lanches" },
  { "id": "28", "name": "Salmão Grelhado", "price": 45.0, "description": "Posta de salmão grelhado com legumes no vapor e arroz.", "image": "https://placehold.co/300x200/ef4444/white?text=Salmão", "category": "lanches" },
  { "id": "29", "name": "Refrigerante em Lata", "price": 5.0, "description": "Coca-Cola, Guaraná ou Fanta (350ml).", "image": "https://placehold.co/300x200/10b981/white?text=Lata", "category": "bebidas" },
  { "id": "30", "name": "Beirute de Filé Mignon", "price": 34.0, "description": "Pão sírio, tiras de filé mignon, queijo, presunto, ovo, alface e tomate.", "image": "https://placehold.co/300x200/4f46e5/white?text=Beirute", "category": "lanches" },
  { "id": "31", "name": "Pizza Brotinho Portuguesa", "price": 28.5, "description": "Presunto, ovo, cebola, azeitonas e mussarela.", "image": "https://placehold.co/300x200/eab308/white?text=Portuguesa", "category": "lanches" },
  { "id": "32", "name": "Risoto de Cogumelos", "price": 39.0, "description": "Arroz arbóreo cremoso com mix de cogumelos frescos e parmesão.", "image": "https://placehold.co/300x200/ef4444/white?text=Risoto", "category": "lanches" },
  { "id": "33", "name": "Café Espresso", "price": 5.5, "description": "Café forte e encorpado, tirado na máquina.", "image": "https://placehold.co/300x200/10b981/white?text=Café", "category": "bebidas" },
  { "id": "34", "name": "Salada de Frutas", "price": 11.0, "description": "Mix de frutas da estação.", "image": "https://placehold.co/300x200/ec4899/white?text=Frutas", "category": "sobremesas" },
  { "id": "35", "name": "Porção de Calabresa Acebolada", "price": 25.0, "description": "Linguiça calabresa fatiada e frita com anéis de cebola.", "image": "https://placehold.co/300x200/f97316/white?text=Calabresa", "category": "lanches" },
  { "id": "36", "name": "Wrap de Peito de Peru", "price": 19.0, "description": "Pão folha, peito de peru, queijo minas, alface e cenoura ralada.", "image": "https://placehold.co/300x200/4f46e5/white?text=Wrap", "category": "lanches" },
  { "id": "37", "name": "Pizza Brotinho de Chocolate", "price": 29.0, "description": "Massa de pizza com cobertura de chocolate derretido e morangos fatiados.", "image": "https://placehold.co/300x200/eab308/white?text=Doce", "category": "lanches" },
  { "id": "38", "name": "Vitamina de Frutas", "price": 10.0, "description": "Banana, mamão e maçã batidos com leite.", "image": "https://placehold.co/300x200/10b981/white?text=Vitamina", "category": "bebidas" },
  { "id": "39", "name": "Sorvete (1 bola)", "price": 7.0, "description": "Sabores: Creme, Chocolate ou Morango.", "image": "https://placehold.co/300x200/ec4899/white?text=Sorvete", "category": "sobremesas" },
  { "id": "40", "name": "Omelete Simples", "price": 15.0, "description": "Ovos batidos com queijo e cheiro-verde. Acompanha torradas.", "image": "https://placehold.co/300x200/ef4444/white?text=Omelete", "category": "lanches" },
  { "id": "41", "name": "Pizza Brotinho Marguerita", "price": 26.0, "description": "Mussarela, rodelas de tomate e folhas de manjericão fresco.", "image": "https://placehold.co/300x200/eab308/white?text=Marguerita", "category": "lanches"},
  { "id": "42", "name": "Salada Simples", "price": 10.0, "description": "Mix de folhas verdes com tomate e cenoura.", "image": "https://placehold.co/300x200/f97316/white?text=Salada", "category": "lanches"},
  { "id": "43", "name": "Tostex Misto", "price": 12.0, "description": "Pão de forma, presunto e queijo na chapa.", "image": "https://placehold.co/300x200/4f46e5/white?text=Tostex", "category": "lanches" }
];

// Tipos
type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'lanches' | 'bebidas' | 'sobremesas';
};

export { Productos, ProductType };

