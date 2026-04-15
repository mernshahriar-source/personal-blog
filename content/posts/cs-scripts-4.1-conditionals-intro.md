---
title: "Lesson 4.1: Conditionals Introduction — true/false দিয়ে Decision নেওয়া"
date: "2026-04-30"
excerpt: "কেন decision নিতে হয়, bool কীভাবে কাজে লাগে, if-else concept এবং Module 4 এর overview"
categories:
  - C# Course Scripts
tags:
  - csharp
  - conditionals
  - if-else
  - beginner
draft: false
---

# Lesson 4.1: Conditionals Introduction — true/false দিয়ে Decision নেওয়া

> **এই Lesson এ শিখবে:** কেন decision নিতে হয়, আগে শেখা bool কীভাবে কাজে লাগবে, "যদি...তাহলে...নাহলে" concept, এবং এই Module এ কী শিখবে।

---

## এতদিন শুধু true/false বের করেছি

Module 2 তে Comparison আর Logical operators শিখেছো:

```csharp
int age = 20;
bool isAdult = age >= 18;         // true
Console.WriteLine(isAdult);       // True

int marks = 75;
bool passed = marks >= 40;        // true
Console.WriteLine(passed);        // True

string password = "abc123";
bool isCorrect = password == "abc123";  // true
Console.WriteLine(isCorrect);     // True
```

**true/false বের করতে পারছি। কিন্তু এটা দিয়ে কিছু তো করতে পারছি না!**

---

## সমস্যাটা কী?

```csharp
int marks = 75;
bool passed = marks >= 40;  // true

// কিন্তু...
// passed true হলে "Congratulations!" বলতে চাই
// passed false হলে "Sorry, failed!" বলতে চাই
// কীভাবে? 🤔
```

ধরো ATM এ গেলে। PIN দিলে।
- PIN **ঠিক** → টাকা দাও
- PIN **ভুল** → "Wrong PIN!" বলো

**এই "যদি...তাহলে...নাহলে" — এটাই Program এর Decision!**

---

## Solution: if-else!

```csharp
int marks = 75;
bool passed = marks >= 40;  // true

if (passed)
{
    Console.WriteLine("✅ Congratulations! You passed!");
}
else
{
    Console.WriteLine("❌ Sorry, you failed!");
}
```

**`if` = যদি, `else` = নাহলে**

Module 2 তে শেখা `>=`, `==`, `&&`, `||` — সব **এখানেই** কাজে লাগবে!

---

## bool Variable দিয়েও হয়, Direct condition দিয়েও হয়

```csharp
// Way 1: আগে bool এ রাখো
bool isAdult = age >= 18;
if (isAdult)
{
    Console.WriteLine("Adult!");
}

// Way 2: সরাসরি condition দাও
if (age >= 18)
{
    Console.WriteLine("Adult!");
}
```

দুইটা **exactly same** কাজ করে।

---

## Real Life এ কোথায় কোথায় Decision?

```
🔐 Login → password ঠিক? → Welcome / Wrong password
🏧 ATM → balance আছে? → টাকা দাও / Insufficient balance
📝 Exam → marks 40+? → Pass / Fail
🎮 Game → health 0? → Game Over / Continue
🛒 Shop → stock আছে? → Add to cart / Out of stock
🎂 Age → 18+? → Adult / Minor
```

**Program এর সব জায়গায় decision আছে!**

---

## এই Module এ কী শিখবে?

| Lesson | Topic |
|--------|-------|
| 4.1 | Introduction (এটা!) |
| 4.2 | if Statement — "যদি...তাহলে" |
| 4.3 | else ও else if — "নাহলে" ও Grade system |
| 4.4 | Nested if ও Ternary — if এর ভিতরে if, shortcut |
| 4.5 | switch — Menu system, অনেক fixed options |
| 4.6 | switch vs if-else ও switch Expression |
| 4.7 | Practice & Assignments |

---

**পরের Lesson:** if Statement — "যদি marks 40 এর বেশি, তাহলে Pass!"

---

*CPS Academy - Learn. Code. Grow.*
