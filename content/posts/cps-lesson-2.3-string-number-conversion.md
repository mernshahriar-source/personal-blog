---
title: "Lesson 2.3: String-Number Conversion — Parse, TryParse, Convert, ToString"
date: "2026-03-09"
excerpt: "String থেকে number এ convert করা (Parse, TryParse), Convert class, ToString() দিয়ে যেকোনো কিছু string এ নেওয়া, number formatting, এব�"
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


> **এই Lesson এ শিখবে:** String থেকে number এ convert করা (Parse, TryParse), Convert class, ToString() দিয়ে যেকোনো কিছু string এ নেওয়া, number formatting, এবং কোথায় কোন method use করবে।

---

## কেন String-Number Conversion দরকার?

মনে আছে Module 1 এ শিখেছিলে — `Console.ReadLine()` সবসময় **string** return করে?

```csharp
Console.Write("Tomar boyosh koto? ");
string input = Console.ReadLine();  // user "25" লিখলো

// কিন্তু এটা "25" string, 25 number না!
// তাই সরাসরি যোগ-বিয়োগ করতে পারবে না
```

User থেকে input নিলে, file থেকে data পড়লে, API থেকে data আসলে — প্রায় সবসময় string হিসেবে আসে। Number হিসেবে use করতে হলে convert করতে হবে।

এটাই হলো আজকের lesson এর মূল কথা।

---

## int.Parse() — String থেকে int

সবচেয়ে সহজ উপায়। String দাও, int পাও:

```csharp
string ageText = "25";
int age = int.Parse(ageText);

Console.WriteLine(age + 5);  // 30 (এখন number হিসেবে যোগ হচ্ছে!)
```

### double.Parse() — String থেকে double

```csharp
string priceText = "99.50";
double price = double.Parse(priceText);

Console.WriteLine(price * 2);  // 199
```

### অন্যান্য type এও Parse আছে

```csharp
string text1 = "1000000";
long bigNum = long.Parse(text1);

string text2 = "99.99";
float smallDecimal = float.Parse(text2);

string text3 = "1299.99";
decimal money = decimal.Parse(text3);

string text4 = "true";
bool flag = bool.Parse(text4);
```

Pattern টা খুব সহজ: `type.Parse(string)` — ব্যস!

### User Input এর সাথে Parse

```csharp
Console.Write("Tomar boyosh koto? ");
string input = Console.ReadLine();

int boyosh = int.Parse(input);

Console.WriteLine($"Asche bochor tomar boyosh hobe {boyosh + 1}");
```

### ⚠️ Parse এর বড় Problem

যদি user ভুল input দেয়?

```csharp
string wrongInput = "hello";
int number = int.Parse(wrongInput);  // 💥 CRASH! FormatException!
```

Program পুরাই crash করে ফেলবে! User "hello" দিয়েছে, int.Parse() বুঝতে পারছে না এটা কোন number, তাই exception throw করছে।

আরো কিছু crash scenario:

```csharp
int.Parse("");           // 💥 Empty string!
int.Parse("12.5");       // 💥 int এ দশমিক চলবে না!
int.Parse("12 34");      // 💥 Space আছে!
int.Parse(null);         // 💥 null!
```

এই জন্য real application এ Parse সরাসরি use করা risky। তাহলে কী করবে?

---

## TryParse() — Safe উপায়

Parse এর safe version হলো TryParse। ভুল input দিলেও crash করে না। Instead, true/false বলে দেয় conversion হলো কিনা।

```csharp
string input = "hello";

bool success = int.TryParse(input, out int number);

if (success)
{
    Console.WriteLine($"Number: {number}");
}
else
{
    Console.WriteLine("Eta number na!");  // এটা print হবে
}
```

### TryParse কীভাবে কাজ করে?

```csharp
int.TryParse(input, out int number)
```

এখানে তিনটা জিনিস হচ্ছে:

1. `input` — যে string কে convert করতে চাও
2. `out int number` — conversion successful হলে result এখানে রাখবে
3. Return value — `true` যদি conversion হয়, `false` যদি না হয়

`out` keyword টা নতুন লাগতে পারে। এটা মানে হলো — "এই variable এ result দিয়ে দাও"। পরে method শেখার সময় detail এ বুঝবে। এখন শুধু pattern টা মনে রাখো।

### Real Example: Safe Input নেওয়া

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

এভাবে user যাই দিক — "hello", "", "abc123" — program crash করবে না।

### বারবার চেষ্টা করানো (Loop দিয়ে)

সামনে loop শিখবে, কিন্তু একটু আগেই দেখিয়ে দিই — এভাবে user কে বারবার input দিতে বলতে পারো যতক্ষণ না ঠিক দেয়:

