---
title: 'Part 26: String Methods'
date: '2026-01-20'
excerpt: 'Part 26: String Methods - built-in string methods শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - strings
  - methods
  - tutorial
draft: false
---

# Part 26: String Methods (Built-in সুবিধা)

ধরো তুমি একটা **Registration Form** বানাচ্ছো।

User নাম লিখলো: `"  rAHiM  "`

কিন্তু তুমি চাও Database এ save হোক: `"Rahim"`

**সমস্যা কী কী?**
- শুরুতে আর শেষে extra **spaces** আছে
- Case ঠিক নেই - **rAHiM** হওয়া উচিত **Rahim**

**এগুলো fix করবে কীভাবে?**

নিজে loop চালিয়ে একটা একটা character check করবে? 😫

**না!** C# এ String এর জন্য অনেক **ready-made methods** আছে!

আজকে সেগুলো শিখবো।

---

## String কী? (Quick Recap)

String হলো **characters এর collection**।

```csharp
string name = "Rahim";
```

এটাকে ভাবতে পারো এভাবে:

```
name = "Rahim"

┌─────┬─────┬─────┬─────┬─────┐
│  R  │  a  │  h  │  i  │  m  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4    ← Index
```

প্রতিটা character এর একটা **index** আছে, 0 থেকে শুরু।

---

## String এর একটা Important বৈশিষ্ট্য: Immutable

**Immutable** মানে = **পরিবর্তন করা যায় না**।

```csharp
string name = "Rahim";
name.ToUpper();  // এটা কি name কে change করবে?

Console.WriteLine(name);  // Output: Rahim (same আছে!)
```

**কী হলো?**

`ToUpper()` original string কে change করে **না**। বরং **নতুন string return** করে!

```csharp
string name = "Rahim";
string upperName = name.ToUpper();  // নতুন string এ রাখো

Console.WriteLine(name);       // Rahim (original same)
Console.WriteLine(upperName);  // RAHIM (নতুন string)
```

**মনে রাখো:** String methods original কে change করে না, নতুন string return করে!

---

## String Properties

### Length - কত Character আছে

```csharp
string name = "Rahim";
int length = name.Length;

Console.WriteLine($"'{name}' has {length} characters");
```

Output:
```
'Rahim' has 5 characters
```

**আরো examples:**

```csharp
Console.WriteLine("Hello".Length);        // 5
Console.WriteLine("".Length);             // 0 (empty string)
Console.WriteLine("Hello World".Length);  // 11 (space ও count হয়)
Console.WriteLine("  Hi  ".Length);       // 6 (spaces count হয়)
```

---

### [index] - Specific Character Access

```csharp
string name = "Rahim";

Console.WriteLine(name[0]);  // R (প্রথম character)
Console.WriteLine(name[1]);  // a (দ্বিতীয় character)
Console.WriteLine(name[4]);  // m (শেষ character)
```

**Visual:**

```
name = "Rahim"
        ↓
name[0] = 'R'
name[1] = 'a'
name[2] = 'h'
name[3] = 'i'
name[4] = 'm'
```

**শেষ character access করা:**

```csharp
string name = "Rahim";

// শেষ character
char lastChar = name[name.Length - 1];
Console.WriteLine($"Last character: {lastChar}");  // m
```

---

## Case Changing Methods

### ToUpper() - সব UPPERCASE

সব characters কে বড় হাতের করে দেয়।

```csharp
string name = "Rahim";
string upper = name.ToUpper();

Console.WriteLine(upper);  // RAHIM
```

**আরো examples:**

```csharp
Console.WriteLine("hello".ToUpper());         // HELLO
Console.WriteLine("Hello World".ToUpper());   // HELLO WORLD
Console.WriteLine("rAhIm".ToUpper());         // RAHIM
Console.WriteLine("123abc".ToUpper());        // 123ABC (numbers same থাকে)
```

---

### ToLower() - সব lowercase

সব characters কে ছোট হাতের করে দেয়।

```csharp
string name = "RAHIM";
string lower = name.ToLower();

Console.WriteLine(lower);  // rahim
```

**আরো examples:**

```csharp
Console.WriteLine("HELLO".ToLower());         // hello
Console.WriteLine("Hello World".ToLower());   // hello world
Console.WriteLine("rAhIm".ToLower());         // rahim
```

---

### Real Use: Case-Insensitive Comparison

User input check করার সময় case ignore করতে চাইলে:

```csharp
Console.Write("Enter yes or no: ");
string input = Console.ReadLine();

// ❌ এভাবে করলে "YES", "Yes", "yEs" কাজ করবে না
if (input == "yes")
{
    Console.WriteLine("You said yes!");
}

// ✅ ToLower() দিয়ে করলে সব case কাজ করবে
if (input.ToLower() == "yes")
{
    Console.WriteLine("You said yes!");
}
```

**এখন "yes", "YES", "Yes", "yEs" সবই কাজ করবে!**

---

### Real Example: Username Validation

```csharp
Console.WriteLine("🔐 USERNAME CHECKER\n");

string correctUsername = "admin";

Console.Write("Enter username: ");
string input = Console.ReadLine();

// Case-insensitive comparison
if (input.ToLower() == correctUsername.ToLower())
{
    Console.WriteLine("✅ Access granted!");
}
else
{
    Console.WriteLine("❌ Invalid username!");
}
```

