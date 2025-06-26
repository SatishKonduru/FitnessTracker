import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Workout } from 'src/app/models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  constructor(private http: HttpClient) {}
  // getWorkouts(): Observable<Workout[]> {
  //   return of(WORKOUTS); // simulate HTTP call
  // }

  private Url = 'assets/data/workouts.json';
  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.Url);
  }
}
