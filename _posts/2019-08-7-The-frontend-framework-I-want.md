---
layout: post
author: Alexander McRae
categories: [programming]
tags: [Web, js, javascript, vue, react, www]
---

This is a post about the front-end framework I want. This post happened because as I continue to develope applications I find that the tooling is far to complex for the end user, even after its setup. I really enjoy vue js, but its due to the ecosystem I feel like I am not productive enough.

## Development experience

- One single download for the entire experience I dont care if its a single npm install or a standalone environment without node
- No babel
- No webpack
- No eslint
- Vender dependencies for components others have built for the framework etc.
- Built in router and store that if they are not used are not included in the build
- Typescript support or similar maybe own lang
- Fast as default ie no css in js, static html is put in html with dynamic added after etc.. [Svelte](https://svelte.dev/) has a great approach to this, removing the virtual dom completely

I want the user to be able to write things without thinking of babel or webpack or anything but the frontend
the user should have the code automatically linted.

**One key thing I want is the ability for a dev environment that provides fake data to the frontend.** this means that if I make a call to some api I want my development environment to stop that call from going to the server and instead take in in and output fake data which i have told it to. This would help me so much when developing my vue application, its basically faking a backend services which may not be implemented or is not able to be run beside vue for testing. This would stop me from hard coding data into Vuex and testing with that. It also has the added benefit that your api calls are actually happening so you know once real data is used they **should** work. This would even help with docker builds that use aliases for backends in docker_compose.

Possible structure:

{% highlight structure %}
.
+-- build
+-- depends
+-- mock.api // this is a file that describes calls the front end could make and what the mock backend should respond with
+-- src
    +-- assets
    +-- components
    +-- views
        +-- Home.comet
    +-- main.comet // contains the initial startup code
    +-- router.comet // contains router
    +-- store.comet // contains the store like Vuex 
+-- config.toml
+-- lint.toml
{% endhighlight%}

mock.api

{% highlight api %}
https://backend/api // matches https requests the domain backend (this is a example for integration with docker compose) and the prefix starts with api
    REQUIRES: {
        cookie: [] // the required cookie or cookies or JWT
    }
    /login -> {"data"} // this could be json or anything even a js response object that sets cookies etc
    /logout -> {"data"} 
    /posts?postId=1 -> {"data"} define for individual queries etc.

*://backend/
    REQUIRES: {}
    /posts -> do {
        // write code here to do simple things with the request
    }
{% endhighlight %}

## Components

Components should be able to have a structure similar to vues single file components.
I really like the idea of keeping everything to do with a component in one file.
The `@`, `:` binding in vue are also great and so is `v-for`, `v-if`, etc.. I think there is room for improvement however with things like scoped css and include and pre-styled components, I think there should be some way for a bunch of default styles to apply to all components but not necessarily all tags.

{% highlight vue %}
<template>
<div>
    This is a component
</div>
</template>

<script>
// imports here

export {
    props: {..props},
    data: {..data},
    methods: {..methods}
}
</script>

<style>

</style>
{% endhighlight %}

## Testing

This is the portion of js that I hate. Jest, Mocha, anything really sucks. This is a large reason why i want that easy to use and create backend mentioned above. By providing a complete integrated experience for the developer you can ensure that your product will work in deployment.

## Conclusion

Overall nothing is perfect, not Vue not React and not my framework either, but I believe a framework with this level of developer friendliness could push the ecosystem in the correct direction.


