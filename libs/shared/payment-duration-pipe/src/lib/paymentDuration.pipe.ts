import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentDuration'
})
export class PaymentDurationPipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'DAILY': return 'pro Tag';
      case 'WEEKLY': return 'pro Woche';
      case 'MONTHLY': return 'pro Monat';
      case 'ONCE': return 'einmalig';
      default: return '';
    }
  }
}
