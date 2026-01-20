---
title: 'Part 13: if-else Statements'
date: '2026-01-20'
excerpt: 'Part 13: if-else Statements - conditional logic শিখুন C# এ'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - conditionals
  - tutorial
draft: false
---

# Part 13: if-else Statements

এতদিন আমরা শুধু true/false বের করেছি। কিন্তু শুধু true/false জেনে কী হবে? এটা দিয়ে কিছু করতে হবে তো!

ধরো তুমি ATM এ গেলে। PIN দিলে। এখন ATM check করবে - PIN ঠিক আছে? **যদি** ঠিক থাকে, টাকা দেবে। **নাহলে** বলবে "Wrong PIN!"

এই "যদি...তাহলে...নাহলে" - এটাই হলো if-else। Program কে decision নিতে শেখানো।

### এই part শেষে তুমি বানাতে পারবে:

- 🔐 Login system
- 📝 Pass/Fail checker
- 🎂 Age verification
- 🏆 Grade calculator
- 💰 Discount system
- 🎮 Game level unlock

চলো শুরু করি!

---

## if Statement - যদি...তাহলে

সবচেয়ে basic decision। শর্ত সত্য হলে কাজ করো।

### Syntax

```csharp
if (condition)
{
    // condition true হলে এই code চলবে
}
```

### প্রথম Example

```csharp
int age = 20;

if (age >= 18)
{
    Console.WriteLine("You are an adult!");
}

Console.WriteLine("Program ended.");
```

Output:
```
You are an adult!
Program ended.
```

age হলো 20, যেটা 18 এর বেশি। তাই condition true, তাই message টা print হলো।

### Condition False হলে কী হয়?

```csharp
int age = 15;

if (age >= 18)
{
    Console.WriteLine("You are an adult!");
}

Console.WriteLine("Program ended.");
```

Output:
```
Program ended.
```

age হলো 15, যেটা 18 এর কম। Condition false, তাই if এর ভিতরের code skip হয়ে গেলো।

### আরো কিছু Examples

**Pass Check:**

```csharp
int marks = 75;

if (marks >= 33)
{
    Console.WriteLine("✅ Congratulations! You passed!");
}
```

Output: `✅ Congratulations! You passed!`

**Login Success:**

```csharp
string password = "abc123";
string correctPassword = "abc123";

if (password == correctPassword)
{
    Console.WriteLine("✅ Login successful!");
    Console.WriteLine("Welcome to your dashboard.");
}
```

Output:
```
✅ Login successful!
Welcome to your dashboard.
```

**High Score:**

```csharp
int currentScore = 950;
int highScore = 900;

if (currentScore > highScore)
{
    Console.WriteLine("🏆 NEW HIGH SCORE!");
    Console.WriteLine($"You beat the previous record of {highScore}!");
}
```

**Discount Check:**

```csharp
double purchaseAmount = 1500;

if (purchaseAmount >= 1000)
{
    double discount = purchaseAmount * 0.10;
    Console.WriteLine($"🎉 You get {discount} tk discount!");
}
```

---

## else Statement - নাহলে

if এর condition false হলে কী হবে সেটা বলতে else use করো।

### Syntax

```csharp
if (condition)
{
    // condition true হলে এটা চলবে
}
else
{
    // condition false হলে এটা চলবে
}
```

### Adult/Minor Check

```csharp
int age = 15;

if (age >= 18)
{
    Console.WriteLine("You are an adult.");
}
else
{
    Console.WriteLine("You are a minor.");
}
```

Output: `You are a minor.`

age 15, তাই condition false, তাই else এর code চললো।

### Pass/Fail

```csharp
int marks = 28;

if (marks >= 33)
{
    Console.WriteLine("✅ You passed!");
}
else
{
    Console.WriteLine("❌ You failed.");
}
```

Output: `❌ You failed.`

### Login System

```csharp
string correctPassword = "secret123";

Console.Write("Enter password: ");
string input = Console.ReadLine();

if (input == correctPassword)
{
    Console.WriteLine("✅ Welcome! Login successful.");
}
else
{
    Console.WriteLine("❌ Wrong password! Access denied.");
}
```

### Even/Odd Check

```csharp
int number = 7;

if (number % 2 == 0)
{
    Console.WriteLine($"{number} is even.");
}
else
{
    Console.WriteLine($"{number} is odd.");
}
```

Output: `7 is odd.`

### Positive/Negative

```csharp
int number = -5;

if (number >= 0)
{
    Console.WriteLine("Positive number");
}
else
{
    Console.WriteLine("Negative number");
}
```

Output: `Negative number`

### Budget Check

```csharp
double productPrice = 1500;
double myBudget = 1200;

if (productPrice <= myBudget)
{
    Console.WriteLine("✅ You can buy this!");
}
else
{
    double shortage = productPrice - myBudget;
    Console.WriteLine($"❌ You need {shortage} tk more.");
}
```

