---
title: "Lesson 2.8: Logical Operators — &&, ||, ! দিয়ে Condition Combine"
date: "2026-04-18"
excerpt: "AND, OR, NOT, Truth Tables, Short-circuit evaluation, real-world examples"
categories:
  - C# Course Scripts
tags:
  - csharp
  - operators
  - logical
  - boolean
  - conditions
draft: false
---

# Lesson 2.5: Logical Operators — &&, ||, ! দিয়ে Condition Combine

> **এই Lesson এ শিখবে:** && (AND — দুইটাই true হতে হবে), || (OR — একটা হলেই হবে), ! (NOT — উল্টা করে দাও), Truth Tables, Combining && ও ||, Short-circuit evaluation, এবং real-world examples (Login, Loan, Game unlock, Flight booking)।

---

## && (AND) — দুইটাই সত্য হতে হবে

দুইটা condition **দুইটাই true** হলে result true:

```csharp
bool hasMoney = true;
bool hasTime = true;

bool canGoMovie = hasMoney && hasTime;
Console.WriteLine(canGoMovie);  // True
```

**একটাও false হলে পুরোটা false:**

```csharp
bool hasMoney = true;
bool hasTime = false;

bool canGoMovie = hasMoney && hasTime;
Console.WriteLine(canGoMovie);  // False
```

### && Truth Table:

| A | B | A && B |
|---|---|--------|
| true | true | **true** ✅ |
| true | false | false |
| false | true | false |
| false | false | false |

### Login System:

```csharp
bool usernameCorrect = true;
bool passwordCorrect = true;

bool loginSuccess = usernameCorrect && passwordCorrect;
Console.WriteLine($"Login success? {loginSuccess}");  // True
```

Username ঠিক, password ভুল:

```csharp
bool usernameCorrect = true;
bool passwordCorrect = false;

bool loginSuccess = usernameCorrect && passwordCorrect;
Console.WriteLine($"Login success? {loginSuccess}");  // False
```

### Game Feature Unlock (Level 10+ আর 300+ coins):

```csharp
int playerLevel = 15;
int playerCoins = 500;

bool canUnlock = playerLevel >= 10 && playerCoins >= 300;
Console.WriteLine($"Can unlock? {canUnlock}");  // True
```

### তিনটা Condition ও && দিয়ে:

```csharp
int age = 20;
bool passedTest = true;
bool hasDocuments = true;

bool canGetLicense = age >= 18 && passedTest && hasDocuments;
Console.WriteLine($"Can get license? {canGetLicense}");  // True
```

---

## || (OR) — যেকোনো একটা হলেই হবে

**একটাও true** হলে result true:

```csharp
bool isStudent = true;
bool isSenior = false;

bool getsDiscount = isStudent || isSenior;
Console.WriteLine(getsDiscount);  // True (Student, তাই discount!)
```

**দুইটাই false হলে false:**

```csharp
bool isStudent = false;
bool isSenior = false;

bool getsDiscount = isStudent || isSenior;
Console.WriteLine(getsDiscount);  // False
```

### || Truth Table:

| A | B | A \|\| B |
|---|---|----------|
| true | true | **true** |
| true | false | **true** |
| false | true | **true** |
| false | false | false |

### Payment Options:

```csharp
bool hasCash = false;
bool hasCard = true;
bool hasBkash = false;

bool canPay = hasCash || hasCard || hasBkash;
Console.WriteLine($"Can pay? {canPay}");  // True (Card আছে!)
```

### Emergency Access:

```csharp
bool isAdmin = false;
bool isEmergency = true;

bool canAccess = isAdmin || isEmergency;
Console.WriteLine($"Access granted? {canAccess}");  // True
```

---

## ! (NOT) — উল্টা করে দাও

true কে false, false কে true:

```csharp
bool isLoggedIn = false;
Console.WriteLine(!isLoggedIn);  // True (logged in না!)

bool gameOver = true;
Console.WriteLine(!gameOver);  // False
```

