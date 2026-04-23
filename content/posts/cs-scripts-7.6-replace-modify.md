---
title: "Lesson 7.6: Replace ও Modify — Text বদলানো"
date: "2026-05-29"
excerpt: "Replace, Insert, Remove, Concat, Method chaining এবং real examples (Phone Formatter, Slug Generator, Comment Moderator)"
categories:
  - C# Course Scripts
tags:
  - csharp
  - strings
  - replace
  - modify
draft: false
---

# Lesson 7.6: Replace ও Modify — Text বদলানো

> **এই Lesson এ শিখবে:** Replace() — character/text বদলানো, Insert() — নতুন text যোগ, Remove() — part সরানো, Concat() — জোড়া দেওয়া, Immutability recap, Chaining methods, এবং real examples।

---

## Replace() — একটা text আরেকটায় বদলানো

**All occurrences replace করে:**

```csharp
string text = "I love Java";
string updated = text.Replace("Java", "C#");

Console.WriteLine(updated);  // "I love C#"
```

### Multiple occurrences:

```csharp
string text = "cat and cat and cat";
string replaced = text.Replace("cat", "dog");

Console.WriteLine(replaced);  // "dog and dog and dog"
```

**সব "cat" "dog" হয়ে গেছে!**

---

## Character Replace

Single character ও replace করা যায়:

```csharp
string phone = "017-123-4567";
string clean = phone.Replace('-', ' ');

Console.WriteLine(clean);  // "017 123 4567"
```

### Remove specific character:

```csharp
string number = "1,000,000";
string plain = number.Replace(",", "");

Console.WriteLine(plain);  // "1000000"

int value = int.Parse(plain);
Console.WriteLine(value);  // 1000000
```

---

## Real Example: Phone Formatter

```csharp
string raw = "+880-1712-345678";

// Remove special characters
string clean = raw.Replace("+", "")
                 .Replace("-", "")
                 .Replace(" ", "");

Console.WriteLine(clean);  // "8801712345678"
```

**Chain করা — একটার পর একটা!**

---

## Real Example: Censor Bad Words

```csharp
string comment = "This is a stupid product";

string censored = comment.Replace("stupid", "***");
Console.WriteLine(censored);  // "This is a *** product"

// Multiple bad words
string[] badWords = { "stupid", "idiot", "bad" };
string original = "This idiot gave stupid bad reviews";

string cleaned = original;
foreach (string word in badWords)
{
    cleaned = cleaned.Replace(word, new string('*', word.Length));
}
Console.WriteLine(cleaned);  // "This ***** gave ****** *** reviews"
```

---

## Real Example: Template Engine

```csharp
string template = "Hello {name}, your order {orderId} is ready!";

string name = "Rahim";
int orderId = 12345;

string message = template.Replace("{name}", name)
                         .Replace("{orderId}", orderId.ToString());

Console.WriteLine(message);
// "Hello Rahim, your order 12345 is ready!"
```

---

## Insert() — নতুন Text যোগ করা

নির্দিষ্ট position এ text **insert** করে:

```csharp
string text = "Hello World";

string inserted = text.Insert(6, "Beautiful ");
Console.WriteLine(inserted);  // "Hello Beautiful World"
```

### Beginning এ insert:

```csharp
string name = "Rahim";
string withTitle = name.Insert(0, "Dr. ");
Console.WriteLine(withTitle);  // "Dr. Rahim"
```

### End এ insert:

```csharp
string name = "Rahim";
string withSuffix = name.Insert(name.Length, " Jr.");
Console.WriteLine(withSuffix);  // "Rahim Jr."

// Same thing with +
string another = name + " Jr.";
```

**Insert এর বদলে সাধারণত `+` বা interpolation use হয়।**

---

## Remove() — Part সরানো

### Remove(startIndex) — start থেকে শেষ পর্যন্ত:

```csharp
string text = "Hello World";
string result = text.Remove(5);
Console.WriteLine(result);  // "Hello"
```

### Remove(startIndex, count) — নির্দিষ্ট characters:

```csharp
string text = "Hello Beautiful World";
string result = text.Remove(6, 10);  // 6 থেকে 10 char সরাও
Console.WriteLine(result);  // "Hello World"
```

---

## Real Example: Extension Remove

```csharp
string filename = "document.pdf";

int dotIdx = filename.LastIndexOf('.');
string nameOnly = filename.Remove(dotIdx);

Console.WriteLine(nameOnly);  // "document"
```

---

## String Concat

### + operator:

```csharp
string first = "Rahim";
string last = "Uddin";

string full = first + " " + last;
Console.WriteLine(full);  // "Rahim Uddin"
```

