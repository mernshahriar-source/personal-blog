---
title: "Lesson 5.5: do-while Loop — অন্তত একবার চলবেই!"
date: "2026-05-11"
excerpt: "do-while এর usage, while vs do-while comparison, Menu System, Input Validation এবং Play Again Pattern"
categories:
  - C# Course Scripts
tags:
  - csharp
  - do-while
  - loops
draft: false
---

# Lesson 5.5: do-while Loop — অন্তত একবার চলবেই!

> **এই Lesson এ শিখবে:** while এর একটা সমস্যা, do-while দিয়ে বউ এর example, Syntax ও Flowchart, Part by part explanation, while vs do-while comparison (condition শুরুতে true/false দুটো case), Menu system, Input validation, Play again pattern, এবং Common Mistakes।

---

## এতক্ষণ কী শিখলাম?

- **while loop** — শর্ত check করে কাজ করে
- **for loop** — কতবার চলবে জানলে use করি

এবার শেষ loop — **do-while loop**!

এটা while এর মতোই, শুধু একটু **উল্টা!**

---

## বউ এর কাছে আবার ফিরে যাই! 😍

এতদিনে বউ অনেক খুশি তোমার উপর। কিন্তু আজকে বউ একটু moody।

বউ বললো — "I love you বলো। আমি যতক্ষণ না থামতে বলছি, ততক্ষণ বলতে থাকো।"

তুমি ভাবলে — ঠিক আছে, while loop দিয়ে করবো...

কিন্তু wait! 🤔

একটা জিনিস খেয়াল করো:

**অন্তত একবার তো "I love you" বলতেই হবে, তাই না?**

আগে বলবে, তারপর জিজ্ঞেস করবে "আরো বলবো?"

এই situation এ **do-while loop** কাজে আসে!

---

## while এর একটা বিশেষ Case দেখি

while loop **আগে** condition check করে, তারপর কাজ করে।

তাই যদি শুরুতেই condition false হয়, **একবারও কাজ হবে না!**

```csharp
int count = 10;

while (count < 5)  // 10 < 5? না! শুরুতেই false!
{
    Console.WriteLine("Hello");
    count++;
}

Console.WriteLine("Loop শেষ!");
```

Output:
```
Loop শেষ!
```

"Hello" একবারও print হলো না!

---

## কিন্তু মাঝে মাঝে অন্তত একবার চালাতে চাই!

কিছু situation আছে যেখানে অন্তত একবার কাজ হওয়া দরকার:

### 🍽️ Restaurant Menu:
আগে menu দেখাও, তারপর জিজ্ঞেস করো "আর কিছু লাগবে?"

### 🎮 Game:
আগে game খেলাও, তারপর জিজ্ঞেস করো "Play again?"

### 📝 Input নেওয়া:
আগে input নাও, তারপর check করো valid কিনা

### 💕 বউ এর I love you:
আগে বলো, তারপর জিজ্ঞেস করো "আরো বলবো?"

এই সব case এ **do-while loop** দরকার!

---

## do-while Loop কী?

do-while loop এ:

1. **আগে** কাজ করো
2. **তারপর** condition check করো
3. true হলে আবার করো, false হলে থামো

মানে **অন্তত একবার কাজ হবেই!**

---

## while vs do-while — মূল পার্থক্য

**while:** আগে check, তারপর কাজ
```
Check → কাজ → Check → কাজ → Check → থামো
```

**do-while:** আগে কাজ, তারপর check
```
কাজ → Check → কাজ → Check → থামো
```

---

## বউ এর Example দিয়ে বুঝি

বউ বললো — "I love you বলো, আমি থামতে বলা পর্যন্ত।"

### Brain কীভাবে চিন্তা করবে:

```
Step 1: "I love you" বলো (আগে কাজ!)

Step 2: বউ কে জিজ্ঞেস করো "আরো বলবো?"

Step 3: বউ বললো "হ্যাঁ"
        → আবার "I love you" বলো
        → আবার জিজ্ঞেস করো

Step 4: বউ বললো "হ্যাঁ"
        → আবার "I love you" বলো
        → আবার জিজ্ঞেস করো

Step 5: বউ বললো "না"
        → থামো!
```

দেখো, **প্রথমে কাজ করলো**, তারপর জিজ্ঞেস করলো।

---

## এবার Code এ লিখি

```csharp
string answer;

do
{
    Console.WriteLine("I love you ❤️");

    Console.Write("আরো বলবো? (y/n): ");
    answer = Console.ReadLine();

} while (answer == "y");

Console.WriteLine("\nবউ খুশি! 😍");
```

**Example Run:**
```
I love you ❤️
আরো বলবো? (y/n): y
I love you ❤️
আরো বলবো? (y/n): y
I love you ❤️
আরো বলবো? (y/n): n

বউ খুশি! 😍
```

---

## Code টা বুঝি — Part by Part

### Part 1: do keyword

