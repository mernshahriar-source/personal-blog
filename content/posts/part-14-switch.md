---
title: 'Part 14: switch Statement'
date: '2026-01-20'
excerpt: 'Part 14: switch Statement - multiple conditions handle করুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - conditionals
  - tutorial
draft: true
---

# Part 14: switch Statement

ধরো তুমি একটা restaurant এ গেলে। Waiter এসে menu দিলো:

```
1. Pizza
2. Burger
3. Pasta
4. Sandwich
```

তুমি বললে "3 নম্বর দাও।"

এখন waiter কী করবে? সে menu তে 3 নম্বর খুঁজবে, match করলে Pasta আনবে। 5 বললে বলবে "এই নম্বরে কিছু নেই!"

switch ও exactly এভাবেই কাজ করে। একটা value নেয়, অনেকগুলো option এর সাথে match করে, যেটা মিলবে সেটার কাজ করে।

### এই part শেষে তুমি বানাতে পারবে:

- 🧮 Calculator
- 📅 Day of Week finder
- 📆 Month এর দিন কত
- 🍕 Restaurant Menu System
- 🏧 ATM Menu

চলো শুরু করি!

---

## switch কেন দরকার?

আগের part এ আমরা if-else শিখেছি। সেটা দিয়েই তো সব করা যায়। তাহলে switch কেন?

ধরো user একটা number দেবে (1-7), আর তুমি বলবে সেটা কোন বার। if-else দিয়ে করলে:

```csharp
int day = 3;

if (day == 1)
{
    Console.WriteLine("Sunday");
}
else if (day == 2)
{
    Console.WriteLine("Monday");
}
else if (day == 3)
{
    Console.WriteLine("Tuesday");
}
else if (day == 4)
{
    Console.WriteLine("Wednesday");
}
else if (day == 5)
{
    Console.WriteLine("Thursday");
}
else if (day == 6)
{
    Console.WriteLine("Friday");
}
else if (day == 7)
{
    Console.WriteLine("Saturday");
}
else
{
    Console.WriteLine("Invalid day!");
}
```

কাজ করছে ঠিকই। কিন্তু দেখো কত লম্বা! আর বারবার `day ==` লিখতে হচ্ছে। পড়তেও কষ্ট।

এই ধরনের situation এ switch অনেক cleaner।

---

## switch এর Structure

switch এর basic structure টা আগে দেখি:

```csharp
switch (variable)
{
    case value1:
        // value1 হলে এই code চলবে
        break;
        
    case value2:
        // value2 হলে এই code চলবে
        break;
        
    case value3:
        // value3 হলে এই code চলবে
        break;
        
    default:
        // কোনো case match না হলে এটা চলবে
        break;
}
```

### প্রতিটা part বুঝি:

**1. switch (variable)**

কোন variable টা check করবে সেটা বলে দাও। এই variable এর value বিভিন্ন case এর সাথে match করবে।

```csharp
switch (day)    // day variable টা check করবো
```

**2. case value:**

প্রতিটা possible value এর জন্য একটা case লেখো। variable এর value যদি এই value এর সাথে match করে, তাহলে এর নিচের code চলবে।

```csharp
case 1:         // day যদি 1 হয়
case 2:         // day যদি 2 হয়
case "hello":   // string হলে এভাবে
```

**3. break;**

Case এর কাজ শেষ হলে break দাও। এটা বলে "এই case এর কাজ শেষ, switch থেকে বের হয়ে যাও।"

```csharp
case 1:
    Console.WriteLine("One");
    break;  // এখানে switch থেকে বের হয়ে যাবে
```

**4. default:**

কোনো case match না হলে default চলবে। এটা else এর মতো কাজ করে। Optional, কিন্তু রাখা ভালো।

```csharp
default:
    Console.WriteLine("Invalid!");
    break;
```

---

## প্রথম switch Program

এবার if-else এর সেই day program টাই switch দিয়ে লিখি:

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
2. case 1 check করলো - না, 3 ≠ 1
3. case 2 check করলো - না, 3 ≠ 2
4. case 3 check করলো - হ্যাঁ, 3 = 3! ✅
5. case 3 এর code চললো: "Tuesday" print হলো
6. break পেয়ে switch থেকে বের হয়ে গেলো

