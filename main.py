from fastapi import FastAPI
from fastapi.responses import FileResponse
from generate import generateImage

app = FastAPI()


@app.get("/generate")
def generate(prompt: str, seed: int = None, batch: int = 1):
    ids = []

    for _ in range(batch):
        id = generateImage(prompt, seed)
        ids.append(id)

        if seed:
            seed += 1

    return ids


@app.get("/images/{id}")
def get_image(id):
    return FileResponse(f"images/{id}.jpeg")
