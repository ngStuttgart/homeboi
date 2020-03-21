import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../+state/app.reducer';
import { loginAction } from '../+state/app.actions';
import { Observable } from 'rxjs';
import { selectLoginError } from '../+state/app.selectors';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'homeboi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError$: Observable<string> = this.store.pipe(
    select(selectLoginError),
    filter<string>(Boolean)
  );

  constructor(private store: Store<AppState>) {}

  inputGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  submit(): void {
    if (this.inputGroup.valid) {
      this.store.dispatch(loginAction({credentials: this.inputGroup.value}));
    }
  }
}
