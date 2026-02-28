---
title: "Lesson 6.4: Recursion — নিজেকে নিজে Call করা"
date: "2026-03-24"
excerpt: "Recursion কী, Call Stack, Base Case ও Recursive Case, Print before vs after, Factorial, Fibonacci, Power, Sum of Array, String Reverse, Stack Overflow, এবং Recursion vs Loop তুলন�"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - methods
  - functions
  - strings
draft: false
---


> **এই Lesson এ শিখবে:** Recursion কী, Call Stack, Base Case ও Recursive Case, Print before vs after, Factorial, Fibonacci, Power, Sum of Array, String Reverse, Stack Overflow, এবং Recursion vs Loop তুলনা।

---

## Recursion কী?

**Recursion** মানে একটা method **নিজেকেই call করে।**

```csharp
static void F()
{
    Console.WriteLine("Hello");
    F();  // নিজেকে নিজে call!
}
```

কিন্তু এটা **চিরকাল চলবে!** কারণ থামার কোনো condition নেই → **Stack Overflow Error!**

---

## Base Case — থামার Condition

প্রতিটা Recursion এ দুইটা part:

| Part | কাজ |
|------|-----|
| **Base Case** | থামার condition (আর call করো না) |
| **Recursive Case** | নিজেকে call করো (ছোট input দিয়ে) |

```csharp
static void Countdown(int n)
{
    // Base Case — থামো!
    if (n <= 0)
    {
        Console.WriteLine("Blast off! 🚀");
        return;
    }

    Console.WriteLine(n);

    // Recursive Case — ছোট করে call
    Countdown(n - 1);
}

Countdown(5);
```

Output: `5 4 3 2 1 Blast off! 🚀`

### Step by Step:

```
Countdown(5) → print 5 → Countdown(4)
  Countdown(4) → print 4 → Countdown(3)
    Countdown(3) → print 3 → Countdown(2)
      Countdown(2) → print 2 → Countdown(1)
        Countdown(1) → print 1 → Countdown(0)
          Countdown(0) → BASE CASE! → "Blast off!" → return
        return
      return
    return
  return
return
```

---

## Call Stack

প্রতিটা call একটা "machine" তৈরি করে stack এ:

```
Countdown(0)  ← top (সবার পরে এসেছে)
Countdown(1)
Countdown(2)
Countdown(3)
Countdown(4)
Countdown(5)  ← bottom (সবার আগে এসেছে)
```

Base Case হলে top থেকে একে একে return হয় — **LIFO (Last In, First Out)**।

---

## Print Before vs After

### Before (সোজা order):

```csharp
static void PrintBefore(int n)
{
    if (n <= 0) return;
    Console.WriteLine(n);     // আগে print
    PrintBefore(n - 1);       // তারপর call
}

PrintBefore(3);  // Output: 3 2 1
```

### After (উল্টা order — Backtracking):

```csharp
static void PrintAfter(int n)
{
    if (n <= 0) return;
    PrintAfter(n - 1);        // আগে call
    Console.WriteLine(n);     // return এর সময় print
}

PrintAfter(3);  // Output: 1 2 3
```

**Print আগে** = সোজা, **Print পরে** = উল্টা (backtracking)!

---

## Classic Example 1: Factorial (n!)

5! = 5 × 4 × 3 × 2 × 1 = 120

```csharp
static int Factorial(int n)
{
    if (n <= 1) return 1;       // Base Case
    return n * Factorial(n - 1); // Recursive Case
}

Console.WriteLine(Factorial(5));  // 120
```

### কীভাবে কাজ করে:

```
Factorial(5) = 5 × Factorial(4)
             = 5 × 4 × Factorial(3)
             = 5 × 4 × 3 × Factorial(2)
             = 5 × 4 × 3 × 2 × Factorial(1)
             = 5 × 4 × 3 × 2 × 1
             = 120
```

---

## Classic Example 2: Fibonacci

0, 1, 1, 2, 3, 5, 8, 13, 21... (প্রতিটা সংখ্যা = আগের দুইটার যোগ)

```csharp
static int Fibonacci(int n)
{
    if (n <= 0) return 0;       // Base Case 1
    if (n == 1) return 1;       // Base Case 2
    return Fibonacci(n - 1) + Fibonacci(n - 2);  // Recursive
}

for (int i = 0; i < 10; i++)
    Console.Write(Fibonacci(i) + " ");
// Output: 0 1 1 2 3 5 8 13 21 34
```

