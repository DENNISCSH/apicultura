import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Miel de Flores Silvestres Premium",
    description: "Miel pura y natural de flores silvestres, cosechada de nuestras colmenas ubicadas en campos libres de pesticidas. Sabor delicado y aromático con notas florales.",
    price: 2450,
    originalPrice: 2800,
    image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg",
    images: [
      "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg",
      "https://images.pexels.com/photos/372851/pexels-photo-372851.jpeg",
      "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg"
    ],
    category: "miel",
    stock: 50,
    rating: 4.8,
    reviews: 124,
    featured: true,
    tags: ["orgánico", "sin filtrar", "cosecha 2024"]
  },
  {
    id: 2,
    name: "Jalea Real Fresca",
    description: "Jalea real fresca de máxima calidad, rica en vitaminas B, aminoácidos y minerales. Ideal para fortalecer el sistema inmunológico y aumentar la energía.",
    price: 8900,
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
    images: [
      "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
      "https://images.pexels.com/photos/6120225/pexels-photo-6120225.jpeg"
    ],
    category: "jalea-real",
    stock: 25,
    rating: 4.9,
    reviews: 67,
    featured: true,
    tags: ["fresca", "premium", "antioxidante"]
  },
  {
    id: 3,
    name: "Cera de Abeja Natural",
    description: "Cera de abeja 100% natural, perfecta para cosméticos caseros, velas y tratamientos naturales. Sin procesar y libre de químicos.",
    price: 1850,
    image: "https://images.pexels.com/photos/4040727/pexels-photo-4040727.jpeg",
    images: [
      "https://images.pexels.com/photos/4040727/pexels-photo-4040727.jpeg",
      "https://images.pexels.com/photos/6956996/pexels-photo-6956996.jpeg"
    ],
    category: "cera",
    stock: 40,
    rating: 4.7,
    reviews: 89,
    featured: false,
    tags: ["natural", "sin procesar", "cosmética"]
  },
  {
    id: 4,
    name: "Propóleo Puro",
    description: "Propóleo de alta concentración con propiedades antibacterianas y antiinflamatorias naturales. Ideal para reforzar las defensas.",
    price: 4200,
    image: "https://images.pexels.com/photos/6956919/pexels-photo-6956919.jpeg",
    images: [
      "https://images.pexels.com/photos/6956919/pexels-photo-6956919.jpeg",
      "https://images.pexels.com/photos/6120233/pexels-photo-6120233.jpeg"
    ],
    category: "propoleo",
    stock: 30,
    rating: 4.8,
    reviews: 156,
    featured: true,
    tags: ["antibacteriano", "concentrado", "defensas"]
  },
  {
    id: 5,
    name: "Miel de Eucalipto",
    description: "Miel con propiedades balsámicas y expectorantes, ideal para problemas respiratorios. Sabor intenso y color ámbar oscuro.",
    price: 2750,
    image: "https://images.pexels.com/photos/33772/honey-sweet-syrup-organic.jpg",
    images: [
      "https://images.pexels.com/photos/33772/honey-sweet-syrup-organic.jpg",
      "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg"
    ],
    category: "miel",
    stock: 35,
    rating: 4.6,
    reviews: 78,
    featured: false,
    tags: ["balsámico", "respiratorio", "intenso"]
  },
  {
    id: 6,
    name: "Polen de Abeja",
    description: "Polen fresco rico en proteínas, vitaminas y minerales. Excelente complemento nutricional para deportistas y personas activas.",
    price: 3650,
    image: "https://images.pexels.com/photos/4040756/pexels-photo-4040756.jpeg",
    images: [
      "https://images.pexels.com/photos/4040756/pexels-photo-4040756.jpeg",
      "https://images.pexels.com/photos/6120217/pexels-photo-6120217.jpeg"
    ],
    category: "polen",
    stock: 28,
    rating: 4.7,
    reviews: 92,
    featured: false,
    tags: ["proteínas", "deportistas", "nutritivo"]
  }
];

export const categories = [
  { id: 'miel', name: 'Miel', count: 15 },
  { id: 'jalea-real', name: 'Jalea Real', count: 8 },
  { id: 'propoleo', name: 'Propóleo', count: 12 },
  { id: 'cera', name: 'Cera de Abeja', count: 6 },
  { id: 'polen', name: 'Polen', count: 10 },
  { id: 'cosmeticos', name: 'Cosméticos', count: 7 }
];