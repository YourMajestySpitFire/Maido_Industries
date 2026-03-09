import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogPost, BlogService } from '../../services/blog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-post-shell.html',
  styleUrl: './blog-post-shell.scss',
})
export class BlogPostShell implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private destroyRef = inject(DestroyRef);

  protected blogPost = signal<BlogPost | undefined>(undefined);
  protected htmlContent = signal<string>('');

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService
        .getPostBySlug(slug)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          this.blogPost.set(data);
        });

      this.blogService
        .getPostContent(slug)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((content) => {
          this.htmlContent.set(content);
        });
    }
  }
}
