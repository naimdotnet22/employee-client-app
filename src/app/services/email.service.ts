import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  url: string = 'http://localhost:4138/api/Mail/send'

  constructor(private http: HttpClient) { }

  sendEmail(data: any){
    return this.http.post<any>(this.url, data)
  }
}
