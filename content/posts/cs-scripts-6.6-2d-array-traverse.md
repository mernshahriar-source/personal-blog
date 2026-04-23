---
title: "Lesson 6.6: 2D Array Traverse ও Examples"
date: "2026-05-19"
excerpt: "Nested loop দিয়ে 2D array traverse, Cinema Seat Booking, Student Marks Table, Tic-Tac-Toe Board এবং Row/Column sums"
categories:
  - C# Course Scripts
tags:
  - csharp
  - 2d-array
  - nested-loops
  - arrays
draft: false
---

# Lesson 6.6: 2D Array Traverse ও Examples

> **এই Lesson এ শিখবে:** Nested loop দিয়ে 2D array traverse, Step by step execution, Cinema Seat Booking System, Student Marks Table, Tic-Tac-Toe Board, Total/Average, এবং সব pattern।

---

## 2D Array Traverse — Nested Loop

1D এ এক loop ছিল। 2D তে **দুইটা loop** লাগবে — nested!

```csharp
int[,] grid = {
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

for (int i = 0; i < grid.GetLength(0); i++)         // Rows
{
    for (int j = 0; j < grid.GetLength(1); j++)      // Columns
    {
        Console.Write($"{grid[i, j]} ");
    }
    Console.WriteLine();  // Row শেষে new line
}
```

Output:
```
1 2 3
4 5 6
7 8 9
```

---

## Step by Step

```csharp
int[,] grid = {
    { 1, 2, 3 },
    { 4, 5, 6 }
};
```

### Execution:

| i (row) | j (col) | grid[i, j] | Output |
|---------|---------|------------|--------|
| 0 | 0 | 1 | 1 |
| 0 | 1 | 2 | 2 |
| 0 | 2 | 3 | 3 |
| 0 | — | — | (new line) |
| 1 | 0 | 4 | 4 |
| 1 | 1 | 5 | 5 |
| 1 | 2 | 6 | 6 |
| 1 | — | — | (new line) |

**Outer loop row, Inner loop column!**

---

## Example 1: Cinema Seat Booking Display

```csharp
int[,] seats = new int[3, 5];

// কিছু book করি
seats[0, 1] = 1;
seats[0, 3] = 1;
seats[1, 0] = 1;
seats[1, 2] = 1;
seats[2, 4] = 1;

Console.WriteLine("🎬 CINEMA HALL STATUS");
Console.WriteLine("─────────────────────\n");

for (int i = 0; i < seats.GetLength(0); i++)
{
    Console.Write($"Row {i}:  ");
    for (int j = 0; j < seats.GetLength(1); j++)
    {
        if (seats[i, j] == 1)
            Console.Write("❌ ");  // Booked
        else
            Console.Write("✅ ");  // Empty
    }
    Console.WriteLine();
}

Console.WriteLine("\n       🎬 SCREEN 🎬");
```

Output:
```
🎬 CINEMA HALL STATUS
─────────────────────

Row 0:  ✅ ❌ ✅ ❌ ✅
Row 1:  ❌ ✅ ❌ ✅ ✅
Row 2:  ✅ ✅ ✅ ✅ ❌

       🎬 SCREEN 🎬
```

---

## Example 2: Count Booked & Empty Seats

```csharp
int[,] seats = {
    { 1, 0, 1, 0, 1 },
    { 0, 1, 0, 1, 0 },
    { 1, 1, 0, 0, 0 }
};

int booked = 0;
int empty = 0;

for (int i = 0; i < seats.GetLength(0); i++)
{
    for (int j = 0; j < seats.GetLength(1); j++)
    {
        if (seats[i, j] == 1)
            booked++;
        else
            empty++;
    }
}

Console.WriteLine($"Booked: {booked}");
Console.WriteLine($"Empty: {empty}");
Console.WriteLine($"Total: {booked + empty}");
```

Output:
```
Booked: 6
Empty: 9
Total: 15
```

---

## Example 3: Student Marks Table

3 student, 4 subject:

```csharp
string[] students = { "Rahim", "Karim", "Jabbar" };
string[] subjects = { "Bangla", "English", "Math", "Science" };

int[,] marks = {
    { 85, 90, 78, 92 },  // Rahim
    { 72, 80, 88, 75 },  // Karim
    { 95, 85, 92, 88 }   // Jabbar
};

// Table print
Console.Write($"{"Name",-10}");
foreach (string s in subjects)
    Console.Write($"{s,-10}");
Console.WriteLine("Total");
Console.WriteLine(new string('-', 60));

for (int i = 0; i < students.Length; i++)
{
    Console.Write($"{students[i],-10}");

    int total = 0;
    for (int j = 0; j < subjects.Length; j++)
    {
        Console.Write($"{marks[i, j],-10}");
        total += marks[i, j];
    }

    Console.WriteLine(total);
}
```

Output:
```
Name      Bangla    English   Math      Science   Total
------------------------------------------------------------
Rahim     85        90        78        92        345
Karim     72        80        88        75        315
Jabbar    95        85        92        88        360
```

---

## Example 4: Each Subject's Average

Column-wise iteration!

