---
title: 'Part 9: Arithmetic Operators'
date: '2026-01-20'
excerpt: 'Part 9: Arithmetic Operators - যোগ, বিয়োগ, গুণ, ভাগ শিখুন C# এ'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - operators
  - tutorial
draft: false
---

# Part 9: Arithmetic Operators

তুমি কি calculator use করেছো কখনো? নিশ্চয়ই করেছো। যোগ, বিয়োগ, গুণ, ভাগ - এগুলো ছাড়া তো হিসাব করাই যায় না।

C# এও তোমার program কে এসব শেখাতে হবে। আজকে সেটাই করবো।

### এই part শেষে তুমি বানাতে পারবে:

- 🧮 Calculator app
- 🛒 Shopping cart এর total price calculator
- 📊 CGPA/Percentage calculator
- ⏰ Time converter (seconds to hours/minutes)
- 🎮 Game এর score system
- 💰 EMI/Interest calculator
- 📐 Area, perimeter calculator

মজার না? চলো শুরু করি!

---

## যোগ করা: The + Operator

ধরো তুমি একটা চায়ের দোকান চালাও। সকালে 50 টাকা আয় হলো, বিকালে 80 টাকা। মোট কত?

```csharp
int sokal = 50;
int bikal = 80;
int total = sokal + bikal;

Console.WriteLine($"Aj total income: {total} taka");
```

Output:
```
Aj total income: 130 taka
```

একদম সোজা, তাই না?

### আরো কিছু scenario দেখি

**Scenario 1: পরীক্ষার নম্বর যোগ**

```csharp
int bangla = 75;
int english = 82;
int math = 90;
int science = 88;

int total = bangla + english + math + science;

Console.WriteLine($"Total marks: {total}");  // 335
```

চারটা subject এর নম্বর যোগ করে total বের করলাম।

**Scenario 2: দোকানে জিনিস কেনা**

```csharp
int shirtPrice = 450;
int pantPrice = 650;
int shoesPrice = 1200;
int deliveryCharge = 60;

int totalBill = shirtPrice + pantPrice + shoesPrice + deliveryCharge;

Console.WriteLine($"Total bill: {totalBill} taka");  // 2360
```

**Scenario 3: সরাসরি number যোগ**

Variable ছাড়াও সরাসরি number যোগ করতে পারো:

```csharp
int quick = 100 + 50 + 25;
Console.WriteLine(quick);  // 175
```

### + দিয়ে text জোড়া দেওয়াও যায়

মজার ব্যাপার হলো, string এও + কাজ করে:

```csharp
string firstName = "Rahim";
string lastName = "Uddin";

string fullName = firstName + " " + lastName;
Console.WriteLine(fullName);  // Rahim Uddin
```

মাঝখানে একটা space দিলাম " " - না হলে "RahimUddin" হয়ে যেতো।

তবে string জোড়ার জন্য `$""` (interpolation) আরো ভালো। সেটা তুমি আগেই শিখেছো।

---

## বিয়োগ করা: The - Operator

এবার উল্টা scenario। তোমার কাছে টাকা আছে, খরচ করলে বাকি কত থাকবে?

```csharp
int wallet = 1000;
int spent = 350;

int remaining = wallet - spent;

Console.WriteLine($"Wallet e baki: {remaining} taka");  // 650
```

### বিয়োগে Negative আসতে পারে

ধরো তোমার কাছে 500 টাকা আছে, কিন্তু 800 টাকার জিনিস কিনতে চাও:

```csharp
int have = 500;
int need = 800;

int balance = have - need;

Console.WriteLine(balance);  // -300
```

মানে তোমার 300 টাকা ধার হয়ে যাবে! Negative value মানে ঘাটতি।

### আরো কিছু scenario

**Scenario 1: Countdown**

```csharp
int daysLeft = 30;

daysLeft = daysLeft - 1;  // একদিন গেলো
Console.WriteLine($"Baki {daysLeft} din");  // 29

daysLeft = daysLeft - 1;  // আরেকদিন গেলো
Console.WriteLine($"Baki {daysLeft} din");  // 28
```

**Scenario 2: Stock management**

```csharp
int stock = 100;  // 100 টা product আছে

// কিছু বিক্রি হলো
stock = stock - 15;
Console.WriteLine($"Stock: {stock}");  // 85

// আরো বিক্রি
stock = stock - 23;
Console.WriteLine($"Stock: {stock}");  // 62
```

