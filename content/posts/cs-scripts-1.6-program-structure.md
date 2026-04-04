---
title: "Lesson 1.6: C# Program Structure"
date: "2026-04-10"
excerpt: "Top-level statements vs traditional style, using, namespace, class, Main method"
categories:
  - C# Course Scripts
tags:
  - csharp
  - program-structure
  - namespace
  - class
  - main-method
draft: false
---

# Lesson 1.6: C# Program Structure

> **এই Lesson এ শিখবে:** Top-level statements vs traditional style, using কী, namespace কী, class কী, Main method কী, কোনটা কখন use করবে।

---

## দুইটা Style আছে

এতক্ষণ আমরা code লিখছিলাম, কিন্তু একটু থামো। আসলে C# program এর গঠনটা কেমন সেটা একবার বুঝে নিই।

তুমি হয়তো লক্ষ্য করেছো — আমরা শুধু `Console.WriteLine()` লিখেই কাজ চালাচ্ছি। কিন্তু অনেক জায়গায় দেখবে অনেক বেশি code লেখা। সেটা কী জিনিস?

### Style 1: Top-level Statements (যেটা আমরা করছি)

```csharp
Console.WriteLine("Hello!");
```

ব্যস, এইটুকুই। সহজ, clean।

### Style 2: Traditional (পুরাতন style)

```csharp
using System;

namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello!");
        }
    }
}
```

একই কাজ, কিন্তু কত code!

এখন প্রশ্ন হলো — এত extra জিনিস কেন? চলো একটা একটা করে বুঝি।

---

## using — অন্যের জিনিস ধার করা

ধরো তোমার বন্ধু একটা calculator বানিয়ে রেখেছে। তুমি সেটা use করতে চাও। কী করবে? তাকে বলবে "ভাই তোর calculator টা দে"।

C# এও same জিনিস। Microsoft অনেক ready-made code বানিয়ে রেখেছে। তুমি সেগুলো use করতে চাইলে `using` দিয়ে বলতে হবে।

```csharp
using System;
```

এই line টা বলছে — "System নামে যে collection আছে, ওটার জিনিসপত্র আমি use করবো"।

`Console.WriteLine()` আসলে `System` এর মধ্যে আছে। তাই পুরা নাম হলো `System.Console.WriteLine()`।

```csharp
// using ছাড়া লিখতে হতো এভাবে
System.Console.WriteLine("Hello!");

// using দিলে শুধু এটুকু লিখলেই হয়
Console.WriteLine("Hello!");
```

অনেক কম লেখা লাগে, তাই না?

### তাহলে আমরা using না লিখেই কীভাবে কাজ করছি?

ভালো প্রশ্ন! .NET 6 থেকে commonly used জিনিসগুলো automatic import হয়ে যায়। এটাকে বলে **Implicit Usings**। তাই আমাদের আলাদা করে লিখতে হচ্ছে না।

কিন্তু যখন special কিছু লাগবে (যেমন file নিয়ে কাজ, internet থেকে data আনা), তখন using লিখতে হবে:

```csharp
using System.IO;                    // File নিয়ে কাজ
using System.Net.Http;              // Internet request
using System.Collections.Generic;   // List, Dictionary
```

এগুলো পরে কাজে লাগবে। এখন শুধু concept টা জানলেই হলো।

---

## namespace — ঠিকানা দেওয়া

ধরো তোমার নাম Rahim। বাংলাদেশে আরো হাজার হাজার Rahim আছে। তোমাকে আলাদা করে চিনবে কীভাবে?

ঠিকানা দিয়ে!

"ঢাকা, মিরপুর, সেকশন ১০ এর Rahim" — এখন unique হয়ে গেলো।

namespace ও তাই। তোমার code কে একটা ঠিকানা দেয়।

```csharp
namespace CpsAcademy.StudentManagement
{
    // তোমার code এখানে
}
```

এখন তোমার code এর "ঠিকানা" হলো `CpsAcademy.StudentManagement`।

### কেন দরকার?

ধরো তুমি একটা `Student` class বানালে। আরেকজন ও একটা `Student` class বানালো। দুইটা যদি একসাথে use করতে চাও, কীভাবে বুঝবে কোনটা কার?

```csharp
namespace CpsAcademy
{
    class Student { }  // তোমার Student
}

namespace AnotherCompany
{
    class Student { }  // অন্যের Student
}
```

এখন আলাদা করে বলা যায়:
- `CpsAcademy.Student` — তোমারটা
- `AnotherCompany.Student` — অন্যেরটা

ছোট project এ namespace নিয়ে মাথা ঘামানোর দরকার নেই। বড় project বা team এ কাজ করলে দরকার পড়বে।

---

## class — জিনিসপত্র রাখার বাক্স

class কে একটা বাক্স ভাবো। এই বাক্সের মধ্যে তুমি related জিনিসপত্র রাখো।

```csharp
class Calculator
{
    // calculator এর সব কিছু এখানে থাকবে
}

class Student
{
    // student এর সব কিছু এখানে থাকবে
}
```

Calculator এর বাক্সে calculator related জিনিস, Student এর বাক্সে student related জিনিস।

আপাতত এইটুকু জানলেই চলবে। class নিয়ে পরে একটা আস্ত module আছে (Module 10), সেখানে detail এ বলবো।

---

## Main method — যেখান থেকে সব শুরু

তোমার program এ হয়তো অনেক code থাকবে। কিন্তু computer কোথা থেকে শুরু করবে?

