---
title: 'Part 37: Exception Best Practices'
date: '2026-01-20'
excerpt: 'Part 37: Exception handling best practices এবং complete project'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - exceptions
  - best-practices
  - tutorial
draft: true
---

# Part 37: Exception Handling Best Practices এবং Complete Project

## আগের Parts এ কী শিখলাম?

**Part 35:** try-catch-finally, Common Exceptions, Exception Properties
**Part 36:** throw keyword, Custom Exceptions, Rethrowing

**আজকে শিখবো:**
- Exception Handling এর Best Practices
- Common Mistakes এবং কীভাবে এড়াবে
- Complete Real-world Project

---

## Best Practice ১: কখন Exception Catch করবে?

### ভুল ধারণা

অনেকে মনে করে: "সব জায়গায় try-catch দিয়ে দাও, safe থাকবে!"

**এটা ভুল!**

---

### সঠিক নিয়ম

```
╔═══════════════════════════════════════════════════════════════════╗
║  কখন Exception Catch করবে?                                       ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  ✅ CATCH করবে যখন:                                              ║
║  ─────────────────                                                ║
║  • তুমি error টা meaningfully handle করতে পারো                   ║
║  • User কে সুন্দর message দেখাতে চাও                              ║
║  • Log করে rethrow করতে চাও                                      ║
║  • Alternative action নিতে পারো (retry, default value)           ║
║  • Resources cleanup করতে হবে                                    ║
║                                                                   ║
║  ❌ CATCH করবে না যখন:                                           ║
║  ───────────────────                                              ║
║  • তুমি জানো না error টা দিয়ে কী করবে                            ║
║  • শুধু "hide" করতে চাও                                          ║
║  • Upper level এ handle করা better হবে                           ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### Example: Meaningful Handle

**✅ Good - Meaningful handling:**

```csharp
public User GetUser(int id)
{
    try
    {
        return _database.FindUser(id);
    }
    catch (SqlException ex)
    {
        // Log the actual error
        _logger.Error($"Database error getting user {id}: {ex.Message}");
        
        // Return null or throw a more meaningful exception
        throw new UserNotFoundException(id);
    }
}
```

**কেন good?**
- SqlException catch করে meaningful UserNotFoundException throw করছে
- Log করছে debugging এর জন্য
- Caller কে clear information দিচ্ছে

---

**❌ Bad - No meaningful handling:**

```csharp
public User GetUser(int id)
{
    try
    {
        return _database.FindUser(id);
    }
    catch (Exception ex)
    {
        // কী করবো বুঝতেছি না, তাই return null
        return null;
    }
}
```

**কেন bad?**
- Error swallow করছে (গিলে ফেলছে)
- Caller জানবে না কেন null পেল
- Debugging impossible

---

## Best Practice ২: Specific Exception Catch করো

### Pokemon Exception Handling কী?

```csharp
// "Gotta catch 'em all!" - Pokemon!
try
{
    // some code
}
catch (Exception ex)  // সব catch করে ফেলো!
{
    // ...
}
```

**এটাকে বলে "Pokemon Exception Handling" - এবং এটা খারাপ!**

---

### কেন খারাপ?

```csharp
try
{
    string filename = GetFilename();
    string content = File.ReadAllText(filename);
    ProcessContent(content);
}
catch (Exception ex)
{
    Console.WriteLine("Something went wrong!");
}
```

**সমস্যা:**

এই code এ অনেক ধরনের error হতে পারে:
- `filename` null হতে পারে → NullReferenceException
- File না থাকতে পারে → FileNotFoundException
- Permission না থাকতে পারে → UnauthorizedAccessException
- File corrupt হতে পারে → IOException
- Processing এ error হতে পারে → FormatException

**সব এক catch এ গেলে:**
- User বুঝবে না কী হয়েছে
- তুমিও debug করতে পারবে না
- Recovery strategy আলাদা হওয়া উচিত ছিল

---

### সঠিক উপায়: Specific Catches

```csharp
try
{
    string filename = GetFilename();
    string content = File.ReadAllText(filename);
    ProcessContent(content);
}
catch (ArgumentNullException ex)
{
    Console.WriteLine("Error: No filename provided!");
}
catch (FileNotFoundException ex)
{
    Console.WriteLine($"Error: File '{ex.FileName}' not found!");
    Console.WriteLine("Please check the filename and try again.");
}
catch (UnauthorizedAccessException ex)
{
    Console.WriteLine("Error: You don't have permission to read this file!");
}
catch (IOException ex)
{
    Console.WriteLine($"Error reading file: {ex.Message}");
}
catch (FormatException ex)
{
    Console.WriteLine("Error: File content is in wrong format!");
}
catch (Exception ex)
{
    // Last resort - unexpected errors
    _logger.Error($"Unexpected error: {ex}");
    Console.WriteLine("An unexpected error occurred. Please try again.");
}
```

---

### Catch Order মনে রাখো

```
Specific exceptions আগে
     ↓
General exceptions পরে

catch (FileNotFoundException)    ← Specific
catch (IOException)              ← Less specific (parent)
catch (Exception)                ← Most general (last!)
```

---

## Best Practice ৩: Empty Catch Block এড়াও

### Empty Catch কী?

```csharp
try
{
    DoSomething();
}
catch (Exception)
{
    // Nothing here! 🦗 *cricket sounds*
}
```

**এটা সবচেয়ে খারাপ practice!**

---

### কেন খারাপ?

```csharp
try
{
    // User এর data save করছি
    SaveUserData(user);
}
catch (Exception)
{
    // Empty - কিছু করছি না
}

Console.WriteLine("Data saved successfully!");  // মিথ্যা কথা!
```

**সমস্যা:**
1. Error হলেও "success" দেখাচ্ছে - মিথ্যা!
2. Data আসলে save হয়নি - User জানে না!
3. Debug করা impossible - কোনো trace নেই!
4. Silent failure - সবচেয়ে dangerous bug!

---

### Real-world Example of Disaster

```csharp
// Banking system এ empty catch 😱

try
{
    TransferMoney(fromAccount, toAccount, amount);
}
catch (Exception)
{
    // কেউ empty catch দিয়ে গেছে...
}

Console.WriteLine("Transfer successful!");

