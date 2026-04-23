---
title: "Lesson 5.2: while Loop — শর্ত True থাকলে চলতে থাকো"
date: "2026-05-08"
excerpt: "বউ এর গল্প দিয়ে while loop, Countdown, Sum, Factorial, Password Retry, Number Guessing এবং Infinite Loop এর danger"
categories:
  - C# Course Scripts
tags:
  - csharp
  - while-loop
  - loops
  - beginner
draft: false
---

# Lesson 5.2: while Loop — শর্ত True থাকলে চলতে থাকো

> **এই Lesson এ শিখবে:** বউ এর গল্প দিয়ে while loop, Brain কীভাবে চিন্তা করে (step by step), Pattern বের করা, Code এ লেখা, Part by part explanation, Syntax ও Flowchart, Countdown, Sum, Factorial, Password retry, Number guessing game, Infinite loop এর danger, এবং Common Mistakes।

---

## গল্প দিয়ে শুরু করি

ধরো তোমার বউ রাগ করেছে। 😠

বউ বললো — "I love you" **100 বার** লিখে পাঠাও, তাহলে মাফ করবো।

এখন তুমি কী করবে?

চলো দেখি তোমার brain কীভাবে এই কাজটা করবে...

---

## তোমার Brain কীভাবে চিন্তা করে?

### Step 1: গুনতি শুরু করো

প্রথমে তুমি মনে মনে ঠিক করবে — "আমি 0 বার থেকে শুরু করছি।"

```
এখন পর্যন্ত লিখেছি: 0 বার
```

এটাকে programming এ বলে **Initialization** — মানে শুরুর অবস্থা।

---

### Step 2: Check করো — 100 বার হয়েছে কি?

এখন তুমি নিজেকে জিজ্ঞেস করবে — "100 বার হয়ে গেছে?"

```
0 বার হয়েছে। 100 হয়েছে? না!
```

100 হয়নি, তাই এখনো কাজ বাকি।

এটাকে programming এ বলে **Condition** — মানে শর্ত check করা।

---

### Step 3: কাজ করো

যেহেতু 100 বার হয়নি, তাই তুমি একবার লিখবে:

```
"I love you" ❤️
```

---

### Step 4: গুনতি বাড়াও

লেখা হয়ে গেলো, এখন গুনতি বাড়াও:

```
এখন পর্যন্ত লিখেছি: 0 + 1 = 1 বার
```

এটাকে programming এ বলে **Update** — মানে গুনতি update করা।

---

### Step 5: আবার Check করো

```
1 বার হয়েছে। 100 হয়েছে? না!
```

এখনো বাকি!

---

### Step 6: আবার কাজ করো

```
"I love you" ❤️
```

---

### এভাবে চলতে থাকবে...

```
2 বার হয়েছে। 100? না! → লেখো → 3 বার
3 বার হয়েছে। 100? না! → লেখো → 4 বার
...
98 বার হয়েছে। 100? না! → লেখো → 99 বার
99 বার হয়েছে। 100? না! → লেখো → 100 বার
100 বার হয়েছে। 100? হ্যাঁ! ✅ → থামো!
```

**কাজ শেষ! বউ এখন খুশি! 😍**

---

## দেখো কী Pattern পেলাম!

পুরো process টা আবার দেখো:

```
1. শুরুতে count = 0 (Initialization)

2. Check করো: 100 হয়েছে কি? (Condition)

3. না হলে:
   - "I love you" লেখো (কাজ)
   - count এ 1 যোগ করো (Update)
   - আবার Step 2 এ যাও

4. হ্যাঁ হলে:
   - থামো!
```

**এটাই while Loop!**

তোমার brain যেভাবে চিন্তা করলো, while loop ও exactly সেভাবেই কাজ করে!

---

## এবার Code এ লিখি

উপরে brain যেভাবে চিন্তা করলো, সেটাই C# এ লিখবো:

**Brain যা করলো:**

```
শুরুতে count = 0
যতক্ষণ count 100 এর কম:
    "I love you" লেখো
    count এ 1 যোগ করো
```

