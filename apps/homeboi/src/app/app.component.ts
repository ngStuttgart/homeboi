import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'homeboi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private applicationRef: ApplicationRef,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkForUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  checkForUpdates(): void {
    this.applicationRef.isStable
      .pipe(
        take(1),
        switchMap(() => this.swUpdate.available),
        switchMap(() => {
          return this.snackBar
            .open('Update for Homeboi available', 'Update now')
            .afterDismissed();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => window.location.reload());
  }
}
