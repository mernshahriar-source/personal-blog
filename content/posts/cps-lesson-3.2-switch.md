---
title: "Lesson 3.2: switch Statement ও switch Expression"
date: "2026-03-12"
excerpt: "switch statement কী ও কেন দরকার, case, break, default, multiple cases group করা, string/char দিয়ে switch, switch expression (C# 8+), এবং switch vs if-else "
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - conditions
  - if-else
  - switch
  - control-flow
draft: false
---


> **এই Lesson এ শিখবে:** switch statement কী ও কেন দরকার, case, break, default, multiple cases group করা, string/char দিয়ে switch, switch expression (C# 8+), এবং switch vs if-else কখন কোনটা।

---

## switch কেন দরকার?

আগের lesson এ আমরা if-else শিখেছি। সেটা দিয়েই সব করা যায়। তাহলে switch কেন?

ধরো user একটা number দেবে (1-7), আর তুমি বলবে সেটা কোন বার। if-else দিয়ে:

```csharp
int day = 3;

if (day == 1) Console.WriteLine("Sunday");
else if (day == 2) Console.WriteLine("Monday");
else if (day == 3) Console.WriteLine("Tuesday");
else if (day == 4) Console.WriteLine("Wednesday");
else if (day == 5) Console.WriteLine("Thursday");
else if (day == 6) Console.WriteLine("Friday");
else if (day == 7) Console.WriteLine("Saturday");
else Console.WriteLine("Invalid day!");
```

কাজ করছে ঠিকই, কিন্তু বারবার `day ==` লিখতে হচ্ছে। পড়তেও কষ্ট।

এই ধরনের situation — যেখানে **একটা variable এর exact value** match করতে হয় — সেখানে switch অনেক cleaner।

---

## switch এর Structure

```csharp
switch (variable)
{
    case value1:
        // value1 হলে এটা চলবে
        break;

    case value2:
        // value2 হলে এটা চলবে
        break;

    default:
        // কোনো case match না হলে এটা চলবে
        break;
}
```

**প্রতিটা part বুঝি:**

| Part | কী করে |
|------|--------|
| `switch (variable)` | কোন variable check করবে |
| `case value:` | possible value — match হলে নিচের code চলে |
| `break;` | case এর কাজ শেষ, switch থেকে বের হও |
| `default:` | কিছু match না হলে (else এর মতো) |

---

## প্রথম switch Program

সেই day program টাই switch দিয়ে:

```csharp
int day = 3;

switch (day)
{
    case 1:
        Console.WriteLine("Sunday");
        break;
    case 2:
        Console.WriteLine("Monday");
        break;
    case 3:
        Console.WriteLine("Tuesday");
        break;
    case 4:
        Console.WriteLine("Wednesday");
        break;
    case 5:
        Console.WriteLine("Thursday");
        break;
    case 6:
        Console.WriteLine("Friday");
        break;
    case 7:
        Console.WriteLine("Saturday");
        break;
    default:
        Console.WriteLine("Invalid day!");
        break;
}
```

Output: `Tuesday`

**কী হলো:**
1. switch দেখলো day = 3
2. case 1? না। case 2? না। case 3? **হ্যাঁ!** ✅
3. "Tuesday" print হলো
4. break পেয়ে switch থেকে বের হয়ে গেলো

if-else এর চেয়ে কত clean! কোন value তে কী হবে স্পষ্ট দেখা যাচ্ছে।

---

## break কেন দিতে হয়?

break বলে — "এই case এর কাজ শেষ, switch থেকে বের হয়ে যাও।"

break না দিলে C# error দেয়:

```csharp
// ❌ Error! break নেই
case 1:
    Console.WriteLine("One");
    // break কই?
case 2:
    Console.WriteLine("Two");
    break;

// ✓ Correct
case 1:
    Console.WriteLine("One");
    break;
case 2:
    Console.WriteLine("Two");
    break;
```

C# তে break বাধ্যতামূলক, তাই ভুল করার chance কম।

---

## default Case

default হলো "else" এর মতো। কোনো case match না করলে default চলে:

```csharp
int day = 9;

switch (day)
{
    case 1:
        Console.WriteLine("Sunday");
        break;
    // ... বাকি cases
    case 7:
        Console.WriteLine("Saturday");
        break;
    default:
        Console.WriteLine("Invalid day! Please enter 1-7.");
        break;
}
```

Output: `Invalid day! Please enter 1-7.`

**Suggestion:** সবসময় default রাখো। User ভুল input দিতেই পারে!

---

## String দিয়ে switch

switch শুধু number না, string দিয়েও কাজ করে:

```csharp
Console.Write("Enter a fruit name: ");
string fruit = Console.ReadLine().ToLower();

switch (fruit)
{
    case "apple":
        Console.WriteLine("🍎 Apple - 120 tk/kg");
        break;
    case "banana":
        Console.WriteLine("🍌 Banana - 60 tk/dozen");
        break;
    case "mango":
        Console.WriteLine("🥭 Mango - 200 tk/kg");
        break;
    case "orange":
        Console.WriteLine("🍊 Orange - 150 tk/kg");
        break;
    default:
        Console.WriteLine("❌ Sorry, we don't have that fruit.");
        break;
}
```

`.ToLower()` use করলাম যাতে "Apple", "APPLE", "apple" সব match করে।

---

## char দিয়ে switch

```csharp
Console.Write("Enter your grade (A/B/C/D/F): ");
char grade = char.Parse(Console.ReadLine().ToUpper());

switch (grade)
{
    case 'A':
        Console.WriteLine("🌟 Excellent! GPA: 4.0");
        break;
    case 'B':
        Console.WriteLine("👍 Good! GPA: 3.0");
        break;
    case 'C':
        Console.WriteLine("😊 Average. GPA: 2.0");
        break;
    case 'D':
        Console.WriteLine("😐 Below average. GPA: 1.0");
        break;
    case 'F':
        Console.WriteLine("😢 Failed. GPA: 0.0");
        break;
    default:
        Console.WriteLine("❌ Invalid grade!");
        break;
}
```

---

## Multiple Cases — একই কাজের জন্য group করা

কখনো কখনো একাধিক value তে same কাজ করতে হয়। তখন cases group করতে পারো:

```csharp
int month = 4;

switch (month)
{
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        Console.WriteLine("This month has 31 days.");
        break;

    case 4:
    case 6:
    case 9:
    case 11:
        Console.WriteLine("This month has 30 days.");
        break;

    case 2:
        Console.WriteLine("This month has 28 or 29 days.");
        break;

    default:
        Console.WriteLine("Invalid month!");
        break;
}
```

Output: `This month has 30 days.`

month = 4, case 4 match হলো। case 4 এর নিচে code নেই, তাই পরের case গুলো skip করে যেখানে code আর break আছে সেখানে যায়।

### Weekday/Weekend check

```csharp
string today = "Friday";

switch (today)
{
    case "Saturday":
    case "Sunday":
        Console.WriteLine("🎉 Weekend! Enjoy your day off.");
        break;

    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        Console.WriteLine("💼 Weekday. Time to work!");
        break;

    default:
        Console.WriteLine("❌ Invalid day!");
        break;
}
```

Output: `💼 Weekday. Time to work!`

---

## switch vs if-else — কখন কোনটা?

| Situation | কোনটা use করবে |
|-----------|----------------|
| Exact value match (1, 2, 3, "apple", 'A') | **switch** ✓ |
| Range check (marks >= 80) | **if-else** ✓ |
| Complex condition (age >= 18 && hasID) | **if-else** ✓ |
| boolean check (isLoggedIn) | **if-else** ✓ |
| অনেক specific values | **switch** ✓ (cleaner) |

**সহজ নিয়ম:**
- "এটা কি exactly X?" → switch
- "এটা কি X এর বেশি/কম?" → if-else
- "এটা কি X **আর** Y দুইটাই?" → if-else

---

## switch Expression (C# 8+) — Modern Way

C# 8 থেকে switch এর একটা নতুন, ছোট syntax এসেছে — **switch expression**।

### পুরাতন switch statement:

```csharp
int day = 3;
string dayName;

switch (day)
{
    case 1:
        dayName = "Sunday";
        break;
    case 2:
        dayName = "Monday";
        break;
    case 3:
        dayName = "Tuesday";
        break;
    // ... বাকি cases
    default:
        dayName = "Invalid";
        break;
}

Console.WriteLine(dayName);
```

### নতুন switch expression:

```csharp
int day = 3;

string dayName = day switch
{
    1 => "Sunday",
    2 => "Monday",
    3 => "Tuesday",
    4 => "Wednesday",
    5 => "Thursday",
    6 => "Friday",
    7 => "Saturday",
    _ => "Invalid"
};

Console.WriteLine(dayName);  // Tuesday
```

অনেক ছোট এবং clean!

### পার্থক্যগুলো লক্ষ্য করো

| পুরাতন switch | নতুন switch expression |
|---------------|------------------------|
| `switch (day)` | `day switch` |
| `case 1:` | `1 =>` |
| `break;` | দরকার নেই |
| `default:` | `_` (underscore) |
| Statement (কাজ করে) | Expression (value return করে) |

### Grade to GPA

```csharp
char grade = 'B';

double gpa = grade switch
{
    'A' => 4.0,
    'B' => 3.0,
    'C' => 2.0,
    'D' => 1.0,
    'F' => 0.0,
    _ => -1.0
};

Console.WriteLine($"Your GPA: {gpa}");  // Your GPA: 3.0
```

### Multiple Values with `or`

switch expression এ `or` দিয়ে multiple values একসাথে:

```csharp
int month = 4;

int days = month switch
{
    1 or 3 or 5 or 7 or 8 or 10 or 12 => 31,
    4 or 6 or 9 or 11 => 30,
    2 => 28,
    _ => 0
};

Console.WriteLine($"This month has {days} days.");  // 30 days
```

**Note:** switch expression একটু advanced। আপাতত পুরাতন switch দিয়েই কাজ চালাতে পারো। পরে comfortable হলে expression use করবে।

---

## Complete Example: Food Order System

সব কিছু মিলিয়ে একটা complete system:

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║       🍕 FOOD ORDER SYSTEM            ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

// Menu
Console.WriteLine("📋 MENU:");
Console.WriteLine("------------------------");
Console.WriteLine("1. Pizza      - 350 tk");
Console.WriteLine("2. Burger     - 180 tk");
Console.WriteLine("3. Pasta      - 250 tk");
Console.WriteLine("4. Sandwich   - 120 tk");
Console.WriteLine("5. Fried Rice - 200 tk");
Console.WriteLine("------------------------\n");

Console.Write("Enter item number: ");
int item = int.Parse(Console.ReadLine());

// switch expression দিয়ে নাম আর দাম বের করি
string itemName = item switch
{
    1 => "Pizza",
    2 => "Burger",
    3 => "Pasta",
    4 => "Sandwich",
    5 => "Fried Rice",
    _ => ""
};

int itemPrice = item switch
{
    1 => 350,
    2 => 180,
    3 => 250,
    4 => 120,
    5 => 200,
    _ => 0
};

// Invalid check
if (itemName == "")
{
    Console.WriteLine("\n❌ Invalid item number! Please select 1-5.");
    return;
}

// Quantity
Console.Write($"How many {itemName}? ");
int quantity = int.Parse(Console.ReadLine());

int total = itemPrice * quantity;

// Bill
Console.WriteLine("\n╔═══════════════════════════════════════╗");
Console.WriteLine("║            📃 YOUR BILL               ║");
Console.WriteLine("╠═══════════════════════════════════════╣");
Console.WriteLine($"║  Item:     {itemName,-26} ║");
Console.WriteLine($"║  Price:    {itemPrice} tk{"",-22} ║");
Console.WriteLine($"║  Quantity: {quantity,-26} ║");
Console.WriteLine("╠═══════════════════════════════════════╣");
Console.WriteLine($"║  TOTAL:    {total} tk{"",-22} ║");
Console.WriteLine("╚═══════════════════════════════════════╝");
Console.WriteLine("\n🙏 Thank you for your order!");
```

---

## Complete Example: ATM Machine

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║           🏧 ATM MACHINE              ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

double balance = 10000;
Console.WriteLine($"💳 Current balance: {balance} tk\n");

Console.WriteLine("Select an option:");
Console.WriteLine("1. Check Balance");
Console.WriteLine("2. Deposit Money");
Console.WriteLine("3. Withdraw Money");
Console.WriteLine("4. Exit");
Console.Write("\nEnter option (1-4): ");

int option = int.Parse(Console.ReadLine());

switch (option)
{
    case 1:
        Console.WriteLine($"\n💰 Your balance: {balance} tk");
        break;

    case 2:
        Console.Write("\nEnter deposit amount: ");
        double depositAmount = double.Parse(Console.ReadLine());

        if (depositAmount > 0)
        {
            balance += depositAmount;
            Console.WriteLine($"\n✅ Deposited {depositAmount} tk");
            Console.WriteLine($"💰 New balance: {balance} tk");
        }
        else
        {
            Console.WriteLine("\n❌ Invalid amount!");
        }
        break;

    case 3:
        Console.Write("\nEnter withdrawal amount: ");
        double withdrawAmount = double.Parse(Console.ReadLine());

        if (withdrawAmount <= 0)
        {
            Console.WriteLine("\n❌ Invalid amount!");
        }
        else if (withdrawAmount > balance)
        {
            Console.WriteLine("\n❌ Insufficient balance!");
        }
        else
        {
            balance -= withdrawAmount;
            Console.WriteLine($"\n✅ Withdrawn {withdrawAmount} tk");
            Console.WriteLine($"💰 Remaining: {balance} tk");
        }
        break;

    case 4:
        Console.WriteLine("\n👋 Thank you! Have a nice day!");
        break;

    default:
        Console.WriteLine("\n❌ Invalid option! Please select 1-4.");
        break;
}
```

---

## Common Mistakes

### Mistake 1: break ভুলে যাওয়া

C# তে break না দিলে compile error হয়। তাই সবসময় প্রতিটা case এ break দাও।

### Mistake 2: case এর পর colon (:) ভুলে যাওয়া

```csharp
// ❌ Error!
case 1
    Console.WriteLine("One");
    break;

// ✓ Correct
case 1:
    Console.WriteLine("One");
    break;
```

### Mistake 3: Range check করার চেষ্টা

```csharp
// ❌ switch এ range check হয় না!
switch (marks)
{
    case >= 80:  // Error!
        grade = "A+";
        break;
}

// ✓ Range এর জন্য if-else use করো
if (marks >= 80) grade = "A+";
```

### Mistake 4: default না রাখা

সবসময় default রাখো — user ভুল input দিতেই পারে।

---

## Summary

| Concept | কাজ |
|---------|-----|
| switch | একটা variable এর exact value match করা |
| case | কোন value এ কী হবে |
| break | case থেকে বের হওয়া (বাধ্যতামূলক!) |
| default | কিছু match না হলে (else এর মতো) |
| Multiple cases | একই কাজের জন্য cases group করা |
| switch expression | C# 8+ এর ছোট syntax (`day switch { 1 => "Sun", _ => "?" }`) |

**switch vs if-else:**
- Exact value match → **switch**
- Range / Complex condition → **if-else**

**মনে রাখো:**
- প্রতিটা case এ `break` দিতেই হবে
- case এর পর `:` (colon) দিতে হবে
- default সবসময় রাখো
- string, int, char — সব দিয়ে switch হয়
- Range check এ switch না, if-else use করো

---

**Module 3 Complete!** পরের Module: Loops — for, while, do-while দিয়ে একই কাজ বারবার করা।

---

*CPS Academy - Learn. Code. Grow.*
