import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const META_ROLES = 'roles';

// @RoleProtected(Role.ADMIN, Role.USER)
export const RoleProtected = (...args: UserRole[]) =>
  SetMetadata(META_ROLES, args);
