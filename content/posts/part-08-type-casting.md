---
title: 'Part 8: Type Casting'
date: '2026-01-20'
excerpt: 'Part 8: Type Casting - এক type এর data কে অন্য type এ convert করা শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - type-casting
  - tutorial
draft: true
---

# Part 8: Type Casting

ধরো তোমার কাছে একটা বালতি ভর্তি পানি আছে। এখন সেই পানি একটা বোতলে রাখতে চাও। কিন্তু বোতল ছোট, সব পানি ধরবে না। কিছু পানি ফেলে দিতে হবে।

Type casting ও অনেকটা এরকম। এক type এর data কে অন্য type এ convert করা। কখনো সহজে হয়, কখনো কিছু হারাতে হয়।

### এই part শেষে তুমি জানবে:

- 🔄 এক type থেকে অন্য type এ কীভাবে যাবে
- ⚠️ কখন data হারিয়ে যেতে পারে
- 🛠️ Parse, Convert কীভাবে কাজ করে
- 💡 কোথায় কোনটা use করবে

চলো শুরু করি!

---

## Type Casting কী?

সোজা কথায়, এক type এর data কে অন্য type এ পরিবর্তন করা।

ধরো তোমার কাছে একটা `int` আছে, কিন্তু তোমার `double` দরকার। অথবা user থেকে input নিলে সেটা `string` আসে, কিন্তু তোমার `int` লাগবে।

এই রকম situation এ type casting করতে হয়।

```csharp
int wholeNumber = 10;
double decimalNumber = wholeNumber;  // int থেকে double এ গেলো

Console.WriteLine(decimalNumber);  // 10
```

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
         ↓
       char
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

### 2. Explicit Casting (তোমাকে বলতে হবে)

এবার উল্টা scenario। বড় বাক্স থেকে ছোট বাক্সে জিনিস রাখতে গেলে সব নাও ঢুকতে পারে। কিছু ফেলে দিতে হতে পারে।

C# এটা নিজে থেকে করে না। তোমাকে explicitly বলতে হবে "হ্যাঁ, আমি জানি কিছু হারাতে পারে, তবুও করো।"

```csharp
double myDouble = 9.78;
int myInt = (int)myDouble;  // (int) দিয়ে বললাম - explicitly

Console.WriteLine(myInt);  // 9 (দশমিক অংশ গেলো!)
```

দেখো, 9.78 ছিল, 9 হয়ে গেলো। .78 হারিয়ে গেছে।

**কীভাবে করে?**

যে type এ নিতে চাও, সেটা bracket এ লেখো:

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

এখানে `(double)obtained` করলাম কেন? কারণ দুইটা int ভাগ করলে int আসে। 450/500 = 0 হয়ে যেতো!

### Example 3: Average বের করা

```csharp
int num1 = 10;
int num2 = 20;
int num3 = 15;

// ভুল উপায়
int wrongAverage = (num1 + num2 + num3) / 3;
Console.WriteLine(wrongAverage);  // 15 (আসলে 15 ই, কিন্তু অন্য number হলে problem হতো)

// সঠিক উপায়
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

3.87 থেকে 3 হয়ে গেলো! .87 উধাও।

### Overflow - Range এর বাইরে গেলে

```csharp
int bigValue = 300;
byte smallValue = (byte)bigValue;

Console.WriteLine(smallValue);  // 44 😱
```

কী হলো? byte এর range 0-255। 300 এর মধ্যে 256 বাদ দিয়ে বাকি 44 রাখলো।

এটা dangerous! তাই explicit casting করার আগে ভাবো।

---

## Overflow বিস্তারিত

Overflow হলো যখন একটা number তার type এর range এর বাইরে চলে যায়।

### প্রতিটা type এর range মনে আছে?

| Type | Range |
|------|-------|
| byte | 0 থেকে 255 |
| short | -32,768 থেকে 32,767 |
| int | ±2.1 × 10⁹ |
| long | ±9.2 × 10¹⁸ |

### Overflow হলে কী হয়?

ধরো তোমার কাছে একটা গাড়ির odometer আছে যেটা 999 পর্যন্ত দেখায়। 999 এর পর কী হবে? 000 তে ফিরে যাবে!

C# এও same জিনিস হয়:

```csharp
byte counter = 255;  // byte এর maximum
counter = (byte)(counter + 1);  // আরেকটু বাড়ালাম

