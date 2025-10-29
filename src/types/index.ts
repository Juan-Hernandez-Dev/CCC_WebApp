// src/types/index.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
}

// Datos simulados (Mock Data - US-WEB-F02)
export const mockProducts: Product[] = [
    { id: 1, name: "Nature's Clean Detergent", price: 25.00, imageUrl: "https://i.imgur.com/8Jp29rO.jpeg", description: "Detergente líquido concentrado para manchas difíciles." },
    { id: 2, name: 'Aqua Sparkler Pods', price: 32.00, imageUrl: "https://i.imgur.com/j8s8p6f.jpeg", description: "Cápsulas para lavavajillas con aroma a limón y menta." },
    { id: 3, name: 'Crystal Clear Spray', price: 15.00, imageUrl: "https://i.imgur.com/sY3aR5E.jpeg", description: "Fórmula sin vetas para cristales y espejos." },
    { id: 4, name: 'Pure Home Multi-Surface', price: 20.00, imageUrl: "https://i.imgur.com/e2aG8V3.jpeg", description: "Limpiador multisuperficie con aroma a limón y tomillo." },
    { id: 5, name: 'Power Flush Toilet Cleaner', price: 18.50, imageUrl: "https://i.imgur.com/v10aW4a.jpeg", description: "Gel potente para eliminar gérmenes y sarro del inodoro." },
    { id: 6, name: 'Sani-Wipe Disinfecting', price: 28.99, imageUrl: "https://i.imgur.com/K5a0ZfM.jpeg", description: "Toallitas desinfectantes con aroma a menta y eucalipto." },
];