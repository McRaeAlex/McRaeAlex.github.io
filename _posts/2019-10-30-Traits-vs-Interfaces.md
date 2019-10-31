---
layout: post
author: Alexander McRae
categories: [programming]
tags: [C#, Rust, Java]
---

When learning Rust it's often difficult to understand the differences between 
things you already know (interfaces) and the Rust alternative (traits). 
Hopefully this post clear up some of the differences between traits and interfaces.

Consider this generic method of a JsonNode in C#.

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

You may notice a couple issues with this code. First the interface has a static method, which is not allowed in C# as interfaces describe instances of a class. Second some `class` implementing IFromJson can return some type other than itself from `FromJson`. This is not a issue as our function definition says T must implement IFromJson<T> but it's also not exactly clear.

Now lets consider a version that works in C#

```cs
public T[] ParseToArray<T>()
where T: IFromJson, new()
{
    List<T> result = new List<T>();

    foreach(JsonNode node in this.ArrayValues)
    {
        T temp = new T();
        T.FromJson(node); // Call some static method of T which returns itself
        result.Add(temp);
    }

    return result.ToArray<T>();
}

public interface IFromJson {
    /// FromJson reads a JsonNode into the internal structure of the implementor
    public void FromJson(JsonNode node);
}
```

So that works, but there are a couple oddities that, at least to me, aren't intuitive. We now have the requirement that T has a constructor, which requires us to call the constructor and then read the node into it. Then theres T.FromJson which is reading the JsonNode into the internal values of the implementor. A possible issue with this is that you might want different default values for the implementor's constructor and FromJson methods. Even worse, if the constructor mutates some state it may not be the desired behavior.

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
    fn from_json(node: JsonNode) -> Self;
}
```

This is how I imagine it should work in C#. Self refers to the implementor of the trait and the function is static. This brings me to the 2 big differences between traits and interfaces for this example.

1. interfaces describe instances and cannot describe static methods
2. interfaces know nothing of their implementor

To me these are flaws in the interface system which require work arounds. I prefer the Rust trait system because for cases like these its just easier to read.
