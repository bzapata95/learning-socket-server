import { v4 as uuidV4 } from "uuid";

export default class Band {
  public id: string;
  public name: string;
  public votes: number;

  constructor(name: string) {
    this.id = uuidV4();
    this.name = name;
    this.votes = 0;
  }
}
