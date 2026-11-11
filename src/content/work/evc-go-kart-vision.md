---
title: EVC go-kart vision
slug: evc-go-kart-vision
year: "2025–26"
role: Computer Vision Team
team: Electric Vehicle Club (EVC), Purdue University
stack: [Python, OpenCV]
summary: Python and OpenCV perception for an autonomous go-kart. Our team placed 1st of 9 international teams at the 2026 AKS US National Grand Prix.
links: []
cover: ./images/evc-go-kart-vision-cover.jpg
coverAlt: "Teammates crowded around the go-kart in the shop, wiring exposed, one testing the electronics with bench equipment set on the frame."
order: 1
---

## Problem

Purdue's Electric Vehicle Club builds an autonomous electric go-kart to race in the Autonomous
Karting Series. I was on the three-person computer vision team, which turned the kart's camera
feed into track data for the team that planned the racing line.

## What I did

- Wrote a Python and OpenCV pipeline that finds the edges of the track in each frame, using color filtering, edge detection and a top-down warp of the image, then fitting lines to trace the curves.
- Estimated the hidden edge on sharp turns, when only one side of the track is in view, from the visible edge and the track's known width.
- Output the angle to each side of the track, which the racing team used to choose the line.
- Optimized it to run in real time on the kart's onboard Jetson.
- Worked in a codebase shared across the club's teams, using Git and Docker.

## Result

- The team placed 1st of 9 teams from the US and Canada at the 2026 Autonomous Karting Series US National Grand Prix.
- The kart was also 1st in qualifying, with the fastest lap (1:03).

## What I'd change

I'd get more involved with the other teams. The better I understood the rest of the kart, the
better I could have tuned the vision system for it.
