<script lang="ts">
  import { User, School, ClipboardCheck } from 'lucide-svelte';
  import { schoolRegister, type SchoolRegistration } from '$lib/functions/schoolRegister';
  import { individualRegister, type IndividualRegistration } from '$lib/functions/individualRegister';

  let individualName = '';
  let individualSchool = '';
  let individualGrade = '';
  let individualEmail = '';
  let individualPhone = '';

  let schoolName = '';
  let schoolEmail = '';
  let teacherName = '';
  let teacherEmail = '';
  let teacherPhone = '';
  let totalStudents = '';
  let studentsGrade1to5 = '';
  let studentsGrade6to8 = '';
  let studentsGrade9to12 = '';

  let showIndividualRegistration = true;

  async function individualRegistration() {
    const individualData: IndividualRegistration = {
      name: individualName,
      school: individualSchool,
      grade: individualGrade,
      email: individualEmail,
      phone: individualPhone,
    };
    
    await individualRegister(individualData);

    individualName = '';
    individualSchool = '';
    individualGrade = '';
    individualEmail = '';
    individualPhone = '';
  }

  async function schoolRegistration() {
    const schoolData: SchoolRegistration  = {
      schoolName,
      schoolEmail,
      teacherName,
      teacherEmail,
      teacherPhone,
      totalStudents,
      studentsGrade1to5,
      studentsGrade6to8,
      studentsGrade9to12,
    };
    
    await schoolRegister(schoolData);

    schoolName = '';
    schoolEmail = '';
    teacherName = '';
    teacherEmail = '';
    teacherPhone = '';
    totalStudents = '';
    studentsGrade1to5 = '';
    studentsGrade6to8 = '';
    studentsGrade9to12 = '';
  }
</script>

<main class="max-w-4xl mx-auto px-4 py-8 bg-white">
  <div class="bg-blue text-white text-center py-8 rounded-md mb-8">
    <h1 class="text-4xl font-extrabold text-white px-10">Registration for Foundation Day 2023</h1>
    <p class="text-lg mt-2">Engage, Learn, and Compete</p>
  </div>

  <div class="text-center mb-8">
    <p class="text-lg">Please register yourself for a hassle-free experience.</p>
  </div>

  <div class="flex justify-center gap-4 mb-8">
    <button
      class="flex items-center bg-blue text-white font-bold py-2 px-6 rounded-md"
      on:click={() => showIndividualRegistration = true}
    >
      <User class="inline w-5 h-5 text-white mr-2" />
      Individual Registration
    </button>
    <button
      class="flex items-center bg-blue text-white font-bold py-2 px-6 rounded-md"
      on:click={() => showIndividualRegistration = false}
    >
      <School class="inline w-5 h-5 text-white mr-2" />
      School Registration
    </button>
  </div>

  {#if showIndividualRegistration}
  <!-- Individual Registration Form -->
  <section id="individual-registration" class="mb-12">
    <h2 class="text-3xl font-bold text-blue mb-6">Individual Registration</h2>
    <div class="bg-gray-50 rounded-lg shadow-md p-6">
      <div class="space-y-4">
        <div>
          <label for="individualName" class="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            id="individualName"
            type="text"
            bind:value={individualName}
            placeholder="Enter your name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="individualSchool" class="block text-gray-700 font-medium mb-1">
            School Name
          </label>
          <input
            id="individualSchool"
            type="text"
            bind:value={individualSchool}
            placeholder="Enter your school name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="individualGrade" class="block text-gray-700 font-medium mb-1">
            Class/Grade
          </label>
          <input
            id="individualGrade"
            type="text"
            bind:value={individualGrade}
            placeholder="Enter your class or grade"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="individualEmail" class="block text-gray-700 font-medium mb-1">
            Email Address
          </label>
          <input
            id="individualEmail"
            type="email"
            bind:value={individualEmail}
            placeholder="Enter your email address"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="individualPhone" class="block text-gray-700 font-medium mb-1">
            Phone Number
          </label>
          <input
            id="individualPhone"
            type="tel"
            bind:value={individualPhone}
            placeholder="Enter your phone number"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          on:click={individualRegistration}
          class="bg-blue hover:bg-indigo-900 text-white font-bold py-2 px-6 rounded-md flex items-center"
        >
          <ClipboardCheck class="inline w-5 h-5 text-white mr-2" />
          Submit
        </button>
      </div>
    </div>
  </section>
  {/if}

  {#if !showIndividualRegistration}
  <!-- School Registration Form -->
  <section id="school-registration">
    <h2 class="text-3xl font-bold text-blue mb-6">School or Teacher Registration</h2>
    <div class="bg-gray-50 rounded-lg shadow-md p-6">
      <div class="space-y-4">
        <div>
          <label for="schoolName" class="block text-gray-700 font-medium mb-1">
            School Name
          </label>
          <input
            id="schoolName"
            type="text"
            bind:value={schoolName}
            placeholder="Enter the school's name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="schoolEmail" class="block text-gray-700 font-medium mb-1">
            School Email
          </label>
          <input
            id="schoolEmail"
            type="email"
            bind:value={schoolEmail}
            placeholder="Enter the school's email address"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="teacherName" class="block text-gray-700 font-medium mb-1">
            Teacher Name
          </label>
          <input
            id="teacherName"
            type="text"
            bind:value={teacherName}
            placeholder="Enter the teacher's name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="teacherEmail" class="block text-gray-700 font-medium mb-1">
            Teacher Email
          </label>
          <input
            id="teacherEmail"
            type="email"
            bind:value={teacherEmail}
            placeholder="Enter the teacher's email address"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="teacherPhone" class="block text-gray-700 font-medium mb-1">
            Teacher Phone Number
          </label>
          <input
            id="teacherPhone"
            type="tel"
            bind:value={teacherPhone}
            placeholder="Enter the teacher's phone number"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label for="totalStudents" class="block text-gray-700 font-medium mb-1">
            Total Number of Students
          </label>
          <input
            id="totalStudents"
            type="number"
            bind:value={totalStudents}
            placeholder="Enter the total number of students"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="studentsGrade1to5" class="block text-gray-700 font-medium mb-1">
              Grade 1-5
            </label>
            <input
              id="studentsGrade1to5"
              type="number"
              bind:value={studentsGrade1to5}
              placeholder="Number of students"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label for="studentsGrade6to8" class="block text-gray-700 font-medium mb-1">
              Grade 6-8
            </label>
            <input
              id="studentsGrade6to8"
              type="number"
              bind:value={studentsGrade6to8}
              placeholder="Number of students"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label for="studentsGrade9to12" class="block text-gray-700 font-medium mb-1">
              Grade 9-12
            </label>
            <input
              id="studentsGrade9to12"
              type="number"
              bind:value={studentsGrade9to12}
              placeholder="Number of students"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          on:click={schoolRegistration}
          class="bg-blue hover:bg-indigo-900 text-white font-bold py-2 px-6 rounded-md flex items-center"
        >
          <ClipboardCheck class="inline w-5 h-5 text-white mr-2" />
          Submit
        </button>
      </div>
    </div>
  </section>
  {/if}
</main>
