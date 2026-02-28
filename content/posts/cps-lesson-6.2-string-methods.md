---
title: "Lesson 6.2: String Methods — Built-in সুবিধা"
date: "2026-03-22"
excerpt: "String immutability, Length property, ToUpper/ToLower, Trim, Contains/StartsWith/EndsWith, IndexOf, Substring, Replace, Split/Join, এবং real-world examples"
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


> **এই Lesson এ শিখবে:** String immutability, Length property, ToUpper/ToLower, Trim, Contains/StartsWith/EndsWith, IndexOf, Substring, Replace, Split/Join, এবং real-world examples।

---

## String কী? (Quick Recap)

String হলো text — characters এর collection:

```csharp
string name = "Rahim";

// প্রতিটা character access করা যায়
Console.WriteLine(name[0]);  // R
Console.WriteLine(name[4]);  // m
Console.WriteLine(name.Length);  // 5
```

---

## ⚠️ String Immutable!

String **immutable** — একবার বানালে change হয় না। Methods নতুন string return করে, original same থাকে:

```csharp
string name = "Rahim";
string upper = name.ToUpper();

Console.WriteLine(name);   // Rahim (original same!)
Console.WriteLine(upper);  // RAHIM (নতুন string)
```

---

## Case Changing Methods

### ToUpper() ও ToLower():

```csharp
string name = "Rahim Uddin";

Console.WriteLine(name.ToUpper());  // RAHIM UDDIN
Console.WriteLine(name.ToLower());  // rahim uddin
```

### Case-insensitive Comparison:

```csharp
string input = "YES";

if (input.ToLower() == "yes")
{
    Console.WriteLine("User said yes!");
}
```

---

## Whitespace Methods

### Trim() — আগে-পিছের space কাটো:

```csharp
string input = "  Rahim  ";

Console.WriteLine(input.Trim());       // "Rahim"
Console.WriteLine(input.TrimStart());  // "Rahim  "
Console.WriteLine(input.TrimEnd());    // "  Rahim"
```

### User input clean করতে Perfect:

```csharp
Console.Write("Enter name: ");
string name = Console.ReadLine().Trim();  // extra space কেটে দিলাম
```

---

## Search Methods

### Contains() — আছে কিনা:

```csharp
string sentence = "I love programming in C#";

Console.WriteLine(sentence.Contains("love"));     // True
Console.WriteLine(sentence.Contains("Python"));   // False
```

### StartsWith() / EndsWith():

```csharp
string email = "rahim@gmail.com";

Console.WriteLine(email.StartsWith("rahim"));    // True
Console.WriteLine(email.EndsWith(".com"));        // True
Console.WriteLine(email.EndsWith(".org"));        // False
```

### IndexOf() — কোন position এ আছে:

```csharp
string name = "Hello World";

Console.WriteLine(name.IndexOf("World"));  // 6
Console.WriteLine(name.IndexOf("xyz"));    // -1 (নেই!)
```

### LastIndexOf() — শেষ occurrence:

```csharp
string text = "abcabc";

Console.WriteLine(text.IndexOf("a"));      // 0 (প্রথম)
Console.WriteLine(text.LastIndexOf("a"));  // 3 (শেষ)
```

---

## Substring() — কেটে নেওয়া

```csharp
string text = "Hello World";

Console.WriteLine(text.Substring(6));      // "World" (index 6 থেকে শেষ পর্যন্ত)
Console.WriteLine(text.Substring(0, 5));   // "Hello" (index 0 থেকে 5 টা character)
```

---

## Replace() — বদলানো

```csharp
string text = "I love Java";

string newText = text.Replace("Java", "C#");
Console.WriteLine(newText);  // "I love C#"
```

### Character replace:

```csharp
string phone = "017-1234-5678";
Console.WriteLine(phone.Replace("-", ""));  // "01712345678"
```

---

## Split() ও Join() — ভাঙা ও জোড়া

### Split() — string ভেঙে array:

```csharp
string csv = "Rahim,Karim,Jabbar,Salam";
string[] names = csv.Split(',');

foreach (string name in names)
    Console.WriteLine(name);
// Rahim
// Karim
// Jabbar
// Salam
```

### Join() — array জোড়া দিয়ে string:

```csharp
string[] words = { "Hello", "World", "C#" };
string result = string.Join(" ", words);
Console.WriteLine(result);  // "Hello World C#"
```