**C# Code:**

```csharp
int count = 0;

while (count < 100)
{
    Console.WriteLine("I love you");
    count = count + 1;
}

Console.WriteLine("হয়ে গেছে জান! 100 বার বললাম! 😘");
```

Output:
```
I love you
I love you
I love you
... (100 বার!)
I love you
হয়ে গেছে জান! 100 বার বললাম! 😘
```

---

## Code টা বুঝি — Part by Part

### Part 1: Initialization (শুরুর অবস্থা)

```csharp
int count = 0;
```

**Brain:** "আমি 0 বার থেকে শুরু করছি।"

এখানে আমরা বলছি শুরুতে কতবার লেখা হয়েছে — 0 বার।

---

### Part 2: Condition (শর্ত check)

```csharp
while (count < 100)
```

**Brain:** "100 বার হয়েছে কি?"

`count < 100` মানে যতক্ষণ count 100 এর কম, ততক্ষণ loop চালাও। যখনই 100 হয়ে যাবে, condition false হয়ে যাবে, loop শেষ।

---

### Part 3: Body (কাজ)

```csharp
{
    Console.WriteLine("I love you");
    count = count + 1;
}
```

**Brain:**
1. "I love you" লেখো
2. গুনতি 1 বাড়াও

---

### Part 4: Update (গুনতি বাড়ানো)

```csharp
count = count + 1;
```

এটা না দিলে? count সবসময় 0 থাকবে, 0 &lt; 100 সবসময় true, তাই loop চিরকাল চলবে! (**Infinite loop!**)

---

## Step by Step দেখি কী হচ্ছে

ছোট example দেখি — 5 বার "Hello" লেখা:

```csharp
int count = 0;

while (count < 5)
{
    Console.WriteLine("Hello");
    count = count + 1;
}
```

### Execution table:

| Iteration | count (শুরুতে) | count &lt; 5? | কী print হলো | count (পরে) |
|-----------|----------------|------------|--------------|--------------|
| 1 | 0 | true ✅ | Hello | 1 |
| 2 | 1 | true ✅ | Hello | 2 |
| 3 | 2 | true ✅ | Hello | 3 |
| 4 | 3 | true ✅ | Hello | 4 |
| 5 | 4 | true ✅ | Hello | 5 |
| 6 | 5 | **false** ❌ | — | STOP |

Output: `Hello` × 5 বার।

---

## while Loop এর ৩টা Part — মনে রাখো!

```csharp
int count = 0;           // 1️⃣ Initialization (শুরু)

while (count < 100)      // 2️⃣ Condition (শর্ত)
{
    Console.WriteLine("I love you");
    count = count + 1;   // 3️⃣ Update (পরিবর্তন)
}
```

এই ৩টা **সবসময়** থাকতে হবে। একটাও ভুলে গেলে loop ঠিকমতো কাজ করবে না।

---

## while Loop এর Syntax

```csharp
initialization;

while (condition)
{
    // কাজ করো
    update;
}
```

### Flowchart:

```
    ┌──────────────────┐
    │  Initialization  │
    │  (শুরুর অবস্থা)    │
    └────────┬─────────┘
             ↓
    ┌──────────────────┐
    │    Condition     │◄──────────┐
    │   (শর্ত check)    │           │
    └────────┬─────────┘           │
             ↓                     │
        ┌────┴────┐                │
        │         │                │
    true│     false│                │
        ↓         ↓                │
   ┌─────────┐  ┌──────┐           │
   │  Body   │  │ EXIT │           │
   │ (কাজ)   │  │Loop  │           │
   └────┬────┘  │ শেষ!  │           │
        ↓      └──────┘           │
   ┌─────────┐                     │
   │ Update  │                     │
   └────┬────┘                     │
        ↓                          │
        └──────────────────────────┘
```

---

## Real Example 1: Countdown 🚀

Rocket launch এর আগে countdown হয়: 10, 9, 8... 1, Blast off!

এবার বানাই। বড় থেকে ছোট এ যেতে হবে, তাই এবার **বিয়োগ** করবো:

```csharp
Console.WriteLine("🚀 Rocket Launch Countdown!\n");

int count = 10;

while (count >= 1)
{
    Console.WriteLine(count);
    count = count - 1;
}

Console.WriteLine("\n🔥 BLAST OFF! 🚀");
```

Output:
```
🚀 Rocket Launch Countdown!

10
9
8
7
6
5
4
3
2
1

🔥 BLAST OFF! 🚀
```

### কী করলাম?

- `count = 10` দিয়ে শুরু (উপর থেকে শুরু)
- `count >= 1` যতক্ষণ 1 বা তার বেশি
- `count - 1` প্রতিবার 1 কমাচ্ছি

---

## Real Example 2: Sum of Numbers

1 থেকে 10 পর্যন্ত সব সংখ্যা যোগ:

```csharp
int sum = 0;
int i = 1;

Console.WriteLine("Calculating: 1 + 2 + 3 + ... + 10\n");

while (i <= 10)
{
    sum = sum + i;
    Console.WriteLine($"Added {i}, sum is now {sum}");
    i = i + 1;
}

Console.WriteLine($"\nTotal sum: {sum}");
```

Output:
```
Added 1, sum is now 1
Added 2, sum is now 3
Added 3, sum is now 6
Added 4, sum is now 10
Added 5, sum is now 15
Added 6, sum is now 21
Added 7, sum is now 28
Added 8, sum is now 36
Added 9, sum is now 45
Added 10, sum is now 55

Total sum: 55
```

### কী করলাম?

- `sum = 0` দিয়ে শুরু (যোগফল রাখার জন্য)
- প্রতিবার `sum = sum + i` (আগের sum এর সাথে নতুন number যোগ)
- 1+2+3+...+10 = 55 ✅

---

## Real Example 3: Factorial

Factorial মানে 1 থেকে ওই number পর্যন্ত সব গুণ করা।

5! = 5 × 4 × 3 × 2 × 1 = 120

```csharp
Console.Write("Enter a number: ");
int n = int.Parse(Console.ReadLine());

int factorial = 1;
int i = 1;

while (i <= n)
{
    factorial = factorial * i;
    i = i + 1;
}

Console.WriteLine($"{n}! = {factorial}");
```

User 5 দিলে:
```
5! = 120
```

### Step by Step (n = 5):

| i | factorial (আগে) | factorial × i | factorial (পরে) |
|---|-----------------|---------------|-----------------|
| 1 | 1 | 1 × 1 | 1 |
| 2 | 1 | 1 × 2 | 2 |
| 3 | 2 | 2 × 3 | 6 |
| 4 | 6 | 6 × 4 | 24 |
| 5 | 24 | 24 × 5 | 120 |

---

## Real Example 4: Password Retry System 🔐

এটা সত্যিকারের use case। User password দেবে, ভুল হলে আবার চাইবে। **3 বার chance** দেবো:

```csharp
string correctPassword = "abc123";
int attempts = 0;
int maxAttempts = 3;
bool loggedIn = false;

while (attempts < maxAttempts && !loggedIn)
{
    attempts = attempts + 1;
    Console.Write($"Attempt {attempts}/{maxAttempts} — Enter password: ");
    string input = Console.ReadLine();

    if (input == correctPassword)
    {
        loggedIn = true;
        Console.WriteLine("✅ Login successful!");
    }
    else
    {
        int remaining = maxAttempts - attempts;
        if (remaining > 0)
            Console.WriteLine($"❌ Wrong password! {remaining} attempts left.\n");
        else
            Console.WriteLine("❌ Wrong password!");
    }
}

if (!loggedIn)
{
    Console.WriteLine("\n🚫 Account locked! Too many failed attempts.");
}
```

### কী হচ্ছে?

- 2 টা condition একসাথে: `attempts < maxAttempts && !loggedIn`
  - attempts কম আছে **এবং** এখনো login হয়নি → চলো
- login হয়ে গেলে `loggedIn = true` → loop শেষ
- 3 attempt শেষ হলেও loop শেষ

