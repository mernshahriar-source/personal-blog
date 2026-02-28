---
title: "Lesson 2.4: Operators — Arithmetic, Assignment, Comparison, Logical"
date: "2026-03-10"
excerpt: "Arithmetic operators (+, -, *, /, %), integer division trap, assignment operators (+=, -=, ++, --), comparison operators (==, !=, >, <, >=, <=), logical operators (&&, ||, !), operator precedence"
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


> **এই Lesson এ শিখবে:** Arithmetic operators (+, -, *, /, %), integer division trap, assignment operators (+=, -=, ++, --), comparison operators (==, !=, >, <, >=, <=), logical operators (&&, ||, !), operator precedence।

---

## Part 1: Arithmetic Operators

তুমি কি calculator use করেছো কখনো? যোগ, বিয়োগ, গুণ, ভাগ — এগুলো ছাড়া তো হিসাব করাই যায় না। C# এও তোমার program কে এসব শেখাতে হবে।

### যোগ: The + Operator

ধরো তুমি একটা চায়ের দোকান চালাও। সকালে 50 টাকা আয় হলো, বিকালে 80 টাকা:

```csharp
int sokal = 50;
int bikal = 80;
int total = sokal + bikal;

Console.WriteLine($"Aj total income: {total} taka");  // 130
```

পরীক্ষার নম্বর যোগ:

```csharp
int bangla = 75;
int english = 82;
int math = 90;
int science = 88;

int total = bangla + english + math + science;
Console.WriteLine($"Total marks: {total}");  // 335
```

মনে আছে, string এও `+` কাজ করে? সেটা concatenation — জোড়া লাগায়, যোগ করে না:

```csharp
string firstName = "Rahim";
string lastName = "Uddin";
string fullName = firstName + " " + lastName;  // "Rahim Uddin"
```

### বিয়োগ: The - Operator

```csharp
int wallet = 1000;
int spent = 350;
int remaining = wallet - spent;

Console.WriteLine($"Wallet e baki: {remaining} taka");  // 650
```

বয়স বের করা:

```csharp
int currentYear = 2025;
int birthYear = 1999;
int age = currentYear - birthYear;

Console.WriteLine($"Tomar boyosh: {age} bochor");  // 26
```

### গুণ: The * Operator

Keyboard এ × নেই, তাই `*` (asterisk) use করতে হয়:

```csharp
int pricePerChocolate = 25;
int quantity = 4;
int totalPrice = pricePerChocolate * quantity;

Console.WriteLine($"Total: {totalPrice} taka");  // 100
```

মাসিক বেতন থেকে বাৎসরিক:

```csharp
int monthlySalary = 35000;
int yearlySalary = monthlySalary * 12;

Console.WriteLine($"Yearly salary: {yearlySalary} taka");  // 420000
```

### ভাগ: The / Operator

```csharp
int totalBill = 500;
int friends = 5;
int perPerson = totalBill / friends;

Console.WriteLine($"Matha pichu: {perPerson} taka");  // 100
```

---

## ⚠️ Integer Division: সবচেয়ে বড় Trap!

এইখানে একটা বিশাল trap আছে যেটায় নতুনরা সবসময় পড়ে। মনোযোগ দিয়ে পড়ো।

```csharp
int totalBill = 500;
int friends = 3;
int perPerson = totalBill / friends;

Console.WriteLine(perPerson);  // 166 😱 (166.666... না!)
```

**কেন?** দুইটা `int` ভাগ করলে result ও `int` হয়। দশমিক রাখতে পারে না, তাই C# দশমিক ফেলে দেয়।

আরো ভয়ঙ্কর:

```csharp
Console.WriteLine(7 / 2);    // 3 (3.5 না!)
Console.WriteLine(1 / 2);    // 0 (0.5 না!)
Console.WriteLine(99 / 100); // 0 (0.99 না!)
```

### সমাধান: Type Casting

গত lesson এ শেখা casting এখানে কাজে লাগবে:

