---
title: "Lesson 5.4: for Loop — কতবার চলবে জানলে for!"
date: "2026-05-10"
excerpt: "for loop structure, ৩টা part, i++, while vs for, Multiplication Table, Factorial, Countdown এবং Star Pattern preview"
categories:
  - C# Course Scripts
tags:
  - csharp
  - for-loop
  - loops
draft: false
---

# Lesson 5.4: for Loop — কতবার চলবে জানলে for!

> **এই Lesson এ শিখবে:** while থেকে for এ যাওয়া, for loop structure, ৩টা part (Init, Condition, Update), i++ কী, while vs for পাশাপাশি, কোনটা কখন, Multiplication table, Sum, Factorial, Countdown, Even numbers, Star pattern, for এ break/continue, এবং Common Mistakes।

---

## বউ এর কাছে আবার ফিরে যাই 😍

মনে আছে? বউ রাগ করেছিল, "I love you" 100 বার লিখতে বলেছিল।

তুমি while loop দিয়ে করেছিলে:

```csharp
int count = 0;

while (count < 100)
{
    Console.WriteLine("I love you");
    count = count + 1;
}
```

কাজ হয়ে গেছে, বউ খুশি! 😊

---

## এবার নতুন Problem!

বউ এবার বললো — "I love you" ঠিক **50 বার** লেখো। না কম, না বেশি!

তুমি তো এখন pro! while দিয়ে করে ফেললে:

```csharp
int count = 0;

while (count < 50)
{
    Console.WriteLine("I love you");
    count = count + 1;
}
```

কিন্তু একটু খেয়াল করো...

এখানে **৩টা জিনিস** আছে:
- `int count = 0;` → শুরু (Initialization)
- `count < 50` → শর্ত (Condition)
- `count = count + 1;` → বাড়ানো (Update)

এই ৩টা জিনিস **৩ জায়গায়** আছে।

**for loop এ এই ৩টাই এক জায়গায় লেখা যায়!**

---

## for Loop দিয়ে করি

Same কাজ for loop দিয়ে:

```csharp
for (int count = 0; count < 50; count = count + 1)
{
    Console.WriteLine("I love you");
}
```

ব্যাস! **এক লাইনেই ৩টা জিনিস!**

Output:
```
I love you
I love you
... (50 বার)
I love you
```

---

## for Loop Structure

```csharp
for (initialization; condition; update)
{
    // কাজ করো
}
```

**সেমিকোলন (`;`) দিয়ে ৩টা part আলাদা।**

---

## প্রতিটা Part কী করে?

```csharp
for (int count = 0; count < 50; count = count + 1)
```

### Part 1: Initialization (শুরু)

```csharp
int count = 0
```

- Loop শুরু হওয়ার আগে **একবারই** চলে
- Counter variable বানাচ্ছি
- "0 থেকে শুরু করো"

### Part 2: Condition (শর্ত)

```csharp
count < 50
```

- **প্রতি round এ** check হয়
- true হলে body চলে
- false হলে loop শেষ
- "50 এর কম থাকা পর্যন্ত চলো"

### Part 3: Update (পরিবর্তন)

```csharp
count = count + 1
```

- **প্রতি round এর শেষে** চলে
- Counter বাড়াচ্ছে/কমাচ্ছে
- "প্রতিবার 1 বাড়াও"

---

## Brain কীভাবে চিন্তা করে?

```csharp
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}
```

### Brain:
1. "শুরু করো i = 1 থেকে" (**Initialization**)
2. "i কি 5 এর সমান বা কম?" (**Condition**)
   - হ্যাঁ → i print করো → i 1 বাড়াও (**Update**) → আবার step 2
   - না → loop শেষ!

---

## Step by Step দেখি

```csharp
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}
```

| Round | i (শুরুতে) | i &lt;= 5? | Output | i++ |
|-------|------------|---------|--------|-----|
| 1 | 1 | true ✅ | 1 | 2 |
| 2 | 2 | true ✅ | 2 | 3 |
| 3 | 3 | true ✅ | 3 | 4 |
| 4 | 4 | true ✅ | 4 | 5 |
| 5 | 5 | true ✅ | 5 | 6 |
| 6 | 6 | **false** ❌ | — | STOP |

Output: `1 2 3 4 5`

---

## i++ কী জিনিস?

C# এ `count = count + 1` কে **shortcut** এ লেখা যায়:

```csharp
count = count + 1;   // full form
count += 1;          // shortcut
count++;             // আরো shortcut!
```

তিনটাই same কাজ করে।

তাই for loop এ সবাই লেখে:

```csharp
for (int i = 0; i < 50; i++)
{
    Console.WriteLine("I love you");
}
```

আরো clean!

### similarly:
- `i--` = i কে 1 কমাও (decrement)
- `i += 2` = i তে 2 যোগ করো
- `i -= 3` = i থেকে 3 বিয়োগ করো

---

## while vs for — পাশাপাশি দেখি

এখন তুমি দুইটাই জানো। পার্থক্য দেখি:

### while দিয়ে:

```csharp
int count = 0;           // শুরু — আলাদা line এ

while (count < 50)       // শর্ত — এখানে
{
    Console.WriteLine("I love you");
    count = count + 1;   // update — body এর মধ্যে
}
```

### for দিয়ে:

```csharp
for (int count = 0; count < 50; count = count + 1)
{
    Console.WriteLine("I love you");
}
```

| | while | for |
|---|-------|-----|
| ৩টা part | **আলাদা জায়গায়** | **একসাথে** |
| লাইন সংখ্যা | বেশি | কম |
| পড়তে | একটু কষ্ট | সহজ |

---

## কোনটা কখন Use করবো?

