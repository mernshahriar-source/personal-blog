---
title: "Lesson 2.7: Comparison Operators — তুলনা করা"
date: "2026-04-17"
excerpt: "==, !=, >, <, >=, <=, = vs == পার্থক্য, String comparison, real-world examples"
categories:
  - C# Course Scripts
tags:
  - csharp
  - operators
  - comparison
  - boolean
draft: false
---

# Lesson 2.4: Comparison Operators — তুলনা করা

> **এই Lesson এ শিখবে:** `==` (সমান), `!=` (সমান না), `>` (বড়), `<` (ছোট), `>=` (বড় বা সমান), `<=` (ছোট বা সমান), `=` vs `==` পার্থক্য, String comparison, Case sensitivity, এবং real-world examples (Password check, Age check, Temperature, High Score)।

---

## Comparison করলে কী পাই?

সবসময় **bool** — `true` অথবা `false`:

```csharp
bool result = 10 > 5;
Console.WriteLine(result);  // True
```

---

## == (Equal to) — সমান কিনা?

```csharp
int a = 5;
int b = 5;
Console.WriteLine(a == b);  // True

int x = 10;
int y = 20;
Console.WriteLine(x == y);  // False
```

### ⚠️ = আর == এক না!

```csharp
int x = 10;    // = → value বসানো (assignment)
x == 10;       // == → compare করা (comparison)
```

**এই ভুল সবাই করে!**

### Password Check:

```csharp
string correctPassword = "abc123";
string userInput = "abc123";

bool isCorrect = userInput == correctPassword;
Console.WriteLine($"Password correct? {isCorrect}");  // True
```

### PIN Verification:

```csharp
int correctPIN = 1234;
int enteredPIN = 5678;

bool pinMatch = enteredPIN == correctPIN;
Console.WriteLine($"PIN match? {pinMatch}");  // False
```

---

## != (Not Equal) — সমান না?

`==` এর উল্টা:

```csharp
int a = 5;
int b = 10;
Console.WriteLine(a != b);  // True (সমান না)
Console.WriteLine(a != 5);  // False (সমান!)
```

### Account Blocked Check:

```csharp
string userRole = "guest";
bool isNotAdmin = userRole != "admin";
Console.WriteLine($"Not admin? {isNotAdmin}");  // True
```

---

## > (Greater Than) — বড় কিনা?

```csharp
Console.WriteLine(10 > 5);   // True
Console.WriteLine(3 > 8);    // False
Console.WriteLine(18 > 18);  // False (18 নিজে 18 এর চেয়ে বড় না!)
```

### Temperature Check (জ্বর):

```csharp
double temperature = 38.5;
bool hasFever = temperature > 37.5;
Console.WriteLine($"Has fever? {hasFever}");  // True
```

### High Score Check:

```csharp
int currentScore = 850;
int highScore = 800;
bool newRecord = currentScore > highScore;
Console.WriteLine($"New record? {newRecord}");  // True
```

---

## `<` (Less Than) — ছোট কিনা?

```csharp
Console.WriteLine(3 < 10);  // True
Console.WriteLine(8 < 5);   // False
```

### Stock Warning:

```csharp
int stock = 3;
bool lowStock = stock < 5;
Console.WriteLine($"Low stock? {lowStock}");  // True
```

### Failing Grade:

```csharp
int marks = 35;
bool isFailing = marks < 40;
Console.WriteLine($"Failing? {isFailing}");  // True
```

---

## >= (Greater Than or Equal) — বড় অথবা সমান

```csharp
Console.WriteLine(18 >= 18);  // True (সমান!)
Console.WriteLine(20 >= 18);  // True (বড়!)
Console.WriteLine(16 >= 18);  // False
```

### Adult Check (18+ মানে 18 ও count):

```csharp
int age = 18;
bool isAdult = age >= 18;
Console.WriteLine($"Adult? {isAdult}");  // True
```

### Pass/Fail:

```csharp
int marks = 40;
bool passed = marks >= 40;
Console.WriteLine($"Passed? {passed}");  // True
```

---

## `<=` (Less Than or Equal) — ছোট অথবা সমান

```csharp
Console.WriteLine(5 <= 10);  // True
Console.WriteLine(5 <= 5);   // True
Console.WriteLine(8 <= 5);   // False
```

### File Size Limit:

```csharp
double fileSize = 4.5;  // MB
double maxSize = 5.0;   // MB
bool allowed = fileSize <= maxSize;
Console.WriteLine($"Upload allowed? {allowed}");  // True
```

---

## > vs >= এর পার্থক্য

```csharp
int age = 18;

Console.WriteLine(age > 18);   // False (18 বড় না 18 এর চেয়ে)
Console.WriteLine(age >= 18);  // True (18 সমান 18)
```

**"18 এর বেশি"** → `> 18` (19+)
**"18 বা তার বেশি"** → `>= 18` (18+)

---

## String Comparison

String ও compare করা যায়:

```csharp
string name1 = "Rahim";
string name2 = "Rahim";
string name3 = "Karim";

Console.WriteLine(name1 == name2);  // True
Console.WriteLine(name1 == name3);  // False
Console.WriteLine(name1 != name3);  // True
```

### ⚠️ Case Sensitive!

```csharp
string a = "Hello";
string b = "hello";

Console.WriteLine(a == b);  // False! (H আর h আলাদা)
```

**Case ignore করতে:**

```csharp
bool same = a.ToLower() == b.ToLower();
Console.WriteLine(same);  // True
```

### Username Check:

```csharp
string validUsername = "admin";
string input = "ADMIN";

bool isValid = input.ToLower() == validUsername.ToLower();
Console.WriteLine($"Valid? {isValid}");  // True
```

---

## Quick Reference

| Operator | নাম | Example | Result |
|----------|-----|---------|--------|
| `==` | Equal to | `5 == 5` | True |
| `!=` | Not equal | `5 != 3` | True |
| `>` | Greater than | `10 > 5` | True |
| `<` | Less than | `3 < 8` | True |
| `>=` | Greater or equal | `18 >= 18` | True |
| `<=` | Less or equal | `5 <= 5` | True |

---

## Common Mistakes

### Mistake 1: = আর == গুলিয়ে ফেলা

```csharp
int x = 10;   // Assignment
x == 10;      // Comparison — এটা check করছে, বসাচ্ছে না!
```

### Mistake 2: > আর >= confuse করা

```csharp
// "18 বা তার বেশি" লিখতে চাই
if (age > 18)   // ❌ এটা 19+ (18 বাদ!)
if (age >= 18)  // ✅ এটা 18+ (18 সহ!)
```

### Mistake 3: String case ভুলে যাওয়া

```csharp
"Hello" == "hello"  // ❌ False!
// ToLower() দিয়ে fix করো
```

---

## Summary

| Operator | মানে | True কখন |
|----------|------|----------|
| `==` | সমান | দুইটা same |
| `!=` | সমান না | দুইটা different |
| `>` | বড় | বাম বড় |
| `<` | ছোট | বাম ছোট |
| `>=` | বড় বা সমান | বাম বড় বা same |
| `<=` | ছোট বা সমান | বাম ছোট বা same |

**মনে রাখো:**
- `=` বসানো, `==` তুলনা
- Result সবসময় `bool` (true/false)
- String compare এ **case matters**
- `>` আর `>=` এর পার্থক্য বোঝো

---

**পরের Lesson:** Logical Operators — &&, ||, ! দিয়ে একাধিক condition combine করা।

---

*CPS Academy - Learn. Code. Grow.*
