---
title: "Lesson 5.4: Array Methods — Built-in সুবিধা"
date: "2026-03-20"
excerpt: "Array.Sort(), Reverse(), IndexOf(), LastIndexOf(), Copy(), Clear(), Resize(), Exists(), Find(), FindAll(), Lambda expression basics, এবং Sort+Reverse trick"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - arrays
  - data-structures
draft: false
---


> **এই Lesson এ শিখবে:** Array.Sort(), Reverse(), IndexOf(), LastIndexOf(), Copy(), Clear(), Resize(), Exists(), Find(), FindAll(), Lambda expression basics, এবং Sort+Reverse trick।

---

## Built-in Methods কী?

C# তে Array class এ অনেক method আগে থেকেই তৈরি আছে। তুমি শুধু call করবে:

```csharp
Array.MethodName(arrayName);
```

100 টা number sort করতে নিজে code লিখলে অনেক line লাগবে — কিন্তু built-in method এ **এক line!**

---

## Array.Sort() — ছোট থেকে বড়

### Numbers:

```csharp
int[] numbers = { 64, 25, 12, 89, 33 };

Array.Sort(numbers);

foreach (int n in numbers)
    Console.Write(n + " ");
// Output: 12 25 33 64 89
```

### Strings (Alphabetical):

```csharp
string[] names = { "Zahir", "Rahim", "Karim", "Abdul" };

Array.Sort(names);

foreach (string name in names)
    Console.Write(name + " ");
// Output: Abdul Karim Rahim Zahir
```

**⚠️ Sort() original array কে change করে!** Original রাখতে চাইলে আগে Copy করো।

---

## Array.Reverse() — উল্টানো

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

Array.Reverse(numbers);

foreach (int n in numbers)
    Console.Write(n + " ");
// Output: 5 4 3 2 1
```

### Sort + Reverse = বড় থেকে ছোট (Descending)! 🎉

```csharp
int[] marks = { 78, 92, 45, 88, 65 };

Array.Sort(marks);      // ছোট → বড়: 45 65 78 88 92
Array.Reverse(marks);   // উল্টাও:    92 88 78 65 45
```

```
Sort()              →  Ascending (ছোট → বড়)
Reverse()           →  উল্টানো
Sort() + Reverse()  →  Descending (বড় → ছোট)
```

---

## Array.IndexOf() — কোন Index এ আছে?

```csharp
string[] fruits = { "Apple", "Banana", "Mango", "Orange" };

int index = Array.IndexOf(fruits, "Mango");
Console.WriteLine(index);  // 2

index = Array.IndexOf(fruits, "Pineapple");
Console.WriteLine(index);  // -1 (নেই!)
```

- পেলে → **index number** return করে
- না পেলে → **-1** return করে

### Check করা: আছে কিনা

```csharp
string searchName = "Karim";
int pos = Array.IndexOf(students, searchName);

if (pos != -1)
    Console.WriteLine($"✅ Found at position {pos + 1}");
else
    Console.WriteLine("❌ Not found");
```

---

## Array.LastIndexOf() — শেষ Occurrence

একই element একাধিকবার থাকলে:

```csharp
int[] numbers = { 10, 25, 30, 45, 50, 30, 60 };

int first = Array.IndexOf(numbers, 30);      // 2
int last = Array.LastIndexOf(numbers, 30);    // 5
```

```
┌────┬────┬────┬────┬────┬────┬────┐
│ 10 │ 25 │ 30 │ 45 │ 50 │ 30 │ 60 │
└────┴────┴────┴────┴────┴────┴────┘
              ↑                 ↑
           First(2)          Last(5)
```

---

## Array.Copy() — Copy করা

```csharp
Array.Copy(source, destination, howMany);
```

```csharp
int[] source = { 10, 20, 30, 40, 50 };
int[] dest = new int[5];

Array.Copy(source, dest, 5);  // সব 5 টা copy
```

### Original রেখে Sort করা (Trick):

```csharp
int[] original = { 64, 25, 12, 89, 33 };
int[] sorted = new int[original.Length];

Array.Copy(original, sorted, original.Length);
Array.Sort(sorted);

// original unchanged: 64 25 12 89 33
// sorted: 12 25 33 64 89
```

---

## Array.Clear() — মুছে ফেলা (Default করা)

```csharp
Array.Clear(array, startIndex, count);
```

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

Array.Clear(numbers, 1, 3);  // index 1 থেকে 3 টা clear

// Result: 10 0 0 0 50
```

Default values: `int` → 0, `string` → null, `bool` → false

---

## Array.Resize() — Size বদলানো

```csharp
int[] numbers = { 10, 20, 30 };

Array.Resize(ref numbers, 5);  // 3 → 5
// Result: 10 20 30 0 0  (নতুন ঘরে 0)

Array.Resize(ref numbers, 2);  // 5 → 2
// Result: 10 20  (বাকিগুলো হারিয়ে গেছে!)
```

**⚠️ `ref` keyword দিতে হয়!**

