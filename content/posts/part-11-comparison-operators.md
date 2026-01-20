---
title: 'Part 11: Comparison Operators'
date: '2026-01-20'
excerpt: 'Part 11: Comparison Operators - তুলনা করা শিখুন C# এ'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - operators
  - tutorial
draft: true
---

# Part 11: Comparison Operators

তুমি কি কখনো ভেবেছো Facebook কীভাবে বুঝে তোমার password সঠিক? ATM কীভাবে বুঝে তোমার PIN ঠিক আছে? Game কীভাবে বুঝে তুমি pass করেছো নাকি fail?

সব comparison দিয়ে! দুইটা জিনিস তুলনা করে দেখা - এটাই programming এর সবচেয়ে important concept গুলোর একটা।

### এই part শেষে তুমি জানবে:

- 🔐 Password সঠিক কিনা check করা
- 🎂 বয়স 18+ কিনা check করা
- 📝 Pass/Fail check করা
- 💰 Budget এ কুলাবে কিনা check করা
- 🏆 High score ভাঙলো কিনা check করা

চলো শুরু করি!

---

## Comparison করলে কী পাই?

যেকোনো comparison এর result হয় দুইটার একটা:
- `true` (সত্য)
- `false` (মিথ্যা)

```csharp
bool result = 5 > 3;
Console.WriteLine(result);  // True
```

এই `true` বা `false` কে বলে **boolean** value। এটা দিয়ে পরে decision নেওয়া যায় (if/else - পরের part এ শিখবো)।

---

## == (Equal to) - সমান কিনা?

দুইটা জিনিস exactly same কিনা check করতে `==` use করো।

```csharp
int a = 5;
int b = 5;

bool result = a == b;

Console.WriteLine(result);  // True
```

5 আর 5 সমান, তাই `True`।

```csharp
int x = 10;
int y = 20;

bool result = x == y;

Console.WriteLine(result);  // False
```

10 আর 20 সমান না, তাই `False`।

### ⚠️ সাবধান! = আর == এক না!

```csharp
=   // এটা value বসানো (assignment)
==  // এটা compare করা (comparison)
```

এই ভুল সবাই করে, তুমিও করবে। মাথায় রাখো!

```csharp
int x = 10;    // x এ 10 বসালাম
x == 10;       // x কি 10 এর সমান? (True)
```

### Password Check

ধরো correct password হলো "abc123"। User কী দিলো সেটা match করে কিনা দেখি:

```csharp
string correctPassword = "abc123";
string userInput = "abc123";

bool isCorrect = userInput == correctPassword;

Console.WriteLine($"Password correct? {isCorrect}");  // True
```

এবার ভুল password দিয়ে দেখি:

```csharp
string correctPassword = "abc123";
string userInput = "wrong123";

bool isCorrect = userInput == correctPassword;

Console.WriteLine($"Password correct? {isCorrect}");  // False
```

### PIN Verification

ATM এর PIN check করি:

```csharp
int correctPIN = 1234;
int enteredPIN = 1234;

bool pinMatch = enteredPIN == correctPIN;

Console.WriteLine($"PIN match? {pinMatch}");  // True
```

```csharp
int correctPIN = 1234;
int enteredPIN = 0000;

bool pinMatch = enteredPIN == correctPIN;

Console.WriteLine($"PIN match? {pinMatch}");  // False
```

### Number Guessing

Secret number 7। Player guess করলো কিনা:

```csharp
int secretNumber = 7;
int guess = 7;

bool correct = guess == secretNumber;

Console.WriteLine($"Correct guess? {correct}");  // True
```

```csharp
int secretNumber = 7;
int guess = 5;

bool correct = guess == secretNumber;

Console.WriteLine($"Correct guess? {correct}");  // False
```

---

## != (Not Equal) - সমান না?

`==` এর উল্টা। দুইটা জিনিস same না হলে `true` দেয়।

```csharp
int a = 5;
int b = 10;

bool result = a != b;

Console.WriteLine(result);  // True (5 আর 10 সমান না)
```

```csharp
int a = 5;
int b = 5;

bool result = a != b;

Console.WriteLine(result);  // False (5 আর 5 সমান, তাই "সমান না" হলো False)
```

### Error Check

