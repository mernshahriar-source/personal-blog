---
title: "Lesson 4.5: switch Statement — Menu থেকে Select করা"
date: "2026-05-04"
excerpt: "switch syntax, break, default case, multiple cases, switch with string/char এবং Calculator example"
categories:
  - C# Course Scripts
tags:
  - csharp
  - switch
  - control-flow
  - menu
draft: false
---

# Lesson 4.5: switch Statement — Menu থেকে Select করা

> **এই Lesson এ শিখবে:** switch কেন দরকার (if-else vs switch), switch syntax, break কেন, default case, Multiple cases একসাথে, switch with string/char, এবং Calculator ও Day name examples।

---

## switch কেন দরকার?

ধরো restaurant এ গেলে। Menu:

```
1. Pizza
2. Burger
3. Pasta
4. Sandwich
```

তুমি বললে "3 নম্বর"। Waiter 3 নম্বর খুঁজে Pasta আনবে। 5 বললে "এই নম্বরে কিছু নেই!"

**switch ও exactly এভাবে কাজ করে!**

### if-else দিয়ে করলে — লম্বা!

```csharp
if (day == 1) Console.WriteLine("Saturday");
else if (day == 2) Console.WriteLine("Sunday");
else if (day == 3) Console.WriteLine("Monday");
// ... আরো 4 টা!
```

### switch দিয়ে — clean!

```csharp
switch (day)
{
    case 1: Console.WriteLine("Saturday"); break;
    case 2: Console.WriteLine("Sunday"); break;
    case 3: Console.WriteLine("Monday"); break;
    // ...
}
```

---

## switch Syntax

```csharp
switch (variable)
{
    case value1:
        // value1 হলে
        break;
    case value2:
        // value2 হলে
        break;
    default:
        // কোনোটাই না হলে
        break;
}
```

---

## Day Name Example

```csharp
int day = 3;

switch (day)
{
    case 1: Console.WriteLine("Saturday"); break;
    case 2: Console.WriteLine("Sunday"); break;
    case 3: Console.WriteLine("Monday"); break;
    case 4: Console.WriteLine("Tuesday"); break;
    case 5: Console.WriteLine("Wednesday"); break;
    case 6: Console.WriteLine("Thursday"); break;
    case 7: Console.WriteLine("Friday"); break;
    default: Console.WriteLine("Invalid day!"); break;
}
```

Output: `Monday`

---

## break কেন দিতে হয়?

`break` না দিলে C# **compile error** দেবে। প্রতিটা case এ break mandatory!

---

## default Case

কোনো case match না করলে:

```csharp
int option = 9;

switch (option)
{
    case 1: Console.WriteLine("Option 1"); break;
    case 2: Console.WriteLine("Option 2"); break;
    default: Console.WriteLine("❌ Invalid!"); break;
}
```

Output: `❌ Invalid!`

**default = else এর মতো — দেওয়া ভালো practice।**

---

## Multiple Cases একসাথে

```csharp
int month = 3;

switch (month)
{
    case 1: case 2:
        Console.WriteLine("❄️ Winter"); break;
    case 3: case 4:
        Console.WriteLine("🌸 Spring"); break;
    case 5: case 6: case 7: case 8:
        Console.WriteLine("☀️ Summer"); break;
    case 9: case 10:
        Console.WriteLine("🍂 Autumn"); break;
    case 11: case 12:
        Console.WriteLine("❄️ Winter"); break;
    default:
        Console.WriteLine("Invalid!"); break;
}
```

---

## switch with string

```csharp
Console.Write("Department (CSE/EEE/BBA): ");
string dept = Console.ReadLine().ToUpper();

switch (dept)
{
    case "CSE":
        Console.WriteLine("💻 Computer Science"); break;
    case "EEE":
        Console.WriteLine("⚡ Electrical Engineering"); break;
    case "BBA":
        Console.WriteLine("📊 Business Administration"); break;
    default:
        Console.WriteLine("❌ Unknown!"); break;
}
```

---

## switch with char

```csharp
Console.Write("Grade (A/B/C/D/F): ");
char grade = Console.ReadLine().ToUpper()[0];

switch (grade)
{
    case 'A': Console.WriteLine("🌟 Excellent!"); break;
    case 'B': Console.WriteLine("👍 Good!"); break;
    case 'C': Console.WriteLine("📝 Average"); break;
    case 'D': Console.WriteLine("⚠️ Below average"); break;
    case 'F': Console.WriteLine("❌ Failed!"); break;
    default: Console.WriteLine("Invalid grade!"); break;
}
```

---

## Calculator with Menu

```csharp
Console.WriteLine("🧮 CALCULATOR");
Console.WriteLine("1. Add  2. Subtract  3. Multiply  4. Divide");
Console.Write("Choice: ");
int choice = int.Parse(Console.ReadLine());

Console.Write("First number: ");
double a = double.Parse(Console.ReadLine());
Console.Write("Second number: ");
double b = double.Parse(Console.ReadLine());

switch (choice)
{
    case 1: Console.WriteLine($"{a} + {b} = {a + b}"); break;
    case 2: Console.WriteLine($"{a} - {b} = {a - b}"); break;
    case 3: Console.WriteLine($"{a} × {b} = {a * b}"); break;
    case 4: Console.WriteLine($"{a} ÷ {b} = {a / b:F2}"); break;
    default: Console.WriteLine("❌ Invalid choice!"); break;
}
```

---

## Common Mistakes

### Mistake 1: break ভুলে যাওয়া

```csharp
case 1:
    Console.WriteLine("One");
    // ❌ break নেই — compile error!
```

### Mistake 2: Variable দিয়ে case

```csharp
int x = 5;
case x:  // ❌ variable হয় না! constant লাগে
case 5:  // ✅
```

---

**পরের Lesson:** switch vs if-else ও switch Expression — কোনটা কখন, নতুন syntax।

---

*CPS Academy - Learn. Code. Grow.*
