---
title: "Reading the Sky Like a Monitoring Dashboard"
tags: [weather, outdoors, systems-thinking]
---

A good monitoring dashboard tells you what's happening, what's trending, and what's about to page you. Turns out the sky does the same thing — if you know which metrics to watch.

<!--more-->

## The metrics

- **Barometric pressure = your load average.** A steady fall (more than ~3 hPa in 3 hours) is an early warning that a system is moving in.
- **Cloud progression = log levels.** High wispy cirrus (INFO) → thickening altostratus (WARN) → low nimbostratus (ERROR: it's raining).
- **Wind shift = config change.** When the wind backs or veers sharply, something upstream changed. Usually a front.
- **Dew point = memory pressure.** The closer air temp gets to the dew point, the closer you are to fog, clouds, and a bad time.

## Alerting thresholds I actually use on the trail

| Signal | Threshold | Action |
|---|---|---|
| Towering cumulus by late morning | Building vertically fast | Be off exposed ridges by early afternoon |
| Pressure drop | > 3 hPa / 3 hr | Expect weather within 12–24 hr |
| Thunder | Any | 30-30 rule: shelter, wait 30 min after last thunder |

Same skill set, different datacenter. Watch the trends, not just the current value.
