import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private destroyRef = inject(DestroyRef);

  protected blogPost = signal<BlogPost | undefined>(undefined);
  protected htmlContent = signal<SafeHtml>('');
  protected functionMessage = signal<string>('');

  constructor() {
    effect(() => {
      this.htmlContent();
      setTimeout(() => this.attachEventListeners(), 0);
    });
  }

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
          this.htmlContent.set(this.sanitizer.bypassSecurityTrustHtml(content));
        });
    }
  }

  private attachEventListeners() {
    const buttons = document.querySelectorAll('.run-python-btn');
    buttons.forEach((button) => {
      button.removeEventListener('click', this.onButtonClick.bind(this));
      button.addEventListener('click', this.onButtonClick.bind(this));
    });
  }

  onButtonClick() {
    this.http
      .post<{ message: string }>('http://localhost:5000/run-function', {})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.functionMessage.set(response.message);
          console.log('Python function response:', response);
        },
        error: (error) => {
          console.error('Error calling Python function:', error);
          this.functionMessage.set('Error: Could not reach Python backend');
        },
      });
  }
}
