import { Person } from '@/contact/model/person.model';
import { Address } from '@/contact/model/address.model';

export const DCU = new Address(
    null,
    'Dublin City University',
    'School of Computing',
    'DCU Glasnevin Campus\n' + 'Collins Avenue\n' + 'Dublin 9\n' + 'Ireland'
);
export const HADRIEN = new Person('Hadrien', 'Bailly', 'Investigator', DCU, '089 481 7198', 'hadrien.bailly2@mail.dcu.ie');
export const ANOOP = new Person('Anoop', 'Papanna', 'Investigator', DCU, '089 949 0959', 'anoop.papanna2@mail.dcu.ie');
export const ROB = new Person('Dr. Rob', 'Brennan', 'Supervisor', DCU, null, 'rob.brennan@adaptcentre.ie');
