---
title: "Lesson 7.8: String Comparison ও Formatting"
date: "2026-05-31"
excerpt: "Equals, CompareTo, Format specifiers (F, N, C, P, D), Alignment, DateTime formatting এবং StringBuilder"
categories:
  - C# Course Scripts
tags:
  - csharp
  - strings
  - format
  - stringbuilder
draft: false
---

# Lesson 7.8: String Comparison ও Formatting

> **এই Lesson এ শিখবে:** Equals() — comparison method, CompareTo() — alphabetical compare, String.Format() — formatted string, Interpolation recap, Format specifiers (F, N, C, D, P), Alignment, StringBuilder intro।

---

## String Comparison

### == vs Equals()

দুইটাই compare করে, কিন্তু slight পার্থক্য:

```csharp
string a = "Rahim";
string b = "Rahim";

Console.WriteLine(a == b);          // True
Console.WriteLine(a.Equals(b));     // True
```

দুইটাই same কাজ করে — `==` কে preference দেই readability এর জন্য।

---

### Case-Insensitive Comparison

```csharp
string a = "Rahim";
string b = "RAHIM";

Console.WriteLine(a == b);  // False
Console.WriteLine(a.ToLower() == b.ToLower());  // True

// Better way (built-in):
Console.WriteLine(a.Equals(b, StringComparison.OrdinalIgnoreCase));  // True
```

**`StringComparison.OrdinalIgnoreCase`** = case ignore করে compare।

---

## CompareTo() — Alphabetical Order

```csharp
int result = "apple".CompareTo("banana");
Console.WriteLine(result);  // -1 (apple আগে)

int result2 = "banana".CompareTo("apple");
Console.WriteLine(result2);  // 1 (banana পরে)

int result3 = "apple".CompareTo("apple");
Console.WriteLine(result3);  // 0 (same)
```

### Return Values:

| Return | মানে |
|--------|------|
| Negative (less than 0) | বাম পাশের string **আগে** |
| `0` | **Same** |
| Positive (greater than 0) | বাম পাশের string **পরে** |

### Real Example: Sort decide করা

```csharp
string[] names = { "Zahir", "Abdul", "Karim" };

// Manual alphabetical check
if (names[0].CompareTo(names[1]) > 0)
{
    // swap
    string temp = names[0];
    names[0] = names[1];
    names[1] = temp;
}
```

**Array.Sort() automatically এটা use করে।**

---

## String.Format() — Formatted String

Interpolation এর পুরানো version:

```csharp
string name = "Rahim";
int age = 25;

// Old way
string msg = string.Format("Hello, {0}! You are {1} years old.", name, age);
Console.WriteLine(msg);

// Modern way (Interpolation)
string msg2 = $"Hello, {name}! You are {age} years old.";
```

**Interpolation newer, cleaner — এটাই use করো।**

---

## Format Specifiers

### Number formats:

```csharp
double price = 1234.5678;

Console.WriteLine($"{price:F0}");   // 1235 (0 decimal, rounded)
Console.WriteLine($"{price:F2}");   // 1234.57 (2 decimal)
Console.WriteLine($"{price:F4}");   // 1234.5678

// Comma separator
Console.WriteLine($"{price:N0}");   // 1,235
Console.WriteLine($"{price:N2}");   // 1,234.57

// Currency
Console.WriteLine($"{price:C}");    // $1,234.57 (locale দিয়ে)
Console.WriteLine($"{price:C0}");   // $1,235

// Percent
double percent = 0.8535;
Console.WriteLine($"{percent:P}");   // 85.35%
Console.WriteLine($"{percent:P0}");  // 85%
Console.WriteLine($"{percent:P2}");  // 85.35%
```

---

### Integer formats:

```csharp
int num = 42;

Console.WriteLine($"{num:D5}");   // 00042 (5 digit, leading zeros)
Console.WriteLine($"{num:X}");    // 2A (hexadecimal)
Console.WriteLine($"{num:X4}");   // 002A
```

---

## Alignment

```csharp
string name = "Rahim";
int marks = 85;

// Right align (positive width)
Console.WriteLine($"{name,10}: {marks,5}");
//                 "     Rahim:    85"

// Left align (negative width)
Console.WriteLine($"{name,-10}: {marks,-5}");
//                 "Rahim     : 85   "
```

### Real Example: Table

```csharp
string[] names = { "Rahim", "Karim", "Jabbar Ali" };
int[] marks = { 85, 90, 78 };
double[] cgpa = { 3.85, 3.92, 3.78 };

Console.WriteLine($"{"Name",-15} {"Marks",6} {"CGPA",8}");
Console.WriteLine(new string('-', 30));

for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"{names[i],-15} {marks[i],6} {cgpa[i],8:F2}");
}
```

