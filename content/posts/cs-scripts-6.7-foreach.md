---
title: "Lesson 6.7: foreach Loop — Array এর জন্য Special Loop"
date: "2026-05-20"
excerpt: "foreach syntax, for vs foreach, Limitations এবং কখন কোনটা use করবে"
categories:
  - C# Course Scripts
tags:
  - csharp
  - foreach
  - loops
  - arrays
draft: false
---

# Lesson 6.7: foreach Loop — Array এর জন্য Special Loop

> **এই Lesson এ শিখবে:** foreach কী ও কেন, Syntax বুঝা, for vs foreach comparison, Different types এ foreach, Sum/Average দিয়ে foreach, foreach এর limitations, কখন কোনটা use করবে, 2D array এ foreach।

---

## for দিয়ে Array Traverse এর সমস্যা

```csharp
string[] fruits = { "Apple", "Banana", "Mango", "Orange" };

for (int i = 0; i < fruits.Length; i++)
{
    Console.WriteLine(fruits[i]);
}
```

**অনেক কিছু লিখতে হচ্ছে:**
- `int i = 0` — counter বানাও
- `i < fruits.Length` — length check
- `i++` — counter বাড়াও
- `fruits[i]` — index দিয়ে access

**মনে মনে তুমি শুধু বলতে চাও:** "fruits এর প্রতিটা জিনিস print করো"।

**আরো সহজ উপায় আছে?** 🤔

---

## foreach Loop!

**foreach = "for each" = "প্রতিটার জন্য"**

```csharp
string[] fruits = { "Apple", "Banana", "Mango", "Orange" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

**কত সহজ!** 😍

- Index নিয়ে মাথা ঘামাতে হয় না
- Length check নেই
- Counter নেই
- শুধু বলে দাও কী করবে!

---

## পাশাপাশি দেখি

```csharp
// for — verbose
for (int i = 0; i < fruits.Length; i++)
{
    Console.WriteLine(fruits[i]);
}

// foreach — clean!
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

দুটার output same!

---

## foreach Syntax

```csharp
foreach (type variable in collection)
{
    // কাজ করো
}
```

```csharp
foreach (string fruit in fruits)
           ↑      ↑       ↑
           │      │       │
         Type   নাম      কোন array
```

**বাংলায় পড়ি:**

> "**প্রতিটা** `fruit` (যা একটা string) — `fruits` array থেকে — এর জন্য:"

---

## কীভাবে কাজ করে — Step by Step

```csharp
string[] fruits = { "Apple", "Banana", "Mango" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

### Behind the scenes:

```
Round 1:
  fruit = "Apple"  (fruits[0])
  Print: Apple

Round 2:
  fruit = "Banana" (fruits[1])
  Print: Banana

Round 3:
  fruit = "Mango"  (fruits[2])
  Print: Mango

Array শেষ → Loop শেষ!
```

---

## Different Types এ foreach

### int array:

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

foreach (int num in numbers)
{
    Console.WriteLine(num);
}
```

### double array:

```csharp
double[] prices = { 99.50, 149.99, 199.00 };

foreach (double price in prices)
{
    Console.WriteLine($"Price: {price} tk");
}
```

### bool array:

```csharp
bool[] attendance = { true, false, true, true };

foreach (bool present in attendance)
{
    Console.WriteLine(present ? "✅ Present" : "❌ Absent");
}
```

### char array:

```csharp
char[] grades = { 'A', 'B', 'C', 'A' };

foreach (char grade in grades)
{
    Console.WriteLine(grade);
}
```

---

## Sum ও Average foreach দিয়ে

### Sum:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int total = 0;

foreach (int mark in marks)
{
    total += mark;
}

Console.WriteLine($"Total: {total}");  // 433
```

### Average:

```csharp
double average = (double)total / marks.Length;
Console.WriteLine($"Average: {average:F2}");  // 86.60
```

---

## Max/Min foreach দিয়ে

### Max:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int max = marks[0];

foreach (int mark in marks)
{
    if (mark > max)
        max = mark;
}

Console.WriteLine($"Max: {max}");  // 92
```

---

## Count foreach দিয়ে

কতজন pass করেছে?

```csharp
int[] marks = { 85, 90, 35, 92, 30, 78 };
int passCount = 0;

foreach (int mark in marks)
{
    if (mark >= 40)
        passCount++;
}

Console.WriteLine($"Passed: {passCount}");  // 4
```

---

## for vs foreach — Detail Comparison

