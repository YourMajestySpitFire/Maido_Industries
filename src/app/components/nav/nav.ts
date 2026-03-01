import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage';
import { Theme } from '../../models/theme.type';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private store = inject(StorageService);

  protected isDark = signal(false);

  protected ngOnInit() {
    const savedTheme: Theme | null = this.store.getItem('theme');

    if (savedTheme === 'dark') {
      this.isDark.set(true);
      this.applyTheme(true);
    }
  }

  protected toggleTheme() {
    const newState = !this.isDark();
    this.isDark.set(newState);

    this.store.setItem('theme', newState ? 'dark' : 'light');

    this.applyTheme(newState);
  }

  private applyTheme(dark: boolean) {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }
}