**Scenario 3: বয়স বের করা**

```csharp
int currentYear = 2024;
int birthYear = 1999;

int age = currentYear - birthYear;

Console.WriteLine($"Tomar boyosh: {age} bochor");  // 25
```

---

## গুণ করা: The * Operator

গুণ চিহ্ন হিসেবে × লিখতে ইচ্ছা করবে, কিন্তু keyboard এ × নেই। তাই * (asterisk) use করতে হয়।

ধরো তুমি দোকানে গেলে। একটা চকলেটের দাম 25 টাকা। 4 টা কিনলে কত?

```csharp
int pricePerChocolate = 25;
int quantity = 4;

int totalPrice = pricePerChocolate * quantity;

Console.WriteLine($"Total: {totalPrice} taka");  // 100
```

### আরো কিছু scenario

**Scenario 1: ঘরের area বের করা**

```csharp
int length = 12;  // feet
int width = 10;   // feet

int area = length * width;

Console.WriteLine($"Room er area: {area} square feet");  // 120
```

**Scenario 2: মাসিক বেতন থেকে বাৎসরিক**

```csharp
int monthlySalary = 35000;
int months = 12;

int yearlySalary = monthlySalary * months;

Console.WriteLine($"Yearly salary: {yearlySalary} taka");  // 420000
```

**Scenario 3: Table print করা**

```csharp
int number = 7;

Console.WriteLine($"{number} x 1 = {number * 1}");
Console.WriteLine($"{number} x 2 = {number * 2}");
Console.WriteLine($"{number} x 3 = {number * 3}");
Console.WriteLine($"{number} x 4 = {number * 4}");
Console.WriteLine($"{number} x 5 = {number * 5}");
```

Output:
```
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
```

---

## ভাগ করা: The / Operator

5 জন বন্ধু মিলে 500 টাকার বিরিয়ানি খেলো। মাথাপিছু কত?

```csharp
int totalBill = 500;
int friends = 5;

int perPerson = totalBill / friends;

Console.WriteLine($"Matha pichu: {perPerson} taka");  // 100
```

এটা তো সোজা ছিল কারণ ভাগ নিঃশেষে হয়ে গেছে।

---

## ⚠️ Integer Division: সবচেয়ে বড় Trap!

এইখানে একটা বিশাল trap আছে যেটায় নতুনরা সবসময় পড়ে। মনোযোগ দিয়ে পড়ো।

ধরো 500 টাকা 3 জনে ভাগ করতে হবে:

```csharp
int totalBill = 500;
int friends = 3;

int perPerson = totalBill / friends;

Console.WriteLine(perPerson);  // 166 😱
```

500 ÷ 3 = 166.666... হওয়ার কথা, কিন্তু output আসলো 166!

**কেন এমন হলো?**

কারণ দুইটা `int` ভাগ করলে result ও `int` হয়। আর int মানে পূর্ণ সংখ্যা - দশমিক রাখতে পারে না। তাই C# দশমিক অংশটা ফেলে দিয়েছে।

এটাকে বলে **Integer Division**।

### আরো কিছু example দেখো

```csharp
Console.WriteLine(7 / 2);    // 3 (3.5 না!)
Console.WriteLine(10 / 3);   // 3 (3.33 না!)
Console.WriteLine(1 / 2);    // 0 (0.5 না!)
Console.WriteLine(99 / 100); // 0 (0.99 না!)
```

শেষেরটা দেখো - 99 কে 100 দিয়ে ভাগ করলে 0! কারণ 0.99 এর পূর্ণ অংশ হলো 0।

### সমাধান: Type Casting use করো

গত part এ আমরা type casting শিখেছি। এখানে সেটা কাজে লাগাবো।

**উপায় 1: double variable use করো**

```csharp
double totalBill = 500;
double friends = 3;

double perPerson = totalBill / friends;

Console.WriteLine(perPerson);  // 166.66666666666666 ✓
```

**উপায় 2: Explicit casting করো**

```csharp
int totalBill = 500;
int friends = 3;

double perPerson = (double)totalBill / friends;

Console.WriteLine(perPerson);  // 166.66666666666666 ✓
```

এখানে `(double)totalBill` করলাম। মানে totalBill কে temporarily double হিসেবে treat করো। তাহলে ভাগফলও double আসবে।

