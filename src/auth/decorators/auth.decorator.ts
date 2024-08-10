import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserRole } from '@prisma/client';

import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

// @Auth()
export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
