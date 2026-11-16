---
title: "From PowerShell to C#: My First Real CLI Tool"
tags: [csharp, dotnet, learning]
---

I've written PowerShell for years. This week I built my first C# console app — a tiny host health check — and it taught me more about types than any tutorial.

<!--more-->

## Setup

```bash
dotnet new console -n SysInfo
cd SysInfo
dotnet run
```

## The code

With .NET's top-level statements, `Program.cs` can be refreshingly short:

```csharp
using System;
using System.IO;
using System.Linq;

var uptime = TimeSpan.FromMilliseconds(Environment.TickCount64);
Console.WriteLine($"Host:    {Environment.MachineName}");
Console.WriteLine($"OS:      {Environment.OSVersion}");
Console.WriteLine($"Uptime:  {uptime.Days}d {uptime.Hours}h {uptime.Minutes}m");
Console.WriteLine();

foreach (var d in DriveInfo.GetDrives().Where(d => d.IsReady && d.DriveType == DriveType.Fixed))
{
    double totalGb = d.TotalSize / 1e9;
    double freeGb  = d.AvailableFreeSpace / 1e9;
    double pctFree = freeGb / totalGb * 100;
    string flag    = pctFree < 15 ? "  <-- LOW" : "";
    Console.WriteLine($"{d.Name,-10} {freeGb,8:F1} GB free of {totalGb,8:F1} GB ({pctFree:F0}%){flag}");
}
```

## What clicked for me

| PowerShell habit | C# equivalent |
|---|---|
| `Get-PSDrive` | `DriveInfo.GetDrives()` |
| `Where-Object { ... }` | LINQ `.Where(d => ...)` |
| `"$var"` interpolation | `$"{var}"` interpolation |
| Objects are loose | Types are strict — and the compiler catches mistakes early |

The big mindset shift: in PowerShell I discover what an object has at runtime. In C#, IntelliSense and the compiler tell me *before* I run it. Slower to start, much faster to debug.

Next up: add command-line arguments and output JSON so other tools can consume it.
