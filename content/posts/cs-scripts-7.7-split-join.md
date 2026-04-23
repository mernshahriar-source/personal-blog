---
title: "Lesson 7.7: Split ও Join — String ↔ Array Convert"
date: "2026-05-30"
excerpt: "Split দিয়ে string কে array তে, Join দিয়ে array কে string এ, CSV parsing, Word counting এবং Email parts"
categories:
  - C# Course Scripts
tags:
  - csharp
  - strings
  - split
  - join
draft: false
---

# Lesson 7.7: Split ও Join — String ↔ Array Convert

> **এই Lesson এ শিখবে:** Split() — string থেকে array, Different separators, Multiple separators, Empty entries remove, Join() — array থেকে string, CSV parsing, Word counting, এবং real examples।

---

## Split() — String কে Array তে ভাঙা

String কে **array তে ভাঙো** নির্দিষ্ট character দিয়ে।

```csharp
string csv = "Rahim,Karim,Jabbar,Salam";

string[] names = csv.Split(',');

foreach (string name in names)
{
    Console.WriteLine(name);
}
```

Output:
```
Rahim
Karim
Jabbar
Salam
```

**Comma দিয়ে ভেঙে array বানিয়ে দিল!**

---

## Split by Space — Word Count

```csharp
string sentence = "I love programming in C#";

string[] words = sentence.Split(' ');

Console.WriteLine($"Total words: {words.Length}");  // 5

foreach (string word in words)
{
    Console.WriteLine(word);
}
```

Output:
```
Total words: 5
I
love
programming
in
C#
```

---

## Different Separators

### Split by character:

```csharp
string date = "2024-04-23";
string[] parts = date.Split('-');

Console.WriteLine($"Year: {parts[0]}");   // 2024
Console.WriteLine($"Month: {parts[1]}");  // 04
Console.WriteLine($"Day: {parts[2]}");    // 23
```

### Split by string:

```csharp
string log = "Error::File not found::404";
string[] segments = log.Split("::");

Console.WriteLine(segments[0]);  // Error
Console.WriteLine(segments[1]);  // File not found
Console.WriteLine(segments[2]);  // 404
```

---

## Multiple Separators

```csharp
string text = "apple,banana;orange|grape";

char[] separators = { ',', ';', '|' };
string[] fruits = text.Split(separators);

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

Output:
```
apple
banana
orange
grape
```

**তিনটা different separator — একসাথে সব দিয়ে split!**

---

## ⚠️ Empty Strings Problem

```csharp
string text = "Rahim,,Karim,,,Jabbar";
string[] parts = text.Split(',');

foreach (string p in parts)
{
    Console.WriteLine($"'{p}'");
}
```

Output:
```
'Rahim'
''
'Karim'
''
''
'Jabbar'
```

**খালি strings আসছে!** Empty entries চাই না?

### Fix: StringSplitOptions.RemoveEmptyEntries

```csharp
string[] clean = text.Split(',', StringSplitOptions.RemoveEmptyEntries);

foreach (string p in clean)
{
    Console.WriteLine(p);
}
```

Output:
```
Rahim
Karim
Jabbar
```

**Clean!**

---

## Join() — Array কে String এ জোড়া

Split এর **উল্টা**!

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam" };

string result = string.Join(", ", names);
Console.WriteLine(result);  // "Rahim, Karim, Jabbar, Salam"
```

### Different separators:

```csharp
string[] items = { "apple", "banana", "orange" };

Console.WriteLine(string.Join(", ", items));   // apple, banana, orange
Console.WriteLine(string.Join(" | ", items));  // apple | banana | orange
Console.WriteLine(string.Join("\n", items));   // নতুন line এ প্রত্যেকটা
Console.WriteLine(string.Join("", items));     // applebananaorange (no separator)
```

### Integer array:

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };
string joined = string.Join("-", numbers);
Console.WriteLine(joined);  // "1-2-3-4-5"
```

**যেকোনো array — automatically convert করে!**

---

## Real Example: CSV Parser

```csharp
string csvLine = "Rahim,25,85.5,CSE";

string[] parts = csvLine.Split(',');

string name = parts[0];
int age = int.Parse(parts[1]);
double cgpa = double.Parse(parts[2]);
string dept = parts[3];

Console.WriteLine($"Name: {name}");
Console.WriteLine($"Age: {age}");
Console.WriteLine($"CGPA: {cgpa}");
Console.WriteLine($"Dept: {dept}");
```

---

## Real Example: Multiple CSV Lines

```csharp
string csv = @"Rahim,25,CSE
Karim,23,EEE
Jabbar,26,BBA";

string[] lines = csv.Split('\n');

Console.WriteLine("Students:\n");
foreach (string line in lines)
{
    string[] fields = line.Split(',');
    Console.WriteLine($"  {fields[0]} ({fields[1]}) - {fields[2]}");
}
```

Output:
```
Students:

  Rahim (25) - CSE
  Karim (23) - EEE
  Jabbar (26) - BBA
