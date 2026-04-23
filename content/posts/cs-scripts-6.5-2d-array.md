---
title: "Lesson 6.5: 2D Array — Grid/Table এর মতো Data"
date: "2026-05-18"
excerpt: "Cinema Hall example, 2D array syntax, Row/Column index, Initialize এবং GetLength()"
categories:
  - C# Course Scripts
tags:
  - csharp
  - arrays
  - 2d-array
  - grid
draft: false
---

# Lesson 6.5: 2D Array — Grid/Table এর মতো Data

> **এই Lesson এ শিখবে:** কেন 2D array দরকার, Cinema Hall example, Real life analogies (Chess, Excel), 2D array বানানো, Value রাখা ও বের করা, Index বোঝা, Initialize এর সহজ উপায়, এবং GetLength()।

---

## আগের Lesson এ কী শিখলাম?

1D Array:
```csharp
int[] marks = { 85, 90, 78, 92, 88 };
```

```
┌─────┬─────┬─────┬─────┬─────┐
│ 85  │ 90  │ 78  │ 92  │ 88  │
└─────┴─────┴─────┴─────┴─────┘
```

**এক লাইন** এ data। কিন্তু সব data তো এক লাইন এ থাকে না!

---

## Cinema Hall Problem

ধরো তুমি একটা Cinema Hall এর manager।

Hall এ **5 টা row** আছে, প্রতি row তে **8 টা seat**।

```
Cinema Hall:

        Seat1  Seat2  ...  Seat8
Row 1:   🪑     🪑   ...   🪑
Row 2:   🪑     🪑   ...   🪑
Row 3:   🪑     🪑   ...   🪑
Row 4:   🪑     🪑   ...   🪑
Row 5:   🪑     🪑   ...   🪑

            🎬 SCREEN 🎬
```

এটা কি normal (1D) array দিয়ে করা যাবে?

---

## 1D Array দিয়ে Try করি

```csharp
int[] seats = { 1, 0, 1, 0, 1 };
```

**1D Array:**

```
┌─────┬─────┬─────┬─────┬─────┐
│  1  │  0  │  1  │  0  │  1  │
└─────┴─────┴─────┴─────┴─────┘
  0     1     2     3     4

←──────────────────────→
    এক দিকে যাচ্ছে
```

কিন্তু Cinema Hall তো **grid**!

```
Cinema Hall:

         Col 0   Col 1   Col 2   Col 3
       ┌───────┬───────┬───────┬───────┐
Row 0  │ Seat  │ Seat  │ Seat  │ Seat  │
       ├───────┼───────┼───────┼───────┤
Row 1  │ Seat  │ Seat  │ Seat  │ Seat  │
       ├───────┼───────┼───────┼───────┤
Row 2  │ Seat  │ Seat  │ Seat  │ Seat  │
       └───────┴───────┴───────┴───────┘

↓ Row (উপর-নিচ)
←──→ Column (বাম-ডান)
```

**দুইটা দিক!** Row আর Column।

এই ধরনের data রাখতে দরকার — **2D Array!**

---

## 2D Array কী?

**2D = Two Dimensional = 2 দিক = Row + Column**

Data **Table** বা **Grid** আকারে সাজানো।

### 1D vs 2D:

```
1D Array (একটা line):
┌───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │
└───┴───┴───┴───┘
একটা index দিলেই চলে: arr[2]


2D Array (Table):
       Col0  Col1  Col2
     ┌─────┬─────┬─────┐
Row0 │  1  │  2  │  3  │
     ├─────┼─────┼─────┤
Row1 │  4  │  5  │  6  │
     └─────┴─────┴─────┘
দুইটা index লাগে: arr[1, 2] (Row 1, Column 2 = 6)
```

---

## Real Life এ 2D Array

### 🎬 Cinema Hall:
Row + Seat number → 2D!

### ♟️ Chess Board:
8 × 8 grid — "Queen is at Row 0, Column 3"

### 📊 Excel Sheet:
"B3" = Column B, Row 3

### 🎮 Tic-Tac-Toe:
3 × 3 grid

### 🖼️ Image:
Pixel at (row, column)

### 🗺️ Google Maps:
Grid of locations

---

## 2D Array বানানো — 3 Steps

### Step 1: Syntax এ comma!

```csharp
int[,]
```

**খেয়াল করো:**
- 1D: `int[]`
- 2D: `int[,]` — মাঝে **comma!**

এই comma C# কে বলে "এটা 2D"।

---

### Step 2: নাম দাও

```csharp
int[,] seats
```

---

### Step 3: কত Row, কত Column?

```csharp
int[,] seats = new int[5, 8];
```

- `new` = তৈরি করো
- `int[5, 8]` = **5 row, 8 column**

### Compare:

```csharp
// 1D — একটা সংখ্যা (কয়টা ঘর)
int[] marks = new int[5];

// 2D — দুইটা সংখ্যা (Row, Column)
int[,] seats = new int[5, 8];
```

---

## 2D Array তৈরি হলো!

```
seats Array (5 rows × 8 columns):

       Col0  Col1  Col2  Col3  Col4  Col5  Col6  Col7
     ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
Row0 │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │
     ├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
Row1 │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │
     ├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
Row2 │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │
     ├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
Row3 │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │
     ├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
Row4 │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │
     └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘

মোট ঘর = 5 × 8 = 40 টা
সব ঘরে 0 (default)
```

---

## 2D Array তে Value রাখা

