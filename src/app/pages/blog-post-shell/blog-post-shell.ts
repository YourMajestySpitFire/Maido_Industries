import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { BlogPost, BlogService } from '../../services/blog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './blog-post-shell.html',
})
export class BlogPostShell implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private destroyRef = inject(DestroyRef);

  protected blogPost = signal<BlogPost | undefined>(undefined);
  protected markdownContent = signal<string>('');

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
        .subscribe((cleanContent) => {
          this.markdownContent.set(cleanContent);
        });
    }
  }
}
