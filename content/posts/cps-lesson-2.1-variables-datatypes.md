---
title: "Lesson 2.1: Variables ও Data Types"
date: "2026-03-07"
excerpt: "Variable কী, কীভাবে বানায়, C# এর সব data types (int, long, double, float, decimal, string, char, bool), size ও range, var keyword, const, naming conventions"
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


> **এই Lesson এ শিখবে:** Variable কী, কীভাবে বানায়, C# এর সব data types (int, long, double, float, decimal, string, char, bool), size ও range, var keyword, const, naming conventions।

---

## Variable কী?

Program এ data রাখতে হয় তো? সেই data কোথায় রাখবে? Variable এ!

Variable হলো একটা বাক্স। এই বাক্সে তুমি কিছু রাখতে পারো।

ধরো তোমার একটা বাক্স আছে, নাম দিলে "boyosh"। এখন এই বাক্সে তুমি 25 রাখলে:

```csharp
int boyosh = 25;
```

এইটুকুই। একটা বাক্স বানালে, নাম দিলে "boyosh", আর তার মধ্যে 25 রেখে দিলে।

পরে যখন দরকার, বাক্সের নাম ধরে ডাকলেই হলো:

```csharp
Console.WriteLine(boyosh);  // 25 দেখাবে
```

### Variable এর তিনটা part

```csharp
int boyosh = 25;
```

| Part | কী | Example |
|------|-----|---------|
| Type | বাক্সে কী ধরনের জিনিস রাখবে | int (number) |
| Name | বাক্সের নাম | boyosh |
| Value | বাক্সে কী রাখলে | 25 |

### Value পরে change করতে পারো

```csharp
int boyosh = 25;
Console.WriteLine(boyosh);  // 25

boyosh = 26;  // নতুন value দিলাম
Console.WriteLine(boyosh);  // 26
```

দেখো, আবার `int` লেখা লাগেনি। একবার বাক্স বানালে পরে শুধু value change করলেই হয়।

---

## Data Types — বাক্সের ধরন

এখন প্রশ্ন হলো — সব বাক্সে কি সব জিনিস রাখা যায়?

না।

জুতার বাক্সে জুতা রাখবে, চালের বস্তায় চাল রাখবে। C# এও তাই — আলাদা আলাদা data এর জন্য আলাদা আলাদা type আছে।

### int — পূর্ণ সংখ্যা

যখন গুনতে হয়, count করতে হয়, দশমিক ছাড়া number লাগে — তখন `int`।

```csharp
int boyosh = 25;
int studentsCount = 50;
int year = 2024;
int negative = -10;  // negative ও হতে পারে
```

`int` এ কত বড় number রাখা যায়? প্রায় ±২১০ কোটি পর্যন্ত। বেশিরভাগ কাজে এটাই যথেষ্ট।

### long — অনেক বড় সংখ্যা

int এ না কুলালে `long` নাও। এটা অনেক বড় number ধরতে পারে।

```csharp
long population = 17000000000;  // বাংলাদেশের population ও কম!
long bigNumber = 9223372036854775807;  // এত বড় হতে পারে
```

### double — দশমিক সংখ্যা

টাকা-পয়সা, মাপজোখ, percentage — যেখানে দশমিক লাগে সেখানে `double`।

```csharp
double price = 150.50;
double temperature = 36.6;
double pi = 3.14159;
double percentage = 85.5;
```

### float — ছোট দশমিক

`double` এর ছোট ভাই। কম memory লাগে, কিন্তু কম accurate। শেষে `f` দিতে হয়।

```csharp
float weight = 65.5f;
float height = 5.8f;
```

সাধারণত `double` use করো। `float` এর দরকার কমই পড়ে (games/graphics ছাড়া)।

### decimal — টাকার হিসাব

টাকা-পয়সার calculation এ `decimal` best। সবচেয়ে accurate। শেষে `m` দিতে হয়।

```csharp
decimal salary = 50000.00m;
decimal productPrice = 1299.99m;
```

**টাকার হিসাবে কেন decimal?**

```csharp
// double এ মাঝে মাঝে গোলমাল হয়
double a = 0.1 + 0.2;
Console.WriteLine(a);  // 0.30000000000000004 😱

// decimal এ ঠিক থাকে
decimal b = 0.1m + 0.2m;
Console.WriteLine(b);  // 0.3 ✓
```

টাকার হিসাবে ০.০০০০০০০১ টাকা error ও বড় সমস্যা করতে পারে!

### string — text

যেকোনো text রাখতে `string`। Double quotes এর মধ্যে লিখতে হয়।

```csharp
string naam = "Rahim Uddin";
string message = "Hello, World!";
string address = "Dhaka, Bangladesh";
string empty = "";  // খালি string ও হতে পারে
```

### char — একটা মাত্র অক্ষর

শুধু একটা character রাখতে `char`। Single quote এ লিখতে হয়।

