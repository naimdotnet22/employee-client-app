import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url: string = 'http://localhost:4138/api/employee/';

  constructor(private http: HttpClient) { }

  getAllEmployee() {
    return this.http.get<any>(this.url + 'GetAllEmployees')
  }

  saveEmployee(data: any) {
    return this.http.post<any>(this.url + 'SaveEmployee', data)
  }

  updateEmployee(data: any) {
    debugger
    return this.http.post<any>(this.url + 'UpdateEmployee', data)
  }

  deleteEmployee(data: any) {
    return this.http.post(this.url + 'DeleteEmployee', data)
  }



}
