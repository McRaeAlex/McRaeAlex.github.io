# Website

## To do:

Remove from list when done

- projects page
    - [ ] format page
    - [x] Card format
    - [ ] I want to be able to filter projects based on language, topic ie. webdev,
    graphics, systems
    - [x] I want a short description for each to show up before clicking on them
    - [x] I want a picture on the card
    - [ ] I want to be able to attach blog posts to it
- add to blog section catagories and the list of blogs that relate
- better 404 page
- rewrite CSS using every-layout.dev as a guide! **!IMPORTANT!**
- Add color!

## Notes

### CSS/SCSS
A normalize css file must be used.

This must be used every project so the width does not depend on the content.

```css
html {
    height: 100%;
    width: 100%; // this gets added so the width is not based on the content
    scroll-behavior: smooth;
}

body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-y: scroll;
}
```

BEM conventions must be used

```css
.block-name__element-name_modifier-name_mod-val {
    // stuff
}

.navigation__item_current {
    color: red;
}
```

Composable over individual styling.