**Run 1:**
```
Enter username: admin
✅ Access granted!
```

**Run 2:**
```
Enter username: ADMIN
✅ Access granted!
```

**Run 3:**
```
Enter username: AdMiN
✅ Access granted!
```

---

## Whitespace Methods

### Trim() - দুই পাশের Space সরাও

শুরু এবং শেষের spaces/whitespace সরিয়ে দেয়।

```csharp
string input = "   Rahim   ";

Console.WriteLine($"Before: '{input}'");
Console.WriteLine($"Length: {input.Length}");

string trimmed = input.Trim();

Console.WriteLine($"After:  '{trimmed}'");
Console.WriteLine($"Length: {trimmed.Length}");
```

Output:
```
Before: '   Rahim   '
Length: 11
After:  'Rahim'
Length: 5
```

**Visual:**

```
Before: "   Rahim   "
         ↓↓↓      ↓↓↓
         spaces   spaces

After Trim(): "Rahim"
              (spaces gone!)
```

---

### TrimStart() - শুধু শুরুর Space সরাও

```csharp
string input = "   Rahim   ";

string trimStart = input.TrimStart();

Console.WriteLine($"Original:   '{input}'");
Console.WriteLine($"TrimStart:  '{trimStart}'");
```

Output:
```
Original:   '   Rahim   '
TrimStart:  'Rahim   '
```

শুধু **শুরুর** spaces গেছে, **শেষের** spaces আছে।

---

### TrimEnd() - শুধু শেষের Space সরাও

```csharp
string input = "   Rahim   ";

string trimEnd = input.TrimEnd();

Console.WriteLine($"Original:  '{input}'");
Console.WriteLine($"TrimEnd:   '{trimEnd}'");
```

Output:
```
Original:  '   Rahim   '
TrimEnd:   '   Rahim'
```

শুধু **শেষের** spaces গেছে, **শুরুর** spaces আছে।

---

### Comparison Table:

| Method | কী করে | Example |
|--------|-------|---------|
| `Trim()` | দুই পাশের space সরায় | `"  Hi  ".Trim()` → `"Hi"` |
| `TrimStart()` | শুরুর space সরায় | `"  Hi  ".TrimStart()` → `"Hi  "` |
| `TrimEnd()` | শেষের space সরায় | `"  Hi  ".TrimEnd()` → `"  Hi"` |

---

### Real Example: Form Input Cleaning

```csharp
Console.WriteLine("📝 REGISTRATION FORM\n");

Console.Write("Enter your name: ");
string rawName = Console.ReadLine();  // User might type "  Rahim  "

// Clean the input
string cleanName = rawName.Trim();

Console.WriteLine($"\nRaw input:    '{rawName}'");
Console.WriteLine($"Clean input:  '{cleanName}'");
Console.WriteLine($"\n✅ Saved as: {cleanName}");
```

**Run:**
```
Enter your name:    Rahim   

Raw input:    '   Rahim   '
Clean input:  'Rahim'

✅ Saved as: Rahim
```

---

## Search Methods

### Contains() - আছে কিনা

String এর মধ্যে কোনো text আছে কিনা check করে। Return করে **true** বা **false**।

```csharp
string sentence = "I love programming in C#";

Console.WriteLine(sentence.Contains("love"));         // True
Console.WriteLine(sentence.Contains("programming"));  // True
Console.WriteLine(sentence.Contains("C#"));           // True
Console.WriteLine(sentence.Contains("Java"));         // False
Console.WriteLine(sentence.Contains("LOVE"));         // False (case-sensitive!)
```

**⚠️ Contains() case-sensitive!**

```csharp
string text = "Hello World";

Console.WriteLine(text.Contains("World"));  // True
Console.WriteLine(text.Contains("world"));  // False (w ছোট)
Console.WriteLine(text.Contains("WORLD"));  // False (সব বড়)

// Case-insensitive করতে চাইলে:
Console.WriteLine(text.ToLower().Contains("world"));  // True
```

---

### Real Example: Comment Filter

```csharp
Console.WriteLine("🔍 COMMENT FILTER\n");

string[] comments = {
    "This product is great!",
    "Worst purchase ever, totally bad",
    "Amazing quality, love it",
    "Bad customer service",
    "Would recommend to everyone"
};

string[] badWords = { "bad", "worst" };

Console.WriteLine("Checking comments for bad words...\n");

foreach (string comment in comments)
{
    bool hasBadWord = false;
    
    foreach (string badWord in badWords)
    {
        if (comment.ToLower().Contains(badWord))
        {
            hasBadWord = true;
            break;
        }
    }
    
    if (hasBadWord)
    {
        Console.WriteLine($"❌ BLOCKED: {comment}");
    }
    else
    {
        Console.WriteLine($"✅ APPROVED: {comment}");
    }
}
```

Output:
```
🔍 COMMENT FILTER

Checking comments for bad words...

✅ APPROVED: This product is great!
❌ BLOCKED: Worst purchase ever, totally bad
✅ APPROVED: Amazing quality, love it
❌ BLOCKED: Bad customer service
✅ APPROVED: Would recommend to everyone
```

