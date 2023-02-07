import { TestingModule, Test } from '@nestjs/testing';
import { userPrismaServiceMock } from '../testing/user-prisma-service.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userPrismaServiceMock],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test('validating the definition', () => {
    expect(userService).toBeDefined();
  });

  // describe('Create', () => {
  //   test('method create', async () => {
  //     const data: CreateUserTDO = {
  //       birthAt: '2000-01-01',
  //       email: 'teste@gmail.com',
  //       name: 'teste',
  //       password: '123456',
  //       role: Role.User,
  //     };

  //     const result = await userService.create(data);
  //   });
  // });
  // describe('Read', () => {});
  // describe('Update', () => {});
  // describe('Delete', () => {});
});