### Word count:

```csharp
string sentence = "I love programming in C#";
string[] words = sentence.Split(' ');
Console.WriteLine($"Word count: {words.Length}");  // 5
```

---

## Other Useful Methods

### Insert() ও Remove():

```csharp
string text = "Hello World";

Console.WriteLine(text.Insert(5, " Beautiful"));  // "Hello Beautiful World"
Console.WriteLine(text.Remove(5));                  // "Hello"
Console.WriteLine(text.Remove(5, 1));               // "HelloWorld"
```

### PadLeft() ও PadRight():

```csharp
string num = "42";

Console.WriteLine(num.PadLeft(5, '0'));   // "00042"
Console.WriteLine(num.PadRight(5, '-'));  // "42---"
```

### IsNullOrEmpty() ও IsNullOrWhiteSpace():

```csharp
string empty = "";
string spaces = "   ";

Console.WriteLine(string.IsNullOrEmpty(empty));        // True
Console.WriteLine(string.IsNullOrWhiteSpace(spaces));  // True
```

---

## Complete Example: Input Cleaner

```csharp
static string CleanInput(string input)
{
    if (string.IsNullOrWhiteSpace(input))
        return "";

    string cleaned = input.Trim();

    // First letter capital, বাকি lowercase
    cleaned = char.ToUpper(cleaned[0]) + cleaned.Substring(1).ToLower();

    return cleaned;
}

static void Main(string[] args)
{
    string[] rawInputs = { "  rAHiM  ", "KARIM", "  jAbBaR", "" };

    foreach (string raw in rawInputs)
    {
        string clean = CleanInput(raw);
        Console.WriteLine($"'{raw}' → '{clean}'");
    }
}
```

Output:
```
'  rAHiM  ' → 'Rahim'
'KARIM' → 'Karim'
'  jAbBaR' → 'Jabbar'
'' → ''
```

---

## Complete Example: Simple Search

```csharp
string[] products = { "Samsung Galaxy S24", "iPhone 15 Pro", "Google Pixel 8", "OnePlus 12" };

Console.Write("Search: ");
string query = Console.ReadLine().Trim().ToLower();

Console.WriteLine("\nResults:");
bool found = false;

foreach (string product in products)
{
    if (product.ToLower().Contains(query))
    {
        Console.WriteLine($"  ✅ {product}");
        found = true;
    }
}

if (!found)
    Console.WriteLine("  ❌ No results found.");
```

---

## All Methods — Quick Reference

| Method | কাজ | Example |
|--------|-----|---------|
| `ToUpper()` | বড় হাতের | `"hello"` → `"HELLO"` |
| `ToLower()` | ছোট হাতের | `"HELLO"` → `"hello"` |
| `Trim()` | আগে-পিছে space কাটো | `" hi "` → `"hi"` |
| `Contains()` | আছে কিনা | `"Hello".Contains("ell")` → true |
| `StartsWith()` | দিয়ে শুরু কিনা | `"Hello".StartsWith("He")` → true |
| `EndsWith()` | দিয়ে শেষ কিনা | `"Hello".EndsWith("lo")` → true |
| `IndexOf()` | কোথায় আছে | `"Hello".IndexOf("l")` → 2 |
| `Substring()` | কেটে নাও | `"Hello".Substring(2)` → `"llo"` |
| `Replace()` | বদলাও | `"ab".Replace("a","x")` → `"xb"` |
| `Split()` | ভাঙো | `"a,b".Split(',')` → `["a","b"]` |
| `Join()` | জোড়া দাও | `string.Join("-", arr)` |
| `Insert()` | ঢোকাও | `"ab".Insert(1,"X")` → `"aXb"` |
| `Remove()` | মুছো | `"Hello".Remove(3)` → `"Hel"` |

---

## Summary

**মনে রাখো:**
- String **immutable** — methods নতুন string return করে
- **Case-sensitive** — `"Hello" != "hello"`, compare করতে `ToLower()` use করো
- `Trim()` user input clean করতে essential
- `IndexOf()` return `-1` মানে নেই
- `Split()` + `Join()` = string ↔ array conversion

---

**পরের Lesson:** Methods Advanced — Overloading, Optional Parameters, ref/out, params।

---

*CPS Academy - Learn. Code. Grow.*
