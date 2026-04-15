---
title: "Lesson 3.4: Output Formatting — সুন্দর করে দেখানো"
date: "2026-04-28"
excerpt: "String Interpolation, decimal places, number formatting, alignment, padding ও box drawing দিয়ে সুন্দর output"
categories:
  - C# Course Scripts
tags:
  - csharp
  - formatting
  - string-interpolation
  - console
draft: false
---

# Lesson 3.4: Output Formatting — সুন্দর করে দেখানো

> **এই Lesson এ শিখবে:** String Interpolation ($""), Decimal places (:F2), Number formatting (:N2), Alignment (,-10 ,10), Padding, Console.Clear(), Console colors, এবং সুন্দর table বানানো।

---

## String Interpolation — $""

Variable এর value text এর মধ্যে বসাতে:

```csharp
string name = "Rahim";
int age = 25;

// ❌ পুরোনো way — + দিয়ে জোড়া
Console.WriteLine("Name: " + name + ", Age: " + age);

// ✅ Interpolation — সহজ!
Console.WriteLine($"Name: {name}, Age: {age}");
```

---

## Decimal Places — :F

```csharp
double pi = 3.14159265;

Console.WriteLine($"Default: {pi}");        // 3.14159265
Console.WriteLine($"2 decimal: {pi:F2}");   // 3.14
Console.WriteLine($"1 decimal: {pi:F1}");   // 3.1
Console.WriteLine($"0 decimal: {pi:F0}");   // 3
Console.WriteLine($"4 decimal: {pi:F4}");   // 3.1416
```

| Format | মানে | 3.14159 |
|--------|------|---------|
| `:F0` | 0 decimal | 3 |
| `:F1` | 1 decimal | 3.1 |
| `:F2` | 2 decimal | 3.14 |
| `:F4` | 4 decimal | 3.1416 |

---

## Number Formatting — :N (comma সহ)

```csharp
int population = 17000000;
double salary = 50000.50;

Console.WriteLine($"Population: {population:N0}");  // 17,000,000
Console.WriteLine($"Salary: {salary:N2}");           // 50,000.50
```

---

## Alignment — ডানে/বামে সাজানো

### Right align (,10):

```csharp
Console.WriteLine($"{"Name",10}: Rahim");
Console.WriteLine($"{"Age",10}: 25");
Console.WriteLine($"{"CGPA",10}: 3.75");
```

```
      Name: Rahim
       Age: 25
      CGPA: 3.75
```

### Left align (,-10):

```csharp
Console.WriteLine($"{"Name",-10}: Rahim");
Console.WriteLine($"{"Age",-10}: 25");
Console.WriteLine($"{"CGPA",-10}: 3.75");
```

```
Name      : Rahim
Age       : 25
CGPA      : 3.75
```

### Number alignment — table বানাতে:

```csharp
Console.WriteLine($"{"Item",-15} {"Price",8}");
Console.WriteLine($"{"──────────────",-15} {"────────",8}");
Console.WriteLine($"{"Shirt",-15} {450,8} tk");
Console.WriteLine($"{"Pants",-15} {1200,8} tk");
Console.WriteLine($"{"Shoes",-15} {2500,8} tk");
```

```
Item                Price
──────────────  ────────
Shirt                450 tk
Pants               1200 tk
Shoes               2500 tk
```

---

## PadLeft ও PadRight

```csharp
string id = "42";

Console.WriteLine(id.PadLeft(5, '0'));   // "00042"
Console.WriteLine(id.PadRight(5, '-'));  // "42---"
```

Invoice number, serial number বানাতে কাজে লাগে।

---

## Box Drawing — সুন্দর border

```csharp
Console.WriteLine("╔════════════════════════╗");
Console.WriteLine("║   🎉 WELCOME!          ║");
Console.WriteLine("╠════════════════════════╣");
Console.WriteLine("║   Name: Rahim          ║");
Console.WriteLine("║   Age:  25             ║");
Console.WriteLine("╚════════════════════════╝");
```

| Character | কোথায় |
|-----------|--------|
| `═` | Horizontal line |
| `║` | Vertical line |
| `╔ ╗` | Top corners |
| `╚ ╝` | Bottom corners |
| `╠ ╣` | Middle junction |

---

## Complete Example: Formatted Receipt

```csharp
string shopName = "CPS Store";
string item1 = "Laptop"; double price1 = 75000;
string item2 = "Mouse"; double price2 = 500;
string item3 = "Keyboard"; double price3 = 1200;
double total = price1 + price2 + price3;

Console.WriteLine($"╔══════════════════════════════════╗");
Console.WriteLine($"║   🏪 {shopName,-25} ║");
Console.WriteLine($"╠══════════════════════════════════╣");
Console.WriteLine($"║  {"Item",-15} {"Price",12} tk ║");
Console.WriteLine($"║  {"───────────",-15} {"────────────",12}  ║");
Console.WriteLine($"║  {item1,-15} {price1,12:N0} tk ║");
Console.WriteLine($"║  {item2,-15} {price2,12:N0} tk ║");
Console.WriteLine($"║  {item3,-15} {price3,12:N0} tk ║");
Console.WriteLine($"╠══════════════════════════════════╣");
Console.WriteLine($"║  {"TOTAL",-15} {total,12:N0} tk ║");
Console.WriteLine($"╚══════════════════════════════════╝");
```

---

## Quick Reference

| Format | কাজ | Example | Result |
|--------|-----|---------|--------|
| `:F2` | 2 decimal | `{3.14159:F2}` | 3.14 |
| `:N0` | Comma, no decimal | `{50000:N0}` | 50,000 |
| `:N2` | Comma + 2 decimal | `{50000.5:N2}` | 50,000.50 |
| `,-15` | Left align 15 chars | `{"hi",-15}` | "hi             " |
| `,10` | Right align 10 chars | `{"hi",10}` | "        hi" |

---

**পরের Lesson:** Practice & Assignments — Interactive programs বানাও!

---

*CPS Academy - Learn. Code. Grow.*
