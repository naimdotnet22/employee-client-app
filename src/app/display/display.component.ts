import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code', 'salary', 'age', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val =>{
      if (val === 'save') {
        this.getEmployees();
      }
    })

  }


  getEmployees() {
    this.service.getAllEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert("Error Occured While Fetching Data!");
      }
    })
  }



  editEmployee(row: any) {
    debugger
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getEmployees();
      }
    })
  }


  deleteEmployee(row: any) {
    debugger
    if (confirm('Are you sure to delete the Employee?')) {
      this.service.deleteEmployee(row).subscribe({
        next: () => {
          alert("Employee Deleted Successfully!");
          this.getEmployees();
        },
        error: () => {
          alert("Error Occured While Deleting Employee!");
        }
      })
    }
  }





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
