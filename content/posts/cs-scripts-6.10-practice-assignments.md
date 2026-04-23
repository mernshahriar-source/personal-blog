---
title: "Lesson 6.10: Practice & Assignments — সব Array Concepts মিলিয়ে"
date: "2026-05-23"
excerpt: "Top 3 Students, Shopping Cart, Tic-Tac-Toe, Class Statistics এবং নিজে solve করার Assignments"
categories:
  - C# Course Scripts
tags:
  - csharp
  - practice
  - assignments
  - arrays
draft: false
---

# Lesson 6.10: Practice & Assignments

> **এই Lesson এ দেখবে:** Module 6 এর সব concepts মিলিয়ে real programs — Top 3 Students, Shopping Cart, Tic-Tac-Toe Board, এবং নিজে solve করার Assignments।

---

## Solved Example 1: Top 3 Students System

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil", "Kabir" };
int[] marks = { 78, 92, 45, 88, 95, 72 };

Console.WriteLine("🏆 TOP 3 STUDENTS\n");

// প্রথমে দেখাই সবাইকে
Console.WriteLine("All Students:");
for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"  {names[i],-10}: {marks[i]}");
}

// Sort descending (marks এর সাথে names ও move করতে হবে)
for (int i = 0; i < marks.Length - 1; i++)
{
    for (int j = 0; j < marks.Length - 1 - i; j++)
    {
        if (marks[j] < marks[j + 1])
        {
            // marks swap
            int temp = marks[j];
            marks[j] = marks[j + 1];
            marks[j + 1] = temp;

            // names swap (parallel!)
            string tempName = names[j];
            names[j] = names[j + 1];
            names[j + 1] = tempName;
        }
    }
}

// Top 3
Console.WriteLine("\n🏆 Top 3:");
for (int i = 0; i < 3; i++)
{
    string medal = i == 0 ? "🥇" : (i == 1 ? "🥈" : "🥉");
    Console.WriteLine($"  {medal} {names[i],-10}: {marks[i]}");
}
```

Output:
```
🏆 TOP 3 STUDENTS

All Students:
  Rahim     : 78
  Karim     : 92
  Jabbar    : 45
  Salam     : 88
  Jalil     : 95
  Kabir     : 72

🏆 Top 3:
  🥇 Jalil     : 95
  🥈 Karim     : 92
  🥉 Salam     : 88
```

---

## Solved Example 2: Shopping Cart with Search

```csharp
string[] items = { "Shirt", "Pants", "Shoes", "Watch", "Bag" };
double[] prices = { 850, 1200, 2500, 1800, 650 };
int[] stock = { 5, 3, 2, 7, 4 };

Console.WriteLine("🛒 SHOPPING CART\n");

// Display
Console.WriteLine($"{"Item",-10} {"Price",10} {"Stock",8}");
Console.WriteLine(new string('-', 32));

for (int i = 0; i < items.Length; i++)
{
    Console.WriteLine($"{items[i],-10} {prices[i],10:F2} {stock[i],8}");
}

// Total value of all inventory
double total = 0;
for (int i = 0; i < items.Length; i++)
{
    total += prices[i] * stock[i];
}
Console.WriteLine(new string('-', 32));
Console.WriteLine($"Total inventory value: {total:N2} tk");

// Search
Console.Write("\nSearch item: ");
string search = Console.ReadLine();

int idx = Array.IndexOf(items, search);
if (idx != -1)
{
    Console.WriteLine($"✅ {items[idx]} — {prices[idx]} tk ({stock[idx]} in stock)");
}
else
{
    Console.WriteLine("❌ Not found!");
}
```

---

## Solved Example 3: Tic-Tac-Toe Board

```csharp
char[,] board = {
    { ' ', ' ', ' ' },
    { ' ', ' ', ' ' },
    { ' ', ' ', ' ' }
};

char currentPlayer = 'X';
int moves = 0;

while (moves < 9)
{
    // Display board
    Console.WriteLine($"\n{currentPlayer}'s turn");
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
        if (i < 2) Console.WriteLine("───┼───┼───");
    }

    // Input
    Console.Write("\nRow (0-2): ");
    int row = int.Parse(Console.ReadLine());
    Console.Write("Col (0-2): ");
    int col = int.Parse(Console.ReadLine());

    if (row < 0 || row > 2 || col < 0 || col > 2)
    {
        Console.WriteLine("❌ Invalid position!");
        continue;
    }

    if (board[row, col] != ' ')
    {
        Console.WriteLine("❌ Already taken!");
        continue;
    }

    board[row, col] = currentPlayer;
    moves++;

    // Switch player
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
}

