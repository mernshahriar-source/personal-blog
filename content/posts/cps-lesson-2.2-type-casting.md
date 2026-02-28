---
title: "Lesson 2.2: Type Casting — Implicit ও Explicit"
date: "2026-03-08"
excerpt: "Type casting কী, implicit (automatic) casting, explicit (manual) casting, data loss কীভাবে হয়, overflow কী এবং কীভাবে বাঁচবে"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - variables
  - data-types
  - operators
draft: false
---


> **এই Lesson এ শিখবে:** Type casting কী, implicit (automatic) casting, explicit (manual) casting, data loss কীভাবে হয়, overflow কী এবং কীভাবে বাঁচবে।

---

## Type Casting কী?

ধরো তোমার কাছে একটা বালতি ভর্তি পানি আছে। এখন সেই পানি একটা বোতলে রাখতে চাও। কিন্তু বোতল ছোট, সব পানি ধরবে না। কিছু পানি ফেলে দিতে হবে।

Type casting ও অনেকটা এরকম। এক type এর data কে অন্য type এ convert করা। কখনো সহজে হয়, কখনো কিছু হারাতে হয়।

```csharp
int wholeNumber = 10;
double decimalNumber = wholeNumber;  // int থেকে double এ গেলো

Console.WriteLine(decimalNumber);  // 10
```

ধরো তোমার কাছে একটা `int` আছে, কিন্তু তোমার `double` দরকার। অথবা user থেকে input নিলে সেটা `string` আসে, কিন্তু তোমার `int` লাগবে। এই রকম situation এ type casting করতে হয়।

---

## দুই ধরনের Casting

### 1. Implicit Casting (নিজে নিজে হয়ে যায়)

ছোট বাক্স থেকে বড় বাক্সে জিনিস রাখা সহজ। কিছু হারায় না, সব ঢুকে যায়।

C# এও তাই। ছোট type থেকে বড় type এ গেলে automatically হয়ে যায়:

```csharp
int myInt = 100;
double myDouble = myInt;  // নিজে নিজে হয়ে গেলো!

Console.WriteLine(myDouble);  // 100
```

কোনো কিছু explicitly বলতে হয়নি। C# বুঝে গেছে যে int এর 100 কে double এ রাখা safe।

**Implicit casting এর chain:**

```
byte → short → int → long → float → double
```

বাম থেকে ডানে automatic হয়। মানে:
- `byte` থেকে `int` হবে ✓
- `int` থেকে `double` হবে ✓
- `int` থেকে `long` হবে ✓

```csharp
byte small = 25;
int medium = small;       // byte → int ✓
long big = medium;        // int → long ✓
double huge = big;        // long → double ✓

Console.WriteLine(huge);  // 25
```

সব automatically হয়ে গেলো, কোনো data ও হারায়নি।

### 2. Explicit Casting (তোমাকে বলতে হবে)

এবার উল্টা scenario। বড় বাক্স থেকে ছোট বাক্সে জিনিস রাখতে গেলে সব নাও ঢুকতে পারে। কিছু ফেলে দিতে হতে পারে।

C# এটা নিজে থেকে করে না। তোমাকে explicitly বলতে হবে — "হ্যাঁ, আমি জানি কিছু হারাতে পারে, তবুও করো।"

```csharp
double myDouble = 9.78;
int myInt = (int)myDouble;  // (int) দিয়ে বললাম - explicitly

Console.WriteLine(myInt);  // 9 (দশমিক অংশ গেলো!)
```

দেখো, 9.78 ছিল, 9 হয়ে গেলো। .78 হারিয়ে গেছে!

**কীভাবে করে?** যে type এ নিতে চাও, সেটা bracket এ লেখো:

```csharp
double price = 150.75;
int roundedPrice = (int)price;  // 150

float percentage = 85.5f;
int wholePercent = (int)percentage;  // 85

long bigNumber = 1000000;
int normalNumber = (int)bigNumber;  // 1000000 (যদি range এ থাকে)
```

---

## কখন কী হয়: একটা চার্ট

| From | To | Type | কী হয় |
|------|-----|------|--------|
| int | double | Implicit | নিজে হয়, কিছু হারায় না |
| int | long | Implicit | নিজে হয়, কিছু হারায় না |
| double | int | Explicit | দশমিক হারায় |
| long | int | Explicit | বড় number হলে ভুল হতে পারে |
| float | int | Explicit | দশমিক হারায় |

**সহজ নিয়ম:**
- ছোট → বড় = Implicit (safe, automatic) ✓
- বড় → ছোট = Explicit (risky, manual) ⚠️

---

## Real Life Examples

### Example 1: দাম calculate করা

```csharp
double itemPrice = 99.99;
int quantity = 3;

double total = itemPrice * quantity;  // 299.97

// টাকায় পয়সা রাখতে চাই না
int finalPrice = (int)total;

Console.WriteLine($"Total: {finalPrice} taka");  // 299
```

### Example 2: Percentage বের করা

```csharp
int obtained = 450;
int total = 500;

// int দিয়ে ভাগ করলে দশমিক হারায়
// তাই আগে double এ নিলাম
double percentage = (double)obtained / total * 100;

Console.WriteLine($"Percentage: {percentage}%");  // 90%
```

এখানে `(double)obtained` করলাম কেন? কারণ দুইটা int ভাগ করলে int আসে। 450/500 = 0 হয়ে যেতো! (এটা integer division — Lesson 2.4 এ আরো detail এ বলবো)

### Example 3: Average বের করা

