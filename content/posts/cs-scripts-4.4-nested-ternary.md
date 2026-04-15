---
title: "Lesson 4.4: Nested if ও Ternary Operator"
date: "2026-05-03"
excerpt: "if এর ভিতরে if (Login+Permission, ATM), Ternary (? :) shortcut এবং কখন কোনটা use করবে"
categories:
  - C# Course Scripts
tags:
  - csharp
  - nested-if
  - ternary
  - conditionals
draft: false
---

# Lesson 4.4: Nested if ও Ternary Operator

> **এই Lesson এ শিখবে:** Nested if — if এর ভিতরে if (Login+Permission, ATM), Ternary (? :) shortcut, কখন Ternary use করবে, এবং bool দিয়ে nested if।

---

## Nested if — if এর ভিতরে if

কখনো একটা condition true হওয়ার পর **আরেকটা condition** check করতে হয়।

### Login + Permission:

প্রথমে login check, তারপর admin কিনা:

```csharp
bool isLoggedIn = true;
bool isAdmin = true;

if (isLoggedIn)
{
    Console.WriteLine("✅ Login successful!");

    if (isAdmin)
    {
        Console.WriteLine("👑 Welcome, Admin! Full access.");
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
👑 Welcome, Admin! Full access.
```

---

### ATM Withdrawal:

আগে PIN check → তারপর balance check:

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
        balance = balance - withdrawAmount;
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

---

### Ticket Booking:

Seat available? → তারপর age অনুযায়ী price:

```csharp
int age = 25;
int availableSeats = 5;

if (availableSeats > 0)
{
    Console.WriteLine("✅ Seats available!");

    if (age < 12)
        Console.WriteLine("🎫 Child ticket: 150 tk");
    else if (age >= 60)
        Console.WriteLine("🎫 Senior ticket: 200 tk");
    else
        Console.WriteLine("🎫 Adult ticket: 300 tk");
}
else
{
    Console.WriteLine("❌ Sorry, no seats available!");
}
```

---

## ⚠️ বেশি Nested করো না!

```csharp
// ❌ 4 level — পড়া impossible!
if (a)
{
    if (b)
    {
        if (c)
        {
            if (d) { ... }
        }
    }
}

// ✅ && দিয়ে combine
if (a && b && c && d)
{
    // ...
}
```

**2 level এর বেশি nested → rethink করো!**

---

## Ternary Operator (? :) — Shortcut if-else

Simple if-else কে **এক লাইনে**:

```csharp
// Normal if-else
string status;
if (marks >= 40)
{
    status = "Passed";
}
else
{
    status = "Failed";
}

// Ternary — এক লাইনে!
string status = (marks >= 40) ? "Passed" : "Failed";
```

### Syntax:

```
condition ? valueIfTrue : valueIfFalse
```

---

## Ternary Examples

### Even/Odd:

```csharp
int num = 7;
string type = (num % 2 == 0) ? "Even" : "Odd";
Console.WriteLine($"{num} is {type}");  // 7 is Odd
```

### Adult/Minor:

```csharp
int age = 20;
string category = (age >= 18) ? "Adult" : "Minor";
```

### Max of Two:

```csharp
int a = 15, b = 20;
int max = (a > b) ? a : b;
Console.WriteLine($"Max: {max}");  // 20
```

### Discount with bool:

```csharp
bool isPremium = true;
int discount = isPremium ? 20 : 5;
Console.WriteLine($"Discount: {discount}%");  // 20%
```

### Console.WriteLine এর ভিতরেও:

```csharp
int stock = 5;
Console.WriteLine(stock > 0 ? "In Stock ✅" : "Out of Stock ❌");

bool isOnline = true;
Console.WriteLine($"Status: {(isOnline ? "🟢 Online" : "🔴 Offline")}");
```

---

## Ternary কখন use করবে?

| Case | কোনটা |
|------|--------|
| একটা value assign | ✅ Ternary |
| Simple true/false output | ✅ Ternary |
| Multiple lines of code | ❌ if-else |
| Complex logic | ❌ if-else |
| Nested | ❌ if-else |

```csharp
// ✅ Good
string msg = age >= 18 ? "Adult" : "Minor";

// ❌ Bad — পড়া impossible
string msg = a > b ? (a > c ? "a" : "c") : (b > c ? "b" : "c");
```

---

## Summary

**Nested if:**
- if এর ভিতরে if — multiple level decision
- 2 level পর্যন্ত OK, বেশি হলে && দিয়ে combine করো

**Ternary (? :):**
- `condition ? trueValue : falseValue`
- Simple if-else এর shortcut
- Complex logic এ avoid করো

---

**পরের Lesson:** switch Statement — অনেকগুলো fixed option থেকে select।

---

*CPS Academy - Learn. Code. Grow.*
