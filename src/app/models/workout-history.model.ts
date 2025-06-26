// workout-history.model.ts
export interface WorkoutHistory {
  workoutId: number;
  title: string;
  duration: string;
  date: string; // Or `Date` object if needed
  completedTimeInSec: number;
}
