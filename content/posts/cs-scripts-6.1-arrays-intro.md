---
title: "Lesson 6.1: Arrays Introduction — অনেক Data একসাথে রাখা"
date: "2026-05-14"
excerpt: "কেন Array দরকার, Variable এর সমস্যা, Train/Apartment/Locker analogies এবং এই Module এ কী শিখবে"
categories:
  - C# Course Scripts
tags:
  - csharp
  - arrays
  - beginner
draft: false
---

# Lesson 6.1: Arrays Introduction — অনেক Data একসাথে রাখা

> **এই Lesson এ শিখবে:** কেন Array দরকার, Variable এর সমস্যা কী, Array কী, Real life analogies (Train, Apartment, Locker), এবং এই Module এ কী শিখবে।

---

## আগের Modules এ কী শিখলাম?

- Module 2: Variables — একটা বাক্সে **একটা** data
- Module 3: Input/Output
- Module 4: Conditionals
- Module 5: Loops

**কিন্তু একটা বড় সমস্যা আছে...**

---

## সমস্যাটা কী?

ধরো তুমি একজন teacher। তোমার class এ **5 জন student** আছে।

তুমি তাদের exam এর marks রাখতে চাও:

```csharp
int marks1 = 85;
int marks2 = 90;
int marks3 = 78;
int marks4 = 92;
int marks5 = 88;
```

ঠিক আছে, 5 জনের জন্য 5 টা variable। কাজ হয়ে গেছে।

**কিন্তু একটু চিন্তা করো...**

যদি তোমার class এ **50 জন student** থাকে? 🤔

```csharp
int marks1 = 85;
int marks2 = 90;
// ... আরো 48 টা!
int marks50 = 79;
```

**School এর সব student — 500 জন? 1000 জন?** 😱

এভাবে করা **impossible!**

---

## আরো বড় সমস্যা

ধরো সবার average বের করতে চাও:

```csharp
// 500 জন হলে!
int total = marks1 + marks2 + marks3 + ... + marks500;
double average = total / 500.0;
```

এটা তো পাগলামি! 🤯

**এই সমস্যার solution হলো Array!**

---

## Array কী?

Array হলো **একই type এর অনেক data একসাথে রাখার জায়গা।**

মানে:
- **একটাই নাম** দেবে (যেমন `marks`)
- কিন্তু সেই নামের ভিতরে **অনেকগুলো value** থাকবে
- প্রতিটা value এর একটা **নম্বর** থাকবে (index)

---

## Real Life এ Array বুঝি

### 🚂 Example 1: Train এর Bogies

ধরো "Subarna Express" train।

Train এর নাম একটাই, কিন্তু এর মধ্যে অনেক bogie:

```
"Subarna Express" Train:

┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ Bogie 0 │ Bogie 1 │ Bogie 2 │ Bogie 3 │ Bogie 4 │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

"Subarna Express এর 2 নম্বর bogie তে বসো" — সবাই বুঝে যায়।

- Train এর নাম = Array এর নাম
- Bogie নম্বর = **Index**
- প্রতিটা Bogie = Array এর একেকটা ঘর

---

### 🏠 Example 2: Apartment Building

"Green Villa" নামে একটা apartment:

```
"Green Villa":

┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Flat 101 │ Flat 102 │ Flat 103 │ Flat 104 │ Flat 105 │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

Building একটাই, ভিতরে অনেক flat। সবাই flat number দিয়ে চিনে।

---

### 📦 Example 3: School Locker

```
Locker Room:

┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Locker 0 │ Locker 1 │ Locker 2 │ Locker 3 │ Locker 4 │
│  Rahim   │  Karim   │  Jabbar  │  Salam   │  Jalil   │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

Locker Room একটাই, ভিতরে অনেক locker। প্রতিটা locker এর একটা নম্বর।

---

## Programming এ Array

```
marks Array:

┌─────┬─────┬─────┬─────┬─────┐
│ 85  │ 90  │ 78  │ 92  │ 88  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4    ← Index (ঘরের নম্বর)
```

- Array এর নাম: `marks`
- ভিতরে **5 টা ঘর**
- প্রতিটা ঘরের একটা **index**: 0, 1, 2, 3, 4

**একটা variable এর মতো use হয়, কিন্তু অনেক data ধরে!**

---

## Array এর Power

500 জনের marks যোগ করতে:

```csharp
// Array দিয়ে মাত্র 5 লাইন!
int[] marks = { /* 500 values */ };
int total = 0;

for (int i = 0; i < marks.Length; i++)
{
    total += marks[i];
}
```

**500 টা variable না! একটা array, একটা loop — ব্যাস!**

---

## এই Module এ কী শিখবে?

| Lesson | Topic |
|--------|-------|
| 6.1 | Introduction (এটা!) |
| 6.2 | Array বানানো, Index, Value রাখা |
| 6.3 | Array Initialize, Length, Loop দিয়ে Traverse |
| 6.4 | Array এর Real Examples |
| 6.5 | 2D Array — Grid/Table এর মতো |
| 6.6 | 2D Array Traverse ও Examples |
| 6.7 | foreach Loop — Array এর জন্য special loop |
| 6.8 | Array Methods Part 1 (Sort, Reverse, IndexOf, Copy) |
| 6.9 | Array Methods Part 2 (Find, Exists, Resize) |
| 6.10 | Practice & Assignments |

---

## এই Module শেষে তুমি বানাতে পারবে:

- 📊 Student marks management system
- 🎬 Cinema seat booking
- 🎮 Tic-Tac-Toe board
- 🛒 Shopping cart
- 🔍 Search system
- 📈 Statistics (average, max, min)
- 🏆 Top 3 finder

**চলো শুরু করি!**

---

**পরের Lesson:** Array বানানো — Index কী, কীভাবে value রাখবো।

---

*CPS Academy - Learn. Code. Grow.*