```csharp
int totalBill = 500;
int friends = 3;

// উপায় 1: Explicit casting
double perPerson = (double)totalBill / friends;
Console.WriteLine(perPerson);  // 166.66666666666666 ✓

// উপায় 2: .0 দিলেও হয়
double perPerson2 = totalBill / 3.0;
Console.WriteLine(perPerson2);  // 166.66666666666666 ✓
```

**সবচেয়ে Common ভুল — Percentage বের করা:**

```csharp
int obtained = 450;
int total = 500;

// ❌ ভুল! 450/500 = 0 (integer division), তারপর 0 * 100 = 0
int wrong = obtained / total * 100;  // 0 😱

// ✓ সঠিক!
double percentage = (double)obtained / total * 100;  // 90 ✓
```

> **Golden Rule:** যখনই ভাগ করবে এবং দশমিক দরকার, কমপক্ষে একটাকে `double` বানাও।

---

## ভাগশেষ: The % Operator (Modulus)

ভাগ করার পর যা **বাকি** থাকে সেটা দেয়:

```csharp
int chocolates = 7;
int friends = 3;

int each = chocolates / friends;      // 2 (প্রত্যেকে পাবে)
int remaining = chocolates % friends; // 1 (বাকি থাকবে)
```

### % কোথায় কাজে লাগে?

**জোড়/বিজোড় check:**

```csharp
Console.WriteLine(10 % 2);  // 0 → জোড়
Console.WriteLine(7 % 2);   // 1 → বিজোড়
```

**সময় convert:**

```csharp
int totalMinutes = 135;

int hours = totalMinutes / 60;    // 2 ঘণ্টা
int minutes = totalMinutes % 60;  // 15 মিনিট

Console.WriteLine($"{hours} ghonta {minutes} minute");  // 2 ghonta 15 minute
```

**টাকা ভাঙানো:**

```csharp
int amount = 1573;

int notes100 = amount / 100;   // 15 টা 100 এর নোট
int remaining = amount % 100;  // 73 টাকা বাকি
```

---

## Operator Precedence

BODMAS/PEMDAS মনে আছে? C# এও same rule — আগে গুণ-ভাগ, পরে যোগ-বিয়োগ:

```csharp
int result = 2 + 3 * 4;
Console.WriteLine(result);  // 14 (আগে 3*4=12, তারপর 2+12=14)

int result2 = (2 + 3) * 4;
Console.WriteLine(result2);  // 20 (bracket আগে!)
```

| Priority | Operators |
|----------|-----------|
| 1st (সবার আগে) | () bracket |
| 2nd | *, /, % |
| 3rd (সবার পরে) | +, - |

**কিছু Equation solve করি:**

```csharp
// সরল সুদ: I = (P × R × T) / 100
double interest = (10000 * 5 * 3) / 100.0;  // 1500

// ফারেনহাইট → সেলসিয়াস: C = (F - 32) × 5/9
double celsius = (98.6 - 32) * 5 / 9;  // 37

// BMI: weight / (height × height)
double bmi = 70 / (1.75 * 1.75);  // 22.86
```

---

## Part 2: Assignment Operators

ধরো তুমি PUBG খেলছো। প্রতিটা kill এ score বাড়ে, damage খেলে health কমে। এই বাড়ানো-কমানোর shortcut হলো assignment operators।

### += (যোগ করে রাখো)

`score = score + 10` এর shortcut হলো `score += 10`:

```csharp
int score = 0;

score += 100;  // Enemy killed!
Console.WriteLine(score);  // 100

score += 50;   // Headshot bonus!
Console.WriteLine(score);  // 150

score += 500;  // Level complete!
Console.WriteLine(score);  // 650
```

### -= (বিয়োগ করে রাখো)

```csharp
int health = 100;

health -= 15;  // Bullet hit!
Console.WriteLine(health);  // 85

health -= 35;  // Grenade!
Console.WriteLine(health);  // 50

health += 30;  // Health pack! (এখানে += দিয়ে বাড়ালাম)
Console.WriteLine(health);  // 80
```