```csharp
do
{
```

"do" মানে "করো"। এখান থেকে কাজ শুরু।

### Part 2: Loop Body

```csharp
    Console.WriteLine("I love you ❤️");

    Console.Write("আরো বলবো? (y/n): ");
    answer = Console.ReadLine();
```

এই code **আগে চলবে**, তারপর condition check হবে।

### Part 3: while (condition);

```csharp
} while (answer == "y");
```

কাজ শেষে condition check করো। true হলে আবার করো।

**⚠️ Important:** শেষে **সেমিকোলন (`;`)** দিতে হবে!

while loop এ দিতে হয় না, কিন্তু do-while এ দিতে হয়।

---

## do-while এর Syntax

```csharp
do
{
    // এই code আগে চলবে
    // অন্তত একবার চলবেই!

} while (condition);  // শেষে সেমিকোলন!
```

### Flowchart:

```
        ┌──────────────────┐
        │                  │
        │    Loop Body     │◄─────────┐
        │    (কাজ করো)     │          │
        │                  │          │
        └────────┬─────────┘          │
                 ↓                    │
        ┌──────────────────┐          │
        │    Condition     │          │
        │   (শর্ত check)    │          │
        └────────┬─────────┘          │
                 ↓                    │
           ┌─────┴─────┐              │
           │           │              │
       true│       false│              │
           │           ↓              │
           │    ┌──────────┐          │
           │    │   EXIT   │          │
           │    │  Loop    │          │
           │    │  শেষ!    │          │
           │    └──────────┘          │
           │                          │
           └──────────────────────────┘
```

দেখো, **আগে কাজ হচ্ছে**, তারপর condition check হচ্ছে।

---

## Step by Step Execution দেখি

```csharp
int count = 1;

do
{
    Console.WriteLine(count);
    count++;

} while (count <= 3);
```

### 🔄 Round 1:
```
Body চলবে (আগে!):
    Print: 1
    count = 2

Condition: 2 <= 3? হ্যাঁ! ✅
আবার চলবে!
```

### 🔄 Round 2:
```
Body চলবে:
    Print: 2
    count = 3

Condition: 3 <= 3? হ্যাঁ! ✅
আবার চলবে!
```

### 🔄 Round 3:
```
Body চলবে:
    Print: 3
    count = 4

Condition: 4 <= 3? না! ❌
Loop শেষ!
```

### Table আকারে:

| Round | count (শুরুতে) | Output | count (পরে) | Condition | Result |
|-------|---------------|--------|-------------|-----------|--------|
| 1 | 1 | 1 | 2 | 2 &lt;= 3? | ✅ চলবে |
| 2 | 2 | 2 | 3 | 3 &lt;= 3? | ✅ চলবে |
| 3 | 3 | 3 | 4 | 4 &lt;= 3? | ❌ থামো |

Output: `1 2 3`

---

## while vs do-while — পাশাপাশি

### Case 1: Condition শুরুতে TRUE হলে

দুইটাই same কাজ করবে!

**while:**
```csharp
int i = 1;
while (i <= 3)
{
    Console.WriteLine(i);
    i++;
}
```

**do-while:**
```csharp
int i = 1;
do
{
    Console.WriteLine(i);
    i++;
} while (i <= 3);
```

**Output দুইটাই:** `1 2 3`

---

### Case 2: Condition শুরুতে FALSE হলে

**এখানেই আসল পার্থক্য!**

**while:**
```csharp
int i = 10;

while (i <= 3)  // 10 <= 3? না! শুরুতেই false!
{
    Console.WriteLine(i);
    i++;
}

Console.WriteLine("শেষ!");
```

Output:
```
শেষ!
```

**কিছুই print হলো না!**

**do-while:**
```csharp
int i = 10;

do
{
    Console.WriteLine(i);
    i++;
} while (i <= 3);  // 11 <= 3? না!

Console.WriteLine("শেষ!");
```

Output:
```
10
শেষ!
```

**10 print হলো!** কারণ do-while এ **আগে কাজ, তারপর check**!

---

## Real Example 1: Restaurant Menu System 🍽️

অন্তত একবার menu দেখাতেই হবে:

```csharp
int choice;

do
{
    Console.WriteLine("\n╔═══════════════════════════════╗");
    Console.WriteLine("║       🍕 FOOD MENU            ║");
    Console.WriteLine("╠═══════════════════════════════╣");
    Console.WriteLine("║  1. Pizza      - 350 tk       ║");
    Console.WriteLine("║  2. Burger     - 180 tk       ║");
    Console.WriteLine("║  3. Pasta      - 250 tk       ║");
    Console.WriteLine("║  4. Exit                      ║");
    Console.WriteLine("╚═══════════════════════════════╝");

    Console.Write("\nSelect option: ");
    choice = int.Parse(Console.ReadLine());

    switch (choice)
    {
        case 1:
            Console.WriteLine("🍕 Pizza ordered!");
            break;
        case 2:
            Console.WriteLine("🍔 Burger ordered!");
            break;
        case 3:
            Console.WriteLine("🍝 Pasta ordered!");
            break;
        case 4:
            Console.WriteLine("👋 Thank you! Visit again!");
            break;
        default:
            Console.WriteLine("❌ Invalid option!");
            break;
    }

} while (choice != 4);
```