`Main` method থেকে!

```csharp
static void Main(string[] args)
{
    // এখান থেকে program শুরু হয়
    Console.WriteLine("Program started!");
}
```

এটাকে বলে **"entry point"**। মানে program এর দরজা। Computer এই দরজা দিয়ে ঢোকে।

### Main এর parts

```csharp
static void Main(string[] args)
```

| Part | মানে কী |
|------|--------|
| static | একটাই থাকবে, copy হবে না |
| void | কিছু return করবে না |
| Main | নাম, এটা fixed — অন্য নাম দিলে কাজ করবে না |
| string[] args | বাইরে থেকে কিছু পাঠালে এখানে আসবে |

এগুলো নিয়ে এখন মাথা ঘামানোর দরকার নেই। শুধু জানো যে program `Main` থেকে শুরু হয়।

---

## পুরা ছবিটা দেখি

Traditional style এ একটা program কেমন দেখায়:

```csharp
using System;                    // ১. অন্যের জিনিস ধার

namespace MyFirstApp             // ২. আমার ঠিকানা
{
    class Program                // ৩. জিনিসপত্রের বাক্স
    {
        static void Main(string[] args)    // ৪. শুরুর দরজা
        {
            Console.WriteLine("Hello!");   // ৫. আসল কাজ
        }
    }
}
```

বাইরে থেকে ভিতরে যেভাবে যাচ্ছে:

```
using (বাইরের জিনিস আনো)
  └── namespace (তোমার ঠিকানা)
        └── class (জিনিসের বাক্স)
              └── Main() (শুরুর দরজা)
                    └── তোমার code (আসল কাজ)
```

---

## Top-level Statements কী জিনিস?

.NET 6 থেকে Microsoft বললো — "এত boilerplate code কেন? নতুনদের জন্য কঠিন হয়ে যাচ্ছে।"

তাই তারা একটা shortcut দিলো। তুমি শুধু কাজের code লেখো, বাকিটা compiler বুঝে নেবে।

```csharp
// এইটুকু লিখলেই হবে
Console.WriteLine("Hello!");
```

পেছনে compiler নিজে থেকে বাকি সব যোগ করে নেয়:

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello!");
    }
}
```

তোমার কাজ কমে গেলো, কিন্তু actually same জিনিসই হচ্ছে।

### Top-level এ কিছু নিয়ম আছে

- Project এ **শুধু একটা file** এ top-level statements থাকতে পারে
- সেই file এই হলো entry point
- অন্য file গুলোতে traditional style লিখতে হবে

---

## কোনটা কখন use করবে?

### Top-level Statements use করো যখন:

- ছোট program বা script লিখছো
- শিখছো, practice করছো
- Quick prototype বানাচ্ছো
- একটা file এই সব code

### Traditional style use করো যখন:

- বড় project
- Multiple files আছে
- Team এ কাজ করছো
- Professional/production code

### পাশাপাশি তুলনা

**Traditional style:**

```csharp
using System;

namespace CpsAcademy
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Tomar naam ki? ");
            string naam = Console.ReadLine();
            
            Console.WriteLine($"Hello {naam}! Welcome to CPS Academy!");
        }
    }
}
```

**Same জিনিস Top-level এ:**

```csharp
Console.Write("Tomar naam ki? ");
string naam = Console.ReadLine();

Console.WriteLine($"Hello {naam}! Welcome to CPS Academy!");
```

দুইটাই exactly same কাজ করবে। কিন্তু দ্বিতীয়টা কত clean!

### আমার suggestion

এখন top-level statements দিয়ে শেখো। সহজ, ঝামেলা কম।

পরে যখন বড় project করবে, তখন traditional style এ যাবে। সেটা আস্তে আস্তে হবে, tension নেই।

---

## Summary

| জিনিস | কাজ কী | বাংলায় |
|-------|--------|--------|
| using | বাইরের code ধার করা | "ভাই তোর জিনিস টা দে" |
| namespace | তোমার code এর ঠিকানা | "মিরপুরের Rahim" |
| class | related জিনিস রাখার বাক্স | "Calculator এর বাক্স" |
| Main | program এর শুরুর দরজা | "entry point" |
| Top-level | shortcut, boilerplate ছাড়া | "compiler বাকিটা করবে" |

**মনে রাখো:** এখন এসব নিয়ে বেশি চিন্তা করো না। শুধু জানো যে এগুলো কী। পরে বড় project করতে গেলে আস্তে আস্তে সব clear হয়ে যাবে।

---

## 🎉 Module 1 Complete!

**তুমি Module 1 এ শিখেছো:**

- ✅ C# কী, কেন শিখবে, কোথায় ব্যবহার হয়
- ✅ .NET ecosystem — Framework, Core, .NET 8, CLR, SDK vs Runtime
- ✅ Environment setup — Visual Studio / VS Code / Rider
- ✅ প্রথম project তৈরি, build ও run
- ✅ Console I/O — print, input, string interpolation, escape characters
- ✅ Program structure — using, namespace, class, Main, top-level statements

**Congratulations!** তুমি এখন C# এর basics জানো। এবার আসল coding শুরু!

---

**পরের Module:** Module 2 — Variables, Data Types & Type Casting। Data কীভাবে রাখবে, কোন data কোন type এ রাখবে, এক type থেকে আরেক type এ কীভাবে convert করবে — সব শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
