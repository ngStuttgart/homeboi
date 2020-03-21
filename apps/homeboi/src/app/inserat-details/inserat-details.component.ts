import { Component, OnInit } from '@angular/core';
import { InseratDetailsService } from './inserat-details.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '@homeboi/api-interfaces';

@Component({
  selector: 'homeboi-inserat-details',
  templateUrl: './inserat-details.component.html',
  styleUrls: ['./inserat-details.component.scss']
})
export class InseratDetailsComponent implements OnInit{

  productId: string;
  product: Product;

  constructor(private readonly insertDetailsService: InseratDetailsService,
              private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('productId');
  }

  async ngOnInit() {
    this.product = await this.insertDetailsService.getInserat(this.productId).toPromise();
  }
}
