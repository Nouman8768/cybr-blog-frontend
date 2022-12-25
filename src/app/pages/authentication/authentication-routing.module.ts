import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from 'src/app/shared/guard/deactivate.guard';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DeactivateGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [DeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
