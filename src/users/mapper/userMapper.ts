export class UserMapper {
  public static toPublicUser(user: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...publicUser } = user;
    return publicUser;
  }
}
