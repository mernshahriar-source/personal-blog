---
title: "Lesson 7.5: Substring ও Extraction — String এর Part বের করা"
date: "2026-05-28"
excerpt: "Substring(start) vs Substring(start, length), Email/URL/File parsing, Phone formatting এবং Credit Card masking"
categories:
  - C# Course Scripts
tags:
  - csharp
  - strings
  - substring
draft: false
---

# Lesson 7.5: Substring ও Extraction — String এর Part বের করা

> **এই Lesson এ শিখবে:** Substring(startIndex) — start থেকে শেষ, Substring(start, length) — নির্দিষ্ট length, character access, First/Last N chars, Domain extraction, File name parsing, এবং real examples।

---

## Substring কী?

**Substring = String এর একটা অংশ।**

```
"Hello World"
 0123456789...

Substring 6 থেকে = "World"
Substring 0 থেকে 5 char = "Hello"
```

---

## Substring(startIndex) — Start থেকে শেষ পর্যন্ত

```csharp
string text = "Hello World";

string part = text.Substring(6);  // index 6 থেকে শেষ
Console.WriteLine(part);  // "World"
```

Visual:

```
"Hello World"
 0123456789...
       ↑
       index 6 থেকে শেষ পর্যন্ত
       = "World"
```

### Examples:

```csharp
string name = "Rahim Uddin";

Console.WriteLine(name.Substring(0));  // "Rahim Uddin" (পুরোটা)
Console.WriteLine(name.Substring(6));  // "Uddin"
Console.WriteLine(name.Substring(2));  // "him Uddin"
```

---

## Substring(startIndex, length) — নির্দিষ্ট Length

```csharp
string text = "Hello World";

string part = text.Substring(0, 5);  // index 0 থেকে 5 চার
Console.WriteLine(part);  // "Hello"
```

### Examples:

```csharp
string name = "Rahim Uddin";

Console.WriteLine(name.Substring(0, 5));   // "Rahim"
Console.WriteLine(name.Substring(6, 5));   // "Uddin"
Console.WriteLine(name.Substring(2, 3));   // "him"
```

---

## প্রথম N characters

```csharp
string name = "Rahim Uddin";

string first3 = name.Substring(0, 3);
Console.WriteLine(first3);  // "Rah"
```

---

## শেষ N characters

```csharp
string name = "Rahim Uddin";

string last5 = name.Substring(name.Length - 5);
Console.WriteLine(last5);  // "Uddin"
```

**Logic:** Length - 5 থেকে শুরু = শেষের 5 char পাবো।

---

## Middle Portion

```csharp
string id = "STU-12345-2024";

// শুধু number বের করা
string number = id.Substring(4, 5);  // index 4 থেকে 5 চার
Console.WriteLine(number);  // "12345"
```

---

## Real Example: Email Parsing

```csharp
string email = "rahim.uddin@cpsacademy.io";

int atIdx = email.IndexOf('@');

if (atIdx != -1)
{
    string username = email.Substring(0, atIdx);
    string domain = email.Substring(atIdx + 1);

    Console.WriteLine($"Username: {username}");  // rahim.uddin
    Console.WriteLine($"Domain: {domain}");      // cpsacademy.io
}
```

---

## File Name ও Extension

```csharp
string filename = "document.pdf";

int dotIdx = filename.LastIndexOf('.');

string name = filename.Substring(0, dotIdx);
string extension = filename.Substring(dotIdx + 1);

Console.WriteLine($"Name: {name}");           // document
Console.WriteLine($"Extension: {extension}"); // pdf
```

### With multiple dots:

```csharp
string filename = "photo.backup.jpg";

int lastDot = filename.LastIndexOf('.');  // LastIndexOf!

string name = filename.Substring(0, lastDot);       // "photo.backup"
string ext = filename.Substring(lastDot + 1);       // "jpg"
```

---

## URL Parsing

```csharp
string url = "https://cpsacademy.io/courses/csharp";

// Protocol
int protocolEnd = url.IndexOf("://");
string protocol = url.Substring(0, protocolEnd);
Console.WriteLine($"Protocol: {protocol}");  // https

// Rest after ://
string rest = url.Substring(protocolEnd + 3);
Console.WriteLine($"Rest: {rest}");  // cpsacademy.io/courses/csharp

// Domain
int firstSlash = rest.IndexOf('/');
string domain = firstSlash == -1 ? rest : rest.Substring(0, firstSlash);
Console.WriteLine($"Domain: {domain}");  // cpsacademy.io
```