---

### StartsWith() - দিয়ে শুরু কিনা

String কোনো specific text দিয়ে **শুরু হয়েছে কিনা** check করে।

```csharp
string filename = "report_2024.pdf";

Console.WriteLine(filename.StartsWith("report"));   // True
Console.WriteLine(filename.StartsWith("Report"));   // False (case-sensitive)
Console.WriteLine(filename.StartsWith("data"));     // False
Console.WriteLine(filename.StartsWith("rep"));      // True
```

---

### EndsWith() - দিয়ে শেষ কিনা

String কোনো specific text দিয়ে **শেষ হয়েছে কিনা** check করে।

```csharp
string filename = "report_2024.pdf";

Console.WriteLine(filename.EndsWith(".pdf"));   // True
Console.WriteLine(filename.EndsWith(".PDF"));   // False (case-sensitive)
Console.WriteLine(filename.EndsWith(".txt"));   // False
Console.WriteLine(filename.EndsWith("2024.pdf")); // True
```

---

### Real Example: File Type Checker

```csharp
Console.WriteLine("📁 FILE TYPE CHECKER\n");

string[] files = {
    "document.pdf",
    "photo.jpg",
    "music.mp3",
    "video.mp4",
    "data.xlsx",
    "script.cs",
    "readme.txt"
};

foreach (string file in files)
{
    string icon = "📄";  // Default
    string type = "Unknown";
    
    if (file.EndsWith(".pdf"))
    {
        icon = "📕";
        type = "PDF Document";
    }
    else if (file.EndsWith(".jpg") || file.EndsWith(".png"))
    {
        icon = "🖼️";
        type = "Image";
    }
    else if (file.EndsWith(".mp3"))
    {
        icon = "🎵";
        type = "Audio";
    }
    else if (file.EndsWith(".mp4"))
    {
        icon = "🎬";
        type = "Video";
    }
    else if (file.EndsWith(".xlsx") || file.EndsWith(".csv"))
    {
        icon = "📊";
        type = "Spreadsheet";
    }
    else if (file.EndsWith(".cs"))
    {
        icon = "💻";
        type = "C# Source";
    }
    else if (file.EndsWith(".txt"))
    {
        icon = "📝";
        type = "Text File";
    }
    
    Console.WriteLine($"{icon} {file,-20} → {type}");
}
```

Output:
```
📁 FILE TYPE CHECKER

📕 document.pdf         → PDF Document
🖼️ photo.jpg            → Image
🎵 music.mp3            → Audio
🎬 video.mp4            → Video
📊 data.xlsx            → Spreadsheet
💻 script.cs            → C# Source
📝 readme.txt           → Text File
```

---

### IndexOf() - কোথায় আছে

কোনো text **কোন position এ আছে** সেটা বের করে।

- পেলে → index number return করে
- না পেলে → **-1** return করে

```csharp
string sentence = "I love C# programming";

Console.WriteLine(sentence.IndexOf("love"));     // 2
Console.WriteLine(sentence.IndexOf("C#"));       // 7
Console.WriteLine(sentence.IndexOf("programming")); // 10
Console.WriteLine(sentence.IndexOf("Java"));     // -1 (not found)
```

**Visual:**

```
"I love C# programming"
 ↑
 0123456789...

IndexOf("love") = 2
         ↓↓↓↓
"I love C# programming"
   2345

IndexOf("C#") = 7
           ↓↓
"I love C# programming"
        78
```

---

### LastIndexOf() - শেষ কোথায় আছে

যদি একই text একাধিকবার থাকে, **শেষেরটার position** বের করে।

```csharp
string text = "apple banana apple cherry apple";

Console.WriteLine(text.IndexOf("apple"));       // 0 (প্রথম apple)
Console.WriteLine(text.LastIndexOf("apple"));   // 26 (শেষ apple)
```

**Visual:**

```
"apple banana apple cherry apple"
 ↑            ↑             ↑
 0           13            26

IndexOf("apple") = 0 (প্রথমটা)
LastIndexOf("apple") = 26 (শেষেরটা)
```

---

### Real Example: Email Domain Finder

```csharp
Console.WriteLine("📧 EMAIL ANALYZER\n");

string[] emails = {
    "rahim@gmail.com",
    "karim@yahoo.com",
    "jabbar@company.org",
    "salam@student.edu.bd"
};

foreach (string email in emails)
{
    // @ এর position খুঁজি
    int atIndex = email.IndexOf("@");
    
    if (atIndex != -1)
    {
        string username = email.Substring(0, atIndex);
        string domain = email.Substring(atIndex + 1);
        
        Console.WriteLine($"Email: {email}");
        Console.WriteLine($"   Username: {username}");
        Console.WriteLine($"   Domain:   {domain}");
        Console.WriteLine();
    }
}
```

Output:
```
📧 EMAIL ANALYZER

Email: rahim@gmail.com
   Username: rahim
   Domain:   gmail.com

Email: karim@yahoo.com
   Username: karim
   Domain:   yahoo.com

Email: jabbar@company.org
   Username: jabbar
   Domain:   company.org

Email: salam@student.edu.bd
   Username: salam
   Domain:   student.edu.bd
```

