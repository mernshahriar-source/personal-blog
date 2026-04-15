---
title: "Lesson 4.2: if Statement — যদি...তাহলে"
date: "2026-05-01"
excerpt: "if syntax, bool variable ও direct condition, && ও || দিয়ে multiple conditions এবং common mistakes"
categories:
  - C# Course Scripts
tags:
  - csharp
  - if
  - conditionals
  - control-flow
draft: false
---

# Lesson 4.2: if Statement — যদি...তাহলে

> **এই Lesson এ শিখবে:** if syntax, bool variable দিয়ে if, direct condition দিয়ে if, condition false হলে কী হয়, && ও || দিয়ে multiple conditions, এবং Common Mistakes।

---

## if Syntax

```csharp
if (condition)
{
    // condition true হলে এই code চলবে
}
```

condition হলো যেকোনো কিছু যেটা `true` বা `false` দেয় — Module 2 তে শেখা comparison ও logical operators!

---

## bool Variable দিয়ে if

আগে bool এ রাখো, তারপর if এ দাও:

```csharp
int age = 20;
bool isAdult = age >= 18;  // true

if (isAdult)
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

**isAdult true, তাই if এর ভিতরের code চললো।**

---

## Direct Condition দিয়ে if

bool variable না বানিয়ে সরাসরি condition ও দেওয়া যায়:

```csharp
int age = 20;

if (age >= 18)
{
    Console.WriteLine("You are an adult!");
}
```

**দুইটা same কাজ করে** — যেটা readable সেটা use করো।

---

## Condition False হলে?

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

age 15, condition **false** → if block **skip** → পরের line এ গেলো।

---

## আরো Examples

### Pass Check:

```csharp
int marks = 75;

if (marks >= 40)
{
    Console.WriteLine("✅ Congratulations! You passed!");
}
```

### Login:

```csharp
string password = "abc123";
string correctPassword = "abc123";

if (password == correctPassword)
{
    Console.WriteLine("✅ Login successful!");
    Console.WriteLine("Welcome to your dashboard.");
}
```

### High Score:

```csharp
int currentScore = 950;
int highScore = 900;

if (currentScore > highScore)
{
    Console.WriteLine("🏆 NEW HIGH SCORE!");
}
```

### Discount:

```csharp
double purchaseAmount = 1500;

if (purchaseAmount >= 1000)
{
    double discount = purchaseAmount * 0.10;
    Console.WriteLine($"🎉 You get {discount} tk discount!");
}
```

---

## Multiple Conditions — && ও ||

Module 2 তে শেখা logical operators এখানে কাজে লাগছে!

### && (দুইটাই true হতে হবে):

```csharp
int age = 25;
bool hasLicense = true;

if (age >= 18 && hasLicense)
{
    Console.WriteLine("✅ You can drive!");
}
```

### || (একটা true হলেই হবে):

```csharp
bool isStudent = true;
bool isSenior = false;

if (isStudent || isSenior)
{
    Console.WriteLine("🎉 You get 20% discount!");
}
```

### bool Variable দিয়েও:

```csharp
bool isLoggedIn = true;
bool isAdmin = true;

bool hasAccess = isLoggedIn && isAdmin;

if (hasAccess)
{
    Console.WriteLine("👑 Admin panel access granted!");
}
```

---

## bool দিয়ে if — Clean Way

```csharp
bool isLoggedIn = true;

// ❌ Unnecessary
if (isLoggedIn == true)

// ✅ Clean — bool নিজেই true/false
if (isLoggedIn)

// ❌ Unnecessary
if (isLoggedIn == false)

// ✅ Clean — ! দিয়ে
if (!isLoggedIn)
```

**bool variable if এ দিলে `== true` লেখার দরকার নেই!**

---

## Common Mistakes

### Mistake 1: = আর == গুলিয়ে ফেলা

```csharp
if (age = 18)   // ❌ assignment! comparison না!
if (age == 18)  // ✅ comparison
```

### Mistake 2: if এর পর semicolon

```csharp
if (age >= 18);  // ❌ semicolon দিলে if কাজ করবে না!
{
    Console.WriteLine("Adult");  // সবসময় চলবে!
}

if (age >= 18)   // ✅
{
    Console.WriteLine("Adult");
}
```

### Mistake 3: {} ভুলে যাওয়া

```csharp
// ❌ {} ছাড়া শুধু পরের 1 line if এর
if (marks >= 40)
    Console.WriteLine("Passed");
    Console.WriteLine("Grade: A");  // এটা সবসময় চলবে! if এর বাইরে!

// ✅ {} দাও
if (marks >= 40)
{
    Console.WriteLine("Passed");
    Console.WriteLine("Grade: A");
}
```

---

## Summary

```csharp
// bool variable দিয়ে
bool passed = marks >= 40;
if (passed) { ... }

// direct condition দিয়ে
if (marks >= 40) { ... }

// multiple conditions
if (age >= 18 && hasID) { ... }
if (isStudent || isSenior) { ... }

// bool clean way
if (isLoggedIn) { ... }    // == true দরকার নেই
if (!isLoggedIn) { ... }   // == false দরকার নেই
```

**মনে রাখো:**
- `==` comparison, `=` assignment
- if এর পর **semicolon দিও না**
- সবসময় **`{}`** use করো
- bool এ `== true` লাগে না

---

**পরের Lesson:** else ও else if — "নাহলে কী করবে" এবং Grade system।

---

*CPS Academy - Learn. Code. Grow.*
