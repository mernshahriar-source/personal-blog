---
title: 'Part 36: throw এবং Custom Exceptions'
date: '2026-01-20'
excerpt: 'Part 36: throw keyword এবং custom exceptions বানানো শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - exceptions
  - error-handling
  - tutorial
draft: true
---

# Part 36: throw Keyword এবং Custom Exceptions

## আগের Part এ কী শিখলাম?

**Part 35 এ শিখলাম:**
- try-catch-finally দিয়ে exceptions handle করা
- Multiple catch blocks
- Common exceptions (FormatException, NullReferenceException, etc.)
- finally দিয়ে cleanup করা

**আজকে শিখবো:**
- নিজে exception throw করা
- নিজের custom exception class বানানো

---

## throw Keyword কী?

### আগে যা জানতাম

আগে আমরা দেখেছি C# automatically exception throw করে:

```csharp
int x = 10 / 0;  // C# নিজে DivideByZeroException throw করে
```

```csharp
string s = null;
int len = s.Length;  // C# নিজে NullReferenceException throw করে
```

**কিন্তু আমরা কি নিজে exception throw করতে পারি?**

**হ্যাঁ! `throw` keyword দিয়ে!**

---

### throw Syntax

```csharp
throw new Exception("Error message here");
```

**প্রতিটা part বুঝি:**

```
throw new Exception("Error message");
──┬── ─┬─ ────┬──── ───────┬───────
  │    │      │            │
  │    │      │            └── Error এর description
  │    │      │
  │    │      └── Exception class (বা অন্য কোনো exception type)
  │    │
  │    └── new keyword (নতুন exception object তৈরি)
  │
  └── throw keyword (exception টা throw করো)
```

---

### প্রথম Example

```csharp
Console.Write("Enter your age: ");
int age = int.Parse(Console.ReadLine());

if (age < 0)
{
    throw new Exception("Age cannot be negative!");
}

Console.WriteLine($"Your age is {age}");
```

**Run করলে:**

```
Enter your age: -5
Unhandled Exception: System.Exception: Age cannot be negative!
   at Program.Main() in Program.cs:line 7
```

**আমরা নিজে exception throw করলাম!**

---

### throw করলে কী হয়?

```
╔═══════════════════════════════════════════════════════════════════╗
║                    throw করলে কী হয়?                              ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║    Code চলছে স্বাভাবিকভাবে...                                     ║
║         │                                                         ║
║         ↓                                                         ║
║    if (age < 0)                                                  ║
║    {                                                              ║
║        throw new Exception("...");  💥 THROW!                    ║
║    }                                                              ║
║         │                                                         ║
║         ↓                                                         ║
║    এর পরের code EXECUTE হবে না!                                   ║
║         │                                                         ║
║         ↓                                                         ║
║    ┌─────────────────────────────────────────┐                   ║
║    │  try-catch আছে?                         │                   ║
║    └─────────────────────────────────────────┘                   ║
║              │                    │                               ║
║            YES                   NO                               ║
║              │                    │                               ║
║              ↓                    ↓                               ║
║    ┌─────────────────┐  ┌─────────────────────┐                  ║
║    │  catch block    │  │  💀 CRASH!          │                  ║
║    │  execute হবে    │  │  Program বন্ধ!      │                  ║
║    └─────────────────┘  └─────────────────────┘                  ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### throw এর পর code execute হয় না

```csharp
Console.WriteLine("Line 1");
Console.WriteLine("Line 2");

throw new Exception("Something went wrong!");