// বাস্তবে:
// - fromAccount থেকে টাকা কাটা গেছে
// - toAccount এ টাকা যায়নি (error হয়েছিল)
// - কিন্তু system বলছে "successful"!
// - Customer এর টাকা গায়েব! 💸
```

---

### সঠিক উপায়

**Option 1: Handle properly**

```csharp
try
{
    SaveUserData(user);
    Console.WriteLine("Data saved successfully!");
}
catch (Exception ex)
{
    Console.WriteLine($"Failed to save data: {ex.Message}");
    // Log it
    _logger.Error(ex);
}
```

---

**Option 2: Log and rethrow**

```csharp
try
{
    SaveUserData(user);
}
catch (Exception ex)
{
    _logger.Error($"Failed to save user data: {ex}");
    throw;  // Rethrow - let caller handle
}
```

---

**Option 3: যদি সত্যিই ignore করতে চাও (rare!)**

```csharp
try
{
    // Optional cleanup - failure is acceptable
    DeleteTempFile(tempPath);
}
catch (Exception ex)
{
    // Intentionally ignored - temp file cleanup is not critical
    // তবুও log করো!
    _logger.Debug($"Could not delete temp file: {ex.Message}");
}
```

**Comment দিয়ে explain করো কেন ignore করছো!**

---

## Best Practice ৪: Exception দিয়ে Flow Control করো না

### ভুল উপায়: Exception as Flow Control

```csharp
// ❌ BAD - Exception দিয়ে check করছি user আছে কিনা
public bool UserExists(string username)
{
    try
    {
        User user = GetUser(username);
        return true;
    }
    catch (UserNotFoundException)
    {
        return false;
    }
}
```

**কেন খারাপ?**
- Exception throw করা expensive (slow)
- এটা normal flow, exceptional case না
- Code পড়তে confusing

---

### সঠিক উপায়: Check First

```csharp
// ✅ GOOD - আগে check করো
public bool UserExists(string username)
{
    return _database.Users.Any(u => u.Username == username);
}
```

---

### আরেকটা Example

```csharp
// ❌ BAD
public int ParseNumber(string input)
{
    try
    {
        return int.Parse(input);
    }
    catch (FormatException)
    {
        return 0;  // Default
    }
}

// ✅ GOOD
public int ParseNumber(string input)
{
    if (int.TryParse(input, out int result))
    {
        return result;
    }
    return 0;  // Default
}
```

---

### Rule of Thumb

```
╔═══════════════════════════════════════════════════════════════════╗
║  EXCEPTION SHOULD BE EXCEPTIONAL!                                 ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Exception use করো:                                              ║
║  • Unexpected situations এ                                        ║
║  • Error conditions এ                                             ║
║  • যা normally হওয়া উচিত না                                      ║
║                                                                   ║
║  Exception use করো না:                                           ║
║  • Normal program flow এ                                          ║
║  • Expected conditions check করতে                                ║
║  • Return value হিসেবে                                            ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## Best Practice ৫: Meaningful Error Messages

### ❌ Bad Messages

```csharp
throw new Exception("Error");
throw new Exception("Something went wrong");
throw new Exception("Invalid input");
throw new Exception("Failed");
```

**সমস্যা:**
- কী error? কোথায়? কেন?
- Debug করা impossible
- User কিছু বুঝবে না

---

### ✅ Good Messages

```csharp
throw new ArgumentException(
    $"Invalid age: {age}. Age must be between 0 and 150.",
    nameof(age)
);

throw new FileNotFoundException(
    $"Configuration file not found at: {configPath}"
);

throw new InvalidOperationException(
    $"Cannot cancel order {orderId}. Current status: {order.Status}. " +
    "Only pending orders can be cancelled."
);

throw new InsufficientBalanceException(
    $"Cannot withdraw {amount:C}. " +
    $"Available balance: {balance:C}. " +
    $"Shortfall: {amount - balance:C}."
);
```

---

### Good Error Message এর Elements

```
╔═══════════════════════════════════════════════════════════════════╗
║  Good Error Message এ থাকবে:                                     ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  1. WHAT happened?                                                ║
║     "Cannot withdraw money"                                       ║
║                                                                   ║
║  2. WHY happened?                                                 ║
║     "Insufficient balance"                                        ║
║                                                                   ║
║  3. CONTEXT (relevant values)                                     ║
║     "Requested: $500, Available: $200"                           ║
║                                                                   ║
║  4. HOW to fix? (যদি possible)                                   ║
║     "Please enter an amount less than $200"                       ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## Best Practice ৬: Always Log Exceptions

### কেন Log করবে?

```
Production এ bug হলে:
- User বলবে "কাজ করছে না"
- তুমি বসে আছো - কী হয়েছে জানো না!
- Log থাকলে দেখতে পারবে exactly কী error হয়েছিল
```

---

### কী কী Log করবে?

```csharp
catch (Exception ex)
{
    _logger.Error(
        $"Error occurred at: {DateTime.Now}\n" +
        $"Exception Type: {ex.GetType().Name}\n" +
        $"Message: {ex.Message}\n" +
        $"Stack Trace: {ex.StackTrace}\n" +
        $"Inner Exception: {ex.InnerException?.Message}"
    );
}
```

---

### Simple Logger Class

```csharp
public static class SimpleLogger
{
    private static string _logFile = "app_log.txt";
    
    public static void Info(string message)
    {
        Log("INFO", message);
    }
    
    public static void Warning(string message)
    {
        Log("WARNING", message);
    }
    
    public static void Error(string message)
    {
        Log("ERROR", message);
    }
    
    public static void Error(Exception ex)
    {
        string message = 
            $"Exception: {ex.GetType().Name}\n" +
            $"Message: {ex.Message}\n" +
            $"Stack Trace:\n{ex.StackTrace}";
        
        if (ex.InnerException != null)
        {
            message += $"\nInner Exception: {ex.InnerException.Message}";
        }
        
        Log("ERROR", message);
    }
    
    private static void Log(string level, string message)
    {
        string logEntry = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{level}] {message}\n";
        
        // Console এ দেখাও
        Console.WriteLine(logEntry);
        
        // File এ লেখো
        try
        {
            File.AppendAllText(_logFile, logEntry + "\n");
        }
        catch
        {
            // Logger নিজে fail করলে silently ignore
        }
    }
}
```

---

### Logger ব্যবহার

```csharp
public void ProcessOrder(Order order)
{
    SimpleLogger.Info($"Processing order {order.Id}");
    
    try
    {
        ValidateOrder(order);
        SaveToDatabase(order);
        SendConfirmation(order);
        
        SimpleLogger.Info($"Order {order.Id} processed successfully");
    }
    catch (ValidationException ex)
    {
        SimpleLogger.Warning($"Order {order.Id} validation failed: {ex.Message}");
        throw;
    }
    catch (Exception ex)
    {
        SimpleLogger.Error(ex);
        SimpleLogger.Error($"Failed to process order {order.Id}");
        throw;
    }
}
```

---

### Log File দেখতে যেমন হবে

```
[2024-01-15 10:30:45] [INFO] Processing order 1001
[2024-01-15 10:30:45] [INFO] Order 1001 processed successfully
[2024-01-15 10:31:02] [INFO] Processing order 1002
[2024-01-15 10:31:02] [WARNING] Order 1002 validation failed: Invalid shipping address
[2024-01-15 10:32:15] [INFO] Processing order 1003
[2024-01-15 10:32:16] [ERROR] Exception: SqlException
Message: Connection timeout
Stack Trace:
   at Database.Save() in Database.cs:line 45
   at OrderService.SaveToDatabase() in OrderService.cs:line 78
   at OrderService.ProcessOrder() in OrderService.cs:line 23
