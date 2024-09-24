<script lang="ts">
    import Label from "$lib/components/ui/label/label.svelte";
    import { Calendar } from "lucide-svelte";
    import ResponsiveImage from "$lib/components/ResponsiveImage.svelte";

    let scheduleImageUrl = "/web/foundationday/EventSchedule.webp";

    function handleImageError(e: Event) {
        const target = e.target as HTMLImageElement | null;
        if (target) {
            target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found';
        }
    }
</script>

<main class="p-8 bg-white">
    <section id="about-schedule" class="text-center mb-12">
        <Label class="text-5xl font-extrabold text-blue flex items-center justify-center">
            <Calendar class="w-10 h-10 mr-2" />
            Schedule
        </Label>
        <p class="mt-4 text-xl text-gray-700">
            Please note that the schedule timings are approximate. We strive to adhere to them as closely as possible, but some adjustments may occur.
        </p>
    </section>

    <section id="schedule-display" class="flex flex-col items-center my-12">
        <div class="w-full max-w-4xl aspect-[3/4]">
            <ResponsiveImage
                src={scheduleImageUrl}
                alt="Event Schedule"
                title="Event Schedule"
                handleImageError={handleImageError}
            />
        </div>
    </section>
</main>
