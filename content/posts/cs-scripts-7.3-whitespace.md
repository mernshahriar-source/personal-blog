---
title: "Lesson 7.3: Whitespace Methods — Trim, IsNullOrEmpty"
date: "2026-05-26"
excerpt: "Trim/TrimStart/TrimEnd, IsNullOrEmpty vs IsNullOrWhiteSpace, PadLeft/PadRight এবং Form input cleaning"
categories:
  - C# Course Scripts
tags:
  - csharp
  - strings
  - trim
  - validation
draft: false
---

# Lesson 7.3: Whitespace Methods — Trim, IsNullOrEmpty

> **এই Lesson এ শিখবে:** Trim() — দুই পাশের space সরানো, TrimStart() ও TrimEnd(), IsNullOrEmpty() — খালি check, IsNullOrWhiteSpace() — শুধু space check, PadLeft/PadRight, এবং Form input cleaning।

---

## Whitespace কী?

Whitespace মানে শুধু space না — এতে আরো include:
- Space (` `)
- Tab (`\t`)
- New line (`\n`)
- Carriage return (`\r`)

**User input এ সবসময় extra whitespace থাকে — clean করা জরুরি!**

---

## Trim() — দুই পাশের Space সরাও

শুরু আর শেষের whitespace **সরিয়ে দেয়**:

```csharp
string input = "   Rahim   ";

Console.WriteLine($"Before: '{input}'");       // '   Rahim   '
Console.WriteLine($"Length: {input.Length}");  // 11

string trimmed = input.Trim();

Console.WriteLine($"After:  '{trimmed}'");     // 'Rahim'
Console.WriteLine($"Length: {trimmed.Length}"); // 5
```

### Visual:

```
Before: "   Rahim   "
         ↓↓↓      ↓↓↓
         spaces   spaces

After Trim(): "Rahim"
              (spaces gone!)
```

**মাঝের spaces touch করে না!**

```csharp
"  Hello World  ".Trim()  // "Hello World" (মাঝের space আছে)
```

---

## TrimStart() — শুধু শুরুর Space

```csharp
string input = "   Rahim   ";

string trimStart = input.TrimStart();
Console.WriteLine($"'{trimStart}'");  // 'Rahim   '
```

**শেষের spaces থাকে!**

---

## TrimEnd() — শুধু শেষের Space

```csharp
string input = "   Rahim   ";

string trimEnd = input.TrimEnd();
Console.WriteLine($"'{trimEnd}'");  // '   Rahim'
```

**শুরুর spaces থাকে!**

---

## Comparison Table

| Method | কী করে | Example |
|--------|--------|---------|
| `Trim()` | দুই পাশ | `"  Hi  ".Trim()` → `"Hi"` |
| `TrimStart()` | শুরু | `"  Hi  ".TrimStart()` → `"Hi  "` |
| `TrimEnd()` | শেষ | `"  Hi  ".TrimEnd()` → `"  Hi"` |

---

## Trim Specific Characters

শুধু space না, যেকোনো character ও trim করা যায়:

```csharp
string text = "***Hello***";
string cleaned = text.Trim('*');
Console.WriteLine(cleaned);  // Hello

// Multiple characters
string messy = "###___Hello___###";
string clean = messy.Trim('#', '_');
Console.WriteLine(clean);  // Hello
```

---

## Real Example: Registration Form

```csharp
Console.WriteLine("📝 REGISTRATION FORM\n");

Console.Write("Name: ");
string rawName = Console.ReadLine();

Console.Write("Email: ");
string rawEmail = Console.ReadLine();

// Clean inputs
string name = rawName.Trim();
string email = rawEmail.Trim().ToLower();

Console.WriteLine($"\n✅ Saved:");
Console.WriteLine($"  Name:  '{name}'");
Console.WriteLine($"  Email: '{email}'");
```

User "   Rahim   " দিলেও database এ ঠিকভাবে "Rahim" save হবে!

---

## IsNullOrEmpty() — খালি String Check

String **null** বা **""** কিনা check করে:

```csharp
string name1 = null;
string name2 = "";
string name3 = "Rahim";
string name4 = "   ";  // শুধু spaces!

Console.WriteLine(string.IsNullOrEmpty(name1));  // True (null)
Console.WriteLine(string.IsNullOrEmpty(name2));  // True (empty)
Console.WriteLine(string.IsNullOrEmpty(name3));  // False
Console.WriteLine(string.IsNullOrEmpty(name4));  // False! (spaces আছে)
```

**⚠️ Spaces কে empty হিসেবে count করে না!**

### Validation Example:

```csharp
Console.Write("Enter name: ");
string name = Console.ReadLine();

if (string.IsNullOrEmpty(name))
{
    Console.WriteLine("❌ Name is required!");
}
else
{
    Console.WriteLine($"✅ Hello, {name}!");
}
```

---

## IsNullOrWhiteSpace() — Spaces ও Check!

Better version — spaces **ও** empty হিসেবে count করে:

```csharp
string name1 = null;
string name2 = "";
string name3 = "   ";  // spaces only
string name4 = "\t\n";  // tabs, newlines
string name5 = "Rahim";

Console.WriteLine(string.IsNullOrWhiteSpace(name1));  // True
Console.WriteLine(string.IsNullOrWhiteSpace(name2));  // True
Console.WriteLine(string.IsNullOrWhiteSpace(name3));  // True ✅ (spaces!)
Console.WriteLine(string.IsNullOrWhiteSpace(name4));  // True ✅
Console.WriteLine(string.IsNullOrWhiteSpace(name5));  // False
```

### Better Validation:

```csharp
Console.Write("Name: ");
string name = Console.ReadLine();

if (string.IsNullOrWhiteSpace(name))
{
    Console.WriteLine("❌ Please enter a valid name!");
}
else
{
    Console.WriteLine($"Welcome, {name.Trim()}!");
}
```

**User শুধু space দিলেও caught হবে!**

---

## IsNullOrEmpty vs IsNullOrWhiteSpace

| Input | IsNullOrEmpty | IsNullOrWhiteSpace |
|-------|---------------|--------------------|
| `null` | True | True |
| `""` | True | True |
| `"   "` | **False** | **True** ✅ |
| `"\t\n"` | **False** | **True** ✅ |
| `"Rahim"` | False | False |

**Rule:** User input validation এ **IsNullOrWhiteSpace** use করো!

---

## PadLeft ও PadRight — Padding যোগ করা

### PadLeft() — বামে padding

```csharp
string num = "42";
string padded = num.PadLeft(5, '0');
Console.WriteLine(padded);  // "00042"
```

### PadRight() — ডানে padding

```csharp
string name = "Rahim";
string padded = name.PadRight(10, '-');
Console.WriteLine($"'{padded}'");  // 'Rahim-----'
```

### Default (space):

```csharp
string s = "42";
Console.WriteLine($"'{s.PadLeft(5)}'");   // '   42'
Console.WriteLine($"'{s.PadRight(5)}'");  // '42   '
```

---

## Real Example: Invoice Number

```csharp
int invoiceNum = 42;
string formatted = invoiceNum.ToString().PadLeft(6, '0');
Console.WriteLine($"Invoice: INV-{formatted}");
// Invoice: INV-000042
```

---

## Real Example: Table Output

```csharp
string[] names = { "Rahim", "Karim", "Jabbar Ali" };
int[] marks = { 85, 90, 78 };

Console.WriteLine("┌────────────────────┬──────┐");
Console.WriteLine("│ Name               │ Marks│");
Console.WriteLine("├────────────────────┼──────┤");

for (int i = 0; i < names.Length; i++)
{
    string name = names[i].PadRight(18);
    string mark = marks[i].ToString().PadLeft(4);
    Console.WriteLine($"│ {name} │ {mark} │");
}

Console.WriteLine("└────────────────────┴──────┘");
```

Output:
```
┌────────────────────┬──────┐
│ Name               │ Marks│
├────────────────────┼──────┤
│ Rahim              │   85 │
│ Karim              │   90 │
│ Jabbar Ali         │   78 │
└────────────────────┴──────┘
```

---

## Complete Example: Input Cleaner

```csharp
Console.Write("Enter your name: ");
string raw = Console.ReadLine();

// Step 1: Check if empty
if (string.IsNullOrWhiteSpace(raw))
{
    Console.WriteLine("❌ Name cannot be empty!");
    return;
}

// Step 2: Trim
string trimmed = raw.Trim();

// Step 3: Normalize case (First letter capital)
string cleaned = char.ToUpper(trimmed[0]) + trimmed.Substring(1).ToLower();

Console.WriteLine($"Raw:     '{raw}'");
Console.WriteLine($"Trimmed: '{trimmed}'");
Console.WriteLine($"Cleaned: '{cleaned}'");
```

Run:
```
Enter your name:    rAHiM   
Raw:     '   rAHiM   '
Trimmed: 'rAHiM'
Cleaned: 'Rahim'
```

---

## Summary

| Method | কাজ |
|--------|-----|
| `Trim()` | দুই পাশের whitespace |
| `TrimStart()` | শুরুর whitespace |
| `TrimEnd()` | শেষের whitespace |
| `IsNullOrEmpty()` | null বা "" |
| `IsNullOrWhiteSpace()` | null, "", বা spaces |
| `PadLeft(n, c)` | বামে padding |
| `PadRight(n, c)` | ডানে padding |

**মনে রাখো:**
- User input নেওয়ার পর সবসময় **Trim()** করো
- Validation এ **IsNullOrWhiteSpace** use করো (IsNullOrEmpty না!)
- `string.IsNullOrEmpty(s)` — static method call
- Padding table/invoice format এ কাজে লাগে

---

**পরের Lesson:** Search Methods — Contains, StartsWith, IndexOf!

---

*CPS Academy - Learn. Code. Grow.*
