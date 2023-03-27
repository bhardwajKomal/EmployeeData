import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { EmployeeDataService } from '../service/employee-data.service';
import { DbOperation } from '../utility/db-operation';
import * as alertify from 'alertifyjs'
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeedata!: FormGroup;
  educationEmployeedata: any;
  dbops: DbOperation;
  buttonText: string = "";
  submitted: boolean = false;
  constructor(private dialog: MatDialog, private employeedataservice: EmployeeDataService,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {

    this.setEmployeeData();
    this.educationdata();

    if (this.data.id && this.data.id != '' && this.data.id != null && this.data.id > 0) {
      this.buttonText = "Update";
      this.dbops = DbOperation.update;
      this.employeedataservice.GetEmployeebycode(environment.BASE_API_PATH + "employeeDetail", this.data.id).subscribe(response => {
        if (response) {
          this.employeedata.setValue(response);

        }

      });
    }
  }

  
  setEmployeeData() {

    this.buttonText = "Add Employee";
    this.dbops = DbOperation.create;
    this.employeedata = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      DOB: new FormControl("", Validators.required),
      education: new FormControl("", Validators.required),
      company: new FormControl("", Validators.required),
      experience: new FormControl("", Validators.required),
      package: new FormControl("", Validators.required),
      gender: new FormControl("M"),
    })

  }

  getErrorMessage() {
    if (this.employeedata.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.employeedata.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  formReset() {
    this.submitted = false;
    this.buttonText = "Add Employee";
    this.dbops = DbOperation.create;
  }

 

// Add and updating Employee Details
  SaveEmployee() {
    if (this.employeedata.invalid) {
      return;
    }

    switch (this.dbops) {
      case DbOperation.create:
        this.employeedataservice.saveEmployeeData(environment.BASE_API_PATH + "employeeDetail", this.employeedata.value)
          .subscribe(res => {
            if (res) {
              alertify.success("Employee Added Successfully");
              this.closepopup();

            }
          });
        break;
      case DbOperation.update:
        this.employeedataservice.updateEmployeeData(environment.BASE_API_PATH + "employeeDetail/", this.data.id, this.employeedata.value)
          .subscribe(res => {
            if (res) {
              this.buttonText = "Add Employee";
              this.dbops = DbOperation.create;
              alertify.success("Employee Data UpDate Successfully");
              this.closepopup();

            }
          });
        break;
    }

  }

  closepopup() {
    this.dialog.closeAll();
  }


  educationdata() {
    this.educationEmployeedata = [
      { id: 101, value: "Matric" },
      { id: 201, value: "Diploma" },
      { id: 301, value: "Graduate" },
      { id: 401, value: "Intermediate" },
      { id: 501, value: "Post Graduate" },
    ]

  }

}
