---
title: 'Part 19: Nested Loops'
date: '2026-01-20'
excerpt: 'Part 19: Nested Loops - loop এর ভিতর loop'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - loops
  - tutorial
draft: false
---

# Part 19: Nested Loops

এতক্ষণ আমরা একটা loop use করেছি। কিন্তু জানো, loop এর ভিতরে আরেকটা loop ও বসানো যায়!

এটাকে বলে **Nested Loop** - মানে এক loop এর ভিতর আরেক loop।

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

- **বাইরের কাজ:** Row 1, Row 2, Row 3 এ যাওয়া (3 বার)
- **ভিতরের কাজ:** প্রতি Row তে Student 1, 2, 3, 4 ডাকা (4 বার)

এটাই Nested Loop!

- **Outer Loop:** Row গুলোর জন্য (3 বার চলবে)
- **Inner Loop:** Student দের জন্য (প্রতি row তে 4 বার চলবে)

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
    
    Console.WriteLine();  // Row এর পর blank line
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

### Outer Loop (বাইরের Loop):

```csharp
for (int row = 1; row <= 3; row++)
```

এটা 3 বার চলবে - Row 1, Row 2, Row 3 এর জন্য।

### Inner Loop (ভিতরের Loop):

```csharp
for (int student = 1; student <= 4; student++)
```

এটা প্রতিটা Row এর জন্য 4 বার চলবে।

### মোট কতবার চলবে?

**Outer Loop × Inner Loop = Total**

3 × 4 = **12 বার** student call হবে!

---

## Step by Step Execution

ছোট করে দেখি - 2 টা row, 3 জন student:

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
🔄 Outer Loop: row = 1
    │
    ├── 🔄 Inner Loop: student = 1
    │       Print: Row 1, Student 1
    │
    ├── 🔄 Inner Loop: student = 2
    │       Print: Row 1, Student 2
    │
    ├── 🔄 Inner Loop: student = 3
    │       Print: Row 1, Student 3
    │
    └── Inner Loop শেষ (student = 4, condition false)

🔄 Outer Loop: row = 2
    │
    ├── 🔄 Inner Loop: student = 1  (আবার 1 থেকে শুরু!)
    │       Print: Row 2, Student 1
    │
    ├── 🔄 Inner Loop: student = 2
    │       Print: Row 2, Student 2
    │
    ├── 🔄 Inner Loop: student = 3
    │       Print: Row 2, Student 3
    │
    └── Inner Loop শেষ

Outer Loop শেষ (row = 3, condition false)
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
- row = 1 হলে → student = 1, 2, 3, 4 পুরোটা চলবে
- তারপর row = 2 হলে → আবার student = 1, 2, 3, 4 পুরোটা চলবে
- তারপর row = 3 হলে → আবার student = 1, 2, 3, 4 পুরোটা চলবে

Inner loop প্রতিবার 1 থেকে fresh শুরু করে!

---

## Real Example 1: Rectangle Pattern

এবার মজার কাজ করি! Star দিয়ে rectangle বানাই।

3 টা row, প্রতি row তে 5 টা star:

```
★ ★ ★ ★ ★
★ ★ ★ ★ ★
★ ★ ★ ★ ★
```

### Brain কীভাবে ভাববে:

```
Row 1: 5 টা star print করো, তারপর new line
Row 2: 5 টা star print করো, তারপর new line
Row 3: 5 টা star print করো, তারপর new line
```

### Code:

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

Output:
```
★ ★ ★ ★ ★ 
★ ★ ★ ★ ★ 
★ ★ ★ ★ ★ 
```

### লক্ষ্য করো:

- Inner loop এ `Console.Write()` use করছি (same line এ print)
- Inner loop শেষে `Console.WriteLine()` দিয়ে new line

---

## Real Example 2: Number Grid

1 থেকে 12 পর্যন্ত number, 3 টা row তে 4 টা করে:

```
1  2  3  4
5  6  7  8
9  10 11 12
```

### Code:

```csharp
int number = 1;

for (int row = 1; row <= 3; row++)
{
    for (int col = 1; col <= 4; col++)
    {
        Console.Write(number + "\t");  // \t = tab space
        number++;
    }
    Console.WriteLine();
}
```

Output:
```
1	2	3	4	
5	6	7	8	
9	10	11	12	
```

### কী করলাম:

- `number` variable 1 থেকে শুরু করলাম
- প্রতিবার print করে `number++` করছি
- তাই sequence maintain হচ্ছে: 1, 2, 3, 4, 5...

---

## Real Example 3: Multiplication Table

এবার 1 থেকে 5 এর multiplication table একসাথে দেখাই:

```csharp
Console.WriteLine("   📊 MULTIPLICATION TABLE (1-5)\n");

// Header row
Console.Write("    ");
for (int i = 1; i <= 10; i++)
{
    Console.Write($"{i,4}");
}
Console.WriteLine("\n    ────────────────────────────────────");

// Table body
for (int num = 1; num <= 5; num++)
{
    Console.Write($"{num} × ");
    
    for (int i = 1; i <= 10; i++)
    {
        int result = num * i;
        Console.Write($"{result,4}");
    }
    Console.WriteLine();
}
```

