import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
import { Workout } from 'src/app/models/workout.model';

@Component({
  selector: 'app-workout-dialog',
  templateUrl: './workout-dialog.component.html',
  styleUrls: ['./workout-dialog.component.css'],
})
export class WorkoutDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Workout,
    private dialogRef: MatDialogRef<WorkoutDialogComponent>
  ) {}

  counter = 0;
  isRunning = false;
  interval: any;
  durationInSeconds = 30; // You can dynamically map from data.duration
  audio = new Audio('assets/sounds/alert.mp3'); // Replace with your actual file
  progress = 0;

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    this.interval = setInterval(() => {
      this.counter++;
      this.progress = (this.counter / this.durationInSeconds) * 100;

      if (this.counter >= this.durationInSeconds) {
        this.stopTimer();
        this.audio.play();
        setTimeout(() => {
          const confirmClose = confirm(
            'Great! Successfully done this workout!'
          );
          if (confirmClose) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.dialogRef.close();
          } else {
            this.audio.pause();
            this.audio.currentTime = 0;
          }
        }, 200);
      }
    }, 1000);
  }

  pause(): void {
    clearInterval(this.interval);
    this.isRunning = false;
  }

  stop(): void {
    this.stopTimer();
  }

  stopTimer(): void {
    clearInterval(this.interval);
    this.isRunning = false;
    this.counter = 0;
    this.progress = 0;
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