**উপায় 3: যেকোনো একটাকে double বানাও**

```csharp
int totalBill = 500;
int friends = 3;

// যেকোনো একটা .0 দিলেই হবে
double perPerson = totalBill / 3.0;

Console.WriteLine(perPerson);  // 166.66666666666666 ✓
```

### Real Life Example: Percentage বের করা

এটা সবচেয়ে common জায়গা যেখানে মানুষ ভুল করে:

```csharp
int obtained = 450;
int total = 500;

// ❌ ভুল! Integer division হবে
int wrongPercentage = obtained / total * 100;
Console.WriteLine(wrongPercentage);  // 0 😱

// কেন 0? কারণ 450/500 = 0 (integer division)
// তারপর 0 * 100 = 0
```

সঠিক উপায়:

```csharp
int obtained = 450;
int total = 500;

// ✓ সঠিক! আগে double এ নিলাম
double percentage = (double)obtained / total * 100;
Console.WriteLine(percentage);  // 90 ✓
```

### Real Life Example: Average বের করা

```csharp
int num1 = 10;
int num2 = 20;
int num3 = 25;

// ❌ ভুল উপায়
int wrongAverage = (num1 + num2 + num3) / 3;
Console.WriteLine(wrongAverage);  // 18 (আসলে 18.33...)

// ✓ সঠিক উপায়
double correctAverage = (double)(num1 + num2 + num3) / 3;
Console.WriteLine(correctAverage);  // 18.333333333333332
```

### Golden Rule 🌟

> যখনই ভাগ করবে এবং দশমিক দরকার, কমপক্ষে একটাকে `double` বানাও।

---

## ভাগশেষ: The % Operator (Modulus)

এটা একটু different। ভাগ করার পর যা বাকি থাকে সেটা দেয়।

ধরো 7 টা চকলেট 3 জনে সমানভাবে ভাগ করবে:

```csharp
int chocolates = 7;
int friends = 3;

int each = chocolates / friends;      // প্রত্যেকে পাবে
int remaining = chocolates % friends; // বাকি থাকবে

Console.WriteLine($"Prottek e pabe: {each} ta");    // 2
Console.WriteLine($"Baki thakbe: {remaining} ta");  // 1
```

7 ÷ 3 = 2, বাকি 1। ঐ 1 টাই % দিয়ে পাচ্ছো।

### % কোথায় কাজে লাগে?

**Use Case 1: জোড়/বিজোড় check**

এটা সবচেয়ে common use। যেকোনো number কে 2 দিয়ে ভাগ করলে যদি বাকি 0 থাকে, সেটা জোড়।

```csharp
int number = 15;

int remainder = number % 2;

if (remainder == 0)
{
    Console.WriteLine($"{number} jor");
}
else
{
    Console.WriteLine($"{number} bijor");  // এটা print হবে
}
```

কয়েকটা number দিয়ে check করি:

```csharp
Console.WriteLine(10 % 2);  // 0 → জোড়
Console.WriteLine(7 % 2);   // 1 → বিজোড়
Console.WriteLine(24 % 2);  // 0 → জোড়
Console.WriteLine(33 % 2);  // 1 → বিজোড়
```

**Use Case 2: কোনো number দিয়ে ভাগ যায় কিনা**

```csharp
int number = 15;

// 3 দিয়ে ভাগ যায়?
if (number % 3 == 0)
{
    Console.WriteLine("3 diye bhag jay");  // হ্যাঁ, 15 ÷ 3 = 5
}

// 4 দিয়ে ভাগ যায়?
if (number % 4 == 0)
{
    Console.WriteLine("4 diye bhag jay");
}
else
{
    Console.WriteLine("4 diye bhag jay na");  // এটা print হবে
}
```

**Use Case 3: ঘড়ির হিসাব**

মোট 135 মিনিট মানে কত ঘণ্টা কত মিনিট?

```csharp
int totalMinutes = 135;

int hours = totalMinutes / 60;    // কত ঘণ্টা
int minutes = totalMinutes % 60;  // বাকি মিনিট

Console.WriteLine($"{hours} ghonta {minutes} minute");  // 2 ghonta 15 minute
```

Same ভাবে সেকেন্ড থেকে মিনিট:

