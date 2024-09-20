<script lang="ts">
  import { Home as HomeIcon, Info, Trophy, Monitor, BookOpen, UserPlus } from 'lucide-svelte';

  import Home from "$lib/pages/Home.svelte";
  import About from "$lib/pages/About.svelte";
  import Competitions from "$lib/pages/Competitions.svelte";
  import Demonstrations from "$lib/pages/Demonstrations.svelte";
  import Lecture from "$lib/pages/Lecture.svelte";
  import Register from "$lib/pages/Register.svelte";

  enum Pages {
    HOME = 'Home',
    ABOUT = 'About',
    COMPETITIONS = 'Competitions',
    DEMONSTRATIONS = 'Demonstrations',
    LECTURE = 'Foundation Day Lecture',
    REGISTER = 'Register'
  }

  let activePage: Pages = Pages.HOME;

  const setActivePage = (page: Pages) => {
    activePage = page;
  };
</script>

<main class="min-h-screen flex flex-col justify-start items-center bg-gray-100">
  <img 
    alt="Foundation Day Banner" 
    src="/banner.webp" 
    class="h-10 w-full object-cover"
  />
  <div id="Header" class="bg-blue w-full px-20 justify-between items-center border-b shadow-sm flex space-x-6 text-white">
    <button on:click={() => setActivePage(Pages.HOME)} class="relative -translate-y-1 flex items-center space-x-1 transition-colors duration-200 hover:text-white border-b-2 {activePage === Pages.HOME ? 'border-white text-white font-bold' : 'border-transparent'}">
      <HomeIcon class="w-4 h-4" />
      <span class={activePage === Pages.HOME ? 'first-letter:text-xl' : ''}>Home</span>
    </button>
    <button on:click={() => setActivePage(Pages.ABOUT)} class="relative -translate-y-1 flex items-center space-x-1 transition-colors duration-200 hover:text-white border-b-2 {activePage === Pages.ABOUT ? 'border-white text-white font-bold' : 'border-transparent'}">
      <Info class="w-4 h-4" />
      <span class={activePage === Pages.ABOUT ? 'first-letter:text-xl' : ''}>About</span>
    </button>
    <button on:click={() => setActivePage(Pages.COMPETITIONS)} class="relative -translate-y-1 flex items-center space-x-1 transition-colors duration-200 hover:text-white border-b-2 {activePage === Pages.COMPETITIONS ? 'border-white text-white font-bold' : 'border-transparent'}">
      <Trophy class="w-4 h-4" />
      <span class={activePage === Pages.COMPETITIONS ? 'first-letter:text-xl' : ''}>Competitions</span>
    </button>
    <button on:click={() => setActivePage(Pages.DEMONSTRATIONS)} class="relative -translate-y-1 flex items-center space-x-1 transition-colors duration-200 hover:text-white border-b-2 {activePage === Pages.DEMONSTRATIONS ? 'border-white text-white font-bold' : 'border-transparent'}">
      <Monitor class="w-4 h-4" />
      <span class={activePage === Pages.DEMONSTRATIONS ? 'first-letter:text-xl' : ''}>Demonstrations</span>
    </button>
    <button on:click={() => setActivePage(Pages.LECTURE)} class="relative -translate-y-1 flex items-center space-x-1 transition-colors duration-200 hover:text-white border-b-2 {activePage === Pages.LECTURE ? 'border-white text-white font-bold' : 'border-transparent'}">
      <BookOpen class="w-4 h-4" />
      <span class={activePage === Pages.LECTURE ? 'first-letter:text-xl' : ''}>Foundation Day Lecture</span>
    </button>
    <button on:click={() => setActivePage(Pages.REGISTER)} class="relative -translate-y-1 flex items-center space-x-1 transition-colors duration-200 hover:text-white border-b-2 {activePage === Pages.REGISTER ? 'border-white text-white font-bold' : 'border-transparent'}">
      <UserPlus class="h-4 w-4" />
      <span class={activePage === Pages.REGISTER ? 'first-letter:text-xl' : ''}>Register</span>
    </button>
  </div>  

  {#if activePage === Pages.HOME}
    <Home />
  {/if}

  {#if activePage === Pages.ABOUT}
    <About />
  {/if}

  {#if activePage === Pages.COMPETITIONS}
    <Competitions />
  {/if}

  {#if activePage === Pages.DEMONSTRATIONS}
    <Demonstrations />
  {/if}

  {#if activePage === Pages.LECTURE}
    <Lecture />
  {/if}

  {#if activePage === Pages.REGISTER}
    <Register />
  {/if}

  <!-- Footer -->
  <div id="footer" class="bg-blue text-white w-full">
    <div class="py-10">
      <div class="container mx-auto">
        <div class="flex flex-row justify-between">

          <div>
            <h3 class="text-4xl font-bold">IISER Mohali</h3>
            <p class="mt-4">
              Dean Outreach and International Relations <br>
              Indian Institute of Science Education and Research (IISER), Mohali <br>
              Knowledge city, Sector 81, Manauli, PO<br>
              Sahibzada Ajit Singh Nagar, Punjab 140306<br>
              India<br><br>
              <strong>Phone:</strong> +91 76763 30891<br>
              <strong>Email:</strong> foundationday@iisermohali.ac.in<br>
            </p>
          </div>
  
          <div>
            <h4 class="text-4xl font-bold">Reach Us</h4>
            <div class="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.9410490715145!2d76.72695507631119!3d30.663788474617704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fe956a41db409%3A0x8f96794a996192bb!2sINDIAN%20INSTITUTE%20OF%20SCIENCE%20EDUCATION%20AND%20RESEARCH%2C%20INST%20Hostel%20Rd%2C%20Sector%2081%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%20140306!5e0!3m2!1sen!2sin!4v1694265091237!5m2!1sen!2sin"
                class="w-full h-48"
                style="border:0;"
                allowfullscreen={true}
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Location of IISER Mohali on Google Maps">
              </iframe>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  #Header {
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  #footer h3, #footer h4 {
    color: #fff;
    font-weight: 700;
  }

  #footer iframe {
    border: 2px solid #fff;
  }

</style>