Output: `❌ You need 300 tk more.`

---

## else if - একাধিক শর্ত

কখনো কখনো দুইটার বেশি option থাকে। তখন else if use করো।

### Syntax

```csharp
if (condition1)
{
    // condition1 true হলে
}
else if (condition2)
{
    // condition1 false, condition2 true হলে
}
else if (condition3)
{
    // উপরের দুইটাই false, condition3 true হলে
}
else
{
    // সব false হলে
}
```

### Grade Calculator

এটা সবচেয়ে classic example:

```csharp
int marks = 75;

if (marks >= 80)
{
    Console.WriteLine("Grade: A+");
}
else if (marks >= 70)
{
    Console.WriteLine("Grade: A");
}
else if (marks >= 60)
{
    Console.WriteLine("Grade: B");
}
else if (marks >= 50)
{
    Console.WriteLine("Grade: C");
}
else if (marks >= 40)
{
    Console.WriteLine("Grade: D");
}
else if (marks >= 33)
{
    Console.WriteLine("Grade: E");
}
else
{
    Console.WriteLine("Grade: F (Fail)");
}
```

marks = 75, তাই:
- 75 >= 80? No
- 75 >= 70? Yes! → "Grade: A"

বাকিগুলো check ই করবে না। একটা match হলে বের হয়ে যায়।

### Temperature Check

```csharp
double temp = 32;

if (temp >= 40)
{
    Console.WriteLine("🔥 Extreme heat! Stay indoors.");
}
else if (temp >= 30)
{
    Console.WriteLine("☀️ Hot day. Stay hydrated.");
}
else if (temp >= 20)
{
    Console.WriteLine("😊 Pleasant weather. Enjoy!");
}
else if (temp >= 10)
{
    Console.WriteLine("🧥 Cool. Wear a jacket.");
}
else
{
    Console.WriteLine("❄️ Cold! Bundle up.");
}
```

Output: `☀️ Hot day. Stay hydrated.`

### Age Category

```csharp
int age = 25;

if (age < 2)
{
    Console.WriteLine("👶 Infant");
}
else if (age < 13)
{
    Console.WriteLine("🧒 Child");
}
else if (age < 20)
{
    Console.WriteLine("🧑 Teenager");
}
else if (age < 60)
{
    Console.WriteLine("👨 Adult");
}
else
{
    Console.WriteLine("👴 Senior Citizen");
}
```

Output: `👨 Adult`

### Traffic Light

```csharp
string light = "yellow";

if (light == "red")
{
    Console.WriteLine("🔴 STOP!");
}
else if (light == "yellow")
{
    Console.WriteLine("🟡 SLOW DOWN!");
}
else if (light == "green")
{
    Console.WriteLine("🟢 GO!");
}
else
{
    Console.WriteLine("⚠️ Invalid light color!");
}
```

Output: `🟡 SLOW DOWN!`

### BMI Calculator

```csharp
double weight = 70;   // kg
double height = 1.75; // meter

double bmi = weight / (height * height);

Console.WriteLine($"Your BMI: {bmi:F1}");

if (bmi < 18.5)
{
    Console.WriteLine("Underweight");
}
else if (bmi < 25)
{
    Console.WriteLine("Normal weight ✅");
}
else if (bmi < 30)
{
    Console.WriteLine("Overweight");
}
else
{
    Console.WriteLine("Obese");
}
```

Output:
```
Your BMI: 22.9
Normal weight ✅
```

---

## Nested if - if এর ভিতরে if

কখনো কখনো একটা condition true হলে আরেকটা condition check করতে হয়।

### Login + Permission

প্রথমে login check, তারপর admin কিনা check:

```csharp
bool isLoggedIn = true;
bool isAdmin = true;

if (isLoggedIn)
{
    Console.WriteLine("✅ Login successful!");
    
    if (isAdmin)
    {
        Console.WriteLine("👑 Welcome, Admin! You have full access.");
    }
    else
    {
        Console.WriteLine("👤 Welcome, User! Limited access.");
    }
}
else
{
    Console.WriteLine("❌ Please login first.");
}
```

Output:
```
✅ Login successful!
👑 Welcome, Admin! You have full access.
```

### ATM Withdrawal

প্রথমে PIN check, তারপর balance check:

```csharp
int correctPIN = 1234;
int enteredPIN = 1234;
double balance = 5000;
double withdrawAmount = 2000;

if (enteredPIN == correctPIN)
{
    Console.WriteLine("✅ PIN verified.");
    
    if (withdrawAmount <= balance)
    {
        balance = balance - withdrawAmount;
        Console.WriteLine($"💵 Withdrawn: {withdrawAmount} tk");
        Console.WriteLine($"📊 New balance: {balance} tk");
    }
    else
    {
        Console.WriteLine("❌ Insufficient balance!");
    }
}
else
{
    Console.WriteLine("❌ Wrong PIN!");
}
```