```csharp
int boyosh;

while (true)
{
    Console.Write("Tomar boyosh koto? ");
    string input = Console.ReadLine();

    if (int.TryParse(input, out boyosh))
    {
        break;  // সঠিক input পেয়েছি, loop থেকে বের হও
    }

    Console.WriteLine("Please ekta number dao!");
}

Console.WriteLine($"Tomar boyosh: {boyosh}");
```

এটা real application এ অনেক কাজে লাগে।

### double.TryParse() ও আছে

```csharp
Console.Write("Product er dam koto? ");
string input = Console.ReadLine();

if (double.TryParse(input, out double price))
{
    double tax = price * 0.15;
    Console.WriteLine($"Price: {price}, Tax: {tax}, Total: {price + tax}");
}
else
{
    Console.WriteLine("Shothik dam dao!");
}
```

### Parse vs TryParse — কখন কোনটা?

| Situation | কোনটা use করবে |
|-----------|----------------|
| User input (কী দেবে জানি না) | TryParse ✓ |
| File/API থেকে data (format জানা) | Parse ঠিক আছে |
| তুমি নিজে sure যে valid data | Parse ঠিক আছে |
| Production/real application | TryParse ✓ (safe) |

**সহজ নিয়ম:** সন্দেহ থাকলে TryParse use করো। কখনো crash হবে না।

---

## Convert Class — আরেকটা উপায়

`Convert` class দিয়েও type conversion করা যায়:

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

// bool to int
bool flag = true;
int flagInt = Convert.ToInt32(flag);  // 1 (true = 1, false = 0)
```

### Convert এর Special Power: Rounding

এখানে Convert এর একটা বিশেষ ক্ষমতা আছে। double থেকে int এ নেওয়ার সময় এটা **round** করে:

```csharp
double value = 3.7;

int usingCast = (int)value;                // 3 (শুধু কেটে ফেললো)
int usingConvert = Convert.ToInt32(value);  // 4 (round করলো!)
```

| Method | 3.2 হলে | 3.7 হলে | 3.5 হলে |
|--------|---------|---------|---------|
| (int) cast | 3 | 3 | 3 |
| Convert.ToInt32() | 3 | 4 | 4 |

**মানে:**
- `(int)` cast → শুধু দশমিক কেটে ফেলে (truncate)
- `Convert.ToInt32()` → কাছের পূর্ণসংখ্যায় round করে

### কখন Convert use করবে?

```csharp
// Rounding চাইলে Convert ভালো
double gpa = 3.87;
int rounded = Convert.ToInt32(gpa);  // 4

// শুধু দশমিক কাটতে চাইলে cast
int truncated = (int)gpa;  // 3
```

### Convert এর সব Methods

| Method | কী করে |
|--------|--------|
| Convert.ToInt32() | int এ convert |
| Convert.ToInt64() | long এ convert |
| Convert.ToDouble() | double এ convert |
| Convert.ToSingle() | float এ convert |
| Convert.ToDecimal() | decimal এ convert |
| Convert.ToBoolean() | bool এ convert |
| Convert.ToString() | string এ convert |
| Convert.ToChar() | char এ convert |

---

## ToString() — যেকোনো কিছু থেকে String

C# এ প্রতিটা type এর `.ToString()` method আছে। যেকোনো data কে string এ নিতে এটা use করো:

```csharp
int age = 25;
string ageText = age.ToString();

double price = 99.99;
string priceText = price.ToString();

bool isActive = true;
string activeText = isActive.ToString();  // "True"

Console.WriteLine("Age: " + ageText);
Console.WriteLine("Price: " + priceText);
Console.WriteLine("Active: " + activeText);
```

### Number Formatting — সুন্দর করে দেখানো

ToString() এর ভিতরে format code দিয়ে number কে সুন্দর করে দেখাতে পারো:

```csharp
double price = 1234.5678;

Console.WriteLine(price.ToString("F2"));    // 1234.57 (2 decimal places)
Console.WriteLine(price.ToString("F0"));    // 1235 (0 decimal, rounded)
Console.WriteLine(price.ToString("N2"));    // 1,234.57 (comma সহ)
Console.WriteLine(price.ToString("C"));     // $1,234.57 (currency)
```

| Format | মানে | Example (1234.56) |
|--------|------|-------------------|
| F2 | 2 decimal places | 1234.56 |
| F0 | 0 decimal places | 1235 |
| N2 | Comma + 2 decimal | 1,234.56 |
| C | Currency | $1,234.56 |
| P | Percentage | 123,456.00% |

### String Interpolation এও কাজ করে

```csharp
double price = 1234.5678;

