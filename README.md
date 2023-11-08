# Wilmington University Components Library #

<!-- [![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat-square)](LICENSE.md) [![Stable release](https://img.shields.io/github/release/UDelIT/udthemebrand.svg?style=flat-square)](releases/) [![Bitbucket Pipelines](https://img.shields.io/bitbucket/pipelines/atlassian/adf-builder-javascript.svg?style=flat-square)](https://bitbucket.org/itcssdev/udtheme-brand/src/master/bitbucket-pipelines.yml) [![GitHub issues](https://img.shields.io/github/issues/UDelIT/udthemebrand.svg?style=flat-square&colorB=red)](issues/) [![GitHub issues-closed](https://img.shields.io/github/issues-closed/UDelIT/udthemebrand.svg?style=flat-square&colorB=lightgrey)](issues?q=is%3Aissue+is%3Aclosed) [![WordPress](https://img.shields.io/wordpress/v/akismet.svg?style=flat-square)](https://github.com/UDelIT/udthemebrand) [![](https://img.shields.io/badge/php-5.6.30-ff69b4.svg?style=flat-square)]()

[![GitHub watchers](https://img.shields.io/github/watchers/UDelIT/udthemebrand.svg?style=social&label=Watch&maxAge=2592000)](watchers/) -->




Contributors: [Christopher Leonard]([https://github.com/wilmu-cl), [Kevin Barry](https://github.com/kevingb), Charlie Copland, Chris Rubackuy

## Latest Update ##

11/8/2023

Wilmington University's Design System web components.  All components are WCAG Level AA compliant.

### Browser support ###
Styles are run through Autoprefixer with the follow conditions: ** > 0.3%, last 2 versions, Firefox ESR, not dead, not IE 11 **

### Restrictions ###
These components are ONLY to be used on official Wilmington University department web pages and websites in accordance with WU branding guidelines.

### [License](license.md) ###

### [Additions/changes to this repository](#changes) ###

Before you make any additions or changes to the repository, please confirm that a current component exists in the [Design System](https://www.wilmu.edu/design-system/index.aspx). Confirming will decide which branch the files will be added to.

<details>

<summary>The component exists in the Design System</summary>

1. **The component files exist in this repository**
  * You want to make sure you have the latest copy of the files first. Navigate to the <code>main</code>. From there, fetch (check out) the component via [GitHub Desktop](https://desktop.github.com/) into your local repository <code>main</code> branch.
    Similar to the Dreamweaver process used by the team in the past, this provides you with the latest production files.
  * Copy those files into your local repository <code>development</code> branch.
    This branch is for making changes to the production code without overwriting the working files. Similar to creating a *Working Draft* of a Cascade file.
  * Make any necessary changes to your files from the <code>development</code> branch.
  * When finished, add a descriptive note stating what was changed in your code. (This helps other team members for when they might edit the files later on.) Commit the files and push them to the <code>development</code> branch.

2. **The component files DO NOT exist in this repository**
  * Create a new directory in your local repository <code>development</code> branch.
  * Following the development procedures, create and edit any necessary files.
  * Before uploading to the repository, It's best to create a CodePen test demo and run it through various browsers via WilmU's [BrowserStack](https://www.browserstack.com/) account. Credentials are located in our secret server.
  * When you've finished your tests, add a descriptive note stating what was changed in your code. Commit the files and push them to the <code>development</code> branch.

</details>



