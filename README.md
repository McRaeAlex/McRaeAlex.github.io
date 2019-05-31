# Website

## Notes

### CSS/SCSS

This must be used every project so the width does not depend on the content.

```css
html {
    width: 100%;
}

body {
    margin: 0;
    padding: 0;
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