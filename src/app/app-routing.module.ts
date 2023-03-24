import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesinfoComponent } from './employeesinfo/employeesinfo.component';

const routes: Routes = [
  {path:"" , component:EmployeesinfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