Menu **অন্তত একবার দেখাবেই**। User 4 দিলে বের হবে।

---

## Real Example 2: Input Validation ✅

User কে valid input না দেওয়া পর্যন্ত আবার চাইবো:

```csharp
int number;

do
{
    Console.Write("Enter a number (1-10): ");
    number = int.Parse(Console.ReadLine());

    if (number < 1 || number > 10)
    {
        Console.WriteLine("❌ Invalid! Must be between 1 and 10.\n");
    }

} while (number < 1 || number > 10);

Console.WriteLine($"\n✅ You entered: {number}");
```

**Example Run:**
```
Enter a number (1-10): 15
❌ Invalid! Must be between 1 and 10.

Enter a number (1-10): -3
❌ Invalid! Must be between 1 and 10.

Enter a number (1-10): 7

✅ You entered: 7
```

**প্রথমে input নিচ্ছে, তারপর check করছে valid কিনা।**

---

## Real Example 3: Play Again? 🎮

Game শেষে জিজ্ঞেস করবে আবার খেলবে কিনা:

```csharp
Random random = new Random();
string playAgain;

do
{
    int secret = random.Next(1, 11);
    int guess = 0;
    int attempts = 0;

    Console.WriteLine("\n🎮 GUESS THE NUMBER (1-10)!\n");

    while (guess != secret)
    {
        Console.Write("Your guess: ");
        guess = int.Parse(Console.ReadLine());
        attempts++;

        if (guess < secret)
            Console.WriteLine("📈 Too low!\n");
        else if (guess > secret)
            Console.WriteLine("📉 Too high!\n");
    }

    Console.WriteLine($"🎉 Correct! You got it in {attempts} attempts!\n");

    Console.Write("Play again? (y/n): ");
    playAgain = Console.ReadLine().ToLower();

} while (playAgain == "y");

Console.WriteLine("\n👋 Thanks for playing!");
```

---

## ৩টা Loop — Final Comparison

| | for | while | do-while |
|---|-----|-------|----------|
| **কখন use** | কতবার জানি | কতবার জানি না | অন্তত একবার চলবেই |
| **Check** | শুরুতে | শুরুতে | শেষে |
| **Minimum run** | 0 বার | 0 বার | **1 বার** |
| **Semicolon** | নেই | নেই | **শেষে `;`** |
| **Best for** | Counter, table, array | Password retry, game | Menu, input validation |

### সহজ Rule:

```
🎯 কতবার জানি → for
❓ জানি না, শর্ত দেখে → while
1️⃣ অন্তত একবার → do-while
```

---

## Common Mistakes

### ❌ Mistake 1: Semicolon ভুলে যাওয়া

```csharp
do
{
    Console.WriteLine("Hello");
} while (condition)   // ❌ semicolon নেই! Compile error!

} while (condition);  // ✅
```

### ❌ Mistake 2: while এর জায়গায় do-while use করা

```csharp
// "কমপক্ষে 1 বার দরকার নেই"
int i = 10;
do
{
    Console.WriteLine(i);
    i++;
} while (i <= 3);  // 10 print হলো — চাইনি তো!

// while use করা উচিত ছিল
while (i <= 3) { ... }
```

**do-while শুধু তখনই use করো যখন অন্তত ১ বার run হওয়া দরকার।**

### ❌ Mistake 3: Variable declare ভুলে যাওয়া

```csharp
do
{
    string name = Console.ReadLine();  // ❌ এটা do এর ভিতরে scope এ
} while (name != "exit");  // Error! name এখানে দেখা যাচ্ছে না

// ✅ do এর বাইরে declare
string name;
do
{
    name = Console.ReadLine();
} while (name != "exit");
```

---

## Summary

```csharp
do
{
    // অন্তত একবার চলবে!
} while (condition);  // ; ভুলো না!
```

**do-while loop = আগে কাজ, তারপর check।**

**মনে রাখো:**
- **অন্তত ১ বার চলবেই** — condition শুরুতে false হলেও
- শেষে **`;` semicolon** দিতে হবে
- Menu, Input validation, Play again — do-while perfect!
- Variable do এর আগে declare করো (scope issue)

**এখন তুমি ৩টা loop ই জানো!** 🎉
- **for** — কতবার জানি
- **while** — জানি না, শর্ত দেখে
- **do-while** — অন্তত একবার

---

**পরের Lesson:** Nested Loops — Loop এর ভিতরে loop, Pattern printing!

---

*CPS Academy - Learn. Code. Grow.*
