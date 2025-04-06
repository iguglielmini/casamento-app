export const prismaMock = {
    guest: {
      create: jest.fn(),
    },
  };
  
  export class PrismaClient {
    guest = prismaMock.guest;
  }
  