---
title: "Lesson 6.9: Array Methods Part 2 — Find, Exists, Resize"
date: "2026-05-22"
excerpt: "Array.Resize, Array.Exists, Array.Find/FindAll/FindIndex/FindLastIndex এবং Lambda expression intro"
categories:
  - C# Course Scripts
tags:
  - csharp
  - array-methods
  - lambda
  - find
draft: false
---

# Lesson 6.9: Array Methods Part 2 — Find, Exists, Resize

> **এই Lesson এ শিখবে:** Array.Resize() — size বদলানো, Array.Exists() — condition দিয়ে check, Array.Find() — প্রথম match, Array.FindAll() — সব match, Array.FindIndex(), এবং Lambda expression এর intro।

---

## Array.Resize() — Size বদলানো

Array এর size **change** করা!

```csharp
Array.Resize(ref arrayName, newSize);
```

**`ref`** দিতে হয় — কারণ array এর size change হলে memory তে পরিবর্তন হয়।

### Size বাড়ানো:

```csharp
int[] numbers = { 10, 20, 30 };

Console.WriteLine("Before: " + numbers.Length);  // 3

Array.Resize(ref numbers, 5);  // Size 5 করলাম

Console.WriteLine("After: " + numbers.Length);  // 5

foreach (int n in numbers)
    Console.Write(n + " ");
// Output: 10 20 30 0 0  (new slots এ default value!)
```

### Size কমানো:

```csharp
int[] arr = { 1, 2, 3, 4, 5 };

Array.Resize(ref arr, 3);

foreach (int n in arr)
    Console.Write(n + " ");
// Output: 1 2 3  (শেষ 2 টা উধাও!)
```

---

## Array.Exists() — Condition দিয়ে Check

IndexOf specific value match করে। কিন্তু যদি **condition** দিয়ে check করতে চাই?

যেমন — "90 এর বেশি marks কেউ পেয়েছে?"

```csharp
Array.Exists(arrayName, condition);
```

### Example:

```csharp
int[] marks = { 78, 85, 92, 65, 88 };

bool anyAbove90 = Array.Exists(marks, m => m > 90);

Console.WriteLine(anyAbove90);  // True (92 আছে!)
```

### Lambda কী? `m => m > 90`

এটা **Lambda expression** — একটা mini function!

```
m => m > 90
↑       ↑
│       │
input  condition
```

"প্রতিটা element `m` এর জন্য, check করো `m > 90`।"

---

### আরো Examples:

```csharp
int[] marks = { 78, 85, 92, 65, 88 };

// কেউ কি fail করেছে (40 এর নিচে)?
bool hasFail = Array.Exists(marks, m => m < 40);
Console.WriteLine(hasFail);  // False

// জোড় number আছে?
int[] nums = { 1, 3, 5, 8, 9 };
bool hasEven = Array.Exists(nums, n => n % 2 == 0);
Console.WriteLine(hasEven);  // True (8 আছে!)
```

---

## Array.Find() — প্রথম Match

**Condition match করে এমন প্রথম element** ফিরিয়ে দেয়।

```csharp
int[] marks = { 78, 85, 92, 65, 88, 95 };

// প্রথম 90+ marks
int firstHigh = Array.Find(marks, m => m > 90);
Console.WriteLine(firstHigh);  // 92 (প্রথম 90+)
```

### Use case: First item matching

```csharp
string[] names = { "Rahim", "Rafiq", "Karim", "Ratan" };

// R দিয়ে শুরু হয় প্রথম যেটা
string firstR = Array.Find(names, n => n.StartsWith("R"));
Console.WriteLine(firstR);  // Rahim
```

### না পেলে কী হয়?

**Default value** return করে:
- `int` → 0
- `string` → null
- `bool` → false

```csharp
int[] nums = { 1, 2, 3 };
int result = Array.Find(nums, n => n > 100);
Console.WriteLine(result);  // 0 (default, পায়নি!)
```

---

## Array.FindAll() — সব Match

**সব matching elements** এর একটা নতুন array return করে।

```csharp
int[] marks = { 78, 85, 92, 65, 88, 95, 45 };

int[] passMarks = Array.FindAll(marks, m => m >= 40);
// passMarks = { 78, 85, 92, 65, 88, 95, 45 }

int[] highMarks = Array.FindAll(marks, m => m > 80);
// highMarks = { 85, 92, 88, 95 }

int[] failMarks = Array.FindAll(marks, m => m < 40);
// failMarks = { } (empty!)

foreach (int m in highMarks)
    Console.Write(m + " ");
// Output: 85 92 88 95
```

---

## Array.FindIndex() — প্রথম Match এর Index

