import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '@homeboi/api-interfaces';

@Component({
  selector: 'homeboi-show-picture-dialog',
  templateUrl: './show-picture-dialog.component.html',
  styleUrls: ['./show-picture-dialog.component.scss']
})
export class ShowPictureDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product,
              private dialogRef: MatDialogRef<ShowPictureDialogComponent>) { }

  close(): void {
    this.dialogRef.close();
  }
}
