---
title: "Lesson 5.7: Practice & Assignments — সব Loops মিলিয়ে Real Programs"
date: "2026-05-13"
excerpt: "ATM System, Multiplication Table Generator, Pattern Menu এবং নিজে solve করার Assignments (Number Guessing, FizzBuzz, Diamond)"
categories:
  - C# Course Scripts
tags:
  - csharp
  - practice
  - assignments
  - loops
draft: false
---

# Lesson 5.7: Practice & Assignments

> **এই Lesson এ দেখবে:** সব loops এর সব concepts মিলিয়ে real programs — Solved examples (ATM, Multiplication Table, Pattern Menu), এবং নিজে solve করার Assignments (Number Guessing Game, FizzBuzz, Diamond Pattern)।

---

## Solved Example 1: ATM System

সব loops, conditionals, operators মিলিয়ে:

```csharp
double balance = 10000;
int choice;

do
{
    Console.WriteLine("\n╔═══════════════════════════════╗");
    Console.WriteLine("║        🏧 ATM MENU            ║");
    Console.WriteLine("╠═══════════════════════════════╣");
    Console.WriteLine("║  1. Check Balance             ║");
    Console.WriteLine("║  2. Deposit Money             ║");
    Console.WriteLine("║  3. Withdraw Money            ║");
    Console.WriteLine("║  4. Exit                      ║");
    Console.WriteLine("╚═══════════════════════════════╝");

    Console.Write("Choice: ");
    choice = int.Parse(Console.ReadLine());

    switch (choice)
    {
        case 1:
            Console.WriteLine($"💰 Current balance: {balance} tk");
            break;

        case 2:
            Console.Write("Deposit amount: ");
            double dep = double.Parse(Console.ReadLine());
            if (dep > 0)
            {
                balance += dep;
                Console.WriteLine($"✅ Deposited {dep} tk!");
                Console.WriteLine($"💰 New balance: {balance} tk");
            }
            else
            {
                Console.WriteLine("❌ Invalid amount!");
            }
            break;

        case 3:
            Console.Write("Withdraw amount: ");
            double wit = double.Parse(Console.ReadLine());
            if (wit <= 0)
            {
                Console.WriteLine("❌ Invalid amount!");
            }
            else if (wit > balance)
            {
                Console.WriteLine("❌ Insufficient balance!");
            }
            else
            {
                balance -= wit;
                Console.WriteLine($"✅ Withdrawn {wit} tk!");
                Console.WriteLine($"💰 New balance: {balance} tk");
            }
            break;

        case 4:
            Console.WriteLine("👋 Thank you! Goodbye!");
            break;

        default:
            Console.WriteLine("❌ Invalid choice!");
            break;
    }
} while (choice != 4);
```

### কী কী use হলো?

- **do-while** — Menu অন্তত একবার দেখাতে হবে
- **switch** — Choice match
- **if-else** — Balance, amount validation
- **Arithmetic operators** — balance calculation

---

## Solved Example 2: Multiplication Table Generator

যেকোনো number এর table, যেকোনো range পর্যন্ত:

```csharp
Console.Write("Which number's table? ");
int num = int.Parse(Console.ReadLine());

Console.Write("Up to which number? ");
int limit = int.Parse(Console.ReadLine());

Console.WriteLine($"\n--- {num} এর নামতা ({limit} পর্যন্ত) ---\n");

for (int i = 1; i <= limit; i++)
{
    int result = num * i;
    Console.WriteLine($"{num} × {i,3} = {result,5}");
}
```

User 7 আর 12 দিলে:
```
--- 7 এর নামতা (12 পর্যন্ত) ---

7 ×   1 =     7
7 ×   2 =    14
7 ×   3 =    21
...
7 ×  12 =    84
```

**for loop + alignment formatting!**

---

## Solved Example 3: Pattern Menu System

User কোন pattern চায় choose করবে, rows select করবে:

