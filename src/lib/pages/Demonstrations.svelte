<script lang="ts">
  import { onMount } from 'svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import { Activity, Loader2, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import * as Accordion from '$lib/components/ui/accordion';
  import * as Carousel from '$lib/components/ui/carousel';
  import { fetchDemonstrations, type ClubDemonstration } from '$lib/functions/fetchDemonstrations';

  const carouselPlugin = Autoplay({ delay: 1500, stopOnInteraction: true });

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

  function sanitizeId(name: string): string {
    return name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
  }

  function handleImageError(e: Event) {
    const img = e.target as HTMLImageElement;
    if (img) {
      img.src = 'https://via.placeholder.com/600x400.png?text=Image+Not+Available';
    }
  }
</script>

<main class="p-8 bg-white w-full max-w-screen-lg mx-auto">
  <h1 id="main-title" class="text-5xl font-bold text-blue flex items-center gap-3">
    <Activity class="w-8 h-8 text-blue" />
    Demonstrations
  </h1>

  <p id="description" class="text-lg text-gray-700 mt-4">
    Each year, on Foundation Day, the various student clubs at IISER Mohali organize engaging scientific demonstrations. These hands-on activities aim to inspire and educate visiting school students, showcasing fascinating concepts in various fields of sciences.
  </p>

  <h2 id="section-heading" class="text-3xl font-bold text-blue mt-12 mb-4">
    List of Demonstrations Sorted by Clubs
  </h2>

  {#if loading}
    <div id="loading" class="flex items-center justify-center h-64">
      <Loader2 class="w-12 h-12 text-gray-800 animate-spin" />
    </div>
  {:else}
    <Accordion.Root class="w-full" aria-labelledby="section-heading">
      {#each demonstrations as club}
        <Accordion.Item value={club.name} class="w-full border-b border-gray-200">
          <Accordion.Trigger
            id={`trigger-${sanitizeId(club.name)}`}
            class="w-full text-2xl font-semibold text-left py-4 hover:bg-gray-100 flex justify-between items-center"
          >
            {club.name}
          </Accordion.Trigger>

          <Accordion.Content
            id={`content-${sanitizeId(club.name)}`}
            class="py-4"
            aria-labelledby={`trigger-${sanitizeId(club.name)}`}
          >
            {#if club.images && club.images.length > 0}
              <Carousel.Root
                plugins={[carouselPlugin]}
                class="w-full max-w-4xl mx-auto mb-6"
                on:mouseenter={carouselPlugin.stop}
                on:mouseleave={carouselPlugin.reset}
                aria-label={`${club.name} image carousel`}
              >
                <Carousel.Content class="flex">
                  {#each club.images as image, i}
                    <Carousel.Item class="flex-none w-full">
                      <picture>
                        <source srcset={`${image}.webp`} type="image/webp">
                        <img
                          src={image}
                          alt={`Slide ${i + 1}`}
                          loading="lazy"
                          on:error={handleImageError}
                          class="w-full h-64 sm:h-48 md:h-64 lg:h-80 object-cover rounded"
                        />
                      </picture>
                    </Carousel.Item>
                  {/each}
                </Carousel.Content>

                <Carousel.Previous class="absolute left-4 top-1/2 transform -translate-y-1/2" >
                  <button
                    aria-label="Previous slide"
                    class="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
                  >
                    <ChevronLeft class="w-6 h-6" />
                  </button>
                </Carousel.Previous>

                <Carousel.Next class="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <button
                    aria-label="Next slide"
                    class="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none"
                  >
                    <ChevronRight class="w-6 h-6" />
                  </button>
                </Carousel.Next>
              </Carousel.Root>
            {/if}

            {#each club.demonstrations as demo}
              <div class="mb-6">
                <h3 class="text-xl font-semibold text-blue">{demo.name}</h3>
                <p class="text-gray-700 mt-2">{demo.description}</p>
              </div>
            {/each}
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  {/if}
</main>
