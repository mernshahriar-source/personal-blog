---
title: 'Part 4: First Project'
date: '2026-01-11'
excerpt: 'Part 4: First Project'
categories:
  - Learn C# from Beginner to Advanced
tags: []
draft: true
---
# Part 4: First Project

Environment setup হয়ে গেছে। এবার প্রথম C# project তৈরি করবো, code লিখবো, এবং run করবো।

---

## Project তৈরি করা

দুইটা উপায়ে project তৈরি করা যায়:
1. Visual Studio দিয়ে (GUI)
2. Command Line দিয়ে (Terminal)

### Way 1: Visual Studio দিয়ে

**Step 1:** Visual Studio খোলো

**Step 2:** "Create a new project" click করো

```
[IMAGE: VS Start Window]

Style: Screenshot of Visual Studio start window

Showing:
- Recent projects (empty or with items)
- "Create a new project" button - highlighted with arrow
- "Open a project or solution"
- "Clone a repository"
```

**Step 3:** Search box এ "Console" লেখো

**Step 4:** "Console App" select করো

⚠️ **Important:** দুইটা "Console App" দেখবে। সঠিকটা select করো:
- ✅ **Console App** - এটা নাও (C# icon, no ".NET Framework" written)
- ❌ Console App (.NET Framework) - এটা না

```
[IMAGE: Select Console App]

Style: Screenshot of "Create a new project" dialog

Search: "Console"
Results:
- "Console App" with C# icon - highlighted "এটা নাও"
- "Console App (.NET Framework)" - crossed out "এটা না"

Caption: ".NET Framework version টা পুরাতন, এটা নিও না"
```

**Step 5:** "Next" click করো

**Step 6:** Project configure করো
- **Project name:** HelloCSharp (বা যা খুশি)
- **Location:** যেখানে save করতে চাও
- **Solution name:** Same as project name (default রাখো)

```
[IMAGE: Configure Project]

Style: Screenshot of project configuration

Fields:
- Project name: "HelloCSharp"
- Location: "C:\Users\YourName\source\repos"
- Solution name: "HelloCSharp"

"Next" button highlighted
```

**Step 7:** Framework select করো
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
├── HelloCSharp.csproj    # Project configuration file
├── Program.cs            # তোমার main code file
├── obj/                  # Build এর temporary files (ignore করো)
└── bin/                  # Compiled output (run করলে তৈরি হবে)
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

এটা project configuration file। XML format এ লেখা।

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

**Way 1: Run Button**

Top toolbar এ green "Play" button (▶️) click করো।

অথবা keyboard shortcut: `F5`

```
[IMAGE: VS Run Button]

Style: Screenshot of VS toolbar

Highlighted:
- Green play button with "HelloCSharp" dropdown
- Caption: "এখানে click করো বা F5 চাপো"
```

**Way 2: Without Debugging**

`Ctrl + F5` চাপো। এটা faster, debugging ছাড়া run করে।

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
        ├── HelloCSharp.dll      # তোমার compiled code
        ├── HelloCSharp.exe      # Executable (Windows)
        ├── HelloCSharp.pdb      # Debug information
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
| Debug | Development, testing |
| Release | Production, distribution |

---

## Useful Commands

এই commands মনে রাখো:

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

এটা খুব useful। Code save করলে automatically আবার run হয়।

```bash
dotnet watch run
```

```
[IMAGE: dotnet watch demo]

Style: Terminal screenshot showing:

$ dotnet watch run
Hello, World!

watch: File changed: Program.cs
watch: Restarting...
Hello, CPS Academy!

Caption: "Code change করে save করলে auto restart হয়"
```

---

## Summary

| Task | Command/Action |
|------|----------------|
| Project তৈরি | `dotnet new console -n Name` বা VS এ Create New Project |
| Code লেখা | `Program.cs` file edit করো |
| Run করা | `dotnet run` বা VS এ F5 |
| Build করা | `dotnet build` |
| Auto-reload | `dotnet watch run` |

**তুমি এখন পর্যন্ত শিখেছো:**
- ✅ Project তৈরি করা
- ✅ Project structure বোঝা
- ✅ Code run করা
- ✅ Build process

**Next Part এ:** Console Input/Output শিখবো - কীভাবে screen এ লেখা দেখাবে এবং user থেকে input নেবে।

---

*CPS Academy - Learn. Code. Grow.*