Output:
```
✅ PIN verified.
💵 Withdrawn: 2000 tk
📊 New balance: 3000 tk
```

### Ticket Booking

Age check করে price আর seat availability check:

```csharp
int age = 25;
int availableSeats = 5;

if (availableSeats > 0)
{
    Console.WriteLine("✅ Seats available!");
    
    if (age < 12)
    {
        Console.WriteLine("🎫 Child ticket: 150 tk");
    }
    else if (age >= 60)
    {
        Console.WriteLine("🎫 Senior ticket: 200 tk");
    }
    else
    {
        Console.WriteLine("🎫 Adult ticket: 300 tk");
    }
}
else
{
    Console.WriteLine("❌ Sorry, no seats available!");
}
```

---

## Ternary Operator (? :) - Shortcut if-else

Simple if-else কে এক line এ লেখার shortcut।

### Syntax

```csharp
variable = (condition) ? valueIfTrue : valueIfFalse;
```

### Basic Example

এই if-else:

```csharp
int age = 20;
string status;

if (age >= 18)
{
    status = "Adult";
}
else
{
    status = "Minor";
}

Console.WriteLine(status);
```

Ternary দিয়ে এক line এ:

```csharp
int age = 20;

string status = (age >= 18) ? "Adult" : "Minor";

Console.WriteLine(status);  // Adult
```

অনেক ছোট হয়ে গেলো!

### আরো Examples

**Pass/Fail:**

```csharp
int marks = 45;

string result = (marks >= 33) ? "Pass" : "Fail";

Console.WriteLine(result);  // Pass
```

**Even/Odd:**

```csharp
int number = 7;

string type = (number % 2 == 0) ? "Even" : "Odd";

Console.WriteLine($"{number} is {type}");  // 7 is Odd
```

**Discount:**

```csharp
bool isPremium = true;

int discount = isPremium ? 20 : 5;

Console.WriteLine($"Your discount: {discount}%");  // 20%
```

**Max of Two:**

```csharp
int a = 10;
int b = 25;

int max = (a > b) ? a : b;

Console.WriteLine($"Maximum: {max}");  // 25
```

**Greeting:**

```csharp
int hour = 14;

string greeting = (hour < 12) ? "Good Morning!" : "Good Afternoon!";

Console.WriteLine(greeting);  // Good Afternoon!
```

### Console.WriteLine এর ভিতরেও ব্যবহার করা যায়

```csharp
int stock = 5;

Console.WriteLine(stock > 0 ? "In Stock ✅" : "Out of Stock ❌");
```

```csharp
bool isOnline = true;

Console.WriteLine($"Status: {(isOnline ? "🟢 Online" : "🔴 Offline")}");
```

### কখন Ternary Use করবে?

✅ **Use করো যখন:**
- Simple if-else (একটা value assign করা)
- Code readable থাকে

❌ **Use করো না যখন:**
- Complex logic আছে
- Multiple statements আছে
- Nested conditions আছে

```csharp
// ❌ এভাবে করো না - পড়া কঠিন
string result = (a > b) ? (a > c ? "A wins" : "C wins") : (b > c ? "B wins" : "C wins");

// ✅ এভাবে করো - clear
string result;
if (a > b && a > c)
    result = "A wins";
else if (b > c)
    result = "B wins";
else
    result = "C wins";
```

---

## Complete Example 1: Student Result System

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║      📝 STUDENT RESULT SYSTEM         ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

Console.Write("Enter student name: ");
string name = Console.ReadLine();

Console.Write("Enter marks (0-100): ");
int marks = int.Parse(Console.ReadLine());

// Grade calculation
string grade;

if (marks >= 80)
{
    grade = "A+";
}
else if (marks >= 70)
{
    grade = "A";
}
else if (marks >= 60)
{
    grade = "B";
}
else if (marks >= 50)
{
    grade = "C";
}
else if (marks >= 40)
{
    grade = "D";
}
else if (marks >= 33)
{
    grade = "E";
}
else
{
    grade = "F";
}

// Pass/Fail
string result = (marks >= 33) ? "PASSED ✅" : "FAILED ❌";

