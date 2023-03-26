import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { EmployeeDataService } from '../service/employee-data.service';

@Component({
  selector: 'app-delet-employee',
  templateUrl: './delet-employee.component.html',
  styleUrls: ['./delet-employee.component.css']
})
export class DeletEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletEmployeeComponent> , 
     @Inject(MAT_DIALOG_DATA) public data: any , private employeedataservice: EmployeeDataService ) { }

  ngOnInit(): void {
    console.log(this.data.id);
    
  }

  deleteEmployee(){
    // this.employeedataservice.deleteEmployeeById(environment.BASE_API_PATH + "employeeDetail" , this.data.id)
    // .subscribe(res=>{
    //   if(res){
        
    //   }
    // })
  }
}
