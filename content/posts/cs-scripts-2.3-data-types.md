---
title: "Lesson 2.3: Data Types — বাক্সের ধরন"
date: "2026-04-13"
excerpt: "সব Data Types বিস্তারিত, Size ও Range chart, var keyword, const keyword"
categories:
  - C# Course Scripts
tags:
  - csharp
  - data-types
  - int
  - string
  - bool
  - var
  - const
draft: false
---

# Lesson 2.2: Data Types — বাক্সের ধরন

> **এই Lesson এ শিখবে:** সব Data Types বিস্তারিত (int, long, double, float, decimal, string, char, bool), Size ও Range chart, কখন কোনটা use করবে, var keyword, const keyword, এবং Complete Example।

---

## Data Types কেন?

সব বাক্সে সব জিনিস রাখা যায় না। জুতার বাক্সে জুতা, চালের বস্তায় চাল। C# এও আলাদা data এর জন্য আলাদা type আছে।

---

## int — পূর্ণ সংখ্যা

গুনতে হয়, count করতে হয়, দশমিক ছাড়া number লাগে — তখন `int`:

```csharp
int boyosh = 25;
int studentsCount = 50;
int year = 2024;
int negative = -10;  // negative ও হতে পারে
```

`int` এ প্রায় **±২১০ কোটি** পর্যন্ত রাখা যায়। বেশিরভাগ কাজে এটাই যথেষ্ট।

---

## long — অনেক বড় সংখ্যা

int এ না কুলালে `long`:

```csharp
long population = 17000000000;
long bigNumber = 9223372036854775807;
```

---

## double — দশমিক সংখ্যা

টাকা-পয়সা, মাপজোখ, percentage — যেখানে দশমিক লাগে:

```csharp
double price = 150.50;
double temperature = 36.6;
double pi = 3.14159;
double percentage = 85.5;
```

---

## float — ছোট দশমিক

`double` এর ছোট ভাই। কম memory, কম accurate। শেষে **`f`** দিতে হয়:

```csharp
float weight = 65.5f;
float height = 5.8f;
```

সাধারণত **double use করো**। float এর দরকার কমই পড়ে।

---

## decimal — টাকার হিসাব

টাকা-পয়সায় **সবচেয়ে accurate**। শেষে **`m`** দিতে হয়:

```csharp
decimal salary = 50000.00m;
decimal productPrice = 1299.99m;
```

**কেন decimal?**

```csharp
// double এ মাঝে মাঝে গোলমাল!
double a = 0.1 + 0.2;
Console.WriteLine(a);  // 0.30000000000000004 😱

// decimal এ ঠিক!
decimal b = 0.1m + 0.2m;
Console.WriteLine(b);  // 0.3 ✅
```

---

## string — text

যেকোনো text। **Double quotes** এ লিখতে হয়:

```csharp
string naam = "Rahim Uddin";
string message = "Hello, World!";
string empty = "";  // খালি string ও হতে পারে
```

---

## char — একটা মাত্র অক্ষর

**Single quote** এ:

```csharp
char grade = 'A';
char symbol = '@';
char digit = '5';  // এটা number না, character!
```

**string vs char:**

```csharp
string text = "A";   // string — double quote
char letter = 'A';   // char — single quote
```

---

## bool — হ্যাঁ অথবা না

শুধু দুইটা value: `true` অথবা `false`:

```csharp
bool isLoggedIn = true;
bool hasPermission = false;
bool isAdult = boyosh >= 18;
```

---

## Size ও Range Chart

### Integer Types:

| Type | Size | Range | কখন |
|------|------|-------|------|
| byte | 1 byte | 0 থেকে 255 | ছোট positive |
| short | 2 bytes | ±32,767 | মাঝারি |
| **int** | 4 bytes | **±2.1 billion** | **বেশিরভাগ সময় ✅** |
| long | 8 bytes | ±9.2 × 10¹⁸ | অনেক বড় |

### Decimal Types:

| Type | Size | Precision | কখন |
|------|------|-----------|------|
| float | 4 bytes | ~7 digits | games |
| **double** | 8 bytes | **~15 digits** | **সাধারণ calculation ✅** |
| **decimal** | 16 bytes | **28 digits** | **টাকা-পয়সা ✅** |

### মনে রাখার সহজ উপায়:

```
ছোট number → int
বিশাল number → long
দশমিক → double
টাকা-পয়সা → decimal
text → string
হ্যাঁ/না → bool
```

**৯০% সময় শুধু `int`, `double`, `string`, `bool` দিয়েই কাজ চলবে।**

---

## var — Compiler কে বুঝতে দাও

```csharp
var naam = "Rahim";   // compiler বুঝবে — string
var boyosh = 25;      // compiler বুঝবে — int
var price = 99.99;    // compiler বুঝবে — double
var isActive = true;  // compiler বুঝবে — bool
```

### ⚠️ var এ সাথে সাথে value দিতে হবে:

```csharp
var naam = "Rahim";   // ✅
var naam;             // ❌ Error! value কই?
```

**শেখার সময় explicit type লেখো (int, string)। পরে comfortable হলে var use করো।**

---

## const — যেটা কখনো বদলাবে না

```csharp
const double PI = 3.14159;
const int HOURS_IN_DAY = 24;
const string COMPANY_NAME = "CPS Academy";
```

**const পরে change করতে পারবে না:**

```csharp
const int MAX = 100;
MAX = 200;  // ❌ Error!
```

**কেন const?**

```csharp
// ❌ Magic number বারবার
double area1 = 3.14159 * 5 * 5;
double area2 = 3.14159 * 10 * 10;

// ✅ const
const double PI = 3.14159;
double area1 = PI * 5 * 5;
double area2 = PI * 10 * 10;
```

---

## Complete Example

```csharp
const string ACADEMY = "CPS Academy";

string name = "Rahim";
int age = 22;
double cgpa = 3.75;
bool isActive = true;
char grade = 'A';

Console.WriteLine($"=== {ACADEMY} ===\n");
Console.WriteLine($"Name: {name}");
Console.WriteLine($"Age: {age}");
Console.WriteLine($"CGPA: {cgpa}");
Console.WriteLine($"Grade: {grade}");
Console.WriteLine($"Active: {isActive}");
```

---

## Common Mistakes

### Mistake 1: Type mismatch

```csharp
int boyosh = "25";   // ❌ int এ string রাখা যায় না
string naam = 123;   // ❌ string এ number রাখা যায় না
```

### Mistake 2: float/decimal এ suffix ভুলে যাওয়া

```csharp
float price = 99.99;    // ❌ f লাগবে!
float price = 99.99f;   // ✅

decimal salary = 50000;   // ❌ m লাগবে!
decimal salary = 50000m;  // ✅
```

---

## Quick Reference

| Type | কী রাখবে | Example | Suffix |
|------|---------|---------|--------|
| int | পূর্ণ সংখ্যা | `int x = 10;` | — |
| long | বড় সংখ্যা | `long x = 10000000000;` | — |
| double | দশমিক | `double x = 3.14;` | — |
| float | ছোট দশমিক | `float x = 3.14f;` | **f** |
| decimal | টাকা | `decimal x = 100.50m;` | **m** |
| string | text | `string x = "hello";` | " " |
| char | একটা অক্ষর | `char x = 'A';` | ' ' |
| bool | true/false | `bool x = true;` | — |

---

**পরের Lesson:** Operators Introduction — Operator কী ও কত ধরনের।

---

*CPS Academy - Learn. Code. Grow.*
