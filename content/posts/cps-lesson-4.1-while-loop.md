---
title: "Lesson 4.1: Loop কী ও while Loop"
date: "2026-03-13"
excerpt: "Loop কেন দরকার, Loop এর ৩টা part (Initialization, Condition, Update), while loop এর syntax ও কাজ, infinite loop, break, continue, এবং real-world projects"
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


> **এই Lesson এ শিখবে:** Loop কেন দরকার, Loop এর ৩টা part (Initialization, Condition, Update), while loop এর syntax ও কাজ, infinite loop, break, continue, এবং real-world projects।

---

## Loop কেন দরকার?

ধরো তোমাকে বলা হলো — "I love programming" এটা 5 বার print করো:

```csharp
Console.WriteLine("I love programming");
Console.WriteLine("I love programming");
Console.WriteLine("I love programming");
Console.WriteLine("I love programming");
Console.WriteLine("I love programming");
```

5 বার? ঠিক আছে। কিন্তু **100 বার** print করতে বললে? 100 লাইন লিখবে? আর **10,000 বার** বললে?

এখানেই Loop এর দরকার:

```csharp
int count = 0;
while (count < 100)
{
    Console.WriteLine("I love programming");
    count = count + 1;
}
```

100 লাইনের বদলে মাত্র 5 লাইন! 10,000 বার করতে চাইলে শুধু `100` কে `10000` করো। এটাই Loop এর power।

---

## Real Life এ Loop

Loop শুধু programming এ না, real life এও আছে:

- 🍽️ **খাওয়া:** "যতক্ষণ পেট না ভরে — খেতে থাকো"
- 📖 **পড়া:** "যতক্ষণ exam শেষ না হয় — পড়তে থাকো"
- 🏃 **দৌড়ানো:** "10 বার মাঠ ঘুরে আসো"
- 🔔 **Alarm:** "যতক্ষণ বন্ধ না করো — বাজতে থাকো"

সবগুলোই Loop — একই কাজ বারবার, একটা শর্ত পূরণ না হওয়া পর্যন্ত।

---

## Loop এর ৩টা জিনিস

প্রতিটা Loop এ ৩টা অংশ থাকে:

| Part | মানে | Example |
|------|------|---------|
| **Initialization** | শুরু কোথা থেকে | `int i = 1;` |
| **Condition** | কতক্ষণ চলবে | `while (i <= 10)` |
| **Update** | প্রতি চক্রে কী বদলাবে | `i = i + 1;` |

**তিনটাই mandatory!** Update ভুলে গেলে loop কখনো শেষ হবে না — এটাকে বলে **Infinite Loop**।

---

## C# তে ৩ ধরনের Loop

| Loop | বৈশিষ্ট্য | কখন use করবে |
|------|-----------|---------------|
| **while** | আগে condition check, তারপর code | জানো না কতবার চলবে |
| **do-while** | আগে code চলে, তারপর condition check | অন্তত একবার চলতেই হবে |
| **for** | initialization, condition, update এক লাইনে | জানো ঠিক কতবার চলবে |

এই lesson এ আমরা **while loop** শিখবো। বাকি দুইটা পরের lessons এ।

---

## while Loop — Syntax

```csharp
initialization;

while (condition)
{
    // কাজ করো
    update;
}
```

**Flowchart:**

```
    ┌──────────────────┐
    │  Initialization  │
    └────────┬─────────┘
             ▼
    ┌──────────────────┐
    │    Condition     │◄──────────┐
    └────────┬─────────┘           │
         ┌───┴───┐                 │
      true      false              │
         │         │               │
         ▼         ▼               │
    ┌─────────┐  ┌──────┐          │
    │  Body   │  │ EXIT │          │
    │ + Update│  └──────┘          │
    └────┬────┘                    │
         └────────────────────────┘
```

`while` মানে "যতক্ষণ" — **যতক্ষণ condition true, ততক্ষণ body চলতে থাকবে।**

---

## প্রথম while Loop

1 থেকে 5 পর্যন্ত print করো:

```csharp
int i = 1;            // Initialization

while (i <= 5)        // Condition
{
    Console.WriteLine(i);
    i = i + 1;        // Update
}
```

Output:
```
1
2
3
4
5
```

### Step by Step কী হলো:

| Round | i | i <= 5? | কী হলো |
|-------|---|---------|--------|
| 1 | 1 | হ্যাঁ ✅ | print 1, i = 2 |
| 2 | 2 | হ্যাঁ ✅ | print 2, i = 3 |
| 3 | 3 | হ্যাঁ ✅ | print 3, i = 4 |
| 4 | 4 | হ্যাঁ ✅ | print 4, i = 5 |
| 5 | 5 | হ্যাঁ ✅ | print 5, i = 6 |
| 6 | 6 | না ❌ | **STOP!** |

---

## উল্টা দিক — Countdown 🚀

বড় থেকে ছোটের দিকেও যাওয়া যায়:

```csharp
int count = 10;

while (count >= 1)
{
    Console.WriteLine(count);
    count = count - 1;
}

Console.WriteLine("🚀 Blast off!");
```

Output:
```
10
9
8
...
1
🚀 Blast off!
```

পার্থক্যটা দেখো — এখানে `count - 1` করছি, বাড়ানোর বদলে কমাচ্ছি।

---

## Example: Sum of Numbers

1 থেকে 10 পর্যন্ত সব যোগ (1+2+3+...+10):

```csharp
int sum = 0;
int i = 1;

while (i <= 10)
{
    sum = sum + i;
    Console.WriteLine($"Added {i}, sum is now {sum}");
    i = i + 1;
}

Console.WriteLine($"\nTotal: {sum}");
```

Output:
```
Added 1, sum is now 1
Added 2, sum is now 3
Added 3, sum is now 6
...
Added 10, sum is now 55

Total: 55
```

---

## Example: Factorial

Factorial মানে 1 থেকে n পর্যন্ত সব গুণ। 5! = 5 × 4 × 3 × 2 × 1 = 120

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

### Step by Step (n = 5):

| i | factorial × i | result |
|---|---------------|--------|
| 1 | 1 × 1 | 1 |
| 2 | 1 × 2 | 2 |
| 3 | 2 × 3 | 6 |
| 4 | 6 × 4 | 24 |
| 5 | 24 × 5 | **120** |

---

## Example: Password Retry System 🔐

User কে 3 বার chance দেবো:

```csharp
string correctPassword = "secret123";
int attempts = 0;
int maxAttempts = 3;
bool loggedIn = false;

Console.WriteLine("🔐 Login System\n");

while (attempts < maxAttempts && !loggedIn)
{
    Console.Write("Enter password: ");
    string input = Console.ReadLine();
    attempts = attempts + 1;

    if (input == correctPassword)
    {
        loggedIn = true;
        Console.WriteLine("\n✅ Login successful!");
    }
    else
    {
        int remaining = maxAttempts - attempts;
        if (remaining > 0)
            Console.WriteLine($"❌ Wrong! {remaining} attempts left.\n");
        else
            Console.WriteLine("❌ Wrong password!");
    }
}

if (!loggedIn)
{
    Console.WriteLine("\n🚫 Account locked! Too many failed attempts.");
}
```

**Condition টা বুঝি:** `attempts < maxAttempts && !loggedIn` — দুইটা condition **একসাথে** true থাকলেই loop চলবে। password সঠিক দিলে বা 3 বার try করলে — থামবে।

---

## Example: Number Guessing Game 🎮

```csharp
Random random = new Random();
int secretNumber = random.Next(1, 101);  // 1-100 random

int guess = 0;
int attempts = 0;

Console.WriteLine("🎮 Number Guessing Game!");
Console.WriteLine("I'm thinking of a number between 1 and 100.\n");

while (guess != secretNumber)
{
    Console.Write("Your guess: ");
    guess = int.Parse(Console.ReadLine());
    attempts = attempts + 1;

    if (guess < secretNumber)
        Console.WriteLine("📈 Too low! Try higher.\n");
    else if (guess > secretNumber)
        Console.WriteLine("📉 Too high! Try lower.\n");
    else
        Console.WriteLine($"\n🎉 Correct! You got it in {attempts} attempts!");
}
```