---

## Real Example 5: Number Guessing Game 🎮

Computer 1-10 এর মধ্যে একটা number ভাববে, user guess করবে:

```csharp
int secret = 7;
int guess = 0;
int attempts = 0;

Console.WriteLine("🎮 Guess the number between 1 and 10!\n");

while (guess != secret)
{
    attempts = attempts + 1;
    Console.Write($"Attempt {attempts} — Your guess: ");
    guess = int.Parse(Console.ReadLine());

    if (guess < secret)
        Console.WriteLine("📈 Too low! Try higher.\n");
    else if (guess > secret)
        Console.WriteLine("📉 Too high! Try lower.\n");
}

Console.WriteLine($"\n🎉 Correct! You got it in {attempts} attempts!");
```

### কী হচ্ছে?

- `guess = 0` দিয়ে শুরু (secret 7 এর সাথে match করবে না)
- `guess != secret` — যতক্ষণ guess ঠিক না, চলতে থাকো
- ঠিক হলে loop শেষ, final message

---

## Infinite Loop — সাবধান! ⚠️

Infinite Loop মানে এমন loop যেটা **কখনো শেষ হয় না**। চিরকাল চলতেই থাকে!

### কখন হয়?

### ❌ 1. Update ভুলে গেলে:

```csharp
int i = 1;

while (i <= 5)
{
    Console.WriteLine(i);
    // i = i + 1; ভুলে গেছি!
}
```

i সবসময় 1 থাকবে → 1 &lt;= 5 সবসময় true → চিরকাল 1 print হবে!

### ❌ 2. Condition কখনো false না হলে:

```csharp
int i = 1;

while (i > 0)  // i সবসময় positive
{
    Console.WriteLine(i);
    i = i + 1;  // বাড়ছে, সবসময় > 0
}
```

### ✅ 3. ইচ্ছাকৃত Infinite Loop:

কখনো আমরা চাই loop চলতেই থাকুক। তখন `while (true)`:

```csharp
while (true)
{
    Console.WriteLine("This runs forever!");
}
```

এটা থামাতে `break` লাগে (পরের lesson এ শিখবো)।

### Infinite Loop হলে কী করবে?

**`Ctrl + C`** চাপলে program বন্ধ হয়ে যাবে।

---

## Common Mistakes

### ❌ Mistake 1: Update ভুলে যাওয়া

```csharp
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    // i++ নেই! Infinite loop!
}
```

### ❌ Mistake 2: while এর পর semicolon

```csharp
int i = 1;
while (i <= 5);  // ❌ semicolon! Empty infinite loop!
{
    Console.WriteLine(i);
    i++;
}
```

**`while (condition);` মানে loop এর body খালি, infinite loop!**

### ❌ Mistake 3: Off-by-one Error

```csharp
int i = 1;
while (i < 5)   // 1, 2, 3, 4 (5 আসবে না!)
while (i <= 5)  // 1, 2, 3, 4, 5 ✅
```

এই type এর ভুলকে বলে **"off-by-one error"** — programming এর সবচেয়ে common bug!

### ❌ Mistake 4: Wrong update direction

```csharp
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    i = i - 1;  // ❌ কমাচ্ছে! i 0, -1, -2... infinite!
}
```

---

## Summary

```csharp
initialization;           // 1️⃣ শুরু
while (condition)         // 2️⃣ শর্ত
{
    // body
    update;               // 3️⃣ পরিবর্তন
}
```

**while loop = যতক্ষণ শর্ত true, ততক্ষণ চালাও।**

**মনে রাখো:**
- **৩টা part:** Initialize + Condition + Update
- **Update ভুলো না** — infinite loop হবে!
- **while এর পর `;` দিও না**
- **কতবার চলবে আগে জানি না** → while best
- Condition **false** হলে loop শেষ
- `while (true)` + `break` = ইচ্ছাকৃত infinite loop

---

**পরের Lesson:** break ও continue — Loop থেকে বের হওয়া আর skip করা!

---

*CPS Academy - Learn. Code. Grow.*