Console.WriteLine(counter);  // 0 😱 (আবার শুরু থেকে!)
```

255 + 1 = 256 হওয়ার কথা, কিন্তু byte 256 ধরতে পারে না। তাই 0 তে ফিরে গেছে।

### আরো কিছু example

```csharp
// Example 1: byte overflow
byte b = 250;
b = (byte)(b + 10);  // 250 + 10 = 260, but byte max 255

Console.WriteLine(b);  // 4 (260 - 256 = 4)
```

```csharp
// Example 2: short overflow
short s = 32767;  // short এর maximum
s = (short)(s + 1);

Console.WriteLine(s);  // -32768 😱 (minimum এ চলে গেলো!)
```

```csharp
// Example 3: int overflow (rare but possible)
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

Customer এর 33,000 টাকা থাকার কথা, কিন্তু দেখাচ্ছে -32,536! 

এই জন্য সঠিক type choose করা জরুরি।

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

// Checked - error দেবে
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

```csharp
short s = -32768;  // minimum
s = (short)(s - 1);

Console.WriteLine(s);  // 32767 (maximum!)
```

### মনে রাখো

| Situation | কী হয় |
|-----------|--------|
| Maximum + 1 | Minimum এ যায় |
| Minimum - 1 | Maximum এ যায় |
| Range এর বাইরে cast | উল্টাপাল্টা value |

**Golden Rule:** সবসময় এমন type choose করো যেটা তোমার data আরামসে ধরতে পারে। সন্দেহ হলে বড় type নাও।

---

## String থেকে Number: Parse()

User থেকে input নিলে সেটা সবসময় `string` আসে। Number হিসেবে use করতে চাইলে convert করতে হবে।

### int.Parse()

```csharp
string ageText = "25";
int age = int.Parse(ageText);

Console.WriteLine(age + 5);  // 30
```

### double.Parse()

```csharp
string priceText = "99.50";
double price = double.Parse(priceText);

Console.WriteLine(price * 2);  // 199
```

### User Input এর সাথে

```csharp
Console.Write("Tomar boyosh koto? ");
string input = Console.ReadLine();

int boyosh = int.Parse(input);

Console.WriteLine($"Asche bochor tomar boyosh hobe {boyosh + 1}");
```

### ⚠️ Parse এর Problem

যদি user ভুল input দেয়?

```csharp
string wrongInput = "hello";
int number = int.Parse(wrongInput);  // 💥 CRASH! Error!
```

Program crash করে ফেলবে!

---

## TryParse() - Safe উপায়

Parse এর safe version হলো TryParse। ভুল input দিলেও crash করে না।

```csharp
string input = "hello";

bool success = int.TryParse(input, out int number);

if (success)
{
    Console.WriteLine($"Number: {number}");
}
else
{
    Console.WriteLine("Eta number na!");
}
```

Output:
```
Eta number na!
```

### Real example

```csharp
Console.Write("Ekta number dao: ");
string input = Console.ReadLine();

if (int.TryParse(input, out int number))
{
    Console.WriteLine($"Tumi diyecho: {number}");
    Console.WriteLine($"Duigon: {number * 2}");
}
else
{
    Console.WriteLine("Vai, eta to number na! Abar try koro.");
}
```

এভাবে user যাই দিক, program crash করবে না।

---

## Convert Class

আরেকটা উপায় হলো `Convert` class use করা:

