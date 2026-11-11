---
title: Jarvis voice assistant
slug: jarvis
year: "2025–26"
role: Co-developer
team: Personal project with my friend Frank
stack: [Python, JavaScript, MQTT, FFmpeg]
summary: A voice assistant combining speech recognition, LLM responses and Sonos audio over MQTT, with a web dashboard.
links:
  - { label: github, url: "https://github.com/JakeJacobi14/jarvis" }
cover: ./images/jarvis-cover.jpg
coverAlt: "The Jarvis control panel: an animated face labeled listening, green status pills for each service, a short transcript where Jarvis turns on the lights and gives the weather, and buttons to start, stop, clip 30 seconds or take a photo."
order: 5
---

## Problem

My friend Frank and I wanted an assistant for our room that we could simply talk to, now that
AI models had become fast and cheap enough to make one practical. We worked on it for a few
months, set it aside, and picked it back up the next summer. By the start of the school year it
was running full time on an old computer in our living room.

## What I did

- Split the work with Frank: he handled most of the hardware, including the computer and the infrared transmitters and receivers, and I handled most of the software and API integrations.
- Built Jarvis as separate services for the "Hey Jarvis" wake word, speech-to-text, the language model and text-to-speech, connected through an MQTT broker. This made it much easier to swap parts out and get them working together.
- Compared many speech and language model options on cost, speed and quality. We settled on Groq for the language model and Cartesia for speech, with local fallbacks (Ollama, Whisper and Kokoro), and kept it free to run.
- Streamed the model's reply into speech a sentence at a time, so Jarvis starts talking before the full answer is ready.
- Added commands for the lights, weather, web search, timers, photos and music, plus "clip that", which saves the last 30 seconds of camera video and audio.
- Built a web control panel, usable from a phone, with an animated face inspired by Eddy from *Lab Rats*, a live transcript and the status of each service.

## Result

Jarvis still runs in our living room. We use it for the lights and for questions, much like an
Alexa, and it responds quickly enough to hold a natural conversation on old hardware. It was our
first project built around an LLM and our introduction to MQTT.

## What I'd change

I'd plan and document the architecture before adding features. As features piled up, the
codebase got messy and each new one became harder to add.
