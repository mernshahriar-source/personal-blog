---
title: "Lesson 2.12: Assignment 1 Solution — Simple Calculator"
date: "2026-04-22"
excerpt: "দুইটা number নিয়ে +, -, *, /, % সব result দেখানো, 0 দিয়ে ভাগ handle করা"
categories:
  - C# Course Scripts
tags:
  - csharp
  - assignment
  - calculator
  - practice
draft: false
---

# Lesson 2.12: Assignment 1 Solution — Simple Calculator

> **Assignment:** দুইটা number নাও, তারপর +, -, *, /, % সব result দেখাও। 0 দিয়ে ভাগ handle করো।

---

## Solution

```csharp
// দুইটা number
double num1 = 24;
double num2 = 7;

// সব calculation
double sum = num1 + num2;
double difference = num1 - num2;
double product = num1 * num2;
double remainder = num1 % num2;

Console.WriteLine("🧮 SIMPLE CALCULATOR");
Console.WriteLine("════════════════════════════════");
Console.WriteLine($"  Number 1: {num1}");
Console.WriteLine($"  Number 2: {num2}");
Console.WriteLine("════════════════════════════════");
Console.WriteLine($"  {num1} + {num2} = {sum}");
Console.WriteLine($"  {num1} - {num2} = {difference}");
Console.WriteLine($"  {num1} × {num2} = {product}");
Console.WriteLine($"  {num1} % {num2} = {remainder}");

// ভাগ
double quotient = num1 / num2;
Console.WriteLine($"  {num1} ÷ {num2} = {quotient:F2}");

Console.WriteLine("════════════════════════════════");
Console.WriteLine();
Console.WriteLine("⚠️ Note: num2 তে 0 দিলে program crash করবে!");
Console.WriteLine("   এটা পরে Conditionals module এ handle করা শিখবো।");
```

---

## Output

```
🧮 SIMPLE CALCULATOR
════════════════════════════════
  Number 1: 24
  Number 2: 7
════════════════════════════════
  24 + 7 = 31
  24 - 7 = 17
  24 × 7 = 168
  24 % 7 = 3
  24 ÷ 7 = 3.43
════════════════════════════════
```

---

## কী কী Use হলো

| Concept | কোথায় |
|---------|--------|
| double variable | num1, num2 |
| Arithmetic operators | +, -, *, /, % |
| String interpolation | $"" দিয়ে output |
| :F2 formatting | ভাগফল 2 decimal |

---

**পরের Lesson:** Assignment 2 Solution — Student Result Card।

---

*CPS Academy - Learn. Code. Grow.*
