import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Workout } from 'src/app/models/workout.model';
import { NotificationDialogComponent } from 'src/app/shared/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-workout-dialog',
  templateUrl: './workout-dialog.component.html',
  styleUrls: ['./workout-dialog.component.css'],
})
export class WorkoutDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Workout,
    private dialogRef: MatDialogRef<WorkoutDialogComponent>,
    private dialog: MatDialog
  ) {}

  counter = 0;
  isRunning = false;
  interval: any;
  durationInSeconds = 2; // You can dynamically map this from data.duration
  audio = new Audio('assets/sounds/alert.mp3');
  progress = 0;

  start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.counter = 0;

    this.interval = setInterval(() => {
      this.counter++;
      this.progress = (this.counter / this.durationInSeconds) * 100;

      if (this.counter >= this.durationInSeconds) {
        this.stopTimer();

        this.audio.loop = false;
        this.audio.play();

        const alertRef = this.dialog.open(NotificationDialogComponent, {
          width: '500px',
          data: {
            message: 'Successfully done this workout!',
            type: 'success',
          },
          disableClose: true,
        });

        alertRef.afterClosed().subscribe(() => {
          this.audio.pause();
          this.audio.currentTime = 0;
          this.dialogRef.close();
        });
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
