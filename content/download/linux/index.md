+++
fragment = "content"
#disabled = true
date = "2016-09-07"
weight = 130
#background = "secondary"

title = "Linux"
#subtitle = "Split in two!"
title_align = "left" # Default is center, can be left, right or center

[sidebar]
  title = "Install"
  align = "left"
  sticky = true # Default is false
  content = """
* [Linux](../linux)
* [Windows](../windows)
* [Mac](../mac)
"""
+++

### Installation

You will need to install GoVarnam library in your system for any app to use Varnam.

* Download a [recent GoVarnam version](https://github.com/varnamproject/govarnam/releases).
* Extract the zip file
* Open a terminal and go to the extracted folder by using this command :
```bash
cd Downloads/govarnam
```
* Now run this command to install GoVarnam :
```bash
sudo ./install.sh install
```
It will ask for your password, enter it.
* Installation is finished

To check if installation is successful, try this command :
```bash
varnamcli -s ml enthaanu
```
It should give malayalam output if installation is successful.

* To make Varnam give better suggestions, you will need to import some words. Download a `.vlf` (Varnam Learnings File) file from here [TODO LINK].
* Import it:
```bash
varnamcli -s ml -import file.vlf
```

Now, you may install the IBus engine to use Varnam system wide: https://github.com/varnamproject/govarnam-ibus

## IBus Engine For Varnam

An easy way to type Indian languages on GNU/Linux systems.


### Installation

* Install and setup [IBus](https://wiki.archlinux.org/title/IBus)
* Install [GoVarnam](https://github.com/varnamproject/govarnam)
* Download a release from Releases
* Extract the zip file
* Run the install script in the extracted folder (need sudo):
```
sudo ./install.sh install
```
* Restart ibus (no sudo)
```bash
ibus restart
```
* Go to IBus settings, add Varnam input method.
* Maybe set an easy to use switch key to switch between languages

To uninstall:
```
sudo ./install.sh uninstall
```
