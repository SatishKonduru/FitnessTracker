import { Component, inject, ViewChild } from '@angular/core';
import { WORKOUTS } from 'src/app/mock-data/workouts.data';
import { Workout } from 'src/app/models/workout.model';
import { WorkoutsService } from '../services/workouts.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css'],
})
export class NewWorkoutComponent {
  // workouts: Workout[] = WORKOUTS;
  workouts: Workout[] = [];
  paginatedWorkouts: Workout[] = [];

  searchTerm = '';
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private workoutService: WorkoutsService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe((data) => {
      this.workouts = data;
      this.applyPagination();
    });
  }

  get filteredWorkouts(): Workout[] {
    return this.workouts.filter((w) =>
      w.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  applyPagination(): void {
    const filtered = this.filteredWorkouts;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedWorkouts = filtered.slice(start, end);
  }

  onSearchChange(): void {
    this.pageIndex = 0;
    if (this.paginator) this.paginator.firstPage();
    this.applyPagination();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }
}
