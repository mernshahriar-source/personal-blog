---
title: "Lesson 7.2: Dictionary<K,V> — Key-Value Storage"
date: "2026-03-26"
excerpt: "Dictionary কী, Key-Value concept, তৈরি করা, Add/Remove/Update, TryGetValue, ContainsKey, Keys/Values, Loop করা, এবং real-world examples (Product Catalog, Word Counter)"
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


> **এই Lesson এ শিখবে:** Dictionary কী, Key-Value concept, তৈরি করা, Add/Remove/Update, TryGetValue, ContainsKey, Keys/Values, Loop করা, এবং real-world examples (Product Catalog, Word Counter)।

---

## Dictionary কেন দরকার?

ধরো Product ID দিলে Price চাও:

```csharp
// ❌ Array দিয়ে — প্রতিবার loop!
string[] ids = { "P001", "P002", "P003" };
int[] prices = { 500, 1200, 350 };

// "P002" এর price? → Loop চালাও, খুঁজো... slow!
```

**Dictionary দিয়ে:**

```csharp
// ✅ Key দাও → Value পাও (instant!)
Dictionary<string, int> catalog = new Dictionary<string, int>();
catalog["P001"] = 500;
catalog["P002"] = 1200;

int price = catalog["P002"];  // 1200 — instant!
```

---

## Dictionary কী?

**Key-Value Store** — প্রতিটা item এর একটা unique **Key** আছে, আর সেই Key এর সাথে একটা **Value** জুড়ে আছে।

```
Key       →  Value
──────────────────
"P001"    →  500
"P002"    →  1200
"Rahim"   →  85
102       →  "Karim"
```

---

## তৈরি করা

```csharp
// Way 1: Empty
Dictionary<string, int> prices = new Dictionary<string, int>();

// Way 2: Values সহ
Dictionary<string, int> marks = new Dictionary<string, int>
{
    { "Rahim", 85 },
    { "Karim", 90 },
    { "Jabbar", 78 }
};
```

`<string, int>` মানে — **string** key, **int** value।

---

## Add করা

```csharp
Dictionary<string, int> marks = new Dictionary<string, int>();

// Way 1: Add method
marks.Add("Rahim", 85);

// Way 2: Indexer (সহজ!)
marks["Karim"] = 90;
marks["Jabbar"] = 78;
```

**⚠️ Key duplicate হলে:**
- `Add()` → **Error!** (KeyAlreadyExists)
- `marks["key"] = value` → existing value **update** হবে

---

## Value পড়া (Access)

```csharp
// Way 1: Direct (key না থাকলে Error!)
int rahimMarks = marks["Rahim"];  // 85

// Way 2: TryGetValue (safe! ✅)
if (marks.TryGetValue("Karim", out int value))
    Console.WriteLine($"Karim: {value}");
else
    Console.WriteLine("Not found!");
```

**সবসময় `TryGetValue` বা `ContainsKey` use করো** — direct access এ key না থাকলে crash!

---

## Update করা

```csharp
marks["Rahim"] = 92;  // 85 → 92 (update)
```

---

## Remove করা

```csharp
marks.Remove("Jabbar");  // Key দিয়ে মুছো
marks.Clear();            // সব মুছো
```

---

## Search করা

```csharp
// Key আছে কিনা
bool hasRahim = marks.ContainsKey("Rahim");    // true

// Value আছে কিনা
bool has90 = marks.ContainsValue(90);           // true
```

---

## Properties

```csharp
Console.WriteLine(marks.Count);  // কতগুলো pair

// সব keys
foreach (string key in marks.Keys)
    Console.Write(key + " ");

// সব values
foreach (int val in marks.Values)
    Console.Write(val + " ");
```

---

## Loop করা

```csharp
Dictionary<string, int> marks = new Dictionary<string, int>
{
    { "Rahim", 85 }, { "Karim", 90 }, { "Jabbar", 78 }
};

// KeyValuePair
foreach (KeyValuePair<string, int> pair in marks)
    Console.WriteLine($"{pair.Key}: {pair.Value}");

// var (সহজ!)
foreach (var pair in marks)
    Console.WriteLine($"{pair.Key}: {pair.Value}");
```

---

## Example: Product Catalog 🛒

```csharp
Dictionary<string, double> catalog = new Dictionary<string, double>
{
    { "P001", 500.00 }, { "P002", 1200.00 },
    { "P003", 350.00 }, { "P004", 899.99 }
};

Console.Write("Enter Product ID: ");
string id = "P002";

if (catalog.TryGetValue(id, out double price))
    Console.WriteLine($"Price: {price} tk");
else
    Console.WriteLine("Product not found!");
```

---

## Example: Word Counter 📊

```csharp
string text = "I love Bangladesh Bangladesh is beautiful I love coding";
string[] words = text.ToLower().Split(' ');

Dictionary<string, int> wordCount = new Dictionary<string, int>();

foreach (string word in words)
{
    if (wordCount.ContainsKey(word))
        wordCount[word]++;
    else
        wordCount[word] = 1;
}

foreach (var pair in wordCount)
    Console.WriteLine($"  {pair.Key}: {pair.Value}");
```

Output:
```
  i: 2
  love: 2
  bangladesh: 2
  is: 1
  beautiful: 1
  coding: 1
```

---

## Dictionary vs List

| Feature | List | Dictionary |
|---------|------|-----------|
| Access | Index দিয়ে | **Key দিয়ে** |
| Search speed | Loop (slow) | **Instant (fast)** |
| Data format | Single values | **Key-Value pairs** |
| Use case | Ordered collection | Lookup table |

---

## All Methods — Quick Reference

| Method | কাজ |
|--------|-----|
| `Add(key, value)` | নতুন pair যোগ |
| `dict[key] = value` | Add বা Update |
| `Remove(key)` | মুছো |
| `ContainsKey(key)` | Key আছে কিনা |
| `ContainsValue(val)` | Value আছে কিনা |
| `TryGetValue(key, out val)` | Safe access |
| `Clear()` | সব মুছো |
| `Count` | কতগুলো pair |
| `Keys` | সব keys |
| `Values` | সব values |

---

## Summary

**মনে রাখো:**
- **Key unique** হতে হবে — duplicate key Error!
- Direct access `dict[key]` এ key না থাকলে **crash** → `TryGetValue` use করো
- Key দিয়ে value খোঁজা **instant fast**
- `ContainsKey()` দিয়ে আগে check করো

---

**পরের Lesson:** Stack\<T\> — Last In First Out (LIFO)।

---

*CPS Academy - Learn. Code. Grow.*