```csharp
int choice;

do
{
    Console.WriteLine("\n⭐ PATTERN GENERATOR");
    Console.WriteLine("1. Right Triangle");
    Console.WriteLine("2. Inverted Triangle");
    Console.WriteLine("3. Rectangle");
    Console.WriteLine("4. Number Triangle");
    Console.WriteLine("5. Exit");

    Console.Write("Choice: ");
    choice = int.Parse(Console.ReadLine());

    if (choice == 5) break;

    if (choice < 1 || choice > 5)
    {
        Console.WriteLine("❌ Invalid!");
        continue;
    }

    Console.Write("How many rows? ");
    int rows = int.Parse(Console.ReadLine());
    Console.WriteLine();

    switch (choice)
    {
        case 1:  // Right Triangle
            for (int i = 1; i <= rows; i++)
            {
                for (int j = 1; j <= i; j++)
                    Console.Write("* ");
                Console.WriteLine();
            }
            break;

        case 2:  // Inverted Triangle
            for (int i = rows; i >= 1; i--)
            {
                for (int j = 1; j <= i; j++)
                    Console.Write("* ");
                Console.WriteLine();
            }
            break;

        case 3:  // Rectangle
            for (int i = 1; i <= rows; i++)
            {
                for (int j = 1; j <= rows; j++)
                    Console.Write("* ");
                Console.WriteLine();
            }
            break;

        case 4:  // Number Triangle
            for (int i = 1; i <= rows; i++)
            {
                for (int j = 1; j <= i; j++)
                    Console.Write($"{j} ");
                Console.WriteLine();
            }
            break;
    }
} while (true);

Console.WriteLine("\n👋 Goodbye!");
```

### কী কী use হলো?

- **do-while** — Menu system
- **switch** — Pattern choice
- **break** — Exit condition
- **continue** — Invalid input skip
- **Nested for** — Patterns
- **if-else** — Validation

---

## Assignment 1: Number Guessing Game 🎮

**তোমার কাজ:**

1. Computer 1-100 এর মধ্যে random একটা number ভাববে
2. User guess করবে
3. প্রতি guess এ বলবে "Too high" বা "Too low"
4. সঠিক হলে কত attempts লেগেছে বলবে
5. "Play again?" জিজ্ঞেস করবে

**যা use করবে:**
- `Random` class: `Random rand = new Random(); int secret = rand.Next(1, 101);`
- `while` loop guess এর জন্য
- `do-while` play again এর জন্য
- `if-else if-else`
- `break` বা counter

**Hint structure:**

```csharp
do
{
    // Generate secret number
    // Inner loop: take guesses
    while (guess != secret) { ... }

    // Play again?
    Console.Write("Play again? (y/n): ");
    // ...
} while (playAgain == "y");
```

---

## Assignment 2: FizzBuzz 🎯

**একটি Classic programming problem!**

**তোমার কাজ:**

1 থেকে 100 পর্যন্ত print করো:
- 3 এর গুণিতক হলে → "Fizz"
- 5 এর গুণিতক হলে → "Buzz"
- **দুইটারই গুণিতক** হলে (15 এর গুণিতক) → "FizzBuzz"
- নাহলে → number টা print করো

**Example output:**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
...
```

**যা use করবে:**
- `for` loop (1 থেকে 100)
- `if-else if-else`
- `%` operator (divisibility check)

**Tricky part:** "FizzBuzz" কখন? 15 এর গুণিতক — এই check **আগে** করতে হবে!

---

## Assignment 3: Diamond Pattern ◆

**তোমার কাজ:**

User একটা number দেবে (n)। একটা diamond pattern print করবে:

**Example (n=5):**

```
    *
   * *
  * * *
 * * * *
* * * * *
 * * * *
  * * *
   * *
    *
```

**Structure:**
- **উপরের অর্ধেক:** Right triangle যেটা center এ aligned
- **নিচের অর্ধেক:** Inverted triangle center এ aligned

**Hints:**

1. উপরের অর্ধেক:
```
for (int i = 1; i <= n; i++) {
    // spaces for alignment: (n - i) spaces
    // stars: i টা star
}
```

2. নিচের অর্ধেক:
```
for (int i = n-1; i >= 1; i--) {
    // spaces: (n - i) spaces
    // stars: i টা star
}
```

**Challenge:** Space আর Star calculation ঠিকমতো করতে হবে!

---

## Module 5 Complete! 🎉

**এই Module এ শিখলে:**

| Concept | মানে |
|---------|------|
| **while** | শর্ত true থাকলে চলো |
| **for** | কতবার জানলে |
| **do-while** | অন্তত ১ বার |
| **break** | Loop থেকে বের হও |
| **continue** | Skip করো |
| **Nested loops** | Pattern printing |

**Real programs যা বানাতে পারো:**
- Calculator with menu
- Password retry system
- Number guessing game
- Multiplication table
- Star patterns
- ATM system
- Input validation
- Any repetitive task!

**Loop ছাড়া programming এ এক পাও এগোনো যায় না!**

---

**পরের Module:** Arrays — অনেকগুলো data এক সাথে রাখা!

---

*CPS Academy - Learn. Code. Grow.*
