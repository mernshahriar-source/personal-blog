---
title: "Lesson 2.9: Type Casting & Overflow — এক Type থেকে অন্য Type"
date: "2026-04-19"
excerpt: "Implicit Casting, Explicit Casting, Data loss, Overflow, Underflow, checked keyword"
categories:
  - C# Course Scripts
tags:
  - csharp
  - type-casting
  - overflow
  - implicit
  - explicit
draft: false
---

# Lesson 2.6: Type Casting & Overflow — এক Type থেকে অন্য Type

> **এই Lesson এ শিখবে:** Type Casting কী, Implicit Casting (ছোট→বড়, auto), Explicit Casting (বড়→ছোট, manual), Data loss, Overflow কী ও কেন dangerous, Underflow, checked keyword, এবং সঠিক type choose করা।

---

## Type Casting কী?

এক type এর data কে অন্য type এ পরিবর্তন করা।

ধরো তোমার int আছে, কিন্তু double দরকার:

```csharp
int wholeNumber = 10;
double decimalNumber = wholeNumber;  // int → double

Console.WriteLine(decimalNumber);  // 10
```

---

## দুই ধরনের Casting

### 1. Implicit Casting — নিজে নিজে হয়ে যায়

**ছোট বাক্স থেকে বড় বাক্সে** — কিছু হারায় না, auto হয়:

```csharp
int myInt = 100;
double myDouble = myInt;  // নিজে নিজে!

Console.WriteLine(myDouble);  // 100
```

**Implicit chain:**

```
byte → short → int → long → float → double
```

বাম থেকে ডানে automatic হয়:

```csharp
byte small = 25;
int medium = small;       // byte → int ✅
long big = medium;        // int → long ✅
double huge = big;        // long → double ✅

Console.WriteLine(huge);  // 25
```

### 2. Explicit Casting — তোমাকে বলতে হবে

**বড় বাক্স থেকে ছোট বাক্সে** — কিছু হারাতে পারে! C# নিজে করে না, তোমাকে explicitly বলতে হয়:

```csharp
double myDouble = 9.78;
int myInt = (int)myDouble;  // (int) দিয়ে বললাম

Console.WriteLine(myInt);  // 9 (দশমিক .78 গেলো! 😱)
```

**কীভাবে করে?** যে type এ নিতে চাও bracket এ লেখো:

```csharp
double price = 150.75;
int roundedPrice = (int)price;  // 150

float percentage = 85.5f;
int wholePercent = (int)percentage;  // 85
```

---

## কখন কী হয়

| From | To | Type | কী হয় |
|------|-----|------|--------|
| int → double | Implicit | নিজে হয়, কিছু হারায় না |
| int → long | Implicit | নিজে হয়, কিছু হারায় না |
| double → int | **Explicit** | দশমিক হারায় |
| long → int | **Explicit** | বড় number হলে ভুল হতে পারে |
| float → int | **Explicit** | দশমিক হারায় |

---

## ⚠️ সাবধান! Data হারিয়ে যেতে পারে

### দশমিক হারানো:

```csharp
double gpa = 3.87;
int roundedGpa = (int)gpa;

Console.WriteLine(roundedGpa);  // 3 😱 (.87 উধাও!)
```

---

## Overflow — Range এর বাইরে গেলে

### Overflow কী?

Number তার type এর range এর বাইরে গেলে **উল্টাপাল্টা value** আসে:

```csharp
int bigValue = 300;
byte smallValue = (byte)bigValue;

Console.WriteLine(smallValue);  // 44 😱
```

byte range 0-255। 300 এর মধ্যে 256 বাদ দিয়ে বাকি 44 রাখলো!

### আরো Overflow examples:

```csharp
// byte overflow
byte b = 255;  // maximum
b = (byte)(b + 1);
Console.WriteLine(b);  // 0 😱 (আবার শুরু!)

// short overflow
short s = 32767;  // maximum
s = (short)(s + 1);
Console.WriteLine(s);  // -32768 😱 (minimum এ চলে গেলো!)

// int overflow
int i = int.MaxValue;  // 2147483647
i = i + 1;
Console.WriteLine(i);  // -2147483648 (minimum!)
```

### Overflow কেন Dangerous?

```csharp
short balance = 32000;
short deposit = 1000;
short newBalance = (short)(balance + deposit);

Console.WriteLine($"New balance: {newBalance}");  // -32536 😱😱😱
```

33,000 টাকা থাকার কথা, দেখাচ্ছে -32,536!

---

## Overflow থেকে বাঁচার উপায়

### উপায় 1: বড় type use করো

```csharp
int balance = 32000;  // short না, int!
int deposit = 1000;
int newBalance = balance + deposit;

Console.WriteLine(newBalance);  // 33000 ✅
```

### উপায় 2: checked keyword

```csharp
byte b = 255;

// Normal — চুপচাপ overflow
byte result1 = (byte)(b + 1);  // 0

// Checked — error দেবে!
try
{
    byte result2 = checked((byte)(b + 1));  // 💥 Exception!
}
catch (OverflowException)
{
    Console.WriteLine("Overflow hoyeche!");
}
```

### উপায় 3: আগে check করো

```csharp
int value = 300;

if (value >= 0 && value <= 255)
{
    byte b = (byte)value;  // safe!
}
else
{
    Console.WriteLine("Eta byte e dhorbena!");
}
```

---

## Underflow — উল্টা দিকে

Minimum এর নিচে গেলে maximum এ চলে যায়:

```csharp
byte b = 0;
b = (byte)(b - 1);
Console.WriteLine(b);  // 255 (maximum!)

short s = -32768;  // minimum
s = (short)(s - 1);
Console.WriteLine(s);  // 32767 (maximum!)
```

| Situation | কী হয় |
|-----------|--------|
| Maximum + 1 | Minimum এ যায় |
| Minimum - 1 | Maximum এ যায় |

---

## Real Life Example: Percentage

```csharp
int obtained = 450;
int total = 500;

// ❌ Integer division!
int wrong = obtained / total * 100;  // 0!

// ✅ Casting!
double percentage = (double)obtained / total * 100;  // 90 ✅
```

## Real Life Example: Average

```csharp
int a = 10, b = 20, c = 25;

// ❌ int / int
int wrongAvg = (a + b + c) / 3;  // 18

// ✅ casting
double correctAvg = (double)(a + b + c) / 3;  // 18.333...
```

---

## Summary

| Concept | মানে |
|---------|------|
| Implicit | ছোট → বড়, auto হয় |
| Explicit | বড় → ছোট, `(type)` দিতে হয় |
| Data loss | দশমিক হারায় |
| Overflow | Range বাইরে, উল্টাপাল্টা value |
| checked | Overflow হলে error দেয় |

**Golden Rule:** সবসময় এমন type choose করো যেটা data আরামসে ধরতে পারে। সন্দেহ হলে **বড় type নাও**।

---

**পরের Lesson:** String ↔ Number Conversion — Parse, TryParse, Convert, ToString।

---

*CPS Academy - Learn. Code. Grow.*
