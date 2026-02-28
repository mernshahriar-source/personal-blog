---
title: "Lesson 5.1: Arrays — একই Type এর অনেক Data একসাথে"
date: "2026-03-17"
excerpt: "Array কী ও কেন দরকার, index (0 থেকে শুরু!), array বানানো ও initialize করা, Length property, loop দিয়ে traverse, sum/average/max/min"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - arrays
  - data-structures
draft: false
---


> **এই Lesson এ শিখবে:** Array কী ও কেন দরকার, index (0 থেকে শুরু!), array বানানো ও initialize করা, Length property, loop দিয়ে traverse, sum/average/max/min বের করা, different types এর array, এবং common mistakes।

---

## Array কেন দরকার?

ধরো তুমি teacher, 5 জন student এর marks রাখতে চাও:

```csharp
int marks1 = 85;
int marks2 = 90;
int marks3 = 78;
int marks4 = 92;
int marks5 = 88;
```

5 জনের জন্য 5 টা variable। কিন্তু **50 জন** হলে? **500 জন** হলে? 500 টা variable বানাবে?

আর average বের করতে: `marks1 + marks2 + ... + marks500` — এটা পাগলামি!

**সমাধান: Array!**

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
```

একটাই নাম `marks`, কিন্তু ভিতরে 5 টা value!

---

## Array কী?

Array হলো **একই type এর অনেক data একসাথে রাখার জায়গা।**

```
marks Array:

┌─────┬─────┬─────┬─────┬─────┐
│ 85  │ 90  │ 78  │ 92  │ 88  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4    ← Index (ঘরের নম্বর)
```

- Array এর নাম: `marks`
- ভিতরে 5 টা ঘর
- প্রতিটা ঘরের একটা **index** (নম্বর) আছে

---

## Index — ⚠️ খুব Important!

**C# তে index 0 থেকে শুরু হয়!** 1 থেকে না!

| ঘর | Index |
|----|-------|
| প্রথম | 0 |
| দ্বিতীয় | 1 |
| তৃতীয় | 2 |
| চতুর্থ | 3 |
| পঞ্চম | 4 |

**5 টা ঘর, কিন্তু শেষ index 4!**

**Formula:** শেষ index = Array size - 1

---

## Array বানানো

### Way 1: খালি array বানাও, পরে value দাও

```csharp
int[] marks = new int[5];  // 5 ঘরের array (সব 0)

marks[0] = 85;
marks[1] = 90;
marks[2] = 78;
marks[3] = 92;
marks[4] = 88;
```

### Way 2: বানানোর সময়ই value দাও

```csharp
int[] marks = new int[] { 85, 90, 78, 92, 88 };
```

### Way 3: Shortcut (সবচেয়ে বেশি use হয়)

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
```

তিনটাই same array বানায়। **Way 3** সবচেয়ে সহজ!

---

## Value রাখা ও বের করা

```csharp
marks[0] = 85;              // index 0 এ 85 রাখো
int x = marks[2];           // index 2 এর value নাও (78)
Console.WriteLine(marks[4]); // index 4 print করো (88)
```

---

## Array এর Length

`.Length` দিয়ে array তে কয়টা element আছে জানা যায়:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
Console.WriteLine(marks.Length);  // 5
```

---

## Loop দিয়ে Array Traverse — আসল Power! 🎉

### আগে (loop ছাড়া):

```csharp
Console.WriteLine(marks[0]);
Console.WriteLine(marks[1]);
Console.WriteLine(marks[2]);
Console.WriteLine(marks[3]);
Console.WriteLine(marks[4]);
```

### Loop দিয়ে:

```csharp
for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine(marks[i]);
}
```

**মাত্র 4 লাইন!** 500 জন student হলেও same code!

### Step by Step:

| Round | i | i < 5? | marks[i] | Output |
|-------|---|--------|----------|--------|
| 1 | 0 | ✅ | marks[0] | 85 |
| 2 | 1 | ✅ | marks[1] | 90 |
| 3 | 2 | ✅ | marks[2] | 78 |
| 4 | 3 | ✅ | marks[3] | 92 |
| 5 | 4 | ✅ | marks[4] | 88 |
| 6 | 5 | ❌ | — | STOP |

---

## Example: দুইটা Array একসাথে

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
int[] marks = { 85, 90, 78, 92, 88 };

for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"{names[i]}: {marks[i]} marks");
}
```

