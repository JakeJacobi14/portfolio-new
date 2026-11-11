---
title: Chess engine
slug: chess-engine
year: "2024"
role: Solo developer
team: Personal project
stack: [C#, Unity]
summary: A chess engine and bot built from scratch in Unity, with search over 450× faster than the first version and an estimated rating of 1400 Elo.
links:
  - { label: demo, url: "https://jakejacobi.itch.io/chess" }
  - { label: github, url: "https://github.com/JakeJacobi14/Chess-Engine-and-Bot" }
cover: ./images/chess-engine-cover.jpg
coverAlt: "The chess engine in an AI-vs-AI game, with the time, evaluation (-4.89) and last move (b4) beside the board."
order: 4
---

## Problem

A friend challenged me to build chess from scratch, so I did. Once it worked, I wanted to know
whether it was actually complete, with every legal move (castling and en passant included)
available in every position. I checked it with perft, which counts every position reachable to a
given depth and compares the totals against known values. Passing that took a full redesign of
the engine, and the redesigned engine already had most of what a chess bot needs. I spent the
rest of the project turning it into a bot that could beat me.

## What I did

![Playing against the engine on a laptop in class, its evaluation and best move on screen.](./images/chess-engine-class.jpg)

<video controls muted playsinline preload="none" width="1920" height="1080" poster="/work/chess-engine-timelapse-poster.jpg" aria-label="Time-lapse of me writing the engine: move generation code in VS Code, alternating with test games on the board in Unity.">
  <source src="/work/chess-engine-timelapse.mp4" type="video/mp4" />
</video>

- Rewrote the board from Unity GameObjects on an 8×8 grid to a flat array of 64 squares, which made move generation much faster.
- Planned the rewrite around special moves. Castling and en passant had been painful to add to the first version, so the new engine supported them, along with sliding pieces, from the start.
- Built six versions of the bot. The first picked random legal moves. Later ones added piece values, minimax with alpha-beta pruning, quiescence search, piece-square tables, an opening book, king-safety checks and deeper search in the endgame.
- Learned mostly from Sebastian Lague's videos and the Chess Programming Wiki and its Discord.

## Result

- Search got over 450× faster between the first engine and the last. In the same amount of time, the bot went from looking about 3 moves ahead to about 5.
- I estimate it at around 1400 Elo, based on games against chess.com players, friends with known ratings, other bots and earlier versions of itself. It's a better player than I am.
- I've shared the [playable demo](https://jakejacobi.itch.io/chess) with friends at home and at Purdue, and with people I met on a trip to Nepal, including a worker at an orphanage we visited who had a lot of fun playing it.
- This project got me into engines and optimization. I've rebuilt it from scratch two or three times since, and some of those versions are faster and stronger than this one.

## What I'd change

I'd plan the architecture before writing any code. The board went from Unity GameObjects to a 2D
array, then to a 1D array, then to an unfinished attempt at bitboards, and each change meant
rewriting most of the engine.
