---
title: 'Part 12: Logical Operators'
date: '2026-01-20'
excerpt: 'Part 12: Logical Operators - AND, OR, NOT শিখুন C# এ'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - operators
  - tutorial
draft: false
---

# Part 12: Logical Operators

ধরো তুমি bKash থেকে টাকা পাঠাতে চাও। কী কী লাগবে? PIN সঠিক হতে হবে **আর** account এ balance থাকতে হবে। দুইটাই লাগবে - একটা হলে হবে না।

আবার ধরো তুমি YouTube Premium নিতে চাও। Student **অথবা** Family plan - যেকোনো একটা নিলেই discount পাবে।

এই "আর" আর "অথবা" - এগুলোই হলো Logical Operators। একাধিক condition combine করতে এগুলো লাগে।

### এই part শেষে তুমি জানবে:

- 🔐 দুইটা condition একসাথে true কিনা check করা
- 🎫 যেকোনো একটা true কিনা check করা
- 🔄 true কে false, false কে true বানানো

চলো শুরু করি!

---

## && (AND) - দুইটাই সত্য হতে হবে

দুইটা condition কে && দিয়ে জোড়া দিলে, **দুইটাই true** হলে result true হয়।

ধরো তুমি movie দেখতে যেতে চাও। টাকা আছে? সময় আছে? দুইটাই থাকলে যেতে পারবে:

```csharp
bool hasMoney = true;
bool hasTime = true;

bool canGoMovie = hasMoney && hasTime;

Console.WriteLine(canGoMovie);  // True
```

টাকাও আছে, সময়ও আছে - তাই True!

এবার দেখি টাকা আছে কিন্তু সময় নেই:

```csharp
bool hasMoney = true;
bool hasTime = false;

bool canGoMovie = hasMoney && hasTime;

Console.WriteLine(canGoMovie);  // False
```

একটা false হওয়াতে পুরোটাই False হয়ে গেলো।

### && এর Truth Table

| A | B | A && B |
|---|---|--------|
| true | true | **true** ✅ |
| true | false | false |
| false | true | false |
| false | false | false |

দেখো, শুধু দুইটাই true হলেই result true। একটাও false হলে সব false।

### Login System

Username আর password দুইটাই correct হতে হবে:

```csharp
bool usernameCorrect = true;
bool passwordCorrect = true;

bool loginSuccess = usernameCorrect && passwordCorrect;

Console.WriteLine($"Login success? {loginSuccess}");  // True
```

Username ঠিক কিন্তু password ভুল:

```csharp
bool usernameCorrect = true;
bool passwordCorrect = false;

bool loginSuccess = usernameCorrect && passwordCorrect;

Console.WriteLine($"Login success? {loginSuccess}");  // False
```

### bKash Transaction

PIN correct আর balance থাকতে হবে:

```csharp
bool pinCorrect = true;
bool hasBalance = true;

bool canSend = pinCorrect && hasBalance;

Console.WriteLine($"Can send money? {canSend}");  // True
```

PIN ঠিক কিন্তু balance নেই:

```csharp
bool pinCorrect = true;
bool hasBalance = false;

bool canSend = pinCorrect && hasBalance;

Console.WriteLine($"Can send money? {canSend}");  // False
```

### Game Feature Unlock

Level 10+ আর 300+ coins দুইটাই লাগবে:

```csharp
int playerLevel = 15;
int playerCoins = 500;

bool levelOk = playerLevel >= 10;
bool coinsOk = playerCoins >= 300;

bool canUnlock = levelOk && coinsOk;

Console.WriteLine($"Level OK? {levelOk}");      // True
Console.WriteLine($"Coins OK? {coinsOk}");      // True
Console.WriteLine($"Can unlock? {canUnlock}");  // True
```

Level ঠিক আছে কিন্তু coins কম:

```csharp
int playerLevel = 15;
int playerCoins = 100;

bool levelOk = playerLevel >= 10;
bool coinsOk = playerCoins >= 300;

bool canUnlock = levelOk && coinsOk;

Console.WriteLine($"Level OK? {levelOk}");      // True
Console.WriteLine($"Coins OK? {coinsOk}");      // False
Console.WriteLine($"Can unlock? {canUnlock}");  // False
```

### Driving License

বয়স 18+, test pass, আর documents - তিনটাই লাগবে:

