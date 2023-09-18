import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _htpp: HttpClient) {}
  //post
  addEmployee(data: any): Observable<any> {
    return this._htpp.post('http://localhost:3000/employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._htpp.put(`http://localhost:3000/employees/${id}`, data);
  }
  //get
  getEmployeeList(): Observable<any> {
    return this._htpp.get('http://localhost:3000/employees');
  }
  deleteEmployee(id: number): Observable<any> {
    return this._htpp.delete(`http://localhost:3000/employees/${id}`);
  }
}
