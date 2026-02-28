---
title: "Lesson 1.2: .NET Ecosystem বোঝা"
date: "2026-03-02"
excerpt: ".NET কী, .NET Framework vs .NET Core vs .NET 5+, CLR কীভাবে কাজ করে, IL Code ও JIT, SDK আর Runtime এর পার্থক্য"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - introduction
  - basics
  - getting-started
draft: false
---


> **এই Lesson এ শিখবে:** .NET কী, .NET Framework vs .NET Core vs .NET 5+, CLR কীভাবে কাজ করে, IL Code ও JIT, SDK আর Runtime এর পার্থক্য।

---

## .NET কী?

সহজ ভাষায়, .NET হলো একটা platform যেটার উপর C# code run হয়। তুমি C# এ code লেখো, .NET সেটাকে computer এ run করায়।

```
তোমার C# Code
      ↓
    .NET
      ↓
Computer এ Run
```

.NET এর মধ্যে কী কী আছে?

- **Runtime:** Code execute করে
- **Libraries:** Ready-made functions (file read, HTTP request, date/time, etc.)
- **Tools:** Compiler, debugger, CLI

---

## .NET এর History — Framework, Core, আর 5+

এইখানে অনেকে confuse হয়। চলো clear করি।

### .NET Framework (2002-2019)

Microsoft প্রথম .NET বানায় 2002 সালে। নাম ছিল .NET Framework।

সমস্যা কী ছিল?
- শুধু Windows এ চলতো
- Closed source ছিল
- Heavy এবং slow ছিল

এখনো অনেক পুরাতন project এ .NET Framework দেখবে। কিন্তু নতুন project এ এটা ব্যবহার করবে না।

### .NET Core (2016-2020)

Microsoft বুঝলো শুধু Windows এ আটকে থাকলে চলবে না। তাই নতুন করে বানালো .NET Core।

কী ভালো হলো?
- Cross-platform (Windows, Linux, Mac)
- Open source
- Lightweight এবং fast
- Modern architecture

### .NET 5+ (2020-Present)

2020 সালে Microsoft বললো — "এত নাম মনে রাখার দরকার নেই।"

Framework আর Core merge করে নতুন নাম দিলো শুধু ".NET"।

| Version | Year | Status |
|---------|------|--------|
| .NET 5 | 2020 | ❌ End of support |
| .NET 6 | 2021 | ✅ LTS |
| .NET 7 | 2022 | ❌ End of support |
| .NET 8 | 2024 | ✅ LTS (এটা শিখো!) |
| .NET 9 | 2024 | Latest |

**LTS কী?** Long Term Support। Microsoft ৩ বছর support দেবে। Production project এ সবসময় LTS version ব্যবহার করো।

### Quick Summary

| Feature | .NET Framework | .NET Core | .NET 5+ |
|---------|---------------|-----------|---------|
| Platform | Windows only | Cross-platform | Cross-platform |
| Open Source | ❌ | ✅ | ✅ |
| Performance | Slow | Fast | Faster |
| Status | Legacy | Merged | Active ✅ |

**তোমাকে কী করতে হবে?** .NET 8 SDK download এবং install করো। ব্যস!

---

## CLR (Common Language Runtime)

Runtime হলো সেই জিনিস যেটা তোমার code আসলে execute করে। তুমি যখন লেখো:

```csharp
Console.WriteLine("Hello");
```

Computer সরাসরি এই code বোঝে না। Runtime এটাকে machine language এ convert করে run করায়।

.NET এর runtime এর নাম CLR। এটা কয়েকটা গুরুত্বপূর্ণ কাজ করে:

### ১. Code Execution

তোমার C# code কে machine code এ convert করে run করায়।

### ২. Memory Management (Garbage Collection)

C++ এ তোমাকে নিজে memory free করতে হয়:

```cpp
// C++ - নিজে memory manage করতে হয়
int* arr = new int[100];
// ... use it
delete[] arr;  // ভুলে গেলে memory leak!
```

C# তে CLR এর Garbage Collector (GC) automatically করে:

```csharp
// C# - চিন্তা নেই
var list = new List<int>();
// ... use it
// GC automatically clean করবে যখন দরকার নেই
```

### ৩. Type Safety

Wrong type ঢুকানোর চেষ্টা করলে error দেয়:

```csharp
int number = 10;
number = "hello";  // ❌ Compile error! CLR allow করবে না
```

### ৪. Exception Handling

Error হলে program crash না করে সুন্দরভাবে handle করতে দেয়।

---

## Code কীভাবে Execute হয়?

