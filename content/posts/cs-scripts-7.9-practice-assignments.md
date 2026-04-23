---
title: "Lesson 7.9: Practice & Assignments — Complete String Programs"
date: "2026-06-01"
excerpt: "Input Cleaner, Word Counter, Search System, Password Validator, Email Validator এবং Assignments (Palindrome, Word Frequency, Morse Code)"
categories:
  - C# Course Scripts
tags:
  - csharp
  - practice
  - assignments
  - strings
draft: false
---

# Lesson 7.9: Practice & Assignments

> **এই Lesson এ দেখবে:** Module 7 এর সব String concepts মিলিয়ে real programs — Complete Input Cleaner, Word Counter, Search System, Password Validator, এবং নিজে solve করার Assignments।

---

## Solved Example 1: Complete Input Cleaner

User input কে clean করে database-ready format এ নিয়ে আসা:

```csharp
Console.Write("Enter your name: ");
string raw = Console.ReadLine();

// Validation
if (string.IsNullOrWhiteSpace(raw))
{
    Console.WriteLine("❌ Name cannot be empty!");
    return;
}

// Clean
string cleaned = raw.Trim();  // Step 1: Trim spaces

// Proper case (first letter of each word capital)
string[] words = cleaned.Split(' ', StringSplitOptions.RemoveEmptyEntries);
for (int i = 0; i < words.Length; i++)
{
    words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1).ToLower();
}
string properCase = string.Join(" ", words);

Console.WriteLine($"\n📝 Results:");
Console.WriteLine($"Raw:         '{raw}'");
Console.WriteLine($"Trimmed:     '{cleaned}'");
Console.WriteLine($"Proper Case: '{properCase}'");
Console.WriteLine($"\n✅ Ready to save: {properCase}");
```

Run:
```
Enter your name:    rAHiM   uDDin   

📝 Results:
Raw:         '   rAHiM   uDDin   '
Trimmed:     'rAHiM   uDDin'
Proper Case: 'Rahim Uddin'

✅ Ready to save: Rahim Uddin
```

---

## Solved Example 2: Word Counter

```csharp
Console.WriteLine("📝 TEXT ANALYZER\n");
Console.Write("Enter text: ");
string text = Console.ReadLine();

// Basic stats
int totalChars = text.Length;
int lettersOnly = 0;
int digitsOnly = 0;
int spaces = 0;

foreach (char c in text)
{
    if (char.IsLetter(c)) lettersOnly++;
    else if (char.IsDigit(c)) digitsOnly++;
    else if (c == ' ') spaces++;
}

// Words
string[] words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);

// Longest & shortest word
string longest = words[0];
string shortest = words[0];
foreach (string w in words)
{
    if (w.Length > longest.Length) longest = w;
    if (w.Length < shortest.Length) shortest = w;
}

// Report
Console.WriteLine($"\n📊 Analysis:");
Console.WriteLine($"Total characters:   {totalChars}");
Console.WriteLine($"Letters:            {lettersOnly}");
Console.WriteLine($"Digits:             {digitsOnly}");
Console.WriteLine($"Spaces:             {spaces}");
Console.WriteLine($"Total words:        {words.Length}");
Console.WriteLine($"Longest word:       {longest} ({longest.Length} chars)");
Console.WriteLine($"Shortest word:      {shortest} ({shortest.Length} chars)");
Console.WriteLine($"Average word length: {(double)lettersOnly / words.Length:F2}");
```

---

## Solved Example 3: Search System

```csharp
string[] products = {
    "iPhone 15 Pro Max 256GB",
    "Samsung Galaxy S24 Ultra",
    "MacBook Pro M3 16-inch",
    "iPad Air 5th Generation",
    "Dell XPS 15 Laptop",
    "HP Pavilion Gaming",
    "Apple Watch Series 9",
    "AirPods Pro 2nd Gen"
};

Console.WriteLine("🔍 PRODUCT SEARCH\n");
Console.Write("Search query: ");
string query = Console.ReadLine().Trim().ToLower();

if (string.IsNullOrWhiteSpace(query))
{
    Console.WriteLine("❌ Please enter a search term!");
    return;
}

// Search
Console.WriteLine($"\n📊 Results for '{query}':\n");

int count = 0;
for (int i = 0; i < products.Length; i++)
{
    if (products[i].ToLower().Contains(query))
    {
        Console.WriteLine($"  {count + 1}. {products[i]}");
        count++;
    }
}

if (count == 0)
{
    Console.WriteLine("  No products found.");
}
else
{
    Console.WriteLine($"\n{count} product(s) found.");
}
```

---

## Solved Example 4: Password Strength Checker