```csharp
int age = 20;
bool passedTest = true;
bool hasDocuments = true;

bool ageOk = age >= 18;

bool canGetLicense = ageOk && passedTest && hasDocuments;

Console.WriteLine($"Can get license? {canGetLicense}");  // True
```

তিনটা condition ও && দিয়ে জোড়া দেওয়া যায়।

---

## || (OR) - যেকোনো একটা হলেই হবে

দুইটা condition কে || দিয়ে জোড়া দিলে, **যেকোনো একটা true** হলে result true হয়।

Cinema hall এ discount: Student অথবা Senior citizen হলেই পাবে:

```csharp
bool isStudent = true;
bool isSenior = false;

bool getsDiscount = isStudent || isSenior;

Console.WriteLine(getsDiscount);  // True
```

Student তো, তাই discount পাবে। Senior citizen না হলেও চলবে।

দুইটাই false হলে:

```csharp
bool isStudent = false;
bool isSenior = false;

bool getsDiscount = isStudent || isSenior;

Console.WriteLine(getsDiscount);  // False
```

### || এর Truth Table

| A | B | A \|\| B |
|---|---|----------|
| true | true | **true** |
| true | false | **true** |
| false | true | **true** |
| false | false | false |

দেখো, একটাও true হলেই result true। দুইটাই false হলে তবেই false।

### Weekend Check

Saturday অথবা Sunday হলে weekend:

```csharp
string today = "Saturday";

bool isSaturday = today == "Saturday";
bool isSunday = today == "Sunday";

bool isWeekend = isSaturday || isSunday;

Console.WriteLine($"Is Saturday? {isSaturday}");  // True
Console.WriteLine($"Is Sunday? {isSunday}");      // False
Console.WriteLine($"Is weekend? {isWeekend}");    // True
```

Weekday হলে:

```csharp
string today = "Monday";

bool isSaturday = today == "Saturday";
bool isSunday = today == "Sunday";

bool isWeekend = isSaturday || isSunday;

Console.WriteLine($"Is weekend? {isWeekend}");  // False
```

### Payment Method

bKash, Nagad, অথবা Card - যেকোনো একটা valid:

```csharp
string method = "bKash";

bool isbKash = method == "bKash";
bool isNagad = method == "Nagad";
bool isCard = method == "Card";

bool validPayment = isbKash || isNagad || isCard;

Console.WriteLine($"Valid payment? {validPayment}");  // True
```

Invalid method দিলে:

```csharp
string method = "Bitcoin";

bool isbKash = method == "bKash";
bool isNagad = method == "Nagad";
bool isCard = method == "Card";

bool validPayment = isbKash || isNagad || isCard;

Console.WriteLine($"Valid payment? {validPayment}");  // False
```

### Discount Eligibility

Student, Senior citizen, অথবা Coupon - যেকোনো একটা হলেই discount:

```csharp
bool isStudent = false;
bool isSenior = false;
bool hasCoupon = true;

bool getsDiscount = isStudent || isSenior || hasCoupon;

Console.WriteLine($"Gets discount? {getsDiscount}");  // True (coupon আছে)
```

তিনটার কোনোটাই না:

```csharp
bool isStudent = false;
bool isSenior = false;
bool hasCoupon = false;

bool getsDiscount = isStudent || isSenior || hasCoupon;

Console.WriteLine($"Gets discount? {getsDiscount}");  // False
```

### Emergency Check

Police, ambulance, অথবা fire হলে emergency:

```csharp
string input = "ambulance";

bool isPolice = input == "police";
bool isAmbulance = input == "ambulance";
bool isFire = input == "fire";

bool isEmergency = isPolice || isAmbulance || isFire;

Console.WriteLine($"Is emergency? {isEmergency}");  // True
```

---

## ! (NOT) - উল্টা করে দাও

`!` operator true কে false, আর false কে true বানায়।

```csharp
bool isLoggedIn = false;

bool notLoggedIn = !isLoggedIn;

Console.WriteLine($"Not logged in? {notLoggedIn}");  // True
```

isLoggedIn ছিল false, ! দিয়ে true হয়ে গেলো।

```csharp
bool isLoggedIn = true;

bool notLoggedIn = !isLoggedIn;

Console.WriteLine($"Not logged in? {notLoggedIn}");  // False
```

### ! এর Truth Table

| A | !A |
|---|-----|
| true | false |
| false | true |

একদম simple - উল্টা করে দেয়।

### Login Check

```csharp
bool isLoggedIn = false;

Console.WriteLine($"Logged in? {isLoggedIn}");        // False
Console.WriteLine($"NOT logged in? {!isLoggedIn}");   // True
```

