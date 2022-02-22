<template>
  <router-view></router-view>
  <hp-toast />
  <div class="mobile-warning">
    <hp-mobile-warning />
  </div>
</template>

<script setup>
import HpToast from "@/components/hp-toast.vue";
import HpMobileWarning from "@/components/hp-mobile-warning.vue";
window.Intercom("boot", {
  app_id: import.meta.env.VITE_INTERCOM_ID,
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");

:root {
  font-family: "Inter", sans-serif;
  font-weight: 400;

  // Colours
  --color-background: #ffffff;
  --color-card: #ffffff;
  --color-panel: #f9f9f9;
  --color-border-subtle: #f0f0f0;
  --color-border: #e3e5e5;
  --color-border-soft: #e3e5e5;
  --color-text-primary: #212c33;
  --color-text-secondary: #778085;
  --color-text-tertiary: #c6cacc;
  --color-accent-background: #334652;
  --color-accent-forground: #ffffff;
  --color-background-positive: #e0eee7;
  --color-border-positive: #a7cdba;
  --color-forground-positive: #3f755a;
  --color-background-negative: #f2e2df;
  --color-border-negative: #d9ada4;
  --color-forground-negative: #86483b;
  --color-error: #bd6455;
  --color-focus: #f2f4f5;
  --color-background-floating: #ffffff;
  --color-forground-floating: #f0f0f0;
  --color-underground: #f0f0f0;
  --color-overylay: #1d2429;
  --color-tooltip: #29343b;
  --color-forground-tooltip: #ffffff;
  --color-spinner-track: rgba(51, 70, 82, 0.4);
  --color-spinner-bullet: rgba(51, 70, 82, 1);

  --grey--100: #ffffff;
  --grey--200: #f9f9f9;
  --grey--300: #f0f0f0;
  --grey--400: #e3e5e5;
  --grey--500: #c6cacc;
  --grey--600: #778085;
  --grey--700: #434c52;
  --grey--800: #354047;
  --grey--900: #29343b;
  --primary--100: #f2f4f5;
  --primary--200: #e4e8eb;
  --primary--300: #c9d1d6;
  --primary--400: #556570;
  --primary--500: #334652;
  --primary--600: #223642;
  --primary--700: #142a38;
  --primary--800: #0b1d29;
  --primary--900: #081c29;
  --green--100: #559e7a;
  --green--200: #559e7a;
  --green--300: #559e7a;
  --green--400: #559e7a;
  --green--500: #559e7a;
  --green--600: #559e7a;
  --green--700: #559e7a;
  --green--800: #559e7a;
  --green--900: #559e7a;
  --red--100: #b56150;
  --red--200: #b56150;
  --red--300: #b56150;
  --red--400: #b56150;
  --red--500: #bd6455;
  --red--600: #b56150;
  --red--700: #b56150;
  --red--800: #b56150;
  --red--900: #b56150;
  --orange--100: #ad6d3b;
  --orange--200: #ad6d3b;
  --orange--300: #ad6d3b;
  --orange--400: #ad6d3b;
  --orange--500: #ad6d3b;
  --orange--600: #ad6d3b;
  --orange--700: #ad6d3b;
  --orange--800: #ad6d3b;
  --blue--100: #508199;
  --blue--200: #508199;
  --blue--300: #508199;
  --blue--400: #508199;
  --blue--500: #508199;
  --blue--600: #508199;
  --blue--700: #508199;
  --blue--800: #508199;
  --blue--900: #508199;
  --purple--100: #505099;
  --purple--200: #505099;
  --purple--300: #505099;
  --purple--400: #505099;
  --purple--500: #505099;
  --purple--600: #505099;
  --purple--700: #505099;
  --purple--800: #505099;
  --purple--900: #505099;
  --yellow--100: #f0c165;
  --yellow--200: #f0c165;
  --yellow--300: #f0c165;
  --yellow--400: #f0c165;
  --yellow--500: #f0c165;
  --yellow--600: #f0c165;
  --yellow--700: #f0c165;
  --yellow--800: #f0c165;
  --yellow--900: #f0c165;
  --baby_blue--100: #4998c9;
  --baby_blue--200: #4998c9;
  --baby_blue--300: #4998c9;
  --baby_blue--400: #4998c9;
  --baby_blue--500: #4998c9;
  --baby_blue--600: #4998c9;
  --baby_blue--700: #4998c9;
  --baby_blue--800: #4998c9;
  --baby_blue--900: #4998c9;
  --violet--100: #745099;
  --violet--200: #745099;
  --violet--300: #745099;
  --violet--400: #745099;
  --violet--500: #745099;
  --violet--600: #745099;
  --violet--700: #745099;
  --violet--800: #745099;
  --violet--900: #745099;
  --beige--100: #fcf0e4;
  --beige--200: #fcf0e4;
  --beige--300: #fcf0e4;
  --beige--400: #fcf0e4;
  --beige--500: #fcf0e4;
  --beige--600: #fcf0e4;
  --beige--700: #fcf0e4;
  --beige--800: #fcf0e4;
  --beige--900: #fcf0e4;
  --pink--100: #eb4c8a;
  --pink--200: #eb4c8a;
  --pink--300: #eb4c8a;
  --pink--400: #eb4c8a;
  --pink--500: #eb4c8a;
  --pink--600: #eb4c8a;
  --pink--700: #eb4c8a;
  --pink--800: #eb4c8a;
  --pink--900: #eb4c8a;
  --brown--100: #a79184;
  --brown--200: #a79184;
  --brown--300: #a79184;
  --brown--400: #a79184;
  --brown--500: #a79184;
  --brown--600: #a79184;
  --brown--700: #a79184;
  --brown--800: #a79184;
  --brown--900: #a79184;
}

[data-theme="dark"] {
  --color-background: #1d2429;
  --color-card: #1d2429;
  --color-panel: #171f24;
  --color-border-subtle: #242b30;
  --color-border: #343b40;
  --color-border-soft: #252c30;
  --color-text-primary: #ffffff;
  --color-text-secondary: #c6cacc;
  --color-text-tertiary: #778085;
  --color-accent-background: #505099;
  --color-accent-forground: #ffffff;
  --color-underground: #151c21;
  --color-background-positive: rgba(85, 158, 122, 0.08);
  --color-border-positive: rgba(85, 158, 122, 0.32);
  --color-forground-positive: #559e7a;
  --color-background-negative: rgba(181, 97, 80, 0.08);
  --color-border-negative: rgba(181, 97, 80, 0.32);
  --color-forground-negative: #b56150;
  --color-error: #bd6455;
  --color-focus: #343c55;
  --color-background-floating: #242c30;
  --color-forground-floating: #363e42;
  --color-overylay: #1d2429;
  --color-tooltip: #393f42;
  --color-forground-tooltip: #393f42;
  --color-spinner-track: rgba(255, 255, 255, 0.4);
  --color-spinner-bullet: rgba(255, 255, 255, 1);
}

.flyout-transition {
  transform: translateY(0);
}
.flyout-transition-enter-active,
.flyout-transition-leave-active {
  transition: all 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
.flyout-transition-enter-from,
.flyout-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

* {
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
}

html {
  color: var(--color-text-primary);
  background-color: var(--color-background);
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
  &:focus {
    outline: none;
  }
}

/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the `main` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: 400;
  margin: 0;
  padding: 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input {
  /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select {
  /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}
</style>
