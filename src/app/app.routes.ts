import { Routes } from '@angular/router';
import { Blog } from './pages/blog-main/blog-main';
import { BlogPostShell } from './pages/blog-post-shell/blog-post-shell';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', loadComponent: () => Home },
  { path: 'blog', loadComponent: () => Blog },
  { path: 'blog/:slug', loadComponent: () => BlogPostShell },
  { path: '**', redirectTo: '' },
];
