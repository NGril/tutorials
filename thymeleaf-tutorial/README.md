# THYMELEAF

### 1) INTRODUCTION

##### 1.1 What is Thymeleaf?
- Thymeleaf is a server-side templating engine
- works with SpringBoot

##### 1.2 Why Thymeleaf?
- easier to use than JSP (Java Server Pages)
- because Thymeleaf uses standard HTML tags you can open a Thymeleaf file in a browser → makes development easier

##### 1.3. Installing Thymeleaf
- add a standard maven dependency to your Spring Boot project
    ```xml
    <dependency>
        <groupId>org.thymeleaf</groupId>
        <artifactId>thymeleaf</artifactId>
        <version>3.0.11.RELEASE</version>
    </dependency>
    ```
- also add this to pom.xml inside the build tag to tell thymeleaf to look in the resources folder in your project
    ```xml
    <resources>
        <resource>
            <filtering>false</filtering>
            <directory>src/main/resources</directory>
        </resource>
    </resources>
    ```
- no additional configuration needed if we keep our Thymeleaf files in a standard location


### 2) GETTING STARTED

##### 2.1 Documentation
- https://www.thymeleaf.org/documentation.html

##### 2.2 Making an HTML file a Thymeleaf template
- add `xmlns:th="http://www.thymeleaf.org"` into the opening `<html>` tag to add the Thymeleaf tag library into 
that particular file


### 3) ATTRIBUTES

##### 3.1 The th:text tag
- The values inside html tags are changed by values of a Thymeleaf attribute
- The value is typically transferred from the controller, e.g. `th:text="${username}"`

##### 3.2 Evaluating expressions with variables
- variables can be passed and evaluated only inside Thymeleaf tags
- `th:text="’Hello ’ + ${username}"`

##### 3.3 Using th:text with the span tag 
```html
<p> 
    Hello <span th:text="${username}"> username </span>, and welcome to the application!
</p>
```

##### 3.4 Extracting data from a model map
- getting a value from a model:
    - `<td th:text="${model.get('firstname')}">`
- if we use a map we can write:
	- `<td th:text="${model.firstname}">`
- for concatenation we can write inside pipes, “| … |”:
	- `<td th:text="|You, ${model.get('title')} ${model.get('firstName')} ${model.get('lastName')} are awesome!|">`
	
	
### 4) LINKS, LOOPS AND CONDITIONS

##### 4.1 Links
- to use Thymeleaf links we need to enclose them inside `@{…}`
    ```html
    <p>
    <a th:href="@{/}" href="homepage.html">Homepage</a>
    </p>`
    ```
##### 4.2 Dynamic links
- single variable: `th:href="@{/profile?id} + ${model.id}"`
- multiple variables:  `th:href="@{/profile(id=${model.id}, trial=1)}"`

##### 4.3 Looping through collections
- `<li th:each="language : ${model.languages}" th:text="${language}">Language1</li>`

##### 4.4 Conditions
- `<ul th:if="${model.languages.size() >= 3} AND ${isAdmin}">`
- instead of && and || we use AND and OR

##### 4.5 Using the ternary operator
- `<span th:text="${model.languages.size() >= 3} ? '3 or more' : ${model.languages.size()}">x</span>`


### 5) BUILDING PAGES

##### 5.1 Including CSS files in your Thymeleaf project
- the default folder it looks into is the “static” folder inside "resources", so we can use a relative path from there
- `<link rel="stylesheet" href="css/main.css" th:href="@{/css/main.css}"/>`

##### 5.2 Including images
- the default folder it looks into is the “static” folder inside "resources", so we can use a relative path from there
- `<img src="asterisk-guy.jpg" th:src="@{images/asterisk-guy.jpg}" />`

##### 5.3 Creating and using re-usable HTML blocks - fragments
- usually fragments are added in a separate folder inside the templates folder
- we create a fragment in a separate file, one fragment can contain many different fragments
```html
<p th:fragment=”main-menu”>
    <a th:href=”@{/}”>Home page</a>
    <a th:href=”@{/profile}”>Profile</a>