```csharp
char grade = 'A';
char symbol = '@';
char digit = '5';  // এটা number না, character
```

string vs char:

```csharp
string text = "A";   // string, double quote
char letter = 'A';   // char, single quote
```

দুইটা আলাদা জিনিস। `"A"` হলো string (text), `'A'` হলো char (একটা অক্ষর)।

### bool — হ্যাঁ অথবা না

শুধু দুইটা value হতে পারে — `true` অথবা `false`।

```csharp
bool isLoggedIn = true;
bool hasPermission = false;
bool isAdult = boyosh >= 18;  // condition check করে set
```

যেকোনো হ্যাঁ/না type প্রশ্নের answer রাখতে `bool` use করো।

---

## Quick Reference

| Type | কী রাখবে | Example |
|------|---------|---------|
| int | পূর্ণ সংখ্যা | `int x = 10;` |
| long | বড় পূর্ণ সংখ্যা | `long x = 10000000000;` |
| double | দশমিক সংখ্যা | `double x = 3.14;` |
| float | ছোট দশমিক | `float x = 3.14f;` |
| decimal | টাকা-পয়সা | `decimal x = 100.50m;` |
| string | text | `string x = "hello";` |
| char | একটা অক্ষর | `char x = 'A';` |
| bool | true/false | `bool x = true;` |

---

## Size এবং Range Chart

প্রতিটা type কতটুকু memory নেয় আর কত বড় value রাখতে পারে:

### Integer Types (পূর্ণ সংখ্যা)

| Type | Size | Range | কখন use করবে |
|------|------|-------|---------------|
| byte | 1 byte | 0 থেকে 255 | ছোট positive number |
| short | 2 bytes | -32,768 থেকে 32,767 | মাঝারি number |
| int | 4 bytes | ±2.1 × 10⁹ (±210 crore) | বেশিরভাগ সময় এটাই ✓ |
| long | 8 bytes | ±9.2 × 10¹⁸ | অনেক বড় number |

### Decimal Types (দশমিক সংখ্যা)

| Type | Size | Precision | কখন use করবে |
|------|------|-----------|---------------|
| float | 4 bytes | ~7 digits | games, graphics |
| double | 8 bytes | ~15-16 digits | সাধারণ calculation ✓ |
| decimal | 16 bytes | 28-29 digits | টাকা-পয়সা ✓ |

### Other Types

| Type | Size | Values |
|------|------|--------|
| char | 2 bytes | একটা character |
| bool | 1 byte | true অথবা false |
| string | varies | text এর length অনুযায়ী |

### মনে রাখার সহজ উপায়

```
ছোট number → int (বেশিরভাগ সময় এটাই যথেষ্ট)
বিশাল number → long
দশমিক → double
টাকা-পয়সা → decimal
text → string
হ্যাঁ/না → bool
```

সত্যি বলতে, তুমি ৯০% সময় শুধু `int`, `double`, `string`, `bool` দিয়েই কাজ চালাতে পারবে।

---

## var — compiler কে বুঝতে দাও

প্রতিবার type লেখা আলসেমি লাগে? `var` use করো।

```csharp
var naam = "Rahim";      // compiler বুঝে নেবে এটা string
var boyosh = 25;         // compiler বুঝে নেবে এটা int
var price = 99.99;       // compiler বুঝে নেবে এটা double
var isActive = true;     // compiler বুঝে নেবে এটা bool
```

Compiler তোমার দেওয়া value দেখে নিজেই type বুঝে নেয়।

### কিন্তু একটা নিয়ম আছে

`var` use করলে সাথে সাথে value দিতেই হবে:

```csharp
var naam = "Rahim";   // ✓ ঠিক আছে

var naam;             // ✗ Error! Value কই?
naam = "Rahim";
```

### কখন var ব্যবহার করবে?

যখন দেখলেই বোঝা যায় type কী:

```csharp
var message = "Hello";              // ✓ clearly string
var count = 10;                     // ✓ clearly int
var student = new Student();        // ✓ clearly Student

var result = GetSomething();        // 🤔 কী return করে বুঝা যাচ্ছে না
```

আমার suggestion: শেখার সময় explicit type লেখো (int, string)। পরে comfortable হলে var use করো।

---

## const — যেটা কখনো বদলাবে না

কিছু জিনিস আছে যেগুলো কখনো change হয় না। যেমন PI এর মান, দিনে কত ঘণ্টা।

এগুলোর জন্য `const` use করো:

```csharp
const double PI = 3.14159;
const int HOURS_IN_DAY = 24;
const string COMPANY_NAME = "CPS Academy";
```

const variable এর value পরে change করতে পারবে না:

```csharp
const int MAX_STUDENTS = 50;
MAX_STUDENTS = 60;  // ✗ Error! const change করা যায় না
```

### const কেন use করবে?

