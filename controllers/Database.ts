import { Database } from "https://deno.land/x/denodb/mod.ts";

import { User } from "./models/index.ts";

export class DatabaseController {
  client: Database;

  /**
   * Initialise database client
   */
  constructor() {
    this.client = new Database("sqlite3", {
      filepath: Deno.realPathSync("./controllers/database/db.sqlite"),
    });
  }

  /**
   * Initialise models
   */
  async initModels() {
    this.client.link([User]);
    await this.client.sync({ drop: true });
  }
}
