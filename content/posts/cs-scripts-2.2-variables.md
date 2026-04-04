---
title: "Lesson 2.2: Variable কী — Data রাখার বাক্স"
date: "2026-04-12"
excerpt: "Variable কী ও কেন দরকার, Variable এর ৩ টা part, Naming Rules ও camelCase convention"
categories:
  - C# Course Scripts
tags:
  - csharp
  - variables
  - naming-conventions
  - camelcase
draft: false
---

# Lesson 2.1: Variable কী — Data রাখার বাক্স

> **এই Lesson এ শিখবে:** Variable কী ও কেন দরকার, Variable এর ৩ টা part (Type, Name, Value), Value change করা, Naming Rules ও camelCase convention, Meaningful নাম দেওয়া।

---

## Variable কী?

Variable হলো একটা **বাক্স**। এই বাক্সে তুমি কিছু রাখতে পারো।

ধরো তোমার একটা বাক্স আছে, নাম দিলে "boyosh"। এখন এই বাক্সে 25 রাখলে:

```csharp
int boyosh = 25;
```

এইটুকুই। একটা বাক্স বানালে, নাম দিলে "boyosh", আর তার মধ্যে 25 রেখে দিলে।

পরে যখন দরকার, বাক্সের নাম ধরে ডাকলেই হলো:

```csharp
Console.WriteLine(boyosh);  // 25 দেখাবে
```

---

## Variable এর তিনটা Part

```csharp
int boyosh = 25;
```

| Part | কী | Example |
|------|-----|---------|
| **Type** | বাক্সে কী ধরনের জিনিস রাখবে | int (number) |
| **Name** | বাক্সের নাম | boyosh |
| **Value** | বাক্সে কী রাখলে | 25 |

আরো কিছু example:

```csharp
string naam = "Rahim";      // text রাখার বাক্স
double price = 150.50;       // দশমিক number রাখার বাক্স
bool isActive = true;        // হ্যাঁ/না রাখার বাক্স
```

---

## Value পরে Change করা যায়

```csharp
int boyosh = 25;
Console.WriteLine(boyosh);  // 25

boyosh = 26;  // নতুন value দিলাম
Console.WriteLine(boyosh);  // 26

boyosh = 30;
Console.WriteLine(boyosh);  // 30
```

দেখো, আবার `int` লেখা লাগেনি। **একবার বাক্স বানালে** পরে শুধু value change করলেই হয়।

---

## Declare আর Initialize

```csharp
// Declare — শুধু বাক্স বানালাম (খালি)
int age;

// Initialize — বাক্সে value রাখলাম
age = 25;

// দুইটা একসাথেও করা যায়
int score = 100;
```

---

## নাম দেওয়ার নিয়ম (Naming)

### Rules — যা করতেই হবে:

```csharp
int age;            // ✅ letter দিয়ে শুরু
int _count;         // ✅ underscore দিয়ে শুরু
string firstName;   // ✅

int 1stPlace;       // ❌ number দিয়ে শুরু — Error!
int my age;         // ❌ space — Error!
int my-age;         // ❌ special character — Error!
```

### camelCase — C# এর style:

প্রথম word ছোট হাতের, পরের word এর প্রথম letter বড়:

```csharp
int studentCount;
string firstName;
double totalPrice;
bool isLoggedIn;
```

### Meaningful নাম দাও:

```csharp
// ❌ কী বুঝলে?
int x = 25;
string s = "Rahim";
bool b = true;

// ✅ এখন বোঝা যাচ্ছে
int studentAge = 25;
string studentName = "Rahim";
bool isEnrolled = true;
```

তুমি নিজে ৬ মাস পর code দেখলে বুঝতে পারবে কী লিখেছিলে!

---

## Common Mistakes

### Mistake 1: আবার type লেখা

```csharp
int age = 25;
int age = 30;  // ❌ Error! age already আছে

age = 30;      // ✅ শুধু value change করো
```

### Mistake 2: Number দিয়ে নাম শুরু

```csharp
int 1stStudent;  // ❌ Error!
int firstStudent; // ✅
```

### Mistake 3: Declare করে value না দিয়ে use করা

```csharp
int age;
Console.WriteLine(age);  // ❌ Error! value দাওনি!

int age = 0;
Console.WriteLine(age);  // ✅
```

---

## Summary

| জিনিস | মানে |
|-------|------|
| Variable | data রাখার বাক্স |
| Type | বাক্সের ধরন (int, string, etc.) |
| Name | বাক্সের নাম (camelCase) |
| Value | বাক্সে যা রাখলে |
| Declare | বাক্স বানানো |
| Initialize | বাক্সে value রাখা |

**মনে রাখো:**
- একবার type দিয়ে বানালে আবার type দিতে হয় না
- **Meaningful নাম** দাও (x না, studentAge!)
- **camelCase** follow করো

---

**পরের Lesson:** Data Types — int, double, string, bool সহ সব type বিস্তারিত।

---

*CPS Academy - Learn. Code. Grow.*
