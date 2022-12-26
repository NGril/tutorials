# Regex basics

A regular expression (RegEx) is a way to search for patterns within data sets. 
It's basically a sequence of characters that define a search pattern.
Almost all regex are POSIX standard compliant, https://www.regular-expressions.info/posix.html.

###### A generic solution to all regex problems:
    1. understand the requirement
    2. identify patterns in the inclusion/exclusion list
    3. represent the patterns using regex
    4. use regex engine to apply the regex pattern

#### The basic regex set:

- Asterisk, *
    - represents 0 or more repetitions of the preceeding character
    - e.g. fooa*bar can be foobar, fooabar, fooaaaaaaaaaabar
- Wildcard, **.**
    - represents any symbol (one repetition)
    - e.g. foo.bar can be fooabar, foobbar, foo1bar
- Whitespace, **\s**
    - represents any white space (tab, space...)
- Numeric value, **\d**
    - represents any digit, equal to [0-9]
- Word value, **\w**
    - represents any alphanumeric value or underscore, equal to [a-zA-Z_]
- Character classes, **[]**
    - means that any value inside the braces will occur
    - e.g. foo[abc]bar can be fooabar, foobbar or foocbar
    - negation can be used with [^]
    - e.g. foo[^de]bar can be anything except foodbar and fooebar
    - we can also specify ranges with [x-y]
    - e.g. foo[a-cQ-S7]bar can be fooabar, foobbar, foocbar, fooQbar, fooRbar, fooSbar or foo7bar
- Escaping with backslah, \
    - if we need a literal representation of some of the characters that have special meaning inside the regex (such as [, ], -, *, .) we need to escape them using backslash
    - e.g. foo\.bar is equal to foo.bar
- Anchors, **^** and **$**
    - represent beginning and end of the line, used mostly to stop substring processing
    - e.g.  ^foobar$ equals to exactly the word foobar, if we have afoobarb it will not be included in the result

#### The extended regex set:

- Curly braces repeater, **{}**
    - indicates that there are an exact number of repetitions of the preceeding character
    - e.g. ^[0-9]{3}$ can be any 3-digit number
    - we can also use ranges
    - e.g. ^[0-9]{3,5}$ can be any 3, 4 or 5 digit number
    - we can ommit either number to specify only min/max number of occurances
    - e.g. {3,} or {,5}
- Grouping braces, **()**
    - used to group patterns
    - e.g. (ha){4} is equal to hahahaha
- The plus repeater, **+**
    - represents 1 or more repetitions of the preceeding character
    - e.g. fooa+bar can be fooabar, fooaabar, fooaaaaaaaaaabar, but can't be foobar
- The question mark binary, **?**
    - represents 0 or 1 repetitions of the preceeding character
    - e.g. fooa?bar is either foobar or fooabar
- Making choices with pipe, **|**
	- e.g. (log|ply)wood$ can be logwood or plywood