**দুইটা index** দিতে হয়:

```csharp
seats[row, column] = value;
```

```csharp
int[,] seats = new int[5, 8];

seats[0, 0] = 1;   // Row 0, Column 0 = Booked
seats[0, 1] = 1;   // Row 0, Column 1 = Booked
seats[2, 5] = 1;   // Row 2, Column 5 = Booked
```

এখন দেখতে:

```
       Col0  Col1  Col2  Col3  Col4  Col5  Col6  Col7
     ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
Row0 │  1  │  1  │  0  │  0  │  0  │  0  │  0  │  0  │
     ├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
Row1 │  0  │  0  │  0  │  0  │  0  │  0  │  0  │  0  │
     ├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
Row2 │  0  │  0  │  0  │  0  │  0  │  1  │  0  │  0  │
     └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘

1 = Booked ✅
0 = Empty ⬜
```

---

## 2D Array থেকে Value বের করা

```csharp
Console.WriteLine(seats[0, 0]);  // 1 (Booked)
Console.WriteLine(seats[0, 2]);  // 0 (Empty)
Console.WriteLine(seats[2, 5]);  // 1 (Booked)
```

---

## Index Visual Guide

`seats[2, 5]` = কোথায়?

```
Step 1: Row 2 তে যাও (উপর থেকে নিচে গোনো)
Step 2: Column 5 তে যাও (বাম থেকে ডানে)

         Col0  Col1  Col2  Col3  Col4  Col5
       ┌─────┬─────┬─────┬─────┬─────┬─────┐
Row 0  │     │     │     │     │     │     │
Row 1  │     │     │     │     │     │     │
Row 2  │     │     │     │     │     │     │HERE!│ ← এখানে!
Row 3  │     │     │     │     │     │     │
       └─────┴─────┴─────┴─────┴─────┴─────┘
```

**Formula:**
```
array[Row, Column]
      ↑       ↑
   আগে Row  পরে Column
```

---

## Initialize এর সহজ উপায়

1D এর মতোই, 2D ও বানানোর সময় value দেওয়া যায়:

```csharp
int[,] grid = {
    { 1, 2, 3, 4 },    // Row 0
    { 5, 6, 7, 8 },    // Row 1
    { 9, 10, 11, 12 }  // Row 2
};
```

### কী হলো?

```
       Col0  Col1  Col2  Col3
     ┌─────┬─────┬─────┬─────┐
Row0 │  1  │  2  │  3  │  4  │
     ├─────┼─────┼─────┼─────┤
Row1 │  5  │  6  │  7  │  8  │
     ├─────┼─────┼─────┼─────┤
Row2 │  9  │ 10  │ 11  │ 12  │
     └─────┴─────┴─────┴─────┘
```

প্রতিটা inner `{ }` = একটা **row**।

### আরো examples:

```csharp
// 2×3 matrix
int[,] matrix = {
    { 10, 20, 30 },
    { 40, 50, 60 }
};

// String 2D array — Seat labels
string[,] seatLabels = {
    { "A1", "A2", "A3" },
    { "B1", "B2", "B3" },
    { "C1", "C2", "C3" }
};
```

---

## 2D Array এর Size — GetLength()

1D এ `.Length` ছিল। 2D তে **GetLength()** use করি:

```csharp
int[,] grid = new int[5, 8];

int rows = grid.GetLength(0);    // 5 (first dimension)
int cols = grid.GetLength(1);    // 8 (second dimension)

Console.WriteLine($"Rows: {rows}");     // 5
Console.WriteLine($"Columns: {cols}");  // 8
```

- `GetLength(0)` = Row count
- `GetLength(1)` = Column count
- `.Length` = Total cells (5 × 8 = 40)

---

## Common Mistakes

### ❌ Mistake 1: `[,]` এর বদলে `[][]`

```csharp
// C# এ jagged array আর 2D array আলাদা
int[,] grid = new int[3, 3];  // ✅ 2D array (আমরা এটা শিখছি)
int[][] jag = new int[3][];   // Jagged array (আলাদা জিনিস!)
```

### ❌ Mistake 2: Row আর Column গুলিয়ে ফেলা

```csharp
int[,] grid = new int[5, 8];  // 5 row, 8 column
grid[7, 2] = 1;  // ❌ Row 7 নেই! (max row = 4)
grid[2, 7] = 1;  // ✅ Row 2, Column 7
```

### ❌ Mistake 3: Out of bounds

```csharp
int[,] grid = new int[3, 3];  // index: 0-2 both

grid[3, 0] = 1;  // ❌ Row 3 নেই! Exception!
grid[0, 3] = 1;  // ❌ Column 3 নেই!
```

---

## Summary

**2D Array = Grid/Table এর মতো data।**

```csharp
// বানানো
int[,] grid = new int[5, 8];

// Initialize
int[,] matrix = {
    { 1, 2, 3 },
    { 4, 5, 6 }
};

// Value
grid[row, col] = value;
int val = grid[row, col];

// Size
grid.GetLength(0)  // rows
grid.GetLength(1)  // columns
```

**মনে রাখো:**
- `[,]` — মাঝে **comma**!
- **Row আগে, Column পরে**
- দুইটা index — `arr[row, col]`
- `GetLength(0)` = row, `GetLength(1)` = column

---

**পরের Lesson:** 2D Array Traverse — Nested loop দিয়ে সব cell visit!

---

*CPS Academy - Learn. Code. Grow.*