[2024-01-15 10:32:16] [ERROR] Failed to process order 1003
```

---

## Best Practice ৭: using Statement দিয়ে Resource Cleanup

### Problem: Resources Cleanup করতে ভুলে যাওয়া

```csharp
StreamReader reader = new StreamReader("file.txt");
string content = reader.ReadToEnd();
// reader.Close() করতে ভুলে গেলাম! 😱
// File locked থেকে যাবে!
```

---

### Solution 1: try-finally (Verbose)

```csharp
StreamReader reader = null;
try
{
    reader = new StreamReader("file.txt");
    string content = reader.ReadToEnd();
    ProcessContent(content);
}
finally
{
    if (reader != null)
    {
        reader.Close();
        reader.Dispose();
    }
}
```

**সমস্যা:** অনেক code লিখতে হয়!

---

### Solution 2: using Statement (Clean!)

```csharp
using (StreamReader reader = new StreamReader("file.txt"))
{
    string content = reader.ReadToEnd();
    ProcessContent(content);
}
// Block শেষ হলে automatically Dispose() হবে!
```

**`using` কী করে?**

```
using (resource)
{
    // use resource
}

// Equivalent to:

try
{
    // use resource
}
finally
{
    resource.Dispose();
}
```

---

### using Statement এর বিভিন্ন রূপ

**Single resource:**

```csharp
using (StreamReader reader = new StreamReader("file.txt"))
{
    // use reader
}
```

---

**Multiple resources:**

```csharp
using (StreamReader reader = new StreamReader("input.txt"))
using (StreamWriter writer = new StreamWriter("output.txt"))
{
    string content = reader.ReadToEnd();
    writer.Write(content.ToUpper());
}
```

---

**Modern syntax (C# 8+):**

```csharp
using StreamReader reader = new StreamReader("file.txt");
using StreamWriter writer = new StreamWriter("output.txt");

// Use them
string content = reader.ReadToEnd();
writer.Write(content.ToUpper());

// Method শেষ হলে automatically dispose
```

---

### কোন Classes এ using ব্যবহার করবে?

```
IDisposable implement করে এমন সব class:

• StreamReader / StreamWriter
• FileStream
• SqlConnection
• HttpClient
• NetworkStream
• Any database connection
• Any file handle
• Any network resource
```

---

### using with Exception

```csharp
try
{
    using (StreamReader reader = new StreamReader("file.txt"))
    {
        string content = reader.ReadToEnd();
        ProcessContent(content);
    }
}
catch (FileNotFoundException ex)
{
    Console.WriteLine("File not found!");
}
catch (IOException ex)
{
    Console.WriteLine($"Error reading file: {ex.Message}");
}
// reader automatically disposed - even if exception occurred!
```

---

## Best Practice ৮: Global Exception Handler

### কেন দরকার?

যতই try-catch দাও, কিছু exception miss হতে পারে। Global handler হলো last line of defense!

---

### Console Application এ

```csharp
class Program
{
    static void Main(string[] args)
    {
        // Global exception handler setup
        AppDomain.CurrentDomain.UnhandledException += GlobalExceptionHandler;
        
        try
        {
            RunApplication();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Fatal error: {ex.Message}");
            SimpleLogger.Error(ex);
        }
    }
    
    static void GlobalExceptionHandler(object sender, UnhandledExceptionEventArgs e)
    {
        Exception ex = (Exception)e.ExceptionObject;
        
        Console.WriteLine("\n╔═══════════════════════════════════════════════╗");
        Console.WriteLine("║  ❌ UNHANDLED EXCEPTION                       ║");
        Console.WriteLine("╠═══════════════════════════════════════════════╣");
        Console.WriteLine($"║  {ex.Message,-43} ║");
        Console.WriteLine("╚═══════════════════════════════════════════════╝");
        
        // Log the full details
        SimpleLogger.Error(ex);
        
        Console.WriteLine("\nThe application will now close.");
        Console.WriteLine("Please check the log file for details.");
    }
    
    static void RunApplication()
    {
        // Main application code
    }
}
```

---

## Common Mistakes Summary

```
╔═══════════════════════════════════════════════════════════════════════╗
║                    COMMON MISTAKES                                    ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  ❌ MISTAKE                          ✅ SOLUTION                      ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  Empty catch block                   Log or handle meaningfully       ║
║  catch { }                           catch { _logger.Error(ex); }     ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  Catching Exception everywhere       Catch specific exceptions        ║
║  catch (Exception)                   catch (FileNotFoundException)    ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  throw ex;                           throw;                           ║
║  (loses stack trace)                 (preserves stack trace)          ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  Exception for flow control          Use if/TryParse/etc             ║
║  try { Parse() } catch { }           if (TryParse()) { }             ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  Generic error messages              Detailed, contextual messages    ║
║  "Error occurred"                    "Failed to load user 123"        ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  Not disposing resources             Use 'using' statement            ║
║  reader.Close() (manual)             using (var reader = ...)         ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  Not logging exceptions              Always log with context          ║
║  (debugging nightmare)               SimpleLogger.Error(ex);          ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

## Do's and Don'ts Quick Reference

### ✅ DO's

```csharp
// ✅ DO: Specific exceptions catch করো
catch (FileNotFoundException ex)
catch (UnauthorizedAccessException ex)

// ✅ DO: Meaningful messages দাও
throw new Exception($"Failed to load config from {path}");

// ✅ DO: Log exceptions
catch (Exception ex)
{
    _logger.Error(ex);
    throw;
}

// ✅ DO: Use 'using' for resources
using (var reader = new StreamReader(path))

// ✅ DO: Preserve stack trace
catch (Exception ex)
{
    // do something
    throw;  // NOT throw ex;
}

// ✅ DO: Validate input early
if (string.IsNullOrEmpty(name))
    throw new ArgumentNullException(nameof(name));

// ✅ DO: Clean up in finally
finally
{
    connection?.Close();
}
```

---

### ❌ DON'Ts

```csharp
// ❌ DON'T: Empty catch
catch (Exception) { }

// ❌ DON'T: Catch everything blindly
catch (Exception ex)
{
    return null;  // Swallowing error
}

// ❌ DON'T: Use throw ex
catch (Exception ex)
{
    throw ex;  // Loses stack trace!
}

// ❌ DON'T: Exception for flow control
try
{
    return int.Parse(input);
}
catch
{
    return 0;
}

// ❌ DON'T: Generic messages
throw new Exception("Error");

// ❌ DON'T: Ignore IDisposable
StreamReader reader = new StreamReader(path);
// forgot to dispose!

// ❌ DON'T: Throw from finally
finally
{
    throw new Exception("Bad!");  // Very bad!
}
```

---

## Complete Project: Student Management System

