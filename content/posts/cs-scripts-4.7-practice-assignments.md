---
title: "Lesson 4.7: Practice & Assignments — Conditionals দিয়ে Real Programs"
date: "2026-05-06"
excerpt: "Student Result, Number Analyzer, Food Order সহ Module 4 এর practice ও নিজে solve করার Assignments"
categories:
  - C# Course Scripts
tags:
  - csharp
  - practice
  - assignments
  - conditionals
draft: false
---

# Lesson 4.7: Practice & Assignments

> **এই Lesson এ দেখবে:** Blog এর Complete Examples — Student Result, Number Analyzer, এবং নিজে solve করার Assignments।

---

## Solved Example 1: Student Result System

```csharp
Console.WriteLine("📝 STUDENT RESULT SYSTEM\n");

Console.Write("Enter student name: ");
string name = Console.ReadLine();

Console.Write("Enter marks (0-100): ");
int marks = int.Parse(Console.ReadLine());

// Grade
string grade;
if (marks >= 80) grade = "A+";
else if (marks >= 70) grade = "A";
else if (marks >= 60) grade = "B";
else if (marks >= 50) grade = "C";
else if (marks >= 40) grade = "D";
else grade = "F";

// Pass/Fail
string result = (marks >= 40) ? "PASSED ✅" : "FAILED ❌";

// Display
Console.WriteLine($"\n╔══════════════════════════════╗");
Console.WriteLine($"║  Name:   {name,-19} ║");
Console.WriteLine($"║  Marks:  {marks,-19} ║");
Console.WriteLine($"║  Grade:  {grade,-19} ║");
Console.WriteLine($"║  Status: {result,-19} ║");
Console.WriteLine($"╚══════════════════════════════╝");
```

---

## Solved Example 2: Number Analyzer

```csharp
Console.WriteLine("🔢 NUMBER ANALYZER\n");

Console.Write("Enter a number: ");
int number = int.Parse(Console.ReadLine());

Console.WriteLine($"\nAnalyzing {number}...\n");

// Positive/Negative/Zero
if (number > 0)
    Console.WriteLine("➕ POSITIVE number");
else if (number < 0)
    Console.WriteLine("➖ NEGATIVE number");
else
    Console.WriteLine("0️⃣ ZERO");

// Even/Odd (non-zero only)
if (number != 0)
{
    string type = (number % 2 == 0) ? "EVEN" : "ODD";
    Console.WriteLine($"🔢 {type} number");
}

// Divisibility
if (number % 5 == 0 && number != 0)
    Console.WriteLine("5️⃣ Divisible by 5");

if (number % 10 == 0 && number != 0)
    Console.WriteLine("🔟 Divisible by 10");

// Size
if (number >= -10 && number <= 10)
    Console.WriteLine("📏 SMALL number");
else if (number >= -100 && number <= 100)
    Console.WriteLine("📏 MEDIUM number");
else
    Console.WriteLine("📏 LARGE number");
```

---

## Solved Example 3: Food Order (switch)

```csharp
Console.WriteLine("🍕 FOOD ORDER\n");
Console.WriteLine("1. Pizza (350 tk)");
Console.WriteLine("2. Burger (250 tk)");
Console.WriteLine("3. Pasta (300 tk)");
Console.WriteLine("4. Sandwich (150 tk)");

Console.Write("\nChoice: ");
int choice = int.Parse(Console.ReadLine());

string item;
int price;

switch (choice)
{
    case 1: item = "Pizza"; price = 350; break;
    case 2: item = "Burger"; price = 250; break;
    case 3: item = "Pasta"; price = 300; break;
    case 4: item = "Sandwich"; price = 150; break;
    default:
        Console.WriteLine("❌ Invalid choice!");
        return;
}

Console.Write("Quantity: ");
int qty = int.Parse(Console.ReadLine());

int total = price * qty;
Console.WriteLine($"\n✅ {item} × {qty} = {total} tk");
```

---

## Assignment 1: Electricity Bill Calculator

**তোমার কাজ:** User থেকে units নাও। Slab rate:
- 0-100 units: 5 tk/unit
- 101-300: 8 tk/unit
- 300+: 12 tk/unit

Hint: else if দিয়ে slab check করো।

---

## Assignment 2: Simple ATM

**তোমার কাজ:** Balance 10000 tk। Menu (switch):
1. Check Balance
2. Deposit
3. Withdraw
4. Exit

Withdraw এ balance check করো (nested if)।

---

## Assignment 3: Month Days Finder

**তোমার কাজ:** User month number দেবে (1-12)। বলো কত দিন। Switch expression দিয়ে `or` use করো।

---

## Module 4 Complete! 🎉

**এই Module এ শিখলে:**
- bool থেকে decision — if
- else — নাহলে
- else if — একাধিক শর্ত, Grade system
- Nested if — ATM, Login+Permission
- Ternary (? :) — shortcut
- switch — fixed value match, menu
- switch expression — modern C# syntax

**পরের Module:** Loops — একই কাজ বারবার করানো!

---

*CPS Academy - Learn. Code. Grow.*
