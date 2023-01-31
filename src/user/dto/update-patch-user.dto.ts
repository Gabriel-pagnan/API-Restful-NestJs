import { CreateUserTDO } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserPatchTDO extends PartialType(CreateUserTDO) {}
