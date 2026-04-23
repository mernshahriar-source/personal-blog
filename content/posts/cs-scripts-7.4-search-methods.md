---
title: "Lesson 7.4: Search Methods — Contains, StartsWith, EndsWith, IndexOf"
date: "2026-05-27"
excerpt: "String এ search করা — Contains, StartsWith, EndsWith, IndexOf, LastIndexOf এবং real examples (comment filter, email check, search system)"
categories:
  - C# Course Scripts
tags:
  - csharp
  - strings
  - search
draft: false
---

# Lesson 7.4: Search Methods — Contains, StartsWith, EndsWith, IndexOf

> **এই Lesson এ শিখবে:** Contains() — আছে কিনা, StartsWith() — দিয়ে শুরু, EndsWith() — দিয়ে শেষ, IndexOf() — কোথায় আছে, LastIndexOf() — শেষ occurrence, Case-insensitive search, এবং real examples (comment filter, email check, file type check)।

---

## Contains() — আছে কিনা

String এর ভিতরে কোনো text **আছে কিনা** check করে। Return: `true` / `false`।

```csharp
string sentence = "I love programming in C#";

Console.WriteLine(sentence.Contains("love"));         // True
Console.WriteLine(sentence.Contains("programming"));  // True
Console.WriteLine(sentence.Contains("C#"));           // True
Console.WriteLine(sentence.Contains("Java"));         // False
```

### ⚠️ Case-sensitive!

```csharp
string text = "Hello World";

Console.WriteLine(text.Contains("World"));  // True
Console.WriteLine(text.Contains("world"));  // False! (w ছোট)
Console.WriteLine(text.Contains("WORLD"));  // False! (সব বড়)
```

### Case-insensitive way:

```csharp
Console.WriteLine(text.ToLower().Contains("world"));  // True ✅
```

---

## Real Example: Comment Filter

```csharp
string[] comments = {
    "This product is great!",
    "Worst purchase ever",
    "Amazing quality",
    "Bad customer service",
    "Would recommend to everyone"
};

string[] badWords = { "bad", "worst" };

foreach (string comment in comments)
{
    bool hasBadWord = false;

    foreach (string badWord in badWords)
    {
        if (comment.ToLower().Contains(badWord))
        {
            hasBadWord = true;
            break;
        }
    }

    if (hasBadWord)
        Console.WriteLine($"❌ BLOCKED: {comment}");
    else
        Console.WriteLine($"✅ APPROVED: {comment}");
}
```

Output:
```
✅ APPROVED: This product is great!
❌ BLOCKED: Worst purchase ever
✅ APPROVED: Amazing quality
❌ BLOCKED: Bad customer service
✅ APPROVED: Would recommend to everyone
```

---

## StartsWith() — দিয়ে শুরু কিনা

String কি নির্দিষ্ট text দিয়ে **শুরু** হয়েছে?

```csharp
string name = "Dr. Rahim";

Console.WriteLine(name.StartsWith("Dr."));  // True
Console.WriteLine(name.StartsWith("Mr."));  // False
```

### Examples:

```csharp
string url = "https://cpsacademy.io";
Console.WriteLine(url.StartsWith("https"));  // True
Console.WriteLine(url.StartsWith("http"));   // True
Console.WriteLine(url.StartsWith("ftp"));    // False

string command = "START game";
Console.WriteLine(command.StartsWith("START"));  // True
```

---

## EndsWith() — দিয়ে শেষ কিনা

String কি নির্দিষ্ট text দিয়ে **শেষ** হয়েছে?

```csharp
string filename = "document.pdf";

Console.WriteLine(filename.EndsWith(".pdf"));  // True
Console.WriteLine(filename.EndsWith(".jpg"));  // False
Console.WriteLine(filename.EndsWith("pdf"));   // True
```

### File Type Check:

```csharp
string[] files = {
    "resume.pdf",
    "photo.jpg",
    "document.docx",
    "image.png",
    "report.pdf"
};

foreach (string file in files)
{
    string type;
    if (file.EndsWith(".pdf"))
        type = "📄 PDF";
    else if (file.EndsWith(".jpg") || file.EndsWith(".png"))
        type = "🖼️ Image";
    else if (file.EndsWith(".docx"))
        type = "📝 Word";
    else
        type = "📎 Unknown";

    Console.WriteLine($"{type}: {file}");
}
```

Output:
```
📄 PDF: resume.pdf
🖼️ Image: photo.jpg
📝 Word: document.docx
🖼️ Image: image.png
📄 PDF: report.pdf
```

---

## Email Validation (Basic)

```csharp
Console.Write("Email: ");
string email = Console.ReadLine().Trim().ToLower();

bool valid = email.Contains("@") &&
             email.Contains(".") &&
             !email.StartsWith("@") &&
             !email.EndsWith("@");

if (valid)
    Console.WriteLine("✅ Valid email format");
else
    Console.WriteLine("❌ Invalid email!");
```

**এটা basic — proper validation আরো complex, কিন্তু concept বুঝা যাচ্ছে!**

---

## IndexOf() — কোন Position এ আছে