দেখো, if-else এর চেয়ে কত clean! কোন value তে কী হবে স্পষ্ট দেখা যাচ্ছে।

---

## break কেন দিতে হয়?

break না দিলে C# error দেয়। কিন্তু কেন break দিতে হয় সেটা বুঝি।

ধরো break না দিলে switch পরের case ও চালিয়ে দিতো। তাহলে:

```
day = 3 হলে:
- case 3 match হলো, "Tuesday" print হলো
- break নেই, তাই case 4 ও চললো, "Wednesday" print হলো
- break নেই, তাই case 5 ও চললো, "Thursday" print হলো
- ... এভাবে চলতেই থাকতো!
```

এটা বেশিরভাগ সময় আমরা চাই না। তাই break দিয়ে বলি "এখানেই থামো।"

C# এ break না দিলে compile error হয়, তাই ভুল করার chance কম।

```csharp
// ❌ এটা error দেবে
case 1:
    Console.WriteLine("One");
    // break নেই!
case 2:
    Console.WriteLine("Two");
    break;
```

```csharp
// ✅ এটা correct
case 1:
    Console.WriteLine("One");
    break;
case 2:
    Console.WriteLine("Two");
    break;
```

---

## default Case

default হলো "else" এর মতো। যখন কোনো case match করে না, তখন default চলে।

ধরো user 9 দিলো, কিন্তু আমাদের case আছে 1-7 পর্যন্ত। তখন কী হবে?

```csharp
int day = 9;

switch (day)
{
    case 1:
        Console.WriteLine("Sunday");
        break;
    case 2:
        Console.WriteLine("Monday");
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

9 কোনো case এ match করলো না, তাই default চললো।

**Suggestion:** সবসময় default রাখো। User ভুল input দিতেই পারে!

---

## Real Life Example 1: Color Selector

একটা simple color selector বানাই। User একটা number দেবে, আমরা সেই color দেখাবো।

প্রথমে user কে options দেখাবো, তারপর তার choice অনুযায়ী color বলবো:

```csharp
Console.WriteLine("🎨 Color Selector");
Console.WriteLine("-----------------");
Console.WriteLine("1. Red");
Console.WriteLine("2. Green");
Console.WriteLine("3. Blue");
Console.WriteLine("4. Yellow");
Console.Write("\nEnter your choice (1-4): ");

int choice = int.Parse(Console.ReadLine());

switch (choice)
{
    case 1:
        Console.WriteLine("\n🔴 You selected Red!");
        Console.WriteLine("Red is the color of passion and energy.");
        break;
        
    case 2:
        Console.WriteLine("\n🟢 You selected Green!");
        Console.WriteLine("Green is the color of nature and harmony.");
        break;
        
    case 3:
        Console.WriteLine("\n🔵 You selected Blue!");
        Console.WriteLine("Blue is the color of calm and trust.");
        break;
        
    case 4:
        Console.WriteLine("\n🟡 You selected Yellow!");
        Console.WriteLine("Yellow is the color of happiness and optimism.");
        break;
        
    default:
        Console.WriteLine("\n❌ Invalid choice!");
        Console.WriteLine("Please enter a number between 1 and 4.");
        break;
}
```

User 2 দিলে:
```
🟢 You selected Green!
Green is the color of nature and harmony.
```

User 7 দিলে:
```
❌ Invalid choice!
Please enter a number between 1 and 4.
```

---

## Real Life Example 2: Simple Calculator

একটা calculator বানাই যেখানে user দুইটা number দেবে এবং operator select করবে।

প্রথমে দুইটা number নেবো, তারপর কোন operation করতে চায় সেটা জিজ্ঞেস করবো:

```csharp
Console.WriteLine("🧮 Simple Calculator");
Console.WriteLine("--------------------\n");

Console.Write("Enter first number: ");
double num1 = double.Parse(Console.ReadLine());

Console.Write("Enter second number: ");
double num2 = double.Parse(Console.ReadLine());

Console.WriteLine("\nSelect operation:");
Console.WriteLine("1. Addition (+)");
Console.WriteLine("2. Subtraction (-)");
Console.WriteLine("3. Multiplication (*)");
Console.WriteLine("4. Division (/)");
Console.Write("\nEnter choice (1-4): ");