```csharp
int totalSeconds = 3725;

int mins = totalSeconds / 60;
int secs = totalSeconds % 60;

Console.WriteLine($"{mins} min {secs} sec");  // 62 min 5 sec
```

**Use Case 4: টাকা ভাঙানো**

1000 টাকা দিলে কয়টা 100 এর নোট আর বাকি কত?

```csharp
int amount = 1573;

int notes100 = amount / 100;
int remaining = amount % 100;

Console.WriteLine($"100 er note: {notes100} ta");  // 15 ta
Console.WriteLine($"Baki: {remaining} taka");      // 73 taka
```

---

## Operator Precedence: কে আগে হবে?

তুমি কি BODMAS/PEMDAS এর কথা শুনেছো? Math এ আগে bracket, তারপর গুণ-ভাগ, শেষে যোগ-বিয়োগ।

C# এও same rule।

```csharp
int result = 2 + 3 * 4;
Console.WriteLine(result);  // 14
```

কেন 14? কেন 20 না?

কারণ আগে গুণ হয়েছে: `3 * 4 = 12`
তারপর যোগ: `2 + 12 = 14`

### Bracket দিয়ে Order Change করো

20 চাইলে bracket দাও:

```csharp
int result = (2 + 3) * 4;
Console.WriteLine(result);  // 20
```

এখন আগে bracket এর মধ্যেরটা হলো: `2 + 3 = 5`
তারপর গুণ: `5 * 4 = 20`

### Priority তালিকা

| Priority | Operators | Example |
|----------|-----------|---------|
| 1st (সবার আগে) | () | (2 + 3) |
| 2nd | *, /, % | 3 * 4, 10 / 2, 7 % 3 |
| 3rd (সবার পরে) | +, - | 2 + 3, 5 - 1 |

### Same Priority হলে?

বাম থেকে ডানে যায়:

```csharp
int result = 100 / 10 * 2;
// বাম থেকে: 100 / 10 = 10
// তারপর: 10 * 2 = 20

Console.WriteLine(result);  // 20
```

---

## Bracket দিয়ে Equation Solve করা

এবার কিছু math এর equation solve করি C# দিয়ে।

### Equation 1: সরল সুদ

সূত্র: `I = (P × R × T) / 100`

```csharp
double principal = 10000;  // আসল টাকা
double rate = 5;           // সুদের হার
double time = 3;           // সময় (বছর)

double interest = (principal * rate * time) / 100;

Console.WriteLine($"Sud: {interest} taka");  // 1500
```

### Equation 2: বৃত্তের ক্ষেত্রফল

সূত্র: `A = π × r²`

```csharp
double pi = 3.14159;
double radius = 5;

double area = pi * radius * radius;

Console.WriteLine($"Area: {area}");  // 78.53975
```

### Equation 3: ফারেনহাইট থেকে সেলসিয়াস

সূত্র: `C = (F - 32) × 5/9`

```csharp
double fahrenheit = 98.6;

double celsius = (fahrenheit - 32) * 5 / 9;

Console.WriteLine($"{fahrenheit}°F = {celsius}°C");  // 37°C
```

এখানে bracket জরুরি! না দিলে:

```csharp
// ❌ ভুল - bracket ছাড়া
double wrong = fahrenheit - 32 * 5 / 9;
// = 98.6 - (32 * 5 / 9)
// = 98.6 - 17.77
// = 80.83 ❌
```

### Equation 4: কোয়াড্রাটিক এর discriminant

সূত্র: `D = b² - 4ac`

```csharp
double a = 1;
double b = 5;
double c = 6;

double discriminant = (b * b) - (4 * a * c);

Console.WriteLine($"Discriminant: {discriminant}");  // 1
```

### Equation 5: Average Speed

সূত্র: `Speed = Distance / Time`

```csharp
double distance = 150;  // km
double time = 2.5;      // hours

double speed = distance / time;

Console.WriteLine($"Speed: {speed} km/h");  // 60
```

### Equation 6: BMI Calculator

সূত্র: `BMI = weight / (height × height)`

```csharp
double weight = 70;    // kg
double height = 1.75;  // meter

double bmi = weight / (height * height);

Console.WriteLine($"BMI: {bmi:F2}");  // 22.86
```

`:F2` মানে 2 decimal places দেখাও।

---

## একটা Complete Project: Advanced Calculator