Character/substring এর **index** (position) ফিরিয়ে দেয়। না পেলে `-1`।

```csharp
string sentence = "I love programming";

int idx = sentence.IndexOf("love");
Console.WriteLine(idx);  // 2

int notFound = sentence.IndexOf("hate");
Console.WriteLine(notFound);  // -1
```

### Character ও search করা যায়:

```csharp
string email = "rahim@gmail.com";

int atPos = email.IndexOf('@');
Console.WriteLine(atPos);  // 5

int dotPos = email.IndexOf('.');
Console.WriteLine(dotPos);  // 11
```

---

## Real Example: Extract Domain from Email

```csharp
string email = "rahim@cpsacademy.io";

int atIdx = email.IndexOf('@');

if (atIdx != -1)
{
    string username = email.Substring(0, atIdx);  // "rahim"
    string domain = email.Substring(atIdx + 1);   // "cpsacademy.io"

    Console.WriteLine($"Username: {username}");
    Console.WriteLine($"Domain: {domain}");
}
```

`Substring` পরের lesson এ details।

---

## LastIndexOf() — শেষ Occurrence

Duplicate থাকলে **শেষেরটার** index:

```csharp
string text = "I like cats and dogs and birds";

int first = text.IndexOf("and");      // 12 (প্রথম "and")
int last = text.LastIndexOf("and");   // 21 (শেষ "and")

Console.WriteLine($"First: {first}");
Console.WriteLine($"Last: {last}");
```

### File Extension Get:

```csharp
string filename = "photo.backup.jpg";

int lastDot = filename.LastIndexOf('.');
string ext = filename.Substring(lastDot);

Console.WriteLine(ext);  // ".jpg"
```

**শেষ dot থেকে শুরু — extension পেলাম!**

---

## IndexOf() with Start Position

নির্দিষ্ট position থেকে search শুরু করা:

```csharp
string text = "banana";

int first = text.IndexOf('a');       // 1 (প্রথম 'a')
int second = text.IndexOf('a', 2);   // 3 (index 2 এর পর থেকে search)
int third = text.IndexOf('a', 4);    // 5
```

---

## Combining Methods — URL Validator

```csharp
Console.Write("Enter URL: ");
string url = Console.ReadLine().Trim().ToLower();

bool validProtocol = url.StartsWith("http://") || url.StartsWith("https://");
bool hasDomain = url.Contains(".");
bool validLength = url.Length > 10;

if (validProtocol && hasDomain && validLength)
{
    Console.WriteLine("✅ Valid URL!");

    // Extract domain
    int start = url.IndexOf("://") + 3;
    string domain = url.Substring(start);
    Console.WriteLine($"Domain: {domain}");
}
else
{
    Console.WriteLine("❌ Invalid URL!");
}
```

---

## Real Example: Search System

```csharp
string[] products = {
    "iPhone 15 Pro Max",
    "Samsung Galaxy S24",
    "MacBook Pro 16",
    "iPad Air",
    "Dell XPS 13",
    "HP Pavilion"
};

Console.Write("Search: ");
string query = Console.ReadLine().ToLower().Trim();

Console.WriteLine($"\n🔍 Results for '{query}':\n");

int count = 0;
foreach (string product in products)
{
    if (product.ToLower().Contains(query))
    {
        Console.WriteLine($"  ✅ {product}");
        count++;
    }
}

Console.WriteLine($"\n{count} results found.");
```

Run:
```
Search: pro

🔍 Results for 'pro':

  ✅ iPhone 15 Pro Max
  ✅ MacBook Pro 16

2 results found.
```

---

## Common Mistakes

### ❌ Mistake 1: Case-sensitive ভুলে যাওয়া

```csharp
string text = "Hello";

if (text.Contains("hello"))  // ❌ False!

if (text.ToLower().Contains("hello"))  // ✅
```

### ❌ Mistake 2: IndexOf -1 check না করা

```csharp
string text = "Rahim";
int idx = text.IndexOf("Z");  // -1

string result = text.Substring(idx);  // ❌ Substring(-1) Error!

// ✅
if (idx != -1)
    string result = text.Substring(idx);
```

### ❌ Mistake 3: Empty string check

```csharp
string text = "Rahim";
Console.WriteLine(text.Contains(""));   // True (always!)
Console.WriteLine(text.StartsWith("")); // True (always!)
```

---

## Summary

| Method | কাজ | Return |
|--------|-----|--------|
| `Contains()` | আছে কিনা | bool |
| `StartsWith()` | দিয়ে শুরু | bool |
| `EndsWith()` | দিয়ে শেষ | bool |
| `IndexOf()` | প্রথম position | int (-1 if not) |
| `LastIndexOf()` | শেষ position | int (-1 if not) |

**মনে রাখো:**
- সব **case-sensitive** — ToLower() দিয়ে fix করো
- IndexOf **-1** পেলে জানো পাওয়া যায়নি
- Search করার আগে **Trim() + ToLower()** করলে best
- Chain করা যায়: `text.ToLower().Contains(query.ToLower())`

---

**পরের Lesson:** Substring ও Extraction — part of string বের করা!

---

*CPS Academy - Learn. Code. Grow.*
