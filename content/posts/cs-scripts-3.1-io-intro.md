---
title: "Lesson 3.1: Input/Output Introduction — User এর সাথে কথা বলা"
date: "2026-04-25"
excerpt: "Input/Output কী, কেন User থেকে data নিতে হয়, Console.WriteLine ও Console.ReadLine recap এবং Module 3 এর overview"
categories:
  - C# Course Scripts
tags:
  - csharp
  - input-output
  - console
  - beginner
draft: false
---

# Lesson 3.1: Input/Output Introduction — User এর সাথে কথা বলা

> **এই Lesson এ শিখবে:** Input/Output কী, কেন User থেকে data নিতে হয়, Console.WriteLine recap, Console.ReadLine recap, এবং এই Module এ কী কী শিখবে।

---

## আগের Module এ কী শিখলাম?

Module 2 তে শিখলাম Variables, Data Types, Operators। কিন্তু সব data আমরা **নিজে লিখে দিচ্ছিলাম:**

```csharp
int age = 25;          // আমরা নিজে 25 দিলাম
string name = "Rahim"; // আমরা নিজে "Rahim" দিলাম
```

**সমস্যা:** প্রতিবার আলাদা student এর জন্য **code change** করতে হচ্ছে!

---

## User থেকে নিলে কী হয়?

```csharp
// এটা hardcoded — শুধু Rahim এর জন্য কাজ করে
string name = "Rahim";
int age = 25;

// এটা dynamic — যেকোনো user এর জন্য কাজ করবে!
Console.Write("Name: ");
string name = Console.ReadLine();

Console.Write("Age: ");
int age = int.Parse(Console.ReadLine());
```

**একবার program বানাও, হাজার জন use করতে পারবে!**

---

## Output — Console.WriteLine()

Program থেকে user কে কিছু দেখানো:

```csharp
Console.WriteLine("Hello World!");          // নতুন line সহ
Console.Write("Enter name: ");              // নতুন line ছাড়া
Console.WriteLine($"Name: {name}");         // variable সহ
Console.WriteLine($"Total: {price:F2} tk"); // formatting সহ
```

| Method | কাজ |
|--------|-----|
| `Console.WriteLine()` | Print + নতুন line |
| `Console.Write()` | Print, same line এ থাকে |

---

## Input — Console.ReadLine()

User থেকে কিছু নেওয়া:

```csharp
Console.Write("Tomar naam ki? ");
string naam = Console.ReadLine();

Console.WriteLine($"Hello, {naam}!");
```

**⚠️ Console.ReadLine() সবসময় `string` দেয়!**

```csharp
Console.Write("Age: ");
string input = Console.ReadLine();  // "25" — এটা string!

// input + 5 = "255" (text জোড়া!) ❌
// number হিসেবে use করতে convert করতে হবে
```

---

## এই Module এ কী শিখবে?

| Lesson | Topic |
|--------|-------|
| 3.1 | Introduction (এটা!) |
| 3.2 | সব Type এর Input — int, double, string, char কীভাবে নেবে |
| 3.3 | Input Validation — ভুল input দিলে কী করবে |
| 3.4 | Output Formatting — সুন্দর করে result দেখানো |
| 3.5 | Practice & Assignments |

**এই Module শেষে তুমি বানাতে পারবে:**
- 🧮 Interactive Calculator (user number দেবে)
- 📋 Student Registration Form
- 🛒 Shopping Bill (user price দেবে)
- 🌡️ Temperature Converter (user input দিয়ে)

---

**পরের Lesson:** সব Type এর Input নেওয়া — string, int, double, char কীভাবে নেবে।

---

*CPS Academy - Learn. Code. Grow.*
