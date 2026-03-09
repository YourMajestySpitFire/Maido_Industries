import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  format?: 'html' | 'md';
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private http = inject(HttpClient);

  public getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>('/posts.json');
  }

  public getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.getAllPosts().pipe(map((posts) => posts.find((p) => p.slug === slug)));
  }

  public getPostContent(slug: string): Observable<string> {
    return this.getAllPosts().pipe(
      map((posts) => posts.find((p) => p.slug === slug)),
      switchMap((post) => {
        if (!post) {
          return of('');
        }

        const fileExtension = post.format === 'html' ? 'html' : 'md';
        return this.http.get(`/posts/${slug}.${fileExtension}`, { responseType: 'text' });
      }),
      map((content) => {
        // Remove front-matter (YAML between ---)
        return content.replace(/^---[\s\S]*?---\n*/, '');
      })
    );
  }
}
