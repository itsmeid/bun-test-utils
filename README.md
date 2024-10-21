***

<div align="center">
    
# bun-test-utils
    
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)
[![Github](https://img.shields.io/badge/github-repo-242424)](https://github.com/itsmeid/bun-test-utils)
[![NPM](https://img.shields.io/badge/npm-package-red)](https://www.npmjs.com/package/@itsmeid/bun-test-utils)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

<p align="center">Hassle-free tools for effortless testing, helping you deliver quality code faster and easier.</p>

</div>

***

## 📝 Table of Contents

-   [About](#about)
-   [Installation](#installation)
-   [Built Using](#built_using)
-   [Docs](#docs)

## 🤔 About <a name="about"></a>

This package offers a set of tools to make your testing easier and boost your development workflow.

* Easy to use
* Lightweight
* Tested

What's inside: 
* Mocking: Create mocks for modules and functions without the hassle.
* Auto-Mocking: Automatically generate mocks for complex objects to keep your tests clean and
* Custom Timers: Simulate time in your tests with a fake timer that supports setTimeout and setInterval.
* Global DOM Control: Manage global DOM settings effortlessly for your web app tests (using [@happy-dom/global-registrator](https://www.npmjs.com/package/@happy-dom/global-registrator)).

## 🔌 Installation <a name="installation"></a>

```bash
# NPM
npm install --save-dev @itsmeid/bun-test-utils

# BUN
bun add -d @itsmeid/bun-test-utils
```

## ⛏️ Built Using <a name="built_using"></a>

-   [Typescript](https://www.typescriptlang.org/)<br/>
    Strongly typed programming language that builds on JavaScript.
-   [Bun](https://bun.sh/)<br/>
    All-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager.

## 📔 Docs <a name="docs"></a>



<table>
<thead>
<tr>
<th>Module</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

[autoMock](https://github.com/itsmeid/bun-test-utils/tree/main/docs/autoMock.md)

</td>
<td>

A module that provides functionality to create mocks of target objects for testing purposes.
This allows you to easily generate mock implementations with the same shape as the target,
making it easier to test interactions with objects without relying on their actual implementations.

</td>
</tr>
<tr>
<td>

[globalDOM](https://github.com/itsmeid/bun-test-utils/tree/main/docs/globalDOM.md)

</td>
<td>

A module that manages global DOM settings and operations, allowing for
registration, updating, and resetting of global DOM configurations.
This module is particularly useful for testing environments that require
specific DOM settings.
([@happy-dom/global-registrator](https://www.npmjs.com/package/@happy-dom/global-registrator))

</td>
</tr>
<tr>
<td>

[mockModule](https://github.com/itsmeid/bun-test-utils/tree/main/docs/mockModule.md)

</td>
<td>

A module that provides utilities for mocking other modules in a test environment.
This allows you to override specific properties or methods of a module with mock implementations,
and manage these mocks easily through compile, restore, and spy functionalities.
This is especially useful for testing code that depends on external modules.

</td>
</tr>
<tr>
<td>

[timer](https://github.com/itsmeid/bun-test-utils/tree/main/docs/timer.md)

</td>
<td>

A module that provides a fake timer for testing purposes, mimicking
the behavior of `setTimeout` and `setInterval`. This allows for
controlled timing in tests, enabling you to simulate the passage
of time without relying on real time delays.

</td>
</tr>
</tbody>
</table>
