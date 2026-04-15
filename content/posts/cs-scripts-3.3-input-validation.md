---
title: "Lesson 3.3: Input Validation — ভুল Input Handle করা"
date: "2026-04-27"
excerpt: "TryParse দিয়ে safe input নেওয়া — int.TryParse, double.TryParse এবং Parse vs TryParse পার্থক্য"
categories:
  - C# Course Scripts
tags:
  - csharp
  - tryparse
  - validation
  - input
draft: false
---

# Lesson 3.3: Input Validation — ভুল Input Handle করা

> **এই Lesson এ শিখবে:** Parse এর problem কী, TryParse কীভাবে কাজ করে, int.TryParse ও double.TryParse, ভুল input এ message দেখানো, এবং Safe input pattern।

---

## Parse এর Problem

User সবসময় ঠিক input দেবে না:

```csharp
Console.Write("Enter age: ");
int age = int.Parse(Console.ReadLine());

// User "hello" দিলে? 💥 CRASH!
// User "" (enter চাপলে)? 💥 CRASH!
// User "25.5" দিলে? 💥 CRASH! (int চেয়েছে, দশমিক দিয়েছে)
```

**Real application এ program crash করলে user চলে যাবে!**

---

## TryParse — Safe Way ✅

Parse করার চেষ্টা করে। পারলে value দেয়, না পারলে `false` দেয় — **crash করে না!**

```csharp
Console.Write("Enter age: ");
string input = Console.ReadLine();

bool success = int.TryParse(input, out int age);

if (success)
{
    Console.WriteLine($"Your age: {age}");
}
else
{
    Console.WriteLine("❌ Please enter a valid number!");
}
```

User "hello" দিলে: `❌ Please enter a valid number!`
User "25" দিলে: `Your age: 25`

---

## TryParse কীভাবে কাজ করে?

```csharp
int.TryParse(input, out int age)
```

| Part | কী করে |
|------|--------|
| `input` | যেটা convert করতে চাও |
| `out int age` | convert হলে result এখানে রাখবে |
| **return** | `true` (সফল) বা `false` (ব্যর্থ) |

```
input = "25"  → success = true,  age = 25
input = "abc" → success = false, age = 0
```

---

## Shorter Way

```csharp
Console.Write("Enter age: ");

if (int.TryParse(Console.ReadLine(), out int age))
{
    Console.WriteLine($"Your age: {age}");
}
else
{
    Console.WriteLine("❌ Valid number dao!");
}
```

---

## double.TryParse() — দশমিক এর জন্য

```csharp
Console.Write("Enter price: ");

if (double.TryParse(Console.ReadLine(), out double price))
{
    Console.WriteLine($"Price: {price:F2} tk");
}
else
{
    Console.WriteLine("❌ Valid price dao!");
}
```

---

## Complete Example: Safe Calculator

```csharp
Console.WriteLine("🧮 SAFE CALCULATOR\n");

Console.Write("First number: ");
if (!double.TryParse(Console.ReadLine(), out double num1))
{
    Console.WriteLine("❌ Valid number dao!");
    return;
}

Console.Write("Second number: ");
if (!double.TryParse(Console.ReadLine(), out double num2))
{
    Console.WriteLine("❌ Valid number dao!");
    return;
}

Console.WriteLine($"\n{num1} + {num2} = {num1 + num2}");
Console.WriteLine($"{num1} - {num2} = {num1 - num2}");
Console.WriteLine($"{num1} × {num2} = {num1 * num2}");
Console.WriteLine($"{num1} ÷ {num2} = {num1 / num2:F2}");
```

User ভুল দিলে crash না করে message দেখাবে!

---

## Parse vs TryParse

| Feature | Parse | TryParse |
|---------|-------|----------|
| ভুল input এ | 💥 Crash! | ❌ false দেয় |
| Return | value | bool (true/false) |
| Value কোথায় | return এ | `out` parameter এ |
| কখন use করবে | Input নিশ্চিত ঠিক | **User input এ সবসময়** |

**Rule:** User input নিলে **সবসময় TryParse** use করো!

---

## Common Mistakes

### Mistake 1: out ভুলে যাওয়া

```csharp
int.TryParse(input, int age);      // ❌ out নেই!
int.TryParse(input, out int age);  // ✅
```

### Mistake 2: Return value ignore করা

```csharp
int.TryParse(input, out int age);
Console.WriteLine(age);  // ❌ fail হলে 0 আসবে, জানবেও না!

// ✅ check করো
if (int.TryParse(input, out int age))
    Console.WriteLine(age);
```

---

**পরের Lesson:** Output Formatting — সুন্দর করে result দেখানো।

---

*CPS Academy - Learn. Code. Grow.*
