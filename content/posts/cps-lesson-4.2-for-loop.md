---
title: "Lesson 4.2: for Loop"
date: "2026-03-14"
excerpt: "for loop এর syntax ও structure, i++ shortcut, while vs for তুলনা, উল্টা দিকে loop, break ও continue, এবং real-world examples"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - loops
  - while
  - for
  - iteration
draft: false
---


> **এই Lesson এ শিখবে:** for loop এর syntax ও structure, i++ shortcut, while vs for তুলনা, উল্টা দিকে loop, break ও continue, এবং real-world examples।

---

## while থেকে for এ আসা

আগের lesson এ while loop দিয়ে 1 থেকে 5 print করেছিলাম:

```csharp
int i = 1;           // Initialization

while (i <= 5)       // Condition
{
    Console.WriteLine(i);
    i = i + 1;       // Update
}
```

এখানে ৩টা জিনিস (Initialization, Condition, Update) ৩ জায়গায় আছে।

**for loop এ এই ৩টাই এক লাইনে!**

```csharp
for (int i = 1; i <= 5; i = i + 1)
{
    Console.WriteLine(i);
}
```

Output দুইটাই same: `1 2 3 4 5`

---

## for Loop এর Structure

```csharp
for (initialization; condition; update)
{
    // কাজ করো
}
```

সেমিকোলন (;) দিয়ে ৩টা part আলাদা:

| Part | কী করে | কখন চলে |
|------|--------|---------|
| Initialization | শুরুর অবস্থা | **একবারই** — loop শুরুতে |
| Condition | শর্ত check | **প্রতি round এ** — true হলে body চলে |
| Update | পরিবর্তন | **প্রতি round শেষে** |

### Execution Order:

```
Initialization (একবার)
    ↓
Condition → false → EXIT
    ↓ true
Body চলবে
    ↓
Update
    ↓
Condition → false → EXIT
    ↓ true
Body চলবে
    ↓
Update
    ... (এভাবে চলতে থাকে)
```

---

## Step by Step Execution

```csharp
for (int i = 1; i <= 5; i = i + 1)
{
    Console.WriteLine(i);
}
```

| Round | i | i <= 5? | Output | Update → i |
|-------|---|---------|--------|------------|
| 1 | 1 | হ্যাঁ ✅ | 1 | 2 |
| 2 | 2 | হ্যাঁ ✅ | 2 | 3 |
| 3 | 3 | হ্যাঁ ✅ | 3 | 4 |
| 4 | 4 | হ্যাঁ ✅ | 4 | 5 |
| 5 | 5 | হ্যাঁ ✅ | 5 | 6 |
| 6 | 6 | না ❌ | — | — |

---

## i++ কী?

`i++` হলো `i = i + 1` এর shortcut:

| লম্বা version | Short version |
|---------------|---------------|
| `i = i + 1` | `i++` |
| `i = i - 1` | `i--` |

দুইটা same কাজ করে। `i++` লিখতে সহজ, তাই সবাই এটাই use করে:

```csharp
// এই দুইটা identical
for (int i = 1; i <= 5; i = i + 1)
for (int i = 1; i <= 5; i++)
```

আমরা এখন থেকে `i++` use করবো।

---

## while vs for — পাশাপাশি

**while:**
```csharp
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    i++;
}
```

**for:**
```csharp
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}
```

**কোনটা কখন?**

| Situation | কোনটা | কেন |
|-----------|-------|-----|
| কতবার চলবে জানি | **for** ✅ | "5 বার", "100 বার" |
| কতবার জানি না | **while** ✅ | "যতক্ষণ password ভুল" |

---

## উল্টা দিক — Countdown

for loop বড় থেকে ছোটের দিকেও যেতে পারে:

```csharp
Console.WriteLine("🚀 Countdown!\n");

for (int i = 10; i >= 1; i--)
{
    Console.WriteLine(i);
}

Console.WriteLine("\n🔥 BLAST OFF!");
```

| বাড়ানো (1→10) | কমানো (10→1) |
|----------------|--------------|
| `i = 1` | `i = 10` |
| `i <= 10` | `i >= 1` |
| `i++` | `i--` |

---

## Example: Multiplication Table

```csharp
int number = 7;

Console.WriteLine($"📋 {number} এর নামতা:\n");

for (int i = 1; i <= 10; i++)
{
    Console.WriteLine($"   {number} × {i} = {number * i}");
}
```

Output:
```
📋 7 এর নামতা:

   7 × 1 = 7
   7 × 2 = 14
   7 × 3 = 21
   ...
   7 × 10 = 70
```

---

## Example: Sum of Numbers

```csharp
int sum = 0;

for (int i = 1; i <= 10; i++)
{
    sum = sum + i;
}

Console.WriteLine($"1 থেকে 10 এর যোগফল: {sum}");  // 55
```

| i | sum (আগে) | sum + i | sum (পরে) |
|---|-----------|---------|-----------|
| 1 | 0 | 0+1 | 1 |
| 2 | 1 | 1+2 | 3 |
| 3 | 3 | 3+3 | 6 |
| ... | ... | ... | ... |
| 10 | 45 | 45+10 | **55** |