Output:
```
   📊 MULTIPLICATION TABLE (1-5)

       1   2   3   4   5   6   7   8   9  10
    ────────────────────────────────────
1 ×    1   2   3   4   5   6   7   8   9  10
2 ×    2   4   6   8  10  12  14  16  18  20
3 ×    3   6   9  12  15  18  21  24  27  30
4 ×    4   8  12  16  20  24  28  32  36  40
5 ×    5  10  15  20  25  30  35  40  45  50
```

---

## Pattern Printing: Right Triangle

এবার মজার pattern বানাই! Star দিয়ে triangle:

```
★
★ ★
★ ★ ★
★ ★ ★ ★
★ ★ ★ ★ ★
```

### Brain কীভাবে ভাববে:

```
Row 1: 1 টা star
Row 2: 2 টা star
Row 3: 3 টা star
Row 4: 4 টা star
Row 5: 5 টা star
```

দেখো, Row number = Star সংখ্যা!

### Code:

```csharp
int rows = 5;

for (int i = 1; i <= rows; i++)
{
    for (int j = 1; j <= i; j++)  // j <= i (row number পর্যন্ত)
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}
```

Output:
```
★ 
★ ★ 
★ ★ ★ 
★ ★ ★ ★ 
★ ★ ★ ★ ★ 
```

### Key Point:

Inner loop এর condition হলো `j <= i`

মানে:
- i = 1 হলে → j চলবে 1 বার
- i = 2 হলে → j চলবে 2 বার
- i = 3 হলে → j চলবে 3 বার
- ...এভাবে!

---

## Pattern Printing: Number Triangle

Star এর বদলে number দিয়ে:

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

### Code:

```csharp
int rows = 5;

for (int i = 1; i <= rows; i++)
{
    for (int j = 1; j <= i; j++)
    {
        Console.Write(j + " ");  // j print করছি
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

## Pattern Printing: Inverted Triangle

উল্টা triangle:

```
★ ★ ★ ★ ★
★ ★ ★ ★
★ ★ ★
★ ★
★
```

### Brain কীভাবে ভাববে:

```
Row 1: 5 টা star
Row 2: 4 টা star
Row 3: 3 টা star
Row 4: 2 টা star
Row 5: 1 টা star
```

Row বাড়লে Star কমছে। Star সংখ্যা = (rows - i + 1)

### Code:

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

Output:
```
★ ★ ★ ★ ★ 
★ ★ ★ ★ 
★ ★ ★ 
★ ★ 
★ 
```

---

## while দিয়েও Nested Loop হয়

for ছাড়াও while দিয়ে nested loop করা যায়:

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

Output:
```
★ ★ ★ ★ 
★ ★ ★ ★ 
★ ★ ★ ★ 
```

তবে pattern printing এ সাধারণত for loop বেশি use হয় কারণ count জানা থাকে।

---

## Common Mistakes

### Mistake 1: Inner আর Outer এ same variable

```csharp
// ❌ Wrong - দুই loop এই i use করছে!
for (int i = 1; i <= 3; i++)
{
    for (int i = 1; i <= 4; i++)  // Error বা unexpected behavior!
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}

// ✅ Correct - আলাদা variable name
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 4; j++)  // j use করছি
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}
```

**Tip:** Outer loop এ `i`, Inner loop এ `j` use করো। আরেক level হলে `k`।

### Mistake 2: WriteLine() এর জায়গা ভুল

```csharp
// ❌ Wrong - WriteLine() inner loop এ
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 4; j++)
    {
        Console.Write("★ ");
        Console.WriteLine();  // প্রতি star এর পর new line! 
    }
}

// ✅ Correct - WriteLine() inner loop এর বাইরে
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 4; j++)
    {
        Console.Write("★ ");
    }
    Console.WriteLine();  // পুরো row শেষে new line
}
```

### Mistake 3: Inner loop এর condition ভুল

```csharp
// Triangle বানাতে গিয়ে...

// ❌ Wrong - j <= rows (fixed সংখ্যা)
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= 5; j++)  // সবসময় 5 টা
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}
// Output: Rectangle হবে, triangle না!

// ✅ Correct - j <= i (row এর সাথে বাড়ে)
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= i; j++)  // i এর সমান
    {
        Console.Write("★ ");
    }
    Console.WriteLine();
}
// Output: Triangle!
```

---

## Complete Example: Pattern Menu

User choose করবে কোন pattern দেখতে চায়:

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

Console.Write("Enter number of rows: ");
int rows = int.Parse(Console.ReadLine());

Console.WriteLine();

switch (choice)
{
    case 1:  // Rectangle
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= rows; j++)
            {
                Console.Write("★ ");
            }
            Console.WriteLine();
        }
        break;
        
    case 2:  // Right Triangle
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                Console.Write("★ ");
            }
            Console.WriteLine();
        }
        break;
        
    case 3:  // Inverted Triangle
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= rows - i + 1; j++)
            {
                Console.Write("★ ");
            }
            Console.WriteLine();
        }
        break;
        
    case 4:  // Number Triangle
        for (int i = 1; i <= rows; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                Console.Write(j + " ");
            }
            Console.WriteLine();
        }
        break;
        
    default:
        Console.WriteLine("Invalid choice!");
        break;
}
```

