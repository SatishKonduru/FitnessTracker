import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WORKOUTS } from 'src/app/mock-data/workouts.data';
import { Workout } from 'src/app/models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  constructor() {}
  getWorkouts(): Observable<Workout[]> {
    return of(WORKOUTS); // simulate HTTP call
  }
}
