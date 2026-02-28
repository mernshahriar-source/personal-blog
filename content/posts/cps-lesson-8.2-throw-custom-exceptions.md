---
title: "Lesson 8.2: throw ও Custom Exceptions — নিজে Exception Throw করা"
date: "2026-03-30"
excerpt: "throw keyword, কেন নিজে throw করবে, Specific exceptions throw করা, throw vs throw ex পার্থক্য, Custom Exception class বানানো, এবং Bank Acc"
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


> **এই Lesson এ শিখবে:** throw keyword, কেন নিজে throw করবে, Specific exceptions throw করা, throw vs throw ex পার্থক্য, Custom Exception class বানানো, এবং Bank Account System example।

---

## throw Keyword

আগে C# নিজে exception throw করতো। কিন্তু **নিজেও throw করা যায়!**

```csharp
Console.Write("Enter age: ");
int age = int.Parse(Console.ReadLine());

if (age < 0)
{
    throw new Exception("Age cannot be negative!");
}

Console.WriteLine($"Your age is {age}");
```

Age -5 দিলে → Exception throw হবে → Program crash (যদি catch না থাকে)

---

## কেন নিজে throw করবে?

**Input validation!** Code ভুল data দিয়ে এগিয়ে যাওয়ার আগে থামাও:

```csharp
static void SetAge(int age)
{
    if (age < 0 || age > 150)
        throw new ArgumentException($"Invalid age: {age}. Must be 0-150.");

    Console.WriteLine($"Age set to: {age}");
}

try
{
    SetAge(25);    // ✅ Works
    SetAge(-5);    // ❌ Exception!
}
catch (ArgumentException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

---

## Specific Exception Types

ভুলের ধরন অনুযায়ী সঠিক exception throw করো:

```csharp
static void Withdraw(double amount, double balance)
{
    if (amount <= 0)
        throw new ArgumentException("Amount must be positive!");

    if (amount > balance)
        throw new InvalidOperationException($"Insufficient balance! Have: {balance}, Need: {amount}");
}
```

| Exception | কখন throw করবে |
|-----------|-----------------|
| `ArgumentException` | Invalid argument |
| `ArgumentNullException` | Argument null |
| `InvalidOperationException` | Invalid state এ operation |
| `NotImplementedException` | Method এখনো বানাওনি |

---

## throw vs throw ex — ⚠️ গুরুত্বপূর্ণ!

```csharp
try
{
    DoSomething();
}
catch (Exception ex)
{
    // Log the error
    Console.WriteLine($"Logged: {ex.Message}");

    throw;      // ✅ Original stack trace রাখে
    // throw ex; // ❌ Stack trace হারিয়ে যায়!
}
```

**সবসময় `throw;` use করো, `throw ex;` না!**

`throw ex;` করলে original error কোন line এ হয়েছিল সেই info হারিয়ে যায়।

---

## Custom Exception Class

### কেন দরকার?

```csharp
// ❌ Generic — specific না
throw new Exception("Insufficient balance!");

// ✅ Custom — specific, additional info সহ
throw new InsufficientBalanceException(balance, amount);
```

### Basic Structure:

```csharp
public class InsufficientBalanceException : Exception
{
    public double CurrentBalance { get; }
    public double RequestedAmount { get; }

    public InsufficientBalanceException(double balance, double amount)
        : base($"Insufficient balance! Have: {balance}, Need: {amount}")
    {
        CurrentBalance = balance;
        RequestedAmount = amount;
    }
}
```

**Rule:** Exception class name **Exception দিয়ে শেষ** হতে হবে।

### `: base(message)` কী?

Parent `Exception` class এর constructor call — এতে `ex.Message` কাজ করে।

---

## Example: Bank Account System 🏦

```csharp
// Custom Exceptions
public class InsufficientBalanceException : Exception
{
    public double Balance { get; }
    public double Amount { get; }

    public InsufficientBalanceException(double bal, double amt)
        : base($"Insufficient balance! Have: {bal}, Need: {amt}")
    {
        Balance = bal;
        Amount = amt;
    }
}

public class InvalidAmountException : Exception
{
    public InvalidAmountException(double amount)
        : base($"Invalid amount: {amount}. Must be positive.")
    { }
}

// Bank Account
class BankAccount
{
    public string Owner { get; }
    public double Balance { get; private set; }

    public BankAccount(string owner, double initialBalance)
    {
        Owner = owner;
        Balance = initialBalance;
    }

    public void Deposit(double amount)
    {
        if (amount <= 0)
            throw new InvalidAmountException(amount);
        Balance += amount;
        Console.WriteLine($"✅ Deposited {amount} tk. Balance: {Balance} tk");
    }

    public void Withdraw(double amount)
    {
        if (amount <= 0)
            throw new InvalidAmountException(amount);
        if (amount > Balance)
            throw new InsufficientBalanceException(Balance, amount);
        Balance -= amount;
        Console.WriteLine($"✅ Withdrew {amount} tk. Balance: {Balance} tk");
    }
}

// Usage
static void Main(string[] args)
{
    BankAccount acc = new BankAccount("Rahim", 5000);

    try
    {
        acc.Deposit(2000);     // ✅
        acc.Withdraw(3000);    // ✅
        acc.Withdraw(10000);   // ❌ InsufficientBalanceException
    }
    catch (InsufficientBalanceException ex)
    {
        Console.WriteLine($"❌ {ex.Message}");
        Console.WriteLine($"   Short by: {ex.Amount - ex.Balance} tk");
    }
    catch (InvalidAmountException ex)
    {
        Console.WriteLine($"❌ {ex.Message}");
    }
}
```

Output:
```
✅ Deposited 2000 tk. Balance: 7000 tk
✅ Withdrew 3000 tk. Balance: 4000 tk
❌ Insufficient balance! Have: 4000, Need: 10000
   Short by: 6000 tk
```

---

## কখন Custom Exception বানাবে?

| ✅ বানাও যখন | ❌ বানিও না যখন |
|-------------|----------------|
| Additional properties দরকার | Built-in exception যথেষ্ট |
| Specific catch handling দরকার | Generic message যথেষ্ট |
| Business-specific error | Simple validation |

---

## Summary

| Concept | মানে |
|---------|------|
| `throw new Exception(msg)` | নিজে exception throw |
| `throw;` | Rethrow (stack trace রাখে) |
| `throw ex;` | ❌ Stack trace হারায় |
| Custom Exception | `: Exception` inherit করে |

**মনে রাখো:**
- Input validate করতে **throw** use করো
- সঠিক Exception type throw করো (ArgumentException, etc.)
- Rethrow করতে **`throw;`** use করো, **`throw ex;`** না
- Custom Exception name **Exception দিয়ে শেষ** করো

---

**পরের Lesson:** Exception Best Practices — Professional error handling।

---

*CPS Academy - Learn. Code. Grow.*