---

## আরো Deep: 3 Level Nested Loop

এতক্ষণ আমরা 2 level nested loop দেখলাম (loop এর ভিতর loop)।

কিন্তু জানো কি? **তুমি যতগুলো খুশি level এ nest করতে পারো!**

3 টা, 4 টা, 5 টা... যত ইচ্ছা! তবে বেশি হলে complex হয়ে যায়, তাই সাধারণত 2-3 level বেশি use হয়।

---

## Real Example: 3 Level Nested Loop

### Example 1: School → Class → Student

ধরো একটা School এ 2 টা Class আছে, প্রতি Class এ 2 টা Section, প্রতি Section এ 3 জন Student:

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
  📁 Section 1:
    👤 Student 1
    👤 Student 2
    👤 Student 3
  📁 Section 2:
    👤 Student 1
    👤 Student 2
    👤 Student 3
```

**মোট কতবার Student print হলো?**

Class × Section × Student = 2 × 2 × 3 = **12 বার!**

---

### Example 2: Building → Floor → Room

একটা Building এ 2 টা Floor, প্রতি Floor এ 3 টা Room, প্রতি Room এ 2 টা Light:

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

Output:
```
🏢 Floor 1:
  🚪 Room 1:
    💡 Light 1 - ON
    💡 Light 2 - ON
  🚪 Room 2:
    💡 Light 1 - ON
    💡 Light 2 - ON
  🚪 Room 3:
    💡 Light 1 - ON
    💡 Light 2 - ON

🏢 Floor 2:
  🚪 Room 1:
    💡 Light 1 - ON
    💡 Light 2 - ON
  🚪 Room 2:
    💡 Light 1 - ON
    💡 Light 2 - ON
  🚪 Room 3:
    💡 Light 1 - ON
    💡 Light 2 - ON
```

---

### Example 3: 3D Box Pattern

3D effect দিতে 3 level loop লাগে। একটা cube এর মতো structure বানাই:

```csharp
int size = 3;

for (int layer = 1; layer <= size; layer++)
{
    Console.WriteLine($"Layer {layer}:");
    
    for (int row = 1; row <= size; row++)
    {
        for (int col = 1; col <= size; col++)
        {
            Console.Write("■ ");
        }
        Console.WriteLine();
    }
    Console.WriteLine();
}
```

Output:
```
Layer 1:
■ ■ ■ 
■ ■ ■ 
■ ■ ■ 

Layer 2:
■ ■ ■ 
■ ■ ■ 
■ ■ ■ 

Layer 3:
■ ■ ■ 
■ ■ ■ 
■ ■ ■ 
```

---

## কয়টা Level পর্যন্ত যেতে পারি?

**যত খুশি!** কিন্তু practical এ:

| Levels | Use Case |
|--------|----------|
| 2 | সবচেয়ে common (row × column) |
| 3 | 3D data, hierarchical data |
| 4+ | Rare, very complex problems |

**Tip:** 3 এর বেশি level হলে code পড়তে কষ্ট হয়। তখন আলাদা function বানানো better (পরে শিখবো)।

### Variable Naming Convention:

```csharp
// 2 levels
for (int i ...) 
    for (int j ...)

// 3 levels
for (int i ...)
    for (int j ...)
        for (int k ...)

// 4 levels
for (int i ...)
    for (int j ...)
        for (int k ...)
            for (int l ...)
```

অথবা meaningful name দাও:

```csharp
for (int floor ...)
    for (int room ...)
        for (int light ...)
```

---

## Summary

আজকে শিখলে:

| Concept | মানে |
|---------|------|
| Nested Loop | Loop এর ভিতর Loop |
| Outer Loop | বাইরের Loop (row এর জন্য) |
| Inner Loop | ভিতরের Loop (column এর জন্য) |
| Total iterations | Outer × Inner |

**Nested Loop এর Structure:**

```csharp
for (int i = 1; i <= rows; i++)       // Outer - row
{
    for (int j = 1; j <= cols; j++)   // Inner - column
    {
        // কাজ করো
    }
    Console.WriteLine();  // Row শেষে new line
}
```

**মনে রাখো:**
- Outer একবার চললে Inner পুরোটা চলে
- Inner আর Outer এ আলাদা variable use করো (i, j)
- `Console.Write()` same line এ, `Console.WriteLine()` new line
- Triangle এ inner loop condition `j <= i` হয়

**Pattern Tips:**
- Rectangle: `j <= cols` (fixed)
- Right Triangle: `j <= i` (row এর সাথে বাড়ে)
- Inverted Triangle: `j <= rows - i + 1` (row এর সাথে কমে)

---

*CPS Academy - Learn. Code. Grow.*
