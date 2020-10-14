import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Employee } from "./employee.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];

  constructor(private http: HttpClient) {}

  postEmployee(emp: Employee) {
    return this.http.post(environment._url, emp);
  }

  getEmployeeList() {
    return this.http.get(environment._url);
  }

  putEmployee(emp: Employee) {
    return this.http.put(environment._url + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(environment._url + `/${_id}`);
  }
}
