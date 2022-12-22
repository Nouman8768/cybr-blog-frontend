import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user.profile-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