---

## Substring Methods

### Substring(startIndex) - কাটা শুরু করো

একটা **নির্দিষ্ট position থেকে শেষ পর্যন্ত** কেটে নাও।

```csharp
string text = "Hello World";

string result = text.Substring(6);  // Index 6 থেকে শেষ পর্যন্ত

Console.WriteLine(result);  // World
```

**Visual:**

```
"Hello World"
 01234567891011
       ↑
       6 (এখান থেকে শেষ পর্যন্ত)

Substring(6) = "World"
```

---

### Substring(startIndex, length) - কত Character নাও

একটা **নির্দিষ্ট position থেকে নির্দিষ্ট সংখ্যক** character নাও।

```csharp
string text = "Hello World";

string result = text.Substring(0, 5);  // Index 0 থেকে 5 টা character

Console.WriteLine(result);  // Hello
```

**Visual:**

```
"Hello World"
 01234567891011
 ↑───↑
 0   5 characters

Substring(0, 5) = "Hello"
```

---

### আরো Examples:

```csharp
string text = "Programming is fun";

Console.WriteLine(text.Substring(0, 11));   // Programming
Console.WriteLine(text.Substring(12, 2));   // is
Console.WriteLine(text.Substring(15));      // fun
Console.WriteLine(text.Substring(0, 4));    // Prog
```

---

### Real Example: Date Parser

```csharp
Console.WriteLine("📅 DATE PARSER\n");

string date = "2024-01-15";  // YYYY-MM-DD format

// Parse করি
string year = date.Substring(0, 4);    // প্রথম 4 characters
string month = date.Substring(5, 2);   // Index 5 থেকে 2 characters
string day = date.Substring(8, 2);     // Index 8 থেকে 2 characters

Console.WriteLine($"Full Date: {date}");
Console.WriteLine($"Year:  {year}");
Console.WriteLine($"Month: {month}");
Console.WriteLine($"Day:   {day}");

// Formatted output
string[] monthNames = { "", "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December" };

int monthNum = int.Parse(month);
Console.WriteLine($"\nFormatted: {monthNames[monthNum]} {day}, {year}");
```

Output:
```
📅 DATE PARSER

Full Date: 2024-01-15
Year:  2024
Month: 01
Day:   15

Formatted: January 15, 2024
```

---

## Replace Methods

### Replace(old, new) - বদলে দাও

একটা text কে অন্য text দিয়ে **বদলে দাও**।

```csharp
string text = "I love Java";

string result = text.Replace("Java", "C#");

Console.WriteLine(result);  // I love C#
```

---

### সব occurrences বদলায়

Replace **সব** occurrences বদলায়, শুধু প্রথমটা না:

```csharp
string text = "apple is good, apple is healthy, I love apple";

string result = text.Replace("apple", "mango");

Console.WriteLine(result);
// mango is good, mango is healthy, I love mango
```

তিনটা "apple" ই "mango" হয়ে গেছে!

---

### Character Replace

শুধু text না, character ও replace করা যায়:

```csharp
string text = "Hello World";

string result = text.Replace('o', '0');  // o কে 0 দিয়ে

Console.WriteLine(result);  // Hell0 W0rld
```

---

### Real Example: Text Censor

```csharp
Console.WriteLine("🔒 TEXT CENSOR\n");

string text = "This is a bad word. That damn thing is stupid.";
string[] badWords = { "bad", "damn", "stupid" };

Console.WriteLine($"Original: {text}\n");

string censored = text;

foreach (string word in badWords)
{
    // Bad word কে **** দিয়ে replace করো
    string replacement = new string('*', word.Length);
    censored = censored.Replace(word, replacement);
}

Console.WriteLine($"Censored: {censored}");
```

Output:
```
🔒 TEXT CENSOR

Original: This is a bad word. That damn thing is stupid.

Censored: This is a *** word. That **** thing is ******.
```

---

### Real Example: Phone Number Formatter

```csharp
Console.WriteLine("📱 PHONE NUMBER FORMATTER\n");

string[] rawNumbers = {
    "01712345678",
    "01812 345 678",
    "019-1234-5678",
    "+880 171 234 5678"
};

foreach (string raw in rawNumbers)
{
    // সব unwanted characters সরাই
    string clean = raw.Replace(" ", "")
                      .Replace("-", "")
                      .Replace("+880", "0");
    
    Console.WriteLine($"Raw:   {raw}");
    Console.WriteLine($"Clean: {clean}");
    Console.WriteLine();
}
```

Output:
```
📱 PHONE NUMBER FORMATTER

Raw:   01712345678
Clean: 01712345678

Raw:   01812 345 678
Clean: 01812345678

Raw:   019-1234-5678
Clean: 01912345678

Raw:   +880 171 234 5678
Clean: 01712345678
```

---

## Split and Join

### Split() - ভেঙে Array বানাও

একটা string কে **ভেঙে array** বানায় কোনো separator দিয়ে।

```csharp
string sentence = "apple,banana,mango,orange";

string[] fruits = sentence.Split(',');

Console.WriteLine($"Total fruits: {fruits.Length}");

foreach (string fruit in fruits)
{
    Console.WriteLine($"  - {fruit}");
}
```

