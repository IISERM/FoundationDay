<script lang="ts">
  import { onMount } from 'svelte';
  import { Activity, Loader2 } from 'lucide-svelte';
  import * as Accordion from '$lib/components/ui/accordion';
  import { fetchDemonstrations, type ClubDemonstration } from '$lib/functions/fetchDemonstrations';

  let demonstrations: ClubDemonstration[] = [];
  let loading = true;

  onMount(async () => {
    try {
      demonstrations = await fetchDemonstrations();
    } catch (error) {
      console.error('Error fetching demonstrations:', error);
    } finally {
      loading = false;
    }
  });
</script>

<main class="p-8 bg-white w-full max-w-screen-lg mx-auto">
  <h1 class="text-5xl font-bold text-blue flex items-center gap-3">
    <Activity class="w-8 h-8 text-blue" />
    Demonstrations
  </h1>

  <p class="text-lg text-gray-700 mt-4">
    Each year, on Foundation Day, the various student clubs at IISER Mohali organize engaging scientific demonstrations. These hands-on activities aim to inspire and educate visiting school students, showcasing fascinating concepts in various fields of sciences.
  </p>

  <h2 class="text-3xl font-bold text-blue mt-12 mb-4">List of Demonstrations Sorted by Clubs</h2>

  {#if loading}
    <div class="flex items-center justify-center h-64">
      <Loader2 class="w-12 h-12 text-gray-800 animate-spin" />
    </div>
  {:else}
    {#each demonstrations as club}
      <h2 class="text-4xl font-bold text-blue mt-12 mb-6">{club.name}</h2>

      <Accordion.Root class="w-full">
        {#each club.demonstrations as demo}
          <Accordion.Item value={`${club.name}-${demo.name}`} class="w-full border-b border-gray-200">
            <Accordion.Trigger class="w-full text-2xl font-semibold text-left py-4 hover:bg-gray-100 flex justify-between items-center">
              {demo.name}
            </Accordion.Trigger>
            <Accordion.Content>
              <div class="flex flex-col md:flex-row gap-4 mt-4">
                <div class="md:w-1/3">
                  {#if demo.image_link}
                    <img
                      src={demo.image_link}
                      alt={demo.name}
                      class="w-full h-auto object-cover rounded"
                    />
                  {:else}
                    <img
                      src={`https://via.placeholder.com/600x400.png?text=${demo.name.replace(" ", "+")}`}
                      alt={demo.name}
                      class="w-full h-auto object-cover rounded"
                    />
                  {/if}
                </div>
                <div class="md:w-2/3">
                  <p class="text-gray-700">{demo.description}</p>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        {/each}
      </Accordion.Root>
    {/each}
  {/if}
</main>
