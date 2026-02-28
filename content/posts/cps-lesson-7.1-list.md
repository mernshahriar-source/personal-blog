---
title: "Lesson 7.1: List<T> — Dynamic Array"
date: "2026-03-25"
excerpt: "Collections কী ও কেন দরকার, Generic `<T>`, List তৈরি, Add/Insert/Remove/RemoveAt, Contains/Find/IndexOf, Sort/Reverse, Count, Array vs List, এবং using namespace"
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


> **এই Lesson এ শিখবে:** Collections কী ও কেন দরকার, Generic `<T>`, List তৈরি, Add/Insert/Remove/RemoveAt, Contains/Find/IndexOf, Sort/Reverse, Count, Array vs List, এবং using namespace।

---

## Collections কেন দরকার?

Array এর সমস্যা:
- **Size fixed!** নতুন item আসলে?
- মাঝখান থেকে **Remove কঠিন**
- Size আগে থেকে জানতে হয়

**Collections = ready-made powerful data structures!**

| চাই | Tool |
|-----|------|
| Dynamic size array | **List** |
| Key দিয়ে value খোঁজা | Dictionary |
| Last In First Out | Stack |
| First In First Out | Queue |
| শুধু unique items | HashSet |

---

## Generic কী? (`<T>`)

`<T>` বলে দেয় কোন type এর data রাখবে:

```csharp
List<int>       // শুধু int
List<string>    // শুধু string
List<double>    // শুধু double
```

ভুল type দিলে **compile error** — Type Safety!

---

## List তৈরি করা

```csharp
using System.Collections.Generic;  // এটা উপরে লাগবে!
```

```csharp
// Way 1: Empty list
List<int> numbers = new List<int>();

// Way 2: Values সহ
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

// Way 3: Array থেকে
int[] arr = { 10, 20, 30 };
List<int> nums = new List<int>(arr);
```

---

## Add করা

```csharp
List<string> fruits = new List<string>();

fruits.Add("Apple");      // শেষে যোগ: [Apple]
fruits.Add("Banana");     // শেষে যোগ: [Apple, Banana]
fruits.Add("Mango");      // [Apple, Banana, Mango]

// অনেকগুলো একসাথে
fruits.AddRange(new string[] { "Orange", "Grape" });

// নির্দিষ্ট জায়গায়
fruits.Insert(1, "Cherry");  // index 1 এ: [Apple, Cherry, Banana, ...]
```

| Method | কাজ |
|--------|-----|
| `Add(item)` | শেষে যোগ |
| `AddRange(items)` | অনেকগুলো যোগ |
| `Insert(index, item)` | নির্দিষ্ট জায়গায় |

---

## Remove করা

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango", "Orange" };

fruits.Remove("Banana");     // value দিয়ে মুছো
fruits.RemoveAt(0);          // index দিয়ে মুছো (Apple)
fruits.RemoveAll(f => f.Length > 5);  // condition দিয়ে
fruits.Clear();              // সব মুছো
```

| Method | কাজ |
|--------|-----|
| `Remove(item)` | Value দিয়ে (প্রথমটা) |
| `RemoveAt(index)` | Index দিয়ে |
| `RemoveAll(condition)` | Condition দিয়ে সব |
| `Clear()` | সব মুছো |

---

## Count ও Index Access

```csharp
List<int> nums = new List<int> { 10, 20, 30, 40, 50 };

Console.WriteLine(nums.Count);   // 5 (Length না, Count!)
Console.WriteLine(nums[0]);      // 10 (index দিয়ে access)
Console.WriteLine(nums[4]);      // 50

nums[2] = 99;  // index 2 এর value change
```

---

## Search করা

```csharp
List<string> names = new List<string> { "Rahim", "Karim", "Jabbar", "Salam" };

bool exists = names.Contains("Karim");         // true
int index = names.IndexOf("Jabbar");           // 2
string found = names.Find(n => n.Length > 5);  // "Jabbar"
List<string> all = names.FindAll(n => n.StartsWith("R")); // ["Rahim"]
bool any = names.Exists(n => n == "Salam");    // true
```

| Method | কাজ | Returns |
|--------|-----|---------|
| `Contains(item)` | আছে কিনা | bool |
| `IndexOf(item)` | কোথায় আছে | int (-1 = নেই) |
| `Find(condition)` | প্রথম match | element |
| `FindAll(condition)` | সব match | new List |
| `Exists(condition)` | কোনো match আছে? | bool |

---

## Sort ও Reverse

```csharp
List<int> nums = new List<int> { 64, 25, 12, 89, 33 };

nums.Sort();     // ছোট → বড়: 12 25 33 64 89
nums.Reverse();  // উল্টাও: 89 64 33 25 12
```

---

## Loop করা

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

// foreach (সবচেয়ে common)
foreach (string fruit in fruits)
    Console.WriteLine(fruit);

// for (index দরকার হলে)
for (int i = 0; i < fruits.Count; i++)
    Console.WriteLine($"{i}: {fruits[i]}");
```

---

## Array vs List

| Feature | Array | List |
|---------|-------|------|
| Size | **Fixed** | **Dynamic** |
| Add/Remove | কঠিন | সহজ (methods আছে) |
| Speed | সামান্য faster | সামান্য slower |
| Features | কম | অনেক (Find, Sort, etc.) |

**বেশিরভাগ সময় List use করো!** Array শুধু fixed-size data এ।

---

## Complete Example: Student Manager

```csharp
List<string> students = new List<string>();

// Add students
students.Add("Rahim");
students.Add("Karim");
students.Add("Jabbar");
students.Add("Salam");
students.Add("Jalil");

Console.WriteLine($"Total students: {students.Count}");

// Remove one
students.Remove("Jabbar");

// Sort alphabetically
students.Sort();

// Display
Console.WriteLine("\n📋 Student List:");
for (int i = 0; i < students.Count; i++)
    Console.WriteLine($"  {i + 1}. {students[i]}");

// Search
Console.Write("\nSearch: ");
string query = "Karim";
if (students.Contains(query))
    Console.WriteLine($"✅ {query} found at position {students.IndexOf(query) + 1}");
else
    Console.WriteLine($"❌ {query} not found");
```

---

## Summary

| Method | কাজ |
|--------|-----|
| `Add(item)` | শেষে যোগ |
| `Insert(i, item)` | নির্দিষ্ট জায়গায় |
| `Remove(item)` | Value দিয়ে মুছো |
| `RemoveAt(i)` | Index দিয়ে মুছো |
| `Contains(item)` | আছে কিনা |
| `Find(cond)` | প্রথম match |
| `Sort()` | ছোট → বড় |
| `Count` | কয়টা item |

**মনে রাখো:**
- `using System.Collections.Generic;` লাগবে
- `Count` use করো, `Length` না
- Array = fixed, **List = dynamic**

---

**পরের Lesson:** Dictionary\<K,V\> — Key দিয়ে Value খোঁজা।

---

*CPS Academy - Learn. Code. Grow.*
