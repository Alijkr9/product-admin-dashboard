import { faker } from '@faker-js/faker';

export const mockUsers = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['Admin', 'Editor', 'Viewer']),
}));

export const mockProducts = Array.from({ length: 9 }, () => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  category: faker.commerce.department(),
  description: faker.commerce.productDescription(),
}));

// Types derived from the mock data shape
type User = Omit<typeof mockUsers[number], 'id'>;
type Product = Omit<typeof mockProducts[number], 'id'>;

// In-memory state
let users = [...mockUsers];
let products = [...mockProducts];

export const db = {
  getUsers: () => users,
  addUser: (user: User) => {
    const newUser = { ...user, id: faker.string.uuid() };
    users = [newUser, ...users];
    return newUser;
  },
  getProducts: () => products,
  addProduct: (product: Product) => {
    const newProduct = { ...product, id: faker.string.uuid() };
    products = [newProduct, ...products];
    return newProduct;
  },
};