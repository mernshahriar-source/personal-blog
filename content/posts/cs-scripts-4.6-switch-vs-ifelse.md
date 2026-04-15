---
title: "Lesson 4.6: switch vs if-else ও switch Expression"
date: "2026-05-05"
excerpt: "কোনটা কখন, C# 8+ switch expression, or দিয়ে multiple values এবং _ default"
categories:
  - C# Course Scripts
tags:
  - csharp
  - switch-expression
  - modern-csharp
  - conditionals
draft: false
---

# Lesson 4.6: switch vs if-else ও switch Expression

> **এই Lesson এ শিখবে:** কোনটা কখন, switch vs if-else comparison, C# 8+ switch expression (নতুন clean syntax), `or` দিয়ে multiple values, এবং `_` (default)।

---

## switch vs if-else — কোনটা কখন?

| | if-else | switch |
|---|---------|--------|
| **Range** (>=, <=) | ✅ পারে | ❌ পারে না |
| **Exact value** match | OK | ✅ Best |
| **অনেক options** | লম্বা | ✅ Clean |
| **Complex** (&&, \|\|) | ✅ পারে | ❌ পারে না |

### সহজ Rule:

```
নির্দিষ্ট value match (1, 2, 3, "CSE", 'A') → switch
Range বা complex logic (>=, &&) → if-else
```

---

## switch Expression (C# 8+)

Traditional switch অনেক verbose। নতুন shorter way:

### Traditional (পুরোনো):

```csharp
string dayName;
switch (day)
{
    case 1: dayName = "Saturday"; break;
    case 2: dayName = "Sunday"; break;
    case 3: dayName = "Monday"; break;
    default: dayName = "Invalid"; break;
}
```

### switch Expression (নতুন):

```csharp
string dayName = day switch
{
    1 => "Saturday",
    2 => "Sunday",
    3 => "Monday",
    _ => "Invalid"
};
```

**অনেক ছোট!** `_` = default, `=>` = arrow।

---

## পার্থক্য:

| পুরোনো | নতুন Expression |
|---------|-----------------|
| `switch (day)` | `day switch` |
| `case 1:` | `1 =>` |
| `break;` | দরকার **নেই** |
| `default:` | `_` |

---

## আরো Expression Examples

### Grade to GPA:

```csharp
char grade = 'B';

double gpa = grade switch
{
    'A' => 4.0,
    'B' => 3.0,
    'C' => 2.0,
    'D' => 1.0,
    'F' => 0.0,
    _ => -1.0
};

Console.WriteLine($"GPA: {gpa}");  // 3.0
```

### Calculator:

```csharp
string op = "+";
double a = 10, b = 3;

double result = op switch
{
    "+" => a + b,
    "-" => a - b,
    "*" => a * b,
    "/" => a / b,
    _ => 0
};
```

### Multiple Values — `or`:

```csharp
int month = 4;

int days = month switch
{
    1 or 3 or 5 or 7 or 8 or 10 or 12 => 31,
    4 or 6 or 9 or 11 => 30,
    2 => 28,
    _ => 0
};

Console.WriteLine($"Days: {days}");  // 30
```

### Season:

```csharp
string season = month switch
{
    12 or 1 or 2 => "❄️ Winter",
    3 or 4 or 5 => "🌸 Spring",
    6 or 7 or 8 => "☀️ Summer",
    9 or 10 or 11 => "🍂 Autumn",
    _ => "Invalid"
};
```

---

## Common Mistakes

### Mistake 1: Expression শেষে semicolon

```csharp
string r = x switch
{
    1 => "One",
    _ => "Other"
}   // ❌ ; নেই!

string r = x switch
{
    1 => "One",
    _ => "Other"
};  // ✅
```

### Mistake 2: _ ভুলে যাওয়া

```csharp
// ❌ match না হলে crash!
string r = x switch
{
    1 => "One"
};

// ✅
string r = x switch
{
    1 => "One",
    _ => "Other"
};
```

---

## Summary

| কখন | কোনটা |
|------|--------|
| Range (marks >= 80) | **if-else** |
| Complex (age >= 18 && hasID) | **if-else** |
| Fixed values (1, 2, 3, "A") | **switch** |
| Clean value assign | **switch expression** |

**switch expression tips:**
- `_` = default
- `or` = multiple values
- শেষে **`;`** দিতে হবে
- break দরকার নেই

---

**পরের Lesson:** Practice & Assignments — সব conditionals মিলিয়ে real programs!

---

*CPS Academy - Learn. Code. Grow.*
