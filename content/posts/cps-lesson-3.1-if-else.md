---
title: "Lesson 3.1: if, else, else if — Program কে Decision নিতে শেখানো"
date: "2026-03-11"
excerpt: "if statement, else, else if ladder, nested if, ternary operator (? :), এবং real-world examples (grade system, login, ATM, BMI)"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - conditions
  - if-else
  - switch
  - control-flow
draft: false
---


> **এই Lesson এ শিখবে:** if statement, else, else if ladder, nested if, ternary operator (? :), এবং real-world examples (grade system, login, ATM, BMI)।

---

## কেন Decision Making দরকার?

এতদিন আমরা শুধু true/false বের করেছি। কিন্তু শুধু true/false জেনে কী হবে? এটা দিয়ে কিছু করতে হবে তো!

ধরো তুমি ATM এ গেলে। PIN দিলে। এখন ATM check করবে — PIN ঠিক আছে? **যদি** ঠিক থাকে, টাকা দেবে। **নাহলে** বলবে "Wrong PIN!"

এই "যদি...তাহলে...নাহলে" — এটাই হলো if-else। Program কে decision নিতে শেখানো।

---

## if Statement — যদি...তাহলে

সবচেয়ে basic decision। শর্ত সত্য হলে কাজ করো:

```csharp
if (condition)
{
    // condition true হলে এই code চলবে
}
```

### প্রথম Example

```csharp
int age = 20;

if (age >= 18)
{
    Console.WriteLine("You are an adult!");
}

Console.WriteLine("Program ended.");
```

Output:
```
You are an adult!
Program ended.
```

age হলো 20, যেটা 18 এর বেশি। তাই condition true, তাই message টা print হলো।

### Condition False হলে?

```csharp
int age = 15;

if (age >= 18)
{
    Console.WriteLine("You are an adult!");
}

Console.WriteLine("Program ended.");
```

Output:
```
Program ended.
```

age হলো 15। Condition false, তাই if এর ভিতরের code skip হয়ে গেলো।

### আরো কিছু Examples

```csharp
// Pass Check
int marks = 75;
if (marks >= 33)
{
    Console.WriteLine("✅ Congratulations! You passed!");
}

// High Score
int currentScore = 950;
int highScore = 900;
if (currentScore > highScore)
{
    Console.WriteLine("🏆 NEW HIGH SCORE!");
}

// Discount Check
double purchaseAmount = 1500;
if (purchaseAmount >= 1000)
{
    double discount = purchaseAmount * 0.10;
    Console.WriteLine($"🎉 You get {discount} tk discount!");
}
```

---

## else Statement — নাহলে

if এর condition false হলে কী হবে সেটা বলতে `else` use করো:

```csharp
if (condition)
{
    // condition true হলে এটা চলবে
}
else
{
    // condition false হলে এটা চলবে
}
```

### Pass/Fail

```csharp
int marks = 28;

if (marks >= 33)
{
    Console.WriteLine("✅ You passed!");
}
else
{
    Console.WriteLine("❌ You failed.");
}
```

Output: `❌ You failed.`

### Login System

```csharp
string correctPassword = "secret123";

Console.Write("Enter password: ");
string input = Console.ReadLine();

if (input == correctPassword)
{
    Console.WriteLine("✅ Welcome! Login successful.");
}
else
{
    Console.WriteLine("❌ Wrong password! Access denied.");
}
```

### Even/Odd Check

```csharp
int number = 7;

if (number % 2 == 0)
{
    Console.WriteLine($"{number} is even.");
}
else
{
    Console.WriteLine($"{number} is odd.");
}
```

Output: `7 is odd.`

### Budget Check

```csharp
double productPrice = 1500;
double myBudget = 1200;

if (productPrice <= myBudget)
{
    Console.WriteLine("✅ You can buy this!");
}
else
{
    double shortage = productPrice - myBudget;
    Console.WriteLine($"❌ You need {shortage} tk more.");
}
```

Output: `❌ You need 300 tk more.`

---

## else if — একাধিক শর্ত