### *= এবং /=

```csharp
int coins = 100;
coins *= 2;  // Double coins power-up!
Console.WriteLine(coins);  // 200

double bill = 1200;
bill /= 4;  // 4 জনে ভাগ
Console.WriteLine(bill);  // 300
```

### %= (ভাগশেষ রাখো)

```csharp
int hour = 13;
hour %= 12;  // 12-hour format এ convert
Console.WriteLine(hour);  // 1 (1 PM)
```

### সব Shortcut একনজরে

| Shortcut | মানে | Example |
|----------|------|---------|
| x += 5 | x = x + 5 | score += 100 |
| x -= 5 | x = x - 5 | health -= 20 |
| x *= 2 | x = x * 2 | coins *= 2 |
| x /= 2 | x = x / 2 | bill /= 4 |
| x %= 10 | x = x % 10 | hour %= 12 |

---

## ++ এবং -- (Increment/Decrement)

সবচেয়ে বেশি use হয়। value কে 1 বাড়াতে বা কমাতে:

```csharp
int likes = 100;
likes++;  // 101 (likes += 1 এর shortcut)

int lives = 3;
lives--;  // 2 (lives -= 1 এর shortcut)
```

তিনটাই same কাজ করে:

```csharp
count = count + 1;
count += 1;
count++;  // সবচেয়ে short!
```

### ++x vs x++ এর পার্থক্য

```csharp
int a = 5;
Console.WriteLine(a++);  // 5 (আগে use, তারপর বাড়াও)
Console.WriteLine(a);    // 6

int b = 5;
Console.WriteLine(++b);  // 6 (আগে বাড়াও, তারপর use)
Console.WriteLine(b);    // 6
```

**মনে রাখার সহজ উপায়:**
- `x++` → "use করো, তারপর বাড়াও" (++ পরে)
- `++x` → "বাড়াও, তারপর use করো" (++ আগে)

**Suggestion:** Complex expression এ ++ use না করাই ভালো। আলাদা line এ লেখো — code readable থাকে:

```csharp
int count = 5;
count++;  // আলাদা line, confusion নেই!
Console.WriteLine(count);  // 6
```

---

## Part 3: Comparison Operators

তুমি কি কখনো ভেবেছো Facebook কীভাবে বুঝে তোমার password সঠিক? ATM কীভাবে বুঝে PIN ঠিক? Game কীভাবে বুঝে pass নাকি fail?

সব comparison দিয়ে! Comparison এর result সবসময় `true` অথবা `false` (boolean):

```csharp
bool result = 5 > 3;
Console.WriteLine(result);  // True
```

### == (Equal to) — সমান কিনা?

```csharp
Console.WriteLine(5 == 5);   // True
Console.WriteLine(10 == 20); // False
```

**⚠️ সাবধান! `=` আর `==` এক না!**

```csharp
int x = 10;    // x এ 10 বসালাম (assignment)
x == 10;       // x কি 10? (comparison) → True
```

**Password check:**

```csharp
string correctPassword = "abc123";
string userInput = "abc123";

bool isCorrect = userInput == correctPassword;
Console.WriteLine($"Password correct? {isCorrect}");  // True
```

### != (Not Equal) — সমান না?

```csharp
Console.WriteLine(5 != 10);  // True (5 আর 10 সমান না)
Console.WriteLine(5 != 5);   // False (5 আর 5 সমান, তাই "সমান না" = False)
```

0 দিয়ে ভাগ করা safe কিনা:

```csharp
int divisor = 5;
bool canDivide = divisor != 0;  // True — safe!
```

### > (Greater Than) এবং < (Less Than)

```csharp
Console.WriteLine(10 > 5);   // True
Console.WriteLine(3 > 8);    // False

Console.WriteLine(3 < 10);   // True
Console.WriteLine(15 < 10);  // False
```

**জ্বর check:**

