---
title: "Lesson 6.4: Array এর Real Examples"
date: "2026-05-17"
excerpt: "Parallel Arrays, Total, Average, Max, Min, Search, Count এবং Complete Student Result Card"
categories:
  - C# Course Scripts
tags:
  - csharp
  - arrays
  - examples
draft: false
---

# Lesson 6.4: Array এর Real Examples

> **এই Lesson এ দেখবে:** Student Marks System, দুইটা Array parallel use, Sum, Average, Max, Min বের করা, Search, Count, এবং Complete Result Card।

---

## Example 1: Student Marks Display

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

Console.WriteLine("📊 STUDENT MARKS");
Console.WriteLine("─────────────────");

for (int i = 0; i < marks.Length; i++)
{
    int studentNumber = i + 1;  // index 0 থেকে, Student 1 থেকে
    Console.WriteLine($"Student {studentNumber}: {marks[i]} marks");
}
```

Output:
```
📊 STUDENT MARKS
─────────────────
Student 1: 85 marks
Student 2: 90 marks
Student 3: 78 marks
Student 4: 92 marks
Student 5: 88 marks
```

---

## Example 2: দুইটা Array একসাথে — Parallel Arrays

Student দের **নাম ও marks** একসাথে দেখাও:

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
int[] marks = { 85, 90, 78, 92, 88 };

Console.WriteLine("📊 STUDENT RESULTS");
Console.WriteLine("───────────────────");

for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"{names[i]}: {marks[i]} marks");
}
```

### কী হচ্ছে?

দুইটা array এর **same index এ related data:**
- `names[0]` = "Rahim", `marks[0]` = 85 → Rahim এর marks 85
- `names[1]` = "Karim", `marks[1]` = 90 → Karim এর marks 90

**এক loop এ দুইটা array ই access করছি!**

Output:
```
📊 STUDENT RESULTS
───────────────────
Rahim: 85 marks
Karim: 90 marks
Jabbar: 78 marks
Salam: 92 marks
Jalil: 88 marks
```

---

## Example 3: Total ও Average

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

int sum = 0;

for (int i = 0; i < marks.Length; i++)
{
    sum += marks[i];
}

double average = (double)sum / marks.Length;

Console.WriteLine($"Total marks: {sum}");
Console.WriteLine($"Number of students: {marks.Length}");
Console.WriteLine($"Average: {average:F2}");
```

Output:
```
Total marks: 433
Number of students: 5
Average: 86.60
```

**Step by Step:**

| i | marks[i] | sum (আগে) | sum (পরে) |
|---|----------|-----------|-----------|
| 0 | 85 | 0 | 85 |
| 1 | 90 | 85 | 175 |
| 2 | 78 | 175 | 253 |
| 3 | 92 | 253 | 345 |
| 4 | 88 | 345 | 433 |

---

## Example 4: Maximum খোঁজা

কার marks সবচেয়ে বেশি?

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

int max = marks[0];  // প্রথম element কে max ধরলাম

for (int i = 1; i < marks.Length; i++)
{
    if (marks[i] > max)
    {
        max = marks[i];
    }
}

Console.WriteLine($"Highest marks: {max}");  // 92
```

**Logic:**
- প্রথম element কে max ধরো
- i = 1 থেকে শুরু (0 তো already নিলাম)
- প্রতিটার সাথে compare, বড় পেলে update

---

## Example 5: Max এর Name সহ

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
int[] marks = { 85, 90, 78, 92, 88 };

int maxIndex = 0;

for (int i = 1; i < marks.Length; i++)
{
    if (marks[i] > marks[maxIndex])
    {
        maxIndex = i;
    }
}

Console.WriteLine($"🏆 Topper: {names[maxIndex]} with {marks[maxIndex]} marks");
```

Output:
```
🏆 Topper: Salam with 92 marks
```

**`maxIndex` track করছি — তারপর name আর marks দুটোই পেয়ে যাচ্ছি!**

---

## Example 6: Minimum খোঁজা

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int min = marks[0];

for (int i = 1; i < marks.Length; i++)
{
    if (marks[i] < min)
    {
        min = marks[i];
    }
}

Console.WriteLine($"Lowest marks: {min}");  // 78
```

