<script lang="ts">
    import { workouts } from '$lib/stores';
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import type { User } from "firebase/auth";
  
    // Initialize Firebase Auth
    const auth = getAuth();
  
    // Define `user` with type safety
    let user: User | null = null;
  
    // Listen for authentication state changes
    onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      user = currentUser; // Update the `user` variable
    });
  </script>
  
  <h1 class="text-4xl font-bold text-gray-800 mb-6">Welcome to Gym Tracker</h1>
  
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Logged Workouts</h2>
  
    <!-- Show user-specific workouts -->

      {#if user!== null && $workouts.filter(workout => workout.uid === user!.uid).length > 0}
        <ul class="space-y-4">
          {#each $workouts.filter(workout => workout.uid === user!.uid) as workout}
            <li class="border p-4 rounded-lg shadow">
              <h3 class="text-lg font-bold text-gray-800">Workout ID: {workout.id}</h3>
              <ul class="space-y-2 mt-2">
                {#each workout.exercises as exercise}
                  <li>
                    <p><strong>{exercise.name}</strong></p>
                    <p>{exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} kg</p>
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
      {:else if user !== null}
        <p>No workouts logged yet. Start tracking your workouts!</p>
    {:else}
      <p>Please log in to view your workouts.</p>
    {/if}
  </div>
  