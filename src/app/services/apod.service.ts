import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Apod {
  title: string;
  date: string;
  imageUrl: string;
  url?: string;
  explanation?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApodService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getApodsList(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}&count=20`);
  }

  getApodDetail(date: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}&date=${date}`);
  }

  getApodsByDateRange(start: string, end: string): Observable<any> {
    return this.httpClient.get(
      `${this.baseUrl}&start_date=${start}&end_date=${end}`
    );
  }
}
