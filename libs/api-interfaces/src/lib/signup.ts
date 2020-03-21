import { AccountType } from './account-type';
import { Credentials } from './credentials';

export interface Signup extends Credentials {
  userId: string;
  accountType: AccountType;
  name: string;
  address: Address;
  contactPerson?: string;
}

export interface Address {
  city: string;
  zipCode: string;
  street: string;
  streetNumber: string;
  country: string;
}
