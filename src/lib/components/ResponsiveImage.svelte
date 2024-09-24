<script lang="ts">
    export let src: string;
    export let alt: string;
    export let title: string = "Image";

    import { isGoogleDriveLink, getGoogleDriveImageID } from '$lib/functions/imageUtils';
    export let handleImageError: (e: Event) => void;
</script>

<div class="relative w-full h-full">
    {#if isGoogleDriveLink(src)}
        <iframe
            src={`https://drive.google.com/file/d/${getGoogleDriveImageID(src)}/preview`}
            class="w-full h-full object-cover rounded shadow-md aspect-video"
            allow="autoplay"
            title={title}
            frameborder="0"
        ></iframe>
    {:else}
        <img
            src={src}
            alt={alt}
            class="w-full h-full object-cover rounded shadow-md aspect-video"
            loading="lazy"
            on:error={handleImageError}
        />
    {/if}
</div>
