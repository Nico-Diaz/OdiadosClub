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
        description: 'Doble carne, queso cheddar, bacon, cebolla caramelizada, queso azul, salsa antipática.',
        price: 12500,
        category: 'blacklist',
        isNew: true
    },
    {
        id: '2',
        name: 'Clickbait',
        description: 'Doble carne, triple de parmesano crocante, mayonesa especial.',
        price: 11800,
        category: 'blacklist'
    },
    {
        id: '3',
        name: 'Shadowban',
        description: 'Doble carne, queso cheddar, salsa tasty.',
        price: 10500,
        category: 'blacklist'
    },
    {
        id: '4',
        name: 'Cancelada',
        description: 'Simple, doble o triple carne, cheddar, salsa envidia.',
        price: 9500,
        category: 'blacklist'
    }
];