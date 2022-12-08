import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/Guard/role.guard';
import { Role } from '../auth/dto';
import { Roles } from './role.decorator';

export function Auth(...roles: Role[]) {
  return applyDecorators(Roles(...roles), UseGuards(RolesGuard));
}
