import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

import { BaseController } from "./Base.ts";
import { IUser, User } from "./models/index.ts";

export class UserController implements BaseController<IUser> {
  async create(values: IUser) {
    const password = await User.hashPassword(values.password);

    const user: IUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      password,
    };
    await User.create(user as any);
    return values;
  }

  async delete(id: string) {
    await User.deleteById(id);
  }

  async getAll() {
    return await User.all();
  }

  async getOne(id: string) {
    return await User.where("id", id).first();
  }

  async update(id: string, values: IUser) {
    await User.where("id", id).update(values as any);
    return this.getOne(id);
  }

  async login(lastName: string, password: string) {
    const user = await User.where("lastName", lastName).first();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return false;
    }

    return User.generateJwt(user.id);
  }
}
