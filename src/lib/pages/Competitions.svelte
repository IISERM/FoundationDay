<script lang="ts">
  import { onMount } from 'svelte';
  import { Loader2 } from 'lucide-svelte';
  import { fetchCompetitions, type Competition } from '$lib/functions/fetchCompetitions';
  import CompetitionCard from '$lib/components/CompetitionCard.svelte';

  let competitions: Competition[] = [];
  let loading = true;

  onMount(async () => {
      try {
          competitions = await fetchCompetitions();
      } catch (error) {
          console.error('Error fetching competitions:', error);
      } finally {
          loading = false;
      }
  });

</script>

<main class="max-w-7xl mx-auto px-4 py-8 bg-white">
  <div id="header-section" class="bg-blue text-white text-center py-8 rounded-md">
      <h1 class="text-4xl font-extrabold text-white">Quizzes and Competitions</h1>
      <h2 class="text-xl font-semibold mt-4 text-white">Engage and Compete</h2>
  </div>

  <div id="notice-section" class="text-center my-6">
      <p class="text-lg">Please Pre-Register for Competitions</p>
      <p class="text-base text-gray-600">
          It is the duty of participants not to participate in events that clash with each other.
      </p>
  </div>

  {#if loading}
      <div class="flex items-center justify-center h-screen">
          <Loader2 class="w-12 h-12 text-gray-800 animate-spin" />
      </div>
  {:else}
      <h1 class="text-3xl font-bold text-blue mb-6">All Competitions</h1>

      <div id="competitions-section" class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {#each competitions as competition}
              <CompetitionCard {competition} />
          {/each}
      </div>
  {/if}
</main>