### Project Structure

```
StudentManagement/
├── Exceptions/
│   ├── StudentNotFoundException.cs
│   ├── DuplicateStudentIdException.cs
│   ├── InvalidGradeException.cs
│   └── ValidationException.cs
├── Models/
│   └── Student.cs
├── Services/
│   ├── StudentService.cs
│   └── FileService.cs
├── Utils/
│   └── Logger.cs
└── Program.cs
```

---

### Custom Exceptions

```csharp
// ═══════════════════════════════════════════════════════════════
// StudentNotFoundException.cs
// ═══════════════════════════════════════════════════════════════

public class StudentNotFoundException : Exception
{
    public int StudentId { get; }
    
    public StudentNotFoundException(int studentId)
        : base($"Student with ID {studentId} was not found.")
    {
        StudentId = studentId;
    }
    
    public StudentNotFoundException(string message) : base(message) { }
    
    public StudentNotFoundException(string message, Exception inner) 
        : base(message, inner) { }
}

// ═══════════════════════════════════════════════════════════════
// DuplicateStudentIdException.cs
// ═══════════════════════════════════════════════════════════════

public class DuplicateStudentIdException : Exception
{
    public int StudentId { get; }
    
    public DuplicateStudentIdException(int studentId)
        : base($"Student with ID {studentId} already exists.")
    {
        StudentId = studentId;
    }
    
    public DuplicateStudentIdException(string message) : base(message) { }
}

// ═══════════════════════════════════════════════════════════════
// InvalidGradeException.cs
// ═══════════════════════════════════════════════════════════════

public class InvalidGradeException : Exception
{
    public double Grade { get; }
    public double MinGrade { get; } = 0;
    public double MaxGrade { get; } = 100;
    
    public InvalidGradeException(double grade)
        : base($"Invalid grade: {grade}. Grade must be between 0 and 100.")
    {
        Grade = grade;
    }
    
    public InvalidGradeException(string message) : base(message) { }
}

// ═══════════════════════════════════════════════════════════════
// ValidationException.cs
// ═══════════════════════════════════════════════════════════════

public class ValidationException : Exception
{
    public List<string> Errors { get; }
    
    public ValidationException(List<string> errors)
        : base($"Validation failed with {errors.Count} error(s).")
    {
        Errors = errors ?? new List<string>();
    }
    
    public ValidationException(string error)
        : base(error)
    {
        Errors = new List<string> { error };
    }
}
```

---

### Student Model

```csharp
// ═══════════════════════════════════════════════════════════════
// Student.cs
// ═══════════════════════════════════════════════════════════════

public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int Age { get; set; }
    public string Department { get; set; }
    public double GPA { get; set; }
    public DateTime EnrollmentDate { get; set; }
    
    public Student()
    {
        EnrollmentDate = DateTime.Now;
    }
    
    public Student(int id, string name, string email, int age, string department, double gpa)
    {
        Id = id;
        Name = name;
        Email = email;
        Age = age;
        Department = department;
        GPA = gpa;
        EnrollmentDate = DateTime.Now;
    }
    
    public string GetGrade()
    {
        if (GPA >= 3.7) return "A+";
        if (GPA >= 3.3) return "A";
        if (GPA >= 3.0) return "A-";
        if (GPA >= 2.7) return "B+";
        if (GPA >= 2.3) return "B";
        if (GPA >= 2.0) return "B-";
        if (GPA >= 1.7) return "C+";
        if (GPA >= 1.3) return "C";
        if (GPA >= 1.0) return "C-";
        return "F";
    }
    
    public override string ToString()
    {
        return $"[{Id}] {Name} - {Department} (GPA: {GPA:F2})";
    }
    
    // For file storage
    public string ToFileString()
    {
        return $"{Id}|{Name}|{Email}|{Age}|{Department}|{GPA}|{EnrollmentDate:yyyy-MM-dd}";
    }
    
    // From file storage
    public static Student FromFileString(string line)
    {
        string[] parts = line.Split('|');
        
        if (parts.Length != 7)
        {
            throw new FormatException($"Invalid student data format: {line}");
        }
        
        return new Student
        {
            Id = int.Parse(parts[0]),
            Name = parts[1],
            Email = parts[2],
            Age = int.Parse(parts[3]),
            Department = parts[4],
            GPA = double.Parse(parts[5]),
            EnrollmentDate = DateTime.Parse(parts[6])
        };
    }
}
```

---

### Logger Utility

```csharp
// ═══════════════════════════════════════════════════════════════
// Logger.cs
// ═══════════════════════════════════════════════════════════════

public static class Logger
{
    private static readonly string LogDirectory = "logs";
    private static readonly string LogFile;
    
    static Logger()
    {
        // Create logs directory if not exists
        if (!Directory.Exists(LogDirectory))
        {
            Directory.CreateDirectory(LogDirectory);
        }
        
        // Log file with date
        LogFile = Path.Combine(LogDirectory, $"log_{DateTime.Now:yyyy-MM-dd}.txt");
    }
    
    public static void Info(string message)
    {
        Log("INFO", message);
    }
    
    public static void Warning(string message)
    {
        Log("WARNING", message);
    }
    
    public static void Error(string message)
    {
        Log("ERROR", message);
    }
    
    public static void Error(Exception ex, string additionalInfo = "")
    {
        string message = string.IsNullOrEmpty(additionalInfo) 
            ? "" 
            : additionalInfo + "\n";
        
        message += $"Exception Type: {ex.GetType().Name}\n";
        message += $"Message: {ex.Message}\n";
        message += $"Stack Trace:\n{ex.StackTrace}";
        
        if (ex.InnerException != null)
        {
            message += $"\nInner Exception: {ex.InnerException.Message}";
        }
        
        Log("ERROR", message);
    }
    
    private static void Log(string level, string message)
    {
        string timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        string logEntry = $"[{timestamp}] [{level}] {message}";
        
        // Write to console with color
        ConsoleColor originalColor = Console.ForegroundColor;
        
        switch (level)
        {
            case "ERROR":
                Console.ForegroundColor = ConsoleColor.Red;
                break;
            case "WARNING":
                Console.ForegroundColor = ConsoleColor.Yellow;
                break;
            case "INFO":
                Console.ForegroundColor = ConsoleColor.Cyan;
                break;
        }
        
        Console.WriteLine($"[{level}] {message}");
        Console.ForegroundColor = originalColor;
        
        // Write to file
        try
        {
            File.AppendAllText(LogFile, logEntry + Environment.NewLine);
        }
        catch
        {
            // Silent fail for logger
        }
    }
}
```

---

### File Service