সব কিছু মিলিয়ে একটা calculator বানাই:

```csharp
Console.WriteLine("╔════════════════════════════════════╗");
Console.WriteLine("║      ADVANCED CALCULATOR           ║");
Console.WriteLine("╚════════════════════════════════════╝");
Console.WriteLine();

// Input নেওয়া
Console.Write("Prothom number dao: ");
double num1 = double.Parse(Console.ReadLine());

Console.Write("Dwitiyo number dao: ");
double num2 = double.Parse(Console.ReadLine());

// সব calculation
double sum = num1 + num2;
double difference = num1 - num2;
double product = num1 * num2;

// ভাগের আগে check করি
double quotient = 0;
double remainder = 0;
bool canDivide = num2 != 0;

if (canDivide)
{
    quotient = num1 / num2;
    remainder = num1 % num2;
}

// Results দেখানো
Console.WriteLine();
Console.WriteLine("╔════════════════════════════════════╗");
Console.WriteLine("║           RESULTS                  ║");
Console.WriteLine("╠════════════════════════════════════╣");
Console.WriteLine($"║  {num1} + {num2} = {sum,-20} ║");
Console.WriteLine($"║  {num1} - {num2} = {difference,-20} ║");
Console.WriteLine($"║  {num1} × {num2} = {product,-20} ║");

if (canDivide)
{
    Console.WriteLine($"║  {num1} ÷ {num2} = {quotient,-20:F2} ║");
    Console.WriteLine($"║  {num1} % {num2} = {remainder,-20} ║");
}
else
{
    Console.WriteLine("║  0 diye bhag kora jay na!         ║");
}

Console.WriteLine("╚════════════════════════════════════╝");
```

---

## Quick Reference Table

| Operator | নাম | কাজ | Example | Result |
|----------|-----|-----|---------|--------|
| + | Addition | যোগ | 10 + 3 | 13 |
| - | Subtraction | বিয়োগ | 10 - 3 | 7 |
| * | Multiplication | গুণ | 10 * 3 | 30 |
| / | Division | ভাগ | 10 / 3 | 3 (int), 3.33 (double) |
| % | Modulus | ভাগশেষ | 10 % 3 | 1 |

---

## Common Mistakes

### Mistake 1: Integer Division ভুলে যাওয়া

```csharp
// ❌ 0 আসবে!
int percentage = 45 / 100 * 100;

// ✓ casting করো
double percentage = (double)45 / 100 * 100;  // 45
```

### Mistake 2: × চিহ্ন ব্যবহার করা

```csharp
// ❌ কাজ করবে না
int result = 5 × 3;

// ✓ Asterisk দাও
int result = 5 * 3;
```

### Mistake 3: Precedence ভুলে যাওয়া

```csharp
// ❌ মনে হচ্ছে 20, আসলে 14
int result = 2 + 3 * 4;

// ✓ Bracket দিলে যা চাও তাই হবে
int result = (2 + 3) * 4;  // 20
```

### Mistake 4: 0 দিয়ে ভাগ করা

```csharp
// ❌ Program crash করবে!
int result = 10 / 0;

// ✓ Always check করো
int divisor = 0;
if (divisor != 0)
{
    int result = 10 / divisor;
}
else
{
    Console.WriteLine("0 diye bhag kora jay na!");
}
```

---

## Summary

আজকে শিখলে:

- **+** দিয়ে যোগ করা
- **-** দিয়ে বিয়োগ করা
- ***** দিয়ে গুণ করা (× না, * দিতে হবে)
- **/** দিয়ে ভাগ করা
- **Integer Division** - int ভাগ int = int, দশমিক হারায়!
- **Type Casting** দিয়ে integer division solve করা
- **%** দিয়ে ভাগশেষ বের করা (জোড়-বিজোড়, সময় convert এ কাজে লাগে)
- **Bracket** দিয়ে equation solve করা
- গুণ-ভাগ আগে হয়, যোগ-বিয়োগ পরে

**মনে রাখো:**
- দশমিক চাইলে অন্তত একটাকে double বানাও
- Confused হলে bracket দাও!
- 0 দিয়ে ভাগ করো না

**Next Part এ:** Assignment operators শিখবো। =, +=, -=, ++, -- এসব দিয়ে কীভাবে shortcut এ value update করা যায়।

---

*CPS Academy - Learn. Code. Grow.*
