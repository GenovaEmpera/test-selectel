import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../_models/result.model';
import { Repository } from '../_models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  searchRepositories(q: string): Observable<Result<Repository[]>> {
    const url = `https://api.github.com/search/repositories`;
    const params = new HttpParams()
      .append('q', q.toString());
    return this.http.get<Result<Repository[]>>(url, {params});
  }
}
