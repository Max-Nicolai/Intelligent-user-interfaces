<script lang="ts">
    import { workouts } from '$lib/stores';
    import { getAuth } from "firebase/auth";
    import { getFirestore, collection, addDoc } from "firebase/firestore";

    const db = getFirestore(); // Initialize Firestore

  
    // Array to store exercises for the current workout
    let workoutExercises = [
      { name: '', sets: 1, reps: 0, weight: 0 }
    ];

    const auth = getAuth(); // Import Firebase auth
    let user = auth.currentUser; // Get the current user
  
    // Add a new exercise
    function addExercise() {
      workoutExercises = [...workoutExercises, { name: '', sets: 1, reps: 0, weight: 0 }];
    }
  
    // Remove an exercise
    function removeExercise(index: number) {
      workoutExercises = workoutExercises.filter((_, i) => i !== index);
    }
  
    // Handle form submission
    async function handleSubmit(event: SubmitEvent) {
      event.preventDefault();
  
      //Check if the user is logged in
      if (!user) {
        alert("You must be logged in to log a workout!");
        return;
      }

      // Validate all fields
      if (workoutExercises.some(ex => !ex.name || ex.sets <= 0 || ex.reps <= 0)) {
        alert('Please fill out all fields correctly!');
        return;
      }
  
      // Add the workout to firestore
      try {
        const workout = {
            id: Date.now(),
            userId: user.uid,
            exercises: workoutExercises,
            timestamp: new Date().toISOString(),
        };

        await addDoc(collection(db, "workouts"), workout); // Save to Firestore
        alert("Workout logged succesfully!");


         // Reset the form
        workoutExercises = [{ name: '', sets: 1, reps: 0, weight: 0 }];
      } catch (error) {
        console.error("Error saving workout", error);
        alert("Failed to save workout. Please try again")
      }
  
     
    }
  </script>
  
  <h1 class="text-3xl font-bold text-gray-800 mb-6">Log Your Workout</h1>
  
  <form
    class="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    on:submit={handleSubmit}
  >
    <!-- Loop through exercises -->
    {#each workoutExercises as exercise, index}
      <div class="space-y-2 border-b pb-4 mb-4">
        <!-- Exercise Name -->
        <div>
          <label for="exercise-{index}" class="block text-gray-700 font-bold mb-2">Exercise Name</label>
          <input
            id="exercise-{index}"
            type="text"
            bind:value={workoutExercises[index].name}
            class="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Bench Press"
            required
          />
        </div>
  
        <!-- Sets, Reps, Weight -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label for="sets-{index}" class="block text-gray-700 font-bold mb-2">Sets</label>
            <input
              id="sets-{index}"
              type="number"
              bind:value={workoutExercises[index].sets}
              min="1"
              class="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label for="reps-{index}" class="block text-gray-700 font-bold mb-2">Reps</label>
            <input
              id="reps-{index}"
              type="number"
              bind:value={workoutExercises[index].reps}
              min="1"
              class="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label for="weight-{index}" class="block text-gray-700 font-bold mb-2">Weight (kg)</label>
            <input
              id="weight-{index}"
              type="number"
              bind:value={workoutExercises[index].weight}
              min="0"
              class="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>
        </div>
  
        <!-- Remove Exercise Button -->
        <button
          type="button"
          on:click={() => removeExercise(index)}
          class="text-red-500 hover:text-red-700 mt-2"
        >
          Remove Exercise
        </button>
      </div>
    {/each}
  
    <!-- Add Exercise Button -->
    <button
      type="button"
      on:click={addExercise}
      class="w-full bg-gray-200 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-300 transition"
    >
      Add Another Exercise
    </button>
  
    <!-- Submit Workout -->
    <button
      type="submit"
      class="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition mt-4"
    >
      Log Workout
    </button>
  </form>
  