```csharp
int[] marks = { 78, 85, 92, 65, 88 };

// প্রথম 90+ marks কোন index এ?
int idx = Array.FindIndex(marks, m => m > 90);
Console.WriteLine(idx);  // 2 (index 2 এ 92)

// না পেলে -1
int notFound = Array.FindIndex(marks, m => m > 100);
Console.WriteLine(notFound);  // -1
```

---

## Array.FindLastIndex() — শেষ Match এর Index

```csharp
int[] numbers = { 5, 10, 3, 8, 12, 7, 15 };

// শেষ double-digit number
int lastIdx = Array.FindLastIndex(numbers, n => n >= 10);
Console.WriteLine(lastIdx);  // 6 (15)
```

---

## Lambda Expression বিস্তারিত

Lambda হলো একটা **anonymous function** — inline function।

### Syntax:

```
input => output
```

### Examples:

```csharp
m => m > 90           // m 90 এর বেশি?
n => n % 2 == 0       // n জোড়?
x => x * 2            // x কে double
s => s.Length > 5     // string 5 char এর বেশি?
name => name.StartsWith("R")  // R দিয়ে শুরু?
```

### Multi-line Lambda:

```csharp
m => {
    Console.WriteLine($"Checking: {m}");
    return m > 90;
}
```

---

## Complete Example: Grade Analysis

```csharp
int[] marks = { 95, 78, 45, 88, 35, 92, 68, 72, 28 };

Console.WriteLine("🎓 GRADE ANALYSIS\n");

// All marks
Console.WriteLine("All marks: " + string.Join(", ", marks));

// Pass/Fail
int[] pass = Array.FindAll(marks, m => m >= 40);
int[] fail = Array.FindAll(marks, m => m < 40);

Console.WriteLine($"\n✅ Passed ({pass.Length}): " + string.Join(", ", pass));
Console.WriteLine($"❌ Failed ({fail.Length}): " + string.Join(", ", fail));

// Grade A+ (80+)
int[] aPlus = Array.FindAll(marks, m => m >= 80);
Console.WriteLine($"\n🌟 A+ ({aPlus.Length}): " + string.Join(", ", aPlus));

// First A+
int firstAPlus = Array.Find(marks, m => m >= 80);
int firstAPlusIdx = Array.FindIndex(marks, m => m >= 80);
Console.WriteLine($"First A+: {firstAPlus} (at index {firstAPlusIdx})");

// কেউ 90+ পেয়েছে?
bool anyTop = Array.Exists(marks, m => m >= 90);
Console.WriteLine($"\nAny 90+? {(anyTop ? "Yes! 🎉" : "No")}");
```

Output:
```
🎓 GRADE ANALYSIS

All marks: 95, 78, 45, 88, 35, 92, 68, 72, 28

✅ Passed (7): 95, 78, 45, 88, 92, 68, 72
❌ Failed (2): 35, 28

🌟 A+ (3): 95, 88, 92
First A+: 95 (at index 0)

Any 90+? Yes! 🎉
```

---

## Real Example: Product Search

```csharp
string[] products = { "iPhone", "iPad", "MacBook", "AirPods", "iMac" };
double[] prices = { 90000, 55000, 150000, 25000, 120000 };

// Under 50000
Console.WriteLine("Under 50000:");
for (int i = 0; i < products.Length; i++)
{
    if (prices[i] < 50000)
        Console.WriteLine($"  {products[i]}: {prices[i]} tk");
}

// First product "i" দিয়ে শুরু
string first = Array.Find(products, p => p.StartsWith("i"));
Console.WriteLine($"\nFirst 'i' product: {first}");

// All "i" products
string[] iProducts = Array.FindAll(products, p => p.StartsWith("i"));
Console.WriteLine("All 'i' products: " + string.Join(", ", iProducts));

// Any over 100000?
bool expensive = Array.Exists(prices, p => p > 100000);
Console.WriteLine($"\nAny expensive product? {expensive}");
```

---

## Summary Table

| Method | কাজ | Return |
|--------|-----|--------|
| **Resize** | Size change | (modifies) |
| **Exists** | কেউ condition match? | bool |
| **Find** | প্রথম matching element | element / default |
| **FindAll** | সব matching elements | new array |
| **FindIndex** | প্রথম match এর index | int (-1 if none) |
| **FindLastIndex** | শেষ match এর index | int (-1 if none) |

### Lambda Syntax:
```
input => condition/expression
```

**মনে রাখো:**
- **Resize** এ `ref` দিতে হয়
- **Exists/Find** — condition দিয়ে search
- **IndexOf** vs **FindIndex** — একটা value, একটা condition
- Lambda = mini function: `m => m > 90`
- Find **default value** return করে না পেলে

---

**পরের Lesson:** Practice & Assignments — সব array concepts মিলিয়ে!

---

*CPS Academy - Learn. Code. Grow.*