Output:
```
Name            Marks     CGPA
------------------------------
Rahim              85     3.85
Karim              90     3.92
Jabbar Ali         78     3.78
```

---

## Combining Alignment + Format

```csharp
double amount = 1234.5;

Console.WriteLine($"{amount,15:N2}");   // "       1,234.50"
Console.WriteLine($"{amount,-15:N2}");  // "1,234.50       "
Console.WriteLine($"{amount,10:C}");    // "  $1,234.50"
```

---

## DateTime Formatting

```csharp
DateTime now = DateTime.Now;

Console.WriteLine($"{now}");                // 4/23/2026 10:30:45 AM
Console.WriteLine($"{now:yyyy-MM-dd}");     // 2026-04-23
Console.WriteLine($"{now:dd MMM yyyy}");    // 23 Apr 2026
Console.WriteLine($"{now:HH:mm:ss}");       // 10:30:45
Console.WriteLine($"{now:dddd}");           // Thursday
```

---

## StringBuilder — Efficient String Building

String **immutable** — বারবার concatenate করলে slow হয়!

### ❌ Slow way:

```csharp
string result = "";
for (int i = 0; i < 10000; i++)
{
    result += i.ToString() + ", ";  // প্রতিবার নতুন string!
}
```

### ✅ Fast way — StringBuilder:

```csharp
using System.Text;  // উপরে add করতে হবে

StringBuilder sb = new StringBuilder();

for (int i = 0; i < 10000; i++)
{
    sb.Append(i);
    sb.Append(", ");
}

string result = sb.ToString();
```

**StringBuilder অনেক fast — বড় string বানাতে!**

### Methods:

```csharp
StringBuilder sb = new StringBuilder();

sb.Append("Hello");        // যোগ
sb.Append(" ");
sb.Append("World");

sb.AppendLine("!");        // যোগ + new line

sb.Insert(0, ">>> ");      // নির্দিষ্ট position

sb.Replace("Hello", "Hi"); // Replace

string result = sb.ToString();
Console.WriteLine(result);
// >>> Hi World!
```

**Small strings এ normal string use করো। Loop এ বা বড় concat এ StringBuilder।**

---

## Real Example: Receipt Generator

```csharp
StringBuilder receipt = new StringBuilder();

receipt.AppendLine("╔══════════════════════════════╗");
receipt.AppendLine("║       🛒 RECEIPT             ║");
receipt.AppendLine("╠══════════════════════════════╣");

string[] items = { "Shirt", "Pants", "Shoes" };
double[] prices = { 850, 1200, 2500 };
double total = 0;

for (int i = 0; i < items.Length; i++)
{
    receipt.AppendLine($"║  {items[i],-15} {prices[i],8:N0} tk ║");
    total += prices[i];
}

receipt.AppendLine("╠══════════════════════════════╣");
receipt.AppendLine($"║  {"TOTAL",-15} {total,8:N0} tk ║");
receipt.AppendLine("╚══════════════════════════════╝");

Console.WriteLine(receipt.ToString());
```

---

## String Interpolation Advanced

### Conditional:

```csharp
int marks = 85;
Console.WriteLine($"Result: {(marks >= 40 ? "Pass" : "Fail")}");
// Result: Pass
```

### Expressions:

```csharp
int x = 10, y = 20;
Console.WriteLine($"Sum: {x + y}, Product: {x * y}");
// Sum: 30, Product: 200
```

### Method calls:

```csharp
string name = "rahim";
Console.WriteLine($"Hello, {name.ToUpper()}!");
// Hello, RAHIM!
```

---

## Summary

### Comparison:

| Method | কাজ |
|--------|-----|
| `==` | Equal compare |
| `.Equals()` | Equal compare (method) |
| `.Equals(s, OrdinalIgnoreCase)` | Case-insensitive |
| `.CompareTo()` | Alphabetical order (-1/0/1) |

### Format Specifiers:

| Spec | Example | Output |
|------|---------|--------|
| `F2` | `{3.14159:F2}` | 3.14 |
| `N0` | `{50000:N0}` | 50,000 |
| `N2` | `{1234.5:N2}` | 1,234.50 |
| `C` | `{1234.5:C}` | $1,234.50 |
| `P` | `{0.85:P}` | 85.00% |
| `D5` | `{42:D5}` | 00042 |

### Alignment:

```csharp
{value,10}    // Right (10 chars width)
{value,-10}   // Left
{value,10:F2} // Right + 2 decimal
```

**মনে রাখো:**
- **Interpolation** (`$""`) — modern, preferred
- Big concat → **StringBuilder**
- **Alignment** + format spec — combine করা যায়
- `StringComparison.OrdinalIgnoreCase` — best for case-insensitive

---

**পরের Lesson:** Practice & Assignments — Complete string programs!

---

*CPS Academy - Learn. Code. Grow.*
