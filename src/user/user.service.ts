import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTDO } from './dto/create-user.dto';
import { UpdateUserPatchTDO } from './dto/update-patch-user.dto';
import { UpdateUserPutTDO } from './dto/update-put-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserTDO) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }
  async show(id: number) {
    await this.exits(id);

    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    { email, name, password, birthAt, role }: UpdateUserPutTDO,
  ) {
    await this.exits(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
      where: { id },
    });
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt, role }: UpdateUserPatchTDO,
  ) {
    await this.exits(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }
    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.exits(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async exits(id: number) {
    if (!(await this.prisma.user.count({ where: { id } })))
      throw new NotFoundException('O usuário não existe.');
  }
}