Console.WriteLine("Line 3");  // ❌ এটা কখনো execute হবে না!
Console.WriteLine("Line 4");  // ❌ এটাও না!
```

**Output:**

```
Line 1
Line 2
Unhandled Exception: System.Exception: Something went wrong!
```

**throw এর পর সব code skip হয়ে যায়!**

---

### throw with try-catch

```csharp
try
{
    Console.Write("Enter age: ");
    int age = int.Parse(Console.ReadLine());
    
    if (age < 0)
    {
        throw new Exception("Age cannot be negative!");
    }
    
    if (age > 150)
    {
        throw new Exception("Age cannot be more than 150!");
    }
    
    Console.WriteLine($"Valid age: {age}");
}
catch (FormatException)
{
    Console.WriteLine("Please enter a valid number!");
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

**Different inputs এ কী হয়:**

```
Enter age: hello
Please enter a valid number!

Enter age: -5
Error: Age cannot be negative!

Enter age: 200
Error: Age cannot be more than 150!

Enter age: 25
Valid age: 25
```

---

## কেন নিজে throw করবে?

### ১. Input Validation

User এর input সঠিক না হলে:

```csharp
void SetUsername(string username)
{
    if (string.IsNullOrWhiteSpace(username))
    {
        throw new ArgumentException("Username cannot be empty!");
    }
    
    if (username.Length < 3)
    {
        throw new ArgumentException("Username must be at least 3 characters!");
    }
    
    if (username.Length > 20)
    {
        throw new ArgumentException("Username cannot exceed 20 characters!");
    }
    
    // Valid username - proceed
    this.Username = username;
}
```

---

### ২. Business Rule Violation

Business logic এর নিয়ম ভাঙলে:

```csharp
void Withdraw(double amount)
{
    if (amount <= 0)
    {
        throw new ArgumentException("Amount must be positive!");
    }
    
    if (amount > Balance)
    {
        throw new Exception("Insufficient balance!");
    }
    
    Balance -= amount;
}
```

---

### ৩. Impossible/Invalid State

যা হওয়া উচিত না:

```csharp
string GetDayName(int dayNumber)
{
    switch (dayNumber)
    {
        case 1: return "Sunday";
        case 2: return "Monday";
        case 3: return "Tuesday";
        case 4: return "Wednesday";
        case 5: return "Thursday";
        case 6: return "Friday";
        case 7: return "Saturday";
        default:
            throw new ArgumentException($"Invalid day number: {dayNumber}. Must be 1-7.");
    }
}
```

---

### ৪. Contract Enforcement

Function এর preconditions enforce করতে:

```csharp
void SendEmail(string to, string subject, string body)
{
    // Preconditions
    if (string.IsNullOrWhiteSpace(to))
        throw new ArgumentNullException(nameof(to), "Recipient email is required!");
    
    if (!to.Contains("@"))
        throw new ArgumentException("Invalid email format!", nameof(to));
    
    if (string.IsNullOrWhiteSpace(subject))
        throw new ArgumentNullException(nameof(subject), "Subject is required!");
    
    // Now safe to send email
    // ...
}
```

---

## Specific Exception Types Throw করা

### Generic Exception vs Specific Exception

**❌ Generic Exception (Not recommended):**

```csharp
if (age < 0)
{
    throw new Exception("Age cannot be negative!");
}
```

**✅ Specific Exception (Better!):**

```csharp
if (age < 0)
{
    throw new ArgumentOutOfRangeException(nameof(age), "Age cannot be negative!");
}
```

---

### কোন Exception কখন throw করবে?

| Situation | Exception Type |
|-----------|---------------|
| Argument null হলে | `ArgumentNullException` |
| Argument invalid হলে | `ArgumentException` |
| Argument range এর বাইরে | `ArgumentOutOfRangeException` |
| Invalid operation | `InvalidOperationException` |
| Not implemented | `NotImplementedException` |
| Not supported | `NotSupportedException` |
| Key না পাওয়া গেলে | `KeyNotFoundException` |
| File না পাওয়া গেলে | `FileNotFoundException` |
| Format ভুল হলে | `FormatException` |

---

### ArgumentNullException

```csharp
void ProcessUser(User user)
{
    if (user == null)
    {
        throw new ArgumentNullException(nameof(user), "User cannot be null!");
    }
    
    // Process user...
}
```

**nameof() কী?**

```csharp
nameof(user)  // Returns: "user" (variable এর নাম string হিসেবে)

// এটা useful কারণ:
// 1. Typo হলে compile error দেবে
// 2. Rename করলে automatically update হবে
```

---

### ArgumentOutOfRangeException

```csharp
void SetVolume(int volume)
{
    if (volume < 0 || volume > 100)
    {
        throw new ArgumentOutOfRangeException(
            nameof(volume), 
            volume, 
            "Volume must be between 0 and 100!"
        );
    }
    
    this.Volume = volume;
}
```

---

### InvalidOperationException

```csharp
class Player
{
    public bool IsPlaying { get; private set; }
    
    public void Pause()
    {
        if (!IsPlaying)
        {
            throw new InvalidOperationException("Cannot pause - not currently playing!");
        }
        
        IsPlaying = false;
    }
}
```

**এটা use করো যখন:**
- Object এমন state এ আছে যেখানে operation করা যায় না
- Method call করার valid condition নেই

---

### NotImplementedException

```csharp
class Shape
{
    public virtual double CalculateArea()
    {
        throw new NotImplementedException("Subclass must implement CalculateArea!");
    }
}
```

**এটা use করো যখন:**
- Method এখনো implement করা হয়নি
- Placeholder হিসেবে রাখতে চাও

---

## throw vs throw ex - গুরুত্বপূর্ণ পার্থক্য!

### Scenario: catch এ exception আবার throw করা

কখনো কখনো exception catch করে কিছু কাজ (logging) করে আবার throw করতে হয়।

**দুইভাবে করা যায়:**

```csharp
// Way 1: throw;
catch (Exception ex)
{
    Console.WriteLine($"Logging: {ex.Message}");
    throw;  // শুধু throw
}

// Way 2: throw ex;
catch (Exception ex)
{
    Console.WriteLine($"Logging: {ex.Message}");
    throw ex;  // throw ex
}
```

**কিন্তু এই দুইটার মধ্যে বিশাল পার্থক্য আছে!**

---

### পার্থক্য বুঝি Example দিয়ে

```csharp
void Method1()
{
    Method2();
}

void Method2()
{
    Method3();
}

void Method3()
{
    throw new Exception("Error in Method3!");  // Line 15
}
```

---

**`throw;` ব্যবহার করলে:**

```csharp
void Method1()
{
    try
    {
        Method2();
    }
    catch (Exception ex)
    {
        Console.WriteLine("Logging error...");
        throw;  // ✅ Original stack trace preserved!
    }
}
```

**StackTrace:**

```
at Method3() in Program.cs:line 15  ← Original error location!
at Method2() in Program.cs:line 10
at Method1() in Program.cs:line 5
```

**আসল error কোথায় হয়েছিল (Method3, line 15) সেটা দেখা যাচ্ছে!** ✅

---

**`throw ex;` ব্যবহার করলে:**

```csharp
void Method1()
{
    try
    {
        Method2();
    }
    catch (Exception ex)
    {
        Console.WriteLine("Logging error...");
        throw ex;  // ❌ Stack trace reset!
    }
}
```

**StackTrace:**

```
at Method1() in Program.cs:line 9  ← শুধু এখান থেকে!
```

**আসল error কোথায় হয়েছিল সেটা হারিয়ে গেছে!** ❌

---

### Visual Comparison

```
╔═══════════════════════════════════════════════════════════════════════╗
║                    throw vs throw ex                                  ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  throw;                              throw ex;                        ║
║  ──────                              ─────────                        ║
║                                                                       ║
║  ✅ Original StackTrace রাখে         ❌ StackTrace reset করে          ║
║  ✅ Error এর আসল location দেখায়     ❌ শুধু throw ex এর location      ║
║  ✅ Debugging সহজ                    ❌ Debugging কঠিন                ║
║                                                                       ║
║  StackTrace:                         StackTrace:                      ║
║  ┌─────────────────────────┐        ┌─────────────────────────┐      ║
║  │ Method3 (line 15) ← আসল│        │ Method1 (line 9)        │      ║
║  │ Method2 (line 10)       │        │                         │      ║
║  │ Method1 (line 5)        │        │ (বাকি হারিয়ে গেছে!)   │      ║
║  └─────────────────────────┘        └─────────────────────────┘      ║
║                                                                       ║
║  USE THIS! ✅                        AVOID THIS! ❌                   ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

### Rule মনে রাখো

```
╔═══════════════════════════════════════════════════════════════════╗
║  💡 RULE: সবসময় throw; use করো, throw ex; নয়!                   ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  catch (Exception ex)                                            ║
║  {                                                                ║
║      // Log করো                                                  ║
║      Console.WriteLine(ex.Message);                              ║
║                                                                   ║
║      throw;     // ✅ এটা করো                                    ║
║      // throw ex;  ❌ এটা করো না                                 ║
║  }                                                                ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## Rethrowing Exceptions - কখন এবং কেন?

### কখন Rethrow করবে?

**১. Logging করতে চাও কিন্তু handle করতে চাও না:**

```csharp
void ProcessOrder(Order order)
{
    try
    {
        // Process the order
        ValidateOrder(order);
        SaveToDatabase(order);
        SendConfirmation(order);
    }
    catch (Exception ex)
    {
        // Log the error
        Logger.Error($"Failed to process order {order.Id}: {ex.Message}");
        Logger.Error($"StackTrace: {ex.StackTrace}");
        
        // Rethrow - let caller handle it
        throw;
    }
}
```

---

**২. Cleanup করতে চাও এবং rethrow করতে চাও:**

```csharp
void ProcessFile(string filename)
{
    StreamReader reader = null;
    
    try
    {
        reader = new StreamReader(filename);
        ProcessContent(reader.ReadToEnd());
    }
    catch (Exception ex)
    {
        // Log
        Console.WriteLine($"Error processing {filename}: {ex.Message}");
        
        // Rethrow
        throw;
    }
    finally
    {
        // Cleanup - এটা throw এর আগেও হবে!
        reader?.Close();
    }
}
```

---

**৩. Exception wrap করতে চাও:**

```csharp
void LoadUserData(int userId)
{
    try
    {
        // Database call
        var data = Database.Query($"SELECT * FROM Users WHERE Id = {userId}");
    }
    catch (SqlException ex)
    {
        // Wrap in a more meaningful exception
        throw new DataAccessException(
            $"Failed to load user {userId}", 
            ex  // Inner exception হিসেবে original রাখো
        );
    }
}
```

---

### Wrapping Exception Pattern

```csharp
try
{
    // Low-level operation
}
catch (LowLevelException ex)
{
    // Wrap in high-level exception
    throw new HighLevelException("Meaningful message", ex);
    //                                                  │
    //                                    Inner exception রাখো!
}
```

**কেন wrap করবে?**

```
Low-level exception: SqlException, IOException, SocketException
- Technical details
- User এর কাছে meaningless

High-level exception: UserNotFoundException, PaymentFailedException
- Business meaning
- User/Developer বুঝতে পারে
```

---

## Custom Exception Class - নিজের Exception বানাও

### কেন Custom Exception দরকার?

**Scenario: Banking System**

```csharp
void Withdraw(double amount)
{
    if (amount > Balance)
    {
        throw new Exception("Insufficient balance!");
    }
}
```

**সমস্যা:**
- Generic `Exception` - specific না
- catch এ আলাদা করে handle করা কঠিন
- Additional info (যেমন current balance, requested amount) রাখা যাচ্ছে না

**Solution: Custom Exception!**

```csharp
void Withdraw(double amount)
{
    if (amount > Balance)
    {
        throw new InsufficientBalanceException(Balance, amount);
    }
}
```

**Benefits:**
- Specific exception type - আলাদা catch করা যায়
- Additional properties রাখা যায়
- Clear intent - code পড়লেই বোঝা যায় কী error

---

### Custom Exception এর Basic Structure

```csharp
// Custom exception class
public class InsufficientBalanceException : Exception
{
    public InsufficientBalanceException()
        : base("Insufficient balance in account.")
    {
    }
    
    public InsufficientBalanceException(string message)
        : base(message)
    {
    }
    
    public InsufficientBalanceException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
```

---

### প্রতিটা Part বুঝি

```csharp
public class InsufficientBalanceException : Exception
//     │                  │                    │
//     │                  │                    └── Exception থেকে inherit
//     │                  │
//     │                  └── Class এর নাম (Exception দিয়ে শেষ!)
//     │
//     └── public - যেকোনো জায়গা থেকে access করা যাবে
```

```csharp
public InsufficientBalanceException(string message)
    : base(message)  // Parent class (Exception) এর constructor call
{
}
```

**`: base(message)` কী করে?**

```
Exception class এর একটা constructor আছে যেটা message নেয়।

base(message) মানে parent Exception এর সেই constructor কে call করো।

এতে ex.Message ঠিকমতো কাজ করবে।
```

---

### Custom Exception with Additional Properties

```csharp
public class InsufficientBalanceException : Exception
{
    // Additional properties
    public double CurrentBalance { get; }
    public double RequestedAmount { get; }
    public double Shortfall { get; }
    
    // Constructor with all info
    public InsufficientBalanceException(double currentBalance, double requestedAmount)
        : base($"Insufficient balance. Current: {currentBalance:C}, Requested: {requestedAmount:C}")
    {
        CurrentBalance = currentBalance;
        RequestedAmount = requestedAmount;
        Shortfall = requestedAmount - currentBalance;
    }
    
    // Other constructors
    public InsufficientBalanceException(string message)
        : base(message)
    {
    }
    
    public InsufficientBalanceException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
```

---

### Custom Exception ব্যবহার করা

**Throw করা:**

```csharp
class BankAccount
{
    public double Balance { get; private set; }
    
    public void Withdraw(double amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentException("Amount must be positive!", nameof(amount));
        }
        
        if (amount > Balance)
        {
            throw new InsufficientBalanceException(Balance, amount);
        }
        
        Balance -= amount;
    }
}
```

---

**Catch করা:**

```csharp
try
{
    account.Withdraw(5000);
}
catch (InsufficientBalanceException ex)
{
    Console.WriteLine($"❌ {ex.Message}");
    Console.WriteLine($"   Your balance: {ex.CurrentBalance:C}");
    Console.WriteLine($"   You requested: {ex.RequestedAmount:C}");
    Console.WriteLine($"   Shortfall: {ex.Shortfall:C}");
}
catch (ArgumentException ex)
{
    Console.WriteLine($"❌ Invalid amount: {ex.Message}");
}
```

**Output:**

```
❌ Insufficient balance. Current: ৳1,000.00, Requested: ৳5,000.00
   Your balance: ৳1,000.00
   You requested: ৳5,000.00
   Shortfall: ৳4,000.00
```

---

## Custom Exception Examples

### Example ১: InvalidAgeException

```csharp
public class InvalidAgeException : Exception
{
    public int ProvidedAge { get; }
    public int MinAge { get; }
    public int MaxAge { get; }
    
    public InvalidAgeException(int providedAge, int minAge = 0, int maxAge = 150)
        : base($"Invalid age: {providedAge}. Age must be between {minAge} and {maxAge}.")
    {
        ProvidedAge = providedAge;
        MinAge = minAge;
        MaxAge = maxAge;
    }
    
    public InvalidAgeException(string message) : base(message) { }
    
    public InvalidAgeException(string message, Exception inner) : base(message, inner) { }
}
```

**ব্যবহার:**

```csharp
class User
{
    private int _age;
    
    public int Age
    {
        get => _age;
        set
        {
            if (value < 0 || value > 150)
            {
                throw new InvalidAgeException(value);
            }
            _age = value;
        }
    }
}

// Usage
try
{
    User user = new User();
    user.Age = -5;
}
catch (InvalidAgeException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    Console.WriteLine($"You entered: {ex.ProvidedAge}");
    Console.WriteLine($"Valid range: {ex.MinAge} - {ex.MaxAge}");
}
```

---

### Example ২: ProductNotFoundException

```csharp
public class ProductNotFoundException : Exception
{
    public int ProductId { get; }
    public string SearchTerm { get; }
    
    public ProductNotFoundException(int productId)
        : base($"Product with ID {productId} was not found.")
    {
        ProductId = productId;
    }
    
    public ProductNotFoundException(string searchTerm, bool isSearchTerm)
        : base($"No products found matching '{searchTerm}'.")
    {
        SearchTerm = searchTerm;
    }
    
    public ProductNotFoundException(string message) : base(message) { }
    
    public ProductNotFoundException(string message, Exception inner) : base(message, inner) { }
}
```

**ব্যবহার:**

```csharp
class ProductService
{
    private Dictionary<int, string> _products = new Dictionary<int, string>()
    {
        { 1, "Laptop" },
        { 2, "Phone" },
        { 3, "Tablet" }
    };
    
    public string GetProduct(int id)
    {
        if (!_products.ContainsKey(id))
        {
            throw new ProductNotFoundException(id);
        }
        
        return _products[id];
    }
}

// Usage
try
{
    var service = new ProductService();
    string product = service.GetProduct(999);
}
catch (ProductNotFoundException ex)
{
    Console.WriteLine($"❌ {ex.Message}");
    Console.WriteLine($"   Product ID: {ex.ProductId}");
}
```

---

### Example ৩: DuplicateUsernameException

```csharp
public class DuplicateUsernameException : Exception
{
    public string Username { get; }
    public DateTime? ExistingSince { get; }
    
    public DuplicateUsernameException(string username)
        : base($"Username '{username}' is already taken.")
    {
        Username = username;
    }
    
    public DuplicateUsernameException(string username, DateTime existingSince)
        : base($"Username '{username}' has been taken since {existingSince:d}.")
    {
        Username = username;
        ExistingSince = existingSince;
    }
    
    public DuplicateUsernameException(string message, Exception inner) 
        : base(message, inner) { }
}
```

**ব্যবহার:**

```csharp
class UserService
{
    private HashSet<string> _usernames = new HashSet<string>() 
    { 
        "admin", "user123", "rahim" 
    };
    
    public void Register(string username)
    {
        if (_usernames.Contains(username.ToLower()))
        {
            throw new DuplicateUsernameException(username);
        }
        
        _usernames.Add(username.ToLower());
        Console.WriteLine($"✅ User '{username}' registered successfully!");
    }
}

// Usage
try
{
    var service = new UserService();
    service.Register("admin");
}
catch (DuplicateUsernameException ex)
{
    Console.WriteLine($"❌ {ex.Message}");
    Console.WriteLine($"   Please choose a different username.");
}
```

---

### Example ৪: ValidationException (Multiple Errors)

```csharp
public class ValidationException : Exception
{
    public List<string> Errors { get; }
    
    public ValidationException(List<string> errors)
        : base($"Validation failed with {errors.Count} error(s).")
    {
        Errors = errors;
    }
    
    public ValidationException(string error)
        : base($"Validation failed: {error}")
    {
        Errors = new List<string> { error };
    }
    
    public ValidationException(string message, Exception inner) 
        : base(message, inner) { }
}
```

**ব্যবহার:**

```csharp
class RegistrationForm
{
    public void Validate(string username, string email, string password)
    {
        List<string> errors = new List<string>();
        
        // Username validation
        if (string.IsNullOrWhiteSpace(username))
            errors.Add("Username is required");
        else if (username.Length < 3)
            errors.Add("Username must be at least 3 characters");
        
        // Email validation
        if (string.IsNullOrWhiteSpace(email))
            errors.Add("Email is required");
        else if (!email.Contains("@"))
            errors.Add("Invalid email format");
        
        // Password validation
        if (string.IsNullOrWhiteSpace(password))
            errors.Add("Password is required");
        else if (password.Length < 8)
            errors.Add("Password must be at least 8 characters");
        
        // If any errors, throw
        if (errors.Count > 0)
        {
            throw new ValidationException(errors);
        }
    }
}

// Usage
try
{
    var form = new RegistrationForm();
    form.Validate("ab", "invalid-email", "123");
}
catch (ValidationException ex)
{
    Console.WriteLine($"❌ {ex.Message}");
    Console.WriteLine("\nErrors:");
    foreach (string error in ex.Errors)
    {
        Console.WriteLine($"  • {error}");
    }
}
```

**Output:**

```
❌ Validation failed with 3 error(s).

Errors:
  • Username must be at least 3 characters
  • Invalid email format
  • Password must be at least 8 characters
```

---

## Complete Project: Bank Account System

### Custom Exceptions Define করি

```csharp
// Exception 1: Insufficient Balance
public class InsufficientBalanceException : Exception
{
    public double CurrentBalance { get; }
    public double RequestedAmount { get; }
    
    public InsufficientBalanceException(double balance, double requested)
        : base($"Insufficient balance. Available: {balance:C}, Requested: {requested:C}")
    {
        CurrentBalance = balance;
        RequestedAmount = requested;
    }
}

// Exception 2: Invalid Amount
public class InvalidAmountException : Exception
{
    public double Amount { get; }
    
    public InvalidAmountException(double amount)
        : base($"Invalid amount: {amount:C}. Amount must be positive.")
    {
        Amount = amount;
    }
}

// Exception 3: Account Locked
public class AccountLockedException : Exception
{
    public string AccountNumber { get; }
    public string Reason { get; }
    
    public AccountLockedException(string accountNumber, string reason)
        : base($"Account {accountNumber} is locked. Reason: {reason}")
    {
        AccountNumber = accountNumber;
        Reason = reason;
    }
}

// Exception 4: Daily Limit Exceeded
public class DailyLimitExceededException : Exception
{
    public double DailyLimit { get; }
    public double TodayWithdrawals { get; }
    public double RequestedAmount { get; }
    
    public DailyLimitExceededException(double limit, double today, double requested)
        : base($"Daily withdrawal limit exceeded. Limit: {limit:C}, Today: {today:C}, Requested: {requested:C}")
    {
        DailyLimit = limit;
        TodayWithdrawals = today;
        RequestedAmount = requested;
    }
}
```

---

### BankAccount Class

```csharp
public class BankAccount
{
    // Properties
    public string AccountNumber { get; }
    public string HolderName { get; }
    public double Balance { get; private set; }
    public bool IsLocked { get; private set; }
    public string LockReason { get; private set; }
    
    // Daily limit tracking
    private double _dailyLimit = 50000;
    private double _todayWithdrawals = 0;
    private DateTime _lastWithdrawalDate = DateTime.MinValue;
    
    // Constructor
    public BankAccount(string accountNumber, string holderName, double initialBalance = 0)
    {
        if (string.IsNullOrWhiteSpace(accountNumber))
            throw new ArgumentNullException(nameof(accountNumber));
        
        if (string.IsNullOrWhiteSpace(holderName))
            throw new ArgumentNullException(nameof(holderName));
        
        if (initialBalance < 0)
            throw new InvalidAmountException(initialBalance);
        
        AccountNumber = accountNumber;
        HolderName = holderName;
        Balance = initialBalance;
    }
    
    // Deposit
    public void Deposit(double amount)
    {
        // Check if account is locked
        if (IsLocked)
        {
            throw new AccountLockedException(AccountNumber, LockReason);
        }
        
        // Validate amount
        if (amount <= 0)
        {
            throw new InvalidAmountException(amount);
        }
        
        Balance += amount;
        Console.WriteLine($"✅ Deposited {amount:C}. New balance: {Balance:C}");
    }
    
    // Withdraw
    public void Withdraw(double amount)
    {
        // Check if account is locked
        if (IsLocked)
        {
            throw new AccountLockedException(AccountNumber, LockReason);
        }
        
        // Validate amount
        if (amount <= 0)
        {
            throw new InvalidAmountException(amount);
        }
        
        // Check daily limit
        ResetDailyLimitIfNewDay();
        
        if (_todayWithdrawals + amount > _dailyLimit)
        {
            throw new DailyLimitExceededException(_dailyLimit, _todayWithdrawals, amount);
        }
        
        // Check balance
        if (amount > Balance)
        {
            throw new InsufficientBalanceException(Balance, amount);
        }
        
        // Perform withdrawal
        Balance -= amount;
        _todayWithdrawals += amount;
        _lastWithdrawalDate = DateTime.Today;
        
        Console.WriteLine($"✅ Withdrawn {amount:C}. New balance: {Balance:C}");
    }
    
    // Transfer
    public void Transfer(BankAccount toAccount, double amount)
    {
        if (toAccount == null)
        {
            throw new ArgumentNullException(nameof(toAccount), "Destination account cannot be null!");
        }
        
        if (toAccount.AccountNumber == this.AccountNumber)
        {
            throw new InvalidOperationException("Cannot transfer to the same account!");
        }
        
        // Withdraw from this account (all validations happen here)
        this.Withdraw(amount);
        
        // Deposit to target account
        toAccount.Deposit(amount);
        
        Console.WriteLine($"✅ Transferred {amount:C} to account {toAccount.AccountNumber}");
    }
    
    // Lock account
    public void Lock(string reason)
    {
        IsLocked = true;
        LockReason = reason;
    }
    
    // Unlock account
    public void Unlock()
    {
        IsLocked = false;
        LockReason = null;
    }
    
    // Reset daily limit if new day
    private void ResetDailyLimitIfNewDay()
    {
        if (_lastWithdrawalDate < DateTime.Today)
        {
            _todayWithdrawals = 0;
        }
    }
    
    // Display info
    public void DisplayInfo()
    {
        Console.WriteLine("\n┌─────────────────────────────────────┐");
        Console.WriteLine($"│  Account: {AccountNumber,-25} │");
        Console.WriteLine($"│  Holder: {HolderName,-26} │");
        Console.WriteLine($"│  Balance: {Balance,-25:C} │");
        Console.WriteLine($"│  Status: {(IsLocked ? "🔒 LOCKED" : "✅ Active"),-26} │");
        if (IsLocked)
        {
            Console.WriteLine($"│  Reason: {LockReason,-26} │");
        }
        Console.WriteLine("└─────────────────────────────────────┘\n");
    }
}
```

---

### Main Program

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("╔═══════════════════════════════════════════════╗");
        Console.WriteLine("║          🏦 BANK ACCOUNT SYSTEM               ║");
        Console.WriteLine("╚═══════════════════════════════════════════════╝\n");
        
        // Create accounts
        BankAccount rahim = new BankAccount("ACC001", "Rahim Ahmed", 10000);
        BankAccount karim = new BankAccount("ACC002", "Karim Khan", 5000);
        
        // Menu loop
        while (true)
        {
            Console.WriteLine("\n─────────────────────────────────────────────");
            Console.WriteLine("Commands: deposit, withdraw, transfer, info, lock, unlock, exit");
            Console.Write("\n> ");
            string command = Console.ReadLine()?.ToLower();
            
            try
            {
                switch (command)
                {
                    case "deposit":
                        Console.Write("Enter amount: ");
                        double depositAmount = double.Parse(Console.ReadLine());
                        rahim.Deposit(depositAmount);
                        break;
                        
                    case "withdraw":
                        Console.Write("Enter amount: ");
                        double withdrawAmount = double.Parse(Console.ReadLine());
                        rahim.Withdraw(withdrawAmount);
                        break;
                        
                    case "transfer":
                        Console.Write("Enter amount: ");
                        double transferAmount = double.Parse(Console.ReadLine());
                        rahim.Transfer(karim, transferAmount);
                        break;
                        
                    case "info":
                        rahim.DisplayInfo();
                        karim.DisplayInfo();
                        break;
                        
                    case "lock":
                        Console.Write("Enter lock reason: ");
                        string reason = Console.ReadLine();
                        rahim.Lock(reason);
                        Console.WriteLine("🔒 Account locked!");
                        break;
                        
                    case "unlock":
                        rahim.Unlock();
                        Console.WriteLine("🔓 Account unlocked!");
                        break;
                        
                    case "exit":
                        Console.WriteLine("\nThank you for banking with us! 👋");
                        return;
                        
                    default:
                        Console.WriteLine("❌ Unknown command!");
                        break;
                }
            }
            catch (InsufficientBalanceException ex)
            {
                Console.WriteLine($"\n╔═════════════════════════════════════════════╗");
                Console.WriteLine($"║  ❌ INSUFFICIENT BALANCE                    ║");
                Console.WriteLine($"╠═════════════════════════════════════════════╣");
                Console.WriteLine($"║  Your balance: {ex.CurrentBalance,-27:C} ║");
                Console.WriteLine($"║  Requested:    {ex.RequestedAmount,-27:C} ║");
                Console.WriteLine($"║  Shortfall:    {ex.RequestedAmount - ex.CurrentBalance,-27:C} ║");
                Console.WriteLine($"╚═════════════════════════════════════════════╝");
            }
            catch (InvalidAmountException ex)
            {
                Console.WriteLine($"\n❌ Invalid amount: {ex.Amount:C}");
                Console.WriteLine("   Amount must be a positive number!");
            }
            catch (AccountLockedException ex)
            {
                Console.WriteLine($"\n╔═════════════════════════════════════════════╗");
                Console.WriteLine($"║  🔒 ACCOUNT LOCKED                          ║");
                Console.WriteLine($"╠═════════════════════════════════════════════╣");
                Console.WriteLine($"║  Account: {ex.AccountNumber,-33} ║");
                Console.WriteLine($"║  Reason: {ex.Reason,-34} ║");
                Console.WriteLine($"╚═════════════════════════════════════════════╝");
            }
            catch (DailyLimitExceededException ex)
            {
                Console.WriteLine($"\n╔═════════════════════════════════════════════╗");
                Console.WriteLine($"║  ⚠️ DAILY LIMIT EXCEEDED                    ║");
                Console.WriteLine($"╠═════════════════════════════════════════════╣");
                Console.WriteLine($"║  Daily limit:     {ex.DailyLimit,-24:C} ║");
                Console.WriteLine($"║  Withdrawn today: {ex.TodayWithdrawals,-24:C} ║");
                Console.WriteLine($"║  Requested:       {ex.RequestedAmount,-24:C} ║");
                Console.WriteLine($"║  Remaining:       {ex.DailyLimit - ex.TodayWithdrawals,-24:C} ║");
                Console.WriteLine($"╚═════════════════════════════════════════════╝");
            }
            catch (FormatException)
            {
                Console.WriteLine("\n❌ Invalid number format! Please enter a valid amount.");
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine($"\n❌ {ex.Message}");
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"\n❌ {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\n❌ Unexpected error: {ex.Message}");
            }
        }
    }
}
```

---

### Sample Run

```
╔═══════════════════════════════════════════════╗
║          🏦 BANK ACCOUNT SYSTEM               ║
╚═══════════════════════════════════════════════╝


