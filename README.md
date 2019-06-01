# Website

## To do:

Remove from list when done

- make another include that just selects the last 4 or 5 blog posts instead of all.
- projects page
- contact page
- add to blog section catagories and the list of blogs that relate

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