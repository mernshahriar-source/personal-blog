---
title: "Lesson 3.5: Practice & Assignments — Interactive Programs"
date: "2026-04-29"
excerpt: "Calculator, Temperature Converter, BMI Calculator সহ Module 3 এর practice এবং নিজে solve করার Assignments"
categories:
  - C# Course Scripts
tags:
  - csharp
  - practice
  - assignments
  - interactive
draft: false
---

# Lesson 3.5: Practice & Assignments — Interactive Programs

> **এই Lesson এ দেখবে:** Module 3 এর সব concepts (Input, TryParse, Formatting) একসাথে apply করে interactive programs বানানো।

---

## Solved Example 1: Interactive Calculator

```csharp
Console.WriteLine("🧮 CALCULATOR\n");

Console.Write("First number: ");
double num1 = double.Parse(Console.ReadLine());

Console.Write("Second number: ");
double num2 = double.Parse(Console.ReadLine());

Console.WriteLine($"\n{"Operation",-15} {"Result",10}");
Console.WriteLine($"{"═══════════",-15} {"══════════",10}");
Console.WriteLine($"{num1 + " + " + num2,-15} {num1 + num2,10:F2}");
Console.WriteLine($"{num1 + " - " + num2,-15} {num1 - num2,10:F2}");
Console.WriteLine($"{num1 + " × " + num2,-15} {num1 * num2,10:F2}");
Console.WriteLine($"{num1 + " ÷ " + num2,-15} {num1 / num2,10:F2}");
```

---

## Solved Example 2: Temperature Converter

```csharp
Console.WriteLine("🌡️ TEMPERATURE CONVERTER\n");

Console.Write("Enter Fahrenheit: ");
double fahrenheit = double.Parse(Console.ReadLine());

double celsius = (fahrenheit - 32) * 5.0 / 9;

Console.WriteLine($"\n{fahrenheit:F1}°F = {celsius:F2}°C");
```

---

## Solved Example 3: BMI Calculator

```csharp
Console.WriteLine("⚖️ BMI CALCULATOR\n");

Console.Write("Enter weight (kg): ");
double weight = double.Parse(Console.ReadLine());

Console.Write("Enter height (m): ");
double height = double.Parse(Console.ReadLine());

double bmi = weight / (height * height);

Console.WriteLine($"\n╔══════════════════════════╗");
Console.WriteLine($"║  Weight: {weight,8:F1} kg       ║");
Console.WriteLine($"║  Height: {height,8:F2} m        ║");
Console.WriteLine($"║  BMI:    {bmi,8:F2}           ║");
Console.WriteLine($"╚══════════════════════════╝");
```

---

## Assignment 1: Student Registration Form

**তোমার কাজ:** User থেকে নাও — Name, Roll, Age, CGPA, Department। তারপর সুন্দর formatted registration card দেখাও।

**Hints:**
- Name → `Console.ReadLine()`
- Roll, Age → `int.Parse(Console.ReadLine())`
- CGPA → `double.Parse(Console.ReadLine())`
- Box drawing characters use করো

---

## Assignment 2: Shopping Bill Generator

**তোমার কাজ:** User থেকে নাও — ৩টা item এর name আর price। Quantity 1 ধরো। Subtotal, 10% discount, delivery 60 tk, grand total বের করো। Formatted bill print করো।

**Hints:**
- Item name → `Console.ReadLine()`
- Price → `double.Parse(Console.ReadLine())`
- Discount = subtotal * 10 / 100
- `:N2` দিয়ে comma সহ দেখাও

---

## Assignment 3: Electricity Bill Calculator

**তোমার কাজ:** User থেকে নাও — Customer name, previous meter reading, current reading। Unit = current - previous। Rate = 8.50 tk/unit। Bill বের করো।

**Hints:**
- Readings → `int.Parse(Console.ReadLine())`
- Unit = current - previous
- Bill = unit * 8.50
- Formatted output দেখাও

---

## Module 3 Complete! 🎉

**এই Module এ শিখলে:**
- Console.ReadLine() দিয়ে input নেওয়া
- int.Parse(), double.Parse() দিয়ে convert
- TryParse() দিয়ে safe input
- $"" interpolation, :F2, :N0, alignment দিয়ে formatting
- Interactive programs বানানো!

**পরের Module:** Conditionals — if, else, switch দিয়ে program কে decision নেওয়া শেখানো!

---

*CPS Academy - Learn. Code. Grow.*