int operation = int.Parse(Console.ReadLine());

switch (operation)
{
    case 1:
        double sum = num1 + num2;
        Console.WriteLine($"\n✅ Result: {num1} + {num2} = {sum}");
        break;
        
    case 2:
        double difference = num1 - num2;
        Console.WriteLine($"\n✅ Result: {num1} - {num2} = {difference}");
        break;
        
    case 3:
        double product = num1 * num2;
        Console.WriteLine($"\n✅ Result: {num1} × {num2} = {product}");
        break;
        
    case 4:
        if (num2 != 0)
        {
            double quotient = num1 / num2;
            Console.WriteLine($"\n✅ Result: {num1} ÷ {num2} = {quotient}");
        }
        else
        {
            Console.WriteLine("\n❌ Error: Cannot divide by zero!");
        }
        break;
        
    default:
        Console.WriteLine("\n❌ Invalid operation!");
        break;
}
```

User input: 10, 5, এবং operation 3 (multiplication):
```
✅ Result: 10 × 5 = 50
```

**লক্ষ্য করো:** case 4 এ division এর আগে check করছি num2 শূন্য কিনা। switch এর ভিতরে if-else use করা যায়!

---

## Multiple Cases একসাথে

কখনো কখনো একাধিক value তে একই কাজ করতে হয়। তখন cases গুলো একসাথে লেখা যায়।

### Real Life Example 3: Weekend Checker

ধরো আমরা check করতে চাই কোন দিন weekend আর কোন দিন weekday। Saturday আর Sunday দুইটাই weekend, তাই এদের কাজ same:

```csharp
Console.Write("Enter day number (1=Sun, 2=Mon, ... 7=Sat): ");
int day = int.Parse(Console.ReadLine());

switch (day)
{
    case 1:
    case 7:
        Console.WriteLine("🎉 It's WEEKEND!");
        Console.WriteLine("Time to relax and enjoy!");
        break;
        
    case 2:
    case 3:
    case 4:
    case 5:
        Console.WriteLine("💼 It's a WEEKDAY.");
        Console.WriteLine("Time to work hard!");
        break;
        
    case 6:
        Console.WriteLine("🕌 It's FRIDAY!");
        Console.WriteLine("Don't forget Jummah prayer!");
        break;
        
    default:
        Console.WriteLine("❌ Invalid day number!");
        Console.WriteLine("Please enter 1-7.");
        break;
}
```

**কী হচ্ছে এখানে:**
- case 1 এবং case 7 এ কোনো code নেই, শুধু পরের case এ চলে যাচ্ছে
- case 7 এর পর code আছে এবং break আছে
- তাই day = 1 বা day = 7 দুইটাতেই same code চলবে

User 7 দিলে: `🎉 It's WEEKEND!`
User 1 দিলে: `🎉 It's WEEKEND!`
User 3 দিলে: `💼 It's a WEEKDAY.`

---

### Real Life Example 4: Month Days

কোন মাসে কত দিন সেটা বলি। January, March, May, July, August, October, December এ 31 দিন। এদের একসাথে রাখি:

```csharp
Console.Write("Enter month number (1-12): ");
int month = int.Parse(Console.ReadLine());

switch (month)
{
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        Console.WriteLine("📅 This month has 31 days.");
        break;
        
    case 4:
    case 6:
    case 9:
    case 11:
        Console.WriteLine("📅 This month has 30 days.");
        break;
        
    case 2:
        Console.WriteLine("📅 February has 28 days.");
        Console.WriteLine("   (29 days in leap year)");
        break;
        
    default:
        Console.WriteLine("❌ Invalid month!");
        Console.WriteLine("Please enter 1-12.");
        break;
}
```

User 7 দিলে (July): `📅 This month has 31 days.`
User 2 দিলে (February): `📅 February has 28 days.`

---

## switch with string

switch শুধু numbers এ না, string এও কাজ করে!

### Real Life Example 5: Command System

একটা simple command system বানাই। User command লিখবে, আমরা সেই অনুযায়ী কাজ করবো:

```csharp
Console.WriteLine("💻 Command System");
Console.WriteLine("-----------------");
Console.WriteLine("Available commands: start, stop, restart, status, help\n");

Console.Write("Enter command: ");
string command = Console.ReadLine().ToLower();

switch (command)
{
    case "start":
        Console.WriteLine("\n🚀 Starting the system...");
        Console.WriteLine("System started successfully!");
        break;
        
    case "stop":
        Console.WriteLine("\n🛑 Stopping the system...");
        Console.WriteLine("System stopped.");
        break;
        
    case "restart":
        Console.WriteLine("\n🔄 Restarting the system...");
        Console.WriteLine("System restarted successfully!");
        break;
        
    case "status":
        Console.WriteLine("\n📊 System Status:");
        Console.WriteLine("   State: Running");
        Console.WriteLine("   Uptime: 2 hours 30 minutes");
        break;
        
    case "help":
        Console.WriteLine("\n📖 Help:");
        Console.WriteLine("   start   - Start the system");
        Console.WriteLine("   stop    - Stop the system");
        Console.WriteLine("   restart - Restart the system");
        Console.WriteLine("   status  - Show system status");
        break;
        
    default:
        Console.WriteLine($"\n❌ Unknown command: {command}");
        Console.WriteLine("Type 'help' to see available commands.");
        break;
}
```

**লক্ষ্য করো:** `.ToLower()` দিয়ে input কে lowercase এ নিয়ে আসছি। তাহলে user "START", "Start", বা "start" যাই লিখুক, সব কাজ করবে।

User "status" দিলে:
```
📊 System Status:
   State: Running
   Uptime: 2 hours 30 minutes
```

---

## switch with char

char মানে single character। এটা দিয়েও switch করা যায়।

### Real Life Example 6: Grade Message

Student এর grade দিলে একটা message দেখাবো:

```csharp
Console.Write("Enter your grade (A/B/C/D/F): ");
char grade = char.Parse(Console.ReadLine().ToUpper());

switch (grade)
{
    case 'A':
        Console.WriteLine("\n🌟 Excellent!");
        Console.WriteLine("You're a star student!");
        break;
        
    case 'B':
        Console.WriteLine("\n👍 Good job!");
        Console.WriteLine("Keep up the good work!");
        break;
        
    case 'C':
        Console.WriteLine("\n😊 Average.");
        Console.WriteLine("You can do better with more effort!");
        break;
        
    case 'D':
        Console.WriteLine("\n😟 Below average.");
        Console.WriteLine("Please work harder!");
        break;
        
    case 'F':
        Console.WriteLine("\n😢 Failed.");
        Console.WriteLine("Don't give up! Try again!");
        break;
        
    default:
        Console.WriteLine("\n❌ Invalid grade!");
        Console.WriteLine("Please enter A, B, C, D, or F.");
        break;
}
```

**লক্ষ্য করো:** char এর value single quote এ লিখতে হয় - `'A'`, `'B'` ইত্যাদি। String হলে double quote - `"hello"`।

User "b" দিলে (ToUpper করে 'B' হবে):
```
👍 Good job!
Keep up the good work!
```

---

## switch vs if-else: কোনটা কখন?

এই প্রশ্ন অনেকের মনে আসে। কখন switch আর কখন if-else?

### switch use করো যখন:

✅ **একটা variable এর exact value match করতে হবে:**
```csharp
// day == 1, day == 2, day == 3...
switch (day) { ... }

// color == "red", color == "blue"...
switch (color) { ... }
```

✅ **অনেকগুলো specific options আছে:**
```csharp
// Menu: 1, 2, 3, 4, 5
switch (menuChoice) { ... }

// Commands: start, stop, restart
switch (command) { ... }
```

### if-else use করো যখন:

✅ **Range check করতে হবে:**
```csharp
// marks 80 এর বেশি, 70 এর বেশি...
if (marks >= 80) { grade = "A+"; }
else if (marks >= 70) { grade = "A"; }
```

switch এ range check করা যায় না:
```csharp
// ❌ এটা কাজ করবে না!
switch (marks)
{
    case >= 80:  // Error!
        break;
}
```

✅ **Complex condition আছে (&&, ||):**
```csharp
// বয়স 18+ এবং ID আছে
if (age >= 18 && hasID) { ... }
```

### Quick Summary:

