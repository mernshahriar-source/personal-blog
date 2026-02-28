---
title: "Lesson 8.3: Exception Best Practices — Professional Error Handling"
date: "2026-03-31"
excerpt: "কখন catch করবে, Specific vs General catch, Empty catch block সমস্যা, Exception দিয়ে flow control না করা, Meaningful messages, using statement, Do's and D"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - exception-handling
  - error-handling
  - try-catch
draft: false
---


> **এই Lesson এ শিখবে:** কখন catch করবে, Specific vs General catch, Empty catch block সমস্যা, Exception দিয়ে flow control না করা, Meaningful messages, using statement, Do's and Don'ts, এবং Common Exceptions quick reference।

---

## Practice 1: Specific Exception Catch করো

```csharp
// ❌ Bad — সব catch করা
catch (Exception ex)
{
    Console.WriteLine("Something went wrong");
}

// ✅ Good — specific catch
catch (FileNotFoundException ex)
{
    Console.WriteLine($"File not found: {ex.FileName}");
}
catch (UnauthorizedAccessException)
{
    Console.WriteLine("Permission denied!");
}
catch (Exception ex)
{
    Console.WriteLine($"Unexpected: {ex.Message}");
}
```

Specific catch আগে → তুমি জানো কী হয়েছে → সঠিক message দিতে পারো।

---

## Practice 2: Empty Catch Block এড়াও

```csharp
// ❌ Terrible — error গিলে ফেলা!
try
{
    ProcessData();
}
catch (Exception) { }  // Error হলেও কিছু জানবে না!

// ✅ Good — অন্তত log করো
try
{
    ProcessData();
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    // real app এ: logger.Error(ex);
}
```

Empty catch হলো **সবচেয়ে বিপজ্জনক** — bug লুকিয়ে যায়, debug করা impossible হয়!

---

## Practice 3: Exception দিয়ে Flow Control করো না

```csharp
// ❌ Bad — Exception কে if-else হিসেবে use করা
try
{
    int num = int.Parse(input);
    return num;
}
catch
{
    return 0;
}

// ✅ Good — আগে check করো
if (int.TryParse(input, out int num))
    return num;
else
    return 0;
```

**Exception expensive!** Flow control এর জন্য `if-else` বা `TryParse` use করো।

---

## Practice 4: Meaningful Error Messages

```csharp
// ❌ Bad
throw new Exception("Error");
throw new Exception("Something went wrong");

// ✅ Good — কী ভুল, কোথায়, কী দিয়েছে
throw new ArgumentException($"Invalid age: {age}. Must be between 0 and 150.");
throw new FileNotFoundException($"Config file not found: {filePath}");
```

---

## Practice 5: using Statement — Auto Cleanup

`finally` এ manually close করার বদলে `using` use করো:

```csharp
// ❌ Manual cleanup (ভুলে যাওয়ার chance)
StreamReader reader = null;
try
{
    reader = new StreamReader("data.txt");
    string content = reader.ReadToEnd();
}
finally
{
    if (reader != null)
        reader.Close();
}

// ✅ using — auto close/dispose!
using (StreamReader reader = new StreamReader("data.txt"))
{
    string content = reader.ReadToEnd();
}  // reader auto-close হয়ে যায়!
```

`using` block শেষ হলে resource **automatically dispose** হয় — error হলেও!

---

## Practice 6: Input Validate Early (Guard Clauses)

```csharp
static void ProcessStudent(string name, int marks)
{
    // ✅ Guard clauses — আগেই validate
    if (string.IsNullOrEmpty(name))
        throw new ArgumentNullException(nameof(name));
    if (marks < 0 || marks > 100)
        throw new ArgumentException($"Invalid marks: {marks}");

    // Main logic — এখানে আসলে data clean
    Console.WriteLine($"{name}: {marks}");
}
```

---

## Practice 7: throw; use করো, throw ex; না

```csharp
// ❌ Stack trace হারায়
catch (Exception ex)
{
    LogError(ex);
    throw ex;  // Original line info হারিয়ে যায়!
}

// ✅ Stack trace রাখে
catch (Exception ex)
{
    LogError(ex);
    throw;  // Original error info intact!
}
```