কখনো কখনো দুইটার বেশি option থাকে। তখন else if use করো:

```csharp
if (condition1)
{
    // condition1 true হলে
}
else if (condition2)
{
    // condition1 false, condition2 true হলে
}
else if (condition3)
{
    // উপরের দুইটাই false, condition3 true হলে
}
else
{
    // সব false হলে
}
```

### Grade Calculator

এটা সবচেয়ে classic example:

```csharp
int marks = 75;

if (marks >= 80)
{
    Console.WriteLine("Grade: A+");
}
else if (marks >= 70)
{
    Console.WriteLine("Grade: A");
}
else if (marks >= 60)
{
    Console.WriteLine("Grade: B");
}
else if (marks >= 50)
{
    Console.WriteLine("Grade: C");
}
else if (marks >= 40)
{
    Console.WriteLine("Grade: D");
}
else if (marks >= 33)
{
    Console.WriteLine("Grade: E");
}
else
{
    Console.WriteLine("Grade: F (Fail)");
}
```

marks = 75, তাই: 75 >= 80? No → 75 >= 70? **Yes!** → "Grade: A"

বাকিগুলো check ই করবে না। **একটা match হলে বের হয়ে যায়।**

### Temperature Check

```csharp
double temp = 32;

if (temp >= 40)
{
    Console.WriteLine("🔥 Extreme heat! Stay indoors.");
}
else if (temp >= 30)
{
    Console.WriteLine("☀️ Hot day. Stay hydrated.");
}
else if (temp >= 20)
{
    Console.WriteLine("😊 Pleasant weather. Enjoy!");
}
else if (temp >= 10)
{
    Console.WriteLine("🧥 Cool. Wear a jacket.");
}
else
{
    Console.WriteLine("❄️ Cold! Bundle up.");
}
```

Output: `☀️ Hot day. Stay hydrated.`

### BMI Calculator

```csharp
double weight = 70;   // kg
double height = 1.75; // meter

double bmi = weight / (height * height);

Console.WriteLine($"Your BMI: {bmi:F1}");

if (bmi < 18.5)
{
    Console.WriteLine("Underweight");
}
else if (bmi < 25)
{
    Console.WriteLine("Normal weight ✅");
}
else if (bmi < 30)
{
    Console.WriteLine("Overweight");
}
else
{
    Console.WriteLine("Obese");
}
```

Output:
```
Your BMI: 22.9
Normal weight ✅
```

---

## Nested if — if এর ভিতরে if

কখনো কখনো একটা condition true হলে আরেকটা condition check করতে হয়।

### Login + Permission

প্রথমে login check, তারপর admin কিনা check:

```csharp
bool isLoggedIn = true;
bool isAdmin = true;

if (isLoggedIn)
{
    Console.WriteLine("✅ Login successful!");
    
    if (isAdmin)
    {
        Console.WriteLine("👑 Welcome, Admin! You have full access.");
    }
    else
    {
        Console.WriteLine("👤 Welcome, User! Limited access.");
    }
}
else
{
    Console.WriteLine("❌ Please login first.");
}
```

Output:
```
✅ Login successful!
👑 Welcome, Admin! You have full access.
```

### ATM Withdrawal

প্রথমে PIN check, তারপর balance check:

```csharp
int correctPIN = 1234;
int enteredPIN = 1234;
double balance = 5000;
double withdrawAmount = 2000;

if (enteredPIN == correctPIN)
{
    Console.WriteLine("✅ PIN verified.");
    
    if (withdrawAmount <= balance)
    {
        balance -= withdrawAmount;
        Console.WriteLine($"💵 Withdrawn: {withdrawAmount} tk");
        Console.WriteLine($"📊 New balance: {balance} tk");
    }
    else
    {
        Console.WriteLine("❌ Insufficient balance!");
    }
}
else
{
    Console.WriteLine("❌ Wrong PIN!");
}
```

Output:
```
✅ PIN verified.
💵 Withdrawn: 2000 tk
📊 New balance: 3000 tk
```

---

## Ternary Operator (? :) — Shortcut if-else

