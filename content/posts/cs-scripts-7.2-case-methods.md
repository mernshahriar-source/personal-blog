---
title: "Lesson 7.2: Case Methods — ToUpper, ToLower"
date: "2026-05-25"
excerpt: "ToUpper/ToLower, Case-insensitive comparison, Email normalization, Username validation এবং Command Parser"
categories:
  - C# Course Scripts
tags:
  - csharp
  - strings
  - case-methods
draft: false
---

# Lesson 7.2: Case Methods — ToUpper, ToLower

> **এই Lesson এ শিখবে:** ToUpper() — সব uppercase, ToLower() — সব lowercase, Case-insensitive comparison, Username validation, Email normalization, এবং real-world examples।

---

## Case কেন Important?

অনেক situation এ case matter করে:

```csharp
// User input compare
string input = "YES";
bool isYes = input == "yes";  // False! 😱

// Email check
string email1 = "Rahim@Gmail.com";
string email2 = "rahim@gmail.com";
bool same = email1 == email2;  // False!
// আসলে দুইটা same email কিন্তু!
```

**Solution: Case normalize করো!**

---

## ToUpper() — সব Uppercase

সব characters কে **বড় হাতের** করে:

```csharp
string name = "Rahim";
string upper = name.ToUpper();

Console.WriteLine(upper);  // RAHIM
```

### Examples:

```csharp
Console.WriteLine("hello".ToUpper());         // HELLO
Console.WriteLine("Hello World".ToUpper());   // HELLO WORLD
Console.WriteLine("RaHiM UdDiN".ToUpper());   // RAHIM UDDIN
Console.WriteLine("123abc".ToUpper());        // 123ABC (numbers unchanged)
```

**Original change হয় না — নতুন string return!**

```csharp
string name = "rahim";
name.ToUpper();  // নতুন string ignore!
Console.WriteLine(name);  // rahim (unchanged)

// ✅ সঠিক ভাবে
name = name.ToUpper();  // নতুন string assign করো
Console.WriteLine(name);  // RAHIM
```

---

## ToLower() — সব Lowercase

সব characters কে **ছোট হাতের** করে:

```csharp
string name = "RAHIM";
string lower = name.ToLower();

Console.WriteLine(lower);  // rahim
```

### Examples:

```csharp
Console.WriteLine("HELLO".ToLower());       // hello
Console.WriteLine("Hello World".ToLower()); // hello world
Console.WriteLine("CPS Academy".ToLower()); // cps academy
```

---

## Case-Insensitive Comparison

**Big use case: input comparison!**

```csharp
Console.Write("Continue? (yes/no): ");
string input = Console.ReadLine();

// ❌ Bad — user YES, Yes, yes, YeS কোনটাই match হবে না
if (input == "yes") { ... }

// ✅ Good — সব case match করবে
if (input.ToLower() == "yes") { ... }
```

### Example: Yes/No Check

```csharp
Console.Write("Continue? (y/n): ");
string input = Console.ReadLine().ToLower();

if (input == "y" || input == "yes")
{
    Console.WriteLine("Continuing...");
}
else
{
    Console.WriteLine("Stopping.");
}
```

User "Y", "y", "Yes", "YES" — সব কাজ করবে!

---

## Email Normalization

Email technically case-insensitive — "Rahim@Gmail.com" আর "rahim@gmail.com" same:

```csharp
string email1 = "Rahim@Gmail.com";
string email2 = "rahim@gmail.com";

// Normalize
string normalized1 = email1.ToLower();
string normalized2 = email2.ToLower();

if (normalized1 == normalized2)
    Console.WriteLine("✅ Same email!");  // ✅
else
    Console.WriteLine("❌ Different!");
```

**Rule:** Email database এ সবসময় ToLower() করে save করো!

---

## Username Validation

```csharp
Console.Write("Username: ");
string username = Console.ReadLine().ToLower().Trim();

// Database এ এভাবে save
Console.WriteLine($"Saved as: {username}");

// Comparison
string registered = "admin";
if (username == registered)
    Console.WriteLine("✅ User found!");
```

---

## Real Example: Command Parser

```csharp
Console.Write("Command: ");
string command = Console.ReadLine().ToLower().Trim();

switch (command)
{
    case "start":
    case "begin":
        Console.WriteLine("🚀 Starting...");
        break;
    case "stop":
    case "exit":
    case "quit":
        Console.WriteLine("👋 Stopping...");
        break;
    case "help":
        Console.WriteLine("📖 Showing help...");
        break;
    default:
        Console.WriteLine("❌ Unknown command!");
        break;
}
```

User "START", "Start", "start", "StArT" — সব কাজ করবে!

---

## Grade Menu Example

```csharp
Console.Write("Enter grade (A/B/C/D/F): ");
string input = Console.ReadLine().ToUpper().Trim();

switch (input)
{
    case "A": Console.WriteLine("🌟 Excellent!"); break;
    case "B": Console.WriteLine("👍 Good!"); break;
    case "C": Console.WriteLine("📝 Average"); break;
    case "D": Console.WriteLine("⚠️ Below average"); break;
    case "F": Console.WriteLine("❌ Failed!"); break;
    default: Console.WriteLine("Invalid!"); break;
}
```

---

## Combining with Other Methods

```csharp
string messyInput = "   HeLLo World   ";

// Trim + ToLower
string clean = messyInput.Trim().ToLower();
Console.WriteLine($"'{clean}'");  // 'hello world'

// Chain করা যায়!
```

**Methods chain করা যায় — একটার পর একটা!**

---

## Special Case: First Letter Capital

First letter uppercase, rest lowercase (Title Case):

```csharp
string name = "rAHIM";

// Manual way
string titleCase = char.ToUpper(name[0]) + name.Substring(1).ToLower();
Console.WriteLine(titleCase);  // Rahim
```

`Substring` পরের lesson এ শিখবো।

---

## Common Mistakes

### ❌ Mistake 1: Original change হবে আশা করা

```csharp
string name = "rahim";
name.ToUpper();  // ❌ effect নেই!
Console.WriteLine(name);  // rahim

// ✅ Assign করো
name = name.ToUpper();
```

### ❌ Mistake 2: Case-sensitive comparison

```csharp
if (input == "yes") { ... }  // ❌ YES, Yes, yes match করবে না!
if (input.ToLower() == "yes") { ... }  // ✅
```

### ❌ Mistake 3: null এ call

```csharp
string name = null;
name.ToUpper();  // ❌ NullReferenceException!
```

---

## Summary

| Method | কাজ | Example |
|--------|-----|---------|
| **ToUpper()** | সব uppercase | `"hello".ToUpper()` → `"HELLO"` |
| **ToLower()** | সব lowercase | `"HELLO".ToLower()` → `"hello"` |

**মনে রাখো:**
- Original **change হয় না** — নতুন string return
- User input → **ToLower()** করে compare
- Email → ToLower() করে save
- Grade code → ToUpper() করে compare
- **Chain** করা যায়: `input.Trim().ToLower()`

---

**পরের Lesson:** Whitespace Methods — Trim, IsNullOrEmpty দিয়ে cleanup!

---

*CPS Academy - Learn. Code. Grow.*
