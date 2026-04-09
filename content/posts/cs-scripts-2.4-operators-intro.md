---
title: "Lesson 2.4: Operators Introduction — Operator কী?"
date: "2026-04-14"
excerpt: "Operator কী, কেন দরকার, কত ধরনের Operators আছে, প্রতিটার কাজ কী"
categories:
  - C# Course Scripts
tags:
  - csharp
  - operators
  - introduction
draft: false
---

# Lesson 2.3: Operators Introduction — Operator কী?

> **এই Lesson এ শিখবে:** Operator কী, কেন দরকার, কত ধরনের Operators আছে, প্রতিটার কাজ কী, এবং আমরা কী কী শিখবো।

---

## Operator কী?

Variable এ data রাখা শিখেছো। কিন্তু **data দিয়ে কাজ** করতে হলে Operator লাগবে।

```csharp
int a = 10;
int b = 5;

int result = a + b;  // + হলো operator!
```

**Operator = চিহ্ন যেটা data দিয়ে কোনো কাজ করে।**

যোগ, বিয়োগ, তুলনা, logic — সব operator দিয়ে করা হয়।

---

## কেন দরকার?

Operator ছাড়া program কিছুই করতে পারে না:

```csharp
// Calculator? Operator লাগবে
int total = price * quantity;

// Pass/Fail check? Operator লাগবে
bool passed = marks >= 40;

// Login check? Operator লাগবে
bool success = username == "admin" && password == "1234";
```

---

## কত ধরনের Operator?

C# এ অনেক ধরনের operator আছে। আমরা **৪ টা** শিখবো:

| ধরন | কাজ | Examples |
|-----|-----|---------|
| **Arithmetic** | গণিত — যোগ, বিয়োগ, গুণ, ভাগ | `+ - * / %` |
| **Assignment** | Value বসানো ও update করা | `= += -= *= ++ --` |
| **Comparison** | দুইটা জিনিস তুলনা করা | `== != > < >= <=` |
| **Logical** | একাধিক condition combine করা | `&& \|\| !` |

---

## এক নজরে Preview

### Arithmetic — "হিসাব করো"

```csharp
int total = 10 + 5;     // 15
int diff = 10 - 5;      // 5
int product = 10 * 5;   // 50
int quotient = 10 / 5;  // 2
int remainder = 10 % 3; // 1
```

### Assignment — "রাখো / update করো"

```csharp
int score = 100;    // রাখো
score += 50;        // 50 যোগ করে রাখো (150)
score -= 20;        // 20 বিয়োগ করে রাখো (130)
score++;            // এক বাড়াও (131)
```

### Comparison — "তুলনা করো"

```csharp
bool isEqual = 10 == 10;   // true (সমান)
bool isBig = 10 > 5;       // true (বড়)
bool isSmall = 3 < 8;      // true (ছোট)
```

### Logical — "condition জোড়া দাও"

```csharp
bool both = true && true;    // true (দুইটাই true)
bool either = true || false; // true (একটা true)
bool flip = !true;           // false (উল্টা)
```

---

## Operand কী?

Operator যেগুলোর উপর কাজ করে সেগুলোকে বলে **operand**:

```csharp
int result = 10 + 5;
//           ↑    ↑    ↑
//        operand  operator  operand
```

| Term | মানে | Example |
|------|------|---------|
| Operator | চিহ্ন / কাজ | `+` |
| Operand | যার উপর কাজ হচ্ছে | `10`, `5` |
| Expression | পুরো হিসাব | `10 + 5` |

---

## আমাদের Plan

পরের lessons এ একে একে শিখবো:

1. **Arithmetic** — `+`, `-`, `*`, `/`, `%` (Integer Division trap সহ!)
2. **Assignment** — `+=`, `-=`, `++`, `--` (shortcut ways)
3. **Comparison** — `==`, `!=`, `>`, `<`, `>=`, `<=` (তুলনা)
4. **Logical** — `&&`, `||`, `!` (condition combine)

**চলো শুরু করি!**

---

**পরের Lesson:** Arithmetic Operators — +, -, *, /, % দিয়ে calculation।

---

*CPS Academy - Learn. Code. Grow.*
