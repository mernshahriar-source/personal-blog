---
title: "Lesson 3.2: সব Type এর Input নেওয়া"
date: "2026-04-26"
excerpt: "int.Parse, double.Parse, char input, multiple inputs এবং Complete Student Registration example"
categories:
  - C# Course Scripts
tags:
  - csharp
  - input
  - parse
  - console
draft: false
---

# Lesson 3.2: সব Type এর Input নেওয়া

> **এই Lesson এ শিখবে:** string input, int input (int.Parse), double input (double.Parse), char input, bool input, multiple inputs একসাথে, এবং Complete Student Registration example।

---

## string Input — সবচেয়ে সহজ

Console.ReadLine() নিজেই string দেয়, তাই আলাদা কিছু করতে হয় না:

```csharp
Console.Write("Enter your name: ");
string name = Console.ReadLine();

Console.WriteLine($"Hello, {name}!");
```

---

## int Input — int.Parse()

ReadLine() string দেয়, তাই Parse করতে হয়:

```csharp
Console.Write("Enter your age: ");
int age = int.Parse(Console.ReadLine());

Console.WriteLine($"Next year you'll be {age + 1}");
```

**কী হচ্ছে step by step:**

```
Console.ReadLine()       → "25" (string)
int.Parse("25")          → 25 (int)
age = 25
```

---

## double Input — double.Parse()

```csharp
Console.Write("Enter price: ");
double price = double.Parse(Console.ReadLine());

Console.Write("Enter quantity: ");
int qty = int.Parse(Console.ReadLine());

double total = price * qty;
Console.WriteLine($"Total: {total:F2} tk");
```

---

## char Input — প্রথম character নাও

```csharp
Console.Write("Enter grade (A/B/C/D/F): ");
char grade = Console.ReadLine()[0];  // প্রথম character

Console.WriteLine($"Your grade: {grade}");
```

`[0]` মানে string এর **প্রথম character** নাও।

---

## Multiple Inputs — একসাথে অনেক কিছু নেওয়া

```csharp
Console.Write("Enter name: ");
string name = Console.ReadLine();

Console.Write("Enter age: ");
int age = int.Parse(Console.ReadLine());

Console.Write("Enter CGPA: ");
double cgpa = double.Parse(Console.ReadLine());

Console.Write("Enter blood group (first letter): ");
char bloodGroup = Console.ReadLine()[0];

Console.WriteLine("\n--- Your Info ---");
Console.WriteLine($"Name: {name}");
Console.WriteLine($"Age: {age}");
Console.WriteLine($"CGPA: {cgpa}");
Console.WriteLine($"Blood Group: {bloodGroup}");
```

---

## Complete Example: Student Registration

```csharp
Console.WriteLine("╔══════════════════════════════╗");
Console.WriteLine("║   📋 STUDENT REGISTRATION    ║");
Console.WriteLine("╚══════════════════════════════╝\n");

Console.Write("Full Name: ");
string fullName = Console.ReadLine();

Console.Write("Roll Number: ");
int roll = int.Parse(Console.ReadLine());

Console.Write("Age: ");
int age = int.Parse(Console.ReadLine());

Console.Write("CGPA: ");
double cgpa = double.Parse(Console.ReadLine());

Console.Write("Department (CSE/EEE/BBA): ");
string dept = Console.ReadLine();

// Display
Console.WriteLine("\n╔══════════════════════════════╗");
Console.WriteLine("║     ✅ REGISTRATION DONE     ║");
Console.WriteLine("╠══════════════════════════════╣");
Console.WriteLine($"║  Name: {fullName,-20} ║");
Console.WriteLine($"║  Roll: {roll,-20} ║");
Console.WriteLine($"║  Age:  {age,-20} ║");
Console.WriteLine($"║  CGPA: {cgpa,-20:F2} ║");
Console.WriteLine($"║  Dept: {dept,-20} ║");
Console.WriteLine("╚══════════════════════════════╝");
```

---

## Common Mistakes

### Mistake 1: Parse ভুলে যাওয়া

```csharp
Console.Write("Age: ");
int age = Console.ReadLine();  // ❌ string কে int এ রাখতে পারবে না!

int age = int.Parse(Console.ReadLine());  // ✅
```

### Mistake 2: double এ int.Parse use করা

```csharp
Console.Write("Price: ");
int price = int.Parse(Console.ReadLine());  // User "99.50" দিলে 💥 crash!

double price = double.Parse(Console.ReadLine());  // ✅
```

### Mistake 3: User ভুল input দিলে crash

```csharp
Console.Write("Age: ");
int age = int.Parse(Console.ReadLine());  // User "hello" দিলে 💥 crash!

// এটা পরের lesson এ solve করবো — TryParse দিয়ে!
```

---

## Quick Reference

| নিতে চাই | কীভাবে |
|----------|--------|
| string | `Console.ReadLine()` |
| int | `int.Parse(Console.ReadLine())` |
| double | `double.Parse(Console.ReadLine())` |
| char | `Console.ReadLine()[0]` |

---

**পরের Lesson:** Input Validation — User ভুল input দিলে crash না করে সুন্দর করে handle করা।

---

*CPS Academy - Learn. Code. Grow.*