| Situation | Use |
|-----------|-----|
| Exact value match (==) | switch ✅ |
| Range check (>=, <=) | if-else ✅ |
| Multiple exact values | switch ✅ |
| Complex conditions (&&, \|\|) | if-else ✅ |
| Menu selection | switch ✅ |

---

## switch Expression (C# 8+)

C# 8 থেকে switch এর একটা নতুন, ছোট syntax আছে। এটাকে বলে switch expression।

### পুরাতন switch:

ধরো আমরা day number থেকে day name বের করতে চাই:

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
    case 4:
        dayName = "Wednesday";
        break;
    case 5:
        dayName = "Thursday";
        break;
    case 6:
        dayName = "Friday";
        break;
    case 7:
        dayName = "Saturday";
        break;
    default:
        dayName = "Invalid";
        break;
}

Console.WriteLine(dayName);
```

অনেক লম্বা!

### নতুন switch Expression:

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

### পার্থক্যগুলো লক্ষ্য করো:

| পুরাতন switch | নতুন switch expression |
|---------------|------------------------|
| `switch (day)` | `day switch` |
| `case 1:` | `1 =>` |
| `break;` | দরকার নেই |
| `default:` | `_` |
| Statement | Expression (value return করে) |

### আরেকটা Example: Grade to GPA

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

### Multiple Values with 'or'

switch expression এ `or` দিয়ে multiple values একসাথে লেখা যায়:

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

**Note:** switch expression একটু advanced। তুমি চাইলে আপাতত পুরাতন switch দিয়েই কাজ চালাতে পারো। পরে comfortable হলে expression use করবে।

---

## Complete Example: Food Order System

সব কিছু মিলিয়ে একটা complete food order system বানাই:

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║       🍕 FOOD ORDER SYSTEM            ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

// Menu দেখাই
Console.WriteLine("📋 MENU:");
Console.WriteLine("------------------------");
Console.WriteLine("1. Pizza      - 350 tk");
Console.WriteLine("2. Burger     - 180 tk");
Console.WriteLine("3. Pasta      - 250 tk");
Console.WriteLine("4. Sandwich   - 120 tk");
Console.WriteLine("5. Fried Rice - 200 tk");
Console.WriteLine("------------------------\n");

// Order নেই
Console.Write("Enter item number: ");
int item = int.Parse(Console.ReadLine());

// Item এর নাম আর দাম বের করি
string itemName;
int itemPrice;

switch (item)
{
    case 1:
        itemName = "Pizza";
        itemPrice = 350;
        break;
    case 2:
        itemName = "Burger";
        itemPrice = 180;
        break;
    case 3:
        itemName = "Pasta";
        itemPrice = 250;
        break;
    case 4:
        itemName = "Sandwich";
        itemPrice = 120;
        break;
    case 5:
        itemName = "Fried Rice";
        itemPrice = 200;
        break;
    default:
        Console.WriteLine("\n❌ Invalid item number!");
        Console.WriteLine("Please select 1-5.");
        return;  // Program এখানেই শেষ
}

// Quantity নেই
Console.Write($"How many {itemName}? ");
int quantity = int.Parse(Console.ReadLine());

// Total calculate করি
int total = itemPrice * quantity;

// Bill দেখাই
Console.WriteLine("\n╔═══════════════════════════════════════╗");
Console.WriteLine("║            📃 YOUR BILL               ║");
Console.WriteLine("╠═══════════════════════════════════════╣");
Console.WriteLine($"║  Item:     {itemName,-26} ║");
Console.WriteLine($"║  Price:    {itemPrice,-26} ║");
Console.WriteLine($"║  Quantity: {quantity,-26} ║");
Console.WriteLine("╠═══════════════════════════════════════╣");
Console.WriteLine($"║  TOTAL:    {total} tk{"",-21} ║");
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
Console.WriteLine($"💳 Your current balance: {balance} tk\n");

// Menu দেখাই
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
        // Balance check
        Console.WriteLine("\n╔═══════════════════════════════╗");
        Console.WriteLine("║      💰 ACCOUNT BALANCE       ║");
        Console.WriteLine("╠═══════════════════════════════╣");
        Console.WriteLine($"║  Balance: {balance,-18} ║");
        Console.WriteLine("╚═══════════════════════════════╝");
        break;
        
    case 2:
        // Deposit
        Console.Write("\nEnter deposit amount: ");
        double depositAmount = double.Parse(Console.ReadLine());
        
        if (depositAmount > 0)
        {
            balance = balance + depositAmount;
            Console.WriteLine($"\n✅ Successfully deposited {depositAmount} tk");
            Console.WriteLine($"💰 New balance: {balance} tk");
        }
        else
        {
            Console.WriteLine("\n❌ Invalid amount! Please enter a positive number.");
        }
        break;
        
    case 3:
        // Withdraw
        Console.Write("\nEnter withdrawal amount: ");
        double withdrawAmount = double.Parse(Console.ReadLine());
        
        if (withdrawAmount <= 0)
        {
            Console.WriteLine("\n❌ Invalid amount! Please enter a positive number.");
        }
        else if (withdrawAmount > balance)
        {
            Console.WriteLine("\n❌ Insufficient balance!");
            Console.WriteLine($"Your current balance is {balance} tk");
        }
        else
        {
            balance = balance - withdrawAmount;
            Console.WriteLine($"\n✅ Successfully withdrawn {withdrawAmount} tk");
            Console.WriteLine($"💰 Remaining balance: {balance} tk");
        }
        break;
        
    case 4:
        // Exit
        Console.WriteLine("\n╔═══════════════════════════════╗");
        Console.WriteLine("║     👋 THANK YOU FOR USING    ║");
        Console.WriteLine("║          OUR ATM!             ║");
        Console.WriteLine("║       Have a nice day!        ║");
        Console.WriteLine("╚═══════════════════════════════╝");
        break;
        
    default:
        Console.WriteLine("\n❌ Invalid option!");
        Console.WriteLine("Please select 1-4.");
        break;
}
```