Console.WriteLine("\n🎮 Game Over!");
```

---

## Solved Example 4: Class Statistics

```csharp
int[] marks = { 85, 92, 45, 78, 88, 35, 95, 68, 72, 88 };

Console.WriteLine("📊 CLASS STATISTICS\n");

// Basic stats
int total = 0;
int max = marks[0], min = marks[0];

foreach (int m in marks)
{
    total += m;
    if (m > max) max = m;
    if (m < min) min = m;
}

double average = (double)total / marks.Length;

Console.WriteLine($"Total students: {marks.Length}");
Console.WriteLine($"Total marks: {total}");
Console.WriteLine($"Average: {average:F2}");
Console.WriteLine($"Highest: {max}");
Console.WriteLine($"Lowest: {min}");

// Pass/Fail
int[] passed = Array.FindAll(marks, m => m >= 40);
int[] failed = Array.FindAll(marks, m => m < 40);

Console.WriteLine($"\nPassed: {passed.Length} students");
Console.WriteLine($"Failed: {failed.Length} students");
Console.WriteLine($"Pass rate: {(double)passed.Length / marks.Length * 100:F1}%");

// Grade distribution
int aPlus = 0, a = 0, b = 0, c = 0, d = 0, f = 0;
foreach (int m in marks)
{
    if (m >= 80) aPlus++;
    else if (m >= 70) a++;
    else if (m >= 60) b++;
    else if (m >= 50) c++;
    else if (m >= 40) d++;
    else f++;
}

Console.WriteLine($"\nGrade Distribution:");
Console.WriteLine($"  A+ (80+): {aPlus}");
Console.WriteLine($"  A  (70-79): {a}");
Console.WriteLine($"  B  (60-69): {b}");
Console.WriteLine($"  C  (50-59): {c}");
Console.WriteLine($"  D  (40-49): {d}");
Console.WriteLine($"  F  (less than 40): {f}");
```

---

## Assignment 1: Palindrome Check

**তোমার কাজ:** User একটা word দেবে। Check করো palindrome কিনা (উল্টালে same হয় কিনা)।

**Examples:**
- "level" → Palindrome ✅
- "hello" → Not palindrome ❌
- "madam" → Palindrome ✅

**Hint:**
- `string` কে `char[]` এ convert করো: `word.ToCharArray()`
- অথবা character by character compare — first vs last, second vs second-last...
- `word[i]` vs `word[word.Length - 1 - i]`

---

## Assignment 2: Bubble Sort (Manual Sort)

**তোমার কাজ:** `Array.Sort()` use **না করে**, নিজেই sort করো — Bubble Sort algorithm দিয়ে।

**Bubble Sort Logic:**
- পাশাপাশি দুইটা element compare করো
- বড়টা পরে, ছোটটা আগে — না থাকলে swap
- এভাবে একটা pass দিলে সবচেয়ে বড়টা শেষে চলে যাবে
- n-1 pass দিতে হবে

**Hint Structure:**
```csharp
for (int i = 0; i < n - 1; i++)
{
    for (int j = 0; j < n - 1 - i; j++)
    {
        if (arr[j] > arr[j + 1])
        {
            // Swap
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
```

---

## Assignment 3: Matrix Transpose

**তোমার কাজ:** 2D array এর transpose বের করো।

**Transpose মানে:** Row ↔ Column swap।

**Example:**

```
Original (2×3):
1 2 3
4 5 6

Transpose (3×2):
1 4
2 5
3 6
```

**Hint:**
- নতুন 2D array বানাও opposite dimensions এ
- `transpose[j, i] = original[i, j]`

---

## Module 6 Complete! 🎉

**এই Module এ শিখলে:**

| Concept | মানে |
|---------|------|
| **Array** | একাধিক data একসাথে |
| **Index** | 0 থেকে শুরু |
| **1D Array** | এক line এ data |
| **2D Array** | Grid/Table |
| **Length / GetLength** | Array এর size |
| **foreach** | Clean iteration |
| **Array.Sort** | Ascending sort |
| **Array.Reverse** | উল্টানো |
| **Array.IndexOf** | Search |
| **Array.Find/Exists/FindAll** | Condition search |
| **Array.Copy** | Duplicate |
| **Array.Resize** | Size change |

**Real programs যা বানাতে পারো:**
- Student marks system
- Cinema seat booking
- Shopping cart
- Tic-Tac-Toe board
- Top 3 ranking
- Class statistics
- Matrix operations

---

**পরের Module:** Methods & Functions — Code reuse করার জাদু!

---

*CPS Academy - Learn. Code. Grow.*
