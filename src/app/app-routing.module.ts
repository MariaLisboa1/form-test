import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormWithEventsComponent } from './form-with-events/form-with-events.component';


const routes: Routes = [
  { 
    path: '', component: FormWithEventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
