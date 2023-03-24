import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { DeletEmployeeComponent } from '../delet-employee/delet-employee.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeDataService } from '../service/employee-data.service';
import Swal from 'sweetalert2'

export interface employeedata {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  education: string,
  DOB: Date;
  Package: number;
  experience: number;
  company: string;
  gender: string;
}

@Component({
  selector: 'app-employeesinfo',
  templateUrl: './employeesinfo.component.html',
  styleUrls: ['./employeesinfo.component.css']
})
export class EmployeesinfoComponent implements OnInit {
  EMPLOYEE_DATA!: any;
  todayDate: Date = new Date();
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'DOB', 'Education', 'Company',
    'Experience', 'Package', 'Action', 'Delete'];
  dataSource = new MatTableDataSource<employeedata>(this.EMPLOYEE_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog, private employeedata: EmployeeDataService) {

  }

  ngOnInit(): void {
    this.getAllEmployee();
    
  }
  date: any
  getAllEmployee() {
    this.employeedata.getEmployeeData(environment.BASE_API_PATH + "employeeDetail").subscribe(res => {
      if (res) {
        this.EMPLOYEE_DATA = res;

      }
    })
  }
  deletedata(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      this.employeedata.deleteEmployeeById(environment.BASE_API_PATH + "employeeDetail" , id).subscribe(res=>{
        if(res){
          this.getAllEmployee();
        }
      })
  
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
    // this.dialog.open(DeletEmployeeComponent, {
    //   width: '250px',
    //   data: {
    //     id: id
    //   }
    // });
  }
  updatedata(id: any) {
    this.dialog.open(EmployeeFormComponent, {
      width: '1000px',
      data: {
        id: id
      }
    });

  }

  openDialog(): void {
    this.dialog.open(EmployeeFormComponent, {
      width: '1000px',
      disableClose: false
    });
  }



  ngAfterViewInit() {
    this.EMPLOYEE_DATA.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.EMPLOYEE_DATA.filter = filterValue.trim().toLowerCase();
  }
}
