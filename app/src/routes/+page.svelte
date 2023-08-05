<script lang="ts">
    import { generateImage } from "$lib/generate";

    let ids: string[] = [];
    let selectedId: string;
    let prompt: string;
    let isGenerating = false;

    const generate = async () => {
        if (!prompt) return;
        isGenerating = true;
        const tempIds = await generateImage(prompt, { fast: true });
        ids = [...tempIds, ...ids];
        selectedId = ids[0];
        isGenerating = false;
    };
</script>

<div class="flex justify-center space-x-10">
    <div class="w-[512px] h-[512px] bg-neutral-800 rounded-xl overflow-hidden relative shadow-2xl">
        <img
            src={selectedId ? `http://localhost:8000/image/${selectedId}` : ""}
            alt=""
            width="512"
            class={isGenerating ? "opacity-20" : ""}
        />
        {#if isGenerating}
            <div class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <div
                    class="inline-block opacity-80 h-12 w-12 animate-spin rounded-full border-[6px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                />
            </div>
        {/if}
    </div>
    <div class="flex flex-col justify-between">
        <textarea
            bind:value={prompt}
            class="bg-neutral-800 rounded py-1 px-2 outline-none resize-none"
            placeholder="Enter a prompt"
            rows="1"
            disabled={isGenerating}
        />
        <button
            on:click={generate}
            class="bg-blue-700 disabled:bg-neutral-800 rounded py-1 px-2"
            disabled={isGenerating}
        >
            Generate
        </button>
    </div>
</div>

<div class="flex flex-wrap gap-5 justify-center items-center rounded-lg mt-10">
    {#each ids as id}
        <button
            on:click={() => (selectedId = id)}
            class="rounded-lg overflow-hidden bg-neutral-800"
        >
            <img
                src={`http://localhost:8000/image/${id}`}
                alt=""
                width="96"
                height="96"
                class={id === selectedId ? "" : "opacity-20"}
            />
        </button>
    {/each}
</div>
