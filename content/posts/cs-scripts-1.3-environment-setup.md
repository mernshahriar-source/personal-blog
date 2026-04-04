---
title: "Lesson 1.3: Environment Setup"
date: "2026-04-07"
excerpt: ".NET SDK install করা, Visual Studio / VS Code / Rider setup, IDE comparison, troubleshooting"
categories:
  - C# Course Scripts
tags:
  - csharp
  - dotnet
  - setup
  - visual-studio
  - vscode
draft: false
---

# Lesson 1.3: Environment Setup

> **এই Lesson এ শিখবে:** .NET SDK install করা, Visual Studio / VS Code / Rider setup, IDE comparison, troubleshooting।

---

## কী কী লাগবে?

C# এ code লিখতে দুইটা জিনিস লাগে:
1. **.NET SDK** — Code compile এবং run করার জন্য
2. **IDE** — Code লেখার জন্য

Setup করার দুইটা উপায় আছে। তোমার situation অনুযায়ী একটা follow করো।

---

## Way 1: Visual Studio দিয়ে (Easiest — Beginners এর জন্য)

এটা সবচেয়ে সহজ উপায়। Visual Studio install করলে .NET SDK automatic ভাবে install হয়ে যায়। আলাদা করে কিছু করতে হয় না।

**Requirements:**
- Windows 10/11
- 8 GB RAM (16 GB recommended)
- 20-50 GB free disk space

### Step 1: Download

1. Browser এ যাও: https://visualstudio.microsoft.com/
2. **"Visual Studio Community"** button এ click করো (Free version)
3. `VisualStudioSetup.exe` file download হবে

তিনটা version দেখবে:
- **Community (Free)** ← এটা download করো
- Professional (Paid)
- Enterprise (Paid)

### Step 2: Run Installer

Download হওয়া `VisualStudioSetup.exe` file এ double click করো। Installer কিছু files download করবে। ১-২ মিনিট অপেক্ষা করো।

### Step 3: Select Workloads

এই step টা important। Workloads মানে তুমি কী ধরনের development করবে।

তোমাকে যা select করতে হবে:

✅ **.NET desktop development** — Desktop apps এর জন্য (Console apps ও এখানে)

✅ **ASP.NET and web development** — Web apps এর জন্য (optional, পরেও নিতে পারো)

Right side এ Installation details দেখবে — সেখানে .NET 8 SDK included দেখাবে। মানে SDK আলাদা করে install করতে হবে না!

### Step 4: Install

1. Workloads select করার পর "Install" button click করো
2. Download এবং install হবে — 20-45 minutes লাগতে পারে (internet speed এর উপর নির্ভর করে)
3. Installation শেষ হলে "Launch" button আসবে

### Step 5: First Launch

1. "Launch" button click করো
2. Microsoft account sign in করতে বলবে (optional, skip করতে পারো)
3. Color theme select করো (Dark recommended — চোখের জন্য ভালো)
4. "Start Visual Studio" click করো

### Step 6: Verify Installation

Visual Studio ঠিকমতো install হয়েছে কিনা check করো:

**Check 1: Visual Studio তে**
1. Visual Studio খোলো
2. "Create a new project" click করো
3. Search box এ "Console" লেখো
4. "Console App" দেখতে পাচ্ছো? ✅ সব ঠিক আছে!

**Check 2: Command Line এ**

Command Prompt বা PowerShell খোলো, লেখো:

```bash
dotnet --version
```

Output এরকম আসলে সব ঠিক আছে:
```
8.0.100
```

🎉 **Congratulations!** তোমার setup complete।

---

## Way 2: VS Code / Rider দিয়ে (Alternative)

Visual Studio ছাড়া অন্য IDE ব্যবহার করতে চাইলে এই way follow করো। এই ক্ষেত্রে দুইটা জিনিস আলাদা আলাদা install করতে হবে — প্রথমে .NET SDK, তারপর IDE।

### Step 1: .NET SDK Install

#### Windows

1. যাও: https://dotnet.microsoft.com/download
2. ".NET 8.0 (LTS)" section এ "Download .NET SDK x64" click করো
3. Downloaded `.exe` file run করো
4. Install এ click করো

⚠️ **সাবধান:** "SDK" নাও, "Runtime" না!

#### macOS

**Option 1: Installer**
1. https://dotnet.microsoft.com/download যাও
2. macOS tab select করো
3. `.pkg` file download করে install করো

**Option 2: Homebrew**
```bash
brew install --cask dotnet-sdk
```

#### Linux (Ubuntu/Debian)

```bash
# Microsoft repository add
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Install
sudo apt-get update
sudo apt-get install -y dotnet-sdk-8.0
```

