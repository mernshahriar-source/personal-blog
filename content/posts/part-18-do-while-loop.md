---
title: 'Part 18: do-while Loop'
date: '2026-01-20'
excerpt: 'Part 18: do-while Loop - while এর উল্টা version'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - loops
  - tutorial
draft: false
---

# Part 18: do-while Loop

এতক্ষণ আমরা while আর for loop শিখলাম। এবার শেষ loop - **do-while loop**।

এটা while এর মতোই, শুধু একটু উল্টা!

---

## বউ এর কাছে আবার ফিরে যাই! 😍

এতদিনে বউ অনেক খুশি তোমার উপর। কিন্তু আজকে বউ একটু moody।

বউ বললো - "I love you বলো। আমি যতক্ষণ না থামতে বলছি, ততক্ষণ বলতে থাকো।"

তুমি ভাবলে - ঠিক আছে, while loop দিয়ে করবো...

কিন্তু wait! 🤔

একটা জিনিস খেয়াল করো:

**অন্তত একবার তো "I love you" বলতেই হবে, তাই না?**

আগে বলবে, তারপর জিজ্ঞেস করবে "আরো বলবো?"

এই situation এ do-while loop কাজে আসে!

---

## while এর একটা বিশেষ Case দেখি

while loop আগে condition check করে, তারপর কাজ করে।

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

"Hello" একবারও print হলো না! কারণ condition শুরুতেই false ছিল।

---

## কিন্তু মাঝে মাঝে অন্তত একবার চালাতে চাই!

কিছু situation আছে যেখানে অন্তত একবার কাজ হওয়া দরকার:

**🍽️ Restaurant Menu:**
> প্রথমে menu দেখাও, তারপর জিজ্ঞেস করো "আর কিছু লাগবে?"

**🎮 Game:**
> প্রথমে game খেলাও, তারপর জিজ্ঞেস করো "Play again?"

**📝 Input নেওয়া:**
> প্রথমে input নাও, তারপর check করো valid কিনা

**💕 বউ এর I love you:**
> প্রথমে বলো, তারপর জিজ্ঞেস করো "আরো বলবো?"

এই সব case এ **do-while loop** দরকার!

---

## do-while Loop কী?

do-while loop এ:

1. **আগে** কাজ করো
2. **তারপর** condition check করো
3. true হলে আবার করো, false হলে থামো

মানে **অন্তত একবার কাজ হবেই!**

---

## while vs do-while - মূল পার্থক্য

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

বউ বললো - "I love you বলো, আমি থামতে বলা পর্যন্ত।"

### Brain কীভাবে চিন্তা করবে:

```
Step 1: "I love you" বলো (আগে কাজ!)

Step 2: বউ কে জিজ্ঞেস করো "আরো বলবো?"

Step 3: বউ বললো "হ্যাঁ"
        → আবার "I love you" বলো
        → আবার জিজ্ঞেস করো "আরো বলবো?"

Step 4: বউ বললো "হ্যাঁ"
        → আবার "I love you" বলো
        → আবার জিজ্ঞেস করো "আরো বলবো?"

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
আরো বলবো? (y/n): y
I love you ❤️
আরো বলবো? (y/n): n

বউ খুশি! 😍
```

---

## Code টা বুঝি - Part by Part

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

**⚠️ Important:** শেষে **সেমিকোলন (;)** দিতে হবে! while loop এ দিতে হয় না, কিন্তু do-while এ দিতে হয়।

---

## do-while এর Syntax

```csharp
do
{
    // এই code আগে চলবে
    // অন্তত একবার চলবেই!
    
} while (condition);  // শেষে সেমিকোলন!
```

**Flowchart:**

```
        ┌──────────────────┐
        │                  │
        │    Loop Body     │◄─────────┐
        │    (কাজ করো)     │          │
        │                  │          │
        └────────┬─────────┘          │
                 │                    │
                 ▼                    │
        ┌──────────────────┐          │
        │    Condition     │          │
        │   (শর্ত check)    │          │
        └────────┬─────────┘          │
                 │                    │
           ┌─────┴─────┐              │
           │           │              │
       true│       false│              │
           │           │              │
           │           ▼              │
           │    ┌──────────┐          │
           │    │   EXIT   │          │
           │    │  Loop    │          │
           │    │  শেষ     │          │
           │    └──────────┘          │
           │                          │
           └──────────────────────────┘
```

