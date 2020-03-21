import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64url'
})
export class Base64urlPipe implements PipeTransform {
  transform(value: string): string {
    const base64UrlPrefix = 'data:image/jpeg;base64,';
    return base64UrlPrefix.concat(value);
  }
}
