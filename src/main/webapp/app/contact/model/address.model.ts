export class Address {
  co: string;
  name: string;
  building: string;
  address: string;

  constructor(co?: string, name?: string, building?: string, address?: string) {
    this.co = co;
    this.name = name;
    this.building = building;
    this.address = address;
  }
}