// ToString() ছাড়াও format করা যায়
Console.WriteLine($"Price: {price:F2}");    // Price: 1234.57
Console.WriteLine($"Price: {price:N2}");    // Price: 1,234.57
```

`$"{variable:format}"` — এভাবে সরাসরি string interpolation এর ভিতরেই format দিতে পারো।

---

## একটা Complete Example

সব method একসাথে use করে একটা program:

```csharp
// === String to Number ===
Console.Write("Tomar naam ki? ");
string naam = Console.ReadLine();

Console.Write("Tomar boyosh koto? ");
string boyoshInput = Console.ReadLine();

Console.Write("Tomar CGPA koto? ");
string cgpaInput = Console.ReadLine();

// TryParse দিয়ে safe convert
if (!int.TryParse(boyoshInput, out int boyosh))
{
    Console.WriteLine("Boyosh thik nai!");
    return;
}

if (!double.TryParse(cgpaInput, out double cgpa))
{
    Console.WriteLine("CGPA thik nai!");
    return;
}

// === Number to String (formatted) ===
Console.WriteLine();
Console.WriteLine("=== Student Info ===");
Console.WriteLine($"Name: {naam}");
Console.WriteLine($"Age: {boyosh}");
Console.WriteLine($"CGPA: {cgpa:F2}");

// === Calculation with casting ===
int birthYear = 2025 - boyosh;
Console.WriteLine($"Birth Year (approx): {birthYear}");

// === Convert example ===
double rawScore = cgpa * 25;  // 4.0 scale to 100
int percentScore = Convert.ToInt32(rawScore);  // round করে
Console.WriteLine($"Approximate Score: {percentScore}%");

// === ToString with formatting ===
decimal estimatedSalary = (decimal)(cgpa * 15000);
Console.WriteLine($"Estimated Starting Salary: {estimatedSalary:N0} BDT");
```

Sample Run:
```
Tomar naam ki? Rahim
Tomar boyosh koto? 22
Tomar CGPA koto? 3.75

=== Student Info ===
Name: Rahim
Age: 22
CGPA: 3.75
Birth Year (approx): 2003
Approximate Score: 94%
Estimated Starting Salary: 56,250 BDT
```

---

## Common Mistakes

### Mistake 1: String এ + করে মনে করা যোগ হবে

```csharp
string a = "10";
string b = "20";

Console.WriteLine(a + b);  // "1020" 😱 (জোড়া লাগলো, যোগ হলো না!)

// আগে convert করো
int num1 = int.Parse(a);
int num2 = int.Parse(b);
Console.WriteLine(num1 + num2);  // 30 ✓
```

এটা Module 1 এও বলেছিলাম, কিন্তু এত important যে আবার বলছি! String এ `+` মানে concatenation (জোড়া লাগানো), যোগ না।

### Mistake 2: Parse এ ভুল input দিয়ে crash

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

### Mistake 3: int.Parse() এ দশমিক দেওয়া

```csharp
// ❌ Crash! int এ দশমিক parse হয় না
int number = int.Parse("12.5");

// ✓ আগে double এ parse করো, তারপর cast
double temp = double.Parse("12.5");
int number = (int)temp;  // 12
```

### Mistake 4: Cast আর Convert এর পার্থক্য ভুলে যাওয়া

```csharp
double salary = 50000.75;

int cast = (int)salary;              // 50000 (কেটে ফেললো)
int convert = Convert.ToInt32(salary); // 50001 (round করলো)

// কোনটা চাও সেটা বুঝে use করো!
```

---

## Quick Summary Table

| কী করতে চাও | কীভাবে করবে | Note |
|-------------|-------------|------|
| string → int | `int.Parse()` বা `int.TryParse()` | TryParse safe |
| string → double | `double.Parse()` বা `double.TryParse()` | TryParse safe |
| double → int | `(int)value` | দশমিক কাটে |
| double → int (round) | `Convert.ToInt32(value)` | Round করে |
| যেকোনো → string | `.ToString()` | সব type এ আছে |
| Formatted string | `.ToString("F2")` বা `$"{value:F2}"` | সুন্দর output |

---

## Summary

| Method | কী করে | Crash করে? |
|--------|--------|-----------|
| Parse() | String → Number | হ্যাঁ, ভুল input এ |
| TryParse() | String → Number (safe) | না, false return করে |
| Convert.ToInt32() | যেকোনো → int (round করে) | হ্যাঁ, ভুল input এ |
| (int) cast | দশমিক কেটে int | না (কিন্তু data হারায়) |
| ToString() | যেকোনো → String | না |

**মনে রাখো:**
- User input সবসময় string আসে — convert করতে হবে
- Real application এ সবসময় TryParse use করো — crash proof
- Round চাইলে Convert, শুধু কাটতে চাইলে (int) cast
- ToString("F2") দিয়ে number সুন্দর করে দেখাও

---

**পরের Lesson:** Operators — Arithmetic, Comparison, Logical operators, operator precedence।

---

*CPS Academy - Learn. Code. Grow.*