```csharp
Console.Write("Enter password: ");
string password = Console.ReadLine();

Console.WriteLine("\n🔐 Password Analysis:\n");

// Checks
bool hasMinLength = password.Length >= 8;
bool hasUpper = false;
bool hasLower = false;
bool hasDigit = false;
bool hasSpecial = false;

foreach (char c in password)
{
    if (char.IsUpper(c)) hasUpper = true;
    else if (char.IsLower(c)) hasLower = true;
    else if (char.IsDigit(c)) hasDigit = true;
    else hasSpecial = true;
}

// Report
Console.WriteLine($"✓ Length (8+):       {(hasMinLength ? "✅" : "❌")}");
Console.WriteLine($"✓ Uppercase letter:  {(hasUpper ? "✅" : "❌")}");
Console.WriteLine($"✓ Lowercase letter:  {(hasLower ? "✅" : "❌")}");
Console.WriteLine($"✓ Digit:             {(hasDigit ? "✅" : "❌")}");
Console.WriteLine($"✓ Special char:      {(hasSpecial ? "✅" : "❌")}");

// Score
int score = 0;
if (hasMinLength) score++;
if (hasUpper) score++;
if (hasLower) score++;
if (hasDigit) score++;
if (hasSpecial) score++;

string strength = score switch
{
    5 => "💪 Strong",
    4 => "👍 Good",
    3 => "🤔 Medium",
    2 => "⚠️ Weak",
    _ => "❌ Very Weak"
};

Console.WriteLine($"\nStrength: {strength} ({score}/5)");
```

Run:
```
Enter password: Rahim123!

🔐 Password Analysis:

✓ Length (8+):       ✅
✓ Uppercase letter:  ✅
✓ Lowercase letter:  ✅
✓ Digit:             ✅
✓ Special char:      ✅

Strength: 💪 Strong (5/5)
```

---

## Solved Example 5: Email Validator

```csharp
Console.Write("Enter email: ");
string email = Console.ReadLine().Trim().ToLower();

Console.WriteLine("\n✉️ Email Validation:\n");

// Basic checks
bool hasAt = email.Contains('@');
bool hasDot = email.Contains('.');
bool singleAt = email.IndexOf('@') == email.LastIndexOf('@');
bool notStartsWithAt = !email.StartsWith("@");
bool notEndsWithDot = !email.EndsWith(".");
bool hasLength = email.Length >= 5;

Console.WriteLine($"Contains @:      {(hasAt ? "✅" : "❌")}");
Console.WriteLine($"Contains .:      {(hasDot ? "✅" : "❌")}");
Console.WriteLine($"Single @:        {(singleAt ? "✅" : "❌")}");
Console.WriteLine($"Valid start:     {(notStartsWithAt ? "✅" : "❌")}");
Console.WriteLine($"Valid end:       {(notEndsWithDot ? "✅" : "❌")}");
Console.WriteLine($"Length ≥ 5:      {(hasLength ? "✅" : "❌")}");

bool valid = hasAt && hasDot && singleAt && notStartsWithAt && notEndsWithDot && hasLength;

if (valid)
{
    Console.WriteLine("\n✅ Valid email format!");

    // Extract parts
    int atIdx = email.IndexOf('@');
    string username = email.Substring(0, atIdx);
    string domain = email.Substring(atIdx + 1);

    Console.WriteLine($"Username: {username}");
    Console.WriteLine($"Domain: {domain}");
}
else
{
    Console.WriteLine("\n❌ Invalid email format!");
}
```

---

## Assignment 1: Palindrome Checker

**তোমার কাজ:** User একটা word দেবে। Check করো palindrome কিনা (উল্টালে same হয়)।

**Examples:**
- "madam" → ✅ Palindrome
- "hello" → ❌ Not palindrome
- "A man a plan a canal Panama" → ✅ Palindrome (spaces ignore)

**Hints:**
- Space remove করো, lowercase করো
- reverse string বানাও (loop দিয়ে)
- Compare করো

---

## Assignment 2: Word Frequency Counter

**তোমার কাজ:** User একটা sentence দেবে। প্রতিটা word কতবার এসেছে count করো।

**Example input:**
```
the quick brown fox jumps over the lazy dog the end
```

**Expected output:**
```
the: 3
quick: 1
brown: 1
fox: 1
...
```

**Hints:**
- Split by space
- প্রতিটা word এ loop, আগের গুলোর সাথে match করো
- Already counted mark করার জন্য একটা bool array
- Case insensitive

---

## Assignment 3: Morse Code Converter

**তোমার কাজ:** English text → Morse code convert করো।

**Morse codes:**
```
A: .-      B: -...    C: -.-.    D: -..     E: .
F: ..-.    G: --.     H: ....    I: ..      J: .---
...
```

**Example:**
- Input: "SOS"
- Output: "... --- ..."

**Hints:**
- দুইটা parallel array — letters আর morse codes
- User input এর প্রতিটা char loop
- Array.IndexOf দিয়ে position খোঁজো
- Join দিয়ে space যোগ করে output

---

## Module 7 Complete! 🎉

**এই Module এ শিখলে:**

| Concept | মানে |
|---------|------|
| String immutability | Methods new string return |
| **ToUpper/ToLower** | Case change |
| **Trim** | Whitespace cleanup |
| **Contains/StartsWith** | Search |
| **IndexOf** | Position find |
| **Substring** | Part extract |
| **Replace** | Text modify |
| **Split/Join** | String ↔ Array |
| **Format specifiers** | F2, N0, C, P |
| **Interpolation** | $"" modern way |

**Real programs যা বানাতে পারো:**
- Input cleaner
- Word counter
- Search system
- Password validator
- Email validator
- URL parser
- CSV reader
- Slug generator
- Template engine
- Text analyzer

**এখন তুমি text নিয়ে professional কাজ করতে পারো!**

---

**পরের Module:** Methods & Functions — Code reuse এর জাদু!

---

*CPS Academy - Learn. Code. Grow.*
