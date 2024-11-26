<script>
  import '../app.css'; // Import global TailwindCSS styles

  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { workouts } from "$lib/stores";
  import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 

  const auth = getAuth(); // Initialize Firebase Auth
  const db = getFirestore(); // Initialize Firestore
  let user = null; // Reactive variable for the current user

  // Function to fetch user workouts from Firestore
  async function fetchWorkouts() {
    if (!user) return;

    try {
      const q = query(collection(db, "workouts"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const userWorkouts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      workouts.set(userWorkouts); // Update the workouts store
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }

  // Listen for authentication state changes
  onAuthStateChanged(auth, (currentUser) => {
    user = currentUser; // Update the `user` variable
    if (user) {
      console.log("User logged in:", user.uid);
      fetchWorkouts(); // Fetch workouts for the logged-in user
    } else {
      console.log("User logged out");
      workouts.set([]); // Clear the workouts store
    }
  });
</script>


<nav class="bg-blue-600 text-white p-4">
  <div class="container mx-auto flex justify-between items-center">
    <h1 class="text-xl font-bold">Gym Tracker</h1>
    <ul class="flex space-x-4">
      <li><a href="/" class="hover:underline">Home</a></li>
      <li><a href="/log" class="hover:underline">Log Workout</a></li>
      <li><a href="/recommendations" class="hover:underline">Recommendations</a></li>
    </ul>
  </div>
</nav>

<main class="container mx-auto mt-8 p-4">
  <slot />
</main>

<footer class="bg-gray-100 text-gray-600 text-center p-4 mt-8">
  <p>&copy; 2024 Gym Tracker</p>
</footer>
