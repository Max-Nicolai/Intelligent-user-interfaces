import { writable } from 'svelte/store';

export const workouts = writable([
  {
    id: Date.now(),
    exercises: [
      { name: 'Bench Press', sets: 3, reps: 10, weight: 80 },
      { name: 'Squats', sets: 4, reps: 12, weight: 100 },
    ],
  },
]);