```csharp
// ═══════════════════════════════════════════════════════════════
// FileService.cs
// ═══════════════════════════════════════════════════════════════

public class FileService
{
    private readonly string _dataFile;
    
    public FileService(string dataFile = "students.dat")
    {
        _dataFile = dataFile;
    }
    
    public List<Student> LoadStudents()
    {
        List<Student> students = new List<Student>();
        
        if (!File.Exists(_dataFile))
        {
            Logger.Info($"Data file not found. Starting with empty database.");
            return students;
        }
        
        Logger.Info($"Loading students from {_dataFile}");
        
        using (StreamReader reader = new StreamReader(_dataFile))
        {
            string line;
            int lineNumber = 0;
            
            while ((line = reader.ReadLine()) != null)
            {
                lineNumber++;
                
                if (string.IsNullOrWhiteSpace(line))
                    continue;
                
                try
                {
                    Student student = Student.FromFileString(line);
                    students.Add(student);
                }
                catch (FormatException ex)
                {
                    Logger.Warning($"Skipping invalid data at line {lineNumber}: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Logger.Error(ex, $"Error parsing line {lineNumber}");
                }
            }
        }
        
        Logger.Info($"Loaded {students.Count} students.");
        return students;
    }
    
    public void SaveStudents(List<Student> students)
    {
        if (students == null)
        {
            throw new ArgumentNullException(nameof(students));
        }
        
        Logger.Info($"Saving {students.Count} students to {_dataFile}");
        
        // Backup existing file
        if (File.Exists(_dataFile))
        {
            string backupFile = _dataFile + ".backup";
            try
            {
                File.Copy(_dataFile, backupFile, overwrite: true);
                Logger.Info($"Backup created: {backupFile}");
            }
            catch (Exception ex)
            {
                Logger.Warning($"Could not create backup: {ex.Message}");
            }
        }
        
        // Save new data
        using (StreamWriter writer = new StreamWriter(_dataFile, append: false))
        {
            foreach (Student student in students)
            {
                writer.WriteLine(student.ToFileString());
            }
        }
        
        Logger.Info("Data saved successfully.");
    }
}
```

---

### Student Service

```csharp
// ═══════════════════════════════════════════════════════════════
// StudentService.cs
// ═══════════════════════════════════════════════════════════════

public class StudentService
{
    private List<Student> _students;
    private readonly FileService _fileService;
    private int _nextId;
    
    public StudentService()
    {
        _fileService = new FileService();
        _students = _fileService.LoadStudents();
        _nextId = _students.Count > 0 
            ? _students.Max(s => s.Id) + 1 
            : 1001;
    }
    
    // ─────────────────────────────────────────────────────────────
    // CREATE
    // ─────────────────────────────────────────────────────────────
    
    public Student AddStudent(string name, string email, int age, string department, double gpa)
    {
        // Validate
        ValidateStudentData(name, email, age, department, gpa);
        
        // Check duplicate email
        if (_students.Any(s => s.Email.Equals(email, StringComparison.OrdinalIgnoreCase)))
        {
            throw new ValidationException($"Email '{email}' is already registered.");
        }
        
        // Create student
        Student student = new Student(_nextId++, name, email, age, department, gpa);
        _students.Add(student);
        
        // Save to file
        _fileService.SaveStudents(_students);
        
        Logger.Info($"Added new student: {student}");
        
        return student;
    }
    
    // ─────────────────────────────────────────────────────────────
    // READ
    // ─────────────────────────────────────────────────────────────
    
    public Student GetStudent(int id)
    {
        Student student = _students.FirstOrDefault(s => s.Id == id);
        
        if (student == null)
        {
            throw new StudentNotFoundException(id);
        }
        
        return student;
    }
    
    public List<Student> GetAllStudents()
    {
        return _students.ToList();  // Return a copy
    }
    
    public List<Student> SearchByName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Search term cannot be empty.", nameof(name));
        }
        
        return _students
            .Where(s => s.Name.Contains(name, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }
    
    public List<Student> GetByDepartment(string department)
    {
        return _students
            .Where(s => s.Department.Equals(department, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }
    
    public List<Student> GetTopStudents(int count = 5)
    {
        return _students
            .OrderByDescending(s => s.GPA)
            .Take(count)
            .ToList();
    }
    
    // ─────────────────────────────────────────────────────────────
    // UPDATE
    // ─────────────────────────────────────────────────────────────
    
    public void UpdateStudent(int id, string name, string email, int age, string department, double gpa)
    {
        Student student = GetStudent(id);  // Throws if not found
        
        // Validate new data
        ValidateStudentData(name, email, age, department, gpa);
        
        // Check duplicate email (excluding current student)
        if (_students.Any(s => s.Id != id && 
            s.Email.Equals(email, StringComparison.OrdinalIgnoreCase)))
        {
            throw new ValidationException($"Email '{email}' is already used by another student.");
        }
        
        // Update
        student.Name = name;
        student.Email = email;
        student.Age = age;
        student.Department = department;
        student.GPA = gpa;
        
        // Save
        _fileService.SaveStudents(_students);
        
        Logger.Info($"Updated student: {student}");
    }
    
    public void UpdateGPA(int id, double newGPA)
    {
        if (newGPA < 0 || newGPA > 4)
        {
            throw new InvalidGradeException(newGPA);
        }
        
        Student student = GetStudent(id);
        double oldGPA = student.GPA;
        student.GPA = newGPA;
        
        _fileService.SaveStudents(_students);
        
        Logger.Info($"Updated GPA for student {id}: {oldGPA:F2} -> {newGPA:F2}");
    }
    
    // ─────────────────────────────────────────────────────────────
    // DELETE
    // ─────────────────────────────────────────────────────────────
    
    public void DeleteStudent(int id)
    {
        Student student = GetStudent(id);  // Throws if not found
        
        _students.Remove(student);
        _fileService.SaveStudents(_students);
        
        Logger.Info($"Deleted student: {student}");
    }
    
    // ─────────────────────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────────────────────
    
    private void ValidateStudentData(string name, string email, int age, 
        string department, double gpa)
    {
        List<string> errors = new List<string>();
        
        // Name validation
        if (string.IsNullOrWhiteSpace(name))
        {
            errors.Add("Name is required.");
        }
        else if (name.Length < 2)
        {
            errors.Add("Name must be at least 2 characters.");
        }
        else if (name.Length > 100)
        {
            errors.Add("Name cannot exceed 100 characters.");
        }
        
        // Email validation
        if (string.IsNullOrWhiteSpace(email))
        {
            errors.Add("Email is required.");
        }
        else if (!email.Contains("@") || !email.Contains("."))
        {
            errors.Add("Invalid email format.");
        }
        
        // Age validation
        if (age < 16)
        {
            errors.Add("Student must be at least 16 years old.");
        }
        else if (age > 100)
        {
            errors.Add("Invalid age.");
        }
        
        // Department validation
        string[] validDepartments = { "CSE", "EEE", "BBA", "English", "Physics", "Math" };
        if (string.IsNullOrWhiteSpace(department))
        {
            errors.Add("Department is required.");
        }
        else if (!validDepartments.Contains(department, StringComparer.OrdinalIgnoreCase))
        {
            errors.Add($"Invalid department. Valid options: {string.Join(", ", validDepartments)}");
        }
        
        // GPA validation
        if (gpa < 0 || gpa > 4)
        {
            errors.Add("GPA must be between 0 and 4.");
        }
        
        // If any errors, throw
        if (errors.Count > 0)
        {
            throw new ValidationException(errors);
        }
    }
    
    // ─────────────────────────────────────────────────────────────
    // STATISTICS
    // ─────────────────────────────────────────────────────────────
    
    public void PrintStatistics()
    {
        if (_students.Count == 0)
        {
            Console.WriteLine("No students in the system.");
            return;
        }
        
        Console.WriteLine("\n╔═══════════════════════════════════════════════════════╗");
        Console.WriteLine("║                    STATISTICS                         ║");
        Console.WriteLine("╠═══════════════════════════════════════════════════════╣");
        Console.WriteLine($"║  Total Students: {_students.Count,-37} ║");
        Console.WriteLine($"║  Average GPA: {_students.Average(s => s.GPA),-40:F2} ║");
        Console.WriteLine($"║  Highest GPA: {_students.Max(s => s.GPA),-40:F2} ║");
        Console.WriteLine($"║  Lowest GPA: {_students.Min(s => s.GPA),-41:F2} ║");
        Console.WriteLine("╠═══════════════════════════════════════════════════════╣");
        Console.WriteLine("║  Students by Department:                              ║");
        
        var byDept = _students.GroupBy(s => s.Department);
        foreach (var group in byDept)
        {
            Console.WriteLine($"║    {group.Key}: {group.Count(),-44} ║");
        }
        
        Console.WriteLine("╚═══════════════════════════════════════════════════════╝");
    }
}
```

