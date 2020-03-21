import { PaymentDuration, Product, ProductType } from '@homeboi/api-interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class ProductPostDto implements Product {
  @ApiProperty({ enum: ProductType })
  productType: ProductType;
  @ApiProperty()
  depth: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  height: number;
  @ApiProperty()
  image: string;
  @ApiProperty({ enum: PaymentDuration })
  paymentDuration: PaymentDuration;
  @ApiProperty()
  price: number;
  @ApiProperty()
  tags: string[];
  @ApiProperty()
  title: string;
  @ApiProperty()
  width: number;
}
