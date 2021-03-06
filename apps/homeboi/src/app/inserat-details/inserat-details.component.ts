import { Component, OnInit } from '@angular/core';
import { InseratDetailsService } from './inserat-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@homeboi/api-interfaces';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'homeboi-inserat-details',
  templateUrl: './inserat-details.component.html',
  styleUrls: ['./inserat-details.component.scss']
})
export class InseratDetailsComponent implements OnInit {

  productId: string;
  product: Product;
  showBookingSection: boolean;
  minDate: Date;
  startDate: Date;
  description: string;
  insurance: boolean;

  constructor(private readonly insertDetailsService: InseratDetailsService,
              private route: ActivatedRoute,
              private readonly snackbar: MatSnackBar,
              private readonly router: Router,
              private location: Location) {
    this.productId = this.route.snapshot.paramMap.get('productId');

    // We set the startdate of the product on 3 days to the future.
    this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3);
  }

  async ngOnInit() {
    this.product = await this.insertDetailsService.getInserat(this.productId).toPromise();
  }

  async book() {
    const booking = { start: this.startDate, end: null, description: this.description, productId: this.productId };
    await this.insertDetailsService.bookInserat(booking).toPromise();
    this.snackbar.open('Buchung war erfolgreich', 'ok', {duration: 5000});
    await this.router.navigate(['/']);
  }

  goBack() {
    this.location.back();
  }
}
