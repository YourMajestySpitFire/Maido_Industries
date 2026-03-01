import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.html',
})
export class Nav {
  isDark = signal(false);

  toggleTheme() {
    this.isDark.update((v) => !v);
    document.documentElement.classList.toggle('dark');
  }
}