---

## Example 7: Search — Target আছে কিনা?

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int target = 92;
bool found = false;
int foundIndex = -1;

for (int i = 0; i < marks.Length; i++)
{
    if (marks[i] == target)
    {
        found = true;
        foundIndex = i;
        break;  // পেয়ে গেছি, আর খোঁজার দরকার নেই!
    }
}

if (found)
    Console.WriteLine($"✅ {target} found at index {foundIndex}!");
else
    Console.WriteLine($"❌ {target} not found!");
```

Output: `✅ 92 found at index 3!`

---

## Example 8: Count — কতজন Pass?

40 এর বেশি marks পেয়েছে কতজন?

```csharp
int[] marks = { 85, 90, 35, 92, 88, 30, 75 };
int passCount = 0;

for (int i = 0; i < marks.Length; i++)
{
    if (marks[i] >= 40)
    {
        passCount++;
    }
}

Console.WriteLine($"Total students: {marks.Length}");
Console.WriteLine($"Passed: {passCount}");
Console.WriteLine($"Failed: {marks.Length - passCount}");
```

Output:
```
Total students: 7
Passed: 5
Failed: 2
```

---

## Complete Example: Student Result Card

সব একসাথে — Professional result system:

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
int[] marks = { 85, 90, 35, 92, 78 };

Console.WriteLine("╔═══════════════════════════════════╗");
Console.WriteLine("║       📋 CLASS RESULT              ║");
Console.WriteLine("╚═══════════════════════════════════╝\n");

// Individual results
int sum = 0;
int passCount = 0;
int maxIndex = 0;
int minIndex = 0;

for (int i = 0; i < names.Length; i++)
{
    string status = marks[i] >= 40 ? "✅ Pass" : "❌ Fail";
    Console.WriteLine($"{names[i],-10} : {marks[i],3} marks  {status}");

    sum += marks[i];
    if (marks[i] >= 40) passCount++;
    if (marks[i] > marks[maxIndex]) maxIndex = i;
    if (marks[i] < marks[minIndex]) minIndex = i;
}

double average = (double)sum / marks.Length;

Console.WriteLine("\n───────────────────────────────────");
Console.WriteLine($"Total Students  : {marks.Length}");
Console.WriteLine($"Passed          : {passCount}");
Console.WriteLine($"Failed          : {marks.Length - passCount}");
Console.WriteLine($"Average         : {average:F2}");
Console.WriteLine($"🏆 Highest      : {names[maxIndex]} ({marks[maxIndex]})");
Console.WriteLine($"📉 Lowest       : {names[minIndex]} ({marks[minIndex]})");
```

Output:
```
╔═══════════════════════════════════╗
║       📋 CLASS RESULT              ║
╚═══════════════════════════════════╝

Rahim      :  85 marks  ✅ Pass
Karim      :  90 marks  ✅ Pass
Jabbar     :  35 marks  ❌ Fail
Salam      :  92 marks  ✅ Pass
Jalil      :  78 marks  ✅ Pass

───────────────────────────────────
Total Students  : 5
Passed          : 4
Failed          : 1
Average         : 76.00
🏆 Highest      : Salam (92)
📉 Lowest       : Jabbar (35)
```

---

## Summary

**Real use cases:**
- Sum, Average calculation
- Max/Min খোঁজা (with names)
- Search — target আছে কিনা
- Count — condition match কতটা

**Parallel Arrays:**
- একই index এ related data
- এক loop এ সব access

**Patterns:**
- `int max = arr[0]; for (i=1...)` — Max finding
- `int sum = 0; for (i=0...)` — Summing
- `bool found = false;` — Searching
- `int count = 0;` — Counting

---

**পরের Lesson:** 2D Array — Grid/Table এর মতো data!

---

*CPS Academy - Learn. Code. Grow.*
