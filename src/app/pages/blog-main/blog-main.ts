import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogPost, BlogService } from '../../services/blog';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-main.html',
})
export class Blog implements OnInit {
  private blogService = inject(BlogService);

  posts = signal<BlogPost[]>([]);

  ngOnInit() {
    this.blogService.getAllPosts().subscribe({
      next: (data) => {
        console.log('Pobrane posty z JSON:', data);
        this.posts.set(data);
      },
      error: (err) => {
        console.error('Błąd podczas pobierania postów:', err);
      },
    });
  }
}
