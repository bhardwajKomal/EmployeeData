import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeDataService } from '../service/employee-data.service';
import Swal from 'sweetalert2'
import { ChangeDetectorRef } from '@angular/core';
import { employeemodel } from '../Model/EmployeeModel';

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
  EMPLOYEE_DATA!: employeemodel[];
  dataSource:any;

  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'Gender','DOB', 'Education', 'Company',
    'Experience', 'Package', 'Action', 'Delete'];

  

  constructor(private dialog: MatDialog, private employeedataService: EmployeeDataService , 
    private cdr: ChangeDetectorRef) {}
    @ViewChild(MatPaginator) _paginator!:MatPaginator;
    

  ngOnInit(): void {
    this.getAllEmployee();
    
    
  };
  
  getAllEmployee() {
    this.employeedataService.getEmployeeData(environment.BASE_API_PATH + "employeeDetail").subscribe(res => {
      if (res) {
        console.log(res);
        this.EMPLOYEE_DATA = res;
        this.dataSource=new MatTableDataSource<employeedata>(this.EMPLOYEE_DATA);
        this.dataSource.paginator=this._paginator;
       

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
      
      if (result.isConfirmed) {
        this.employeedataService.deleteEmployeeById(environment.BASE_API_PATH + "employeeDetail" , id).subscribe(res=>{
          if(res){
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.getAllEmployee();
          }
        })
        
      }
    })
    
  }

  updatedata(id: any) {
   this.openDialog(id);
    
  }

  openDialog(id:any): void {
    const popup = this.dialog.open(EmployeeFormComponent, {
      width: '1000px',
      data: {
        id: id
      }
    });

    popup.afterClosed().subscribe(()=>{
      this.getAllEmployee();
    })
  }



  // ngAfterViewInit() {
  //   this.dataSource.paginator = this._paginator;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