---

## Example: Factorial

```csharp
int number = 5;
int factorial = 1;

for (int i = 1; i <= number; i++)
{
    factorial = factorial * i;
}

Console.WriteLine($"{number}! = {factorial}");  // 120
```

---

## Example: Even Numbers Only

1 থেকে 20 এর মধ্যে শুধু জোড় সংখ্যা:

**Way 1: if দিয়ে check**
```csharp
for (int i = 1; i <= 20; i++)
{
    if (i % 2 == 0)
        Console.WriteLine(i);
}
```

**Way 2: 2 করে লাফ**
```csharp
for (int i = 2; i <= 20; i = i + 2)
{
    Console.WriteLine(i);
}
```

Output: `2 4 6 8 10 12 14 16 18 20`

দ্বিতীয় way তে `i = i + 2` করছি, তাই সরাসরি 2, 4, 6... যাচ্ছে।

---

## for Loop এ break ও continue

while loop এর মতোই কাজ করে:

### break — loop থেকে বের হও

```csharp
for (int i = 1; i <= 10; i++)
{
    if (i == 6)
    {
        Console.WriteLine("6 পেয়ে গেছি! থামছি!");
        break;
    }
    Console.WriteLine(i);
}
```

Output: `1 2 3 4 5` তারপর "6 পেয়ে গেছি! থামছি!"

### continue — এই round skip করো

```csharp
for (int i = 1; i <= 10; i++)
{
    if (i == 5) continue;  // 5 skip
    Console.WriteLine(i);
}
```

Output: `1 2 3 4 6 7 8 9 10` (5 নেই!)

**Note:** for loop এ continue দিলে update (`i++`) ঠিকই execute হয়। তাই while loop এর মতো infinite loop হওয়ার ঝুঁকি নেই।

---

## Complete Example: Number Series Printer

```csharp
Console.Write("Start from: ");
int start = int.Parse(Console.ReadLine());

Console.Write("End at: ");
int end = int.Parse(Console.ReadLine());

Console.WriteLine($"\n📋 Numbers from {start} to {end}:\n");

if (start <= end)
{
    for (int i = start; i <= end; i++)
        Console.Write(i + " ");
}
else
{
    for (int i = start; i >= end; i--)
        Console.Write(i + " ");
}

Console.WriteLine("\n\n✅ Done!");
```

**Run 1:** Start: 5, End: 15 → `5 6 7 8 9 10 11 12 13 14 15`
**Run 2:** Start: 20, End: 10 → `20 19 18 17 16 15 14 13 12 11 10`

---

## Complete Example: Star Printer ⭐

```csharp
Console.Write("কয়টা star চাও? ");
int count = int.Parse(Console.ReadLine());

Console.Write("\n");

for (int i = 1; i <= count; i++)
{
    Console.Write("⭐");
}

Console.WriteLine("\n\n✅ Done!");
```

Input: 10 → `⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐`

---

## Common Mistakes

### Mistake 1: comma vs semicolon

```csharp
// ❌ comma দিয়েছে
for (int i = 1, i <= 5, i++)

// ✓ semicolon দিতে হবে
for (int i = 1; i <= 5; i++)
```

### Mistake 2: for এর পরেই semicolon

```csharp
// ❌ for এর পর ; দিলে body empty হয়ে যায়!
for (int i = 1; i <= 5; i++);
{
    Console.WriteLine(i);  // loop এর part না!
}

// ✓ ; দিও না
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}
```

### Mistake 3: Infinite loop — update ভুল দিকে

```csharp
// ❌ i কমছে, কখনো 5 এর বেশি হবে না!
for (int i = 1; i <= 5; i--)

// ✓ বাড়াতে হলে i++
for (int i = 1; i <= 5; i++)
```

### Mistake 4: Off-by-one — < vs <=

```csharp
// 4 বার চলবে (1,2,3,4)
for (int i = 1; i < 5; i++)

// 5 বার চলবে (1,2,3,4,5)
for (int i = 1; i <= 5; i++)

// 5 বার চলবে (0,1,2,3,4)
for (int i = 0; i < 5; i++)
```

`<` আর `<=` এর পার্থক্য মাথায় রাখো!

---

## Summary

| Concept | মানে |
|---------|------|
| for loop | নির্দিষ্ট সংখ্যকবার কাজ করা |
| initialization | শুরুর অবস্থা (একবারই চলে) |
| condition | শর্ত check (প্রতি round এ) |
| update | পরিবর্তন (প্রতি round শেষে) |
| `i++` | `i = i + 1` এর shortcut |
| `i--` | `i = i - 1` এর shortcut |

**for Loop এর Structure:**
```csharp
for (initialization; condition; update)
{
    // কাজ করো
}
```

**মনে রাখো:**
- সেমিকোলন (;) দিয়ে ৩ part আলাদা
- for এর পরে সেমিকোলন দিও না
- কতবার চলবে জানলে → **for**
- কতবার জানো না → **while**

---

**পরের Lesson:** do-while Loop — যেখানে অন্তত একবার কাজ হবেই!

---

*CPS Academy - Learn. Code. Grow.*
