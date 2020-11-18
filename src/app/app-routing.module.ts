import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketFormComponent } from 'src/app/ticket-form/ticket-form.component';

const routes: Routes = [
  {
    path: '',
    component: TicketFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
