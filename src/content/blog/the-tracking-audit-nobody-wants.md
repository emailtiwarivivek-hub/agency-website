---
title: "The tracking audit nobody wants to pay for"
date: "2026-07-28"
category: "Measurement"
author: "Ananya Deshpande"
readingTime: "7 min"
excerpt: "A third of the accounts we inherit are optimising toward a number that isn't real. Here's the two-week check that finds it."
---

## What actually breaks

Client-side pixels miss between 12% and 40% of conversions depending on browser mix, and the misses are not random. They skew toward the privacy-conscious, higher-income users you most want to model. The platform doesn't tell you this. It reports what it can see and calls it truth.

## The two-week check

Start with a conversion reconciliation: platform-reported conversions against orders in the warehouse, by day, by channel, for ninety days. If the gap moves around by more than a few points week to week, the tracking is unstable and every optimisation decision made on it is noise.

Then check deduplication. Server-side and browser events firing for the same order without a shared event ID will double-count, usually on your best channel, usually in the direction that makes it look better.

## What to do about it

Fix the plumbing before you touch a bid. Server-side events with proper deduplication, a warehouse table that is the single source of conversion truth, and a weekly reconciliation that someone actually reads.

It is unglamorous work and it never appears in a case study. It is also the reason every other number you produce can be defended.