---

## Do's and Don'ts — Quick Reference

### ✅ DO's:

```csharp
// Specific exceptions catch করো
catch (FileNotFoundException ex)

// Meaningful messages দাও
throw new Exception($"Failed to load: {path}");

// Preserve stack trace
catch (Exception ex) { throw; }

// Validate input early
if (age < 0) throw new ArgumentException("...");

// Use 'using' for resources
using (var reader = new StreamReader(path))

// Clean up in finally
finally { connection?.Close(); }
```

### ❌ DON'Ts:

```csharp
// Empty catch
catch (Exception) { }

// Swallowing errors
catch (Exception ex) { return null; }

// throw ex (loses stack trace)
catch (Exception ex) { throw ex; }

// Exception for flow control
try { int.Parse(input); } catch { return 0; }

// Generic messages
throw new Exception("Error");

// Forget to dispose
StreamReader reader = new StreamReader(path);
// forgot to close!
```

---

## Common Exceptions — Quick Reference

| Exception | কখন | throw করো |
|-----------|------|-----------|
| `ArgumentException` | Invalid argument | `if (age < 0)` |
| `ArgumentNullException` | Null argument | `if (name == null)` |
| `InvalidOperationException` | Invalid state | `if (!isOpen)` |
| `FormatException` | Wrong format | Parse failure |
| `NullReferenceException` | Null access | Null object use |
| `IndexOutOfRangeException` | Bad index | Array boundary |
| `FileNotFoundException` | File missing | File operations |
| `DivideByZeroException` | ÷ by 0 | Math operations |

---

## Complete Example: Safe Student System

```csharp
static void AddStudent(List<string> students, string name, int marks)
{
    // Guard clauses
    if (string.IsNullOrWhiteSpace(name))
        throw new ArgumentNullException(nameof(name), "Name cannot be empty!");
    if (marks < 0 || marks > 100)
        throw new ArgumentException($"Invalid marks: {marks}. Must be 0-100.");

    students.Add(name);
    string grade = marks >= 80 ? "A" : marks >= 60 ? "B" : marks >= 40 ? "C" : "F";
    Console.WriteLine($"✅ {name}: {marks} → {grade}");
}

static void Main(string[] args)
{
    List<string> students = new List<string>();

    string[][] data = {
        new[] { "Rahim", "85" },
        new[] { "Karim", "110" },     // Invalid
        new[] { "", "78" },            // Empty name
        new[] { "Jabbar", "72" }
    };

    foreach (string[] entry in data)
    {
        try
        {
            string name = entry[0];
            int marks = int.Parse(entry[1]);
            AddStudent(students, name, marks);
        }
        catch (ArgumentNullException ex)
        {
            Console.WriteLine($"❌ Name error: {ex.Message}");
        }
        catch (ArgumentException ex)
        {
            Console.WriteLine($"❌ Marks error: {ex.Message}");
        }
        catch (FormatException)
        {
            Console.WriteLine("❌ Invalid marks format!");
        }
    }

    Console.WriteLine($"\n📋 Total added: {students.Count}");
}
```

Output:
```
✅ Rahim: 85 → A
❌ Marks error: Invalid marks: 110. Must be 0-100.
❌ Name error: Name cannot be empty! (Parameter 'name')
✅ Jabbar: 72 → B

📋 Total added: 2
```

---

## Summary

| Practice | Rule |
|----------|------|
| Specific catch | Generic `Exception` শেষে |
| Empty catch | ❌ **কখনো না!** |
| Flow control | Exception না, `TryParse` use করো |
| Messages | Meaningful, specific |
| Resources | `using` statement |
| Rethrow | `throw;` (not `throw ex;`) |
| Validate | Method শুরুতে guard clauses |

---

**Module 8 Complete!** 🎉 

**Exception Handling Series:**

| Lesson | Topic |
|--------|-------|
| 8.1 | try-catch-finally |
| 8.2 | throw ও Custom Exceptions |
| 8.3 | Best Practices |

---

*CPS Academy - Learn. Code. Grow.*
