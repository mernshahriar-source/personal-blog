---
title: "Lesson 5.6: Nested Loops ও Patterns — Loop এর ভিতরে Loop"
date: "2026-05-12"
excerpt: "Nested loop এর classroom analogy, Rectangle, Number Grid, Multiplication Grid, Right Triangle এবং Inverted Triangle patterns"
categories:
  - C# Course Scripts
tags:
  - csharp
  - nested-loops
  - patterns
  - loops
draft: false
---

# Lesson 5.6: Nested Loops ও Patterns — Loop এর ভিতরে Loop

> **এই Lesson এ শিখবে:** Nested loop কী, Classroom roll call analogy, Outer ও Inner loop, Code explanation, Step by step execution, Rectangle pattern, Number grid, Multiplication table grid, Right Triangle, Number Triangle, Inverted Triangle, Star patterns, এবং Common Mistakes।

---

## আগের Lessons এ কী শিখলাম?

- **for loop** — কতবার জানলে
- **while loop** — শর্ত দেখে
- **do-while** — অন্তত ১ বার

এবার শিখবো — **Nested Loop**!

**Nested** মানে "একটার ভিতরে আরেকটা"। মানে **Loop এর ভিতরে আরেকটা Loop!**

---

## গল্প দিয়ে শুরু করি

ধরো তুমি একটা classroom এ আছো।

Classroom এ **3 টা row** আছে, প্রতি row তে **4 জন student** আছে।

```
Row 1:  👤 👤 👤 👤
Row 2:  👤 👤 👤 👤
Row 3:  👤 👤 👤 👤
```

এখন teacher roll call করবে। Teacher কীভাবে করবে?

---

## Teacher এর Brain কীভাবে কাজ করে?

```
Row 1 এ যাও:
    Student 1 - "Present!"
    Student 2 - "Present!"
    Student 3 - "Present!"
    Student 4 - "Present!"
    (Row 1 শেষ)

Row 2 এ যাও:
    Student 1 - "Present!"
    Student 2 - "Present!"
    Student 3 - "Present!"
    Student 4 - "Present!"
    (Row 2 শেষ)

Row 3 এ যাও:
    Student 1 - "Present!"
    Student 2 - "Present!"
    Student 3 - "Present!"
    Student 4 - "Present!"
    (Row 3 শেষ)

Roll call complete!
```

দেখো কী হচ্ছে:

- **বাইরের কাজ:** Row 1, 2, 3 এ যাওয়া (3 বার)
- **ভিতরের কাজ:** প্রতি Row তে 1, 2, 3, 4 ডাকা (4 বার)

**এটাই Nested Loop!**

- **Outer Loop:** Row গুলোর জন্য (3 বার)
- **Inner Loop:** প্রতি row তে student দের জন্য (4 বার)

---

## Code এ লিখি

```csharp
for (int row = 1; row <= 3; row++)           // Outer loop
{
    Console.WriteLine($"Row {row}:");

    for (int student = 1; student <= 4; student++)  // Inner loop
    {
        Console.WriteLine($"  Student {student} - Present!");
    }

    Console.WriteLine();
}

Console.WriteLine("Roll call complete!");
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
  Student 2 - Present!
  Student 3 - Present!
  Student 4 - Present!

Row 3:
  Student 1 - Present!
  Student 2 - Present!
  Student 3 - Present!
  Student 4 - Present!

Roll call complete!
```

---

## Code টা বুঝি

### Outer Loop (বাইরের):

```csharp
for (int row = 1; row <= 3; row++)
```

**3 বার চলবে** — Row 1, Row 2, Row 3 এর জন্য।

### Inner Loop (ভিতরের):

```csharp
for (int student = 1; student <= 4; student++)
```

**প্রতিটা Row এর জন্য 4 বার** চলবে।

### মোট কতবার চলবে?

**Outer × Inner = Total**

3 × 4 = **12 বার** student call হবে!

---

## Step by Step Execution