```csharp
// String to int
string text = "100";
int number = Convert.ToInt32(text);

// String to double
string priceText = "99.99";
double price = Convert.ToDouble(priceText);

// int to string
int age = 25;
string ageText = Convert.ToString(age);

// double to int
double gpa = 3.87;
int rounded = Convert.ToInt32(gpa);  // 4 (রাউন্ড করে!)
```

### Parse vs Convert

```csharp
double value = 3.7;

int usingCast = (int)value;           // 3 (দশমিক কেটে ফেলে)
int usingConvert = Convert.ToInt32(value);  // 4 (রাউন্ড করে)
```

| Method | 3.2 হলে | 3.7 হলে | 3.5 হলে |
|--------|---------|---------|---------|
| (int) | 3 | 3 | 3 |
| Convert.ToInt32() | 3 | 4 | 4 |

Convert রাউন্ড করে, cast শুধু কেটে ফেলে।

---

## ToString() - যেকোনো কিছু থেকে String

যেকোনো data type কে string এ নিতে `.ToString()` use করো:

```csharp
int age = 25;
string ageText = age.ToString();

double price = 99.99;
string priceText = price.ToString();

bool isActive = true;
string activeText = isActive.ToString();  // "True"

Console.WriteLine("Age: " + ageText);
Console.WriteLine("Price: " + priceText);
```

### Formatting সহ

```csharp
double price = 1234.5678;

Console.WriteLine(price.ToString("F2"));    // 1234.57 (2 decimal)
Console.WriteLine(price.ToString("F0"));    // 1235 (0 decimal, rounded)
Console.WriteLine(price.ToString("N2"));    // 1,234.57 (comma সহ)
```

---

## Quick Summary Table

| কী করতে চাও | কীভাবে করবে |
|-------------|-------------|
| int → double | শুধু assign করো (implicit) |
| double → int | `(int)value` |
| string → int | `int.Parse(text)` বা `int.TryParse()` |
| string → double | `double.Parse(text)` |
| যেকোনো → string | `.ToString()` |
| Safe convert | `TryParse()` |
| Round করে convert | `Convert.ToInt32()` |

---

## Common Mistakes

### Mistake 1: String এ + করে মনে করা যোগ হবে

```csharp
string a = "10";
string b = "20";

Console.WriteLine(a + b);  // "1020" (জোড়া লাগলো, যোগ হলো না!)

// আগে convert করো
int num1 = int.Parse(a);
int num2 = int.Parse(b);
Console.WriteLine(num1 + num2);  // 30 ✓
```

### Mistake 2: Parse এ ভুল input দেওয়া

```csharp
// ❌ Crash!
int number = int.Parse("hello");

// ✓ Safe way
if (int.TryParse("hello", out int result))
{
    Console.WriteLine(result);
}
else
{
    Console.WriteLine("Invalid input");
}
```

### Mistake 3: Casting এ data loss ignore করা

```csharp
double salary = 50000.75;
int rounded = (int)salary;  // 50000 (.75 গেলো)

// যদি রাউন্ড করতে চাও
int properRounded = Convert.ToInt32(salary);  // 50001
```

---

## Summary

আজকে শিখলে:

- **Implicit casting**: ছোট → বড় type, নিজে হয়ে যায়
- **Explicit casting**: বড় → ছোট type, `(type)` দিয়ে করতে হয়, data হারাতে পারে
- **Parse()**: String → Number, ভুল input এ crash করে
- **TryParse()**: Safe way, crash করে না
- **Convert**: রাউন্ড করে convert করে
- **ToString()**: যেকোনো কিছু → String

**মনে রাখো:**
- User input সবসময় string আসে, Parse করতে হবে
- double থেকে int এ গেলে দশমিক হারায়
- Safe থাকতে TryParse() use করো

**Next Part এ:** Arithmetic operators শিখবো। Type casting কেন দরকার, integer division এর problem, bracket দিয়ে equation solve করা।

---

*CPS Academy - Learn. Code. Grow.*
