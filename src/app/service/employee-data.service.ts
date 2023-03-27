import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employeemodel } from '../Model/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private http:HttpClient) { }

  getEmployeeData(url:string):Observable<employeemodel[]>{
     return this.http.get<employeemodel[]>(url);
  }

// save employee details
  saveEmployeeData(url:string , model:any):Observable<employeemodel>{
    return this.http.post<employeemodel>(url,model)
  }

  GetEmployeebycode(url:string,id: any): Observable<employeemodel>{
    return this.http.get<employeemodel>(url + '/' + id);
  }

  deleteEmployeeById(url:string , id:number){
    return this.http.delete(url + '/' + id );
  }

  
  updateEmployeeData(url:string ,id:number, model:any):Observable<employeemodel>{
    return this.http.put<employeemodel>(url + '/' + id , model)
  }
}