```csharp
double temperature = 38.5;
bool hasFever = temperature > 37.5;  // True
```

**Low battery:**

```csharp
int batteryLevel = 15;
bool lowBattery = batteryLevel < 20;  // True
```

### >= (Greater or Equal) এবং <= (Less or Equal)

```csharp
int age = 18;

Console.WriteLine(age > 18);   // False (18, 18 এর চেয়ে বড় না!)
Console.WriteLine(age >= 18);  // True (18, 18 এর সমান — তাই True!)
```

**এটা খুব important পার্থক্য:**
- `> 18` মানে 19, 20, 21, ... (18 বাদ)
- `>= 18` মানে 18, 19, 20, 21, ... (18 সহ)

**Pass/Fail check:**

```csharp
int marks = 33;
int passingMark = 33;

bool passed = marks >= passingMark;  // True (exactly 33 তেও pass!)
```

**Budget check:**

```csharp
double itemPrice = 500;
double budget = 500;

bool affordable = itemPrice <= budget;  // True (exactly budget এও কিনতে পারবে)
```

### String Comparison — Case Sensitive!

```csharp
string a = "Hello";
string b = "hello";

Console.WriteLine(a == b);  // False! (H আর h আলাদা)

// Case ignore করতে:
bool same = a.ToLower() == b.ToLower();
Console.WriteLine(same);  // True
```

### Quick Reference

| Operator | নাম | Example | Result |
|----------|-----|---------|--------|
| == | সমান | 5 == 5 | True |
| != | সমান না | 5 != 3 | True |
| > | বড় | 10 > 5 | True |
| < | ছোট | 3 < 8 | True |
| >= | বড় বা সমান | 5 >= 5 | True |
| <= | ছোট বা সমান | 4 <= 5 | True |

---

## Part 4: Logical Operators

ধরো তুমি bKash থেকে টাকা পাঠাতে চাও। PIN সঠিক হতে হবে **আর** balance থাকতে হবে। দুইটাই লাগবে — একটা হলে হবে না।

আবার ধরো YouTube Premium এ discount চাও। Student **অথবা** Senior citizen — যেকোনো একটা হলেই পাবে।

এই "আর" আর "অথবা" হলো Logical Operators।

### && (AND) — দুইটাই true হতে হবে

```csharp
bool hasMoney = true;
bool hasTime = true;
bool canGoMovie = hasMoney && hasTime;

Console.WriteLine(canGoMovie);  // True (দুইটাই আছে!)
```

```csharp
bool hasMoney = true;
bool hasTime = false;
bool canGoMovie = hasMoney && hasTime;

Console.WriteLine(canGoMovie);  // False (একটা false হওয়াতে পুরোটাই False)
```

**&& Truth Table:**

| A | B | A && B |
|---|---|--------|
| true | true | **true** ✅ |
| true | false | false |
| false | true | false |
| false | false | false |

শুধু দুইটাই true হলেই result true।

**bKash Transaction:**

```csharp
bool pinCorrect = true;
bool hasBalance = false;

bool canSend = pinCorrect && hasBalance;
Console.WriteLine($"Can send money? {canSend}");  // False (balance নেই!)
```

**Driving License — তিনটা condition:**

```csharp
int age = 20;
bool passedTest = true;
bool hasDocuments = true;

bool canGetLicense = age >= 18 && passedTest && hasDocuments;
Console.WriteLine($"Can get license? {canGetLicense}");  // True
```

### || (OR) — যেকোনো একটা হলেই হবে

```csharp
bool isStudent = true;
bool isSenior = false;

bool getsDiscount = isStudent || isSenior;
Console.WriteLine(getsDiscount);  // True (student তো, discount পাবে!)
```

**|| Truth Table:**

| A | B | A \|\| B |
|---|---|----------|
| true | true | **true** |
| true | false | **true** |
| false | true | **true** |
| false | false | false |

একটাও true হলেই result true। দুইটাই false হলে তবেই false।

