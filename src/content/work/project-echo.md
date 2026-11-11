---
title: Project ECHO
slug: project-echo
year: "2026"
role: Co-founder & Software Lead
team: Three-person agricultural UAV research team, Purdue University
stack: [Python, OpenCV]
summary: Agricultural drone research I co-founded, with a Python and OpenCV prototype that estimates plant stand coverage.
links: []
model:
  src: /models/project-echo.glb
  alt: "A 3D model of the Project ECHO survey drone: a quadcopter on a cross-shaped frame, with four motors and propellers and a GPS mast and two boxes mounted on top."
  credit: { name: Campbell Downs, url: "https://campbelldowns.com/work/project-echo.html" }
order: 2
---

## Problem

Project ECHO is a student research drone that photographs farm fields and analyzes the images
for crop health. I co-founded it with an aerospace engineering student and an electrical
engineering student because we wanted a project that combined hardware and software. Purdue's
agriculture department began supporting it in fall 2026.

## What I did

- Lead the software, while my teammates lead the drone's hardware.
- Secured $5,000 in research funding with our faculty advisors.
- Built a Python and OpenCV prototype that estimates plant stand coverage from pixel color, and tested it on thousands of crop images from private and public datasets.
- Designed the software pipeline: GPS mapping of the field, an automated flight path that captures images at set intervals, crop-health analysis, and a 3D reconstruction of the field from the overlapping photos.
- Chose a standard RGB camera over a multispectral one. It costs far less and still gives accurate results, and multispectral is an option for a later version.

## Result

The project is ongoing. The main challenge is integration: the flight controller, mapping
software and analysis tools come from different sources, some of them dated, and they all have
to work together within a tight budget and weight limit without losing data accuracy.