---

### Main Program

```csharp
// ═══════════════════════════════════════════════════════════════
// Program.cs
// ═══════════════════════════════════════════════════════════════

using System;
using System.Collections.Generic;

class Program
{
    static StudentService _service;
    
    static void Main(string[] args)
    {
        // Global exception handler
        AppDomain.CurrentDomain.UnhandledException += GlobalExceptionHandler;
        
        Console.WriteLine("╔═══════════════════════════════════════════════════════════╗");
        Console.WriteLine("║          🎓 STUDENT MANAGEMENT SYSTEM                     ║");
        Console.WriteLine("║             Exception Handling Demo                       ║");
        Console.WriteLine("╚═══════════════════════════════════════════════════════════╝");
        
        try
        {
            _service = new StudentService();
            RunMainLoop();
        }
        catch (Exception ex)
        {
            Logger.Error(ex, "Fatal error during initialization");
            Console.WriteLine("\n❌ Failed to start application. Check logs for details.");
        }
    }
    
    static void GlobalExceptionHandler(object sender, UnhandledExceptionEventArgs e)
    {
        Exception ex = (Exception)e.ExceptionObject;
        
        Logger.Error(ex, "UNHANDLED EXCEPTION");
        
        Console.WriteLine("\n╔═══════════════════════════════════════════════════════════╗");
        Console.WriteLine("║  ❌ CRITICAL ERROR - Application crashed                  ║");
        Console.WriteLine("╠═══════════════════════════════════════════════════════════╣");
        Console.WriteLine($"║  {ex.Message,-55} ║");
        Console.WriteLine("╚═══════════════════════════════════════════════════════════╝");
        Console.WriteLine("\nPlease check the log file for details.");
    }
    
    static void RunMainLoop()
    {
        while (true)
        {
            PrintMenu();
            
            Console.Write("\nEnter choice: ");
            string choice = Console.ReadLine()?.Trim();
            
            try
            {
                switch (choice)
                {
                    case "1": AddStudent(); break;
                    case "2": ViewStudent(); break;
                    case "3": ListAllStudents(); break;
                    case "4": SearchStudents(); break;
                    case "5": UpdateStudent(); break;
                    case "6": UpdateGPA(); break;
                    case "7": DeleteStudent(); break;
                    case "8": ViewTopStudents(); break;
                    case "9": ViewStatistics(); break;
                    case "0":
                        Console.WriteLine("\nThank you for using Student Management System! 👋");
                        return;
                    default:
                        Console.WriteLine("\n❌ Invalid choice. Please try again.");
                        break;
                }
            }
            catch (StudentNotFoundException ex)
            {
                Console.WriteLine($"\n❌ Student not found: {ex.Message}");
                Logger.Warning($"Student lookup failed: ID {ex.StudentId}");
            }
            catch (DuplicateStudentIdException ex)
            {
                Console.WriteLine($"\n❌ Duplicate ID: {ex.Message}");
            }
            catch (InvalidGradeException ex)
            {
                Console.WriteLine($"\n❌ Invalid grade: {ex.Message}");
                Console.WriteLine($"   Provided: {ex.Grade}, Valid range: {ex.MinGrade} - {ex.MaxGrade}");
            }
            catch (ValidationException ex)
            {
                Console.WriteLine($"\n❌ Validation failed:");
                foreach (string error in ex.Errors)
                {
                    Console.WriteLine($"   • {error}");
                }
            }
            catch (FormatException)
            {
                Console.WriteLine("\n❌ Invalid input format. Please enter the correct data type.");
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"\n❌ Invalid argument: {ex.Message}");
            }
            catch (IOException ex)
            {
                Console.WriteLine($"\n❌ File error: {ex.Message}");
                Logger.Error(ex, "File operation failed");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\n❌ Unexpected error: {ex.Message}");
                Logger.Error(ex, "Unexpected error in main loop");
            }
            
            Console.WriteLine("\nPress any key to continue...");
            Console.ReadKey();
        }
    }
    
    static void PrintMenu()
    {
        Console.Clear();
        Console.WriteLine("\n╔═══════════════════════════════════════╗");
        Console.WriteLine("║            MAIN MENU                  ║");
        Console.WriteLine("╠═══════════════════════════════════════╣");
        Console.WriteLine("║  1. Add New Student                   ║");
        Console.WriteLine("║  2. View Student by ID                ║");
        Console.WriteLine("║  3. List All Students                 ║");
        Console.WriteLine("║  4. Search Students                   ║");
        Console.WriteLine("║  5. Update Student                    ║");
        Console.WriteLine("║  6. Update GPA                        ║");
        Console.WriteLine("║  7. Delete Student                    ║");
        Console.WriteLine("║  8. View Top Students                 ║");
        Console.WriteLine("║  9. View Statistics                   ║");
        Console.WriteLine("║  0. Exit                              ║");
        Console.WriteLine("╚═══════════════════════════════════════╝");
    }
    
    static void AddStudent()
    {
        Console.WriteLine("\n─── ADD NEW STUDENT ───\n");
        
        Console.Write("Name: ");
        string name = Console.ReadLine();
        
        Console.Write("Email: ");
        string email = Console.ReadLine();
        
        Console.Write("Age: ");
        int age = int.Parse(Console.ReadLine());
        
        Console.Write("Department (CSE/EEE/BBA/English/Physics/Math): ");
        string department = Console.ReadLine();
        
        Console.Write("GPA (0-4): ");
        double gpa = double.Parse(Console.ReadLine());
        
        Student student = _service.AddStudent(name, email, age, department, gpa);
        
        Console.WriteLine($"\n✅ Student added successfully!");
        PrintStudentDetails(student);
    }
    
    static void ViewStudent()
    {
        Console.WriteLine("\n─── VIEW STUDENT ───\n");
        
        Console.Write("Enter Student ID: ");
        int id = int.Parse(Console.ReadLine());
        
        Student student = _service.GetStudent(id);
        PrintStudentDetails(student);
    }
    
    static void ListAllStudents()
    {
        Console.WriteLine("\n─── ALL STUDENTS ───\n");
        
        List<Student> students = _service.GetAllStudents();
        
        if (students.Count == 0)
        {
            Console.WriteLine("No students found.");
            return;
        }
        
        PrintStudentTable(students);
    }
    
    static void SearchStudents()
    {
        Console.WriteLine("\n─── SEARCH STUDENTS ───\n");
        
        Console.Write("Enter name to search: ");
        string searchTerm = Console.ReadLine();
        
        List<Student> results = _service.SearchByName(searchTerm);
        
        if (results.Count == 0)
        {
            Console.WriteLine($"No students found matching '{searchTerm}'.");
            return;
        }
        
        Console.WriteLine($"\nFound {results.Count} student(s):\n");
        PrintStudentTable(results);
    }
    
    static void UpdateStudent()
    {
        Console.WriteLine("\n─── UPDATE STUDENT ───\n");
        
        Console.Write("Enter Student ID to update: ");
        int id = int.Parse(Console.ReadLine());
        
        // Show current data
        Student current = _service.GetStudent(id);
        Console.WriteLine($"\nCurrent data for student {id}:");
        PrintStudentDetails(current);
        
        Console.WriteLine("\nEnter new data (or press Enter to keep current):\n");
        
        Console.Write($"Name [{current.Name}]: ");
        string name = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(name)) name = current.Name;
        
        Console.Write($"Email [{current.Email}]: ");
        string email = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(email)) email = current.Email;
        
        Console.Write($"Age [{current.Age}]: ");
        string ageInput = Console.ReadLine();
        int age = string.IsNullOrWhiteSpace(ageInput) ? current.Age : int.Parse(ageInput);
        
        Console.Write($"Department [{current.Department}]: ");
        string department = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(department)) department = current.Department;
        
        Console.Write($"GPA [{current.GPA:F2}]: ");
        string gpaInput = Console.ReadLine();
        double gpa = string.IsNullOrWhiteSpace(gpaInput) ? current.GPA : double.Parse(gpaInput);
        
        _service.UpdateStudent(id, name, email, age, department, gpa);
        
        Console.WriteLine("\n✅ Student updated successfully!");
    }
    
    static void UpdateGPA()
    {
        Console.WriteLine("\n─── UPDATE GPA ───\n");
        
        Console.Write("Enter Student ID: ");
        int id = int.Parse(Console.ReadLine());
        
        Student student = _service.GetStudent(id);
        Console.WriteLine($"\nStudent: {student.Name}");
        Console.WriteLine($"Current GPA: {student.GPA:F2} (Grade: {student.GetGrade()})");
        
        Console.Write("\nEnter new GPA (0-4): ");
        double newGPA = double.Parse(Console.ReadLine());
        
        _service.UpdateGPA(id, newGPA);
        
        Console.WriteLine($"\n✅ GPA updated! New grade: {_service.GetStudent(id).GetGrade()}");
    }
    
    static void DeleteStudent()
    {
        Console.WriteLine("\n─── DELETE STUDENT ───\n");
        
        Console.Write("Enter Student ID to delete: ");
        int id = int.Parse(Console.ReadLine());
        
        Student student = _service.GetStudent(id);
        Console.WriteLine($"\nStudent to delete: {student}");
        
        Console.Write("Are you sure? (yes/no): ");
        string confirm = Console.ReadLine()?.ToLower();
        
        if (confirm == "yes" || confirm == "y")
        {
            _service.DeleteStudent(id);
            Console.WriteLine("\n✅ Student deleted successfully!");
        }
        else
        {
            Console.WriteLine("\n❌ Delete cancelled.");
        }
    }
    
    static void ViewTopStudents()
    {
        Console.WriteLine("\n─── TOP STUDENTS ───\n");
        
        Console.Write("How many top students to show? (default 5): ");
        string input = Console.ReadLine();
        int count = string.IsNullOrWhiteSpace(input) ? 5 : int.Parse(input);
        
        List<Student> topStudents = _service.GetTopStudents(count);
        
        if (topStudents.Count == 0)
        {
            Console.WriteLine("No students found.");
            return;
        }
        
        Console.WriteLine($"\n🏆 Top {topStudents.Count} Students by GPA:\n");
        
        int rank = 1;
        foreach (Student s in topStudents)
        {
            string medal = rank switch
            {
                1 => "🥇",
                2 => "🥈",
                3 => "🥉",
                _ => "  "
            };
            
            Console.WriteLine($"  {medal} #{rank}: {s.Name} - GPA: {s.GPA:F2} ({s.Department})");
            rank++;
        }
    }
    
    static void ViewStatistics()
    {
        _service.PrintStatistics();
    }
    
    // ─────────────────────────────────────────────────────────────
    // Helper Methods
    // ─────────────────────────────────────────────────────────────
    
    static void PrintStudentDetails(Student s)
    {
        Console.WriteLine("\n┌─────────────────────────────────────────────┐");
        Console.WriteLine($"│  ID: {s.Id,-39} │");
        Console.WriteLine($"│  Name: {s.Name,-37} │");
        Console.WriteLine($"│  Email: {s.Email,-36} │");
        Console.WriteLine($"│  Age: {s.Age,-38} │");
        Console.WriteLine($"│  Department: {s.Department,-31} │");
        Console.WriteLine($"│  GPA: {s.GPA,-38:F2} │");
        Console.WriteLine($"│  Grade: {s.GetGrade(),-36} │");
        Console.WriteLine($"│  Enrolled: {s.EnrollmentDate:yyyy-MM-dd,-33} │");
        Console.WriteLine("└─────────────────────────────────────────────┘");
    }
    
    static void PrintStudentTable(List<Student> students)
    {
        Console.WriteLine("┌───────┬──────────────────────┬─────────────┬───────┬────────┐");
        Console.WriteLine("│  ID   │ Name                 │ Department  │  GPA  │ Grade  │");
        Console.WriteLine("├───────┼──────────────────────┼─────────────┼───────┼────────┤");
        
        foreach (Student s in students)
        {
            string name = s.Name.Length > 20 ? s.Name.Substring(0, 17) + "..." : s.Name;
            Console.WriteLine($"│ {s.Id,-5} │ {name,-20} │ {s.Department,-11} │ {s.GPA,5:F2} │ {s.GetGrade(),-6} │");
        }
        
        Console.WriteLine("└───────┴──────────────────────┴─────────────┴───────┴────────┘");
        Console.WriteLine($"\nTotal: {students.Count} student(s)");
    }
}
```

