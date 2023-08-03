<script lang="ts">
    import { generateImage } from "$lib/generate";

    let ids: string[] = [];
    let selectedId: string;
    let prompt: string;

    const generate = async () => {
        if (!prompt) return;
        const tempIds = await generateImage(prompt, { fast: true });
        ids = [...tempIds, ...ids];
        selectedId = ids[0];
    };
</script>

<div class="flex justify-center space-x-5">
    <div class="w-[512px] h-[512px] bg-neutral-800 rounded-lg overflow-hidden">
        <img
            src={selectedId ? `http://localhost:8000/image/${selectedId}` : ""}
            alt=""
            width="512"
        />
    </div>
    <div class="flex flex-col justify-between">
        <div>
            <input
                bind:value={prompt}
                class="text-black bg-neutral-700 rounded py-1 px-2"
                placeholder="Enter a prompt"
            />
        </div>
        <button on:click={generate} class="bg-blue-700 rounded py-1 px-2">Generate</button>
    </div>
</div>

<div class="flex flex-wrap gap-3 justify-center items-center rounded-lg mt-10">
    {#each ids as id}
        <button
            on:click={() => (selectedId = id)}
            class={`rounded-lg overflow-hidden border-2 ${
                id === selectedId ? "border-blue-600" : "border-transparent"
            }`}
        >
            <img
                src={`http://localhost:8000/image/${id}`}
                alt=""
                width="128"
                height="128"
                class="opacity-40"
            />
        </button>
    {/each}
</div>
