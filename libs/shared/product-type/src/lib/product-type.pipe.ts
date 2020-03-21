import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from '@homeboi/api-interfaces';

const productTypeMap: ReadonlyMap<ProductType, string> = new Map<ProductType, string>([
  [ProductType.MONITOR, 'Drucker'],
  [ProductType.TISCH, 'Tisch'],
  [ProductType.STUHL, 'Stuhl'],
  [ProductType.MAUS, 'Maus'],
  [ProductType.HEADSET, 'Headset'],
  [ProductType.LAUTSPRECHER, 'Lautsprecher'],
  [ProductType.WEBCAM, 'Webcam'],
  [ProductType.WHITEBOARD, 'Whiteboard'],
  [ProductType.AUTOMATISCHE_ERKENNUNG, 'Automatische Erkennung'],
  [ProductType.SONSTIGES, 'Sonstiges']
]);

@Pipe({
  name: 'productType'
})
export class ProductTypePipe implements PipeTransform {
  transform(productType: ProductType): string {
    return productTypeMap.get(productType);
  }
}