**Weekend check:**

```csharp
string today = "Saturday";
bool isWeekend = today == "Saturday" || today == "Sunday";
Console.WriteLine($"Is weekend? {isWeekend}");  // True
```

**Payment method:**

```csharp
string method = "bKash";
bool validPayment = method == "bKash" || method == "Nagad" || method == "Card";
Console.WriteLine($"Valid payment? {validPayment}");  // True
```

### ! (NOT) — উল্টা করে দাও

`!` operator true কে false, আর false কে true বানায়:

```csharp
bool isLoggedIn = false;
bool notLoggedIn = !isLoggedIn;

Console.WriteLine($"Not logged in? {notLoggedIn}");  // True
```

**Toggle switch:**

```csharp
bool lightOn = true;
Console.WriteLine($"Light on? {lightOn}");  // True

lightOn = !lightOn;  // Toggle!
Console.WriteLine($"Light on? {lightOn}");  // False

lightOn = !lightOn;  // Toggle again!
Console.WriteLine($"Light on? {lightOn}");  // True
```

### Combining && এবং ||

Real life এ একসাথে use করতে হয়:

**Loan Eligibility:**

```csharp
int age = 30;
int income = 35000;
int creditScore = 700;
bool hasExistingLoan = false;

bool ageOk = age >= 21 && age <= 60;
bool incomeOk = income >= 25000;
bool creditOk = creditScore >= 650;
bool noLoan = !hasExistingLoan;

bool eligible = ageOk && incomeOk && creditOk && noLoan;

Console.WriteLine($"Eligible for loan? {eligible}");  // True
```

Income কম হলে:

```csharp
int income = 15000;  // কম!
bool incomeOk = income >= 25000;  // False

// বাকি সব true হলেও, একটা false থাকায় eligible = False
```

### Short-circuit Evaluation

&& এ প্রথমটা false হলে দ্বিতীয়টা check হয় না (কারণ result তো false-ই):

```csharp
bool result = false && true;  // false, দ্বিতীয়টা skip!
```

|| এ প্রথমটা true হলে দ্বিতীয়টা check হয় না:

```csharp
bool result = true || false;  // true, দ্বিতীয়টা skip!
```

### Logical Operator Priority

| Priority | Operator |
|----------|----------|
| 1st | ! (NOT) |
| 2nd | && (AND) |
| 3rd | \|\| (OR) |

**Suggestion:** Complex condition হলে সবসময় bracket দাও — confusion থাকবে না:

```csharp
// 🤔 Confusing
bool result = a || b && !c;

// ✅ Clear
bool result = a || (b && (!c));
```

---

## একটা Complete Example: Student Result System

সব operator একসাথে use করে:

```csharp
Console.WriteLine("=== Student Result System ===\n");

// Input
Console.Write("Bangla marks: ");
int bangla = int.Parse(Console.ReadLine());

Console.Write("English marks: ");
int english = int.Parse(Console.ReadLine());

Console.Write("Math marks: ");
int math = int.Parse(Console.ReadLine());

// Calculations (Arithmetic operators)
int totalMarks = bangla + english + math;
double percentage = (double)totalMarks / 300 * 100;
double average = (double)totalMarks / 3;

// Results (Assignment operators)
int bonusPoints = 0;
if (percentage >= 90)
{
    bonusPoints += 10;  // +=
}

totalMarks += bonusPoints;

// Checks (Comparison + Logical operators)
bool allPassed = bangla >= 33 && english >= 33 && math >= 33;
bool gotStar = percentage >= 80 || bonusPoints > 0;
bool failed = !allPassed;

// Grade
string grade;
if (percentage >= 80) grade = "A+";
else if (percentage >= 70) grade = "A";
else if (percentage >= 60) grade = "B";
else if (percentage >= 50) grade = "C";
else if (percentage >= 33) grade = "D";
else grade = "F";

// Output
Console.WriteLine($"\n=== Result Card ===");
Console.WriteLine($"Total: {totalMarks}/300");
Console.WriteLine($"Percentage: {percentage:F2}%");
Console.WriteLine($"Average: {average:F2}");
Console.WriteLine($"Grade: {grade}");
Console.WriteLine($"Bonus Points: {bonusPoints}");
Console.WriteLine($"All Subjects Passed? {allPassed}");
Console.WriteLine($"Star Student? {gotStar}");
Console.WriteLine($"Failed? {failed}");
```

