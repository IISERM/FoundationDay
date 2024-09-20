<script lang="ts">
  import {
    Calendar,
    User,
    FileText,
    Trophy,
    ClipboardCheck,
    Mail,
    Phone,
    School,
    Users,
    Loader2,
  } from 'lucide-svelte';

  import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { onMount } from 'svelte';
  import { fetchCompetitions, type Competition } from '$lib/functions/fetchCompetitions';
  import { competitionRegister, type CompetitionRegistration } from '$lib/functions/competitionRegister';

  let competitions: Competition[] = [];
  let loading = true;

  let candidateNames = '';
  let institution = '';
  let grade = '';
  let contactEmail = '';
  let contactPhone = '';

  async function handleSubmit(competitionName: string) {
    const registrationData: CompetitionRegistration = {
      competitionName,
      candidateNames,
      institution,
      grade,
      contactEmail,
      contactPhone,
    };
    
    await competitionRegister(registrationData);

    candidateNames = '';
    institution = '';
    grade = '';
    contactEmail = '';
    contactPhone = '';

    open = false;
  }

  let open = false;

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
        <div class="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col items-center">
          <div class="h-56 w-full flex items-center justify-center mb-3 overflow-hidden">
            <img
              src={competition.image}
              alt={competition.name}
              class="w-full h-full object-cover rounded"
            />
          </div>
          <h2 class="text-xl font-bold text-center mb-1 text-blue flex items-center justify-center">
            <Trophy class="w-5 h-5 text-blue mr-2" />
            {competition.name}
          </h2>
          <p class="text-gray-700 text-center mb-1 flex items-center justify-center text-sm">
            <Calendar class="w-4 h-4 text-gray-700 mr-2" />
            {competition.schedule}
          </p>
          <p class="text-gray-700 text-center mb-1 flex items-center justify-center text-sm">
            <User class="w-4 h-4 text-gray-700 mr-2" />
            {competition.organiser}
          </p>
          <p class="text-gray-700 text-center mb-3 flex items-center justify-center text-sm">
            <FileText class="w-4 h-4 text-gray-700 mr-2" />
            {competition.short_description}
          </p>

          <AlertDialog.Root open={open}>
            <AlertDialog.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                class="bg-blue hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded flex items-center"
                on:click={() => (open = true)}
              >
                <ClipboardCheck class="w-4 h-4 text-white mr-2" />
                Pre-Register
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay class="bg-black bg-opacity-50 fixed inset-0" />
              <AlertDialog.Content
                class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg max-w-3xl w-full p-4"
                style="max-height: 90vh; overflow-y: auto;"
              >
                <div class="flex flex-col md:flex-row mb-4">
                  <div class="md:w-1/3 flex justify-center mb-3 md:mb-0">
                    <img
                      src={competition.image}
                      alt={competition.name}
                      class="w-40 h-auto object-cover rounded"
                    />
                  </div>
                  <div class="md:w-2/3 md:pl-4">
                    <h2 class="text-2xl font-bold text-blue flex items-center mb-1">
                      <Trophy class="w-5 h-5 text-blue mr-2" />
                      {competition.name}
                    </h2>
                    <p class="text-gray-700 mb-1 flex items-center text-sm">
                      <Calendar class="w-4 h-4 text-gray-700 mr-2" />
                      {competition.schedule}
                    </p>
                    <p class="text-gray-700 mb-1 flex items-center text-sm">
                      <User class="w-4 h-4 text-gray-700 mr-2" />
                      {competition.organiser}
                    </p>
                  </div>
                </div>
                <div class="mb-4">
                  <h3 class="text-lg text-blue font-semibold mb-1">About the Competition</h3>
                  <p class="text-gray-700 text-sm">{competition.long_description}</p>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center space-x-2">
                    <Label for="candidateNames" class="flex items-center w-1/3">
                      <Users class="w-4 h-4 text-gray-700 mr-1" />
                      <span class="text-sm">Candidate Name(s)</span>
                    </Label>
                    <Input
                      id="candidateNames"
                      placeholder="Enter names, separated by commas"
                      bind:value={candidateNames}
                      class="w-2/3 text-sm"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <Label for="institution" class="flex items-center w-1/3">
                      <School class="w-4 h-4 text-gray-700 mr-1" />
                      <span class="text-sm">Institution</span>
                    </Label>
                    <Input
                      id="institution"
                      placeholder="Enter your institution"
                      bind:value={institution}
                      class="w-2/3 text-sm"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <Label for="grade" class="flex items-center w-1/3">
                      <FileText class="w-4 h-4 text-gray-700 mr-1" />
                      <span class="text-sm">Class/Grade</span>
                    </Label>
                    <Input
                      id="grade"
                      placeholder="Enter your class or grade"
                      bind:value={grade}
                      class="w-2/3 text-sm"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <Label for="contactEmail" class="flex items-center w-1/3">
                      <Mail class="w-4 h-4 text-gray-700 mr-1" />
                      <span class="text-sm">Contact Email</span>
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="Enter your email"
                      bind:value={contactEmail}
                      class="w-2/3 text-sm"
                    />
                  </div>
                  <div class="flex items-center space-x-2">
                    <Label for="contactPhone" class="flex items-center w-1/3">
                      <Phone class="w-4 h-4 text-gray-700 mr-1" />
                      <span class="text-sm">Contact Phone</span>
                    </Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      bind:value={contactPhone}
                      class="w-2/3 text-sm"
                    />
                  </div>
                </div>
                <div class="mt-4 flex justify-end space-x-3">
                  <AlertDialog.Cancel asChild let:builder>
                    <Button
                      builders={[builder]}
                      variant="outline"
                      on:click={() => (open = false)}
                    >
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <Button
                    on:click={() => handleSubmit(competition.name)}
                    class="bg-blue hover:bg-indigo-900 text-white"
                  >
                    Submit
                  </Button>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      {/each}
    </div>
  {/if}
</main>