Output:
```
Total fruits: 4
  - apple
  - banana
  - mango
  - orange
```

**Visual:**

```
"apple,banana,mango,orange"
      ↑      ↑     ↑
   Split by comma

Result Array:
┌─────────┬─────────┬─────────┬─────────┐
│  apple  │ banana  │  mango  │ orange  │
└─────────┴─────────┴─────────┴─────────┘
     0         1         2         3
```

---

### Different Separators

```csharp
// Space দিয়ে split
string sentence = "Hello World How Are You";
string[] words = sentence.Split(' ');  // 5 টা word

// Dash দিয়ে split
string date = "2024-01-15";
string[] parts = date.Split('-');  // ["2024", "01", "15"]

// Multiple characters দিয়ে split
string data = "apple;banana|mango,orange";
string[] items = data.Split(';', '|', ',');  // 4 টা item
```

---

### Real Example: CSV Parser

```csharp
Console.WriteLine("📊 CSV DATA PARSER\n");

string csvData = "Rahim,25,Dhaka,Engineer";

string[] fields = csvData.Split(',');

Console.WriteLine("Parsed Data:");
Console.WriteLine($"  Name:       {fields[0]}");
Console.WriteLine($"  Age:        {fields[1]}");
Console.WriteLine($"  City:       {fields[2]}");
Console.WriteLine($"  Profession: {fields[3]}");
```

Output:
```
📊 CSV DATA PARSER

Parsed Data:
  Name:       Rahim
  Age:        25
  City:       Dhaka
  Profession: Engineer
```

---

### string.Join() - Array জোড়া দাও

Split এর উল্টা - array কে জোড়া দিয়ে **একটা string** বানায়।

```csharp
string[] fruits = { "apple", "banana", "mango", "orange" };

string result = string.Join(", ", fruits);

Console.WriteLine(result);  // apple, banana, mango, orange
```

---

### Different Separators

```csharp
string[] words = { "Hello", "World", "How", "Are", "You" };

Console.WriteLine(string.Join(" ", words));    // Hello World How Are You
Console.WriteLine(string.Join("-", words));    // Hello-World-How-Are-You
Console.WriteLine(string.Join(" | ", words));  // Hello | World | How | Are | You
Console.WriteLine(string.Join("", words));     // HelloWorldHowAreYou
```

---

### Real Example: Name Formatter

```csharp
Console.WriteLine("👤 NAME FORMATTER\n");

string fullName = "  mohammad   rahim   uddin  ";

// Step 1: Trim করো
string trimmed = fullName.Trim();
Console.WriteLine($"After Trim: '{trimmed}'");

// Step 2: Split by space
string[] parts = trimmed.Split(' ');
Console.WriteLine($"Parts found: {parts.Length}");

// Step 3: Empty parts remove করো এবং capitalize করো
string[] cleanParts = new string[parts.Length];
int count = 0;

foreach (string part in parts)
{
    if (part.Length > 0)  // Empty না হলে
    {
        // First letter capital, rest lowercase
        string capitalized = char.ToUpper(part[0]) + part.Substring(1).ToLower();
        cleanParts[count] = capitalized;
        count++;
    }
}

// Step 4: Join back
string[] finalParts = new string[count];
for (int i = 0; i < count; i++)
{
    finalParts[i] = cleanParts[i];
}

string formattedName = string.Join(" ", finalParts);

Console.WriteLine($"\nFormatted Name: '{formattedName}'");
```

Output:
```
👤 NAME FORMATTER

After Trim: 'mohammad   rahim   uddin'
Parts found: 5

Formatted Name: 'Mohammad Rahim Uddin'
```

---

## Other Useful Methods

### Insert() - মাঝে ঢোকাও

নির্দিষ্ট position এ text ঢোকাও।

```csharp
string text = "Hello World";

string result = text.Insert(6, "Beautiful ");

Console.WriteLine(result);  // Hello Beautiful World
```

**Visual:**

```
"Hello World"
       ↑
       6 (এখানে insert করো)

Insert(6, "Beautiful ")

Result: "Hello Beautiful World"
```

---

### Remove() - মুছে দাও

নির্দিষ্ট position থেকে characters মুছে দাও।

```csharp
string text = "Hello World";

// Index 5 থেকে শেষ পর্যন্ত remove
string result1 = text.Remove(5);
Console.WriteLine(result1);  // Hello

// Index 6 থেকে 5 টা character remove
string result2 = text.Remove(6, 5);
Console.WriteLine(result2);  // Hello 
```

---

### PadLeft() এবং PadRight()

String এর বাম বা ডানে padding যোগ করো।

```csharp
string number = "42";

// বামে padding (total 5 characters)
string padLeft = number.PadLeft(5, '0');
Console.WriteLine(padLeft);  // 00042

// ডানে padding (total 5 characters)
string padRight = number.PadRight(5, '*');
Console.WriteLine(padRight);  // 42***
```

**Real Use Case:**

```csharp
// Invoice number format করা
int invoiceNum = 7;
string formatted = invoiceNum.ToString().PadLeft(5, '0');
Console.WriteLine($"Invoice #: INV-{formatted}");  // Invoice #: INV-00007
```

