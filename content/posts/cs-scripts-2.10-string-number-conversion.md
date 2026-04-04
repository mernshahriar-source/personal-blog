---
title: "Lesson 2.10: String ↔ Number Conversion — Parse, TryParse, Convert"
date: "2026-04-20"
excerpt: "int.Parse(), TryParse(), Convert class, Cast vs Convert পার্থক্য, ToString() ও formatting"
categories:
  - C# Course Scripts
tags:
  - csharp
  - parsing
  - conversion
  - tryparse
  - tostring
draft: false
---

# Lesson 2.7: String ↔ Number Conversion — Parse, TryParse, Convert

> **এই Lesson এ শিখবে:** কেন conversion দরকার, int.Parse() ও double.Parse(), Parse এর problem (crash!), TryParse() — safe way, Convert class, Cast vs Convert পার্থক্য, ToString() ও formatting, এবং Common Mistakes।

---

## কেন Conversion দরকার?

User থেকে input নিলে সেটা সবসময় **string** আসে:

```csharp
Console.Write("Tomar boyosh koto? ");
string input = Console.ReadLine();  // "25" — এটা string!

// input + 5 করলে কী হবে?
Console.WriteLine(input + 5);  // "255" 😱 (text জোড়া লাগলো!)
```

Number হিসেবে use করতে হলে **convert** করতে হবে।

---

## int.Parse() — String থেকে int

```csharp
string ageText = "25";
int age = int.Parse(ageText);

Console.WriteLine(age + 5);  // 30 ✅ (এবার যোগ হলো!)
```

### double.Parse() — String থেকে double

```csharp
string priceText = "99.50";
double price = double.Parse(priceText);

Console.WriteLine(price * 2);  // 199 ✅
```

### User Input এর সাথে:

```csharp
Console.Write("Tomar boyosh koto? ");
string input = Console.ReadLine();

int boyosh = int.Parse(input);

Console.WriteLine($"Asche bochor tomar boyosh hobe {boyosh + 1}");
```

---

## ⚠️ Parse এর Problem — Crash!

User ভুল input দিলে:

```csharp
string wrongInput = "hello";
int number = int.Parse(wrongInput);  // 💥 CRASH! FormatException!
```

Program crash করে ফেলবে! User কে trust করা যায় না।

---

## TryParse() — Safe উপায় ✅

Parse এর safe version। ভুল input দিলেও **crash করে না**:

```csharp
string input = "hello";

bool success = int.TryParse(input, out int number);

if (success)
{
    Console.WriteLine($"Number: {number}");
}
else
{
    Console.WriteLine("Eta number na!");
}
```

Output: `Eta number na!`

### Real Example:

```csharp
Console.Write("Ekta number dao: ");
string input = Console.ReadLine();

if (int.TryParse(input, out int number))
{
    Console.WriteLine($"Tumi diyecho: {number}");
    Console.WriteLine($"Duigon: {number * 2}");
}
else
{
    Console.WriteLine("Vai, eta to number na! Abar try koro.");
}
```

User যাই দিক, **program crash করবে না!**

### double.TryParse() ও আছে:

```csharp
Console.Write("Price dao: ");
string input = Console.ReadLine();

if (double.TryParse(input, out double price))
{
    Console.WriteLine($"Price: {price} tk");
}
else
{
    Console.WriteLine("Valid price dao!");
}
```

---

## Convert Class

আরেকটা উপায় — `Convert` class:

```csharp
// String → int
string text = "100";
int number = Convert.ToInt32(text);

// String → double
string priceText = "99.99";
double price = Convert.ToDouble(priceText);

// int → string
int age = 25;
string ageText = Convert.ToString(age);

// double → int (Round করে!)
double gpa = 3.87;
int rounded = Convert.ToInt32(gpa);  // 4 ✅ (round!)
```

### Cast vs Convert — গুরুত্বপূর্ণ পার্থক্য!

```csharp
double value = 3.7;

int usingCast = (int)value;                // 3 (দশমিক কেটে ফেলে)
int usingConvert = Convert.ToInt32(value);  // 4 (Round করে!)
```

| Method | 3.2 হলে | 3.7 হলে | 3.5 হলে |
|--------|---------|---------|---------|
| `(int)` | 3 | 3 | 3 |
| `Convert.ToInt32()` | 3 | **4** | **4** |

**Cast কেটে ফেলে, Convert Round করে!**

---

## ToString() — যেকোনো কিছু থেকে String

```csharp
int age = 25;
string ageText = age.ToString();

double price = 99.99;
string priceText = price.ToString();

bool isActive = true;
string activeText = isActive.ToString();  // "True"
```

### Formatting সহ:

```csharp
double price = 1234.5678;

Console.WriteLine(price.ToString("F2"));   // 1234.57 (2 decimal)
Console.WriteLine(price.ToString("F0"));   // 1235 (0 decimal, rounded)
Console.WriteLine(price.ToString("N2"));   // 1,234.57 (comma সহ)
```

---

## Quick Summary Table

| কী করতে চাও | কীভাবে |
|-------------|--------|
| string → int | `int.Parse(text)` বা `int.TryParse()` |
| string → double | `double.Parse(text)` |
| int → double | শুধু assign করো (implicit) |
| double → int | `(int)value` (কাটে) বা `Convert.ToInt32()` (round) |
| যেকোনো → string | `.ToString()` |
| Safe convert | **`TryParse()`** ✅ |
| Round করে convert | `Convert.ToInt32()` |

---

## Common Mistakes

### Mistake 1: String + করে মনে করা যোগ হবে

```csharp
string a = "10";
string b = "20";

Console.WriteLine(a + b);  // "1020" (জোড়া লাগলো, যোগ হলো না!)

// আগে convert করো!
int num1 = int.Parse(a);
int num2 = int.Parse(b);
Console.WriteLine(num1 + num2);  // 30 ✅
```

### Mistake 2: Parse এ ভুল input

```csharp
// ❌ Crash!
int number = int.Parse("hello");

// ✅ Safe!
if (int.TryParse("hello", out int result))
    Console.WriteLine(result);
else
    Console.WriteLine("Invalid input");
```

### Mistake 3: Cast আর Convert গুলিয়ে ফেলা

```csharp
double salary = 50000.75;

int cut = (int)salary;              // 50000 (.75 কাটলো)
int rounded = Convert.ToInt32(salary); // 50001 (round করলো)
```

---

## Summary

| Method | কাজ | ভুল input এ |
|--------|-----|-------------|
| `int.Parse()` | String → int | 💥 Crash! |
| `int.TryParse()` | String → int (safe) | false return করে |
| `Convert.ToInt32()` | যেকোনো → int (round) | 💥 Crash! |
| `.ToString()` | যেকোনো → string | সবসময় কাজ করে |

**মনে রাখো:**
- User input সবসময় **string** আসে → Parse করতে হবে
- **TryParse()** সবচেয়ে safe
- `(int)` কাটে, `Convert.ToInt32()` **round** করে
- string + string = জোড়া লাগে, **যোগ না!**

---

**Module 2 Complete!** 🎉

---

*CPS Academy - Learn. Code. Grow.*
