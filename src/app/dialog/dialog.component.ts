import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  saveOrEditBtn: string = 'Save'

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private dialog: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  employeeForm!: FormGroup;

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required]
    });

    if (this.editData) {
      this.refreshEmployeeModal();
    }
  }

  refreshEmployeeModal() {
    this.saveOrEditBtn = 'Update'
    this.employeeForm.controls['id'].setValue(this.editData.id);
    this.employeeForm.controls['name'].setValue(this.editData.name);
    this.employeeForm.controls['code'].setValue(this.editData.code);
    this.employeeForm.controls['salary'].setValue(this.editData.salary);
    this.employeeForm.controls['age'].setValue(this.editData.age);
  }

  saveEmployee() {
    debugger
      this.service.saveEmployee(this.employeeForm.value).subscribe({
        next: (res) => {
          alert("Employee Added Successfully!");
          this.employeeForm.reset();
          this.dialog.close('save');
        },
        error: () => {
          alert("Error While Saving!");
        },
      })
    } 


  updateEmployee() { 
    this.service.updateEmployee(this.employeeForm.value).subscribe({
      next: (res) => {
        alert("Employee Updated Successfully!");
        this.employeeForm.reset();
        this.dialog.close('update');
      },
      error: () => {
        alert("Error While Updating!");
      }
    })
  }

}