Simple if-else কে এক line এ লেখার shortcut:

```csharp
variable = (condition) ? valueIfTrue : valueIfFalse;
```

### Basic Example

এই if-else:

```csharp
int age = 20;
string status;

if (age >= 18)
    status = "Adult";
else
    status = "Minor";
```

Ternary দিয়ে এক line এ:

```csharp
int age = 20;
string status = (age >= 18) ? "Adult" : "Minor";

Console.WriteLine(status);  // Adult
```

### আরো Examples

```csharp
// Pass/Fail
int marks = 45;
string result = (marks >= 33) ? "Pass" : "Fail";

// Even/Odd
int number = 7;
string type = (number % 2 == 0) ? "Even" : "Odd";

// Max of Two
int a = 10, b = 25;
int max = (a > b) ? a : b;  // 25

// Discount
bool isPremium = true;
int discount = isPremium ? 20 : 5;

// Console.WriteLine এর ভিতরেও
int stock = 5;
Console.WriteLine(stock > 0 ? "In Stock ✅" : "Out of Stock ❌");
```

### কখন Ternary Use করবে?

✅ **Use করো যখন:** Simple if-else, একটা value assign করা, code readable থাকে

❌ **Use করো না যখন:** Complex logic, multiple statements, nested conditions

```csharp
// ❌ পড়া কঠিন
string r = (a > b) ? (a > c ? "A wins" : "C wins") : (b > c ? "B wins" : "C wins");

// ✅ Clear
string r;
if (a > b && a > c) r = "A wins";
else if (b > c) r = "B wins";
else r = "C wins";
```

---

## Common Mistakes

### Mistake 1: = আর == গুলিয়ে ফেলা

```csharp
int x = 5;

if (x = 10)   // ❌ Error! এটা assignment
if (x == 10)  // ✓ এটা comparison
```

### Mistake 2: if এর পরে ; দেওয়া

```csharp
// ❌ Wrong! ; দিলে if empty হয়ে যায়, block সবসময় চলে
if (age >= 18);
{
    Console.WriteLine("Adult");  // এটা সবসময় চলবে!
}

// ✓ Correct
if (age >= 18)
{
    Console.WriteLine("Adult");
}
```

### Mistake 3: else if এর order ভুল

```csharp
int marks = 85;

// ❌ ভুল order! 85 >= 33 true, তাই প্রথমেই "E" দেখাবে
if (marks >= 33)
{
    Console.WriteLine("Grade: E");
}
else if (marks >= 80)
{
    Console.WriteLine("Grade: A+");  // এটা কখনোই চলবে না!
}

// ✓ সঠিক order — বড় থেকে ছোট
if (marks >= 80)
{
    Console.WriteLine("Grade: A+");  // ✓ 85 >= 80, match!
}
else if (marks >= 33)
{
    Console.WriteLine("Grade: E");
}
```

### Mistake 4: bool এ unnecessary comparison

```csharp
bool isLoggedIn = true;

if (isLoggedIn == true)  // ❌ Unnecessary
if (isLoggedIn)          // ✓ Clean

if (isLoggedIn == false) // ❌ Unnecessary
if (!isLoggedIn)         // ✓ Clean
```

---

## Summary

| Statement | কাজ |
|-----------|-----|
| if | condition true হলে code চালাও |
| else | condition false হলে code চালাও |
| else if | multiple conditions check করো (উপর থেকে নিচে) |
| nested if | if এর ভিতরে আরেক if |
| ternary (? :) | short if-else, simple cases এ |

**মনে রাখো:**
- if এর পরে `;` দিও না
- else if এ order matters — **বড় থেকে ছোটে** check করো
- bool variable এ `== true` লেখার দরকার নেই, শুধু `if (isLoggedIn)` যথেষ্ট
- Complex logic এ ternary avoid করো, if-else use করো
- একটা condition match হলে বাকি else if গুলো skip হয়ে যায়

---

**পরের Lesson:** switch Statement — অনেক options থেকে একটা select করা, switch expression (C# 8+)।

---

*CPS Academy - Learn. Code. Grow.*