---

## First Name / Last Name Split

```csharp
string fullName = "Rahim Uddin";

int spaceIdx = fullName.IndexOf(' ');

if (spaceIdx != -1)
{
    string firstName = fullName.Substring(0, spaceIdx);
    string lastName = fullName.Substring(spaceIdx + 1);

    Console.WriteLine($"First: {firstName}");
    Console.WriteLine($"Last: {lastName}");
}
```

---

## Capitalize First Letter

```csharp
string name = "rahim";

string capitalized = char.ToUpper(name[0]) + name.Substring(1).ToLower();
Console.WriteLine(capitalized);  // Rahim
```

### Full name capitalize:

```csharp
string name = "rAHIM uDDIN";

string first = char.ToUpper(name[0]) + name.Substring(1, name.IndexOf(' ') - 1).ToLower();
// Better way using Split (পরের lesson!)
```

---

## Phone Number Formatting

```csharp
string phone = "01712345678";

if (phone.Length == 11)
{
    string formatted = phone.Substring(0, 5) + "-" +
                      phone.Substring(5, 6);
    Console.WriteLine(formatted);  // 01712-345678
}
```

---

## Credit Card Masking

```csharp
string card = "1234567890123456";

string masked = "XXXX-XXXX-XXXX-" + card.Substring(card.Length - 4);
Console.WriteLine(masked);  // XXXX-XXXX-XXXX-3456
```

---

## Character Access vs Substring

```csharp
string name = "Rahim";

// Character access — returns char
char first = name[0];
Console.WriteLine(first);  // R (type: char)

// Substring — returns string
string firstStr = name.Substring(0, 1);
Console.WriteLine(firstStr);  // R (type: string)
```

**পার্থক্য:**
- `name[0]` → `char`
- `name.Substring(0, 1)` → `string`

---

## Complete Example: Business Card Parser

```csharp
string card = "Dr. Rahim Uddin, PhD - CTO at CPS Academy";

// Title
int dotIdx = card.IndexOf('.');
string title = card.Substring(0, dotIdx + 1);  // "Dr."

// Name (Title এর পর থেকে comma পর্যন্ত)
int commaIdx = card.IndexOf(',');
string name = card.Substring(dotIdx + 2, commaIdx - dotIdx - 2);  // "Rahim Uddin"

// Qualification
int dashIdx = card.IndexOf('-');
string qualification = card.Substring(commaIdx + 2, dashIdx - commaIdx - 3);  // "PhD"

// Position & Company
string rest = card.Substring(dashIdx + 2);  // "CTO at CPS Academy"

Console.WriteLine($"Title: {title}");
Console.WriteLine($"Name: {name}");
Console.WriteLine($"Qualification: {qualification}");
Console.WriteLine($"Position: {rest}");
```

---

## Common Mistakes

### ❌ Mistake 1: Start index range বাইরে

```csharp
string name = "Rahim";  // length 5

name.Substring(10);  // ❌ Exception! (index 10 নেই)
```

### ❌ Mistake 2: Length range বাইরে

```csharp
string name = "Rahim";  // length 5

name.Substring(2, 10);  // ❌ Exception! (2 থেকে 10 char নেই)
```

### ❌ Mistake 3: Negative values

```csharp
name.Substring(-1);  // ❌ Exception!
```

### ✅ Safe approach:

```csharp
int start = 2;
int length = 10;

if (start >= 0 && start < name.Length &&
    start + length <= name.Length)
{
    string part = name.Substring(start, length);
}
```

---

## Summary

| Method | কাজ |
|--------|-----|
| `Substring(start)` | start থেকে শেষ পর্যন্ত |
| `Substring(start, length)` | start থেকে length character |

### Common Patterns:

```csharp
// প্রথম N
s.Substring(0, N)

// শেষ N
s.Substring(s.Length - N)

// Middle
s.Substring(start, length)

// Specific char এর আগ পর্যন্ত
s.Substring(0, s.IndexOf('@'))

// Specific char এর পরে
s.Substring(s.IndexOf('@') + 1)
```

**মনে রাখো:**
- Index range বাইরে হলে **Exception**
- `IndexOf` থেকে index পেয়ে `Substring` — powerful combo
- `s[i]` char, `s.Substring(i, 1)` string — পার্থক্য আছে

---

**পরের Lesson:** Replace ও Modify — text বদলানো!

---

*CPS Academy - Learn. Code. Grow.*