```

---

## Real Example: Word Counter

```csharp
Console.Write("Enter a sentence: ");
string input = Console.ReadLine();

string[] words = input.Split(' ', StringSplitOptions.RemoveEmptyEntries);

Console.WriteLine($"\n📊 Analysis:");
Console.WriteLine($"Total characters: {input.Length}");
Console.WriteLine($"Total words: {words.Length}");

// Longest word
string longest = "";
foreach (string w in words)
{
    if (w.Length > longest.Length)
        longest = w;
}
Console.WriteLine($"Longest word: {longest} ({longest.Length} chars)");
```

---

## Real Example: Email Parts

```csharp
string email = "rahim.uddin@cpsacademy.io";

string[] emailParts = email.Split('@');
string localPart = emailParts[0];        // rahim.uddin
string domain = emailParts[1];           // cpsacademy.io

// First name and last name
string[] nameParts = localPart.Split('.');
string firstName = nameParts[0];  // rahim
string lastName = nameParts[1];   // uddin

Console.WriteLine($"First: {firstName}");
Console.WriteLine($"Last: {lastName}");
Console.WriteLine($"Domain: {domain}");
```

---

## Real Example: Slug from Title

```csharp
string title = "C# Programming Tutorial for Beginners";

string slug = string.Join("-", title.ToLower().Split(' '));
Console.WriteLine(slug);  // c#-programming-tutorial-for-beginners
```

**Split + Join combo!**

---

## Real Example: Number List

```csharp
string input = "10, 25, 30, 45, 50";

// Split by ", " (comma + space)
string[] parts = input.Split(", ");

int sum = 0;
foreach (string p in parts)
{
    sum += int.Parse(p);
}

Console.WriteLine($"Sum: {sum}");  // 160
Console.WriteLine($"Average: {(double)sum / parts.Length}");  // 32
```

---

## Real Example: CSV Builder

Array থেকে CSV line বানানো:

```csharp
string[] headers = { "Name", "Age", "City" };
string[] row1 = { "Rahim", "25", "Dhaka" };
string[] row2 = { "Karim", "23", "Chittagong" };

Console.WriteLine(string.Join(",", headers));
Console.WriteLine(string.Join(",", row1));
Console.WriteLine(string.Join(",", row2));
```

Output:
```
Name,Age,City
Rahim,25,Dhaka
Karim,23,Chittagong
```

---

## Split + Trim Combo

User input এ space থাকলে:

```csharp
string input = "apple ,  banana  ,  orange  ";

string[] fruits = input.Split(',');

// প্রতিটায় space আছে!
foreach (string f in fruits)
{
    string clean = f.Trim();
    Console.WriteLine($"'{clean}'");
}
```

Output:
```
'apple'
'banana'
'orange'
```

---

## Complete Example: Student Data Processor

```csharp
string data = @"Rahim,85,90,78
Karim,72,88,95
Jabbar,95,85,92";

string[] lines = data.Split('\n');

Console.WriteLine("📊 STUDENT RESULTS\n");

foreach (string line in lines)
{
    string[] fields = line.Split(',');
    string name = fields[0];

    int total = 0;
    for (int i = 1; i < fields.Length; i++)
    {
        total += int.Parse(fields[i]);
    }

    double avg = (double)total / (fields.Length - 1);
    string grade = avg >= 80 ? "A+" : (avg >= 70 ? "A" : "B");

    Console.WriteLine($"{name,-10} Total: {total}  Avg: {avg:F2}  Grade: {grade}");
}
```

---

## Common Mistakes

### ❌ Mistake 1: Empty strings handle না করা

```csharp
"a,,b".Split(',');  // ["a", "", "b"]
// Empty strings আসবে — RemoveEmptyEntries use করো
```

### ❌ Mistake 2: Parse before check

```csharp
string[] parts = input.Split(',');
int value = int.Parse(parts[5]);  // ❌ parts এ 5 index না থাকলে?
```

### ❌ Mistake 3: Join এ wrong type

```csharp
string result = string.Join(",", items);  // ✅ array বা collection
string result = string.Join(",", "a", "b");  // ✅ params array
```

---

## Summary

| Method | কাজ |
|--------|-----|
| `Split(char)` | String → array (by char) |
| `Split(string)` | String → array (by string) |
| `Split(..., StringSplitOptions.RemoveEmptyEntries)` | Empty skip |
| `string.Join(sep, array)` | Array → string |

### Common Combos:

```csharp
// CSV parsing
string[] fields = line.Split(',');

// Word count
int words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;

// Slug
string slug = string.Join("-", title.ToLower().Split(' '));

// Clean split
string[] clean = input.Split(',')
                     .Select(s => s.Trim())
                     .ToArray();
```

**মনে রাখো:**
- Split দিয়ে **array** পাও
- Join দিয়ে **string** বানাও
- `RemoveEmptyEntries` — empty skip
- Trim সাথে combine করে clean data

---

**পরের Lesson:** String Comparison ও Formatting — Compare, Format, StringBuilder!

---

*CPS Academy - Learn. Code. Grow.*
