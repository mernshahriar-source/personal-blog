---
title: "Lesson 5.3: foreach Loop — সহজে Array Traverse"
date: "2026-03-19"
excerpt: "foreach loop কী ও কেন সহজ, for vs foreach তুলনা, foreach syntax, limitations (index নেই, read-only), কখন foreach কখন for, এবং real-world examples"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - arrays
  - data-structures
draft: false
---


> **এই Lesson এ শিখবে:** foreach loop কী ও কেন সহজ, for vs foreach তুলনা, foreach syntax, limitations (index নেই, read-only), কখন foreach কখন for, এবং real-world examples।

---

## foreach কেন দরকার?

for loop দিয়ে array traverse করতে অনেক কিছু লিখতে হয়:

```csharp
string[] fruits = { "Apple", "Banana", "Mango", "Orange" };

// for loop — counter, Length, index সব লাগে
for (int i = 0; i < fruits.Length; i++)
{
    Console.WriteLine(fruits[i]);
}
```

তুমি মনে মনে শুধু বলতে চাইছো: **"fruits এর প্রতিটা জিনিস print করো"** — কিন্তু code এ অনেক কিছু লিখতে হচ্ছে।

**foreach এ সেটাই বলা যায়!**

---

## foreach দিয়ে করি

```csharp
string[] fruits = { "Apple", "Banana", "Mango", "Orange" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

**কোনো `i` নেই, কোনো `Length` নেই, কোনো `fruits[i]` নেই!**

---

## foreach এর Syntax

```csharp
foreach (dataType variableName in arrayName)
{
    // variableName দিয়ে কাজ করো
}
```

| Part | মানে |
|------|------|
| `dataType` | Array element এর type (string, int, etc.) |
| `variableName` | প্রতিটা element এর জন্য temporary নাম |
| `in` | keyword — "এর মধ্যে" |
| `arrayName` | কোন array traverse করবে |

**পড়ো এভাবে:** "fruits এর প্রতিটা string fruit এর জন্য — এটা করো"

---

## for vs foreach — পাশাপাশি

```csharp
// for — অনেক কিছু লিখতে হয়
for (int i = 0; i < fruits.Length; i++)
{
    Console.WriteLine(fruits[i]);
}

// foreach — সহজ এবং clean!
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

**Output দুইটাই same!**

---

## Different Types দিয়ে foreach

### int array:
```csharp
int[] marks = { 85, 90, 78, 92, 88 };

foreach (int mark in marks)
{
    Console.WriteLine(mark);
}
```

### double array:
```csharp
double[] prices = { 99.99, 149.50, 299.00 };

foreach (double price in prices)
{
    Console.WriteLine($"{price} tk");
}
```

### bool array:
```csharp
bool[] attendance = { true, false, true, true, false };
int present = 0;

foreach (bool status in attendance)
{
    if (status) present++;
}

Console.WriteLine($"Present: {present}");
```

---

## Example: Sum ও Average

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

int sum = 0;
foreach (int mark in marks)
{
    sum += mark;
}

double average = (double)sum / marks.Length;
Console.WriteLine($"Average: {average}");  // 86.6
```

---

## Example: Search করা

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam" };
string searchFor = "Jabbar";
bool found = false;

foreach (string name in names)
{
    if (name == searchFor)
    {
        found = true;
        Console.WriteLine($"✅ {searchFor} found!");
        break;
    }
}

if (!found)
    Console.WriteLine($"❌ {searchFor} not found.");
```

---

## foreach এর Limitations ⚠️

### 1. Index জানা যায় না

```csharp
// ❌ foreach এ i নেই
foreach (string fruit in fruits)
{
    // fruit এর index কত? জানার উপায় নেই!
}

// ✓ Index দরকার হলে for use করো
for (int i = 0; i < fruits.Length; i++)
{
    Console.WriteLine($"{i}: {fruits[i]}");
}
```

### 2. Element modify করা যায় না

```csharp
int[] marks = { 85, 90, 78 };

// ❌ Error! foreach এ element change করা যায় না
foreach (int mark in marks)
{
    mark = mark + 5;  // Error!
}

// ✓ Modify করতে হলে for use করো
for (int i = 0; i < marks.Length; i++)
{
    marks[i] = marks[i] + 5;  // Works!
}
```

### 3. উল্টা যাওয়া যায় না

```csharp
// ❌ foreach সবসময় শুরু থেকে শেষে যায়

// ✓ উল্টা যেতে হলে for use করো
for (int i = marks.Length - 1; i >= 0; i--)
{
    Console.WriteLine(marks[i]);
}
```

---

## foreach vs for — কখন কোনটা?

| foreach ভালো যখন | for ভালো যখন |
|-----------------|-------------|
| শুধু পড়তে চাই | Index দরকার |
| Code clean রাখতে চাই | Element modify করতে চাই |
| সব elements লাগবে | উল্টা যেতে চাই |
| | নির্দিষ্ট কিছু elements লাগবে |

**সহজ নিয়ম:** শুধু পড়তে চাইলে **foreach**, বাকি সব **for**!

---

## foreach দিয়ে 2D Array

```csharp
int[,] matrix = { { 1, 2, 3 }, { 4, 5, 6 } };

// foreach সব element একটা একটা করে দেয়
foreach (int num in matrix)
{
    Console.Write(num + " ");
}
// Output: 1 2 3 4 5 6
```

**Note:** 2D array তে foreach row/column structure রাখে না — সব element flat ভাবে দেয়। Table আকারে দেখাতে হলে for loop ভালো।

---

## Complete Example: Attendance System

```csharp
string[] students = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
bool[] present = { true, true, false, true, false };

Console.WriteLine("📋 Attendance Report\n");

int presentCount = 0;
int absentCount = 0;

for (int i = 0; i < students.Length; i++)
{
    if (present[i])
    {
        Console.WriteLine($"   ✅ {students[i]}");
        presentCount++;
    }
    else
    {
        Console.WriteLine($"   ❌ {students[i]}");
        absentCount++;
    }
}

double rate = (double)presentCount / students.Length * 100;

Console.WriteLine($"\n   Present: {presentCount}");
Console.WriteLine($"   Absent: {absentCount}");
Console.WriteLine($"   Rate: {rate:F1}%");
```

**Note:** এখানে index দরকার (names আর present এর same index), তাই for use করলাম। শুধু একটা array traverse করলে foreach ভালো হতো।

---

## Summary

| Concept | মানে |
|---------|------|
| foreach | "প্রতিটা element এর জন্য কাজ করো" |
| syntax | `foreach (type item in array)` |
| Index নেই | foreach এ index জানা যায় না |
| Read-only | Element modify করা যায় না |

**foreach Syntax:**
```csharp
foreach (dataType variable in array)
{
    // variable দিয়ে কাজ করো
}
```

**মনে রাখো:**
- foreach সহজ এবং readable
- কিন্তু limited — index নেই, modify হয় না
- শুধু পড়তে চাইলে → **foreach**
- বাকি সব → **for**

---

**পরের Lesson:** Array Methods — Sort, Reverse, IndexOf, Find এবং আরো built-in সুবিধা।

---

*CPS Academy - Learn. Code. Grow.*
