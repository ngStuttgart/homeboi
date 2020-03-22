import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../+state/app.reducer';
import { select, Store } from '@ngrx/store';
import { signupAction } from '../+state/app.actions';
import { Observable } from 'rxjs';
import { selectSignupError, selectSignupSubmitted } from '../+state/app.selectors';

interface AccountType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'homeboi-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupSubmitted$: Observable<boolean> = this.store.pipe(
    select(selectSignupSubmitted)
  );
  signupError$: Observable<string> = this.store.pipe(
    select(selectSignupError)
  );

  constructor(private store: Store<AppState>) {}

  accountTypes: AccountType[] = [
    {value: 'USER', viewValue: 'Mieter (Home-Office Arbeiter)'},
    {value: 'COMPANY', viewValue: 'Anbieter (Unternehmen)'}
  ];

  signupGroup = new FormGroup({
    accountType: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('' ,[Validators.required]),
    contactPerson: new FormControl(''),
    address: new FormGroup({
      city: new FormControl('' ,[Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      streetNumber: new FormControl('', [Validators.required]),
      country: new FormControl({ value: 'Deutschland', disabled: true })
    }),
  });

  submit(): void {
    if (this.signupGroup.valid) {
      this.store.dispatch(signupAction({ signup: this.signupGroup.getRawValue() }));
    }
  }
}
