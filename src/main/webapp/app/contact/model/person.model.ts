import { Address } from '@/contact/model/address.model';

export class Person {
  firstName: string;
  lastName: string;

  title: string;

  address: Address;

  phone: string;
  email: string;

  constructor(firstName: string, lastName: string, title: string, address: Address, phone?: string, email?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }

  public getFullName() {
    const safeLastName = this.lastName != null ? ' ' + this.lastName.toUpperCase() : '';
    return this.firstName + safeLastName;
  }
}
