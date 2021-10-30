+++
fragment = "content"
date = "2021-09-14"
weight = 130

title = "Linux"

[sidebar]
  enable = true
  sticky = true
+++

To use Varnam on Linux, you need to install 3 things :

1. GoVarnam
2. Your Language Support
3. Varnam IBus Engine

There is a simple quick way to install the above 3. Or you can install them step-by-step.

### Quick Install

**Recommended for everyone**

Open a terminal (`CTRL + ALT + T`), paste this and press enter :

```bash
bash <(curl -s https://raw.githubusercontent.com/varnamproject/govarnam/master/quick-installer.sh)
```

Follow the instructions shown in terminal to complete installation.

After installation, see [Getting Started](/docs/getting-started).

### Manual Install

**NOT Recommended for beginners**.

Here's the way to install Varnam step-by-step.

#### 1. GoVarnam

You will need to install GoVarnam library in your system for any app to use Varnam.

* Download a [recent GoVarnam version](https://github.com/varnamproject/govarnam/releases).
* Extract the zip file
* Go to the extracted folder
* Now we need to run the install script
  * Double click `install.sh`, and choose "Run In Terminal"
  * Or for KDE, Right click, choose "Run In Konsole"
  * Or right click on folder, choose "Open In Terminal", type this and press enter:
  ```bash
  ./install.sh
  ```
* Type your password and press enter
* Basic Installation is finished

* Install your language from [here](https://github.com/varnamproject/schemes)

You may also install the IBus engine to use Varnam system wide: https://github.com/varnamproject/govarnam-ibus

You can now proceed to install the IBus Engine

#### 2. Language Support

* Download your language support file from releases: https://github.com/varnamproject/schemes/releases
* Extract zip
* Go to the extracted folder

* Open a terminal in your extracted folder
* Now we need to run the install script
  * Double click `install.sh`, and choose "Run In Terminal"
  * Or for KDE, Right click, choose "Run In Konsole"
  * Or right click on folder, choose "Open In Terminal", type this and press enter:
  ```bash
  ./install.sh
  ```
* Type your password and press enter.
* You will also be asked to import words for better suggestions. You may choose to import them all. You can manually import a **Varnam Learnings File** (VLF) by:
  ```bash
  varnamcli -s ml -import "words.vlf"
  ```

To check if installation is successful, try this command :
```bash
varnamcli -s ml enthaa
```
It should give malayalam suggestions if installation is successful.

#### 3. IBus Engine For Varnam

An easy way to type Indian languages on GNU/Linux systems.

* Install and setup IBus: https://wiki.archlinux.org/title/IBus
* Download the latest release: https://github.com/varnamproject/govarnam-ibus/releases
* Extract the zip file
* Open the extracted folder
* Now we need to run the install script
  * Double click `install.sh`, and choose "Run In Terminal"
  * Or for KDE, Right click, choose "Run In Konsole"
  * Or right click on folder, choose "Open In Terminal", type this and press enter:
  ```bash
  ./install.sh
  ```
* Type your password and press enter
* Restart ibus (no sudo)
  ```bash
  ibus restart
  ```

After installation, see [Getting Started](/docs/getting-started) and enable Varnam IBus Engine.

### Usage

#### Type System-Wide

Read [docs on Varnam IBus Engine](/docs/varnam-ibus-engine) for useful tips.

#### Terminal

Transliterate a word:
```bash
varnamcli -s ml namaskaaram
```

#### Learning Words

Learning words: [See documentation on learning](/docs/learning)

### Uninstall

You can uninstall each of the components with this same command on each of them:

```
sudo ./install.sh uninstall
```