**⚠️ Resize আসলে নতুন array বানিয়ে copy করে — বারবার করলে slow।** Dynamic size দরকার হলে **List** better (পরে শিখবো)।

---

## Lambda Expression — `=>` কী জিনিস?

এবারের কিছু methods এ এরকম দেখবে:

```csharp
mark => mark < 40
```

এটাকে বলে **Lambda Expression**। মানে: "mark নাও, check করো mark < 40 কিনা"।

`=>` কে পড়ো **"goes to"** বা **"এটা নিয়ে এটা করো"**।

| Lambda | মানে |
|--------|------|
| `x => x > 10` | x 10 এর বেশি কিনা |
| `x => x < 40` | x 40 এর কম কিনা |
| `s => s == "Rahim"` | s "Rahim" কিনা |
| `s => s.Length > 5` | s এর length 5 এর বেশি কিনা |

এখন detail না বুঝলেও চলবে — শুধু pattern টা মনে রাখো!

---

## Array.Exists() — Condition Match আছে কিনা

```csharp
int[] marks = { 85, 92, 45, 78, 33 };

bool hasFailed = Array.Exists(marks, m => m < 40);
Console.WriteLine($"কেউ fail করেছে? {hasFailed}");  // True
```

Return করে **true** বা **false**।

---

## Array.Find() — প্রথম Match Element

```csharp
int[] marks = { 85, 92, 45, 78, 33 };

int firstFail = Array.Find(marks, m => m < 40);
Console.WriteLine($"First fail marks: {firstFail}");  // 33
```

---

## Array.FindAll() — সব Match Elements

```csharp
int[] marks = { 85, 92, 45, 78, 33 };

int[] failedMarks = Array.FindAll(marks, m => m < 40);

Console.WriteLine("Failed marks:");
foreach (int m in failedMarks)
    Console.Write(m + " ");
// Output: 33
```

**FindAll() নতুন array return করে** যেখানে শুধু matched elements থাকে।

---

## Array.FindIndex() — Match এর Index

```csharp
int[] marks = { 85, 92, 45, 78, 33 };

int idx = Array.FindIndex(marks, m => m < 40);
Console.WriteLine($"First fail at index: {idx}");  // 4
```

---

## Complete Example: Student Report Card 📊

```csharp
string[] students = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
int[] marks = { 85, 92, 38, 78, 45 };

Console.WriteLine("📊 REPORT CARD\n");

// Sort by marks (descending) — copy first!
int[] sortedMarks = new int[marks.Length];
string[] sortedNames = new string[students.Length];
Array.Copy(marks, sortedMarks, marks.Length);
Array.Copy(students, sortedNames, students.Length);
Array.Sort(sortedMarks, sortedNames);
Array.Reverse(sortedMarks);
Array.Reverse(sortedNames);

Console.WriteLine("Rank | Name    | Marks");
Console.WriteLine("─────┼─────────┼──────");
for (int i = 0; i < sortedNames.Length; i++)
{
    Console.WriteLine($"  {i + 1}  | {sortedNames[i],-7} | {sortedMarks[i]}");
}

// Stats
bool anyFailed = Array.Exists(marks, m => m < 40);
int[] failMarks = Array.FindAll(marks, m => m < 40);

Console.WriteLine($"\nFail আছে? {(anyFailed ? "হ্যাঁ" : "না")}");
if (anyFailed)
{
    int failIdx = Array.FindIndex(marks, m => m < 40);
    Console.WriteLine($"প্রথম fail: {students[failIdx]} ({marks[failIdx]} marks)");
}
```

---

## All Methods — Quick Reference

| Method | কাজ | Returns |
|--------|-----|---------|
| `Array.Sort(arr)` | ছোট→বড় সাজানো | void |
| `Array.Reverse(arr)` | উল্টানো | void |
| `Array.IndexOf(arr, item)` | প্রথম index | int (-1 = নেই) |
| `Array.LastIndexOf(arr, item)` | শেষ index | int (-1 = নেই) |
| `Array.Copy(src, dest, n)` | Copy করা | void |
| `Array.Clear(arr, start, n)` | Default করা | void |
| `Array.Resize(ref arr, size)` | Size বদলানো | void |
| `Array.Exists(arr, cond)` | Match আছে কিনা | bool |
| `Array.Find(arr, cond)` | প্রথম match | element |
| `Array.FindAll(arr, cond)` | সব match | new array |
| `Array.FindIndex(arr, cond)` | প্রথম match index | int |

---

## Summary

**মনে রাখো:**
- `Sort() + Reverse()` = Descending (বড় → ছোট)
- `IndexOf() returns -1` = element নেই
- `Copy()` করো original রাখতে চাইলে
- Lambda: `x => condition` format
- Array এর size fixed — truly dynamic এর জন্য **List** দরকার (পরে শিখবো)

---

**Module 5 Complete!** 🎉 পরের Module: Methods — নিজের function বানানো!

---

*CPS Academy - Learn. Code. Grow.*