---

### Sample Run

```
╔═══════════════════════════════════════════════════════════╗
║          🎓 STUDENT MANAGEMENT SYSTEM                     ║
║             Exception Handling Demo                       ║
╚═══════════════════════════════════════════════════════════╝
[INFO] Data file not found. Starting with empty database.

╔═══════════════════════════════════════╗
║            MAIN MENU                  ║
╠═══════════════════════════════════════╣
║  1. Add New Student                   ║
║  2. View Student by ID                ║
║  ...                                  ║
╚═══════════════════════════════════════╝

Enter choice: 1

─── ADD NEW STUDENT ───

Name: Rahim Ahmed
Email: rahim@example.com
Age: 20
Department (CSE/EEE/BBA/English/Physics/Math): CSE
GPA (0-4): 3.75
[INFO] Added new student: [1001] Rahim Ahmed - CSE (GPA: 3.75)
[INFO] Saving 1 students to students.dat
[INFO] Data saved successfully.

✅ Student added successfully!

┌─────────────────────────────────────────────┐
│  ID: 1001                                   │
│  Name: Rahim Ahmed                          │
│  Email: rahim@example.com                   │
│  Age: 20                                    │
│  Department: CSE                            │
│  GPA: 3.75                                  │
│  Grade: A+                                  │
│  Enrolled: 2024-01-15                       │
└─────────────────────────────────────────────┘

Press any key to continue...

─────────────────────────────────────────

Enter choice: 1

─── ADD NEW STUDENT ───

Name: K
Email: k
Age: 10
Department (CSE/EEE/BBA/English/Physics/Math): XYZ
GPA (0-4): 5

❌ Validation failed:
   • Name must be at least 2 characters.
   • Invalid email format.
   • Student must be at least 16 years old.
   • Invalid department. Valid options: CSE, EEE, BBA, English, Physics, Math
   • GPA must be between 0 and 4.

Press any key to continue...

─────────────────────────────────────────

Enter choice: 2

─── VIEW STUDENT ───

Enter Student ID: 9999

❌ Student not found: Student with ID 9999 was not found.
[WARNING] Student lookup failed: ID 9999

Press any key to continue...

─────────────────────────────────────────

Enter choice: 6

─── UPDATE GPA ───

Enter Student ID: 1001

Student: Rahim Ahmed
Current GPA: 3.75 (Grade: A+)

Enter new GPA (0-4): 5.5

❌ Invalid grade: Invalid grade: 5.5. Grade must be between 0 and 4.
   Provided: 5.5, Valid range: 0 - 100

Press any key to continue...
```

