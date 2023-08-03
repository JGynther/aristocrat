type generationArgs<Output> = (
    prompt: string,
    options?: { seed?: number; fast?: boolean }
) => Output;

const constructGenerationURL: generationArgs<string> = (prompt, options) => {
    const base = "http://localhost:8000/generate";
    const fast = options?.fast ? "/fast" : "";
    const seed = options?.seed ? "&seed=" + options.seed : "";
    return base + fast + "?prompt=" + prompt + seed;
};

const generateImage: generationArgs<Promise<string[]>> = async (prompt, options) => {
    if (!prompt) return;

    const URL = constructGenerationURL(prompt, options);
    const response = await fetch(URL);
    const json = await response.json();

    return json;
};

export { generateImage };
