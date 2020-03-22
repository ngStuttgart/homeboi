import { Component, OnInit } from '@angular/core';
import { InseratDetailsService } from './inserat-details.service';
import { ActivatedRoute } from '@angular/router';
import { Booking, Product } from '@homeboi/api-interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'homeboi-inserat-details',
  templateUrl: './inserat-details.component.html',
  styleUrls: ['./inserat-details.component.scss']
})
export class InseratDetailsComponent implements OnInit{

  productId: string;
  product: Product;
  showBookingSection: boolean;
  minDate: Date;
  startDate: Date;
  insurance: boolean;

  constructor(private readonly insertDetailsService: InseratDetailsService,
              private route: ActivatedRoute,
              private location: Location) {
    this.productId = this.route.snapshot.paramMap.get('productId');

    // We set the startdate of the product on 3 days to the future.
    this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3);
  }

  async ngOnInit() {
    this.product = await this.insertDetailsService.getInserat(this.productId).toPromise();
  }

  async book() {
    const booking: Booking = { start: this.startDate, end: null };
    const bookingReq = await this.insertDetailsService.bookInserat(booking).toPromise();

  }

  goBack() {
    this.location.back();
  }
}