```
C# Source Code (.cs)
        ↓
   C# Compiler (Roslyn)
        ↓
IL Code (Intermediate Language)
        ↓
      CLR
        ↓
  JIT Compiler
        ↓
   Machine Code
        ↓
     CPU তে Run
```

**IL Code কী?**

C# compile হলে সরাসরি machine code হয় না। প্রথমে IL (Intermediate Language) এ convert হয়। এটা একটা middle-ground language যেটা platform independent।

**JIT কী?**

Just-In-Time compiler। যখন program run হয়, তখন IL code কে machine code এ convert করে।

**এত step কেন?**

এই কারণে same C# code Windows, Linux, Mac সবখানে চলে। প্রতিটা platform এর CLR নিজের মতো করে machine code বানায়।

```
Same IL Code
    │
    ├── Windows CLR → Windows Machine Code
    ├── Linux CLR   → Linux Machine Code
    └── Mac CLR     → Mac Machine Code
```

এত detail মনে না রাখলেও চলবে। শুধু জানো যে C# code সরাসরি run হয় না, .NET এর মাধ্যমে run হয়।

---

## SDK vs Runtime

এই দুইটার difference বোঝা important। Interview তেও জিজ্ঞেস করে।

### একটা Example দিয়ে বুঝি

ধরো তুমি একটা video বানাতে চাও।

**Video বানাতে (Create করতে) লাগে:**
- Camera
- Editing software (Premiere Pro, DaVinci)
- Microphone, Lights

**Video দেখতে (Run করতে) লাগে:**
- শুধু একটা media player (VLC)

.NET এও same concept:

### SDK (Software Development Kit)

SDK হলো video বানানোর tools এর মতো। Code লিখতে, compile করতে, debug করতে — সব কিছুর জন্য SDK লাগে।

SDK এর মধ্যে কী কী আছে?
- C# Compiler — তোমার code কে IL এ convert করে
- dotnet CLI — terminal এ commands চালানোর জন্য
- Project templates — নতুন project শুরু করতে
- NuGet — packages install করতে
- Runtime — হ্যাঁ, এটাও included!

### Runtime

Runtime হলো media player এর মতো। শুধু ready app চালানোর জন্য।

তোমার বানানো app অন্য কেউ চালাতে চাইলে তার PC তে শুধু Runtime থাকলেই হবে।

```
┌─────────────────────────────────────┐
│              SDK                     │
├─────────────────────────────────────┤
│  • C# Compiler (code → IL)          │
│  • dotnet CLI (commands)            │
│  • Project templates                │
│  • NuGet (package manager)          │
│                                     │
│  ┌─────────────────────────────┐    │
│  │        Runtime              │    │
│  │  • CLR                      │    │
│  │  • Base libraries           │    │
│  │  • Garbage Collector        │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘

SDK install করলে Runtime ও automatically পাবে।
```

### কোনটা Install করবে?

| তুমি যদি... | Install করো |
|------------|-------------|
| Code লিখতে চাও (Developer) | SDK |
| শুধু app run করতে চাও (User) | Runtime |
| Server এ deploy করবে | ASP.NET Core Runtime |

**তোমার জন্য:** তুমি developer, তাই SDK install করো। Runtime এর মধ্যেই আছে।

### Real Life Example

তুমি একটা Calculator app বানালে C# দিয়ে।

| PC | কী install থাকতে হবে | কেন |
|----|---------------------|-----|
| তোমার PC | SDK | তুমি code লিখছো |
| বন্ধুর PC | Runtime | সে শুধু app use করবে |

### Version Check Commands

```bash
# SDK version দেখো
dotnet --version

# সব installed SDKs দেখো
dotnet --list-sdks

# সব installed Runtimes দেখো
dotnet --list-runtimes
```

---

## Summary

| Topic | Key Point |
|-------|-----------|
| .NET | C# run করার platform |
| .NET Framework | পুরাতন, Windows only, নতুন project এ use করো না |
| .NET Core | Cross-platform এর শুরু, এখন .NET 5+ এ merge হয়ে গেছে |
| .NET 5+ | Current version, এটাই use করবে |
| CLR | Code execute করে, memory manage করে |
| IL Code | Intermediate Language, platform independent |
| JIT | Runtime এ IL কে machine code বানায় |
| SDK | Developer দের জন্য (compiler + tools + runtime) |
| Runtime | User দের জন্য, শুধু app run করতে |

**তোমার Next Step:** .NET 8 SDK install করো (পরের Lesson এ details আছে)

---

**পরের Lesson:** Environment Setup — .NET SDK install, IDE setup, troubleshooting

---

*CPS Academy - Learn. Code. Grow.*