ছোট করে দেখি — 2 টা row, 3 জন student:

```csharp
for (int row = 1; row <= 2; row++)
{
    for (int student = 1; student <= 3; student++)
    {
        Console.WriteLine($"Row {row}, Student {student}");
    }
}
```

### কী হচ্ছে:

```
🔄 Outer: row = 1
    │
    ├── 🔄 Inner: student = 1
    │       Print: Row 1, Student 1
    │
    ├── 🔄 Inner: student = 2
    │       Print: Row 1, Student 2
    │
    ├── 🔄 Inner: student = 3
    │       Print: Row 1, Student 3
    │
    └── Inner শেষ (student = 4, false)

🔄 Outer: row = 2
    │
    ├── 🔄 Inner: student = 1  (আবার 1 থেকে শুরু!)
    │       Print: Row 2, Student 1
    │
    ├── 🔄 Inner: student = 2
    │       Print: Row 2, Student 2
    │
    ├── 🔄 Inner: student = 3
    │       Print: Row 2, Student 3
    │
    └── Inner শেষ

Outer শেষ
```

### Table আকারে:

| Outer (row) | Inner (student) | Output |
|-------------|-----------------|--------|
| 1 | 1 | Row 1, Student 1 |
| 1 | 2 | Row 1, Student 2 |
| 1 | 3 | Row 1, Student 3 |
| 2 | 1 | Row 2, Student 1 |
| 2 | 2 | Row 2, Student 2 |
| 2 | 3 | Row 2, Student 3 |

**মোট:** 2 × 3 = 6 বার print হলো!

---

## Important Point! 🎯

**Outer Loop একবার চললে, Inner Loop পুরোটা চলে।**

মানে:
- row = 1 হলে → student = 1, 2, 3 পুরোটা চলবে
- তারপর row = 2 হলে → আবার student = 1, 2, 3 পুরোটা চলবে

**Inner loop প্রতিবার শুরু থেকে চালু হয়!**

---

## Real Example 1: Rectangle Pattern ▮

Star দিয়ে একটা rectangle:

```csharp
int rows = 4;
int cols = 6;

for (int i = 1; i <= rows; i++)          // Outer: rows
{
    for (int j = 1; j <= cols; j++)       // Inner: cols
    {
        Console.Write("* ");
    }
    Console.WriteLine();                  // Row শেষে new line
}
```

Output:
```
* * * * * *
* * * * * *
* * * * * *
* * * * * *
```

### কী হচ্ছে?

- Outer loop: **প্রতিটা row**
- Inner loop: **ঐ row তে সব cols**
- `Console.Write` একই line এ print করে
- `Console.WriteLine()` new line এ নিয়ে যায়

---

## Real Example 2: Number Grid

```csharp
for (int i = 1; i <= 4; i++)
{
    for (int j = 1; j <= 5; j++)
    {
        Console.Write($"{j} ");
    }
    Console.WriteLine();
}
```

Output:
```
1 2 3 4 5
1 2 3 4 5
1 2 3 4 5
1 2 3 4 5
```

---

## Real Example 3: Multiplication Table Grid

সব row তে সেই row এর number কে গুণ:

```csharp
Console.WriteLine("Multiplication Table:\n");

for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= 5; j++)
    {
        int product = i * j;
        Console.Write($"{product,4}");
    }
    Console.WriteLine();
}
```

Output:
```
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
```

**`,4` দিয়ে alignment** — সুন্দর look দেওয়ার জন্য।

---

## Pattern Printing: Right Triangle ◣

এইখানে inner loop এর **condition outer এর variable এর উপর** নির্ভর করে!

```csharp
int rows = 5;

for (int i = 1; i <= rows; i++)
{
    for (int j = 1; j <= i; j++)  // j <= i!
    {
        Console.Write("* ");
    }
    Console.WriteLine();
}
```

Output:
```
*
* *
* * *
* * * *
* * * * *
```

### কেন এটা হলো?

**`j <= i` এটাই trick!**

