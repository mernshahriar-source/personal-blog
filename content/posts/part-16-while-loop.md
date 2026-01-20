---
title: 'Part 16: while Loop'
date: '2026-01-20'
excerpt: 'Part 16: while Loop - প্রথম loop শিখুন C# এ'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - loops
  - tutorial
draft: true
---

# Part 16: while Loop

আগের part এ আমরা জানলাম Loop কী আর কেন দরকার। এবার আমরা প্রথম Loop শিখবো - **while Loop**।

---

## গল্প দিয়ে শুরু করি

ধরো তোমার বউ রাগ করেছে। 😠

বউ বললো - "I love you" **100 বার** লিখে পাঠাও, তাহলে মাফ করবো।

এখন তুমি কী করবে? 

চলো দেখি তোমার brain কীভাবে এই কাজটা করবে...

---

## তোমার Brain কীভাবে চিন্তা করে?

### Step 1: গুনতি শুরু করো

প্রথমে তুমি মনে মনে ঠিক করবে - আমি 0 বার থেকে শুরু করছি।

```
এখন পর্যন্ত লিখেছি: 0 বার
```

এটাকে programming এ বলে **Initialization** - মানে শুরুর অবস্থা।

---

### Step 2: Check করো - 100 বার হয়েছে কি?

এখন তুমি নিজেকে জিজ্ঞেস করবে - "100 বার হয়ে গেছে?"

```
0 বার হয়েছে। 100 হয়েছে? না!
```

100 হয়নি, তাই এখনো কাজ বাকি আছে।

এটাকে programming এ বলে **Condition** - মানে শর্ত check করা।

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

এটাকে programming এ বলে **Update** - মানে গুনতি update করা।

---

### Step 5: আবার Check করো

এখন আবার সেই একই প্রশ্ন - "100 বার হয়ে গেছে?"

```
1 বার হয়েছে। 100 হয়েছে? না!
```

এখনো বাকি আছে!

---

### Step 6: আবার কাজ করো

```
"I love you" ❤️
```

---

### Step 7: আবার গুনতি বাড়াও

```
এখন পর্যন্ত লিখেছি: 1 + 1 = 2 বার
```

---

### Step 8: আবার Check করো

```
2 বার হয়েছে। 100 হয়েছে? না!
```

---

### এভাবে চলতে থাকবে...

```
3 বার হয়েছে। 100 হয়েছে? না! → লেখো → 4 বার
4 বার হয়েছে। 100 হয়েছে? না! → লেখো → 5 বার
5 বার হয়েছে। 100 হয়েছে? না! → লেখো → 6 বার
...
...
98 বার হয়েছে। 100 হয়েছে? না! → লেখো → 99 বার
99 বার হয়েছে। 100 হয়েছে? না! → লেখো → 100 বার
```

---

### শেষ পর্যন্ত...

```
100 বার হয়েছে। 100 হয়েছে? হ্যাঁ! ✅
```

**থামো!** কাজ শেষ! বউ এখন খুশি! 😍

---

## দেখো কী Pattern পেলাম!

উপরের পুরো process টা আবার দেখো:

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

## Code টা বুঝি - Part by Part

### Part 1: Initialization (শুরুর অবস্থা)

```csharp
int count = 0;
```

Brain: "আমি 0 বার থেকে শুরু করছি।"

এখানে আমরা বলছি শুরুতে কতবার লেখা হয়েছে - 0 বার।

---

### Part 2: Condition (শর্ত)

```csharp
while (count < 100)
```

Brain: "100 বার হয়ে গেছে কি?"

`while` মানে "যতক্ষণ"।

এই line বলছে: "যতক্ষণ count এর মান 100 এর কম, ততক্ষণ চলতে থাকো।"

---

### Part 3: Body (কাজ)

```csharp
{
    Console.WriteLine("I love you");
    count = count + 1;
}
```

এই curly braces `{ }` এর মধ্যে দুইটা কাজ হচ্ছে:

**কাজ 1:** "I love you" লেখো
```csharp
Console.WriteLine("I love you");
```

**কাজ 2 (Update):** গুনতি বাড়াও
```csharp
count = count + 1;
```

Brain: "এক বার লিখলাম, এখন count বাড়াই।"

