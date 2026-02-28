---
title: "Lesson 4.4: Nested Loops ও Pattern Printing"
date: "2026-03-16"
excerpt: "Nested loop কী ও কেন দরকার, outer vs inner loop, execution flow, pattern printing (rectangle, triangle, inverted, number), 3-level nesting, এবং common mistakes"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - loops
  - while
  - for
  - iteration
draft: false
---


> **এই Lesson এ শিখবে:** Nested loop কী ও কেন দরকার, outer vs inner loop, execution flow, pattern printing (rectangle, triangle, inverted, number), 3-level nesting, এবং common mistakes।

---

## Nested Loop কী?

Loop এর ভিতরে আরেকটা loop বসানো — এটাই **Nested Loop**।

ধরো একটা classroom এ **3 টা row** আছে, প্রতি row তে **4 জন student**:

```
Row 1:  👤 👤 👤 👤
Row 2:  👤 👤 👤 👤
Row 3:  👤 👤 👤 👤
```

Teacher roll call করবে:

```
Row 1 → Student 1, 2, 3, 4 ডাকো
Row 2 → Student 1, 2, 3, 4 ডাকো
Row 3 → Student 1, 2, 3, 4 ডাকো
```

এখানে দুইটা কাজ হচ্ছে:
- **Outer Loop:** Row 1, 2, 3 এ যাওয়া (3 বার)
- **Inner Loop:** প্রতি Row তে Student 1, 2, 3, 4 ডাকা (4 বার)

---

## Code এ লিখি

```csharp
for (int row = 1; row <= 3; row++)
{
    Console.WriteLine($"Row {row}:");

    for (int student = 1; student <= 4; student++)
    {
        Console.WriteLine($"  Student {student} - Present!");
    }

    Console.WriteLine();
}
```

Output:
```
Row 1:
  Student 1 - Present!
  Student 2 - Present!
  Student 3 - Present!
  Student 4 - Present!

Row 2:
  Student 1 - Present!
  ...
```

**মোট কতবার?** Outer × Inner = 3 × 4 = **12 বার** student call!

---

## Important Rule 🎯

**Outer Loop একবার চললে, Inner Loop পুরোটা চলে।**

- row = 1 → student = 1, 2, 3, 4 পুরোটা
- row = 2 → **আবার** student = 1, 2, 3, 4 পুরোটা
- row = 3 → **আবার** student = 1, 2, 3, 4 পুরোটা

Inner loop প্রতিবার **1 থেকে fresh শুরু** করে!

---

## Step by Step Execution

ছোট example — 2 row, 3 student:

```csharp
for (int row = 1; row <= 2; row++)
{
    for (int student = 1; student <= 3; student++)
    {
        Console.WriteLine($"Row {row}, Student {student}");
    }
}
```

| Outer (row) | Inner (student) | Output |
|-------------|-----------------|--------|
| 1 | 1 | Row 1, Student 1 |
| 1 | 2 | Row 1, Student 2 |
| 1 | 3 | Row 1, Student 3 |
| 2 | 1 | Row 2, Student 1 |
| 2 | 2 | Row 2, Student 2 |
| 2 | 3 | Row 2, Student 3 |

মোট: 2 × 3 = **6 বার**

---

## Pattern 1: Rectangle ★

3 row, 5 column এর star rectangle:

```
★ ★ ★ ★ ★
★ ★ ★ ★ ★
★ ★ ★ ★ ★
```

```csharp
int rows = 3;
int cols = 5;

for (int i = 1; i <= rows; i++)
{
    for (int j = 1; j <= cols; j++)
    {
        Console.Write("★ ");
    }
    Console.WriteLine();  // Row শেষে new line
}
```

**লক্ষ্য করো:**
- Inner loop এ `Console.Write()` — same line এ print
- Inner loop শেষে `Console.WriteLine()` — new line

---

## Pattern 2: Right Triangle ★

```
★
★ ★
★ ★ ★
★ ★ ★ ★
★ ★ ★ ★ ★
```

Row 1 এ 1 টা star, Row 2 এ 2 টা, Row 3 এ 3 টা... Row number = Star সংখ্যা!

```csharp
int rows = 5;

for (int i = 1; i <= rows; i++)
{
    for (int j = 1; j <= i; j++)  // j <= i !
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}
```

