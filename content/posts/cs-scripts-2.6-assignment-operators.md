---
title: "Lesson 2.6: Assignment Operators — +=, -=, ++, -- দিয়ে Shortcut"
date: "2026-04-16"
excerpt: "Compound assignment, increment, decrement, ++x vs x++ পার্থক্য, real examples"
categories:
  - C# Course Scripts
tags:
  - csharp
  - operators
  - assignment
  - increment
  - decrement
draft: false
---

# Lesson 2.3: Assignment Operators — +=, -=, ++, -- দিয়ে Shortcut

> **এই Lesson এ শিখবে:** = (basic assignment), += -= *= /= %= (compound assignment), ++ (increment), -- (decrement), ++x vs x++ পার্থক্য, এবং Gaming/Shopping real examples।

---

## = (Basic Assignment)

Variable এ value রাখা:

```csharp
int score = 100;
string name = "Rahim";
double price = 99.99;
```

**=** মানে **"এটা রাখো"**, "সমান" না!

---

## += (যোগ করে রাখো)

`score = score + 10` এর shortcut:

```csharp
int score = 100;
score += 10;  // score = score + 10

Console.WriteLine(score);  // 110
```

### Gaming Example:

```csharp
int score = 0;

Console.WriteLine($"Game started! Score: {score}");

score += 100;  // Enemy kill
Console.WriteLine($"Enemy killed! Score: {score}");  // 100

score += 50;   // Headshot bonus
Console.WriteLine($"Headshot bonus! Score: {score}");  // 150

score += 500;  // Level complete
Console.WriteLine($"Level complete! Score: {score}");  // 675
```

### Shopping Cart Example:

```csharp
double cartTotal = 0;

cartTotal += 450;   // Shirt
cartTotal += 650;   // Pants
cartTotal += 1200;  // Shoes
cartTotal += 60;    // Delivery

Console.WriteLine($"Final total: {cartTotal} tk");  // 2360
```

### String এও কাজ করে:

```csharp
string message = "Hello";
message += " ";
message += "World!";

Console.WriteLine(message);  // Hello World!
```

---

## -= (বিয়োগ করে রাখো)

```csharp
int health = 100;

health -= 20;  // 20 damage!
Console.WriteLine($"Health: {health}");  // 80

health -= 35;  // আরো damage!
Console.WriteLine($"Health: {health}");  // 45
```

### Wallet Example:

```csharp
double wallet = 5000;

wallet -= 450;   // Shirt কিনলাম
wallet -= 200;   // খাবার খেলাম
wallet -= 1500;  // Phone case

Console.WriteLine($"Wallet e baki: {wallet} tk");  // 2850
```

---

## *= (গুণ করে রাখো)

```csharp
int coins = 100;
coins *= 2;  // Double coins!

Console.WriteLine(coins);  // 200
```

### Power-up Example:

```csharp
int damage = 10;

Console.WriteLine($"Normal damage: {damage}");

damage *= 3;  // Triple damage power-up!
Console.WriteLine($"Triple damage: {damage}");  // 30
```

---

## /= (ভাগ করে রাখো) ও %= (ভাগশেষ রাখো)

```csharp
int totalBill = 1000;
totalBill /= 4;  // 4 জনে ভাগ
Console.WriteLine($"Per person: {totalBill} tk");  // 250

int hours = 50;
hours %= 24;  // 24 ঘণ্টায় কত বাকি
Console.WriteLine($"Remaining hours: {hours}");  // 2
```

---

## ++ (Increment — এক বাড়াও)

`count = count + 1` বা `count += 1` এর সবচেয়ে short version:

```csharp
int likes = 100;
likes++;

Console.WriteLine(likes);  // 101
```

তিনটাই same:

```csharp
count = count + 1;
count += 1;
count++;  // সবচেয়ে short!
```

### Like System:

```csharp
int likes = 0;

likes++;  // কেউ like দিলো
likes++;  // আরেকজন
likes++;  // আরেকজন

Console.WriteLine($"❤️ Likes: {likes}");  // 3
```

---

## -- (Decrement — এক কমাও)

```csharp
int lives = 3;

Console.WriteLine($"Lives: {lives}");  // 3

lives--;  // একটা life গেলো!
Console.WriteLine($"Lives: {lives}");  // 2

lives--;
Console.WriteLine($"Lives: {lives}");  // 1

lives--;
Console.WriteLine($"💀 Game Over! Lives: {lives}");  // 0
```

---

## ++x vs x++ — Pre vs Post

### x++ (Post-increment): আগে use করো, তারপর বাড়াও

```csharp
int x = 5;
Console.WriteLine(x++);  // 5 print হবে (আগে use)
Console.WriteLine(x);    // 6 (তারপর বেড়েছে)
```

### ++x (Pre-increment): আগে বাড়াও, তারপর use করো

```csharp
int x = 5;
Console.WriteLine(++x);  // 6 print হবে (আগে বাড়লো)
Console.WriteLine(x);    // 6
```

### Side by Side:

```csharp
int a = 10;
int b = 10;

int result1 = a++;  // result1 = 10, a = 11
int result2 = ++b;  // b = 11, result2 = 11

Console.WriteLine($"a={a}, result1={result1}");  // a=11, result1=10
Console.WriteLine($"b={b}, result2={result2}");  // b=11, result2=11
```

**মনে রাখো:**

```
x++ = "use করো, তারপর বাড়াও" (++ পরে আছে)
++x = "বাড়াও, তারপর use করো" (++ আগে আছে)
```

**Suggestion:** Confused হলে আলাদা line এ লেখো — `count++;` then `Console.WriteLine(count);`

---

## Quick Reference

| Shortcut | মানে | Example |
|----------|------|---------|
| `x += 5` | `x = x + 5` | `score += 100` |
| `x -= 5` | `x = x - 5` | `health -= 20` |
| `x *= 2` | `x = x * 2` | `coins *= 2` |
| `x /= 2` | `x = x / 2` | `bill /= 4` |
| `x %= 10` | `x = x % 10` | `hour %= 12` |
| `x++` | `x = x + 1` | `likes++` |
| `x--` | `x = x - 1` | `lives--` |

---

## Common Mistakes

### Mistake 1: = আর == গুলিয়ে ফেলা

```csharp
int x = 10;   // Assignment (রাখা)
// x == 10;   // Comparison (তুলনা) — পরের lesson এ শিখবে!
```

### Mistake 2: /= এ integer division

```csharp
int total = 10;
total /= 3;  // 3, not 3.33!
// double চাইলে double variable use করো
```

---

## Summary

**কোথায় কাজে লাগে:**
- 🎮 Game: score `+=`, health `-=`, lives `--`
- 🛒 Shopping: cart total `+=`
- ❤️ Social: likes `++`, followers `++`
- ⏱️ Countdown: timer `--`

**মনে রাখো:**
- `+=` মানে "যোগ করে রাখো"
- `-=` মানে "বিয়োগ করে রাখো"
- `++` মানে "এক বাড়াও"
- `--` মানে "এক কমাও"

---

**পরের Lesson:** Comparison Operators — `==`, `!=`, `>`, `<`, `>=`, `<=` দিয়ে তুলনা করা।

---

*CPS Academy - Learn. Code. Grow.*
