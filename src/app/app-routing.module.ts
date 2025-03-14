import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component'; // Standalone
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'appointmentcreate', component: AppointmentCreateComponent, canActivate: [AuthGuard] },
  { path: 'appointmentview', component: AppointmentViewComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
