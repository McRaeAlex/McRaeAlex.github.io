---
layout: post
author: Alexander McRae
categories: [programming]
tags: [elixir, actor model]
---

This is a small post for myself and other elixir beginners to better understand the & operator in elixir and its uses. Sort of a wiki article for myself.

## Confusion

According the the documentation of elixir the `&` operator `captures` a function in a variable or can be passed to a function. The function must then be called using the `var.(args)`. This, at least to me, does not make much sense. Is it just a closure? Or is it something else?

## Answer

So the `&` operator creates a anonymous function that captures its environmnet (closure) but it can do more.

### Reordering args

It's useful for the piping operator `|>` and reording parameters.

Consider the following code

```elixir
x = "ir"
String.ends_with?("elixir", x)
```

Here we are checking if the string `elixir` ends with the string in `x`.
Maybe we get some input from the user and want to do a series of operation on that input and then compare it to `elixir`. A perfect fit for the `|>`.
But wait, we have a issue, piping puts the value into the first arguement to a function but our function needs it as the second argument. The capture can solve this.

```elixir
"ir" |> (&String.ends_with?("elixir", &1)).()
```

There we go, we take the first value of the outer function and move it to the second value of the inner. But is this really the best way? Lets compare another option:

```elixir
"ir" |> (fn x -> String.ends_with?("elixir", x) end).()
```

Option 2 is a bit more readable as a elixir beginner but at the cost of being longer, if I were reading someone elses code I wouldn't really care which option they chose so either is acceptable in my eyes.

### Specifying Function Arity

The greatest use of the `&` operator is the ability to specify the arity of the function you are passing in.

Consider this code

```elixir
defmodule Something do
    def func do
        # does something
    end

    def func(a) do
        # does something
    end

    def other_func do
        Enum.Map([1,2,3], func)
    end
end
```

How does elixir know which function (func/0 or func/1) func is refering to in other_func? You can't without some analysis of the code, which takes time and slows down elixir. The solution is to help elixir a bit.

```elixir
defmodule Something do
    ...

    def other_func do
        Enum.Map([1,2,3], &func/1)
    end
end
```

This clearly tells elixir that we want the function that takes one argument and also tells the programmer too!
Great! Hopefully now the `&` operator makes sense!