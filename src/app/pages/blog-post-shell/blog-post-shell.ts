import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogPost, BlogService } from '../../services/blog';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './blog-post-shell.html',
})
export class BlogPostShell implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  post: BlogPost | undefined;
  postContentUrl: string = '';

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.post = this.blogService.getPostBySlug(slug);
      this.postContentUrl = `/posts/${slug}.md`;
    }
  }
}
