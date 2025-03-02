<script lang="ts">
    import Label from "$lib/components/ui/label/label.svelte";
    import { Info, Target, Users, UserCheck } from "lucide-svelte";
    import { fetchPeople, type ClubPeople, type People } from "$lib/functions/fetchPeople";
    import { onMount } from "svelte";
    import { getGoogleDriveImageID, isGoogleDriveLink } from "$lib/functions/imageUtils";

    let coreTeam: People[] = [];
    let clubCoordinators: ClubPeople[] = [];
    let loading = true;
  
    onMount(async () => {
        try {
            const fetchedPeople = await fetchPeople();
            coreTeam = fetchedPeople.find(club => club.name === "Core Committee")?.people || [];
            clubCoordinators = fetchedPeople.filter(club => club.name !== "Core Committee");
        } catch (error) {
            console.error("Error fetching people:", error);
        } finally {
            loading = false;
        }
    });
</script>
  
<main class="p-8 bg-white">
    <section id="about-iiser-mohali" class="text-center mb-12">
        <Label class="text-5xl font-extrabold text-blue flex items-center justify-center">
            <Info class="w-10 h-10 mr-2" />
            About IISER Mohali
        </Label>
        <p class="mt-4 text-xl text-gray-700">
            Founded in 2006, IISER Mohali is a hub for scientific research and education, located in a sprawling 125-acre campus in Mohali's Knowledge City. We offer BS-MS Dual, PhD, and Integrated PhD programs.
        </p>
    </section>
  
    <section id="history-of-iiser-mohali" class="flex flex-col md:flex-row gap-8 my-12">
        <div class="w-full md:w-1/2">
            <Label class="text-4xl font-bold text-blue flex items-center">
                <Info class="w-8 h-8 mr-2" />
                History of IISER Mohali
            </Label>
            <p class="mt-4 text-xl text-gray-700">
                Starting in 2007, two years after the first two IISERs were set up in Pune and Kolkata, IISER Mohali began its academic journey with 25 BS-MS students in the transit campus of MGSIPAP, Chandigarh.
                In the subsequent 15 years, IISER Mohali has grown to become a veritable force in Indian science with a vibrant community of undergraduate students, research scholars, scientists, and professors. Currently housed in a
                125-acre lush green campus in Mohali, with brick-and-mortar buildings reminiscent of the brutalist aesthetic of Chandigarh, IISER Mohali is a living embodiment of its motto: in the pursuit of knowledge.
            </p>
        </div>
  
        <div class="w-full md:w-1/2">
            <Label class="text-4xl font-bold text-blue flex items-center">
                <Info class="w-8 h-8 mr-2" />
                Foundation Day
            </Label>
            <p class="mt-4 text-xl text-gray-700">
                Foundation Day is a unique event in the IISER Mohali calendar. To commemorate the day the foundation stone of the institute was laid, every year on 27th September, students from all across the tri-city area are invited
                and are presented with a fun day filled with science, activities, and research.
            </p>
        </div>
    </section>
  
    <section id="mission-and-vision" class="my-12">
        <Label class="text-4xl font-bold text-blue flex items-center">
            <Target class="w-8 h-8 mr-2" />
            Mission and Vision
        </Label>
        <p class="mt-4 text-xl text-gray-700">
            Foundation Day aims to make science accessible to everyone and popularize it among the young. This lies at the core of the IISER Mohali philosophy: to bring science to society and inspire a generation of thinkers, scholars, and scientists by exposing them to the breakthroughs in research in the modern world. Organized by students, the day is filled with fun demonstrations organized by different clubs cutting across disciplines and enjoyable for both young kids and high school students.
  
            Striving for academic excellence, our vision is to nurture a new generation of scientists in an intellectually vibrant atmosphere. We aim to be a global center for innovative research and interdisciplinary education.
        </p>
    </section>
  
    <section id="foundation-day-2024" class="flex flex-col items-center mt-12">
        <Label class="text-5xl font-extrabold text-blue flex items-center">
            <Info class="w-10 h-10 mr-2" />
            Foundation Day 2024
        </Label>
        <p class="mt-4 text-xl text-gray-700">
            Watch the trailer for IISER Mohali Foundation Day 2024, celebrating 18 years of excellence in science and education.
        </p>
        <iframe src="https://www.youtube.com/embed/GRZuKIkrD0o" title="Teaser for 18th Foundation Day 2024" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="aspect-[4/3] w-full"></iframe>
    </section>
  
    <section id="core-committee" class="my-12">
        <Label class="text-4xl font-bold text-blue flex items-center">
            <Users class="w-8 h-8 mr-2" />
            Core Committee
        </Label>
        {#if loading}
            <div class="flex justify-center items-center mt-8">
                <svg class="animate-spin h-8 w-8 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
            </div>
        {:else}
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {#each coreTeam as member}
                    <div class="text-center">
                        <div class="w-full aspect-[3/4] overflow-hidden mb-4">
                            {#if isGoogleDriveLink(member.image)}
                                <iframe
                                    src={`https://drive.google.com/file/d/${getGoogleDriveImageID(member.image)}/preview`}
                                    class="w-full h-full"
                                    allow="autoplay"
                                    title={member.name}
                                ></iframe>
                            {:else}
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            {/if}
                        </div>
                        <p class="text-xl font-bold uppercase">{member.name}</p>
                        <p class="text-gray-700">{member.position}</p>
                    </div>
                {/each}
            </div>
        {/if}
    </section>
  
    <section id="club-coordinators" class="my-12">
        <Label class="text-4xl font-bold text-blue flex items-center">
            <UserCheck class="w-8 h-8 mr-2" />
            Club Coordinators
        </Label>
        {#if loading}
            <div class="flex justify-center items-center mt-8">
                <svg class="animate-spin h-8 w-8 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
            </div>
        {:else}
            {#each clubCoordinators as club}
                <div class="mt-8">
                    <h3 class="text-3xl font-semibold text-blue">{club.name}</h3>
                    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {#each club.people as coordinator}
                            <div class="text-center">
                                <div class="w-full aspect-[3/4] overflow-hidden mb-4">
                                    {#if isGoogleDriveLink(coordinator.image)}
                                        <iframe
                                            src={`https://drive.google.com/file/d/${getGoogleDriveImageID(coordinator.image)}/preview`}
                                            class="w-full h-full"
                                            allow="autoplay"
                                            title={coordinator.name}
                                        ></iframe>
                                    {:else}
                                        <img
                                            src={coordinator.image}
                                            alt={coordinator.name}
                                            class="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    {/if}
                                </div>
                                <p class="text-xl font-bold uppercase">{coordinator.name}</p>
                                <p class="text-gray-700">{coordinator.position}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        {/if}
    </section>
</main>