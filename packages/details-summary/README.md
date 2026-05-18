# Wilmington University Components Library #
## Details / Summary Component

## Latest Update ##

05/18/2026

## Notes ##
This component is built using a custom tag, `<faq-accordion>` instead of a standard `<div class="">`. This is a modern CSS best practice, especially when building advanced layout systems.

## Why is this better? ##

- ### It Creates Cleaner Container Queries ###
  - Container Queries `(@cqw)` to make your typography and spacing responsive based on the width of the accordion, not the whole viewport.
```
faq-accordion {
  container-type: inline-size;
  container-name: faq;
}
```
- ### <faq-accordion> Instantly Communicates Structure ###
  - It says, "Look inside this specific component container." Using a div requires reading class names `<div.faq-accordion>`, which reduces readability and makes the selector heavier.

- ### Immediate Developer Intent & Maintainability ###
  - In large codebases, a `<div>` could mean anything—a wrapper, a layout grid, a sidebar.
    - **Standard:** `<div class="faq-accordion">` tells you what it does if you read the class attributes.
    - **Custom Tag:** `<faq-accordion>` instantly signals a self-contained component boundaries to anyone reading the HTML. It mimics the clean syntax of modern frameworks (like React, Vue, or Web Components) right in native HTML.

- ### Zero Style Overhead & Complete Layout Freedom ###
  - Unlike semantic tags like `<section>` or `<ul>`, *a custom HTML element has no browser-default styles*. You never have to worry about inheriting any accidental margins, paddings, or user-agent styles that you have to override.

- ### Future-Proofing for Web Components ###
  - If you ever need to add JavaScript functionality later (e.g., tracking analytics when an accordion opens), you can easily upgrade this tag into a formal Web Component using JavaScript:
  ```
  customElements.define('faq-accordion', class extends HTMLElement { ... });
  ```

### Ensure Accessibility Level AA Compliance ###
Be sure to add `role="list"` to your container, and wrap your `<details>` in `role="listitem"`. This tells screen readers exactly how many FAQ questions exist before they start reading them.
```
<faq-accordion role="list">
  <details name="faq" role="listitem">
    <summary>How do I make an appointment?</summary>
    <div class="inner">
      <p>Appointments can be scheduled in person, virtually, or by email.</p>
    </div>
  </details>
</faq-accordion>
```
### Codepen demo ###
A [fully functioning demo](https://codepen.io/editor/topherlen/pen/019df3cb-6439-7592-b020-a6a763f0fd54/d01640e2b5c5a7272dc86bed3164d81a) is available on Codepen.