**⚠️ Fibonacci recursion slow!** বড় n এ same calculation বারবার হয়। Loop ভালো।

---

## Classic Example 3: Power (x^n)

```csharp
static int Power(int baseNum, int exp)
{
    if (exp == 0) return 1;     // Base Case: x^0 = 1
    return baseNum * Power(baseNum, exp - 1);
}

Console.WriteLine(Power(2, 10));  // 1024
Console.WriteLine(Power(3, 4));   // 81
```

---

## Classic Example 4: Sum of Array

```csharp
static int SumArray(int[] arr, int index)
{
    if (index >= arr.Length) return 0;  // Base Case
    return arr[index] + SumArray(arr, index + 1);
}

int[] nums = { 10, 20, 30, 40, 50 };
Console.WriteLine(SumArray(nums, 0));  // 150
```

---

## Real Example: String Reverse

```csharp
static string Reverse(string s)
{
    if (s.Length <= 1) return s;  // Base Case
    return Reverse(s.Substring(1)) + s[0];
}

Console.WriteLine(Reverse("Hello"));  // "olleH"
Console.WriteLine(Reverse("CPS"));    // "SPC"
```

---

## Real Example: Palindrome Check

```csharp
static bool IsPalindrome(string s)
{
    if (s.Length <= 1) return true;
    if (s[0] != s[s.Length - 1]) return false;
    return IsPalindrome(s.Substring(1, s.Length - 2));
}

Console.WriteLine(IsPalindrome("madam"));   // True
Console.WriteLine(IsPalindrome("hello"));   // False
Console.WriteLine(IsPalindrome("racecar")); // True
```

---

## Real Example: GCD (Greatest Common Divisor)

```csharp
static int GCD(int a, int b)
{
    if (b == 0) return a;
    return GCD(b, a % b);
}

Console.WriteLine(GCD(48, 18));  // 6
Console.WriteLine(GCD(100, 75)); // 25
```

---

## Stack Overflow! ⚠️

Base Case না থাকলে বা ছোট না হলে:

```csharp
// ❌ Base Case নেই!
static void Bad() { Bad(); }  // Stack Overflow!

// ❌ ছোট হচ্ছে না!
static void Bad2(int n)
{
    if (n == 0) return;
    Bad2(n);  // n same আছে!  Stack Overflow!
}
```

**Solution:** প্রতিটা call এ problem **ছোট** হতে হবে, আর Base Case **থাকতেই হবে**।

---

## Recursion vs Loop

| Feature | Recursion | Loop |
|---------|-----------|------|
| পড়তে সুবিধা | Complex problems এ সহজ | Simple problems এ সহজ |
| Performance | Stack memory use করে | Stack use করে না |
| Stack Overflow | Risk আছে | Risk নেই |
| Use case | Tree, divide & conquer | Simple repetition |

**সাধারণ নিয়ম:**
- Loop দিয়ে সহজে হলে → **Loop** use করো
- Tree/hierarchical problem → **Recursion** ভালো
- খুব deep recursion → **Loop better** (Stack Overflow এড়াতে)

---

## Classic Examples — Quick Reference

| Problem | Base Case | Recursive Case |
|---------|-----------|----------------|
| Factorial | n ≤ 1 → 1 | n × Factorial(n-1) |
| Fibonacci | n ≤ 1 → n | Fib(n-1) + Fib(n-2) |
| Power | exp == 0 → 1 | base × Power(base, exp-1) |
| Sum Array | index ≥ Length → 0 | arr[i] + Sum(arr, i+1) |
| Reverse | Length ≤ 1 → s | Reverse(rest) + first |
| Palindrome | Length ≤ 1 → true | first==last && IsPal(mid) |
| GCD | b == 0 → a | GCD(b, a%b) |

---

## Summary

| Concept | মানে |
|---------|------|
| Recursion | Method নিজেকে call করে |
| Base Case | থামার condition |
| Recursive Case | ছোট input দিয়ে নিজেকে call |
| Call Stack | Function calls এর stack (LIFO) |
| Backtracking | Return এর সময় কাজ করা |

**মনে রাখো:**
- Base Case **অবশ্যই** থাকতে হবে — না থাকলে Stack Overflow!
- প্রতিটা call এ problem **ছোট** হতে হবে
- Print আগে = সোজা order, Print পরে = উল্টা order
- Loop দিয়ে সহজে হলে Loop use করো

---

**Module 6 Complete!** 🎉 পরের Module: OOP — Class ও Object দিয়ে programming!

---

*CPS Academy - Learn. Code. Grow.*
