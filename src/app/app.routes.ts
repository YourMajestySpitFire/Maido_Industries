import { Routes } from '@angular/router';
import { Blog } from './pages/blog-main/blog-main';
import { BlogPostShell } from './pages/blog-post-shell/blog-post-shell';

export const routes: Routes = [
  { path: 'blog', loadComponent: () => Blog },
  { path: 'blog/:slug', loadComponent: () => BlogPostShell },
];