`Random` class দিয়ে 1-100 এর মধ্যে random number নিলাম, আর যতক্ষণ guess সঠিক না হয় ততক্ষণ hint দিচ্ছি।

---

## Infinite Loop ⚠️

Infinite Loop মানে যে loop কখনো শেষ হয় না:

```csharp
// ❌ Update ভুলে গেছি — চিরকাল 1 print হবে!
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    // i = i + 1; কই?
}
```

### ইচ্ছাকৃত Infinite Loop

কখনো কখনো চাই loop চলতেই থাকুক। তখন `while (true)` লিখি, আর `break` দিয়ে বের হই:

```csharp
while (true)
{
    Console.Write("You: ");
    string input = Console.ReadLine();

    if (input.ToLower() == "exit")
    {
        Console.WriteLine("Goodbye! 👋");
        break;
    }

    Console.WriteLine($"You said: {input}\n");
}
```

**Infinite loop আটকে গেলে?** `Ctrl + C` চাপলে program বন্ধ হবে।

---

## break Statement

break মানে — **"এখনই loop থেকে বের হও!"** condition true থাকলেও break পেলে loop শেষ।

```csharp
// 1-100 print করো, কিন্তু 50 এ থামো
int i = 1;
while (i <= 100)
{
    Console.WriteLine(i);
    if (i == 50)
    {
        Console.WriteLine("Stopping at 50!");
        break;
    }
    i = i + 1;
}
```

### Negative number পেলে থামো

```csharp
int sum = 0;

Console.WriteLine("Enter numbers to add. Enter negative to stop.\n");

while (true)
{
    Console.Write("Enter number: ");
    int num = int.Parse(Console.ReadLine());

    if (num < 0)
    {
        Console.WriteLine("Negative found. Stopping!");
        break;
    }

    sum = sum + num;
    Console.WriteLine($"Sum so far: {sum}\n");
}

Console.WriteLine($"\nFinal sum: {sum}");
```

---

## continue Statement

continue মানে — **"এই round টা skip করো, পরেরটায় যাও!"**

break পুরো loop শেষ করে, কিন্তু continue শুধু বর্তমান iteration skip করে।

### শুধু জোড় সংখ্যা print করো

```csharp
int i = 0;

while (i < 10)
{
    i = i + 1;

    if (i % 2 != 0)  // বিজোড় হলে
    {
        continue;     // skip করো
    }

    Console.WriteLine(i);
}
```

Output: `2 4 6 8 10`

### Empty input skip করো

```csharp
Console.WriteLine("Enter names. Type 'done' to finish.\n");
int count = 0;

while (true)
{
    Console.Write("Name: ");
    string name = Console.ReadLine();

    if (name.ToLower() == "done") break;

    if (name == "")
    {
        Console.WriteLine("Empty name! Try again.\n");
        continue;  // empty হলে count বাড়াবো না
    }

    count = count + 1;
    Console.WriteLine($"Added: {name} (Total: {count})\n");
}

Console.WriteLine($"\nTotal names: {count}");
```

---

## break vs continue

| break | continue |
|-------|----------|
| পুরো loop থেকে বের | শুধু এই round skip |
| Loop শেষ | Loop চলতে থাকে |
| "আমি যাচ্ছি!" | "এটা বাদ, পরেরটা দেখি" |

```csharp
int i = 0;
while (i < 5)
{
    i = i + 1;
    if (i == 3)
    {
        // break;     → output: 1, 2
        // continue;  → output: 1, 2, 4, 5
    }
    Console.WriteLine(i);
}
```

---

## Complete Example: ATM System 🏧

সব কিছু মিলিয়ে — while loop, if-else, break:

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║         🏧 ATM MACHINE                ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

double balance = 10000;
bool running = true;

