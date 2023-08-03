import torch
from diffusers import DiffusionPipeline
from uuid import uuid4


def createDiffusionPipeline(model: str):
    pipe = DiffusionPipeline.from_pretrained(
        model,
        torch_dtype=torch.float16,
        use_safetensors=True,
        variant="fp16",
    )

    pipe.enable_model_cpu_offload()

    return pipe


def generateImage(prompt: str, seed: int = None, size: tuple[int, int] = (1024, 1024)) -> str:
    generator = torch.Generator("cuda").manual_seed(seed) if seed else None

    width, height = size
    
    pipe = createDiffusionPipeline("stabilityai/stable-diffusion-xl-base-1.0")
    with torch.inference_mode():
        image = pipe(prompt, output_type="latent", num_inference_steps=30, generator=generator, width=width, height=height).images[0]

    del pipe # Free up memory

    refiner = createDiffusionPipeline("stabilityai/stable-diffusion-xl-refiner-1.0")
    with torch.inference_mode():
        image = refiner(prompt, image=image, num_inference_steps=30, generator=generator, target_size=size).images[0]

    id = str(uuid4())
    image.save(f"images/{id}.jpeg")

    return id


def generateImageFast(prompt: str, seed: int = None) -> str:
    return generateImage(prompt, seed, size=(768, 768))