### Empty Check

```csharp
string name = "";

bool isEmpty = name == "";
bool hasValue = !isEmpty;

Console.WriteLine($"Is empty? {isEmpty}");    // True
Console.WriteLine($"Has value? {hasValue}");  // False
```

```csharp
string name = "Rahim";

bool isEmpty = name == "";
bool hasValue = !isEmpty;

Console.WriteLine($"Is empty? {isEmpty}");    // False
Console.WriteLine($"Has value? {hasValue}");  // True
```

### Game Over Check

```csharp
bool gameOver = false;

bool stillPlaying = !gameOver;

Console.WriteLine($"Game over? {gameOver}");       // False
Console.WriteLine($"Still playing? {stillPlaying}");  // True
```

### Toggle Switch

Light switch এর মতো - ! দিলে উল্টা হয়ে যায়:

```csharp
bool lightOn = true;
Console.WriteLine($"Light on? {lightOn}");  // True

lightOn = !lightOn;  // Toggle!
Console.WriteLine($"Light on? {lightOn}");  // False

lightOn = !lightOn;  // Toggle again!
Console.WriteLine($"Light on? {lightOn}");  // True
```

---

## Combining && এবং ||

Real life এ অনেক সময় && আর || একসাথে use করতে হয়।

### Movie Discount

Child (12 বা কম) **অথবা** Senior (60+) হলে discount। আবার weekday **আর** morning show হলেও discount:

```csharp
int age = 25;
bool isWeekday = true;
bool isMorningShow = true;

// Child বা Senior?
bool isChild = age <= 12;
bool isSenior = age >= 60;

// Weekday আর Morning?
bool specialOffer = isWeekday && isMorningShow;

// যেকোনো একটা true হলে discount
bool getsDiscount = isChild || isSenior || specialOffer;

Console.WriteLine($"Is child? {isChild}");           // False
Console.WriteLine($"Is senior? {isSenior}");         // False
Console.WriteLine($"Special offer? {specialOffer}"); // True
Console.WriteLine($"Gets discount? {getsDiscount}"); // True
```

### Loan Eligibility

Age 21-60, Income 25000+, Credit score 650+, আর existing loan নেই - সবগুলো true হতে হবে:

```csharp
int age = 30;
int income = 35000;
int creditScore = 700;
bool hasExistingLoan = false;

bool ageOk = age >= 21 && age <= 60;
bool incomeOk = income >= 25000;
bool creditOk = creditScore >= 650;
bool noLoan = !hasExistingLoan;  // loan নেই মানে !hasExistingLoan

bool eligible = ageOk && incomeOk && creditOk && noLoan;

Console.WriteLine($"Age OK? {ageOk}");           // True
Console.WriteLine($"Income OK? {incomeOk}");     // True
Console.WriteLine($"Credit OK? {creditOk}");     // True
Console.WriteLine($"No loan? {noLoan}");         // True
Console.WriteLine($"Eligible? {eligible}");      // True
```

একটা fail হলে:

```csharp
int age = 30;
int income = 15000;  // কম!
int creditScore = 700;
bool hasExistingLoan = false;

bool ageOk = age >= 21 && age <= 60;
bool incomeOk = income >= 25000;
bool creditOk = creditScore >= 650;
bool noLoan = !hasExistingLoan;

bool eligible = ageOk && incomeOk && creditOk && noLoan;

Console.WriteLine($"Age OK? {ageOk}");           // True
Console.WriteLine($"Income OK? {incomeOk}");     // False (এটা fail!)
Console.WriteLine($"Credit OK? {creditOk}");     // True
Console.WriteLine($"No loan? {noLoan}");         // True
Console.WriteLine($"Eligible? {eligible}");      // False
```

### Flight Booking

Domestic flight এ শুধু passport লাগবে। International এ passport **আর** visa দুইটাই লাগবে:

```csharp
bool hasPassport = true;
bool hasVisa = false;
bool isDomestic = true;

// Domestic হলে শুধু passport, International হলে passport আর visa
bool canBook = isDomestic && hasPassport || !isDomestic && hasPassport && hasVisa;

// সহজে বুঝতে:
bool domesticOk = isDomestic && hasPassport;
bool internationalOk = !isDomestic && hasPassport && hasVisa;
bool canBook2 = domesticOk || internationalOk;

Console.WriteLine($"Has passport? {hasPassport}");     // True
Console.WriteLine($"Has visa? {hasVisa}");             // False
Console.WriteLine($"Is domestic? {isDomestic}");       // True
Console.WriteLine($"Domestic OK? {domesticOk}");       // True
Console.WriteLine($"International OK? {internationalOk}"); // False
Console.WriteLine($"Can book? {canBook2}");            // True
```