```csharp
int num1 = 10;
int num2 = 20;
int num3 = 15;

// ভুল উপায় — integer division এ দশমিক হারাবে
int wrongAverage = (num1 + num2 + num3) / 3;
Console.WriteLine(wrongAverage);  // 15

// সঠিক উপায় — আগে double এ cast
double correctAverage = (double)(num1 + num2 + num3) / 3;
Console.WriteLine(correctAverage);  // 15
```

---

## সাবধান! Data হারিয়ে যেতে পারে

### দশমিক হারানো

```csharp
double gpa = 3.87;
int roundedGpa = (int)gpa;

Console.WriteLine(roundedGpa);  // 3 😱
```

3.87 থেকে 3 হয়ে গেলো! .87 উধাও। `(int)` cast শুধু দশমিক কেটে ফেলে, round করে না।

### Overflow — Range এর বাইরে গেলে

```csharp
int bigValue = 300;
byte smallValue = (byte)bigValue;

Console.WriteLine(smallValue);  // 44 😱
```

কী হলো? byte এর range 0-255। 300 এর মধ্যে 256 বাদ দিয়ে বাকি 44 রাখলো। এটা dangerous!

---

## Overflow বিস্তারিত

Overflow হলো যখন একটা number তার type এর range এর বাইরে চলে যায়।

ধরো তোমার কাছে একটা গাড়ির odometer আছে যেটা 999 পর্যন্ত দেখায়। 999 এর পর কী হবে? 000 তে ফিরে যাবে!

C# এও same জিনিস হয়:

```csharp
byte counter = 255;  // byte এর maximum
counter = (byte)(counter + 1);

Console.WriteLine(counter);  // 0 😱 (আবার শুরু থেকে!)
```

255 + 1 = 256 হওয়ার কথা, কিন্তু byte 256 ধরতে পারে না। তাই 0 তে ফিরে গেছে।

### আরো কিছু example

```csharp
// byte overflow
byte b = 250;
b = (byte)(b + 10);  // 250 + 10 = 260, but byte max 255
Console.WriteLine(b);  // 4 (260 - 256 = 4)

// short overflow
short s = 32767;  // short এর maximum
s = (short)(s + 1);
Console.WriteLine(s);  // -32768 😱 (minimum এ চলে গেলো!)

// int overflow (rare but possible)
int i = int.MaxValue;  // 2147483647
i = i + 1;
Console.WriteLine(i);  // -2147483648 (minimum!)
```

### Overflow কেন dangerous?

ধরো তুমি একটা bank application বানাচ্ছো:

```csharp
short balance = 32000;
short deposit = 1000;

short newBalance = (short)(balance + deposit);

Console.WriteLine($"New balance: {newBalance}");  // -32536 😱😱😱
```

Customer এর 33,000 টাকা থাকার কথা, কিন্তু দেখাচ্ছে -32,536! এই জন্য সঠিক type choose করা জরুরি।

### Overflow থেকে বাঁচার উপায়

**উপায় 1: বড় type use করো**

```csharp
// short এর বদলে int use করো
int balance = 32000;
int deposit = 1000;
int newBalance = balance + deposit;

Console.WriteLine(newBalance);  // 33000 ✓
```

**উপায় 2: checked keyword**

C# এ `checked` keyword দিলে overflow হলে error দেয়, চুপচাপ ভুল value দেয় না:

```csharp
byte b = 255;

// Normal - চুপচাপ overflow হবে
byte result1 = (byte)(b + 1);  // 0

// Checked - error দেবে!
try
{
    byte result2 = checked((byte)(b + 1));  // 💥 Exception!
}
catch (OverflowException)
{
    Console.WriteLine("Overflow hoyeche!");
}
```

**উপায় 3: আগে check করো**

```csharp
int value = 300;

if (value >= 0 && value <= 255)
{
    byte b = (byte)value;
    Console.WriteLine(b);
}
else
{
    Console.WriteLine("Eta byte e dhorbena!");
}
```

### Underflow ও আছে

Overflow এর উল্টা। Minimum এর নিচে গেলে maximum এ চলে যায়:

```csharp
byte b = 0;
b = (byte)(b - 1);  // 0 থেকে 1 কমালাম

Console.WriteLine(b);  // 255 (maximum এ চলে গেলো!)
```

### মনে রাখো

| Situation | কী হয় |
|-----------|--------|
| Maximum + 1 | Minimum এ যায় |
| Minimum - 1 | Maximum এ যায় |
| Range এর বাইরে cast | উল্টাপাল্টা value |

**Golden Rule:** সবসময় এমন type choose করো যেটা তোমার data আরামসে ধরতে পারে। সন্দেহ হলে বড় type নাও।

---

## Summary

| Topic | Key Point |
|-------|-----------|
| Implicit Casting | ছোট → বড় type, নিজে হয়ে যায়, safe |
| Explicit Casting | বড় → ছোট type, `(type)` দিয়ে করতে হয় |
| Data Loss | double → int এ দশমিক হারায় |
| Overflow | Range এর বাইরে গেলে উল্টাপাল্টা value আসে |
| checked | Overflow হলে error দেয়, silent ভুল আটকায় |

**মনে রাখো:**
- ছোট → বড় = safe (implicit)
- বড় → ছোট = risky (explicit)
- Overflow dangerous — সঠিক type বাছাই করো

---

**পরের Lesson:** String-Number Conversion — Parse(), TryParse(), Convert class, ToString()

---

*CPS Academy - Learn. Code. Grow.*
