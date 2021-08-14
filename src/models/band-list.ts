import Band from "./band";

export interface IBand {
  id: string;
  name: string;
  votes: number;
}

export default class BandList {
  private bands: IBand[];

  constructor() {
    this.bands = [
      new Band("Metálica"),
      new Band("Héroes del silencio"),
      new Band("Bon Jovi"),
      new Band("Breaking Benjamin"),
    ];
  }

  addBand(name: string) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  removeBand(id: string) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVotes(id: string) {
    this.bands = this.bands.map((band) =>
      band.id === id ? { ...band, votes: ++band.votes } : band
    );
  }

  changeBandName(id: string, newName: string) {
    this.bands = this.bands.map((band) =>
      band.id === id ? { ...band, name: newName } : band
    );
  }
}
