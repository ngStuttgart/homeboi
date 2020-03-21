import { Component, Input } from '@angular/core';

@Component({
  selector: 'homeboi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() showInseratButton: boolean;
  @Input() notificationsUrl: string;

  showSearchbar = false;

  toggleSearchbar(): void {
    this.showSearchbar = !this.showSearchbar;
  }
}
