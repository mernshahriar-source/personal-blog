---
title: "Lesson 2.1: Variables ও Data Types Introduction — কেন Data Store করতে হয়?"
date: "2026-04-11"
excerpt: "Program এ data কেন দরকার, Variable ও Data Type কী জিনিস, এই Module এ কী কী শিখবে"
categories:
  - C# Course Scripts
tags:
  - csharp
  - variables
  - data-types
  - introduction
draft: false
---

# Lesson 2.1: Variables ও Data Types Introduction — কেন Data Store করতে হয়?

> **এই Lesson এ শিখবে:** Program এ data কেন দরকার, Variable ও Data Type কী জিনিস, এই Module এ কী কী শিখবে, এবং কোথায় কাজে লাগবে।

---

## আগের Module এ কী শিখলাম?

Module 1 এ শিখলাম:
- C# কী, কেন শিখবো
- Visual Studio setup
- প্রথম program — "Hello World"
- Console.WriteLine দিয়ে output
- Console.ReadLine দিয়ে input

**কিন্তু একটা সমস্যা আছে...**

---

## সমস্যাটা কী?

ধরো user কে জিজ্ঞেস করলাম "তোমার নাম কী?" — user বললো "Rahim"।

এখন এই "Rahim" টা কোথায় রাখবে? পরে আবার use করতে হবে তো?

```csharp
Console.Write("Tomar naam ki? ");
Console.ReadLine();  // User "Rahim" দিলো... কিন্তু কোথায় গেলো?

// পরে নাম দিয়ে greet করতে চাই... কীভাবে?
```

**Data store করার জায়গা নেই!**

---

## আরো কিছু সমস্যা

### Calculator বানাতে চাই:

```
User দিলো: 10 আর 20
যোগ করতে হবে: 10 + 20 = 30

কিন্তু 10 আর 20 কোথায় রাখবো?
যোগফল 30 কোথায় রাখবো?
```

### Student এর result বানাতে চাই:

```
নাম: Rahim
নম্বর: 85
Pass করেছে কিনা: হ্যাঁ

এই তিনটা আলাদা ধরনের data — text, number, হ্যাঁ/না
সব কোথায় রাখবো? কীভাবে রাখবো?
```

---

## Solution: Variable ও Data Type!

**Variable** = data রাখার বাক্স
**Data Type** = বাক্সের ধরন (কী রাখবে — number? text? হ্যাঁ/না?)

```csharp
string naam = "Rahim";     // text রাখার বাক্স
int marks = 85;             // number রাখার বাক্স
bool passed = true;         // হ্যাঁ/না রাখার বাক্স
```

এখন data store হলো, পরে যখন খুশি use করতে পারবো!

```csharp
Console.WriteLine($"Name: {naam}");
Console.WriteLine($"Marks: {marks}");
Console.WriteLine($"Passed: {passed}");
```

---

## এই Module এ কী কী শিখবে?

| Topic | কী শিখবে |
|-------|---------|
| **Variable** | Data রাখার বাক্স বানানো |
| **Data Types** | int, double, string, bool — কোন বাক্সে কী রাখবে |
| **Operators** | +, -, *, /, ==, !=, &&, \|\| — data দিয়ে কাজ করা |
| **Type Casting** | এক type থেকে অন্য type এ নেওয়া |
| **Conversion** | User input (string) কে number এ বদলানো |

---

## কোথায় কাজে লাগবে?

এই module শেষে তুমি বানাতে পারবে:

- 🧮 **Calculator** — যোগ, বিয়োগ, গুণ, ভাগ
- 📊 **Result Card** — নাম, নম্বর, grade
- 🛒 **Shopping Bill** — দাম × quantity = total
- 🌡️ **Temperature Converter** — Fahrenheit ↔ Celsius
- ✅ **Login Check** — username আর password match কিনা

**Variable ও Operator হলো programming এর ভিত্তি — এটা ছাড়া কিছুই করা যায় না!**

---

**পরের Lesson:** Variable কী — data রাখার বাক্স বানানো শিখবো।

---

*CPS Academy - Learn. Code. Grow.*
