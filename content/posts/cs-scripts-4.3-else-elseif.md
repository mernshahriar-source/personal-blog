---
title: "Lesson 4.3: else ও else if — নাহলে কী করবে?"
date: "2026-05-02"
excerpt: "else, else if, Grade system, order কেন important এবং আলাদা if vs else if পার্থক্য"
categories:
  - C# Course Scripts
tags:
  - csharp
  - else
  - else-if
  - grade-system
draft: false
---

# Lesson 4.3: else ও else if — নাহলে কী করবে?

> **এই Lesson এ শিখবে:** else — false হলে, else if — একাধিক শর্ত, Grade system বানানো, else if এর order কেন important, এবং if vs if-else if পার্থক্য।

---

## else — নাহলে

if condition false হলে কী করবে সেটা `else` দিয়ে বলো:

```csharp
int marks = 35;

if (marks >= 40)
{
    Console.WriteLine("✅ PASSED!");
}
else
{
    Console.WriteLine("❌ FAILED!");
}
```

Output: `❌ FAILED!`

**দুইটার মধ্যে একটাই চলবে — কখনো দুইটা না!**

---

## আরো else Examples

### Even/Odd:

```csharp
int number = 15;

if (number % 2 == 0)
{
    Console.WriteLine($"{number} is Even (জোড়)");
}
else
{
    Console.WriteLine($"{number} is Odd (বিজোড়)");
}
```

### Login:

```csharp
Console.Write("Enter password: ");
string input = Console.ReadLine();

if (input == "abc123")
{
    Console.WriteLine("✅ Login successful!");
}
else
{
    Console.WriteLine("❌ Wrong password!");
}
```

### Positive/Negative:

```csharp
int number = -5;

if (number >= 0)
{
    Console.WriteLine("Positive or Zero");
}
else
{
    Console.WriteLine("Negative");
}
```

---

## else if — একাধিক শর্ত

Pass/Fail না, **Grade** বের করতে চাই — A+, A, B, C, D, F — অনেকগুলো option!

```csharp
int marks = 75;

if (marks >= 80)
{
    Console.WriteLine("Grade: A+");
}
else if (marks >= 70)
{
    Console.WriteLine("Grade: A");
}
else if (marks >= 60)
{
    Console.WriteLine("Grade: B");
}
else if (marks >= 50)
{
    Console.WriteLine("Grade: C");
}
else if (marks >= 40)
{
    Console.WriteLine("Grade: D");
}
else
{
    Console.WriteLine("Grade: F (Fail)");
}
```

Output: `Grade: A`

---

## Flow কীভাবে কাজ করে?

```
marks = 75

marks >= 80? → না (75 < 80)
marks >= 70? → হ্যাঁ! → "A" print → DONE!
(বাকি সব skip!)
```

**উপর থেকে নিচে check হয়। প্রথম true পেলেই বাকি skip!**

---

## ⚠️ else if এর Order — অনেক Important!

### ❌ ভুল order:

```csharp
int marks = 85;

if (marks >= 40)
{
    Console.WriteLine("Grade: D");  // 85 >= 40 → true! এখানেই আটকে গেলো!
}
else if (marks >= 80)
{
    Console.WriteLine("Grade: A+");  // কখনো আসবে না!
}
```

Output: `Grade: D` — 85 marks পেয়ে D! 😱

### ✅ সঠিক order — বড় থেকে ছোট:

```csharp
if (marks >= 80) Console.WriteLine("A+");    // আগে বড়
else if (marks >= 70) Console.WriteLine("A");
else if (marks >= 60) Console.WriteLine("B");
else if (marks >= 40) Console.WriteLine("D"); // পরে ছোট
else Console.WriteLine("F");
```

---

## আলাদা if vs else if — Big Difference!

### আলাদা আলাদা if — সবগুলো check হয়:

```csharp
int marks = 85;

if (marks >= 80) Console.WriteLine("A+");  // ✅ চলবে
if (marks >= 70) Console.WriteLine("A");   // ✅ এটাও চলবে!
if (marks >= 60) Console.WriteLine("B");   // ✅ এটাও!
```

Output: `A+` `A` `B` — তিনটাই print! ❌

### else if — প্রথম match এ থামবে:

```csharp
int marks = 85;

if (marks >= 80) Console.WriteLine("A+");      // ✅ চলবে
else if (marks >= 70) Console.WriteLine("A");   // skip!
else if (marks >= 60) Console.WriteLine("B");   // skip!
```

Output: `A+` — শুধু একটাই! ✅

---

## Age Category:

```csharp
Console.Write("Enter age: ");
int age = int.Parse(Console.ReadLine());

if (age < 0)
{
    Console.WriteLine("❌ Invalid age!");
}
else if (age <= 12)
{
    Console.WriteLine("👶 Child");
}
else if (age <= 17)
{
    Console.WriteLine("🧑 Teenager");
}
else if (age <= 59)
{
    Console.WriteLine("🧔 Adult");
}
else
{
    Console.WriteLine("👴 Senior Citizen");
}
```

---

## Temperature Check:

```csharp
Console.Write("Temperature (°C): ");
double temp = double.Parse(Console.ReadLine());

if (temp >= 40)
    Console.WriteLine("🔥 Extreme heat!");
else if (temp >= 30)
    Console.WriteLine("☀️ Hot");
else if (temp >= 20)
    Console.WriteLine("🌤️ Pleasant");
else if (temp >= 10)
    Console.WriteLine("🌥️ Cool");
else
    Console.WriteLine("❄️ Cold!");
```

---

## Summary

```csharp
if (condition1)
{
    // condition1 true
}
else if (condition2)
{
    // 1 false, 2 true
}
else if (condition3)
{
    // 1,2 false, 3 true
}
else
{
    // সব false
}
```

**মনে রাখো:**
- `else` optional
- `else if` যত খুশি দেওয়া যায়
- **বড় condition আগে**, ছোট পরে (order matters!)
- প্রথম true → **বাকি skip**
- আলাদা `if` সব check করে, `else if` প্রথম match এ থামে

---

**পরের Lesson:** Nested if ও Ternary — if এর ভিতরে if, আর shortcut if-else।

---

*CPS Academy - Learn. Code. Grow.*