### ! Truth Table:

| A | !A |
|---|-----|
| true | false |
| false | true |

### Toggle Switch (Light on/off):

```csharp
bool lightOn = true;
Console.WriteLine($"Light: {lightOn}");    // True

lightOn = !lightOn;  // Toggle!
Console.WriteLine($"Light: {lightOn}");    // False

lightOn = !lightOn;  // Toggle again!
Console.WriteLine($"Light: {lightOn}");    // True
```

### "loan নেই" check:

```csharp
bool hasExistingLoan = false;
bool noLoan = !hasExistingLoan;
Console.WriteLine($"No loan? {noLoan}");  // True
```

---

## Combining && এবং ||

### Loan Eligibility:

Age 21-60, Income 25000+, Credit 650+, আর loan নেই:

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

Console.WriteLine($"Age OK? {ageOk}");       // True
Console.WriteLine($"Income OK? {incomeOk}"); // True
Console.WriteLine($"Credit OK? {creditOk}"); // True
Console.WriteLine($"No loan? {noLoan}");     // True
Console.WriteLine($"Eligible? {eligible}");  // True
```

Income কম হলে:

```csharp
int income = 15000;
bool incomeOk = income >= 25000;  // False!
// eligible ও False হবে — কারণ && এ সব true হতে হবে
```

### Movie Discount:

Child (12-) **বা** Senior (60+) **বা** (weekday **আর** morning):

```csharp
int age = 25;
bool isWeekday = true;
bool isMorningShow = true;

bool isChild = age <= 12;
bool isSenior = age >= 60;
bool specialOffer = isWeekday && isMorningShow;

bool getsDiscount = isChild || isSenior || specialOffer;
Console.WriteLine($"Gets discount? {getsDiscount}");  // True (specialOffer!)
```

---

## Short-circuit Evaluation

&& এ **প্রথমটা false** হলে পরেরটা check হয় না (কারণ result false ই হবে):

```csharp
bool a = false;
bool b = true;

bool result = a && b;  // a false, তাই b check-ই হয়নি!
```

|| এ **প্রথমটা true** হলে পরেরটা check হয় না:

```csharp
bool a = true;
bool b = false;

bool result = a || b;  // a true, তাই b check হয়নি!
```

---

## Operator Priority

| Priority | Operator |
|----------|----------|
| 1 (আগে) | `!` |
| 2 | `&&` |
| 3 (পরে) | `||` |

**Confused হলে bracket দাও!**

```csharp
// এটা confusing
bool r = a || b && c;

// এটা clear
bool r = a || (b && c);
```

---

## Quick Reference

| Operator | নাম | কখন true |
|----------|-----|----------|
| `&&` | AND | **দুইটাই** true |
| `\|\|` | OR | **একটাও** true |
| `!` | NOT | false হলে |

---

## Common Mistakes

### Mistake 1: & আর && গুলিয়ে ফেলা

```csharp
// && use করো (logical AND)
// & আলাদা জিনিস (bitwise AND)
bool result = a && b;  // ✅
```

### Mistake 2: Bracket না দেওয়া

```csharp
// ❌ Confusing
bool r = isStudent || isSenior && isWeekday;

// ✅ Clear
bool r = isStudent || (isSenior && isWeekday);
```

---

## Summary

| Operator | মানে | কখন true |
|----------|------|----------|
| `&&` (AND) | "এবং" | সব condition পূরণ |
| `\|\|` (OR) | "অথবা" | একটা পূরণ করলেই |
| `!` (NOT) | "না" | উল্টা করে দেয় |

**মনে রাখো:**
- && = "সব লাগবে"
- || = "একটা হলেই হবে"
- ! = "উল্টা"
- Confused হলে **bracket** দাও
- Short-circuit: && এ প্রথমটা false হলে বাকি skip

---

**পরের Lesson:** Type Casting — এক type থেকে অন্য type, Implicit vs Explicit, Overflow danger।

---

*CPS Academy - Learn. Code. Grow.*
