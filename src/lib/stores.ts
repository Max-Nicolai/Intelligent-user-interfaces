import { writable } from "svelte/store";

// Define the type for an Exercise
export type Exercise = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

// Define the type for a Workout
export type Workout = {
  id: number; // Unique identifier for the workout
  exercises: Exercise[]; // Array of exercises
  uid: string; // User ID associated with the workout
};

// Create a writable store for workouts
export const workouts = writable<Workout[]>([]);

// Utility function to add a workout
export function addWorkout(newWorkout: Workout) {
  workouts.update((current) => [...current, newWorkout]);
}

// Utility function to remove a workout by ID
export function removeWorkout(workoutId: number) {
  workouts.update((current) => current.filter((workout) => workout.id !== workoutId));
}

// Utility function to update a workout by ID
export function updateWorkout(workoutId: number, updatedData: Partial<Workout>) {
  workouts.update((current) =>
    current.map((workout) =>
      workout.id === workoutId ? { ...workout, ...updatedData } : workout
    )
  );
}
