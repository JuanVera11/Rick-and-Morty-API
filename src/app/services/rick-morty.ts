import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private baseURL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseURL}/character/?page=${page}`);
  }

  getCharacterDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/character/${id}`);
  }
}