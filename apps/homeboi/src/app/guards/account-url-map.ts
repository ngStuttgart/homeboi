import { AccountType } from '@homeboi/api-interfaces';

export const accountUrlMap: ReadonlyMap<AccountType, string> = new Map<AccountType, string>([
  [AccountType.COMPANY, '/company'],
  [AccountType.USER, '/user'],
]);
