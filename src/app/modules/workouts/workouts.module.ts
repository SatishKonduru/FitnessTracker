import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutsRoutingModule } from './workouts-routing.module';
import { WorkoutsComponent } from './workouts.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkoutsComponent, NewWorkoutComponent, DashboardComponent],
  imports: [
    CommonModule,
    WorkoutsRoutingModule,
    AngularMaterialModule,
    FormsModule,
  ],
})
export class WorkoutsModule {}
