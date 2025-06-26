// user-profile.model.ts
import { WorkoutHistory } from './workout-history.model';

export interface UserProfile {
  uid: string;
  workoutsCompleted: WorkoutHistory[];
  // Add more app-specific fields as needed
}
