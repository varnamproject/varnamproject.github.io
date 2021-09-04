# Varnam

Easily type Indian languages on the web, desktop and mobile.

[New Website](https://varnamproject.github.io/)

This repo holds the new website for Varnam.

## Varnam Project

Repos working on (ordered by layer. From package to the library) :

* This repo - The new Varnam Website
* [varnam-flatpak](https://github.com/subins2000/varnam-flatpak) - Flatpak package for Varnam Editor (Linux)
* [varnam-desktop](https://github.com/varnamproject/desktop) - Cross-platform Desktop app for Varnam Editor (Go)
* [varnam-editor](https://github.com/varnamproject/editor) - Browser editor frontend for Varnam (VueJS)
* [varnam-review](https://github.com/subins2000/varnam-review) - Crowdsourced review platform for words in Varnam (NodeJS)
* [varnamd](https://github.com/subins2000/varnamd) - Varnam HTTP server daemon (Go)
* [GoVarnam](https://github.com/varnamproject/govarnam) - The core library (C)

## Development

Requires hugo extended version.

Install dependencies and run hugo server to play with the code :

```
git submodule update --init --recursive --remote
hugo server
```