// Display result
Console.WriteLine("\n╔═══════════════════════════════════════╗");
Console.WriteLine("║            📊 RESULT                   ║");
Console.WriteLine("╠═══════════════════════════════════════╣");
Console.WriteLine($"║  Name:   {name,-28} ║");
Console.WriteLine($"║  Marks:  {marks,-28} ║");
Console.WriteLine($"║  Grade:  {grade,-28} ║");
Console.WriteLine($"║  Status: {result,-28} ║");
Console.WriteLine("╚═══════════════════════════════════════╝");
```

---

## Complete Example 2: Simple Login System

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║         🔐 LOGIN SYSTEM               ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

string correctUsername = "admin";
string correctPassword = "1234";
int maxAttempts = 3;
int attempts = 0;
bool loggedIn = false;

while (attempts < maxAttempts && !loggedIn)
{
    attempts = attempts + 1;
    Console.WriteLine($"Attempt {attempts} of {maxAttempts}");
    
    Console.Write("Username: ");
    string username = Console.ReadLine();
    
    Console.Write("Password: ");
    string password = Console.ReadLine();
    
    if (username == correctUsername && password == correctPassword)
    {
        loggedIn = true;
        Console.WriteLine("\n✅ Login successful!");
        Console.WriteLine("Welcome to the system, Admin!");
    }
    else
    {
        Console.WriteLine("\n❌ Invalid credentials!");
        
        if (attempts < maxAttempts)
        {
            int remaining = maxAttempts - attempts;
            Console.WriteLine($"You have {remaining} attempts left.\n");
        }
    }
}

if (!loggedIn)
{
    Console.WriteLine("\n🚫 Account locked! Too many failed attempts.");
}
```

---

## Complete Example 3: Number Analyzer

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║       🔢 NUMBER ANALYZER              ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

Console.Write("Enter a number: ");
int number = int.Parse(Console.ReadLine());

Console.WriteLine($"\nAnalyzing {number}...\n");

// Positive, Negative, or Zero
if (number > 0)
{
    Console.WriteLine("➕ This is a POSITIVE number.");
}
else if (number < 0)
{
    Console.WriteLine("➖ This is a NEGATIVE number.");
}
else
{
    Console.WriteLine("0️⃣ This is ZERO.");
}

// Even or Odd (only for non-zero)
if (number != 0)
{
    if (number % 2 == 0)
    {
        Console.WriteLine("🔢 This is an EVEN number.");
    }
    else
    {
        Console.WriteLine("🔢 This is an ODD number.");
    }
}

// Divisibility checks
if (number % 5 == 0)
{
    Console.WriteLine("5️⃣ Divisible by 5.");
}

if (number % 10 == 0)
{
    Console.WriteLine("🔟 Divisible by 10.");
}

// Size category
if (number >= -10 && number <= 10)
{
    Console.WriteLine("📏 This is a SMALL number (-10 to 10).");
}
else if (number >= -100 && number <= 100)
{
    Console.WriteLine("📏 This is a MEDIUM number (-100 to 100).");
}
else
{
    Console.WriteLine("📏 This is a LARGE number.");
}
```

---

## Common Mistakes

### Mistake 1: = আর == গুলিয়ে ফেলা

```csharp
int x = 5;

// ❌ Wrong! এটা assignment, comparison না
if (x = 10)  // Error!

// ✅ Correct
if (x == 10)
```

### Mistake 2: Semicolon দিয়ে দেওয়া

```csharp
// ❌ Wrong! if এর পরে ; দিলে কাজ করবে না
if (age >= 18);
{
    Console.WriteLine("Adult");
}

// ✅ Correct
if (age >= 18)
{
    Console.WriteLine("Adult");
}
```

### Mistake 3: else if এর order ভুল

```csharp
int marks = 85;

// ❌ Wrong order! প্রথম condition এ ই match হয়ে যাবে
if (marks >= 33)
{
    Console.WriteLine("Grade: E");
}
else if (marks >= 80)
{
    Console.WriteLine("Grade: A+");  // এটা কখনোই চলবে না!
}

// ✅ Correct order - বড় থেকে ছোট
if (marks >= 80)
{
    Console.WriteLine("Grade: A+");
}
else if (marks >= 33)
{
    Console.WriteLine("Grade: E");
}
```

### Mistake 4: Unnecessary comparison with bool

```csharp
bool isLoggedIn = true;

// ❌ Unnecessary
if (isLoggedIn == true)

// ✅ Clean
if (isLoggedIn)

// ❌ Unnecessary  
if (isLoggedIn == false)

// ✅ Clean
if (!isLoggedIn)
```

---

## Summary

আজকে শিখলে:

| Statement | কাজ |
|-----------|-----|
| if | condition true হলে code চালাও |
| else | condition false হলে code চালাও |
| else if | multiple conditions check করো |
| nested if | if এর ভিতরে আরেক if |
| ternary (? :) | short if-else for simple cases |

**মনে রাখো:**
- if এর পরে ; দিও না
- else if এ order matters (বড় থেকে ছোট)
- bool variable এ == true লেখার দরকার নেই
- Complex logic এ ternary avoid করো

**Next Part এ:** switch statement শিখবো - অনেক options থেকে একটা select করতে।

---

*CPS Academy - Learn. Code. Grow.*
