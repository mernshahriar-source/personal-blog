---
title: "Lesson 7.3: Stack<T> — Last In First Out (LIFO)"
date: "2026-03-27"
excerpt: "Stack কী ও LIFO concept, Push/Pop/Peek, Count, Contains, real-world examples (Undo, Browser Back, Balanced Parentheses), এবং Stack vs List"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - collections
  - list
  - dictionary
  - stack
  - queue
draft: false
---


> **এই Lesson এ শিখবে:** Stack কী ও LIFO concept, Push/Pop/Peek, Count, Contains, real-world examples (Undo, Browser Back, Balanced Parentheses), এবং Stack vs List।

---

## Stack কী?

রেস্টুরেন্টে থালা রাখার মতো:

```
    ┌─────┐
    │  D  │ ← সবার পরে রাখা (Top)
    ├─────┤
    │  C  │
    ├─────┤
    │  B  │
    ├─────┤
    │  A  │ ← সবার আগে রাখা (Bottom)
    └─────┘
```

**কোনটা আগে নেবে?** উপর থেকে — **D**!

**LIFO = Last In, First Out** — যেটা সবার পরে রাখা, সেটা সবার আগে বের হয়।

---

## Real Life এ Stack

| Example | LIFO কেন |
|---------|----------|
| থালার stack | উপরেরটা আগে নাও |
| Ctrl+Z (Undo) | শেষ action আগে undo |
| Browser Back | শেষ page এ আগে ফেরো |
| Function Call Stack | শেষ function আগে return |

---

## Stack তৈরি করা

```csharp
Stack<string> plates = new Stack<string>();
```

---

## Push() — Stack এ রাখো (উপরে)

```csharp
Stack<string> stack = new Stack<string>();

stack.Push("A");   // [A]
stack.Push("B");   // [B, A]
stack.Push("C");   // [C, B, A]
stack.Push("D");   // [D, C, B, A]
```

```
Push("A"):  Push("B"):  Push("C"):  Push("D"):
┌───┐       ┌───┐       ┌───┐       ┌───┐
│ A │       │ B │       │ C │       │ D │ ← Top
└───┘       ├───┤       ├───┤       ├───┤
            │ A │       │ B │       │ C │
            └───┘       ├───┤       ├───┤
                        │ A │       │ B │
                        └───┘       ├───┤
                                    │ A │
                                    └───┘
```

---

## Pop() — Stack থেকে নাও (উপর থেকে)

```csharp
string top = stack.Pop();  // "D" (D বের হলো)
// Stack: [C, B, A]

top = stack.Pop();         // "C"
// Stack: [B, A]
```

**⚠️ খালি Stack এ Pop() করলে Error!** আগে `Count > 0` check করো।

---

## Peek() — দেখো কিন্তু নিও না

```csharp
// Stack: [C, B, A]

string look = stack.Peek();  // "C" (দেখলাম)
// Stack still: [C, B, A] (বের করিনি!)
```

---

## Count ও Contains

```csharp
Console.WriteLine(stack.Count);          // কয়টা আছে
Console.WriteLine(stack.Contains("B"));  // true
```

---

## Example: Undo Feature ↩️

```csharp
Stack<string> actions = new Stack<string>();

// User কাজ করছে
actions.Push("Type 'Hello'");
actions.Push("Type ' World'");
actions.Push("Delete 'd'");
actions.Push("Type '!'");

Console.WriteLine($"Actions: {actions.Count}");

// Ctrl+Z — Undo!
while (actions.Count > 0)
{
    string undone = actions.Pop();
    Console.WriteLine($"↩️ Undo: {undone}");
}
```

Output:
```
Actions: 4
↩️ Undo: Type '!'
↩️ Undo: Delete 'd'
↩️ Undo: Type ' World'
↩️ Undo: Type 'Hello'
```

শেষের action আগে undo — LIFO!

---

## Example: Browser Back Button 🔙

```csharp
Stack<string> history = new Stack<string>();

// Websites visit
history.Push("google.com");
history.Push("facebook.com");
history.Push("youtube.com");
history.Push("github.com");

Console.WriteLine($"Current: {history.Peek()}");

// Back button!
history.Pop();
Console.WriteLine($"Back → {history.Peek()}");  // youtube.com

history.Pop();
Console.WriteLine($"Back → {history.Peek()}");  // facebook.com
```

---

## Example: String Reverse

```csharp
static string ReverseString(string input)
{
    Stack<char> stack = new Stack<char>();

    foreach (char c in input)
        stack.Push(c);

    string result = "";
    while (stack.Count > 0)
        result += stack.Pop();

    return result;
}

Console.WriteLine(ReverseString("Hello"));  // "olleH"
```

---

## Example: Balanced Parentheses ✅❌

`"(())"` ✅ balanced, `"(()"` ❌ not balanced

```csharp
static bool IsBalanced(string input)
{
    Stack<char> stack = new Stack<char>();

    foreach (char c in input)
    {
        if (c == '(') stack.Push(c);
        else if (c == ')')
        {
            if (stack.Count == 0) return false;
            stack.Pop();
        }
    }

    return stack.Count == 0;
}

Console.WriteLine(IsBalanced("(())"));    // True
Console.WriteLine(IsBalanced("(()"));     // False
Console.WriteLine(IsBalanced("()()()"));  // True
```

---

## All Methods — Quick Reference

| Method/Property | কাজ |
|-----------------|-----|
| `Push(item)` | উপরে রাখো |
| `Pop()` | উপর থেকে নাও (remove) |
| `Peek()` | উপরেরটা দেখো (remove না) |
| `Count` | কয়টা আছে |
| `Contains(item)` | আছে কিনা |
| `Clear()` | সব মুছো |
| `ToArray()` | Array তে convert |

---

## Summary

**Stack = LIFO (Last In, First Out)**
- **Push** = উপরে রাখো
- **Pop** = উপর থেকে নাও
- **Peek** = দেখো কিন্তু নিও না

**মনে রাখো:**
- খালি Stack এ `Pop()`/`Peek()` → Error! আগে `Count > 0` check করো
- থালার stack মনে রাখো — উপরে রাখো, উপর থেকে নাও!

---

**পরের Lesson:** Queue\<T\> ও HashSet\<T\> — FIFO এবং Unique Collections।

---

*CPS Academy - Learn. Code. Grow.*
