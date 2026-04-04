---
title: "Lesson 2.5: Arithmetic Operators — যোগ, বিয়োগ, গুণ, ভাগ"
date: "2026-04-15"
excerpt: "যোগ, বিয়োগ, গুণ, ভাগ, ভাগশেষ, Integer Division, Operator Precedence, Calculator project"
categories:
  - C# Course Scripts
tags:
  - csharp
  - operators
  - arithmetic
  - calculator
draft: false
---

# Lesson 2.2: Arithmetic Operators — যোগ, বিয়োগ, গুণ, ভাগ

> **এই Lesson এ শিখবে:** + (যোগ), - (বিয়োগ), * (গুণ), / (ভাগ), % (ভাগশেষ), Integer Division trap ও solution, Operator Precedence, Bracket দিয়ে equation solve, এবং Complete Calculator project।

---

## যোগ করা: The + Operator

ধরো তুমি একটা চায়ের দোকান চালাও। সকালে 50 টাকা আয়, বিকালে 80 টাকা:

```csharp
int sokal = 50;
int bikal = 80;
int total = sokal + bikal;

Console.WriteLine($"Aj total income: {total} taka");  // 130
```

### পরীক্ষার নম্বর যোগ:

```csharp
int bangla = 75;
int english = 82;
int math = 90;
int science = 88;

int total = bangla + english + math + science;
Console.WriteLine($"Total marks: {total}");  // 335
```

### দোকানে জিনিস কেনা:

```csharp
int shirtPrice = 450;
int pantPrice = 650;
int shoesPrice = 1200;
int deliveryCharge = 60;

int totalBill = shirtPrice + pantPrice + shoesPrice + deliveryCharge;
Console.WriteLine($"Total bill: {totalBill} taka");  // 2360
```

### + দিয়ে text জোড়া দেওয়াও যায়:

```csharp
string firstName = "Rahim";
string lastName = "Uddin";

string fullName = firstName + " " + lastName;
Console.WriteLine(fullName);  // Rahim Uddin
```

---

## বিয়োগ করা: The - Operator

```csharp
int wallet = 1000;
int spent = 350;
int remaining = wallet - spent;

Console.WriteLine($"Wallet e baki: {remaining} taka");  // 650
```

### Negative আসতে পারে:

```csharp
int have = 500;
int need = 800;
int balance = have - need;

Console.WriteLine(balance);  // -300

if (balance < 0)
    Console.WriteLine($"Aro {-balance} taka lagbe!");
```

---

## গুণ করা: The * Operator

⚠️ গুণের চিহ্ন `×` না, `*` (asterisk)!

```csharp
int productPrice = 250;
int quantity = 4;
int total = productPrice * quantity;

Console.WriteLine($"Total: {total} taka");  // 1000
```

### Area বের করা:

```csharp
int length = 12;
int width = 8;
int area = length * width;

Console.WriteLine($"Area: {area} sq meter");  // 96
```

---

## ভাগ করা: The / Operator

```csharp
int totalMarks = 450;
int subjects = 5;
int average = totalMarks / subjects;

Console.WriteLine($"Average: {average}");  // 90
```

### ⚠️ 0 দিয়ে ভাগ করো না!

```csharp
int a = 10;
int b = 0;
// int result = a / b;  // 💥 CRASH! DivideByZeroException!
```

---

## ⚠️ Integer Division: সবচেয়ে বড় Trap!

এইখানে **বিশাল trap** আছে। মনোযোগ দিয়ে পড়ো।

500 টাকা 3 জনে ভাগ:

```csharp
int totalBill = 500;
int friends = 3;
int perPerson = totalBill / friends;

Console.WriteLine(perPerson);  // 166 😱
```

500 ÷ 3 = 166.666... হওয়ার কথা, কিন্তু output 166!

**কেন?** দুইটা `int` ভাগ করলে result ও `int` হয়। দশমিক **ফেলে দেয়**!

### আরো দেখো:

```csharp
Console.WriteLine(7 / 2);    // 3 (3.5 না!)
Console.WriteLine(10 / 3);   // 3 (3.33 না!)
Console.WriteLine(1 / 2);    // 0 (0.5 না!)
Console.WriteLine(99 / 100); // 0 (0.99 না! 😱)
```

### Solution: অন্তত একটাকে double বানাও

**উপায় 1: double variable:**

```csharp
double totalBill = 500;
double friends = 3;
double perPerson = totalBill / friends;

Console.WriteLine(perPerson);  // 166.66666666666666 ✅
```

**উপায় 2: Explicit casting:**

```csharp
int totalBill = 500;
int friends = 3;
double perPerson = (double)totalBill / friends;

Console.WriteLine(perPerson);  // 166.66666666666666 ✅
```

**উপায় 3: .0 দিলেই হবে:**

```csharp
double perPerson = totalBill / 3.0;  // ✅
```

### Percentage বের করা — সবচেয়ে common ভুল:

```csharp
int obtained = 450;
int total = 500;

// ❌ ভুল! 450/500 = 0 (integer), 0*100 = 0
int wrong = obtained / total * 100;
Console.WriteLine(wrong);  // 0 😱

// ✅ সঠিক!
double percentage = (double)obtained / total * 100;
Console.WriteLine(percentage);  // 90 ✅
```

