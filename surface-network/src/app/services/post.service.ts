import { HttpClient } from "@angular/common/http";
import { Injectable, inject, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);

  constructor(@Inject("BASE_API_URL") private baseUrl: string) {}

  // Запрос на получение всех постов для ленты
  getFeed(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/feed');
  }

  // Запрос на добавление нового поста
  createPost(postData: any): Observable<Post> {
    return this.http.post<Post>(this.baseUrl + '/create', postData);
  }
}