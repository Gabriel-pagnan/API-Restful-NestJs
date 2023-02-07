import { PrismaService } from '../prisma/prisma.service';

export const userPrismaServiceMock = {
  provide: PrismaService,
  useValue: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
};