### Average বের করা:

```csharp
int a = 10, b = 20, c = 25;

// ❌ int / int = int
int wrongAvg = (a + b + c) / 3;  // 18

// ✅ casting
double correctAvg = (double)(a + b + c) / 3;  // 18.333...
```

> **Golden Rule:** যখনই ভাগ করবে এবং দশমিক দরকার, কমপক্ষে **একটাকে double বানাও**।

---

## ভাগশেষ: The % Operator (Modulus)

ভাগ করার পর **যা বাকি থাকে** সেটা দেয়:

```csharp
int chocolates = 7;
int friends = 3;

int each = chocolates / friends;      // 2 (প্রত্যেকে পাবে)
int remaining = chocolates % friends; // 1 (বাকি থাকবে)

Console.WriteLine($"Each: {each}, Remaining: {remaining}");
```

### জোড়-বিজোড় check:

```csharp
int number = 15;

if (number % 2 == 0)
    Console.WriteLine("Even (জোড়)");
else
    Console.WriteLine("Odd (বিজোড়)");
// Output: Odd (বিজোড়)
```

### সেকেন্ড থেকে মিনিট-সেকেন্ড:

```csharp
int totalSeconds = 185;

int minutes = totalSeconds / 60;   // 3
int seconds = totalSeconds % 60;   // 5

Console.WriteLine($"{minutes} min {seconds} sec");  // 3 min 5 sec
```

### 3 দিয়ে বিভাজ্য কিনা:

```csharp
int num = 15;

if (num % 3 == 0)
    Console.WriteLine($"{num} is divisible by 3");  // ✅
```

---

## Operator Precedence — কে আগে হবে?

গণিতের BODMAS মনে আছে? C# এও same:

```csharp
int result = 10 + 5 * 2;
Console.WriteLine(result);  // 20 (15 না!)
```

**গুণ-ভাগ আগে, যোগ-বিয়োগ পরে!**

| Priority | Operators |
|----------|-----------|
| 1 (আগে) | `*` `/` `%` |
| 2 (পরে) | `+` `-` |

### Bracket দিয়ে নিয়ন্ত্রণ করো:

```csharp
int a = 10 + 5 * 2;       // 20 (গুণ আগে)
int b = (10 + 5) * 2;     // 30 (bracket আগে!)

Console.WriteLine(a);  // 20
Console.WriteLine(b);  // 30
```

### Equation solve:

```csharp
// Temperature: Fahrenheit to Celsius
// C = (F - 32) × 5/9
double fahrenheit = 98.6;
double celsius = (fahrenheit - 32) * 5.0 / 9;
Console.WriteLine($"{fahrenheit}°F = {celsius:F2}°C");  // 37.00°C

// CGPA to Percentage (approximate)
double cgpa = 3.75;
double percentage = (cgpa - 0.5) * 25;
Console.WriteLine($"CGPA {cgpa} = {percentage}%");  // 81.25%
```

> **Confused হলে bracket দাও!** ভুল হওয়ার chance কমে।

---

## Quick Reference Table

| Operator | নাম | কাজ | Example | Result |
|----------|-----|-----|---------|--------|
| `+` | Addition | যোগ | `10 + 3` | 13 |
| `-` | Subtraction | বিয়োগ | `10 - 3` | 7 |
| `*` | Multiplication | গুণ | `10 * 3` | 30 |
| `/` | Division | ভাগ | `10 / 3` | 3 (int) |
| `%` | Modulus | ভাগশেষ | `10 % 3` | 1 |

---

## Common Mistakes

### Mistake 1: Integer Division ভুলে যাওয়া

```csharp
int a = 1;
int b = 2;
Console.WriteLine(a / b);  // 0 (0.5 না!)
```

### Mistake 2: × লেখা

```csharp
int result = 5 × 3;  // ❌ Error!
int result = 5 * 3;  // ✅
```

### Mistake 3: 0 দিয়ে ভাগ

```csharp
int result = 10 / 0;  // 💥 Crash!
// আগে check করো: if (b != 0)
```

### Mistake 4: Precedence না জানা

```csharp
int wrong = 10 + 5 * 2;   // 20 (15 মনে করলে ভুল)
int right = (10 + 5) * 2; // 30
```

---

## Summary

| Concept | মানে |
|---------|------|
| `+` `-` `*` `/` | Basic math |
| `%` | ভাগশেষ (জোড়-বিজোড়, time convert) |
| Integer Division | int / int = int (দশমিক হারায়) |
| Solution | (double) casting করো |
| Precedence | `* / %` আগে, `+ -` পরে |
| Bracket | Precedence override করে |

**মনে রাখো:**
- দশমিক চাইলে অন্তত একটাকে double বানাও
- Confused হলে **bracket** দাও
- **0 দিয়ে ভাগ করো না**
- গুণের চিহ্ন `*`, `×` না

---

**পরের Lesson:** Assignment Operators — +=, -=, ++, -- দিয়ে shortcut এ value update করা।

---

*CPS Academy - Learn. Code. Grow.*
