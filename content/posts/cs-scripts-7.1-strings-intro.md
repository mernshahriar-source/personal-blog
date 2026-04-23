---
title: "Lesson 7.1: Strings Introduction — Text নিয়ে কাজ করা"
date: "2026-05-24"
excerpt: "String কী, Length, Index access, Immutability এবং এই Module এ কী শিখবে"
categories:
  - C# Course Scripts
tags:
  - csharp
  - strings
  - beginner
draft: false
---

# Lesson 7.1: Strings Introduction — Text নিয়ে কাজ করা

> **এই Lesson এ শিখবে:** কেন String আলাদা module, String কী, Character collection হিসেবে string, Immutability, Length property, Index দিয়ে character access, এবং এই Module এ কী শিখবে।

---

## আগের Modules এ কী দেখলাম?

String আমরা অনেক জায়গায় ব্যবহার করেছি:

```csharp
string name = "Rahim";
Console.WriteLine($"Hello, {name}!");

string input = Console.ReadLine();
```

**কিন্তু এতদিন শুধু save ও print করেছি।**

**String নিয়ে আসল কাজ শুরু হয় এখন!**

---

## একটা Real Problem

ধরো তুমি একটা **Registration Form** বানাচ্ছো।

User নাম লিখলো:
```
"   rAHiM   "
```

কিন্তু তুমি Database এ save করতে চাও:
```
"Rahim"
```

**সমস্যা কী কী?**
- শুরু আর শেষে **extra spaces**
- **Case ভুল** — "rAHiM" → "Rahim" হওয়া উচিত

**এগুলো fix করবে কীভাবে?**

নিজে loop চালিয়ে একটা একটা character check করবে? 😫

**না!** C# এ String এর জন্য অনেক **ready-made methods** আছে!

---

## String কী?

String হলো **characters এর collection** — মানে অনেকগুলো char একসাথে।

```csharp
string name = "Rahim";
```

Visually:

```
name = "Rahim"

┌─────┬─────┬─────┬─────┬─────┐
│  R  │  a  │  h  │  i  │  m  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4    ← Index
```

**Array এর মতো! প্রতিটা character এর একটা index আছে, 0 থেকে শুরু।**

---

## Length Property

String এ কতটা character আছে:

```csharp
string name = "Rahim";
Console.WriteLine(name.Length);  // 5
```

### আরো examples:

```csharp
Console.WriteLine("Hello".Length);        // 5
Console.WriteLine("".Length);             // 0 (empty)
Console.WriteLine("Hello World".Length);  // 11 (space count হয়!)
Console.WriteLine("  Hi  ".Length);       // 6 (spaces count!)
```

**Space ও একটা character!**

---

## Index দিয়ে Character Access

Array এর মতোই — `[index]`:

```csharp
string name = "Rahim";

Console.WriteLine(name[0]);  // R
Console.WriteLine(name[1]);  // a
Console.WriteLine(name[2]);  // h
Console.WriteLine(name[4]);  // m
```

### শেষ character:

```csharp
string name = "Rahim";
char lastChar = name[name.Length - 1];
Console.WriteLine(lastChar);  // m
```

### ⚠️ Out of range!

```csharp
string name = "Rahim";  // index: 0, 1, 2, 3, 4

Console.WriteLine(name[5]);  // ❌ Exception! (5 নেই!)
```

---

## String Immutable — Important!

**Immutable** মানে = **পরিবর্তন করা যায় না!**

```csharp
string name = "Rahim";
name.ToUpper();  // এটা কি name কে change করবে?

Console.WriteLine(name);  // Rahim (same আছে!)
```

**কেন?**

`ToUpper()` original string কে change করে **না**। বরং **নতুন string return** করে!

```csharp
string name = "Rahim";
string upperName = name.ToUpper();  // নতুন string

Console.WriteLine(name);       // Rahim (original same)
Console.WriteLine(upperName);  // RAHIM (নতুন)
```

### Why Immutable?

- Memory efficient
- Thread-safe
- Predictable behavior

**মনে রাখো:** String methods **নতুন string return** করে — original **change হয় না!**

---

## Loop দিয়ে Character Traverse

```csharp
string name = "Rahim";

for (int i = 0; i < name.Length; i++)
{
    Console.WriteLine($"[{i}] = {name[i]}");
}
```

Output:
```
[0] = R
[1] = a
[2] = h
[3] = i
[4] = m
```

### foreach ও কাজ করে:

```csharp
string name = "Rahim";

foreach (char c in name)
{
    Console.Write(c + " ");
}
// Output: R a h i m
```

---

## Common Operations

### String জোড়া দেওয়া (Concatenation):

```csharp
string first = "Rahim";
string last = "Uddin";

string full = first + " " + last;
Console.WriteLine(full);  // Rahim Uddin

// Interpolation (preferred!)
string full2 = $"{first} {last}";
Console.WriteLine(full2);  // Rahim Uddin
```

### String Comparison:

```csharp
string a = "Rahim";
string b = "Rahim";
string c = "Karim";

Console.WriteLine(a == b);  // True
Console.WriteLine(a == c);  // False
```

**⚠️ Case-sensitive!**

```csharp
Console.WriteLine("Rahim" == "rahim");  // False!
```

---

## String এর কিছু Special Value

### Empty String:

```csharp
string empty = "";
Console.WriteLine(empty.Length);  // 0
```

### null:

```csharp
string nothing = null;
// Console.WriteLine(nothing.Length);  // ❌ NullReferenceException!
```

**`null` মানে কিছু নেই — `""` (empty) এর সাথে পার্থক্য আছে!**

---

## এই Module এ কী শিখবে?

| Lesson | Topic |
|--------|-------|
| 7.1 | Introduction (এটা!) |
| 7.2 | Case Methods — ToUpper, ToLower |
| 7.3 | Whitespace Methods — Trim, IsNullOrEmpty |
| 7.4 | Search Methods — Contains, StartsWith, IndexOf |
| 7.5 | Substring ও Extraction |
| 7.6 | Replace ও Modify |
| 7.7 | Split ও Join |
| 7.8 | String Comparison ও Formatting |
| 7.9 | Practice & Assignments |

---

## এই Module শেষে তুমি বানাতে পারবে:

- 📝 Input Cleaner (spaces, case fix)
- 🔍 Search system
- 📊 Word Counter
- 📧 Email Validator
- 🎭 Text Analyzer
- 🔐 Username Validator
- 📄 CSV Parser
- 🎨 Text Formatter

**চলো শুরু করি!**

---

**পরের Lesson:** Case Methods — ToUpper, ToLower ও case-insensitive comparison!

---

*CPS Academy - Learn. Code. Grow.*