Status "success" না হলে error আছে:

```csharp
string status = "error";

bool hasError = status != "success";

Console.WriteLine($"Has error? {hasError}");  // True
```

```csharp
string status = "success";

bool hasError = status != "success";

Console.WriteLine($"Has error? {hasError}");  // False
```

### Empty Check

Name empty কিনা:

```csharp
string name = "Rahim";

bool hasName = name != "";

Console.WriteLine($"Has name? {hasName}");  // True
```

```csharp
string name = "";

bool hasName = name != "";

Console.WriteLine($"Has name? {hasName}");  // False
```

### Division Safety

0 দিয়ে ভাগ করা যায় না। তাই আগে check করি divisor 0 না তো:

```csharp
int divisor = 5;

bool canDivide = divisor != 0;

Console.WriteLine($"Can divide? {canDivide}");  // True
```

```csharp
int divisor = 0;

bool canDivide = divisor != 0;

Console.WriteLine($"Can divide? {canDivide}");  // False
```

---

## > (Greater Than) - বড় কিনা?

বাম পাশেরটা ডান পাশের চেয়ে বড় কিনা check করে।

```csharp
int a = 10;
int b = 5;

bool result = a > b;

Console.WriteLine(result);  // True (10, 5 এর চেয়ে বড়)
```

```csharp
int a = 3;
int b = 8;

bool result = a > b;

Console.WriteLine(result);  // False (3, 8 এর চেয়ে বড় না)
```

### Age Check (18+)

বয়স 18 এর বেশি কিনা (মানে 19+):

```csharp
int age = 25;

bool isAbove18 = age > 18;

Console.WriteLine($"Above 18? {isAbove18}");  // True
```

```csharp
int age = 18;

bool isAbove18 = age > 18;

Console.WriteLine($"Above 18? {isAbove18}");  // False (18, 18 এর চেয়ে বড় না!)
```

**খেয়াল করো:** 18 > 18 হলো False! কারণ 18 নিজে 18 এর চেয়ে বড় না।

### High Score Check

নতুন score কি high score ভেঙেছে?

```csharp
int currentScore = 850;
int highScore = 800;

bool newRecord = currentScore > highScore;

Console.WriteLine($"New record? {newRecord}");  // True
```

```csharp
int currentScore = 750;
int highScore = 800;

bool newRecord = currentScore > highScore;

Console.WriteLine($"New record? {newRecord}");  // False
```

### Temperature Check

জ্বর আছে কিনা (37.5°C এর বেশি):

```csharp
double temperature = 38.5;

bool hasFever = temperature > 37.5;

Console.WriteLine($"Has fever? {hasFever}");  // True
```

```csharp
double temperature = 36.8;

bool hasFever = temperature > 37.5;

Console.WriteLine($"Has fever? {hasFever}");  // False
```

### Budget Check

জিনিসের দাম budget এর চেয়ে বেশি কিনা:

```csharp
double productPrice = 1500;
double myBudget = 1200;

bool tooExpensive = productPrice > myBudget;

Console.WriteLine($"Too expensive? {tooExpensive}");  // True
```

---

## < (Less Than) - ছোট কিনা?

বাম পাশেরটা ডান পাশের চেয়ে ছোট কিনা check করে।

```csharp
int a = 3;
int b = 10;

bool result = a < b;

Console.WriteLine(result);  // True (3, 10 এর চেয়ে ছোট)
```

```csharp
int a = 15;
int b = 10;

bool result = a < b;

Console.WriteLine(result);  // False (15, 10 এর চেয়ে ছোট না)
```

### Low Battery

Battery level 20% এর কম কিনা:

```csharp
int batteryLevel = 15;

bool lowBattery = batteryLevel < 20;

Console.WriteLine($"Low battery? {lowBattery}");  // True
```

```csharp
int batteryLevel = 85;

bool lowBattery = batteryLevel < 20;

Console.WriteLine($"Low battery? {lowBattery}");  // False
```

### Stock Alert

Stock minimum এর কম কিনা:

```csharp
int currentStock = 5;
int minimumStock = 10;

bool needRestock = currentStock < minimumStock;

Console.WriteLine($"Need restock? {needRestock}");  // True
```

### Speed Limit

Speed limit এর নিচে আছে কিনা:

```csharp
int speedLimit = 60;
int currentSpeed = 45;

bool withinLimit = currentSpeed < speedLimit;

Console.WriteLine($"Within limit? {withinLimit}");  // True
```

```csharp
int speedLimit = 60;
int currentSpeed = 75;

bool withinLimit = currentSpeed < speedLimit;

Console.WriteLine($"Within limit? {withinLimit}");  // False
```

### Fail Check

Pass mark এর কম কিনা:

```csharp
int marks = 28;
int passingMark = 33;

bool failed = marks < passingMark;

Console.WriteLine($"Failed? {failed}");  // True
```

---

## >= (Greater Than or Equal) - বড় অথবা সমান

বাম পাশেরটা ডান পাশের চেয়ে বড় **অথবা** সমান হলে `true`।

```csharp
int a = 10;
int b = 10;

bool result = a >= b;

Console.WriteLine(result);  // True (সমান হলেও True!)
```

```csharp
int a = 15;
int b = 10;

bool result = a >= b;

Console.WriteLine(result);  // True (বড় হলেও True)
```

```csharp
int a = 5;
int b = 10;

bool result = a >= b;

Console.WriteLine(result);  // False (ছোট হলে False)
```

### Pass Check

33 বা তার বেশি হলে pass:

```csharp
int marks = 33;
int passingMark = 33;

bool passed = marks >= passingMark;

Console.WriteLine($"Passed? {passed}");  // True (exactly 33 তেও pass!)
```

```csharp
int marks = 75;
int passingMark = 33;

bool passed = marks >= passingMark;

Console.WriteLine($"Passed? {passed}");  // True
```

```csharp
int marks = 28;
int passingMark = 33;

bool passed = marks >= passingMark;

Console.WriteLine($"Passed? {passed}");  // False
```

### Voting Eligibility

18 বা তার বেশি হলে vote দিতে পারবে:

```csharp
int age = 18;

bool canVote = age >= 18;

Console.WriteLine($"Can vote? {canVote}");  // True (18 তেও পারবে!)
```

```csharp
int age = 16;

bool canVote = age >= 18;

Console.WriteLine($"Can vote? {canVote}");  // False
```

### Discount Eligibility

1000 টাকা বা তার বেশি কিনলে discount:

```csharp
double purchaseAmount = 1000;
double minimumForDiscount = 1000;

bool getsDiscount = purchaseAmount >= minimumForDiscount;

Console.WriteLine($"Gets discount? {getsDiscount}");  // True (exactly 1000 তেও পাবে!)
```

### Level Requirement

Level 10 বা তার বেশি হলে dungeon এ ঢুকতে পারবে:

```csharp
int playerLevel = 10;
int requiredLevel = 10;

bool canEnter = playerLevel >= requiredLevel;

Console.WriteLine($"Can enter dungeon? {canEnter}");  // True
```

---

## <= (Less Than or Equal) - ছোট অথবা সমান

বাম পাশেরটা ডান পাশের চেয়ে ছোট **অথবা** সমান হলে `true`।

```csharp
int a = 5;
int b = 5;

bool result = a <= b;

Console.WriteLine(result);  // True (সমান হলেও True!)
```

```csharp
int a = 3;
int b = 5;

bool result = a <= b;

Console.WriteLine(result);  // True (ছোট হলেও True)
```

```csharp
int a = 10;
int b = 5;

bool result = a <= b;

Console.WriteLine(result);  // False (বড় হলে False)
```

### Budget Check

দাম budget এর মধ্যে আছে কিনা:

```csharp
double itemPrice = 500;
double budget = 500;

bool affordable = itemPrice <= budget;

Console.WriteLine($"Affordable? {affordable}");  // True (exactly budget এও কিনতে পারবে)
```

### Weight Limit

Elevator এর weight limit এর মধ্যে আছে কিনা:

```csharp
int totalWeight = 450;
int maxCapacity = 500;

bool safeToOperate = totalWeight <= maxCapacity;

Console.WriteLine($"Safe? {safeToOperate}");  // True
```

```csharp
int totalWeight = 550;
int maxCapacity = 500;

bool safeToOperate = totalWeight <= maxCapacity;

Console.WriteLine($"Safe? {safeToOperate}");  // False
```