| Situation | কোনটা |
|-----------|-------|
| কতবার চলবে **জানি** (50 বার, 100 বার) | **for** |
| কতবার চলবে **জানি না** (password ঠিক হওয়া পর্যন্ত) | **while** |
| Counter এর সাথে কাজ | **for** |
| Condition complex | **while** |
| Array এর সব element | **for** |

### সহজ Rule:

```
🎯 কতবার জানি → for
❓ জানি না, শর্ত দেখে → while
```

---

## Real Example 1: Multiplication Table 📚

যেকোনো number এর নামতা:

```csharp
Console.Write("Which number's table? ");
int num = int.Parse(Console.ReadLine());

Console.WriteLine($"\n--- {num} এর নামতা ---\n");

for (int i = 1; i <= 10; i++)
{
    int result = num * i;
    Console.WriteLine($"{num} × {i,2} = {result,4}");
}
```

User 7 দিলে:
```
--- 7 এর নামতা ---

7 ×  1 =    7
7 ×  2 =   14
7 ×  3 =   21
...
7 × 10 =   70
```

`,2` আর `,4` হলো alignment — সুন্দর দেখানোর জন্য (Module 3 এ শিখেছি)।

---

## Real Example 2: Sum of Numbers

1 থেকে 100 পর্যন্ত সব numbers যোগ:

```csharp
int sum = 0;

for (int i = 1; i <= 100; i++)
{
    sum += i;
}

Console.WriteLine($"1 থেকে 100 পর্যন্ত sum = {sum}");
```

Output: `Sum = 5050`

### Even numbers এর sum:

```csharp
int sum = 0;

for (int i = 2; i <= 100; i += 2)  // 2 বাড়াচ্ছি!
{
    sum += i;
}

Console.WriteLine($"Even sum = {sum}");  // 2550
```

---

## Real Example 3: Factorial

```csharp
Console.Write("Enter a number: ");
int n = int.Parse(Console.ReadLine());

int factorial = 1;

for (int i = 1; i <= n; i++)
{
    factorial *= i;  // factorial = factorial * i
}

Console.WriteLine($"{n}! = {factorial}");
```

5 দিলে: `5! = 120`

---

## Real Example 4: Countdown (উল্টা দিক)

বড় থেকে ছোট — `i--` use করি:

```csharp
Console.WriteLine("🚀 Rocket Launch!\n");

for (int i = 10; i >= 1; i--)
{
    Console.WriteLine(i);
}

Console.WriteLine("\n🔥 BLAST OFF!");
```

Output:
```
10
9
8
...
1

🔥 BLAST OFF!
```

---

## Real Example 5: Even Numbers Only

1 থেকে 20 এর মধ্যে শুধু জোড়:

### Method 1 — i += 2:

```csharp
for (int i = 2; i <= 20; i += 2)
{
    Console.Write(i + " ");
}
```

### Method 2 — if দিয়ে check:

```csharp
for (int i = 1; i <= 20; i++)
{
    if (i % 2 == 0)
    {
        Console.Write(i + " ");
    }
}
```

দুইটাই same output: `2 4 6 8 10 12 14 16 18 20`

**Method 1 efficient, কম iteration!**

---

## for Loop এ break ও continue

while এর মতোই কাজ করে:

### break — loop থেকে বের:

```csharp
for (int i = 1; i <= 100; i++)
{
    if (i == 50)
    {
        Console.WriteLine("Stopping at 50!");
        break;
    }
    Console.Write(i + " ");
}
```

### continue — skip:

```csharp
// 1-15, কিন্তু 3 এর গুণিতক skip
for (int i = 1; i <= 15; i++)
{
    if (i % 3 == 0) continue;
    Console.Write(i + " ");
}
// Output: 1 2 4 5 7 8 10 11 13 14
```

---

## Star Pattern — Nested for এর preview!

```csharp
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= i; j++)
    {
        Console.Write("* ");
    }
    Console.WriteLine();
}
```

Output:
```
*
* *
* * *
* * * *
* * * * *
```

**Nested loops পরের lesson এ details শিখবো!**

---

## Common Mistakes

### ❌ Mistake 1: Semicolon এর বদলে comma

```csharp
for (int i = 1, i <= 5, i++)  // ❌ comma!
for (int i = 1; i <= 5; i++)  // ✅ semicolon!
```

### ❌ Mistake 2: Off-by-one Error

```csharp
for (int i = 0; i < 5; i++)   // 0, 1, 2, 3, 4 → 5 বার
for (int i = 1; i <= 5; i++)  // 1, 2, 3, 4, 5 → 5 বার
for (int i = 1; i < 5; i++)   // 1, 2, 3, 4 → 4 বার (5 নেই!)
```

### ❌ Mistake 3: for এর পর semicolon

```csharp
for (int i = 1; i <= 5; i++);  // ❌ body খালি!
{
    Console.WriteLine(i);  // এটা loop এর বাইরে, একবার চলবে
}
```

### ❌ Mistake 4: Wrong update direction

```csharp
for (int i = 1; i <= 5; i--)  // ❌ i কমাচ্ছে! Infinite loop!
for (int i = 5; i >= 1; i--)  // ✅
```

---

## Summary

```csharp
for (initialization; condition; update)
{
    // কাজ করো
}
```

**for loop = কতবার চলবে জানলে best!**

**মনে রাখো:**
- ৩টা part **semicolon দিয়ে** আলাদা
- `i++` = 1 বাড়াও, `i--` = 1 কমাও, `i += 2` = 2 বাড়াও
- **কতবার জানি → for**
- **জানি না → while**
- for এর পর semicolon দিলে body খালি হয়ে যায়
- Off-by-one error মানে 1 কম/বেশি হওয়া — সাবধান!

---

**পরের Lesson:** do-while Loop — অন্তত একবার চলবেই!

---

*CPS Academy - Learn. Code. Grow.*
