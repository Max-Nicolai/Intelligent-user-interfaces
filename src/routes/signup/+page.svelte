<script lang="ts">
    import { auth } from "$lib/firebase";
    import { createUserWithEmailAndPassword } from "firebase/auth";
  
    let email = "";
    let password = "";
    let confirmPassword = "";
    let error = "";
    let success = "";
  
    async function signup() {
      error = ""; // Clear any previous errors
      success = ""; // Clear any previous success messages
  
      // Validate inputs
      if (password !== confirmPassword) {
        error = "Passwords do not match!";
        return;
      }
  
      try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Sign-up successful:", userCredential.user);
        success = "Account created successfully!";
        email = "";
        password = "";
        confirmPassword = "";
      } catch (err) {
        if (err instanceof Error) {
          error = err.message; // Display Firebase error message
          console.error("Sign-up error:", error);
        }
      }
    }
  </script>
  
  <h1 class="text-3xl font-bold mb-4">Sign Up</h1>
  
  <form class="space-y-4" on:submit|preventDefault={signup}>
    <div>
      <label for="email" class="block font-bold">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        class="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div>
      <label for="password" class="block font-bold">Password</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        class="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div>
      <label for="confirmPassword" class="block font-bold">Confirm Password</label>
      <input
        id="confirmPassword"
        type="password"
        bind:value={confirmPassword}
        class="w-full border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  
    {#if error}
      <p class="text-red-500">{error}</p>
    {/if}
    {#if success}
      <p class="text-green-500">{success}</p>
    {/if}
  
    <button
      type="submit"
      class="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
    >
      Sign Up
    </button>
  </form>
  