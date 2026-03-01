import { Injectable } from '@angular/core';

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
  private posts: BlogPost[] = [
    {
      slug: 'example-post',
      title: 'Mój pierwszy post',
      date: '2026-03-01',
      description: 'To jest testowy post na moim nowym blogu.',
    },
  ];

  getAllPosts(): BlogPost[] {
    return this.posts;
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find((p) => p.slug === slug);
  }
}