```csharp
int[,] marks = {
    { 85, 90, 78, 92 },
    { 72, 80, 88, 75 },
    { 95, 85, 92, 88 }
};

string[] subjects = { "Bangla", "English", "Math", "Science" };

for (int j = 0; j < marks.GetLength(1); j++)  // outer = column
{
    int total = 0;
    for (int i = 0; i < marks.GetLength(0); i++)  // inner = row
    {
        total += marks[i, j];
    }
    double avg = (double)total / marks.GetLength(0);
    Console.WriteLine($"{subjects[j]}: avg = {avg:F2}");
}
```

Output:
```
Bangla: avg = 84.00
English: avg = 85.00
Math: avg = 86.00
Science: avg = 85.00
```

**Outer = column, Inner = row!** উল্টা order এ iterate।

---

## Example 5: Tic-Tac-Toe Board

```csharp
char[,] board = {
    { 'X', 'O', 'X' },
    { ' ', 'X', 'O' },
    { 'O', ' ', 'X' }
};

Console.WriteLine("⭕ TIC-TAC-TOE BOARD");
Console.WriteLine();

for (int i = 0; i < 3; i++)
{
    Console.Write(" ");
    for (int j = 0; j < 3; j++)
    {
        Console.Write(board[i, j]);
        if (j < 2) Console.Write(" | ");
    }
    Console.WriteLine();
    if (i < 2)
        Console.WriteLine("───┼───┼───");
}
```

Output:
```
⭕ TIC-TAC-TOE BOARD

 X | O | X
───┼───┼───
   | X | O
───┼───┼───
 O |   | X
```

---

## Example 6: Multiplication Table Grid

```csharp
Console.WriteLine("Multiplication Table (1-5):\n");

// Header
Console.Write("      ");
for (int j = 1; j <= 5; j++)
    Console.Write($"{j,4}");
Console.WriteLine();

// Separator
Console.Write("     ");
for (int j = 1; j <= 5; j++)
    Console.Write("────");
Console.WriteLine();

// Table
for (int i = 1; i <= 5; i++)
{
    Console.Write($"{i,3} | ");
    for (int j = 1; j <= 5; j++)
    {
        Console.Write($"{i * j,4}");
    }
    Console.WriteLine();
}
```

Output:
```
Multiplication Table (1-5):

         1   2   3   4   5
     ────────────────────
  1 |    1   2   3   4   5
  2 |    2   4   6   8  10
  3 |    3   6   9  12  15
  4 |    4   8  12  16  20
  5 |    5  10  15  20  25
```

---

## Example 7: Row Sum ও Column Sum

```csharp
int[,] matrix = {
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

// Row sums
Console.WriteLine("Row sums:");
for (int i = 0; i < matrix.GetLength(0); i++)
{
    int sum = 0;
    for (int j = 0; j < matrix.GetLength(1); j++)
        sum += matrix[i, j];
    Console.WriteLine($"Row {i}: {sum}");
}

// Column sums
Console.WriteLine("\nColumn sums:");
for (int j = 0; j < matrix.GetLength(1); j++)
{
    int sum = 0;
    for (int i = 0; i < matrix.GetLength(0); i++)
        sum += matrix[i, j];
    Console.WriteLine($"Col {j}: {sum}");
}
```

Output:
```
Row sums:
Row 0: 6
Row 1: 15
Row 2: 24

Column sums:
Col 0: 12
Col 1: 15
Col 2: 18
```

---

## Example 8: Max in 2D Array

```csharp
int[,] matrix = {
    { 5, 12, 8 },
    { 3, 25, 7 },
    { 19, 6, 14 }
};

int max = matrix[0, 0];

for (int i = 0; i < matrix.GetLength(0); i++)
{
    for (int j = 0; j < matrix.GetLength(1); j++)
    {
        if (matrix[i, j] > max)
            max = matrix[i, j];
    }
}

Console.WriteLine($"Maximum: {max}");  // 25
```

---

## Common Patterns

### Pattern 1: All Rows

```csharp
for (int i = 0; i < arr.GetLength(0); i++)  // outer = row
    for (int j = 0; j < arr.GetLength(1); j++)  // inner = col
        // access arr[i, j]
```

### Pattern 2: All Columns

```csharp
for (int j = 0; j < arr.GetLength(1); j++)  // outer = col
    for (int i = 0; i < arr.GetLength(0); i++)  // inner = row
        // access arr[i, j]
```

### Pattern 3: Specific Row

```csharp
int row = 2;
for (int j = 0; j < arr.GetLength(1); j++)
    Console.Write(arr[row, j] + " ");
```

### Pattern 4: Specific Column

```csharp
int col = 3;
for (int i = 0; i < arr.GetLength(0); i++)
    Console.WriteLine(arr[i, col]);
```

---

## Summary

**2D Array Traverse:**

```csharp
for (int i = 0; i < arr.GetLength(0); i++)
{
    for (int j = 0; j < arr.GetLength(1); j++)
    {
        // arr[i, j]
    }
}
```

**মনে রাখো:**
- **Nested loop** দরকার
- Outer = rows, Inner = columns (usually)
- Row শেষে `Console.WriteLine()` না দিলে সব এক line এ
- Column-wise iterate করলে outer=col, inner=row
- Sum/Max/Min — 1D এর মতোই logic

---

**পরের Lesson:** foreach Loop — Array এর জন্য special, cleaner loop!

---

*CPS Academy - Learn. Code. Grow.*
