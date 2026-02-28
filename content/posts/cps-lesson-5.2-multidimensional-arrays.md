---
title: "Lesson 5.2: Multidimensional Arrays — 2D Table ও Grid"
date: "2026-03-18"
excerpt: "1D vs 2D array, 2D array বানানো ও access করা, `[,]` syntax, `GetLength()`, nested loop দিয়ে traverse, real-world examples (cinema hall, marks table, tic-tac-toe), এব"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - arrays
  - data-structures
draft: false
---


> **এই Lesson এ শিখবে:** 1D vs 2D array, 2D array বানানো ও access করা, `[,]` syntax, `GetLength()`, nested loop দিয়ে traverse, real-world examples (cinema hall, marks table, tic-tac-toe), এবং 3D array basics।

---

## 2D Array কেন দরকার?

আগের lesson এ শিখেছি 1D array — একটা line এ data:

```
1D Array:
┌───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │
└───┴───┴───┴───┴───┘
  একটা index: array[2]
```

কিন্তু Cinema Hall, Chess Board, Excel Sheet — এগুলো **Table/Grid** আকারে। Row আছে, Column আছে:

```
2D Array:
        Col0  Col1  Col2  Col3
      ┌─────┬─────┬─────┬─────┐
Row0  │  1  │  2  │  3  │  4  │
      ├─────┼─────┼─────┼─────┤
Row1  │  5  │  6  │  7  │  8  │
      ├─────┼─────┼─────┼─────┤
Row2  │  9  │ 10  │ 11  │ 12  │
      └─────┴─────┴─────┴─────┘
  দুইটা index: array[1, 2] = 7
```

---

## 2D Array বানানো

### `[,]` — comma টাই key!

```csharp
// Way 1: খালি array
int[,] matrix = new int[3, 4];  // 3 rows, 4 columns

// Way 2: value সহ
int[,] matrix = {
    { 1,  2,  3,  4 },   // Row 0
    { 5,  6,  7,  8 },   // Row 1
    { 9, 10, 11, 12 }    // Row 2
};
```

**লক্ষ্য করো:** `int[]` না, `int[,]` — মাঝে comma!

---

## Value রাখা ও বের করা

```csharp
// দুইটা index: [row, column]
matrix[0, 2] = 99;                    // Row 0, Col 2 তে 99 রাখো
int value = matrix[1, 3];             // Row 1, Col 3 এর value (8)
Console.WriteLine(matrix[2, 0]);      // Row 2, Col 0 print (9)
```

**মনে রাখো: আগে Row, পরে Column!**

---

## GetLength() — Row ও Column সংখ্যা

```csharp
int[,] matrix = {
    { 1, 2, 3, 4 },
    { 5, 6, 7, 8 },
    { 9, 10, 11, 12 }
};

int rows = matrix.GetLength(0);    // 3 (row সংখ্যা)
int cols = matrix.GetLength(1);    // 4 (column সংখ্যা)
```

| Method | কী দেয় |
|--------|---------|
| `GetLength(0)` | Row সংখ্যা |
| `GetLength(1)` | Column সংখ্যা |

---

## Nested Loop দিয়ে Traverse

2D array তে nested loop লাগে — outer loop rows এর জন্য, inner loop columns এর জন্য:

```csharp
int[,] matrix = {
    { 1, 2, 3, 4 },
    { 5, 6, 7, 8 },
    { 9, 10, 11, 12 }
};

for (int row = 0; row < matrix.GetLength(0); row++)
{
    for (int col = 0; col < matrix.GetLength(1); col++)
    {
        Console.Write($"{matrix[row, col],4}");
    }
    Console.WriteLine();
}
```

Output:
```
   1   2   3   4
   5   6   7   8
   9  10  11  12
```

---

## Example: Student Marks Table 📊

3 জন student, 3 টা subject:

```csharp
string[] students = { "Rahim", "Karim", "Jabbar" };
string[] subjects = { "Bangla", "English", "Math" };

int[,] marks = {
    { 85, 90, 78 },   // Rahim
    { 92, 88, 95 },   // Karim
    { 78, 72, 80 }    // Jabbar
};

// Table header
Console.Write($"{"Name",-10}");
foreach (string sub in subjects)
    Console.Write($"{sub,10}");
Console.WriteLine($"{"Total",10}");
Console.WriteLine(new string('-', 40));

// Table body
for (int i = 0; i < students.Length; i++)
{
    Console.Write($"{students[i],-10}");
    int total = 0;

    for (int j = 0; j < subjects.Length; j++)
    {
        Console.Write($"{marks[i, j],10}");
        total += marks[i, j];
    }

    Console.WriteLine($"{total,10}");
}
```

Output:
```
Name          Bangla   English      Math     Total
----------------------------------------
Rahim             85        90        78       253
Karim             92        88        95       275
Jabbar            78        72        80       230
```

---

## Example: Cinema Seat Booking 🎬

```csharp
int[,] cinema = {
    { 0, 1, 0, 0, 1 },  // Row 0 (0=empty, 1=booked)
    { 1, 1, 0, 1, 0 },  // Row 1
    { 0, 0, 0, 0, 0 }   // Row 2
};

Console.WriteLine("🎬 Cinema Hall (🟢=Empty, 🔴=Booked)\n");

for (int r = 0; r < cinema.GetLength(0); r++)
{
    Console.Write($"Row {r}: ");
    for (int c = 0; c < cinema.GetLength(1); c++)
    {
        Console.Write(cinema[r, c] == 0 ? "🟢 " : "🔴 ");
    }
    Console.WriteLine();
}

// Empty count
int empty = 0;
for (int r = 0; r < cinema.GetLength(0); r++)
    for (int c = 0; c < cinema.GetLength(1); c++)
        if (cinema[r, c] == 0) empty++;

Console.WriteLine($"\nEmpty seats: {empty}");
```

---

## 3D Array — সংক্ষেপে

3D array = Row + Column + **Depth** (তৃতীয় মাত্রা):

```csharp
int[,,] cube = new int[2, 3, 4];  // 2 layers, 3 rows, 4 cols
cube[0, 1, 2] = 99;               // Layer 0, Row 1, Col 2
```

3D খুব কম use হয়, 2D ই সবচেয়ে common।

---

## Common Mistakes

### Mistake 1: `[,]` ভুলে `[][]` লেখা

```csharp
// ❌ এটা 2D array না, এটা jagged array
int[][] matrix;

// ✓ 2D array
int[,] matrix;
```

### Mistake 2: Row/Column উল্টা করা

```csharp
// ❌ 3 rows, 4 cols — কিন্তু উল্টা দিয়েছে
matrix[col, row]

// ✓ আগে row, পরে column
matrix[row, col]
```

### Mistake 3: সব Row তে Column সমান না দেওয়া

```csharp
// ❌ Row 0 তে 3 টা, Row 1 তে 4 টা — Error!
int[,] m = { { 1, 2, 3 }, { 4, 5, 6, 7 } };

// ✓ সব Row তে সমান
int[,] m = { { 1, 2, 3, 4 }, { 5, 6, 7, 8 } };
```

---

## Summary

| Concept | মানে |
|---------|------|
| 2D Array | Table/Grid — Row ও Column |
| `[,]` | 2D array বোঝায় |
| `GetLength(0)` | Row সংখ্যা |
| `GetLength(1)` | Column সংখ্যা |

**2D Array বানানো:** `int[,] m = { {1,2}, {3,4} };`

**Access:** `m[row, col]` — আগে Row, পরে Column!

**Traverse:** Nested loop — outer for rows, inner for cols

---

**পরের Lesson:** foreach Loop — index ছাড়াই array traverse করার সহজ উপায়।

---

*CPS Academy - Learn. Code. Grow.*