দেখো, **আগে কাজ হচ্ছে**, তারপর condition check হচ্ছে।

---

## Step by Step Execution দেখি

একটা simple example:

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
    Update: count = 2

Condition check: 2 <= 3? হ্যাঁ! ✅
আবার চলবে!
```

### 🔄 Round 2:
```
Body চলবে:
    Print: 2
    Update: count = 3

Condition check: 3 <= 3? হ্যাঁ! ✅
আবার চলবে!
```

### 🔄 Round 3:
```
Body চলবে:
    Print: 3
    Update: count = 4

Condition check: 4 <= 3? না! ❌
Loop শেষ!
```

### Table আকারে:

| Round | count (শুরুতে) | Output | count (Update পরে) | Condition | Result |
|-------|---------------|--------|-------------------|-----------|--------|
| 1 | 1 | 1 | 2 | 2 <= 3? | ✅ চলবে |
| 2 | 2 | 2 | 3 | 3 <= 3? | ✅ চলবে |
| 3 | 3 | 3 | 4 | 4 <= 3? | ❌ থামো |

Output:
```
1
2
3
```

---

## while vs do-while - পাশাপাশি দেখি

### যখন condition শুরুতে true:

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

**Output দুইটাই same:**
```
1
2
3
```

---

### যখন condition শুরুতে false:

এখানেই পার্থক্য!

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

**Output:**
```
শেষ!
```

কিছুই print হলো না!

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

**Output:**
```
10
শেষ!
```

**10 print হলো!** কারণ do-while এ আগে কাজ হয়, তারপর check হয়।

---

## Real Example 1: Menu System

Restaurant এর menu system। অন্তত একবার menu দেখাতেই হবে:

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

**Example Run:**
```
╔═══════════════════════════════╗
║       🍕 FOOD MENU            ║
╠═══════════════════════════════╣
║  1. Pizza      - 350 tk       ║
║  2. Burger     - 180 tk       ║
║  3. Pasta      - 250 tk       ║
║  4. Exit                      ║
╚═══════════════════════════════╝

Select option: 1
🍕 Pizza ordered!

╔═══════════════════════════════╗
║       🍕 FOOD MENU            ║
... (আবার menu)

Select option: 2
🍔 Burger ordered!

... (আবার menu)

Select option: 4
👋 Thank you! Visit again!
```

Menu অন্তত একবার দেখাবেই!

---

## Real Example 2: Input Validation

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

**Example Run:**
```
Enter a number (1-10): 15
❌ Invalid! Must be between 1 and 10.

Enter a number (1-10): -3
❌ Invalid! Must be between 1 and 10.

Enter a number (1-10): 7

✅ You entered: 7
```

প্রথমেই input নিচ্ছে, তারপর check করছে valid কিনা।

---

## Real Example 3: Play Again?

Game শেষে জিজ্ঞেস করবো আবার খেলবে কিনা:

```csharp
Random random = new Random();
string playAgain;

do
{
    // Game logic
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
        {
            Console.WriteLine("📈 Too low!\n");
        }
        else if (guess > secretNumber)
        {
            Console.WriteLine("📉 Too high!\n");
        }
        
    } while (guess != secretNumber);
    
    Console.WriteLine($"🎉 Correct! You got it in {attempts} attempts!\n");
    
    // Play again?
    Console.Write("Play again? (y/n): ");
    playAgain = Console.ReadLine().ToLower();
    
} while (playAgain == "y");

Console.WriteLine("\n👋 Thanks for playing! Goodbye!");
```

**Example Run:**
```
🎮 GUESS THE NUMBER (1-10)!

Your guess: 5
📈 Too low!

Your guess: 8
📉 Too high!

Your guess: 7
🎉 Correct! You got it in 3 attempts!

Play again? (y/n): y

🎮 GUESS THE NUMBER (1-10)!

Your guess: 3
🎉 Correct! You got it in 1 attempts!

Play again? (y/n): n