─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> info

┌─────────────────────────────────────┐
│  Account: ACC001                    │
│  Holder: Rahim Ahmed                │
│  Balance: ৳10,000.00                │
│  Status: ✅ Active                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  Account: ACC002                    │
│  Holder: Karim Khan                 │
│  Balance: ৳5,000.00                 │
│  Status: ✅ Active                   │
└─────────────────────────────────────┘


─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> deposit
Enter amount: 5000
✅ Deposited ৳5,000.00. New balance: ৳15,000.00

─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> withdraw
Enter amount: 20000

╔═════════════════════════════════════════════╗
║  ❌ INSUFFICIENT BALANCE                    ║
╠═════════════════════════════════════════════╣
║  Your balance: ৳15,000.00                   ║
║  Requested:    ৳20,000.00                   ║
║  Shortfall:    ৳5,000.00                    ║
╚═════════════════════════════════════════════╝

─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> withdraw
Enter amount: -100

❌ Invalid amount: (৳100.00)
   Amount must be a positive number!

─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> transfer
Enter amount: 3000
✅ Withdrawn ৳3,000.00. New balance: ৳12,000.00
✅ Deposited ৳3,000.00. New balance: ৳8,000.00
✅ Transferred ৳3,000.00 to account ACC002

─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> lock
Enter lock reason: Suspicious activity
🔒 Account locked!

