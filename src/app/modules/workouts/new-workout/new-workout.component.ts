import { Component } from '@angular/core';
import { WORKOUTS } from 'src/app/mock-data/workouts.data';
import { Workout } from 'src/app/models/workout.model';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css'],
})
export class NewWorkoutComponent {
  workouts: Workout[] = WORKOUTS;
}
