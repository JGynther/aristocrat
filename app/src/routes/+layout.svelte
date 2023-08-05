<script lang="ts">
    import "../global.css";
</script>

<div class="min-h-screen flex flex-col text-white">
    <div class="flex flex-col flex-grow px-10 background bg-neutral-900 z-0 relative">
        <header class="h-10" />
        <div class="flex flex-col flex-grow">
            <slot />
        </div>
        <footer class="h-5" />
    </div>
</div>