---

## Step by Step দেখি কী হচ্ছে

প্রথম কয়েক round দেখি:

### 🔄 Round 1:
```
count = 0
Check: 0 < 100? হ্যাঁ! ✅
    → "I love you" print হলো
    → count = 0 + 1 = 1
```

### 🔄 Round 2:
```
count = 1
Check: 1 < 100? হ্যাঁ! ✅
    → "I love you" print হলো
    → count = 1 + 1 = 2
```

### 🔄 Round 3:
```
count = 2
Check: 2 < 100? হ্যাঁ! ✅
    → "I love you" print হলো
    → count = 2 + 1 = 3
```

### ... এভাবে চলতে থাকবে ...

### 🔄 Round 100:
```
count = 99
Check: 99 < 100? হ্যাঁ! ✅
    → "I love you" print হলো
    → count = 99 + 1 = 100
```

### 🔄 Round 101:
```
count = 100
Check: 100 < 100? না! ❌
    → Loop থেকে বের হয়ে গেলো!
```

---

## Table আকারে দেখি

| Round | count | Check (count < 100) | কী হলো |
|-------|-------|---------------------|--------|
| 1 | 0 | 0 < 100? হ্যাঁ ✅ | print, count = 1 |
| 2 | 1 | 1 < 100? হ্যাঁ ✅ | print, count = 2 |
| 3 | 2 | 2 < 100? হ্যাঁ ✅ | print, count = 3 |
| ... | ... | ... | ... |
| 100 | 99 | 99 < 100? হ্যাঁ ✅ | print, count = 100 |
| 101 | 100 | 100 < 100? না ❌ | **STOP!** |

---

## while Loop এর ৩টা Part - মনে রাখো!

এই তিনটা জিনিস সব while loop এ থাকে:

| Part | মানে | বউ এর Example | Code |
|------|------|---------------|------|
| **Initialization** | শুরুর অবস্থা | "0 বার থেকে শুরু" | `int count = 0;` |
| **Condition** | শর্ত check | "100 বার হয়েছে কি?" | `while (count < 100)` |
| **Update** | গুনতি বাড়ানো | "1 বার বেশি হলো" | `count = count + 1;` |

**তিনটাই mandatory!** একটাও বাদ দিলে সমস্যা হবে।

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

**Flowchart:**

```
    ┌──────────────────┐
    │  Initialization  │
    │  (শুরুর অবস্থা)    │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │    Condition     │◄──────────┐
    │   (শর্ত check)    │           │
    └────────┬─────────┘           │
             │                     │
        ┌────┴────┐                │
        │         │                │
    true│     false│                │
        │         │                │
        ▼         ▼                │
   ┌─────────┐  ┌──────┐           │
   │  Body   │  │ EXIT │           │
   │ (কাজ)   │  │Loop  │           │
   │         │  │ শেষ   │           │
   └────┬────┘  └──────┘           │
        │                          │
        ▼                          │
   ┌─────────┐                     │
   │ Update  │                     │
   │(গুনতি++)│                     │
   └────┬────┘                     │
        │                          │
        └──────────────────────────┘
```

---

## আরেকটা Example: উল্টা দিক থেকে

এতক্ষণ আমরা 0 থেকে 100 এর দিকে গেলাম (বাড়ালাম)।

এবার উল্টা করি - বড় থেকে ছোট (কমাই)।

### Rocket Launch Countdown 🚀

Rocket launch এর আগে countdown হয়: 10, 9, 8, 7... 1, Blast off!

**Brain কীভাবে ভাববে:**
```
শুরু করো 10 থেকে
যতক্ষণ 0 এর বেশি আছে:
    number টা বলো
    1 কমাও
শেষে বলো "Blast off!"
```

**Code:**
```csharp
int count = 10;

while (count > 0)
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
7
6
5
4
3
2
1
🚀 Blast off!
```

### কী আলাদা হলো?

| বউ এর Example | Rocket Example |
|---------------|----------------|
| `count = 0` (ছোট থেকে শুরু) | `count = 10` (বড় থেকে শুরু) |
| `count < 100` (ছোট আছে?) | `count > 0` (বড় আছে?) |
| `count = count + 1` (বাড়াও) | `count = count - 1` (কমাও) |

