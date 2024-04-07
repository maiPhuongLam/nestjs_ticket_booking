import { UserRoles } from "src/modules/user/enums";

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRoles
}