─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> withdraw
Enter amount: 1000

╔═════════════════════════════════════════════╗
║  🔒 ACCOUNT LOCKED                          ║
╠═════════════════════════════════════════════╣
║  Account: ACC001                            ║
║  Reason: Suspicious activity                ║
╚═════════════════════════════════════════════╝

─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> unlock
🔓 Account unlocked!

─────────────────────────────────────────────
Commands: deposit, withdraw, transfer, info, lock, unlock, exit

> exit

Thank you for banking with us! 👋
```

---

## Best Practices

### ১. Exception Naming

```csharp
// ✅ Good - ends with "Exception"
InsufficientBalanceException
InvalidAgeException
ProductNotFoundException

// ❌ Bad
InsufficientBalance
InvalidAgeError
ProductNotFound
```

---

### ২. কখন Custom Exception বানাবে?

```
╔═══════════════════════════════════════════════════════════════════╗
║  Custom Exception বানাবে যখন:                                     ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  ✅ Built-in exception এ তোমার case cover হচ্ছে না               ║
║  ✅ Additional information রাখতে চাও (properties)                ║
║  ✅ Specific catch block লিখতে চাও                               ║
║  ✅ Business-specific error represent করতে চাও                   ║
║                                                                   ║
║  Custom Exception বানাবে না যখন:                                  ║
║                                                                   ║
║  ❌ Built-in exception কাজ করে (ArgumentException, etc.)         ║
║  ❌ শুধু message আলাদা করতে চাও                                  ║
║  ❌ খুব simple validation                                        ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### ৩. Standard Constructors Include করো