## Real Example 1: Countdown

Rocket launch এর আগে countdown হয়, তাই না? 10, 9, 8... 1, 🚀 Blast off!

এবার আমরা সেটা বানাবো। বড় সংখ্যা থেকে ছোট সংখ্যায় যেতে হবে, তাই এবার বিয়োগ করবো:

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

### কী করলাম:

- `count = 10` দিয়ে শুরু করলাম (উপর থেকে শুরু)
- `count >= 1` যতক্ষণ 1 বা তার বেশি
- `count = count - 1` প্রতিবার 1 কমাচ্ছি

---

## Real Example 2: Sum of Numbers

1 থেকে 10 পর্যন্ত সব সংখ্যা যোগ করবো (1+2+3+...+10):

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
Calculating: 1 + 2 + 3 + ... + 10

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

### কী করলাম:

- `sum = 0` দিয়ে শুরু করলাম (যোগফল রাখার জন্য)
- প্রতিবার `sum = sum + i` করছি (আগের sum এর সাথে নতুন number যোগ)
- 1+2+3+4+5+6+7+8+9+10 = 55 ✅

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
Enter a number: 5
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

## Real Example 4: Password Retry System

এবার একটা real world example দেখি। User password দেবে, ভুল হলে আবার চাইবে। 3 বার chance দেবো:

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
        {
            Console.WriteLine($"❌ Wrong password! {remaining} attempts left.\n");
        }
        else
        {
            Console.WriteLine("❌ Wrong password!");
        }
    }
}

if (!loggedIn)
{
    Console.WriteLine("\n🚫 Account locked! Too many failed attempts.");
}
```

### যদি প্রথমবারেই সঠিক password দেয়:
```
🔐 Login System

Enter password: secret123

✅ Login successful!
```

### যদি 2 বার ভুল, 3rd বার সঠিক দেয়:
```
🔐 Login System

Enter password: wrong
❌ Wrong password! 2 attempts left.

Enter password: wrong2
❌ Wrong password! 1 attempts left.

Enter password: secret123

✅ Login successful!
```

### যদি 3 বারই ভুল দেয়:
```
🔐 Login System

Enter password: a
❌ Wrong password! 2 attempts left.

Enter password: b
❌ Wrong password! 1 attempts left.

Enter password: c
❌ Wrong password!

🚫 Account locked! Too many failed attempts.
```

### Condition টা বুঝি:

```csharp
while (attempts < maxAttempts && !loggedIn)
```

এখানে দুইটা condition আছে:
- `attempts < maxAttempts` - 3 বারের বেশি try করেনি
- `!loggedIn` - এখনো login হয়নি

দুইটাই true থাকলে loop চলবে। যেকোনো একটা false হলে থামবে।

---

## Real Example 5: Number Guessing Game

Computer একটা random number মনে রাখবে, তুমি guess করবে। যতবার ইচ্ছা try করতে পারবে:

```csharp
Random random = new Random();
int secretNumber = random.Next(1, 101);  // 1 থেকে 100 এর মধ্যে

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
    {
        Console.WriteLine("📈 Too low! Try higher.\n");
    }
    else if (guess > secretNumber)
    {
        Console.WriteLine("📉 Too high! Try lower.\n");
    }
    else
    {
        Console.WriteLine($"\n🎉 Correct! You got it in {attempts} attempts!");
    }
}
```

Output (example):
```
🎮 Number Guessing Game!
I'm thinking of a number between 1 and 100.

Your guess: 50
📈 Too low! Try higher.

Your guess: 75
📉 Too high! Try lower.

Your guess: 60
📈 Too low! Try higher.

Your guess: 67
🎉 Correct! You got it in 4 attempts!
```

### কী করলাম:

- `Random` class দিয়ে 1-100 এর মধ্যে random number নিলাম
- `while (guess != secretNumber)` - যতক্ষণ guess সঠিক না
- প্রতিবার hint দিচ্ছি - "Too low" বা "Too high"

---

## Infinite Loop - সাবধান! ⚠️

Infinite Loop মানে এমন loop যেটা কখনো শেষ হয় না। চিরকাল চলতেই থাকে!

### কখন হয়?

**1. Update ভুলে গেলে:**

```csharp
int i = 1;