**Key:** Inner loop condition `j <= i` — i বাড়লে star ও বাড়ে:
- i=1 → j চলে 1 বার
- i=2 → j চলে 2 বার
- i=3 → j চলে 3 বার

---

## Pattern 3: Number Triangle

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

```csharp
int rows = 5;

for (int i = 1; i <= rows; i++)
{
    for (int j = 1; j <= i; j++)
    {
        Console.Write(j + " ");  // j print করছি, i না
    }
    Console.WriteLine();
}
```

---

## Pattern 4: Inverted Triangle

```
★ ★ ★ ★ ★
★ ★ ★ ★
★ ★ ★
★ ★
★
```

Row বাড়লে Star কমে। Star সংখ্যা = `rows - i + 1`

```csharp
int rows = 5;

for (int i = 1; i <= rows; i++)
{
    for (int j = 1; j <= rows - i + 1; j++)
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}
```

---

## Pattern 5: Number Grid

```
1   2   3   4
5   6   7   8
9   10  11  12
```

```csharp
int number = 1;

for (int row = 1; row <= 3; row++)
{
    for (int col = 1; col <= 4; col++)
    {
        Console.Write(number + "\t");
        number++;
    }
    Console.WriteLine();
}
```

`number` variable 1 থেকে শুরু, প্রতিবার `number++` করায় sequence maintain হচ্ছে।

---

## Pattern Tips — Quick Reference

| Pattern | Inner condition | ব্যাখ্যা |
|---------|----------------|----------|
| Rectangle | `j <= cols` | fixed সংখ্যা |
| Right Triangle | `j <= i` | row এর সাথে বাড়ে |
| Inverted Triangle | `j <= rows - i + 1` | row এর সাথে কমে |
| Number Triangle | `j <= i`, print `j` | j print করো |

---

## Multiplication Table (Nested Loop)

1 থেকে 5 এর নামতা একসাথে:

```csharp
Console.WriteLine("📊 MULTIPLICATION TABLE (1-5)\n");

// Header
Console.Write("    ");
for (int i = 1; i <= 10; i++)
    Console.Write($"{i,4}");
Console.WriteLine("\n    ──────────────────────────────────");

// Body
for (int num = 1; num <= 5; num++)
{
    Console.Write($"{num} × ");
    for (int i = 1; i <= 10; i++)
    {
        Console.Write($"{num * i,4}");
    }
    Console.WriteLine();
}
```

Output:
```
       1   2   3   4   5   6   7   8   9  10
    ──────────────────────────────────
1 ×    1   2   3   4   5   6   7   8   9  10
2 ×    2   4   6   8  10  12  14  16  18  20
3 ×    3   6   9  12  15  18  21  24  27  30
4 ×    4   8  12  16  20  24  28  32  36  40
5 ×    5  10  15  20  25  30  35  40  45  50
```

---

## while দিয়েও Nested Loop হয়

```csharp
int row = 1;
while (row <= 3)
{
    int col = 1;
    while (col <= 4)
    {
        Console.Write("★ ");
        col++;
    }
    Console.WriteLine();
    row++;
}
```

তবে pattern printing এ for loop বেশি use হয় — কারণ count জানা থাকে।

---

## 3 Level Nested Loop

Loop এর ভিতর loop এর ভিতর আরেকটা loop!

### School → Class → Student

```csharp
for (int cls = 1; cls <= 2; cls++)
{
    Console.WriteLine($"📚 Class {cls}:");

    for (int section = 1; section <= 2; section++)
    {
        Console.WriteLine($"  📁 Section {section}:");

        for (int student = 1; student <= 3; student++)
        {
            Console.WriteLine($"    👤 Student {student}");
        }
    }
    Console.WriteLine();
}
```

Output:
```
📚 Class 1:
  📁 Section 1:
    👤 Student 1
    👤 Student 2
    👤 Student 3
  📁 Section 2:
    👤 Student 1
    👤 Student 2
    👤 Student 3

📚 Class 2:
  ...
```

**মোট:** 2 × 2 × 3 = **12 বার** Student print!

### Building → Floor → Room