- i=1 হলে: j=1 চলবে (1 টা star)
- i=2 হলে: j=1,2 চলবে (2 টা star)
- i=3 হলে: j=1,2,3 চলবে (3 টা star)
- i=5 হলে: j=1,2,3,4,5 চলবে (5 টা star)

---

## Number Triangle

Star এর বদলে number:

```csharp
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= i; j++)
    {
        Console.Write($"{j} ");
    }
    Console.WriteLine();
}
```

Output:
```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

---

## Inverted Triangle ◥

উল্টা triangle — Outer loop কে **উল্টা** চালাই:

```csharp
for (int i = 5; i >= 1; i--)         // 5 থেকে 1
{
    for (int j = 1; j <= i; j++)
    {
        Console.Write("* ");
    }
    Console.WriteLine();
}
```

Output:
```
* * * * *
* * * *
* * *
* *
*
```

---

## while দিয়েও Nested Loop হয়

যেকোনো loop এর ভিতরে যেকোনো loop রাখা যায়:

```csharp
int i = 1;
while (i <= 3)
{
    int j = 1;
    while (j <= 3)
    {
        Console.Write($"({i},{j}) ");
        j++;
    }
    Console.WriteLine();
    i++;
}
```

Output:
```
(1,1) (1,2) (1,3)
(2,1) (2,2) (2,3)
(3,1) (3,2) (3,3)
```

কিন্তু **pattern এ for loop বেশি use হয়** — কারণ structure ছোট।

---

## Common Mistakes

### ❌ Mistake 1: Same variable name

```csharp
for (int i = 1; i <= 3; i++)
{
    for (int i = 1; i <= 5; i++)  // ❌ দুইটাই i! Error!
    {
        // ...
    }
}

// ✅ আলাদা নাম
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 5; j++)  // ✅
    {
        // ...
    }
}
```

### ❌ Mistake 2: Console.Write vs Console.WriteLine

```csharp
// ❌ WriteLine use করলে pattern ভেঙে যাবে
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        Console.WriteLine("* ");  // প্রতি star নতুন line এ!
    }
}

// ✅ Pattern এর জন্য:
// - Inner loop এ Write (same line)
// - Row শেষে WriteLine (new line)
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        Console.Write("* ");  // ✅ same line
    }
    Console.WriteLine();       // ✅ row শেষে new line
}
```

### ❌ Mistake 3: Inner loop এর condition ভুল

```csharp
// Right triangle করতে চাই, কিন্তু ভুল!
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= 5; j++)  // ❌ সব row তে 5 টা star!
    {
        Console.Write("* ");
    }
    Console.WriteLine();
}
// Output: 5×5 rectangle, triangle না!

// ✅ j <= i দাও
for (int j = 1; j <= i; j++)  // ✅
```

### ❌ Mistake 4: বেশি Nested

```csharp
// ❌ 4 level nested — complex, slow!
for (int a...)
    for (int b...)
        for (int c...)
            for (int d...)
                // ...
```

**Rule: 2 level OK, 3 level মাঝে মাঝে, 4+ avoid করো।**

---

## Summary

**Nested Loop:**
```csharp
for (outer)
{
    for (inner)
    {
        // কাজ
    }
}
```

- Outer loop একবার চললে, Inner loop **পুরোটা** চলে
- মোট iterations = **outer × inner**

**Pattern Tips:**
- **Rectangle:** `j <= cols` (fixed)
- **Right Triangle:** `j <= i` (outer দিয়ে control)
- **Inverted Triangle:** Outer কে উল্টা চালাও (`i--`)
- **Console.Write** same line, **WriteLine** new line

**মনে রাখো:**
- Outer ও Inner এ **আলাদা variable name**
- Pattern এ Write + WriteLine এর balance দরকার
- 2 level পর্যন্ত normal, বেশি হলে rethink

---

**পরের Lesson:** Practice & Assignments — সব loops মিলিয়ে real programs!

---

*CPS Academy - Learn. Code. Grow.*