| | for | foreach |
|---|-----|---------|
| **Syntax** | Verbose | Clean |
| **Index access** | ✅ আছে (i) | ❌ নেই |
| **Element modify** | ✅ পারে | ❌ পারে না |
| **Backwards iterate** | ✅ পারে | ❌ পারে না |
| **Specific range** | ✅ পারে | ❌ পুরো array |
| **Break/Continue** | ✅ পারে | ✅ পারে |
| **Readability** | OK | **Best** |

---

## foreach এর Limitations

### ❌ Limitation 1: Element Modify করা যায় না

```csharp
int[] marks = { 85, 90, 78 };

// ❌ এটা কাজ করবে না!
foreach (int mark in marks)
{
    mark = mark + 5;  // Compile error!
}

// ✅ for দিয়ে করতে হবে
for (int i = 0; i < marks.Length; i++)
{
    marks[i] = marks[i] + 5;
}
```

**foreach শুধু read, update না।**

---

### ❌ Limitation 2: Index জানা যায় না

```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };

// ❌ index জানি না!
foreach (string name in names)
{
    // "Student ?" কিন্তু কততম? জানি না!
}

// ✅ for দিয়ে
for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"Student {i + 1}: {names[i]}");
}
```

---

### ❌ Limitation 3: Specific Range নেই

```csharp
int[] arr = { 10, 20, 30, 40, 50, 60, 70, 80 };

// শুধু 3 থেকে 6 index চাই? foreach এ পারবো না!

// for দিয়ে পারবো:
for (int i = 3; i <= 6; i++)
{
    Console.WriteLine(arr[i]);  // 40, 50, 60, 70
}
```

---

### ❌ Limitation 4: Backwards Iterate করা যায় না

```csharp
int[] arr = { 1, 2, 3, 4, 5 };

// ❌ foreach সবসময় শুরু থেকে শেষ

// ✅ for দিয়ে backwards
for (int i = arr.Length - 1; i >= 0; i--)
{
    Console.WriteLine(arr[i]);  // 5, 4, 3, 2, 1
}
```

---

## কখন কোনটা Use করবো?

### ✅ foreach use করো যখন:

- শুধু সব elements **read** করতে চাও
- Index লাগবে না
- Array/List পুরোটা traverse করবে
- Code **readable** রাখতে চাও

### ✅ for use করো যখন:

- Elements **modify** করতে হবে
- Index লাগবে (Student 1, Student 2 দেখাতে)
- নির্দিষ্ট range
- Backwards iterate

---

## 2D Array তে foreach

2D array তেও foreach use করা যায় — কিন্তু **সব element এ iterate** করে:

```csharp
int[,] matrix = {
    { 1, 2, 3 },
    { 4, 5, 6 }
};

foreach (int num in matrix)
{
    Console.Write($"{num} ");
}
// Output: 1 2 3 4 5 6
```

**কিন্তু row/column জানা যায় না!** যদি row-column লাগে, nested for use করো।

---

## Complete Example: Shopping Cart

```csharp
string[] items = { "Shirt", "Pants", "Shoes", "Watch" };
double[] prices = { 850.00, 1200.00, 2500.00, 1800.00 };

Console.WriteLine("🛒 SHOPPING CART");
Console.WriteLine("───────────────────");

// foreach prices use করে total
double total = 0;
foreach (double price in prices)
{
    total += price;
}

// Items print করতে index লাগবে → for use!
for (int i = 0; i < items.Length; i++)
{
    Console.WriteLine($"{items[i],-10} {prices[i],8:F2} tk");
}

Console.WriteLine("───────────────────");
Console.WriteLine($"{"Total",-10} {total,8:F2} tk");
```

Output:
```
🛒 SHOPPING CART
───────────────────
Shirt         850.00 tk
Pants        1200.00 tk
Shoes        2500.00 tk
Watch        1800.00 tk
───────────────────
Total        6350.00 tk
```

---

## Summary

**foreach = Clean iteration**

```csharp
foreach (type variable in array)
{
    // code using variable
}
```

**মনে রাখো:**
- **Read** করতে best
- **Modify** করতে for
- **Index** লাগলে for
- **Range** লাগলে for
- Code **readable** করে!

**Rule:**
```
Read all → foreach
Modify/Index/Range → for
```

---

**পরের Lesson:** Array Methods Part 1 — Sort, Reverse, IndexOf, Copy!

---

*CPS Academy - Learn. Code. Grow.*