while (i <= 5)
{
    Console.WriteLine(i);
    // i = i + 1; ভুলে গেছি!
}
```

i সবসময় 1 থাকবে, 1 <= 5 সবসময় true, তাই চিরকাল 1 print হতে থাকবে!

**2. Condition কখনো false না হলে:**

```csharp
int i = 1;

while (i > 0)  // i সবসময় positive থাকবে
{
    Console.WriteLine(i);
    i = i + 1;  // বাড়ছে, তাই সবসময় > 0
}
```

i বাড়তেই থাকবে, সবসময় 0 এর বেশি থাকবে, তাই loop শেষ হবে না!

**3. ইচ্ছাকৃত Infinite Loop:**

কখনো কখনো আমরা চাই loop চলতেই থাকুক। তখন `while (true)` লিখি:

```csharp
while (true)
{
    Console.WriteLine("This will run forever!");
}
```

এটা থামাতে `break` লাগে (নিচে শিখবো)।

### Infinite Loop হলে কী করবে?

`Ctrl + C` চাপলে program বন্ধ হয়ে যাবে।

---

## break Statement

break মানে "এখনই loop থেকে বের হয়ে যাও!"

condition true থাকলেও break পেলে loop শেষ।

### Syntax:

```csharp
while (condition)
{
    // কিছু code
    
    if (someCondition)
    {
        break;  // এখনই বের হয়ে যাও!
    }
    
    // আরো code
}
```

### Example 1: নির্দিষ্ট সংখ্যায় থামো

1 থেকে 100 পর্যন্ত print করো, কিন্তু 50 এর পরে থামো:

```csharp
int i = 1;

while (i <= 100)
{
    Console.WriteLine(i);
    
    if (i == 50)
    {
        Console.WriteLine("Stopping at 50!");
        break;  // 50 হলে বের হয়ে যাও
    }
    
    i = i + 1;
}

Console.WriteLine("Loop ended.");
```

Output:
```
1
2
3
...
49
50
Stopping at 50!
Loop ended.
```

### Example 2: User "exit" লিখলে থামো

```csharp
Console.WriteLine("Type anything. Type 'exit' to quit.\n");

while (true)  // Infinite loop
{
    Console.Write("You: ");
    string input = Console.ReadLine();
    
    if (input.ToLower() == "exit")
    {
        Console.WriteLine("Goodbye! 👋");
        break;  // exit লিখলে বের হও
    }
    
    Console.WriteLine($"You said: {input}\n");
}
```

Output:
```
Type anything. Type 'exit' to quit.

You: hello
You said: hello

You: how are you
You said: how are you

You: exit
Goodbye! 👋
```

### Example 3: First Negative Number এ থামো

Numbers input নাও, negative number পেলে থামো:

```csharp
int sum = 0;

Console.WriteLine("Enter numbers to add. Enter negative to stop.\n");

while (true)
{
    Console.Write("Enter number: ");
    int num = int.Parse(Console.ReadLine());
    
    if (num < 0)
    {
        Console.WriteLine("Negative number found. Stopping!");
        break;
    }
    
    sum = sum + num;
    Console.WriteLine($"Sum so far: {sum}\n");
}

Console.WriteLine($"\nFinal sum: {sum}");
```

Output:
```
Enter numbers to add. Enter negative to stop.

Enter number: 10
Sum so far: 10

Enter number: 20
Sum so far: 30

Enter number: 5
Sum so far: 35

Enter number: -1
Negative number found. Stopping!

Final sum: 35
```

---

## continue Statement

continue মানে "এই round টা skip করো, পরের round এ যাও!"

break পুরো loop থেকে বের করে দেয়, কিন্তু continue শুধু বর্তমান iteration skip করে।

### Syntax:

```csharp
while (condition)
{
    // কিছু code
    
    if (someCondition)
    {
        continue;  // নিচের code skip করে পরের round এ যাও
    }
    
    // এই code skip হবে যদি continue execute হয়
}
```

### Example 1: শুধু জোড় সংখ্যা Print করো

1 থেকে 10 পর্যন্ত, কিন্তু শুধু জোড় সংখ্যা চাই:

```csharp
int i = 0;