```csharp
for (int floor = 1; floor <= 2; floor++)
{
    Console.WriteLine($"🏢 Floor {floor}:");

    for (int room = 1; room <= 3; room++)
    {
        Console.WriteLine($"  🚪 Room {room}:");

        for (int light = 1; light <= 2; light++)
        {
            Console.WriteLine($"    💡 Light {light} - ON");
        }
    }
    Console.WriteLine();
}
```

---

## কয় Level পর্যন্ত Nest করা যায়?

যত খুশি! তবে practical এ:

| Levels | Use Case |
|--------|----------|
| 2 | সবচেয়ে common (row × column) |
| 3 | 3D data, hierarchical data |
| 4+ | Rare, complex problems |

**Tip:** 3 এর বেশি হলে code পড়তে কষ্ট হয়। তখন function বানানো better (পরে শিখবো)।

### Variable Naming Convention:

```csharp
// Generic names
for (int i ...)      // Level 1
    for (int j ...)  // Level 2
        for (int k ...)  // Level 3

// Meaningful names (better!)
for (int floor ...)
    for (int room ...)
        for (int light ...)
```

---

## Complete Example: Pattern Menu ⭐

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║       ⭐ PATTERN PRINTER              ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

Console.WriteLine("1. Rectangle");
Console.WriteLine("2. Right Triangle");
Console.WriteLine("3. Inverted Triangle");
Console.WriteLine("4. Number Triangle");

Console.Write("\nSelect pattern (1-4): ");
int choice = int.Parse(Console.ReadLine());

Console.Write("Enter rows: ");
int rows = int.Parse(Console.ReadLine());
Console.WriteLine();

switch (choice)
{
    case 1:  // Rectangle
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= rows; j++)
                Console.Write("★ ");
            Console.WriteLine();
        }
        break;

    case 2:  // Right Triangle
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= i; j++)
                Console.Write("★ ");
            Console.WriteLine();
        }
        break;

    case 3:  // Inverted Triangle
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= rows - i + 1; j++)
                Console.Write("★ ");
            Console.WriteLine();
        }
        break;

    case 4:  // Number Triangle
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= i; j++)
                Console.Write(j + " ");
            Console.WriteLine();
        }
        break;

    default:
        Console.WriteLine("Invalid choice!");
        break;
}
```

---

## Common Mistakes

### Mistake 1: Inner ও Outer এ same variable

```csharp
// ❌ দুই loop এই i!
for (int i = 1; i <= 3; i++)
{
    for (int i = 1; i <= 4; i++)  // Error!
    {
        Console.Write("★ ");
    }
}

// ✓ আলাদা variable — i, j
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 4; j++)
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}
```

### Mistake 2: WriteLine() এর জায়গা ভুল

```csharp
// ❌ inner loop এর ভিতরে — প্রতি star এ new line!
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 4; j++)
    {
        Console.Write("★ ");
        Console.WriteLine();  // ভুল জায়গায়!
    }
}

// ✓ inner loop এর বাইরে — row শেষে new line
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 4; j++)
    {
        Console.Write("★ ");
    }
    Console.WriteLine();  // এখানে!
}
```

### Mistake 3: Triangle এ fixed condition

```csharp
// ❌ j <= 5 (fixed) → Rectangle হবে!
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= 5; j++)
        Console.Write("★ ");
    Console.WriteLine();
}

// ✓ j <= i → Triangle!
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= i; j++)
        Console.Write("★ ");
    Console.WriteLine();
}
```

---

## Summary

| Concept | মানে |
|---------|------|
| Nested Loop | Loop এর ভিতর Loop |
| Outer Loop | বাইরের Loop (row) |
| Inner Loop | ভিতরের Loop (column) |
| Total iterations | Outer × Inner |

**Nested Loop Structure:**
```csharp
for (int i = 1; i <= rows; i++)       // Outer
{
    for (int j = 1; j <= cols; j++)   // Inner
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}
```

**মনে রাখো:**
- Outer একবার চললে Inner পুরোটা চলে
- আলাদা variable use করো (i, j, k)
- `Console.Write()` = same line, `Console.WriteLine()` = new line
- Rectangle: `j <= cols`, Triangle: `j <= i`, Inverted: `j <= rows-i+1`

---

**Module 4 Complete!** 🎉 পরের Module: Arrays — অনেকগুলো data একসাথে রাখা।

---

*CPS Academy - Learn. Code. Grow.*