### File Size Limit

File size 5MB এর মধ্যে কিনা:

```csharp
double fileSize = 4.5;
double maxSize = 5.0;

bool canUpload = fileSize <= maxSize;

Console.WriteLine($"Can upload? {canUpload}");  // True
```

### Kids Menu

12 বছর বা কম হলে kids menu:

```csharp
int childAge = 10;
int kidsMenuLimit = 12;

bool getsKidsMenu = childAge <= kidsMenuLimit;

Console.WriteLine($"Gets kids menu? {getsKidsMenu}");  // True
```

---

## > vs >= এর পার্থক্য

এটা খুব important! অনেকে এখানে ভুল করে।

```csharp
int age = 18;

Console.WriteLine(age > 18);   // False (18, 18 এর চেয়ে বড় না)
Console.WriteLine(age >= 18);  // True (18, 18 এর সমান)
```

**মনে রাখো:**
- `> 18` মানে 19, 20, 21, ... (18 বাদ)
- `>= 18` মানে 18, 19, 20, 21, ... (18 সহ)

Pass mark এর ক্ষেত্রে:
- `marks > 33` মানে 34 বা তার বেশি
- `marks >= 33` মানে 33 বা তার বেশি ✓ (এটাই চাই!)

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

Case ignore করতে চাইলে ToLower() use করো:

```csharp
string a = "Hello";
string b = "hello";

bool same = a.ToLower() == b.ToLower();

Console.WriteLine(same);  // True
```

### Username Check

```csharp
string validUsername = "admin";
string input = "ADMIN";

bool isValid = input.ToLower() == validUsername.ToLower();

Console.WriteLine($"Valid username? {isValid}");  // True
```

---

## Quick Reference Table

| Operator | নাম | Example | Result | মানে |
|----------|-----|---------|--------|------|
| == | Equal to | 5 == 5 | True | সমান |
| != | Not equal | 5 != 3 | True | সমান না |
| > | Greater than | 10 > 5 | True | বড় |
| < | Less than | 3 < 8 | True | ছোট |
| >= | Greater or equal | 5 >= 5 | True | বড় বা সমান |
| <= | Less or equal | 4 <= 5 | True | ছোট বা সমান |

---

## Common Mistakes

### Mistake 1: = আর == গুলিয়ে ফেলা

```csharp
int x = 5;

x = 10;   // x এ 10 বসালাম (assignment)
x == 10;  // x কি 10? (comparison) - True
```

### Mistake 2: String case ignore না করা

```csharp
string input = "YES";

input == "yes";            // False! (Y আর y আলাদা)
input.ToLower() == "yes";  // True ✓
```

### Mistake 3: > আর >= এর পার্থক্য না বোঝা

```csharp
int marks = 33;
int passingMark = 33;

marks > passingMark;   // False (33, 33 এর চেয়ে বড় না)
marks >= passingMark;  // True (33, 33 এর সমান) ✓
```

---

## কোনটা কখন Use করবে?

| Situation | Operator | Example |
|-----------|----------|---------|
| Password match | == | password == "abc123" |
| Not empty | != | name != "" |
| Age 18 or above | >= | age >= 18 |
| Below limit | < | speed < 60 |
| Within limit | <= | fileSize <= 5 |
| Above threshold | > | temperature > 37.5 |

---

## Summary

আজকে শিখলে:

| Operator | মানে | True কখন হয় |
|----------|------|-------------|
| == | সমান | দুইটা same হলে |
| != | সমান না | দুইটা different হলে |
| > | বড় | বাম পাশেরটা বড় হলে |
| < | ছোট | বাম পাশেরটা ছোট হলে |
| >= | বড় বা সমান | বড় অথবা same হলে |
| <= | ছোট বা সমান | ছোট অথবা same হলে |

**মনে রাখো:**
- `=` বসানো, `==` তুলনা
- Comparison এর result সবসময় `true` বা `false`
- String compare এ case matters! (ToLower() দিয়ে fix করো)
- `>` আর `>=` এর পার্থক্য বোঝো

**Next Part এ:** Logical operators শিখবো - &&, ||, ! দিয়ে কীভাবে একাধিক condition combine করা যায়।

---

*CPS Academy - Learn. Code. Grow.*
