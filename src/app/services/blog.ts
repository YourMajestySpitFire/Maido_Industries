import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
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
    return this.http.get(`/posts/${slug}.md`, { responseType: 'text' }).pipe(
      map(content => content.replace(/^---[\s\S]*?---\n*/, ''))
    );
  }
}
