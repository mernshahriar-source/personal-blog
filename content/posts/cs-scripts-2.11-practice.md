---
title: "Lesson 2.11: Practice — Solved Examples"
date: "2026-04-21"
excerpt: "Variables, Data Types, Operators, Casting সব একসাথে apply করে ৪টা problem solve"
categories:
  - C# Course Scripts
tags:
  - csharp
  - practice
  - solved-examples
  - exercises
draft: false
---

# Lesson 2.11: Practice — Solved Examples

> **এই Lesson এ দেখবে:** এতদিন যা শিখেছো (Variables, Data Types, Operators, Casting) সব একসাথে apply করে ৪টা problem solve করা।

---

## Problem 1: Temperature Converter

**Fahrenheit থেকে Celsius convert করো।**

Formula: `C = (F - 32) × 5 / 9`

```csharp
double fahrenheit = 98.6;

double celsius = (fahrenheit - 32) * 5.0 / 9;

Console.WriteLine($"{fahrenheit}°F = {celsius:F2}°C");
```

Output:
```
98.6°F = 37.00°C
```

**কী কী use হলো:** double variable, arithmetic operators, `5.0` দিয়ে integer division avoid, `:F2` formatting।

---

## Problem 2: Percentage ও Grade

**৫ subject এর marks থেকে total, percentage আর grade বের করো।**

```csharp
int bangla = 75;
int english = 82;
int math = 90;
int science = 88;
int ict = 95;

int total = bangla + english + math + science + ict;
double percentage = (double)total / 500 * 100;

Console.WriteLine($"Total: {total}/500");
Console.WriteLine($"Percentage: {percentage:F2}%");
```

Output:
```
Total: 430/500
Percentage: 86.00%
```

**কী কী use হলো:** int variables, `+` operator, `(double)` casting, string interpolation, `:F2` formatting।

---

## Problem 3: দোকানের হিসাব

**৩টা জিনিসের দাম আর quantity দিয়ে total bill বের করো।**

```csharp
string item1 = "Shirt";
int price1 = 450;
int qty1 = 2;

string item2 = "Pants";
int price2 = 650;
int qty2 = 1;

string item3 = "Shoes";
int price3 = 1200;
int qty3 = 1;

int subtotal1 = price1 * qty1;
int subtotal2 = price2 * qty2;
int subtotal3 = price3 * qty3;

int totalBill = subtotal1 + subtotal2 + subtotal3;

Console.WriteLine("🛒 SHOPPING BILL");
Console.WriteLine("════════════════════════════════");
Console.WriteLine($"  {item1} × {qty1} = {subtotal1} tk");
Console.WriteLine($"  {item2} × {qty2} = {subtotal2} tk");
Console.WriteLine($"  {item3} × {qty3} = {subtotal3} tk");
Console.WriteLine("════════════════════════════════");
Console.WriteLine($"  Total: {totalBill} tk");
```

Output:
```
🛒 SHOPPING BILL
════════════════════════════════
  Shirt × 2 = 900 tk
  Pants × 1 = 650 tk
  Shoes × 1 = 1200 tk
════════════════════════════════
  Total: 2750 tk
```

**কী কী use হলো:** string ও int variables, `*` ও `+` operators, string interpolation।

---

## Problem 4: সময় Convert

**Total seconds থেকে hours, minutes, seconds আলাদা করো।**

```csharp
int totalSeconds = 3725;

int hours = totalSeconds / 3600;
int remaining = totalSeconds % 3600;
int minutes = remaining / 60;
int seconds = remaining % 60;

Console.WriteLine($"{totalSeconds} seconds = {hours}h {minutes}m {seconds}s");
```

Output:
```
3725 seconds = 1h 2m 5s
```

**কী কী use হলো:** int variables, `/` (ভাগ) ও `%` (ভাগশেষ) operators।

---

## কী শিখলাম?

এই ৪টা problem এ আমরা use করলাম:
- **Variables** — int, double, string
- **Arithmetic Operators** — +, -, *, /, %
- **Type Casting** — (double) দিয়ে integer division avoid
- **String Interpolation** — $"" দিয়ে output
- **Formatting** — :F2 দিয়ে decimal places

**এখন নিজে try করো — পরের ৩টা Assignment solve করো!**

---

**পরের Lesson:** Assignment 1 Solution — Simple Calculator।

---

*CPS Academy - Learn. Code. Grow.*