---

## Exception Handling Complete Summary (Part 35-37)

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                EXCEPTION HANDLING - COMPLETE SUMMARY                      ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  PART 35: TRY-CATCH-FINALLY                                              ║
║  ─────────────────────────────                                            ║
║  • try { risky code }                                                     ║
║  • catch (SpecificException ex) { handle }                               ║
║  • catch (Exception ex) { handle all }                                   ║
║  • finally { always runs - cleanup }                                     ║
║  • Common: FormatException, NullReferenceException, IOException          ║
║                                                                           ║
║  PART 36: THROW & CUSTOM EXCEPTIONS                                      ║
║  ──────────────────────────────────                                       ║
║  • throw new Exception("message");                                        ║
║  • throw; (preserves stack trace)                                        ║
║  • Custom: class MyException : Exception { }                             ║
║  • Add properties for additional info                                     ║
║                                                                           ║
║  PART 37: BEST PRACTICES                                                 ║
║  ────────────────────────                                                 ║
║  ✅ DO:                                                                   ║
║     • Catch specific exceptions                                           ║
║     • Log exceptions with context                                         ║
║     • Use meaningful error messages                                       ║
║     • Use 'using' for IDisposable                                        ║
║     • Use throw; not throw ex;                                           ║
║                                                                           ║
║  ❌ DON'T:                                                                ║
║     • Empty catch blocks                                                  ║
║     • Catch Exception everywhere                                          ║
║     • Use exceptions for flow control                                     ║
║     • Swallow exceptions silently                                         ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXCEPTION HANDLING QUICK REFERENCE                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  SYNTAX:                                                                │
│  ───────                                                                │
│  try {                                                                  │
│      // risky code                                                      │
│  }                                                                      │
│  catch (SpecificException ex) {                                        │
│      // handle specific                                                 │
│  }                                                                      │
│  catch (Exception ex) {                                                │
│      // handle all others                                               │
│  }                                                                      │
│  finally {                                                              │
│      // always runs                                                     │
│  }                                                                      │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  THROW:                                                                 │
│  ──────                                                                 │
│  throw new ArgumentException("msg");     // throw new                   │
│  throw;                                  // rethrow (keep stack)        │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  CUSTOM EXCEPTION:                                                      │
│  ─────────────────                                                      │
│  public class MyException : Exception {                                │
│      public MyException(string msg) : base(msg) { }                    │
│  }                                                                      │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  USING STATEMENT:                                                       │
│  ────────────────                                                       │
│  using (var reader = new StreamReader(path)) {                         │
│      // auto-dispose when done                                          │
│  }                                                                      │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                         │
│  COMMON EXCEPTIONS:                                                     │
│  ──────────────────                                                     │
│  FormatException         - wrong format                                 │
│  NullReferenceException  - null access                                  │
│  ArgumentException       - bad argument                                 │
│  ArgumentNullException   - null argument                                │
│  InvalidOperationException - wrong state                               │
│  FileNotFoundException   - file missing                                 │
│  IOException             - I/O error                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Exception Handling Series সম্পূর্ণ! 🎉

**এই series এ যা শিখলাম:**

| Part | Topic | Key Learning |
|------|-------|--------------|
| Part 35 | Try-Catch-Finally | Exception handle করা |
| Part 36 | throw & Custom Exceptions | নিজে exception throw করা |
| Part 37 | Best Practices | Professional error handling |

**এখন তুমি জানো:**
- ✅ কীভাবে errors handle করতে হয়
- ✅ কীভাবে নিজে exception throw করতে হয়
- ✅ কীভাবে custom exception বানাতে হয়
- ✅ Best practices এবং common mistakes
- ✅ Real-world project এ exception handling

---

**Next:** OOP Deep Dive (Inheritance, Polymorphism, Interface) শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