---

## Common Mistakes (সব Operator এর)

### Mistake 1: Integer Division ভুলে যাওয়া

```csharp
// ❌ 0 আসবে!
int percentage = 45 / 100 * 100;

// ✓ casting করো
double percentage = (double)45 / 100 * 100;  // 45
```

### Mistake 2: = আর == গুলিয়ে ফেলা

```csharp
int x = 5;

if (x = 10)   // ❌ Error! এটা assignment
if (x == 10)  // ✓ এটা comparison
```

### Mistake 3: > আর >= এর পার্থক্য না বোঝা

```csharp
int marks = 33;

marks > 33;   // False (33 নিজে 33 এর চেয়ে বড় না)
marks >= 33;  // True (33, 33 এর সমান) ✓
```

### Mistake 4: String case ignore না করা

```csharp
string input = "YES";

input == "yes";            // ❌ False!
input.ToLower() == "yes";  // ✓ True
```

### Mistake 5: & আর && গুলিয়ে ফেলা

```csharp
// ❌ & হলো bitwise AND (different জিনিস)
// ✓ && হলো logical AND (এটা চাই)
bool result = true && false;  // ✓
```

### Mistake 6: 0 দিয়ে ভাগ করা

```csharp
// ❌ Program crash!
int result = 10 / 0;

// ✓ Always check করো
int divisor = 0;
if (divisor != 0)
{
    int result = 10 / divisor;
}
```

---

## Master Summary Table

### Arithmetic Operators

| Operator | নাম | Example | Result |
|----------|-----|---------|--------|
| + | যোগ | 10 + 3 | 13 |
| - | বিয়োগ | 10 - 3 | 7 |
| * | গুণ | 10 * 3 | 30 |
| / | ভাগ | 10 / 3 | 3 (int) |
| % | ভাগশেষ | 10 % 3 | 1 |

### Assignment Operators

| Shortcut | মানে |
|----------|------|
| x += 5 | x = x + 5 |
| x -= 5 | x = x - 5 |
| x *= 2 | x = x * 2 |
| x /= 2 | x = x / 2 |
| x++ | x = x + 1 |
| x-- | x = x - 1 |

### Comparison Operators

| Operator | মানে | True কখন হয় |
|----------|------|-------------|
| == | সমান | দুইটা same হলে |
| != | সমান না | দুইটা different হলে |
| > | বড় | বাম পাশেরটা বড় হলে |
| < | ছোট | বাম পাশেরটা ছোট হলে |
| >= | বড় বা সমান | বড় অথবা same হলে |
| <= | ছোট বা সমান | ছোট অথবা same হলে |

### Logical Operators

| Operator | কখন true হয় |
|----------|-------------|
| && (AND) | দুইটাই true হলে |
| \|\| (OR) | যেকোনো একটা true হলে |
| ! (NOT) | false হলে |

**Key Takeaways:**
- Integer division trap এড়াও — দশমিক চাইলে double use করো
- `=` বসানো, `==` তুলনা — কখনো গুলিয়ে ফেলো না
- `>=` আর `>` এর পার্থক্য বোঝো
- Complex condition এ bracket দাও
- Short-circuit: && এ প্রথমটা false হলে বাকি skip, || এ প্রথমটা true হলে বাকি skip

---

**পরের Module:** Conditional Statements — if, else if, else, switch দিয়ে program কে decision নিতে শেখানো। আজকের সব true/false দিয়ে আসল কাজ শুরু হবে!

---

*CPS Academy - Learn. Code. Grow.*
