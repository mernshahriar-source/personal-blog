---
title: "Lesson 5.3: break ও continue — Loop Control"
date: "2026-05-09"
excerpt: "break দিয়ে loop থেকে বের হওয়া, continue দিয়ে iteration skip, Menu System এবং Common Mistakes"
categories:
  - C# Course Scripts
tags:
  - csharp
  - break
  - continue
  - loops
draft: false
---

# Lesson 5.3: break ও continue — Loop Control

> **এই Lesson এ শিখবে:** break কী ও কখন use করবে, 3 টা real break examples, continue কী ও কখন, continue examples, break vs continue পার্থক্য, Real menu system, এবং Common Mistakes।

---

## break কেন দরকার?

আগের lesson এ আমরা শিখেছি — loop এর condition false হলে loop শেষ হয়।

কিন্তু কখনো কখনো **condition true থাকলেও** আমরা loop থেকে বের হতে চাই!

### Real Example:

ধরো তুমি একটা bag এ 100 টা চকলেট খুঁজছো — কিন্তু একটা **বিশেষ চকলেট** খুঁজছো। সেটা পেয়ে গেলে কি তুমি বাকি 99 টা check করবে? না! পেলেই বের হয়ে যাবে।

এই "পেলেই বের হয়ে যাও" = **break**!

---

## break Statement

`break` মানে **"এখনই loop থেকে বের হয়ে যাও!"**

Condition true থাকলেও break পেলে loop সাথে সাথে শেষ।

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

---

## break Example 1: নির্দিষ্ট সংখ্যায় থামো

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
...
49
50
Stopping at 50!
Loop ended.
```

**`i <= 100` এখনো true, কিন্তু break পেলে loop শেষ!**

---

## break Example 2: User "exit" লিখলে থামো

এটা real application এ অনেক use হয়:

```csharp
Console.WriteLine("Type anything. Type 'exit' to quit.\n");

while (true)  // Infinite loop!
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

### কী হচ্ছে?

- `while (true)` = infinite loop (কখনো নিজে থেকে শেষ হবে না)
- কিন্তু user "exit" লিখলেই break → loop শেষ!
- এই pattern **চ্যাট bot, menu system, game** এ অনেক use হয়

---

## break Example 3: First Negative Number এ থামো

User একের পর এক number দেবে। যখন negative দেবে, থামো:

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

continue মানে **"এই round টা skip করো, পরের round এ যাও!"**

break পুরো loop থেকে বের করে দেয়, কিন্তু continue শুধু **বর্তমান iteration skip** করে — loop চলতেই থাকে।

### Syntax:

```csharp
while (condition)
{
    update;

    if (someCondition)
    {
        continue;  // এই round skip, পরের round এ যাও
    }

    // continue পেলে এই code চলবে না
    Console.WriteLine(...);
}
```

---

## continue Example 1: শুধু Even Numbers Print

1 থেকে 10 এর মধ্যে শুধু জোড় numbers:

```csharp
int i = 0;

while (i < 10)
{
    i = i + 1;

    if (i % 2 != 0)  // বিজোড় হলে
    {
        continue;  // skip!
    }

    Console.WriteLine(i);  // শুধু জোড় এখানে আসবে
}
```

Output:
```
2
4
6
8
10
```

**বিজোড় numbers skip হলো, কিন্তু loop থামেনি!**

---

## continue Example 2: Negative Numbers Skip

একটা list এ positive numbers এর sum বের করো, negative skip করো:

```csharp
int[] numbers = { 5, -3, 8, -1, 10, -7, 3 };
int sum = 0;
int i = 0;

while (i < numbers.Length)
{
    if (numbers[i] < 0)
    {
        i = i + 1;
        continue;  // negative skip
    }

    sum = sum + numbers[i];
    i = i + 1;
}

Console.WriteLine($"Sum of positives: {sum}");  // 26
```

---

## continue Example 3: Divisible by 3 Skip

1-20, কিন্তু 3 এর গুণিতক skip:

```csharp
int i = 0;

while (i < 20)
{
    i = i + 1;

    if (i % 3 == 0)
    {
        continue;
    }

    Console.Write(i + " ");
}
```

Output: `1 2 4 5 7 8 10 11 13 14 16 17 19 20`

(3, 6, 9, 12, 15, 18 নেই!)

---

## break vs continue — পার্থক্য

| | break | continue |
|---|-------|----------|
| কী করে | Loop **শেষ** করে, বের হয়ে যায় | Current iteration **skip**, পরেরটায় যায় |
| Loop চলে? | **না**, বের হয়ে যায় | **হ্যাঁ**, চলতে থাকে |
| কখন use | "পেয়ে গেছি, আর দরকার নেই" | "এটা চাই না, পরেরটা দেখি" |

### Side by Side:

```csharp
// break — 5 পেলেই থামো
int i = 0;
while (i < 10)
{
    i++;
    if (i == 5) break;  // থামো!
    Console.Write(i + " ");  // 1 2 3 4
}
// Output: 1 2 3 4

// continue — 5 skip করো, বাকি চলুক
int i = 0;
while (i < 10)
{
    i++;
    if (i == 5) continue;  // skip!
    Console.Write(i + " ");
}
// Output: 1 2 3 4 6 7 8 9 10
```

---

## Complete Example: Menu System

`while (true)` + `break` দিয়ে menu:

```csharp
while (true)
{
    Console.WriteLine("\n📋 MENU");
    Console.WriteLine("1. Say Hello");
    Console.WriteLine("2. Say Goodbye");
    Console.WriteLine("3. About");
    Console.WriteLine("4. Exit");
    Console.Write("Choice: ");

    int choice = int.Parse(Console.ReadLine());

    if (choice == 4)
    {
        Console.WriteLine("👋 Bye!");
        break;  // Exit menu
    }

    if (choice == 1)
        Console.WriteLine("Hello! 👋");
    else if (choice == 2)
        Console.WriteLine("Goodbye! 👋");
    else if (choice == 3)
        Console.WriteLine("CPS Academy C# Course");
    else
        Console.WriteLine("❌ Invalid choice!");
}

Console.WriteLine("Program ended.");
```

---

## Common Mistakes

### ❌ Mistake 1: continue এর পর update ভুলে যাওয়া

```csharp
int i = 0;
while (i < 10)
{
    if (i == 5)
    {
        continue;  // ❌ i++ skip হচ্ছে! Infinite loop at i=5!
    }
    Console.WriteLine(i);
    i++;
}
```

**Fix:** continue এর আগে update করো:

```csharp
int i = 0;
while (i < 10)
{
    i++;  // ✅ continue এর আগে update
    if (i == 5) continue;
    Console.WriteLine(i);
}
```

### ❌ Mistake 2: break vs continue গুলিয়ে ফেলা

```csharp
// "5 আসলে skip করতে চাই"
if (i == 5) break;     // ❌ এটা loop শেষ করে দেবে!
if (i == 5) continue;  // ✅ এটা শুধু 5 skip করবে
```

---

## Summary

| Keyword | কাজ | কখন |
|---------|-----|------|
| `break` | Loop শেষ | "পেলাম, আর দরকার নেই" |
| `continue` | এই iteration skip | "এটা ছাড়ো, পরেরটা দেখি" |

**মনে রাখো:**
- `break` = **"থামো, আর চলো না"**
- `continue` = **"এটা ছাড়ো, পরেরটা দেখো"**
- `while (true)` + `break` = common pattern (menu, chat, game)
- continue এর আগে update করো — না হলে infinite loop!

---

**পরের Lesson:** for Loop — কতবার চলবে জানলে for!

---

*CPS Academy - Learn. Code. Grow.*