### String.Concat():

```csharp
string full2 = string.Concat(first, " ", last);
Console.WriteLine(full2);  // "Rahim Uddin"
```

### Interpolation (best!):

```csharp
string full3 = $"{first} {last}";
Console.WriteLine(full3);  // "Rahim Uddin"
```

**Interpolation সবচেয়ে readable — এটাই use করো!**

---

## Method Chaining

Multiple methods একসাথে use করা:

```csharp
string messy = "  HELLO world  ";

string clean = messy.Trim()           // "HELLO world"
                   .ToLower()          // "hello world"
                   .Replace(" ", "_"); // "hello_world"

Console.WriteLine(clean);
```

**খুব powerful — এক লাইনে সব!**

---

## Real Example: Slug Generator (URL-friendly)

Blog post title থেকে URL slug:

```csharp
string title = "C# Programming: Arrays & Loops!";

string slug = title.ToLower()                      // c# programming: arrays & loops!
                  .Replace(":", "")                // c# programming arrays & loops!
                  .Replace("&", "and")             // c# programming arrays and loops!
                  .Replace("!", "")                // c# programming arrays and loops
                  .Replace("#", "sharp")           // csharp programming arrays and loops
                  .Replace(" ", "-")               // csharp-programming-arrays-and-loops
                  .Trim('-');

Console.WriteLine(slug);
// csharp-programming-arrays-and-loops
```

---

## Real Example: Data Cleanup

```csharp
string csv = "Name: Rahim, Age: 25, City: Dhaka";

// Remove labels
string data = csv.Replace("Name: ", "")
                .Replace("Age: ", "")
                .Replace("City: ", "");

Console.WriteLine(data);  // "Rahim, 25, Dhaka"
```

---

## ⚠️ Immutability Recap

```csharp
string name = "Rahim";
name.Replace("R", "K");  // ❌ effect নেই!

Console.WriteLine(name);  // "Rahim" (unchanged)

// ✅ Assign করো
name = name.Replace("R", "K");
Console.WriteLine(name);  // "Kahim"
```

**প্রতিটা method নতুন string return — assign না করলে harm!**

---

## Complete Example: Comment Moderator

```csharp
string comment = "   This stupid product is BAD!!!   ";

Console.WriteLine($"Raw:       '{comment}'");

// Step 1: Trim
comment = comment.Trim();
Console.WriteLine($"Trimmed:   '{comment}'");

// Step 2: Lowercase
comment = comment.ToLower();
Console.WriteLine($"Lowered:   '{comment}'");

// Step 3: Remove excessive punctuation
comment = comment.Replace("!!!", "!");
Console.WriteLine($"Cleaned:   '{comment}'");

// Step 4: Censor bad words
comment = comment.Replace("stupid", "[censored]")
                .Replace("bad", "[censored]");
Console.WriteLine($"Censored:  '{comment}'");
```

Output:
```
Raw:       '   This stupid product is BAD!!!   '
Trimmed:   'This stupid product is BAD!!!'
Lowered:   'this stupid product is bad!!!'
Cleaned:   'this stupid product is bad!'
Censored:  'this [censored] product is [censored]!'
```

---

## Common Mistakes

### ❌ Mistake 1: Replace result ignore

```csharp
string name = "Rahim";
name.Replace("R", "K");  // ❌ return ignored!
// name এখনো "Rahim"

name = name.Replace("R", "K");  // ✅
```

### ❌ Mistake 2: Case sensitive Replace

```csharp
string text = "Hello";
text.Replace("hello", "Hi");  // ❌ "hello" পাবে না!
text.Replace("Hello", "Hi");  // ✅
```

### ❌ Mistake 3: Insert এ wrong index

```csharp
string text = "Rahim";
text.Insert(100, " Uddin");  // ❌ Exception!
```

---

## Summary

| Method | কাজ |
|--------|-----|
| `Replace(old, new)` | সব occurrences বদল |
| `Insert(idx, text)` | নির্দিষ্ট position এ text যোগ |
| `Remove(idx)` | idx থেকে শেষ পর্যন্ত সরাও |
| `Remove(idx, count)` | নির্দিষ্ট characters সরাও |
| `+` / `$""` | Concatenation (interpolation best!) |

**মনে রাখো:**
- সব methods **new string return** — assign করো!
- **Method chaining** powerful: `.Trim().ToLower().Replace(...)`
- Replace **case sensitive**
- Interpolation > Concat > +

---

**পরের Lesson:** Split ও Join — String ↔ Array convert!

---

*CPS Academy - Learn. Code. Grow.*