Console.WriteLine("Even numbers from 1 to 10:");

while (i < 10)
{
    i = i + 1;
    
    if (i % 2 != 0)  // বিজোড় হলে
    {
        continue;  // skip করো
    }
    
    Console.WriteLine(i);
}
```

Output:
```
Even numbers from 1 to 10:
2
4
6
8
10
```

### কী হলো:

- i = 1 → 1 % 2 != 0? হ্যাঁ (বিজোড়) → continue → skip
- i = 2 → 2 % 2 != 0? না (জোড়) → print 2
- i = 3 → 3 % 2 != 0? হ্যাঁ (বিজোড়) → continue → skip
- i = 4 → 4 % 2 != 0? না (জোড়) → print 4
- ... এভাবে চলতে থাকে

### Example 2: Skip Number 5

1 থেকে 10 print করো, কিন্তু 5 টা skip করো:

```csharp
int i = 0;

while (i < 10)
{
    i = i + 1;
    
    if (i == 5)
    {
        Console.WriteLine("(skipping 5)");
        continue;
    }
    
    Console.WriteLine(i);
}
```

Output:
```
1
2
3
4
(skipping 5)
6
7
8
9
10
```

### Example 3: Empty Input Skip করো

```csharp
Console.WriteLine("Enter names. Type 'done' to finish.\n");

int count = 0;

while (true)
{
    Console.Write("Name: ");
    string name = Console.ReadLine();
    
    if (name.ToLower() == "done")
    {
        break;
    }
    
    if (name == "")
    {
        Console.WriteLine("Empty name! Try again.\n");
        continue;  // empty হলে count করবো না
    }
    
    count = count + 1;
    Console.WriteLine($"Added: {name} (Total: {count})\n");
}

Console.WriteLine($"\nTotal names entered: {count}");
```

Output:
```
Enter names. Type 'done' to finish.

Name: Rahim
Added: Rahim (Total: 1)

Name: 
Empty name! Try again.

Name: Karim
Added: Karim (Total: 2)

Name: done

Total names entered: 2
```

---

## break vs continue

| break | continue |
|-------|----------|
| পুরো loop থেকে বের | শুধু এই round skip |
| Loop শেষ | Loop চলতে থাকে |
| "আমি যাচ্ছি!" | "এটা বাদ, পরেরটা দেখি" |

### Visual Example:

```csharp
int i = 0;

while (i < 5)
{
    i = i + 1;
    
    if (i == 3)
    {
        // break;     // এটা দিলে output: 1, 2
        // continue;  // এটা দিলে output: 1, 2, 4, 5
    }
    
    Console.WriteLine(i);
}
```

break দিলে: `1, 2` (3 তে থেমে গেছে)
continue দিলে: `1, 2, 4, 5` (3 skip হয়েছে)

---

## Common Mistakes

### Mistake 1: Update ভুলে যাওয়া

```csharp
// ❌ Infinite loop!
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    // i = i + 1; ভুলে গেছি!
}

// ✅ Correct
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    i = i + 1;
}
```

### Mistake 2: Condition এ = দেওয়া

```csharp
// ❌ Wrong! এটা assignment, comparison না
while (i = 5)  // Error!

// ✅ Correct
while (i == 5)  // comparison
while (i <= 5)  // comparison
```

### Mistake 3: Off-by-one Error

তুমি চাও 5 বার চলুক, কিন্তু 4 বার বা 6 বার চলছে!

```csharp
// ❌ 4 বার চলবে (0, 1, 2, 3)
int i = 0;
while (i < 4)
{
    Console.WriteLine(i);
    i = i + 1;
}

// ❌ 6 বার চলবে (0, 1, 2, 3, 4, 5)
int i = 0;
while (i <= 5)
{
    Console.WriteLine(i);
    i = i + 1;
}