---

## Common Mistakes

### Mistake 1: break ভুলে যাওয়া

```csharp
// ❌ Error! break নেই
switch (x)
{
    case 1:
        Console.WriteLine("One");
        // break কই?
    case 2:
        Console.WriteLine("Two");
        break;
}

// ✅ Correct - সব case এ break আছে
switch (x)
{
    case 1:
        Console.WriteLine("One");
        break;
    case 2:
        Console.WriteLine("Two");
        break;
}
```

### Mistake 2: case এর পর colon (:) ভুলে যাওয়া

```csharp
// ❌ Error! colon নেই
switch (x)
{
    case 1
        Console.WriteLine("One");
        break;
}

// ✅ Correct - colon আছে
switch (x)
{
    case 1:
        Console.WriteLine("One");
        break;
}
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

// ✅ Range এর জন্য if-else use করো
if (marks >= 80)
{
    grade = "A+";
}
```

### Mistake 4: default না রাখা

```csharp
// ⚠️ default নেই - invalid input handle হবে না
switch (choice)
{
    case 1:
        Console.WriteLine("One");
        break;
    case 2:
        Console.WriteLine("Two");
        break;
}

// ✅ default রাখো
switch (choice)
{
    case 1:
        Console.WriteLine("One");
        break;
    case 2:
        Console.WriteLine("Two");
        break;
    default:
        Console.WriteLine("Invalid choice!");
        break;
}
```

---

## Summary

আজকে শিখলে:

| Concept | কাজ |
|---------|-----|
| switch | একটা variable এর exact value match করা |
| case | কোন value এ কী হবে |
| break | case থেকে বের হওয়া (দিতেই হবে!) |
| default | কিছু match না হলে (else এর মতো) |
| Multiple cases | একই কাজের জন্য cases group করা |
| switch expression | C# 8+ এর ছোট syntax |

**মনে রাখো:**
- প্রতিটা case এ break দিতে হবে
- case এর পর colon (:) দিতে হবে
- default সবসময় রাখো
- Range check এর জন্য switch না, if-else use করো
- string, int, char সব দিয়ে switch হয়

**switch vs if-else:**
- Exact value match → switch
- Range/Complex condition → if-else

**Next Part এ:** Loops শিখবো - for, while, do-while দিয়ে কীভাবে একই কাজ বারবার করা যায়।

---

*CPS Academy - Learn. Code. Grow.*