---

### IsNullOrEmpty() এবং IsNullOrWhiteSpace()

String null বা empty কিনা check করা।

```csharp
string str1 = null;
string str2 = "";
string str3 = "   ";
string str4 = "Hello";

// IsNullOrEmpty - null বা "" check করে
Console.WriteLine(string.IsNullOrEmpty(str1));  // True
Console.WriteLine(string.IsNullOrEmpty(str2));  // True
Console.WriteLine(string.IsNullOrEmpty(str3));  // False (spaces আছে)
Console.WriteLine(string.IsNullOrEmpty(str4));  // False

// IsNullOrWhiteSpace - null, "", বা শুধু spaces check করে
Console.WriteLine(string.IsNullOrWhiteSpace(str1));  // True
Console.WriteLine(string.IsNullOrWhiteSpace(str2));  // True
Console.WriteLine(string.IsNullOrWhiteSpace(str3));  // True (শুধু spaces)
Console.WriteLine(string.IsNullOrWhiteSpace(str4));  // False
```

---

### Real Example: Input Validation

```csharp
Console.WriteLine("📝 INPUT VALIDATION\n");

Console.Write("Enter your name: ");
string name = Console.ReadLine();

if (string.IsNullOrWhiteSpace(name))
{
    Console.WriteLine("❌ Error: Name cannot be empty!");
}
else
{
    Console.WriteLine($"✅ Hello, {name.Trim()}!");
}
```

---

## String Comparison

### == Operator

সবচেয়ে সহজ উপায়:

```csharp
string a = "Hello";
string b = "Hello";
string c = "hello";

Console.WriteLine(a == b);  // True
Console.WriteLine(a == c);  // False (case different)
```

---

### Equals() Method

```csharp
string a = "Hello";
string b = "Hello";

Console.WriteLine(a.Equals(b));  // True

// Case-insensitive comparison
Console.WriteLine(a.Equals("hello", StringComparison.OrdinalIgnoreCase));  // True
```

---

### Compare() Method

দুইটা string compare করে:
- Return **0** = equal
- Return **< 0** = first টা smaller
- Return **> 0** = first টা bigger

```csharp
Console.WriteLine(string.Compare("apple", "apple"));   // 0 (equal)
Console.WriteLine(string.Compare("apple", "banana"));  // < 0 (a < b)
Console.WriteLine(string.Compare("banana", "apple"));  // > 0 (b > a)
```

---

## String Formatting

### String Interpolation ($"")

সবচেয়ে সহজ এবং recommended উপায়:

```csharp
string name = "Rahim";
int age = 25;
double salary = 50000.50;

string message = $"Name: {name}, Age: {age}, Salary: {salary}";
Console.WriteLine(message);
// Name: Rahim, Age: 25, Salary: 50000.5

// Formatting সহ
Console.WriteLine($"Salary: {salary:F2}");      // 50000.50 (2 decimal)
Console.WriteLine($"Salary: {salary:C}");       // ৳50,000.50 (currency)
Console.WriteLine($"Percentage: {0.756:P1}");   // 75.6%
```

---

### Alignment

```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };
int[] marks = { 85, 92, 78 };

Console.WriteLine("Name       Marks");
Console.WriteLine("─────────────────");

for (int i = 0; i < names.Length; i++)
{
    // -10 মানে left align, 10 characters wide
    // 5 মানে right align, 5 characters wide
    Console.WriteLine($"{names[i],-10} {marks[i],5}");
}
```

Output:
```
Name       Marks
─────────────────
Rahim         85
Karim         92
Jabbar        78
```

---

## Real Example 1: Complete Input Cleaner

```csharp
Console.WriteLine("🧹 INPUT CLEANER UTILITY");
Console.WriteLine("══════════════════════════════════════════\n");

string rawInput = "   rAhIm   uDDin   ";

Console.WriteLine($"Raw Input:      '{rawInput}'");
Console.WriteLine($"Length:         {rawInput.Length}");
Console.WriteLine();

// Step 1: Trim
string step1 = rawInput.Trim();
Console.WriteLine($"After Trim:     '{step1}'");

// Step 2: ToLower
string step2 = step1.ToLower();
Console.WriteLine($"After ToLower:  '{step2}'");

// Step 3: Replace multiple spaces with single
while (step2.Contains("  "))
{
    step2 = step2.Replace("  ", " ");
}
Console.WriteLine($"After fixing spaces: '{step2}'");

// Step 4: Title Case (প্রতিটা word এর first letter capital)
string[] words = step2.Split(' ');
for (int i = 0; i < words.Length; i++)
{
    if (words[i].Length > 0)
    {
        words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1);
    }
}
string final = string.Join(" ", words);

Console.WriteLine($"Final Result:   '{final}'");
Console.WriteLine($"Final Length:   {final.Length}");
```

Output:
```
🧹 INPUT CLEANER UTILITY
══════════════════════════════════════════

Raw Input:      '   rAhIm   uDDin   '
Length:         19

After Trim:     'rAhIm   uDDin'
After ToLower:  'rahim   uddin'
After fixing spaces: 'rahim uddin'
Final Result:   'Rahim Uddin'
Final Length:   11
```

