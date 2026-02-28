---
title: "Lesson 1.4: প্রথম C# Project তৈরি ও Run"
date: "2026-03-04"
excerpt: "Project তৈরি করা (GUI ও CLI), project structure বোঝা, code run করা, build process, useful commands"
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


> **এই Lesson এ শিখবে:** Project তৈরি করা (GUI ও CLI), project structure বোঝা, code run করা, build process, useful commands।

---

## Project তৈরি করা

Environment setup হয়ে গেছে। এবার প্রথম C# project তৈরি করবো, code লিখবো, এবং run করবো।

দুইটা উপায়ে project তৈরি করা যায়:

### Way 1: Visual Studio দিয়ে

**Step 1:** Visual Studio খোলো

**Step 2:** "Create a new project" click করো

**Step 3:** Search box এ "Console" লেখো

**Step 4:** "Console App" select করো

⚠️ **Important:** দুইটা "Console App" দেখবে। সঠিকটা select করো:
- ✅ **Console App** — এটা নাও (C# icon, কোথাও ".NET Framework" লেখা নেই)
- ❌ Console App (.NET Framework) — এটা না! এটা পুরাতন version

**Step 5:** "Next" click করো

**Step 6:** Project configure করো:
- **Project name:** `HelloCSharp` (বা যা খুশি)
- **Location:** যেখানে save করতে চাও
- **Solution name:** Same as project name (default রাখো)

**Step 7:** Framework select করো:
- **.NET 8.0 (Long Term Support)** select করো
- "Do not use top-level statements" unchecked রাখো

**Step 8:** "Create" click করো

🎉 Project তৈরি হয়ে গেছে!

### Way 2: Command Line দিয়ে

Terminal / Command Prompt খোলো এবং এই commands লেখো:

```bash
# যেখানে project রাখতে চাও সেখানে যাও
cd C:\Users\YourName\Projects

# নতুন console app তৈরি করো
dotnet new console -n HelloCSharp

# Project folder এ যাও
cd HelloCSharp
```

ব্যস, project তৈরি!

VS Code তে open করতে:
```bash
code .
```

---

## Project Structure বোঝা

Project তৈরি হলে কিছু files এবং folders দেখবে:

```
HelloCSharp/
├── HelloCSharp.csproj    ← Project configuration file
├── Program.cs            ← তোমার main code file
├── obj/                  ← Build এর temporary files (ignore করো)
└── bin/                  ← Compiled output (run করলে তৈরি হবে)
```

### Program.cs

এটা তোমার main code file। খুললে দেখবে:

```csharp
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
```

হ্যাঁ, এইটুকুই! .NET 6 থেকে boilerplate code লাগে না।

**পুরাতন style (reference এর জন্য):**

আগে এভাবে লিখতে হতো:

```csharp
using System;

namespace HelloCSharp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
```

নতুন style এ এত কিছু লাগে না। তবে পুরাতন code দেখলে চিনতে পারবে।

### HelloCSharp.csproj

এটা project configuration file। XML format এ লেখা:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
```

| Property | মানে কী |
|----------|--------|
| OutputType | `Exe` = Executable program, `Library` = DLL |
| TargetFramework | কোন .NET version (net8.0 = .NET 8) |
| ImplicitUsings | Common namespaces auto import হবে |
| Nullable | Null safety feature on |

এখন এই file নিয়ে বেশি চিন্তা করতে হবে না। পরে কাজে লাগবে।

---

## Code Run করা

### Visual Studio তে

**Way 1: Run Button** — Top toolbar এ green "Play" button (▶️) click করো।

**Way 2: Keyboard Shortcut** — `F5` চাপো (with debugging)

**Way 3: Without Debugging** — `Ctrl + F5` চাপো। এটা faster, debugging ছাড়া run করে।

### Command Line এ

```bash
# Project folder এ থেকে
dotnet run
```

### Output

Run করলে console window আসবে:

```
Hello, World!
```

🎉 তোমার প্রথম C# program successfully run হয়েছে!

### এবার নিজে কিছু লেখো!

`Program.cs` file খুলে code change করো:

```csharp
Console.WriteLine("Hello, World!");
```

এটাকে পরিবর্তন করে লেখো:

```csharp
Console.WriteLine("Assalamu Alaikum! Ami CPS Academy theke C# shikhchi!");
Console.WriteLine("Ei holo amar prothom program!");
```

আবার run করো (`dotnet run` বা F5)। দেখবে:

```
Assalamu Alaikum! Ami CPS Academy theke C# shikhchi!
Ei holo amar prothom program!
```

মজা না? তুমি এইমাত্র নিজের প্রথম code লিখে run করলে! 🎉

---

## Build কী এবং কেন?

এতক্ষণ আমরা `dotnet run` দিয়ে code চালাচ্ছিলাম। কিন্তু পেছনে কী হচ্ছে?

### Run করলে কী হয়?

```
dotnet run
    │
    ├── 1. Build (compile)
    │       তোমার .cs files → .dll file এ convert
    │
    └── 2. Execute
            .dll file run করে
```

মানে `dotnet run` = `dotnet build` + execute। দুইটা কাজ একসাথে করে।

### শুধু Build করা

```bash
dotnet build
```

এটা শুধু compile করে, run করে না। Output যায় `bin/Debug/net8.0/` folder এ।

### Build Output দেখা

```
bin/
└── Debug/
    └── net8.0/
        ├── HelloCSharp.dll      ← তোমার compiled code
        ├── HelloCSharp.exe      ← Executable (Windows)
        ├── HelloCSharp.pdb      ← Debug information
        └── HelloCSharp.deps.json
```

### Debug vs Release

```bash
# Debug build (default) - development এর জন্য
dotnet build

# Release build - production এর জন্য, optimized
dotnet build -c Release
```

| Mode | কখন ব্যবহার করবে |
|------|-----------------|
| Debug | Development, testing — extra information থাকে, debugging সহজ হয় |
| Release | Production, distribution — optimized, faster, ছোট size |

---

## Useful Commands

এই commands মনে রাখো, বারবার লাগবে:

```bash
# নতুন project তৈরি
dotnet new console -n ProjectName

# Build করো
dotnet build

# Run করো
dotnet run

# Clean করো (build files delete)
dotnet clean

# Auto-reload সহ run (code change করলে auto restart)
dotnet watch run
```

### dotnet watch run

এটা খুব useful। Code save করলে automatically আবার run হয়:

```bash
dotnet watch run
```

```
$ dotnet watch run
Hello, World!

watch: File changed: Program.cs
watch: Restarting...
Hello, CPS Academy!
```

Code change করে save করলে auto restart! Development এ অনেক time save করে কারণ বারবার manually `dotnet run` করতে হয় না।

### dotnet clean

Build files গোলমাল করলে clean করে আবার build করো:

```bash
dotnet clean
dotnet build
```

এটা `bin/` আর `obj/` folder এর files মুছে দেয়।

---

## Summary

| Task | Command/Action |
|------|----------------|
| Project তৈরি | `dotnet new console -n Name` বা VS এ Create New Project |
| Code লেখা | `Program.cs` file edit করো |
| Run করা | `dotnet run` বা VS এ F5 |
| Build করা | `dotnet build` |
| Clean করা | `dotnet clean` |
| Auto-reload | `dotnet watch run` |

**তুমি এখন পর্যন্ত শিখেছো:**
- ✅ Project তৈরি করা (GUI ও CLI দুইভাবেই)
- ✅ Project structure বোঝা (Program.cs, .csproj)
- ✅ Code run করা
- ✅ Build process বোঝা (Debug vs Release)
- ✅ Useful CLI commands

---

**পরের Lesson:** Console Input/Output — কীভাবে screen এ লেখা দেখাবে এবং user থেকে input নেবে

---

*CPS Academy - Learn. Code. Grow.*
