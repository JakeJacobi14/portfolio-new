---
title: Jarvis voice assistant
slug: jarvis
year: "2025–26"
role: Co-developer
team: Personal project with a friend
stack: [Python, JavaScript, MQTT, FFmpeg]
summary: A voice assistant combining speech recognition, LLM responses and Sonos audio over MQTT, with a web dashboard.
links:
  - { label: github, url: "https://github.com/JakeJacobi14/jarvis" }
order: 5
---

## Problem

A friend and I wanted an assistant for our room that we could simply talk to, now that AI models
had become capable enough to run on our own hardware. We worked on it for a few months, set it
aside, and picked it back up the next summer. By the start of the school year it was running
full time on an old computer in our living room.

## What I did

- Split the work with my friend: he handled most of the hardware, including the computer and the infrared transmitters and receivers, and I handled most of the software and API integrations.
- Built Jarvis as separate services for wake word, speech-to-text, the language model, text-to-speech and voice, connected through an MQTT broker. This made it much easier to swap parts out and get them working together.
- Compared many speech-to-text, text-to-speech and language model options on cost, speed and quality, and settled on a setup that costs nothing to run.
- Connected it to the room, so it can switch the overhead lights, AC and LED strips and start movies or music with a single command.
- Built a web dashboard, usable from a phone, that shows the status of each service and handles remote commands, photos and video clips from its camera.
- Gave Jarvis an animated face on the TV, inspired by Eddy from *Lab Rats*, and showed its replies as text alongside speech.

## Result

Jarvis still runs in our living room. We use it for the lights and AC and for questions, much
like an Alexa, and it responds quickly enough to hold a natural conversation on old hardware. It
was our first project built around an LLM and our introduction to MQTT.

## What I'd change

I'd plan and document the architecture before adding features. As features piled up, the
codebase got messy and each new one became harder to add.
