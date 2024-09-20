<script lang="ts">
  import { onMount } from 'svelte';
  import { Calendar, MapPin, User, BookOpen, FileText } from 'lucide-svelte';
  import { fetchGuestLectureDetails, type GuestLecture } from '$lib/functions/fetchFoundationDayLecture';

  let chiefGuest: GuestLecture = {};
  let honorGuest: GuestLecture = {};

  onMount(async () => {
    const { chief, honor } = await fetchGuestLectureDetails();
    chiefGuest = chief;
    honorGuest = honor;
  });
</script>

<main class="max-w-4xl mx-auto px-6 py-12 bg-white">
  <div class="flex flex-col items-center mb-12">
    <div class="h-32 w-32 flex items-center justify-center mb-6 overflow-hidden">
      <img
        src={'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/IISER-Mohali_Logo.svg/440px-IISER-Mohali_Logo.svg.png'}
        alt={"IISER Mohali Logo"}
        class="w-full h-auto object-cover"
      />
    </div>
    <h1 class="text-6xl font-extrabold text-blue text-center">
      Foundation Day Lecture
    </h1>
  </div>

  <!-- Honor Guest Details -->
  {#if honorGuest}
    <div class="border p-8 mb-10 bg-gray-50 rounded-lg flex flex-col md:flex-row items-start">
      <div class="md:w-2/3">
        {#if honorGuest.date}
          <div class="flex items-center mb-6">
            <Calendar class="w-6 h-6 text-blue mr-2" />
            <strong class="text-2xl text-gray-800 mr-2">Date:</strong>
            <span class="text-gray-600">{honorGuest.date}</span>
          </div>
        {/if}
        {#if honorGuest.venue}
          <div class="flex items-center mb-6">
            <MapPin class="w-6 h-6 text-blue mr-2" />
            <strong class="text-2xl text-gray-800 mr-2">Venue:</strong>
            <span class="text-gray-600">{honorGuest.venue}</span>
          </div>
        {/if}
        {#if honorGuest.speaker}
          <div class="flex items-center mb-6">
            <User class="w-6 h-6 text-blue mr-2" />
            <strong class="text-2xl text-gray-800 mr-2">Guest of Honour:</strong>
            <span class="text-gray-600">{honorGuest.speaker}</span>
          </div>
        {/if}
      </div>

      {#if honorGuest.image}
        <div class="md:w-1/3 flex justify-center mt-6 md:mt-0">
          <div class="h-64 w-64 bg-gray-200 flex items-center justify-center rounded-full overflow-hidden shadow-lg">
            <img
              src={honorGuest.image}
              alt={honorGuest.speaker}
              class="w-full h-auto object-cover rounded-full"
            />
          </div>
        </div>
      {/if}
    </div>

    {#if honorGuest.about}
      <section class="mb-12">
        <h2 class="text-5xl font-bold text-blue flex items-center mb-6">
          <User class="w-6 h-6 text-blue mr-2" />
          About the Guest of Honour
        </h2>
        <p class="text-2xl text-gray-600">
          {honorGuest.about}
        </p>
      </section>
    {/if}
  {/if}

  <!-- Chief Guest Details -->
  {#if chiefGuest}
    <div class="border p-8 mb-10 bg-indigo-50 rounded-lg flex flex-col md:flex-row items-start">
      <div class="md:w-2/3">
        {#if chiefGuest.date}
          <div class="flex items-center mb-6">
            <Calendar class="w-6 h-6 text-blue mr-2" />
            <strong class="text-2xl text-gray-800 mr-2">Date:</strong>
            <span class="text-gray-600">{chiefGuest.date}</span>
          </div>
        {/if}
        {#if chiefGuest.venue}
          <div class="flex items-center mb-6">
            <MapPin class="w-6 h-6 text-blue mr-2" />
            <strong class="text-2xl text-gray-800 mr-2">Venue:</strong>
            <span class="text-gray-600">{chiefGuest.venue}</span>
          </div>
        {/if}
        {#if chiefGuest.speaker}
          <div class="flex items-center mb-6">
            <User class="w-6 h-6 text-blue mr-2" />
            <strong class="text-2xl text-gray-800 mr-2">Speaker:</strong>
            <span class="text-gray-600">{chiefGuest.speaker}</span>
          </div>
        {/if}
        {#if chiefGuest.talkTitle}
          <div class="flex items-center">
            <BookOpen class="w-6 h-6 text-blue mr-2" />
            <strong class="text-2xl text-gray-800 mr-2">Title:</strong>
            <span class="text-gray-600">{chiefGuest.talkTitle}</span>
          </div>
        {/if}
      </div>

      {#if chiefGuest.image}
        <div class="md:w-1/3 flex justify-center mt-6 md:mt-0">
          <div class="h-64 w-64 bg-gray-200 flex items-center justify-center rounded-full overflow-hidden shadow-lg">
            <img
              src={chiefGuest.image}
              alt={chiefGuest.speaker}
              class="w-full h-auto object-cover rounded-full"
            />
          </div>
        </div>
      {/if}
    </div>

    {#if chiefGuest.abstract}
      <section class="mb-12">
        <h2 class="text-5xl font-bold text-blue flex items-center mb-6">
          <FileText class="w-6 h-6 text-blue mr-2" />
          Abstract
        </h2>
        <p class="text-2xl text-gray-600">
          {chiefGuest.abstract}
        </p>
      </section>
    {/if}

    {#if chiefGuest.about}
      <section class="mb-12">
        <h2 class="text-5xl font-bold text-blue flex items-center mb-6">
          <User class="w-6 h-6 text-blue mr-2" />
          About the Chief Guest
        </h2>
        <p class="text-2xl text-gray-600">
          {chiefGuest.about}
        </p>
      </section>
    {/if}
  {/if}
</main>