---

## Short-circuit Evaluation

এটা একটু advanced, কিন্তু জানা দরকার।

### && এ Short-circuit

&& এ প্রথম condition false হলে, দ্বিতীয়টা check করারই দরকার নেই। কারণ result তো false ই হবে।

```csharp
bool a = false;
bool b = true;

bool result = a && b;  // a false, তাই b check করা হয়নি!

Console.WriteLine(result);  // False
```

C# জানে যে && এ একটা false হলেই সব false, তাই সে দ্বিতীয়টা skip করে।

### || এ Short-circuit

|| এ প্রথম condition true হলে, দ্বিতীয়টা check করার দরকার নেই। কারণ result তো true ই হবে।

```csharp
bool a = true;
bool b = false;

bool result = a || b;  // a true, তাই b check করা হয়নি!

Console.WriteLine(result);  // True
```

---

## Operator Priority

যখন &&, ||, ! একসাথে থাকে, কোনটা আগে হয়?

| Priority | Operator |
|----------|----------|
| 1st (সবার আগে) | ! (NOT) |
| 2nd | && (AND) |
| 3rd (সবার পরে) | \|\| (OR) |

### Example

```csharp
bool a = true;
bool b = false;
bool c = true;

bool result = a || b && c;
// প্রথমে && হবে: b && c = false && true = false
// তারপর ||: a || false = true || false = true

Console.WriteLine(result);  // True
```

### Bracket দিয়ে Clear করো

```csharp
bool a = true;
bool b = false;
bool c = true;

// Bracket ছাড়া - confusing
bool result1 = a || b && c;

// Bracket দিলে clear
bool result2 = a || (b && c);    // Same as above
bool result3 = (a || b) && c;    // Different!

Console.WriteLine(result1);  // True
Console.WriteLine(result2);  // True
Console.WriteLine(result3);  // True (but different calculation)
```

**Suggestion:** Complex condition হলে bracket দিয়ে clear করো।

---

## Quick Reference Table

| Operator | নাম | মানে | Example | Result |
|----------|-----|------|---------|--------|
| && | AND | দুইটাই true হতে হবে | true && false | false |
| \|\| | OR | একটা true হলেই হবে | true \|\| false | true |
| ! | NOT | উল্টা করে দেয় | !true | false |

---

## Common Mistakes

### Mistake 1: & এবং && গুলিয়ে ফেলা

```csharp
// & হলো bitwise AND (different জিনিস)
// && হলো logical AND (এটা চাই)

bool result1 = true && false;  // ✅ Logical AND
bool result2 = true & false;   // ⚠️ Bitwise AND (different)
```

সবসময় `&&` এবং `||` use করো।

### Mistake 2: ! এর position

```csharp
bool isValid = true;

bool wrong = !isValid == true;   // 🤔 Confusing
bool correct = !isValid;         // ✅ Clear
bool alsoCorrect = isValid == false;  // ✅ Also clear
```

### Mistake 3: Bracket না দেওয়া

```csharp
bool a = true;
bool b = false;
bool c = true;

// 🤔 এটা কী হবে?
bool confusing = a || b && !c;

// ✅ Bracket দিলে clear
bool clear = (a || b) && (!c);
```

---

## Summary

আজকে শিখলে:

| Operator | কখন true হয় |
|----------|-------------|
| && (AND) | দুইটাই true হলে |
| \|\| (OR) | যেকোনো একটা true হলে |
| ! (NOT) | false হলে |

**মনে রাখো:**
- && মানে "এবং" - সব condition পূরণ করতে হবে
- || মানে "অথবা" - একটা পূরণ করলেই হবে
- ! মানে "না" - উল্টা করে দেয়
- Short-circuit: && এ প্রথমটা false হলে, পরেরটা check হয় না
- Confused হলে bracket দাও!

**Next Part এ:** Conditional statements শিখবো - if, else if, else, switch দিয়ে কীভাবে program কে decision নিতে শেখাবো। তখন এই true/false দিয়ে action নিতে পারবো!

---

*CPS Academy - Learn. Code. Grow.*