Same index এ related data — names[0] = "Rahim", marks[0] = 85।

---

## Example: Sum ও Average

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

int sum = 0;
for (int i = 0; i < marks.Length; i++)
{
    sum += marks[i];
}

double average = (double)sum / marks.Length;

Console.WriteLine($"Total: {sum}");       // 433
Console.WriteLine($"Average: {average}"); // 86.6
```

---

## Example: Maximum ও Minimum

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

int max = marks[0];
int min = marks[0];

for (int i = 1; i < marks.Length; i++)
{
    if (marks[i] > max) max = marks[i];
    if (marks[i] < min) min = marks[i];
}

Console.WriteLine($"Highest: {max}");  // 92
Console.WriteLine($"Lowest: {min}");   // 78
```

প্রথম element কে max/min ধরে বাকিদের সাথে compare।

---

## Example: User Input দিয়ে Array

```csharp
Console.Write("How many students? ");
int count = int.Parse(Console.ReadLine());

int[] marks = new int[count];

for (int i = 0; i < count; i++)
{
    Console.Write($"Student {i + 1}: ");
    marks[i] = int.Parse(Console.ReadLine());
}

Console.WriteLine("\n📋 All marks:");
for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine($"Student {i + 1}: {marks[i]}");
}
```

---

## Different Types এর Array

```csharp
// String array
string[] names = { "Rahim", "Karim", "Jabbar" };

// Double array
double[] prices = { 99.99, 149.50, 299.00 };

// Bool array
bool[] attendance = { true, true, false, true, false };
```

---

## Complete Example: Marks Analyzer 📊

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil", "Rafiq", "Shafiq", "Hanif" };
int[] marks = { 85, 90, 78, 92, 88, 45, 72, 38 };

// Display all
Console.WriteLine("📋 All Results:");
for (int i = 0; i < names.Length; i++)
    Console.WriteLine($"   {names[i]}: {marks[i]}");

// Calculate
int sum = 0;
int max = marks[0], min = marks[0];
int passCount = 0;

for (int i = 0; i < marks.Length; i++)
{
    sum += marks[i];
    if (marks[i] > max) max = marks[i];
    if (marks[i] < min) min = marks[i];
    if (marks[i] >= 40) passCount++;
}

double average = (double)sum / marks.Length;

Console.WriteLine($"\n📈 Analysis:");
Console.WriteLine($"   Total: {sum}");
Console.WriteLine($"   Average: {average:F2}");
Console.WriteLine($"   Highest: {max}");
Console.WriteLine($"   Lowest: {min}");
Console.WriteLine($"   Passed: {passCount}/{marks.Length}");
```

---

## Common Mistakes

### Mistake 1: Index 1 থেকে শুরু করা

```csharp
int[] marks = { 85, 90, 78 };

// ❌ marks[1] প্রথম element না, দ্বিতীয়!
// ❌ marks[3] নেই! Error!

// ✓ প্রথম = marks[0], শেষ = marks[2]
```

### Mistake 2: Array size এর বাইরে যাওয়া

```csharp
int[] marks = { 85, 90, 78 };  // size 3, index 0-2

marks[3];  // ❌ IndexOutOfRangeException!
```

### Mistake 3: Loop এ <= ব্যবহার

```csharp
// ❌ i <= marks.Length → i=3 তে Error!
for (int i = 0; i <= marks.Length; i++)

// ✓ i < marks.Length
for (int i = 0; i < marks.Length; i++)
```

**মনে রাখো:** Array loop এ সবসময় `<` use করো, `<=` না!

---

## Summary

| Concept | মানে |
|---------|------|
| Array | একই type এর অনেক data একসাথে |
| Index | ঘরের নম্বর (0 থেকে শুরু!) |
| Length | কয়টা element আছে |
| Traverse | Loop দিয়ে সব element ঘুরে দেখা |

**Array বানানো:** `int[] marks = { 85, 90, 78 };`

**Loop দিয়ে traverse:** `for (int i = 0; i < arr.Length; i++)`

**মনে রাখো:**
- Index **0** থেকে শুরু!
- শেষ index = **Length - 1**
- Loop এ `<` use করো, `<=` না
- `IndexOutOfRangeException` = ভুল index!

---

**পরের Lesson:** Multidimensional Arrays — 2D array, table/grid এর মতো data রাখা।

---

*CPS Academy - Learn. Code. Grow.*