</p>
```
- when using fragments the fragment replaces the entire html element and its contents
- `<div th:replace="fragments/menu :: main-menu">main menu goes here</div>`
- the entire div and everything in it will be replaced by the contents of the main-menu fragment
- the syntax for th:replace is a bit weird, the first part is the path to the fragment file, and the second is the name 
of the fragment inside that file
- fragments aren’t restricted, they can be used outside `<body>...</body>` (e.g. inside `<head>...</head>` )

##### 5.4 Creating local variables
- if we are reusing some code we can create a local variable
- local variables are visible only within a scope of a tag
- e.g.
    - declaration: `<body th:with="variableName=${model.get('title')} + ' ' + ${model.get('firstName')} + ' ' + ${model.get('lastName')}">`
    - usage: `<p th:text="${variableName}">Name</p>`

### 6) WORKING WITH FORMS

##### 6.1 Populating an HTML Select dynamically
- if we have a map that consists of country key and country name (value):
```html
<option th:each="country : ${countries}" 
        th:text="${country.value}" 
        th:value="${country.key}" 
        value="XXX">
        Country name
</option>
```

##### 6.2 Binding a backing bean to an HTML form element
- a common practice when sending data from the form to the controller is to create a “backing bean” which contains 
all the fields that the form has and is not saved anywhere
- to bind a bean to an HTML form we use the Thymeleaf bind syntax, e.g.
`<input type="text" name="username" id="username" placeholder="username" required th:field="*{addUserModel.username}">`
- our backing bean is of type “AddUserModel”, its name is “addUserModel”, and it has a field called “username”
- the value is bound with the following syntax: `th:field="*{model.field}"`
- the shorter way to do this is to first declare the model we are going to be binding inside <form>, e.g.
`<form action="/saveUser" method="POST" th:object="${addUserModel}">`
and then when binding we don’t have to mention it, so we can write only:
`<input type="text" name="username" id="username" placeholder="username" required th:field="*{username}">`
- if you want to display errors instead of fields use the `th:errors` attribute

### 7) PAGE LAYOUTS

##### 7.1 Creating page layouts
- in thymeleaf we can define a typical page layout that consists of many fragments
- we crerate a page, e.g. “standardLayout.html” in which we add all the necessary fragments
- in the <html> tag we declare the entire page as a fragment, e.g.
`<html xmlns:th="http://www.thymeleaf.org" th:fragment=”page”>`
- for the dynamically changing content we use a placeholder, simillar syntax as adding fragments,  e.g.
`<div th:replace=”this :: content1”>Content goes here</div>`
`<div th:replace=”this :: content2”>Content goes here</div>`

##### 7.2 Using page layouts
- in our page, inside the <html> tag we include the standard layout, (same syntax as th:replace, only but instead 
the attribute is th:include) e.g.
`<html xmlns:th="http://www.thymeleaf.org" th:include=”layouts/standardLayouts :: page”>`
- in the page that uses the layout we create only the dynamic content that’s going to be added to the standard layout, e.g.
```html
<div th:fragment=”content1”>
	…
</div>
<div th:fragment=”content2”></div>
```
- when inserting content you need to provide all content blocks defined in the layout, even if you don’t need it, 
otherwise it won’t work

##### 7.3 Passing arguments to fragments
- when defining the layout, inside the th:fragment attribute we can define the arguments that are going to be passed to 
the fragment, e.g.
`<html xmlns:th="http://www.thymeleaf.org" th:fragment=”page(title)”>`
- to define where the argument is going to go we simply add the th:text=”${title}” in the desired place
- when using the argument, inside the th:include add the argument and the desired value, e.g.
`<html xmlns:th="http://www.thymeleaf.org" th:include=”layouts/standardLayouts :: page(title=’desired page title’)”>`