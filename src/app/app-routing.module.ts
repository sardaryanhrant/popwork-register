import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
