import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  standalone: true,
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('maido_industries');
}
