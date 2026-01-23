export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'blacklist' | 'clasicas';
    isNew?: boolean;
}

export const menuData: Product[] = [
    {
        id: '1',
        name: 'Public Enemy',
        description: 'Carne, queso cheddar, bacon, cebolla caramelizada, queso azul, salsa antipática.',
        price: 12000,
        category: 'blacklist',
        isNew: true
    },
    {
        id: '2',
        name: 'Clickbait',
        description: 'Carne, triple de parmesano crocante, mayonesa especial, salsa antipatica.',
        price: 14000,
        category: 'blacklist'
    },
    {
        id: '3',
        name: 'Shadowban',
        description: 'Carne, queso cheddar, salsa tasty, bacon.',
        price: 13000,
        category: 'blacklist'
    },
    {
        id: '4',
        name: 'Cancelada',
        description: 'Carne, cheddar, salsa envidia, bacon.',
        price: 14000,
        category: 'blacklist'
    }
];