#### Verify SDK Installation

Terminal / Command Prompt এ:

```bash
dotnet --version
```

Output:
```
8.0.100
```

এটা দেখলে SDK install হয়ে গেছে। এবার IDE install করো।

### Step 2A: VS Code Install (Lightweight Option)

**কাদের জন্য:**
- Mac / Linux users
- Lightweight editor চায় যারা
- PC তে কম RAM আছে

**Install Steps:**

1. যাও: https://code.visualstudio.com/
2. Download button click করো
3. Install করো
4. VS Code খোলো
5. Extensions এ যাও (Ctrl+Shift+X বা Mac এ Cmd+Shift+X)
6. Search এবং install করো:
   - **C# Dev Kit** (by Microsoft)
   - **C#** (by Microsoft)

এই দুইটা extension install করলেই VS Code তে C# development করা যাবে।

**Verify:**

1. Terminal খোলো (Ctrl + `)
2. লেখো:
```bash
dotnet --version
```
3. Version দেখাচ্ছে? ✅ Ready!

### Step 2B: JetBrains Rider Install (Professional Option)

**কাদের জন্য:**
- Professional developers
- Large projects
- Students (free license পাওয়া যায়)

**Install Steps:**

1. যাও: https://www.jetbrains.com/rider/
2. Download করো
3. Install করো
4. License activate করো:
   - Student? Free license নাও: https://www.jetbrains.com/community/education/
   - ৩০ দিন free trial আছে

---

## IDE Comparison: কোনটা নেবে?

### Quick Comparison

| Feature | Visual Studio | VS Code | Rider |
|---------|---------------|---------|-------|
| Price | Free | Free | Paid* |
| .NET SDK সাথে আসে | ✅ হ্যাঁ | ❌ না | ❌ না |
| Platform | Windows, Mac | All | All |
| Size | 20-50 GB | ~500 MB | ~2 GB |
| RAM Usage | High | Low | Medium |
| Setup Difficulty | Easy | Medium | Easy |
| Best For | Beginners | Lightweight | Professional |

*Rider students দের জন্য free

### Decision Flowchart

```
তুমি কি Windows এ আছো?
│
├── হ্যাঁ
│   └── Beginner?
│       ├── হ্যাঁ → Visual Studio Community ✅
│       └── না → Visual Studio বা Rider
│
└── না (Mac/Linux)
    └── Budget আছে?
        ├── হ্যাঁ → Rider
        └── না → VS Code + C# Dev Kit ✅
```

### আমার Recommendation

| তুমি যদি... | নাও |
|-------------|-----|
| Windows এ আছো, beginner | **Visual Studio Community** |
| Mac / Linux এ আছো | **VS Code** |
| PC slow, RAM কম | **VS Code** |
| Student, best tool চাও free তে | **Rider** (student license) |
| Professional developer | **Rider** |

---

## Troubleshooting

### Problem: `dotnet` command not found

**Solution:**
1. Terminal/Command Prompt restart করো
2. কাজ না হলে PC restart করো
3. তবুও কাজ না হলে SDK আবার install করো

**কেন হয়:** SDK install হওয়ার পর PATH environment variable update হয়। নতুন terminal session এ এটা reflect হয়। তাই restart করলে ঠিক হয়ে যায়।

### Problem: Visual Studio তে "Console App" দেখাচ্ছে না

**Solution:**
1. Visual Studio Installer খোলো (Start menu তে search করো)
2. "Modify" click করো
3. ".NET desktop development" workload check করো
4. "Modify" click করে install করো

### Problem: VS Code এ IntelliSense কাজ করছে না

**Solution:**
1. C# Dev Kit extension installed আছে কিনা check করো
2. VS Code restart করো
3. `Ctrl+Shift+P` → "Restart OmniSharp" লিখে select করো

### Problem: macOS এ "dotnet is not recognized"

**Solution:**
```bash
# .zshrc বা .bash_profile এ add করো
export PATH="$PATH:/usr/local/share/dotnet"
```

Terminal restart করো।

---

## Summary Checklist

| Task | Done? |
|------|-------|
| IDE installed (VS / VS Code / Rider) | ☐ |
| .NET SDK installed | ☐ |
| `dotnet --version` কাজ করে | ☐ |
| IDE তে C# project create করা যায় | ☐ |

সব tick করতে পারলে তুমি ready! 🎉

---

**পরের Lesson:** প্রথম C# Project তৈরি ও Run — project বানাবো, structure বুঝবো, code চালাবো

---

*CPS Academy - Learn. Code. Grow.*
