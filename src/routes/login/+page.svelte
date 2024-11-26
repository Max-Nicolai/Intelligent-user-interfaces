<script lang="ts">
  import { auth } from "$lib/firebase";
  import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
  import type { User } from "firebase/auth";

  let email = "";
  let password = "";
  let user: User | null = null;

  // Listen for authentication state changes
  onAuthStateChanged(auth, (authUser: User | null) => {
    user = authUser;
  });

  // Login function
  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  // Logout function
  async function logout() {
    await signOut(auth);
    alert("Logged out!");
  }
</script>

<h1>Test Firebase Authentication</h1>

{#if user}
  <p>Welcome, {user.email}!</p>
  <button on:click={logout}>Logout</button>
{:else}
  <form on:submit|preventDefault={login}>
    <input type="email" placeholder="Email" bind:value={email} required />
    <input type="password" placeholder="Password" bind:value={password} required />
    <button type="submit">Login</button>
  </form>
{/if}