// ✅ ঠিক 5 বার চলবে (1, 2, 3, 4, 5)
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    i = i + 1;
}
```

**Tip:** Confusion হলে trace করো! Table বানিয়ে দেখো কবে condition false হচ্ছে।

### Mistake 4: continue এর পরে update

```csharp
// ❌ Infinite loop! continue এর পরে i update হচ্ছে না
int i = 0;
while (i < 10)
{
    if (i == 5)
    {
        continue;  // এখান থেকে লাফ দেবে
    }
    
    Console.WriteLine(i);
    i = i + 1;  // i == 5 হলে এটা execute হবে না!
}

// ✅ Correct - update আগে করো
int i = 0;
while (i < 10)
{
    i = i + 1;  // আগে update
    
    if (i == 5)
    {
        continue;
    }
    
    Console.WriteLine(i);
}
```

---

## Complete Example 1: ATM System

সব কিছু মিলিয়ে একটা ATM system বানাই যেটা বারবার transaction করতে দেবে:

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║         🏧 ATM MACHINE                ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

double balance = 10000;
bool running = true;

while (running)
{
    Console.WriteLine($"\n💰 Current Balance: {balance} tk\n");
    Console.WriteLine("1. Deposit");
    Console.WriteLine("2. Withdraw");
    Console.WriteLine("3. Check Balance");
    Console.WriteLine("4. Exit");
    Console.Write("\nSelect option: ");
    
    int choice = int.Parse(Console.ReadLine());
    
    if (choice == 1)
    {
        Console.Write("\nEnter deposit amount: ");
        double amount = double.Parse(Console.ReadLine());
        
        if (amount > 0)
        {
            balance = balance + amount;
            Console.WriteLine($"✅ Deposited {amount} tk successfully!");
        }
        else
        {
            Console.WriteLine("❌ Invalid amount!");
        }
    }
    else if (choice == 2)
    {
        Console.Write("\nEnter withdrawal amount: ");
        double amount = double.Parse(Console.ReadLine());
        
        if (amount <= 0)
        {
            Console.WriteLine("❌ Invalid amount!");
        }
        else if (amount > balance)
        {
            Console.WriteLine("❌ Insufficient balance!");
        }
        else
        {
            balance = balance - amount;
            Console.WriteLine($"✅ Withdrawn {amount} tk successfully!");
        }
    }
    else if (choice == 3)
    {
        Console.WriteLine($"\n💰 Your balance is: {balance} tk");
    }
    else if (choice == 4)
    {
        running = false;
        Console.WriteLine("\n👋 Thank you for using our ATM!");
        Console.WriteLine("Have a nice day!");
    }
    else
    {
        Console.WriteLine("\n❌ Invalid option! Please select 1-4.");
    }
}
```

---

## Complete Example 2: Multiplication Table Generator

User যে number দেবে তার multiplication table দেখাবো:

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║     📊 MULTIPLICATION TABLE           ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

Console.Write("Enter a number: ");
int num = int.Parse(Console.ReadLine());

Console.WriteLine($"\n📋 Multiplication Table of {num}:\n");

int i = 1;

while (i <= 10)
{
    int result = num * i;
    Console.WriteLine($"   {num} × {i} = {result}");
    i = i + 1;
}

Console.WriteLine("\n✅ Table complete!");
```

Output (num = 7):
```
╔═══════════════════════════════════════╗
║     📊 MULTIPLICATION TABLE           ║
╚═══════════════════════════════════════╝

Enter a number: 7

📋 Multiplication Table of 7:

   7 × 1 = 7
   7 × 2 = 14
   7 × 3 = 21
   7 × 4 = 28
   7 × 5 = 35
   7 × 6 = 42
   7 × 7 = 49
   7 × 8 = 56
   7 × 9 = 63
   7 × 10 = 70

✅ Table complete!
```

---

## Summary

আজকে শিখলে:

| Concept | মানে |
|---------|------|
| while | যতক্ষণ condition true, ততক্ষণ চলো |
| Infinite Loop | যে loop কখনো শেষ হয় না |
| break | এখনই loop থেকে বের হও |
| continue | এই round skip করো |

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
- আগে condition check, তারপর code
- Update ভুলো না! (Infinite loop হবে)
- break = পুরো loop থেকে বের
- continue = শুধু এই iteration skip
- continue এর আগে update করো

**Next Part এ:** do-while Loop শিখবো - যেখানে অন্তত একবার code চলবেই!

---

*CPS Academy - Learn. Code. Grow.*
