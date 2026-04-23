---
title: "Lesson 6.2: Array বানানো, Index, Value রাখা"
date: "2026-05-15"
excerpt: "Array বানানোর 3 steps, Index কী ও কেন 0 থেকে, Value রাখা ও বের করা, Different types এর array"
categories:
  - C# Course Scripts
tags:
  - csharp
  - arrays
  - index
  - beginner
draft: false
---

# Lesson 6.2: Array বানানো, Index, Value রাখা

> **এই Lesson এ শিখবে:** Array বানানোর 3 steps, int[], new keyword, Index কী ও কেন 0 থেকে শুরু, শেষ index formula, Array তে value রাখা, Value বের করা, এবং Common Mistakes।

---

## Array বানানো — 3 Steps

### Step 1: বলো কী type এর array বানাবে

```csharp
int[]
```

- `int` = integer রাখবো
- `[]` = এটা array, single value না

আরো examples:
```csharp
double[]   // দশমিক numbers এর array
string[]   // text এর array
bool[]     // true/false এর array
char[]     // একটা অক্ষর এর array
```

---

### Step 2: একটা নাম দাও

```csharp
int[] marks
```

"আমি একটা integer array বানাবো, যার নাম **marks**"।

**কিন্তু এখনো array তৈরি হয়নি** — শুধু plan করলাম!

---

### Step 3: array টা তৈরি করো

```csharp
int[] marks = new int[5];
```

- `new` = নতুন তৈরি করো
- `int[5]` = 5 টা ঘর বিশিষ্ট integer array

**এখন array তৈরি!**

```
marks Array (নতুন তৈরি):

┌─────┬─────┬─────┬─────┬─────┐
│  0  │  0  │  0  │  0  │  0  │  ← সব ঘরে 0 (default)
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4    ← Index
```

নতুন array বানালে সব ঘরে **default value** থাকে:
- `int[]` → 0
- `double[]` → 0.0
- `bool[]` → false
- `string[]` → null

---

## Index কী? (এটা Super Important! ⚠️)

Index হলো array এর **ঘরের নম্বর**।

**C# এ index 0 থেকে শুরু হয়!** 1 থেকে না!

```
marks Array:

┌─────┬─────┬─────┬─────┬─────┐
│     │     │     │     │     │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4     ← Index
   ↑                       ↑
প্রথম ঘর               শেষ ঘর
(index 0)            (index 4)
```

দেখো:
- **প্রথম** ঘর = index **0** (1 না!)
- **দ্বিতীয়** ঘর = index **1**
- **তৃতীয়** ঘর = index **2**
- **চতুর্থ** ঘর = index **3**
- **পঞ্চম** ঘর = index **4** (5 না!)

**5 টা ঘর আছে, কিন্তু শেষ index হলো 4!**

---

## Formula — শেষ Index

```
শেষ index = Array size - 1
```

| Size | শেষ index |
|------|-----------|
| 5 | 4 |
| 10 | 9 |
| 100 | 99 |
| 1000 | 999 |

---

## কেন 0 থেকে?

তুমি হয়তো ভাবছো — "1 থেকে হলেই তো পারতো!"

এর পিছনে technical কারণ আছে (memory address calculation), এখন সেটা জানতে হবে না।

**শুধু মনে রাখো: Index সবসময় 0 থেকে!**

শুরুতে একটু অদ্ভুত লাগবে, practice করলে অভ্যাস হয়ে যাবে।

---

## Array তে Value রাখা

Index use করে:

```csharp
int[] marks = new int[5];  // 5 ঘরের array

marks[0] = 85;   // প্রথম ঘরে 85
marks[1] = 90;   // দ্বিতীয় ঘরে 90
marks[2] = 78;   // তৃতীয় ঘরে 78
marks[3] = 92;   // চতুর্থ ঘরে 92
marks[4] = 88;   // পঞ্চম ঘরে 88
```

এখন array দেখতে:

```
marks Array:

┌─────┬─────┬─────┬─────┬─────┐
│ 85  │ 90  │ 78  │ 92  │ 88  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4
```

---

## Array থেকে Value বের করা

একই index use করে:

```csharp
Console.WriteLine(marks[0]);  // 85
Console.WriteLine(marks[2]);  // 78
Console.WriteLine(marks[4]);  // 88
```

---

## একটু Practice

```csharp
int[] marks = new int[5];

marks[0] = 85;
marks[1] = 90;
marks[2] = 78;
marks[3] = 92;
marks[4] = 88;

// Student 3 এর marks কত?
Console.WriteLine("Student 3 marks: " + marks[2]);
// Student 3 = তৃতীয় student = index 2!

// Student 1?
Console.WriteLine("Student 1 marks: " + marks[0]);
// Student 1 = প্রথম = index 0

// শেষ student?
Console.WriteLine("Last student: " + marks[4]);
// 5 জন student, শেষ index = 5 - 1 = 4
```

Output:
```
Student 3 marks: 78
Student 1 marks: 85
Last student: 88
```

---

## Different Types এর Array

### string[] — Names:

```csharp
string[] names = new string[3];

names[0] = "Rahim";
names[1] = "Karim";
names[2] = "Jabbar";

Console.WriteLine(names[0]);  // Rahim
Console.WriteLine(names[1]);  // Karim
```

### double[] — Prices:

```csharp
double[] prices = new double[3];

prices[0] = 99.99;
prices[1] = 149.50;
prices[2] = 199.00;

Console.WriteLine(prices[1]);  // 149.5
```

### bool[] — Attendance:

```csharp
bool[] present = new bool[5];

present[0] = true;
present[1] = false;  // Student 2 absent
present[2] = true;
present[3] = true;
present[4] = false;
```

---

## Value Update করা

একই index এ আবার value দিলে **overwrite** হয়:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

Console.WriteLine(marks[2]);  // 78

marks[2] = 95;  // Update!

Console.WriteLine(marks[2]);  // 95
```

---

## Common Mistakes

### ❌ Mistake 1: Index out of range

```csharp
int[] marks = new int[5];  // index: 0, 1, 2, 3, 4

marks[5] = 100;  // ❌ index 5 নেই! IndexOutOfRangeException!
marks[10] = 50;  // ❌ Error!
```

**Error:** `System.IndexOutOfRangeException`

### ❌ Mistake 2: Index 1 থেকে শুরু করা

```csharp
int[] marks = { 85, 90, 78 };

Console.WriteLine(marks[1]);  // 90 (কিন্তু তুমি হয়তো 85 ভেবেছিলে!)
Console.WriteLine(marks[0]);  // 85 ✅
```

### ❌ Mistake 3: Size ভুল calculation

```csharp
int[] arr = new int[5];
// 5 টা ঘর: index 0, 1, 2, 3, 4
// শেষ index 4, size 5 না!
```

---

## Summary

**Array বানানো:**
```csharp
int[] marks = new int[5];
```

**Value রাখা:**
```csharp
marks[0] = 85;
```

**Value বের করা:**
```csharp
Console.WriteLine(marks[0]);
```

**মনে রাখো:**
- Index **0 থেকে শুরু**
- শেষ index = **size - 1**
- Range এর বাইরে → **Exception!**
- `int[]`, `double[]`, `string[]`, `bool[]`, `char[]` — সব type এর array হয়

---

**পরের Lesson:** Array Initialize এর সহজ উপায়, Length, আর Loop দিয়ে traverse!

---

*CPS Academy - Learn. Code. Grow.*
