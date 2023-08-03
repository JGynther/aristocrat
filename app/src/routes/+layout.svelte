<script lang="ts">
    import "../global.css";
</script>

<div class="bg-neutral-900 min-h-screen flex flex-col text-white">
    <div class="flex flex-col flex-grow mx-10">
        <header class="h-10" />
        <div class="flex flex-col flex-grow">
            <slot />
        </div>
        <footer class="h-5" />
    </div>
</div>
