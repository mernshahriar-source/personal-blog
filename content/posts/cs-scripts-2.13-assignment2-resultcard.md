---
title: "Lesson 2.13: Assignment 2 Solution — Student Result Card"
date: "2026-04-23"
excerpt: "Student এর name, roll, marks নিয়ে Total, average, percentage বের করে result card print"
categories:
  - C# Course Scripts
tags:
  - csharp
  - assignment
  - result-card
  - practice
draft: false
---

# Lesson 2.13: Assignment 2 Solution — Student Result Card

> **Assignment:** Student এর name, roll, আর ৩ subject এর marks নাও। Total, average, percentage বের করো আর result card print করো।

---

## Solution

```csharp
// Student info
string name = "Rahim Uddin";
int roll = 101;

// 3 subject marks
int bangla = 78;
int english = 85;
int math = 92;

// Calculations
int total = bangla + english + math;
double average = (double)total / 3;
double percentage = (double)total / 300 * 100;

// Result Card
Console.WriteLine("╔══════════════════════════════════╗");
Console.WriteLine("║        📋 RESULT CARD            ║");
Console.WriteLine("╠══════════════════════════════════╣");
Console.WriteLine($"║  Name:    {name,-22} ║");
Console.WriteLine($"║  Roll:    {roll,-22} ║");
Console.WriteLine("╠══════════════════════════════════╣");
Console.WriteLine($"║  Bangla:  {bangla,-22} ║");
Console.WriteLine($"║  English: {english,-22} ║");
Console.WriteLine($"║  Math:    {math,-22} ║");
Console.WriteLine("╠══════════════════════════════════╣");
Console.WriteLine($"║  Total:   {total}/300{"",-17} ║");
Console.WriteLine($"║  Average: {average,-22:F2} ║");
Console.WriteLine($"║  Percent: {percentage,-21:F2}% ║");
Console.WriteLine("╚══════════════════════════════════╝");
```

---

## Output

```
╔══════════════════════════════════╗
║        📋 RESULT CARD            ║
╠══════════════════════════════════╣
║  Name:    Rahim Uddin            ║
║  Roll:    101                    ║
╠══════════════════════════════════╣
║  Bangla:  78                     ║
║  English: 85                     ║
║  Math:    92                     ║
╠══════════════════════════════════╣
║  Total:   255/300                ║
║  Average: 85.00                  ║
║  Percent: 85.00%                 ║
╚══════════════════════════════════╝
```

---

## কী কী Use হলো

| Concept | কোথায় |
|---------|--------|
| string, int variables | name, roll, marks |
| Arithmetic (+, /, *) | total, average, percentage |
| (double) casting | integer division avoid |
| :F2 formatting | average, percentage |
| ,-22 alignment | table formatting |

---

**পরের Lesson:** Assignment 3 Solution — Shopping Bill with Discount।

---

*CPS Academy - Learn. Code. Grow.*
