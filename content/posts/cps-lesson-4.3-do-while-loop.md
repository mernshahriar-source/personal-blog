---
title: "Lesson 4.3: do-while Loop"
date: "2026-03-15"
excerpt: "do-while loop কী ও কেন দরকার, while vs do-while পার্থক্য, syntax ও flowchart, input validation, menu system, play again pattern, এবং তিন loop এর"
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


> **এই Lesson এ শিখবে:** do-while loop কী ও কেন দরকার, while vs do-while পার্থক্য, syntax ও flowchart, input validation, menu system, play again pattern, এবং তিন loop এর তুলনা।

---

## do-while কেন দরকার?

while loop **আগে condition check** করে, তারপর কাজ করে। তাই condition শুরুতেই false হলে **একবারও কাজ হয় না:**

```csharp
int count = 10;

while (count < 5)  // 10 < 5? না! শুরুতেই false!
{
    Console.WriteLine("Hello");
    count++;
}
// "Hello" একবারও print হলো না!
```

কিন্তু কিছু situation আছে যেখানে **অন্তত একবার** কাজ হওয়া দরকার:

- 🍽️ **Menu:** প্রথমে menu দেখাও, তারপর জিজ্ঞেস করো "আর কিছু?"
- 🎮 **Game:** প্রথমে খেলাও, তারপর জিজ্ঞেস করো "Play again?"
- 📝 **Input:** প্রথমে input নাও, তারপর check করো valid কিনা

এই সব case এ **do-while** দরকার!

---

## do-while কী?

do-while এ:
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

## do-while এর Syntax

```csharp
do
{
    // এই code আগে চলবে
    // অন্তত একবার চলবেই!

} while (condition);  // ⚠️ শেষে সেমিকোলন!
```

**Flowchart:**

```
    ┌──────────────────┐
    │    Loop Body     │◄──────────┐
    │    (কাজ করো)     │           │
    └────────┬─────────┘           │
             ▼                     │
    ┌──────────────────┐           │
    │    Condition     │           │
    └────────┬─────────┘           │
         ┌───┴───┐                 │
      true      false              │
         │         │               │
         └─────────┘               │
                   ▼
              ┌──────┐
              │ EXIT │
              └──────┘
```

দেখো — **আগে কাজ হচ্ছে**, তারপর condition check হচ্ছে।

**⚠️ Important:** `while (condition);` — শেষে **সেমিকোলন** দিতে হবে! while loop এ দিতে হয় না, কিন্তু do-while এ দিতে হয়।

---

## প্রথম do-while Program

```csharp
int count = 1;

do
{
    Console.WriteLine(count);
    count++;

} while (count <= 3);
```

Output:
```
1
2
3
```

### Step by Step:

| Round | count | Output | Update | Condition |
|-------|-------|--------|--------|-----------|
| 1 | 1 | 1 | count=2 | 2<=3? ✅ চলবে |
| 2 | 2 | 2 | count=3 | 3<=3? ✅ চলবে |
| 3 | 3 | 3 | count=4 | 4<=3? ❌ থামো |

---

## পার্থক্যটা কোথায়? — condition false হলে দেখো

### while: একবারও চলে না

```csharp
int i = 10;
while (i <= 3)
{
    Console.WriteLine(i);
    i++;
}
Console.WriteLine("শেষ!");
```
Output: `শেষ!` (কিছুই print হলো না!)

### do-while: অন্তত একবার চলে

```csharp
int i = 10;
do
{
    Console.WriteLine(i);
    i++;
} while (i <= 3);
Console.WriteLine("শেষ!");
```
Output:
```
10
শেষ!
```

**10 print হলো!** কারণ do-while এ আগে কাজ হয়, তারপর check।

---

## Example: Input Validation

User কে 1-10 এর মধ্যে number দিতে বলবো। ভুল দিলে আবার চাইবো:

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

Output:
```
Enter a number (1-10): 15
❌ Invalid! Must be between 1 and 10.

Enter a number (1-10): -3
❌ Invalid! Must be between 1 and 10.

Enter a number (1-10): 7

✅ You entered: 7
```

do-while perfect এখানে — প্রথমেই input নিতে হবে, তারপর check।

---

## Example: Menu System 🍕

Restaurant এর menu — অন্তত একবার দেখাতেই হবে:

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

4 না দেওয়া পর্যন্ত menu দেখাতেই থাকবে!

---

## Example: Play Again? 🎮

Game শেষে জিজ্ঞেস করবো আবার খেলবে কিনা:

```csharp
Random random = new Random();
string playAgain;

do
{
    int secretNumber = random.Next(1, 11);  // 1-10
    int guess;
    int attempts = 0;

    Console.WriteLine("\n🎮 GUESS THE NUMBER (1-10)!\n");

    do
    {
        Console.Write("Your guess: ");
        guess = int.Parse(Console.ReadLine());
        attempts++;

        if (guess < secretNumber)
            Console.WriteLine("📈 Too low!\n");
        else if (guess > secretNumber)
            Console.WriteLine("📉 Too high!\n");

    } while (guess != secretNumber);

    Console.WriteLine($"🎉 Correct! {attempts} attempts!\n");

    Console.Write("Play again? (y/n): ");
    playAgain = Console.ReadLine().ToLower();

} while (playAgain == "y");

Console.WriteLine("\n👋 Thanks for playing!");
```

দেখো — এখানে **দুইটা do-while** আছে (nested)! ভিতরেরটা guessing এর জন্য, বাইরেরটা play again এর জন্য।

---

## Complete Example: Simple ATM 🏧

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║           🏧 SIMPLE ATM               ║");
Console.WriteLine("╚═══════════════════════════════════════╝");

double balance = 10000;
int choice;

do
{
    Console.WriteLine($"\n💰 Balance: {balance} tk\n");
    Console.WriteLine("1. Deposit");
    Console.WriteLine("2. Withdraw");
    Console.WriteLine("3. Check Balance");
    Console.WriteLine("4. Exit");

    Console.Write("\nOption: ");
    choice = int.Parse(Console.ReadLine());

    switch (choice)
    {
        case 1:
            Console.Write("Deposit amount: ");
            double deposit = double.Parse(Console.ReadLine());
            if (deposit > 0)
            {
                balance += deposit;
                Console.WriteLine($"✅ Deposited {deposit} tk");
            }
            else Console.WriteLine("❌ Invalid amount!");
            break;

        case 2:
            Console.Write("Withdraw amount: ");
            double withdraw = double.Parse(Console.ReadLine());
            if (withdraw > 0 && withdraw <= balance)
            {
                balance -= withdraw;
                Console.WriteLine($"✅ Withdrawn {withdraw} tk");
            }
            else if (withdraw > balance)
                Console.WriteLine("❌ Insufficient balance!");
            else Console.WriteLine("❌ Invalid amount!");
            break;

        case 3:
            Console.WriteLine($"💰 Balance: {balance} tk");
            break;

        case 4:
            Console.WriteLine("\n👋 Thank you!");
            break;

        default:
            Console.WriteLine("❌ Invalid option!");
            break;
    }

} while (choice != 4);
```

---

## তিন Loop এর তুলনা — Final Summary

| Loop | কখন use করবে | Key Point |
|------|--------------|-----------|
| **for** | কতবার চলবে জানি | "5 বার", "100 বার" |
| **while** | কতবার জানি না, আগে check | "যতক্ষণ password ভুল" |
| **do-while** | অন্তত একবার চলতেই হবে | "Menu দেখাও", "Input নাও" |

### Quick Decision Tree:

```
কতবার চলবে জানো?
    ├── হ্যাঁ → for loop
    └── না → অন্তত একবার চলা mandatory?
                ├── হ্যাঁ → do-while loop
                └── না → while loop
```

---

## Common Mistakes

### Mistake 1: সেমিকোলন ভুলে যাওয়া

```csharp
// ❌ সেমিকোলন নেই!
do
{
    Console.WriteLine("Hello");
} while (condition)

// ✓ সেমিকোলন আছে
do
{
    Console.WriteLine("Hello");
} while (condition);
```

### Mistake 2: while এর জায়গায় do-while

```csharp
// ❌ age 25, কিন্তু "minor" print হবে একবার!
int age = 25;
do
{
    Console.WriteLine("You are a minor!");
} while (age < 18);

// ✓ while use করো — একবারও চলবে না
while (age < 18)
{
    Console.WriteLine("You are a minor!");
}
```

### Mistake 3: Update ভুলে গেলে Infinite Loop

```csharp
// ❌ answer কখনো change হচ্ছে না!
string answer = "y";
do
{
    Console.WriteLine("Hello");
} while (answer == "y");

// ✓ answer update করো
string answer;
do
{
    Console.WriteLine("Hello");
    Console.Write("Continue? (y/n): ");
    answer = Console.ReadLine();
} while (answer == "y");
```

---

## Summary

| Concept | মানে |
|---------|------|
| do-while | আগে কাজ, তারপর condition check |
| while | আগে check, তারপর কাজ |
| অন্তত একবার | do-while এ body অন্তত একবার চলবেই |
| সেমিকোলন | `} while (condition);` — শেষে `;` দিতে হবে! |

**do-while এর Structure:**
```csharp
do
{
    // কাজ করো (অন্তত একবার!)

} while (condition);  // সেমিকোলন!
```

**মনে রাখো:**
- আগে কাজ, তারপর check
- অন্তত একবার চলবেই
- শেষে সেমিকোলন ভুলো না!
- Menu, Input validation, Play again → **do-while**

---

**পরের Lesson:** Nested Loops — loop এর ভিতর loop, pattern printing!

---

*CPS Academy - Learn. Code. Grow.*
