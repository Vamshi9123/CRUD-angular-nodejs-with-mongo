import { Component, OnInit } from "@angular/core";

import { EmployeeService } from "../services/employee.service";
import { NgForm } from "@angular/forms";
import { Employee } from "../services/employee.model";

declare var M: any;

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  providers: [EmployeeService],
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      email:"",
      position: "",
      office: "",
      salary: null,
    };
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: "Saved Successfully", classes: "rounded" });
      });
    } else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: "Updated Successfully", classes: "rounded" });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = { ...emp };
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: "Deleted Successfully", classes: "rounded" });
      });
    }
  }
}