while (running)
{
    Console.WriteLine($"\n💰 Balance: {balance} tk\n");
    Console.WriteLine("1. Deposit");
    Console.WriteLine("2. Withdraw");
    Console.WriteLine("3. Check Balance");
    Console.WriteLine("4. Exit");
    Console.Write("\nOption: ");

    int choice = int.Parse(Console.ReadLine());

    if (choice == 1)
    {
        Console.Write("\nAmount to deposit: ");
        double amount = double.Parse(Console.ReadLine());

        if (amount > 0)
        {
            balance += amount;
            Console.WriteLine($"✅ Deposited {amount} tk!");
        }
        else
            Console.WriteLine("❌ Invalid amount!");
    }
    else if (choice == 2)
    {
        Console.Write("\nAmount to withdraw: ");
        double amount = double.Parse(Console.ReadLine());

        if (amount <= 0)
            Console.WriteLine("❌ Invalid amount!");
        else if (amount > balance)
            Console.WriteLine("❌ Insufficient balance!");
        else
        {
            balance -= amount;
            Console.WriteLine($"✅ Withdrawn {amount} tk!");
        }
    }
    else if (choice == 3)
    {
        Console.WriteLine($"\n💰 Balance: {balance} tk");
    }
    else if (choice == 4)
    {
        running = false;
        Console.WriteLine("\n👋 Thank you! Have a nice day!");
    }
    else
    {
        Console.WriteLine("\n❌ Invalid option!");
    }
}
```

---

## Complete Example: Multiplication Table 📊

```csharp
Console.Write("Enter a number: ");
int num = int.Parse(Console.ReadLine());

Console.WriteLine($"\n📋 Multiplication Table of {num}:\n");

int i = 1;
while (i <= 10)
{
    Console.WriteLine($"   {num} × {i} = {num * i}");
    i = i + 1;
}
```

Output (num = 7):
```
📋 Multiplication Table of 7:

   7 × 1 = 7
   7 × 2 = 14
   7 × 3 = 21
   ...
   7 × 10 = 70
```

---

## Common Mistakes

### Mistake 1: Update ভুলে যাওয়া

```csharp
// ❌ Infinite loop!
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    // i = i + 1; কই?
}

// ✓ Correct
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    i = i + 1;
}
```

### Mistake 2: Off-by-one Error

5 বার চলবে ভেবেছিলে, কিন্তু 4 বার বা 6 বার চলছে!

```csharp
// ❌ 4 বার (0,1,2,3)
int i = 0;
while (i < 4) { ... i++; }

// ✓ 5 বার (1,2,3,4,5)
int i = 1;
while (i <= 5) { ... i++; }
```

**Tip:** Confusion হলে table বানাও — প্রতি round এ i কত, condition true না false।

### Mistake 3: continue এর আগে update না করা

```csharp
// ❌ Infinite loop! i==5 হলে continue হবে, update হবে না
int i = 0;
while (i < 10)
{
    if (i == 5) continue;
    Console.WriteLine(i);
    i = i + 1;
}

// ✓ Correct — update আগে করো
int i = 0;
while (i < 10)
{
    i = i + 1;
    if (i == 5) continue;
    Console.WriteLine(i);
}
```

### Mistake 4: Condition এ = vs ==

```csharp
// ❌ Error! assignment, comparison না
while (i = 5)

// ✓ Correct
while (i == 5)
while (i <= 5)
```

---

## Summary

| Concept | মানে |
|---------|------|
| Loop | একই কাজ বারবার করা |
| while | যতক্ষণ condition true, ততক্ষণ চলো |
| Infinite Loop | যে loop কখনো শেষ হয় না (`while(true)`) |
| break | এখনই loop থেকে পুরোপুরি বের হও |
| continue | এই round skip করো, পরেরটায় যাও |

**while Loop এর Pattern:**

```csharp
initialization;
while (condition)
{
    // কাজ করো
    update;
}
```

**মনে রাখো:**
- আগে condition check, তারপর code চলে
- Update ভুলো না! (Infinite loop হবে)
- `break` = পুরো loop শেষ
- `continue` = শুধু এই iteration skip
- continue ব্যবহার করলে update টা continue এর **আগে** রাখো

---

**পরের Lesson:** for Loop — যখন জানো ঠিক কতবার চলবে!

---

*CPS Academy - Learn. Code. Grow.*