```csharp
public class MyCustomException : Exception
{
    // Default constructor
    public MyCustomException()
        : base() { }
    
    // Message constructor
    public MyCustomException(string message)
        : base(message) { }
    
    // Message + Inner exception constructor
    public MyCustomException(string message, Exception innerException)
        : base(message, innerException) { }
}
```

---

### ৪. Meaningful Properties Add করো

```csharp
// ❌ Bad - just message
throw new Exception("Order 123 not found");

// ✅ Good - with properties
throw new OrderNotFoundException(123);

// Now can access:
catch (OrderNotFoundException ex)
{
    Console.WriteLine($"Order {ex.OrderId} not found");
    // Can use ex.OrderId for logging, retry, etc.
}
```

---

## Summary

```
╔═══════════════════════════════════════════════════════════════════════╗
║                    THROW & CUSTOM EXCEPTIONS SUMMARY                  ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  THROW KEYWORD:                                                       ║
║  ──────────────                                                       ║
║  throw new Exception("message");     // Basic throw                   ║
║  throw new ArgumentException("...");  // Specific exception           ║
║  throw;                               // Rethrow (preserves stack)    ║
║                                                                       ║
║  ⚠️ throw; use করো, throw ex; নয়!                                   ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  CUSTOM EXCEPTION:                                                    ║
║  ─────────────────                                                    ║
║  public class MyException : Exception                                 ║
║  {                                                                    ║
║      public MyException() { }                                         ║
║      public MyException(string message) : base(message) { }           ║
║      public MyException(string msg, Exception inner)                  ║
║          : base(msg, inner) { }                                       ║
║  }                                                                    ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  WHEN TO CREATE CUSTOM EXCEPTION:                                     ║
║  ────────────────────────────────                                     ║
║  ✅ Need additional properties                                        ║
║  ✅ Need specific catch handling                                      ║
║  ✅ Business-specific errors                                          ║
║  ❌ Built-in exception works fine                                     ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

**Next Part এ:** Exception Handling Best Practices এবং Real Project!

---

*CPS Academy - Learn. Code. Grow.*
