import { Component, inject, OnInit } from '@angular/core';
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
  posts: BlogPost[] = [];

  ngOnInit() {
    this.posts = this.blogService.getAllPosts();
  }
}
