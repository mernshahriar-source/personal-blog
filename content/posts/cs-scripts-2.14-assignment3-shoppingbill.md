---
title: "Lesson 2.14: Assignment 3 Solution — Shopping Bill with Discount"
date: "2026-04-24"
excerpt: "Item এর price, quantity নিয়ে subtotal, discount, delivery charge সহ final bill"
categories:
  - C# Course Scripts
tags:
  - csharp
  - assignment
  - shopping-bill
  - practice
draft: false
---

# Lesson 2.14: Assignment 3 Solution — Shopping Bill with Discount

> **Assignment:** ৩টা item এর name, price, quantity নাও। Subtotal বের করো, discount % apply করো, delivery charge যোগ করো, final bill দেখাও।

---

## Solution

```csharp
// Items
string item1 = "T-Shirt";
int price1 = 450;
int qty1 = 2;

string item2 = "Jeans";
int price2 = 1200;
int qty2 = 1;

string item3 = "Sneakers";
int price3 = 2500;
int qty3 = 1;

// Subtotals
int sub1 = price1 * qty1;
int sub2 = price2 * qty2;
int sub3 = price3 * qty3;

// Total before discount
int subtotal = sub1 + sub2 + sub3;

// Discount
double discountPercent = 10;
double discountAmount = subtotal * discountPercent / 100;
double afterDiscount = subtotal - discountAmount;

// Delivery
double deliveryCharge = 60;
double finalBill = afterDiscount + deliveryCharge;

// VAT
double vatPercent = 5;
double vatAmount = finalBill * vatPercent / 100;
double grandTotal = finalBill + vatAmount;

// Bill Print
Console.WriteLine("╔════════════════════════════════════════╗");
Console.WriteLine("║          🛒 SHOPPING BILL              ║");
Console.WriteLine("╠════════════════════════════════════════╣");
Console.WriteLine($"║  {item1,-12} {price1,6} × {qty1}  = {sub1,8} tk ║");
Console.WriteLine($"║  {item2,-12} {price2,6} × {qty2}  = {sub2,8} tk ║");
Console.WriteLine($"║  {item3,-12} {price3,6} × {qty3}  = {sub3,8} tk ║");
Console.WriteLine("╠════════════════════════════════════════╣");
Console.WriteLine($"║  Subtotal:              {subtotal,8} tk ║");
Console.WriteLine($"║  Discount ({discountPercent}%):        -{discountAmount,7:F0} tk ║");
Console.WriteLine($"║  After Discount:        {afterDiscount,8:F0} tk ║");
Console.WriteLine($"║  Delivery:              +{deliveryCharge,7:F0} tk ║");
Console.WriteLine($"║  VAT ({vatPercent}%):              +{vatAmount,7:F0} tk ║");
Console.WriteLine("╠════════════════════════════════════════╣");
Console.WriteLine($"║  💰 GRAND TOTAL:        {grandTotal,8:F0} tk ║");
Console.WriteLine("╚════════════════════════════════════════╝");
```

---

## Output

```
╔════════════════════════════════════════╗
║          🛒 SHOPPING BILL              ║
╠════════════════════════════════════════╣
║  T-Shirt        450 × 2  =      900 tk ║
║  Jeans         1200 × 1  =     1200 tk ║
║  Sneakers      2500 × 1  =     2500 tk ║
╠════════════════════════════════════════╣
║  Subtotal:                    4600 tk ║
║  Discount (10%):              -460 tk ║
║  After Discount:              4140 tk ║
║  Delivery:                     +60 tk ║
║  VAT (5%):                   +210 tk ║
╠════════════════════════════════════════╣
║  💰 GRAND TOTAL:              4410 tk ║
╚════════════════════════════════════════╝
```

---

## কী কী Use হলো

| Concept | কোথায় |
|---------|--------|
| string, int, double | items, prices, percentages |
| `*` operator | price × quantity |
| `+` `-` operators | subtotal, discount, delivery |
| `/` operator | percentage calculation |
| Formatting (,8 ,-12) | table alignment |
| :F0 formatting | decimal ছাড়া দেখানো |

---

## Module 2 Complete! 🎉

**এই Module এ শিখলে:**
- Variable ও Data Types
- Arithmetic, Assignment, Comparison, Logical Operators
- Type Casting ও Overflow
- String ↔ Number Conversion
- সব মিলিয়ে real projects

**পরের Module:** Input/Output — User থেকে data নেওয়া শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