👋 Thanks for playing! Goodbye!
```

Game অন্তত একবার খেলাবেই!

---

## তিন Loop এর Summary

এখন আমরা তিনটা loop ই শিখে ফেললাম। কোনটা কখন use করবো?

| Loop | কখন use করবো | Key Point |
|------|--------------|-----------|
| **for** | কতবার চলবে জানি | "5 বার করো", "100 বার করো" |
| **while** | কতবার জানি না, আগে check করতে চাই | "যতক্ষণ password ভুল" |
| **do-while** | অন্তত একবার চলতেই হবে | "Menu দেখাও", "Input নাও" |

### Quick Decision:

```
কতবার চলবে জানো?
    ├── হ্যাঁ → for loop
    │
    └── না → অন্তত একবার চলা কি mandatory?
                ├── হ্যাঁ → do-while loop
                │
                └── না → while loop
```

---

## Common Mistakes

### Mistake 1: সেমিকোলন ভুলে যাওয়া

```csharp
// ❌ Wrong - সেমিকোলন নেই
do
{
    Console.WriteLine("Hello");
} while (condition)

// ✅ Correct - সেমিকোলন আছে
do
{
    Console.WriteLine("Hello");
} while (condition);
```

এটা সবচেয়ে common mistake! do-while এ শেষে সেমিকোলন দিতেই হবে!

### Mistake 2: while এর জায়গায় do-while

```csharp
// ❌ যদি শুরুতেই চলা উচিত না হয়, do-while ভুল হবে
int age = 25;

do
{
    Console.WriteLine("You are a minor!");  // এটা চলবে! ভুল!
} while (age < 18);

// ✅ Correct - while use করো
int age = 25;

while (age < 18)
{
    Console.WriteLine("You are a minor!");  // এটা চলবে না, correct!
}
```

### Mistake 3: Infinite Loop

```csharp
// ❌ Infinite loop! answer কখনো change হচ্ছে না
string answer = "y";

do
{
    Console.WriteLine("Hello");
    // answer update করা হয়নি!
} while (answer == "y");

// ✅ Correct - answer update করো
string answer;

do
{
    Console.WriteLine("Hello");
    Console.Write("Continue? (y/n): ");
    answer = Console.ReadLine();
} while (answer == "y");
```

---

## Complete Example: Simple ATM

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
    
    Console.Write("\nSelect option: ");
    choice = int.Parse(Console.ReadLine());
    
    switch (choice)
    {
        case 1:
            Console.Write("Enter deposit amount: ");
            double deposit = double.Parse(Console.ReadLine());
            if (deposit > 0)
            {
                balance = balance + deposit;
                Console.WriteLine($"✅ Deposited {deposit} tk");
            }
            else
            {
                Console.WriteLine("❌ Invalid amount!");
            }
            break;
            
        case 2:
            Console.Write("Enter withdrawal amount: ");
            double withdraw = double.Parse(Console.ReadLine());
            if (withdraw > 0 && withdraw <= balance)
            {
                balance = balance - withdraw;
                Console.WriteLine($"✅ Withdrawn {withdraw} tk");
            }
            else if (withdraw > balance)
            {
                Console.WriteLine("❌ Insufficient balance!");
            }
            else
            {
                Console.WriteLine("❌ Invalid amount!");
            }
            break;
            
        case 3:
            Console.WriteLine($"💰 Your balance is: {balance} tk");
            break;
            
        case 4:
            Console.WriteLine("\n👋 Thank you for using our ATM!");
            break;
            
        default:
            Console.WriteLine("❌ Invalid option!");
            break;
    }
    
} while (choice != 4);
```

---

## Summary

আজকে শিখলে:

| Concept | মানে |
|---------|------|
| do-while | আগে কাজ, তারপর check |
| while | আগে check, তারপর কাজ |
| অন্তত একবার | do-while এ body অন্তত একবার চলবেই |
| সেমিকোলন | do-while এ শেষে ; দিতে হবে |

**do-while এর Structure:**
```csharp
do
{
    // কাজ করো (অন্তত একবার চলবে!)
    
} while (condition);  // সেমিকোলন!
```

**মনে রাখো:**
- do-while এ আগে কাজ, তারপর check
- অন্তত একবার চলবেই
- শেষে সেমিকোলন (;) দিতে ভুলো না!
- Menu, Input validation, Play again - এসব এ do-while ভালো

**Loop শেষ!** 🎉

তুমি এখন তিনটা loop ই জানো:
- **for** - কতবার জানি
- **while** - আগে check
- **do-while** - অন্তত একবার

---

*CPS Academy - Learn. Code. Grow.*