1. ভুল করে value change হয়ে যাওয়া আটকায়
2. Code পড়ে বুঝতে সুবিধা হয় যে এটা fixed value
3. একই value বারবার লেখা লাগে না

```csharp
// ❌ এভাবে না — 3.14159 বারবার লেখা ভুল-প্রবণ
double area1 = 3.14159 * 5 * 5;
double area2 = 3.14159 * 10 * 10;

// ✓ এভাবে — একবার define, বারবার use
const double PI = 3.14159;
double area1 = PI * 5 * 5;
double area2 = PI * 10 * 10;
```

---

## নাম দেওয়ার নিয়ম (Naming Conventions)

Variable এর নাম যা ইচ্ছা তা দেওয়া যায় না। কিছু নিয়ম আছে।

### যা করতেই হবে (Rules)

```csharp
// ✓ letter বা underscore দিয়ে শুরু
int age;
int _count;
string firstName;

// ✗ number দিয়ে শুরু করা যাবে না
int 1stPlace;   // Error!

// ✗ space থাকতে পারবে না
int my age;     // Error!

// ✗ special character নেই (underscore ছাড়া)
int my-age;     // Error!
int my@age;     // Error!
```

### যা করা উচিত (Conventions)

C# এ সবাই এই style follow করে:

**camelCase — variable এর জন্য**

প্রথম word ছোট হাতের, পরের word গুলোর প্রথম letter বড়:

```csharp
int studentCount;
string firstName;
double totalPrice;
bool isLoggedIn;
```

**PascalCase বা UPPER_CASE — const এর জন্য**

```csharp
const int MaxStudents = 50;      // PascalCase
// অথবা
const int MAX_STUDENTS = 50;     // UPPER_CASE
```

**Meaningful নাম দাও**

```csharp
// ❌ কী বুঝলে?
int x = 25;
string s = "Rahim";
bool b = true;

// ✓ এখন বুঝা যাচ্ছে
int studentAge = 25;
string studentName = "Rahim";
bool isEnrolled = true;
```

তুমি নিজে ৬ মাস পর code দেখলে বুঝতে পারবে কী লিখেছিলে!

---

## একটা Complete Example

সব মিলিয়ে একটা program:

```csharp
// Constants
const double PI = 3.14159;
const string ACADEMY_NAME = "CPS Academy";

// Variables
string studentName = "Rahim";
int studentAge = 22;
double cgpa = 3.75;
bool isActive = true;
char grade = 'A';

// Using var
var city = "Dhaka";
var totalCredits = 120;

// Output
Console.WriteLine($"=== {ACADEMY_NAME} ===");
Console.WriteLine();
Console.WriteLine($"Name: {studentName}");
Console.WriteLine($"Age: {studentAge}");
Console.WriteLine($"City: {city}");
Console.WriteLine($"CGPA: {cgpa}");
Console.WriteLine($"Grade: {grade}");
Console.WriteLine($"Credits: {totalCredits}");
Console.WriteLine($"Active: {isActive}");

// Calculation with const
double radius = 5;
double area = PI * radius * radius;
Console.WriteLine($"\nCircle area (radius {radius}): {area}");
```

Output:
```
=== CPS Academy ===

Name: Rahim
Age: 22
City: Dhaka
CGPA: 3.75
Grade: A
Credits: 120
Active: True

Circle area (radius 5): 78.53975
```

---

## যেসব ভুল প্রায়ই হয়

### ভুল 1: Type mismatch

```csharp
int boyosh = "25";     // ✗ int এ string রাখতে পারবে না
string naam = 123;     // ✗ string এ number রাখতে পারবে না
```

### ভুল 2: const পরে change করা

```csharp
const int MAX = 100;
MAX = 200;            // ✗ const change করা যায় না
```

### ভুল 3: var এ value না দেওয়া

```csharp
var something;         // ✗ value দাও
something = "hello";
```

### ভুল 4: float/decimal এ suffix ভুলে যাওয়া

```csharp
float price = 99.99;    // ✗ f লাগবে
float price = 99.99f;   // ✓

decimal salary = 50000;  // ✗ m লাগবে
decimal salary = 50000m; // ✓
```

---

## Summary

| জিনিস | মানে |
|-------|------|
| Variable | data রাখার বাক্স |
| int | পূর্ণ সংখ্যা |
| double | দশমিক সংখ্যা |
| decimal | টাকার হিসাব |
| string | text |
| char | একটা অক্ষর |
| bool | true/false |
| var | compiler type বুঝে নেবে |
| const | যেটা change হবে না |
| camelCase | variable naming style |

**মনে রাখো:**
- সঠিক type use করো (টাকায় decimal, count এ int)
- Meaningful নাম দাও
- const use করো fixed value তে

---

**পরের Lesson:** Type Casting — এক type থেকে আরেক type এ কীভাবে convert করবে, implicit vs explicit casting, data loss কীভাবে হয়

---

*CPS Academy - Learn. Code. Grow.*
