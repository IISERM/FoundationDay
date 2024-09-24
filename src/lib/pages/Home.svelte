<script lang="ts">
  import { onMount } from 'svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import * as Carousel from '$lib/components/ui/carousel';
  import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-svelte';
  import fetchCarouselImages from '$lib/functions/fetchCarouselImages';

  const plugin = Autoplay({ delay: 1500, stopOnInteraction: true });

  let images: { title: string; description: string; image: string }[] = [];
  let loading = true;
  let loadedImages = 0;
  let totalImages = 0;

  function isGoogleDriveLink(url: string): boolean {
      const pattern = /^https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]{25,}\/view(\?.*)?$/;
      return pattern.test(url);
  }

  function getGoogleDriveImageID(url: string): string | null {
      const pattern = /^https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{25,})\/view(\?.*)?$/;
      const match = url.match(pattern);
      return match ? match[1] : null;
  }

  onMount(async () => {
      try {
          images = await fetchCarouselImages();
          totalImages = images.length;

          if (totalImages === 0) {
              loading = false;
          } else {
              images.forEach((img) => {
                  const image = new Image();
                  image.src = img.image;
                  image.onload = image.onerror = () => {
                      loadedImages += 1;
                      if (loadedImages === totalImages) {
                          loading = false;
                      }
                  };
              });
          }
      } catch (error) {
          console.error('Error fetching images:', error);
          loading = false;
      }
  });
</script>

<main class="w-screen overflow-x-hidden">
  {#if loading}
      <div class="flex items-center justify-center h-screen w-screen bg-gray-100">
          <Loader2 class="w-12 h-12 text-gray-800 animate-spin" />
      </div>
  {:else}
      <div class="relative w-screen">
          <Carousel.Root
              plugins={[plugin]}
              class="w-screen h-screen"
              on:mouseenter={plugin.stop}
              on:mouseleave={plugin.reset}
          >
              <Carousel.Content class="flex w-screen h-full m-0">
                  {#each images as image, i (i)}
                      <Carousel.Item class="relative flex-none w-screen h-full pl-0">
                          <div class="relative w-full h-full">
                              {#if isGoogleDriveLink(image.image)}
                                  <iframe
                                      src={`https://drive.google.com/file/d/${getGoogleDriveImageID(image.image)}/preview`}
                                      class="w-full h-full object-cover rounded aspect-[4/3] landscape:aspect-video"
                                      allow="autoplay"
                                      title={`Carousel Image ${i + 1} - ${image.title}`}
                                      frameborder="0"
                                  ></iframe>
                              {:else}
                                  <img
                                      src={image.image}
                                      alt={`Carousel Image ${i + 1} - ${image.title}`}
                                      class="w-full h-full object-cover rounded aspect-[4/3] landscape:aspect-video"
                                      loading="lazy"
                                  />
                              {/if}
                              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
                              <div class="absolute bottom-0 left-0 p-6 w-full text-white">
                                  <h2 class="text-5xl font-extrabold mb-2 text-white">{image.title}</h2>
                                  <p class="text-xl text-white">{image.description}</p>
                              </div>
                          </div>
                      </Carousel.Item>
                  {/each}
              </Carousel.Content>

              <Carousel.Previous class="absolute left-8 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                  <button class="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 focus:outline-none">
                      <ChevronLeft class="w-10 h-10" />
                  </button>
              </Carousel.Previous>

              <Carousel.Next class="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                  <button class="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 focus:outline-none">
                      <ChevronRight class="w-10 h-10" />
                  </button>
              </Carousel.Next>
          </Carousel.Root>
      </div>
  {/if}
</main>