---

## Real Example 2: Word Counter

```csharp
Console.WriteLine("📊 WORD COUNTER");
Console.WriteLine("══════════════════════════════════════════\n");

string text = "C# is a great programming language. C# is used for web development, " +
              "game development, and mobile apps. I love C# programming!";

Console.WriteLine("Text:");
Console.WriteLine(text);
Console.WriteLine();

// Total characters
int charCount = text.Length;
int charWithoutSpaces = text.Replace(" ", "").Length;

// Word count
string[] words = text.Split(' ', '.', ',', '!');
int wordCount = 0;
foreach (string word in words)
{
    if (!string.IsNullOrWhiteSpace(word))
    {
        wordCount++;
    }
}

// Sentence count (by .)
int sentenceCount = text.Split('.').Length - 1;

// Specific word count
string searchWord = "C#";
int csharpCount = 0;
foreach (string word in words)
{
    if (word.Equals(searchWord, StringComparison.OrdinalIgnoreCase))
    {
        csharpCount++;
    }
}

Console.WriteLine("📈 Statistics:");
Console.WriteLine($"   Total Characters:      {charCount}");
Console.WriteLine($"   Characters (no space): {charWithoutSpaces}");
Console.WriteLine($"   Word Count:            {wordCount}");
Console.WriteLine($"   Sentence Count:        {sentenceCount}");
Console.WriteLine($"   '{searchWord}' appears:      {csharpCount} times");
```

Output:
```
📊 WORD COUNTER
══════════════════════════════════════════

Text:
C# is a great programming language. C# is used for web development, game development, and mobile apps. I love C# programming!

📈 Statistics:
   Total Characters:      139
   Characters (no space): 117
   Word Count:            21
   Sentence Count:        3
   'C#' appears:          3 times
```

---

## Real Example 3: Simple Search System

```csharp
Console.WriteLine("🔍 PRODUCT SEARCH SYSTEM");
Console.WriteLine("══════════════════════════════════════════\n");

string[] products = {
    "Apple iPhone 15 Pro",
    "Samsung Galaxy S24 Ultra",
    "Google Pixel 8 Pro",
    "Apple MacBook Pro M3",
    "Samsung Galaxy Tab S9",
    "Apple Watch Series 9",
    "Sony PlayStation 5",
    "Microsoft Xbox Series X"
};

Console.Write("Enter search term: ");
string searchTerm = Console.ReadLine().Trim().ToLower();

if (string.IsNullOrWhiteSpace(searchTerm))
{
    Console.WriteLine("\n❌ Please enter a search term!");
}
else
{
    Console.WriteLine($"\n📋 Results for '{searchTerm}':\n");
    
    int found = 0;
    
    foreach (string product in products)
    {
        if (product.ToLower().Contains(searchTerm))
        {
            found++;
            Console.WriteLine($"   {found}. {product}");
        }
    }
    
    if (found == 0)
    {
        Console.WriteLine("   No products found.");
    }
    else
    {
        Console.WriteLine($"\n✅ Found {found} product(s)");
    }
}
```

**Run 1:**
```
Enter search term: apple

📋 Results for 'apple':

   1. Apple iPhone 15 Pro
   2. Apple MacBook Pro M3
   3. Apple Watch Series 9

✅ Found 3 product(s)
```

**Run 2:**
```
Enter search term: pro

📋 Results for 'pro':

   1. Apple iPhone 15 Pro
   2. Google Pixel 8 Pro
   3. Apple MacBook Pro M3

✅ Found 3 product(s)
```

---

## Complete Example: Student Data Processor

```csharp
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("╔══════════════════════════════════════════╗");
        Console.WriteLine("║     📚 STUDENT DATA PROCESSOR            ║");
        Console.WriteLine("╚══════════════════════════════════════════╝\n");
        
        // Raw CSV data (নাম, রোল, মার্কস)
        string[] rawData = {
            "  RAHIM uddin  , 101 , 85  ",
            "karim AHMED,102,92",
            "   Jabbar ALI , 103 , 78",
            "salam KHAN,104,95",
            "  jalil HOSSAIN  , 105 , 67  "
        };
        
        Console.WriteLine("📥 RAW DATA:");
        Console.WriteLine("─────────────────────────────────────────────");
        foreach (string raw in rawData)
        {
            Console.WriteLine($"'{raw}'");
        }
        
        Console.WriteLine("\n📤 PROCESSED DATA:");
        Console.WriteLine("─────────────────────────────────────────────");
        Console.WriteLine($"{"Name",-20} {"Roll",-8} {"Marks",-8} {"Grade"}");
        Console.WriteLine("─────────────────────────────────────────────");
        
        int totalMarks = 0;
        int studentCount = 0;
        
        foreach (string raw in rawData)
        {
            // Split by comma
            string[] parts = raw.Split(',');
            
            // Clean each part
            string name = CleanName(parts[0]);
            string roll = parts[1].Trim();
            int marks = int.Parse(parts[2].Trim());
            string grade = GetGrade(marks);
            
            // Print formatted
            Console.WriteLine($"{name,-20} {roll,-8} {marks,-8} {grade}");
            
            totalMarks += marks;
            studentCount++;
        }
        
        double average = (double)totalMarks / studentCount;
        
        Console.WriteLine("─────────────────────────────────────────────");
        Console.WriteLine($"\n📊 SUMMARY:");
        Console.WriteLine($"   Total Students: {studentCount}");
        Console.WriteLine($"   Total Marks:    {totalMarks}");
        Console.WriteLine($"   Average:        {average:F2}");
    }
    
    static string CleanName(string rawName)
    {
        // Trim spaces
        string trimmed = rawName.Trim();
        
        // ToLower
        string lower = trimmed.ToLower();
        
        // Fix multiple spaces
        while (lower.Contains("  "))
        {
            lower = lower.Replace("  ", " ");
        }
        
        // Title case
        string[] words = lower.Split(' ');
        for (int i = 0; i < words.Length; i++)
        {
            if (words[i].Length > 0)
            {
                words[i] = char.ToUpper(words[i][0]) + words[i].Substring(1);
            }
        }
        
        return string.Join(" ", words);
    }
    
    static string GetGrade(int marks)
    {
        if (marks >= 90) return "A+";
        if (marks >= 80) return "A";
        if (marks >= 70) return "B";
        if (marks >= 60) return "C";
        if (marks >= 40) return "D";
        return "F";
    }
}
```

