import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface ProductType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'homeboi-inserat',
  templateUrl: './inserat.component.html',
  styleUrls: ['./inserat.component.scss']
})
export class InseratComponent {
  inseratGroup = new FormGroup({
    productType: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.email]),
    width: new FormControl('', [Validators.required]),
    height: new FormControl('' ,[Validators.required]),
    depth: new FormControl(''),
    price: new FormControl(''),
    paymentDuration: new FormControl(''),
    image: new FormControl('')
  });

  productTypes: ProductType[] = [
    {value: 'MONITOR', viewValue: 'Monitor'},
    {value: 'TISCH', viewValue: 'Tisch'},
    {value: 'STUHL', viewValue: 'Stuhl'},
    {value: 'MAUS', viewValue: 'Maus'},
    {value: 'TASTATUR', viewValue: 'Tastatur'},
    {value: 'HEADSET', viewValue: 'Headset'},
    {value: 'DRUCKER', viewValue: 'Drucker'},
    {value: 'LAUTSPRECHER', viewValue: 'Lautsprecher'},
    {value: 'WEBCAM', viewValue: 'Webcam'},
    {value: 'WHITEBOARD', viewValue: 'Whiteboard'},
    {value: 'SONSTIGES', viewValue: 'Sonstiges'}
  ];

  submit(): void {
    // do stuff
  }
}
