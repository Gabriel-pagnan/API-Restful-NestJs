import {
  Body,
  Controller,
  Delete,
  Get,
  // Param,
  // ParseIntPipe,
  UseGuards,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { LogInterceptors } from '../interceptors/log.interceptors';
import { CreateUserTDO } from './dto/create-user.dto';
import { UpdateUserPatchTDO } from './dto/update-patch-user.dto';
import { UpdateUserPutTDO } from './dto/update-put-user.dto';
import { UserService } from './user.service';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptors)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserTDO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }
  // @Param('id', ParseIntPipe) ou @ParamId()
  @Get(':id')
  async show(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdateUserPutTDO, @ParamId() id: number) {
    return this.userService.update(id, data);
  }
  @Patch(':id')
  async updatePartial(@Body() data: UpdateUserPatchTDO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