Output:
```
╔══════════════════════════════════════════╗
║     📚 STUDENT DATA PROCESSOR            ║
╚══════════════════════════════════════════╝

📥 RAW DATA:
─────────────────────────────────────────────
'  RAHIM uddin  , 101 , 85  '
'karim AHMED,102,92'
'   Jabbar ALI , 103 , 78'
'salam KHAN,104,95'
'  jalil HOSSAIN  , 105 , 67  '

📤 PROCESSED DATA:
─────────────────────────────────────────────
Name                 Roll     Marks    Grade
─────────────────────────────────────────────
Rahim Uddin          101      85       A
Karim Ahmed          102      92       A+
Jabbar Ali           103      78       B
Salam Khan           104      95       A+
Jalil Hossain        105      67       C
─────────────────────────────────────────────

📊 SUMMARY:
   Total Students: 5
   Total Marks:    417
   Average:        83.40
```

---

## Summary - All Methods এক নজরে

### Properties:

| Property | কাজ | Example |
|----------|-----|---------|
| `Length` | কত character | `"Hello".Length` → 5 |
| `[index]` | নির্দিষ্ট character | `"Hello"[0]` → 'H' |

### Case Methods:

| Method | কাজ | Example |
|--------|-----|---------|
| `ToUpper()` | সব বড় হাতের | `"Hello".ToUpper()` → "HELLO" |
| `ToLower()` | সব ছোট হাতের | `"Hello".ToLower()` → "hello" |

### Trim Methods:

| Method | কাজ | Example |
|--------|-----|---------|
| `Trim()` | দুই পাশের space | `"  Hi  ".Trim()` → "Hi" |
| `TrimStart()` | শুরুর space | `"  Hi  ".TrimStart()` → "Hi  " |
| `TrimEnd()` | শেষের space | `"  Hi  ".TrimEnd()` → "  Hi" |

### Search Methods:

| Method | কাজ | Example |
|--------|-----|---------|
| `Contains()` | আছে কিনা | `"Hello".Contains("ell")` → true |
| `StartsWith()` | দিয়ে শুরু কিনা | `"Hello".StartsWith("He")` → true |
| `EndsWith()` | দিয়ে শেষ কিনা | `"Hello".EndsWith("lo")` → true |
| `IndexOf()` | কোথায় আছে | `"Hello".IndexOf("l")` → 2 |
| `LastIndexOf()` | শেষ কোথায় | `"Hello".LastIndexOf("l")` → 3 |

### Substring:

| Method | কাজ | Example |
|--------|-----|---------|
| `Substring(start)` | শেষ পর্যন্ত কাটো | `"Hello".Substring(2)` → "llo" |
| `Substring(start, len)` | নির্দিষ্ট length | `"Hello".Substring(1, 3)` → "ell" |

### Modify Methods:

| Method | কাজ | Example |
|--------|-----|---------|
| `Replace()` | বদলাও | `"Hello".Replace("l", "L")` → "HeLLo" |
| `Insert()` | ঢোকাও | `"Hello".Insert(5, "!")` → "Hello!" |
| `Remove()` | মুছো | `"Hello".Remove(3)` → "Hel" |

### Split/Join:

| Method | কাজ | Example |
|--------|-----|---------|
| `Split()` | ভেঙে array | `"a,b,c".Split(',')` → ["a","b","c"] |
| `string.Join()` | জোড়া দাও | `string.Join("-", arr)` |

---

### মনে রাখো:

- String **immutable** - methods নতুন string return করে, original change হয় না
- **Case-sensitive** - "Hello" ≠ "hello"
- `ToLower()` / `ToUpper()` দিয়ে case-insensitive comparison করো
- `Trim()` user input clean করতে অনেক useful
- `-1` মানে not found (IndexOf এ)

---

**Next Part এ:** Methods - Introduction শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
