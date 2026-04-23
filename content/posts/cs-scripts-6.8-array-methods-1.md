---
title: "Lesson 6.8: Array Methods Part 1 — Sort, Reverse, IndexOf, Copy"
date: "2026-05-21"
excerpt: "Built-in Array methods — Sort, Reverse, IndexOf, LastIndexOf, Copy এবং Clear"
categories:
  - C# Course Scripts
tags:
  - csharp
  - array-methods
  - sort
  - search
draft: false
---

# Lesson 6.8: Array Methods Part 1 — Sort, Reverse, IndexOf, Copy

> **এই Lesson এ শিখবে:** Built-in Array methods কী, Array.Sort(), Array.Reverse(), Sort+Reverse = Descending, Array.IndexOf(), Array.LastIndexOf(), Array.Copy(), এবং Array.Clear()।

---

## Built-in Methods কী?

C# এর Array class এ অনেক method **আগে থেকেই লেখা আছে**!

তুমি শুধু use করবে:

```csharp
Array.MethodName(arrayName);
```

অনেকটা **Calculator app** এর মতো — তুমি নিজে যোগ-বিয়োগের logic লেখো নাই, কিন্তু use করতে পারছো।

---

## Array.Sort() — ছোট থেকে বড় সাজানো

Array এর elements কে **ascending order** এ সাজায়।

### Numbers Sort:

```csharp
int[] numbers = { 64, 25, 12, 89, 33 };

Console.WriteLine("Before: " + string.Join(" ", numbers));

Array.Sort(numbers);  // এক লাইন!

Console.WriteLine("After: " + string.Join(" ", numbers));
```

Output:
```
Before: 64 25 12 89 33
After: 12 25 33 64 89
```

**শুধু এক লাইন — কাজ হয়ে গেছে!**

---

### Strings Sort — Alphabetically:

```csharp
string[] names = { "Zahir", "Rahim", "Karim", "Abdul" };

Array.Sort(names);

foreach (string name in names)
    Console.WriteLine(name);
```

Output:
```
Abdul
Karim
Rahim
Zahir
```

A → Z order!

---

### Double/Decimal Sort:

```csharp
double[] prices = { 99.99, 49.50, 149.00, 25.75 };
Array.Sort(prices);
// prices = { 25.75, 49.50, 99.99, 149.00 }
```

---

## Array.Reverse() — উল্টানো

Array কে **উল্টে দেয়** — শেষেরটা প্রথমে, প্রথমটা শেষে।

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

Array.Reverse(numbers);

foreach (int n in numbers)
    Console.Write(n + " ");
```

Output: `5 4 3 2 1`

### কী হলো?

```
Original:  1  2  3  4  5
           ↓  ↓  ↓  ↓  ↓
Reversed:  5  4  3  2  1
```

---

## Sort + Reverse = Descending Order! 🎯

এটা একটা **trick**!

- `Sort()` → ছোট থেকে বড়
- `Reverse()` → উল্টায়
- **Combined → বড় থেকে ছোট!**

```csharp
int[] marks = { 78, 92, 45, 88, 65 };

Array.Sort(marks);      // 45, 65, 78, 88, 92
Array.Reverse(marks);   // 92, 88, 78, 65, 45

foreach (int m in marks)
    Console.Write(m + " ");
// Output: 92 88 78 65 45
```

### এক নজরে:

```
Sort()              →  Ascending (ছোট থেকে বড়)
Reverse()           →  উল্টানো
Sort() + Reverse()  →  Descending (বড় থেকে ছোট)
```

---

## Array.IndexOf() — কোন Index এ আছে?

Element **আছে কিনা** এবং **কোন index এ** জানতে:

```csharp
Array.IndexOf(arrayName, searchValue);
```

- পেলে: সেই element এর index return করে
- না পেলে: **-1** return করে

### Example:

```csharp
int[] numbers = { 10, 25, 40, 55, 70, 85 };

int index = Array.IndexOf(numbers, 40);
Console.WriteLine(index);  // 2 (index 2 এ আছে)

int notFound = Array.IndexOf(numbers, 99);
Console.WriteLine(notFound);  // -1 (নেই!)
```

### Use Case: Check if Exists:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int target = 78;

if (Array.IndexOf(marks, target) != -1)
    Console.WriteLine($"✅ {target} found!");
else
    Console.WriteLine($"❌ {target} not found!");
```

### String Search:

```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };

int pos = Array.IndexOf(names, "Karim");
Console.WriteLine(pos);  // 1
```

---

## Array.LastIndexOf() — শেষ Occurrence

Duplicate থাকলে **শেষেরটার** index:

```csharp
int[] numbers = { 1, 5, 3, 5, 7, 5, 9 };

int first = Array.IndexOf(numbers, 5);       // 1 (প্রথমটা)
int last = Array.LastIndexOf(numbers, 5);    // 5 (শেষেরটা)

Console.WriteLine($"First 5: index {first}");
Console.WriteLine($"Last 5: index {last}");
```

---

## Array.Copy() — Copy করা

এক array থেকে আরেক array তে **copy**:

```csharp
Array.Copy(sourceArray, destinationArray, length);
```

### Example:

```csharp
int[] source = { 10, 20, 30, 40, 50 };
int[] destination = new int[5];

Array.Copy(source, destination, 5);

foreach (int n in destination)
    Console.Write(n + " ");
// Output: 10 20 30 40 50
```

### কিছু elements copy:

```csharp
int[] source = { 1, 2, 3, 4, 5 };
int[] dest = new int[3];

Array.Copy(source, dest, 3);  // প্রথম 3 টা copy

foreach (int n in dest)
    Console.Write(n + " ");
// Output: 1 2 3
```

### ⚠️ Direct Assignment vs Copy

```csharp
// ❌ এটা copy না — reference share!
int[] a = { 1, 2, 3 };
int[] b = a;  // b আর a same array কে point করছে!

b[0] = 999;
Console.WriteLine(a[0]);  // 999! (a ও change হয়ে গেছে!)

// ✅ Array.Copy দিয়ে true copy
int[] c = { 1, 2, 3 };
int[] d = new int[3];
Array.Copy(c, d, 3);

d[0] = 999;
Console.WriteLine(c[0]);  // 1 (c unchanged!)
```

---

## Array.Clear() — মুছে ফেলা

Array এর কিছু/সব elements কে **default value** এ set করে:

```csharp
Array.Clear(arrayName, startIndex, length);
```

### সব clear:

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

Array.Clear(numbers, 0, numbers.Length);

foreach (int n in numbers)
    Console.Write(n + " ");
// Output: 0 0 0 0 0
```

### কিছু clear:

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

Array.Clear(numbers, 1, 3);  // index 1 থেকে 3টা

foreach (int n in numbers)
    Console.Write(n + " ");
// Output: 10 0 0 0 50
```

### String এ Clear:

```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };
Array.Clear(names, 0, names.Length);

// সব null হয়ে যাবে
```

---

## Complete Example: Marks Analysis

```csharp
int[] marks = { 78, 92, 45, 88, 65, 95, 72, 88 };

Console.WriteLine("🎓 MARKS ANALYSIS\n");

// Original
Console.WriteLine("Original: " + string.Join(", ", marks));

// Sort ascending
int[] ascending = new int[marks.Length];
Array.Copy(marks, ascending, marks.Length);
Array.Sort(ascending);
Console.WriteLine("Ascending: " + string.Join(", ", ascending));

// Sort descending
int[] descending = new int[marks.Length];
Array.Copy(marks, descending, marks.Length);
Array.Sort(descending);
Array.Reverse(descending);
Console.WriteLine("Descending: " + string.Join(", ", descending));

// Highest ও Lowest
Console.WriteLine($"\nHighest: {ascending[ascending.Length - 1]}");
Console.WriteLine($"Lowest: {ascending[0]}");

// Search for 88
int pos = Array.IndexOf(marks, 88);
int lastPos = Array.LastIndexOf(marks, 88);
Console.WriteLine($"\n88 first at: {pos}");
Console.WriteLine($"88 last at: {lastPos}");
```

Output:
```
🎓 MARKS ANALYSIS

Original: 78, 92, 45, 88, 65, 95, 72, 88
Ascending: 45, 65, 72, 78, 88, 88, 92, 95
Descending: 95, 92, 88, 88, 78, 72, 65, 45

Highest: 95
Lowest: 45

88 first at: 3
88 last at: 7
```

---

## Summary Table

| Method | কাজ | Signature |
|--------|-----|-----------|
| **Sort** | Ascending sort | `Array.Sort(arr)` |
| **Reverse** | উল্টানো | `Array.Reverse(arr)` |
| **Sort + Reverse** | Descending | (combined) |
| **IndexOf** | প্রথম match এর index | `Array.IndexOf(arr, val)` |
| **LastIndexOf** | শেষ match এর index | `Array.LastIndexOf(arr, val)` |
| **Copy** | Copy to another array | `Array.Copy(src, dest, n)` |
| **Clear** | Reset to default | `Array.Clear(arr, start, n)` |

**মনে রাখো:**
- Methods array কে **modify** করে (নতুন array return না)
- IndexOf **-1** return করে না পেলে
- `int[] b = a;` copy **না** — reference share!
- True copy এর জন্য **Array.Copy()**

---

**পরের Lesson:** Array Methods Part 2 — Find, Exists, FindAll, Resize!

---

*CPS Academy - Learn. Code. Grow.*
