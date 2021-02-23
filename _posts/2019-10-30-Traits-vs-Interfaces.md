---
layout: post
author: Alexander McRae
categories: [programming]
tags: [C#, Rust, Java]
---

When learning Rust it's often difficult to understand the differences between 
things you already know (interfaces) and the Rust alternative (traits). 
Hopefully, this post will clear up some of these differences.

Consider this generic method of a JsonNode in C#. Note: It will not compile.

```cs
public T[] ParseToArray<T>()
where T: IFromJson<T>
{
    List<T> result = new List<T>();

    foreach(JsonNode node in this.ArrayValues)
    {
        T temp = T.FromJson(node); // Call some static method of T which returns itself
        result.Add(temp);
    }

    return result.ToArray<T>();
}

public interface IFromJson<T> {
    public static T FromJson(JsonNode node);
}
```

You may notice a couple issues with this code. First, the interface has a static method, which is not allowed in C# as interfaces describe instances of a class. Second, `FromJson` can return a type other than the class that implements `IFromJson`. This is not an issue as our function definition says T must implement IFromJson<T> but it's also not exactly clear.

Now lets consider a version that works in C#

```cs
public T[] ParseToArray<T>()
where T: IFromJson, new()
{
    List<T> result = new List<T>();

    foreach(JsonNode node in this.ArrayValues)
    {
        T temp = new T();
        T.FromJson(node); // Call a instance method that reads the node into T
        result.Add(temp);
    }

    return result.ToArray<T>();
}

public interface IFromJson {
    /// FromJson reads a JsonNode into the internal structure of the implementor
    public void FromJson(JsonNode node);
}
```

So that works, but there are a couple oddities that, at least to me, aren't intuitive. The two issues I find are #1 static methods cannot exist in interfaces and #2 interfaces know nothing about the class that implements it.

#1, since interfaces can only describe instances of a class they cannot contain any static methods. This means we cannot define a constructor for T and also cannot describe a method that takes in a JsonNode and produces T, without T already being an instance. The result of this restriction is a call to the constructor with no parameters and then a call to FromJson. This is not ideal as the the constructor could do some state full thing that the implementor of IJsonNode did not notice and create a undesired result (Spoiler: I did this).

#2 Instances know nothing of their implementor. This is less of a problem if #1 went away because you could just do something like this.
```cs
class SomeClass: IFromJson<SomeClass>{};
```
Which is valid and works but is not the exact behavior we want. For example a class can implement IFromJson on another class.
```cs
class SomeClass: IFromJson<OtherClass>{};
```
Although this is fine, it can be confusing to read to newer C# developers like myself. It would be nice to be able to restrict the implementor to only be able to use itself as the type parameter.

Now lets look at the way you might write the same thing in Rust with a interface.

```rust
fn parse_to_array<T>(&self) -> Vec<T>
where T: FromJson
{
    let result: Vec<T> = Vec::new();

    for node in self.array_vals {
        let temp: T = T::FromJson(node);
        result.push(temp);
    }

    return result;
}

trait FromJson {
    fn from_json(node: JsonNode) -> Self; // Here we restrict the implementor to only be able to return itself
}
```

This is how I imagine it should work in C#. Self refers to the implementor of the trait and the function is static. I find this code must for readable and makes it clear to the reader what is happening.

To me these are flaws in the interface system which require work arounds. Due to these workarounds I find the Rust code both easier to read and more intuitive.

Although this is not a complete list of the differences between traits and interfaces I hope this makes it at least partially more clear!
