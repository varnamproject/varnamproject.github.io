+++
fragment = "content"
date = "2021-12-26"
weight = 130

title = "macOS"

[sidebar]
  enable = true
  sticky = true
+++

## Install

The recommended way to install Varnam is to follow the video tutorial.

### Video Tutorial

* Watch on YouTube: https://www.youtube.com/watch?v=xwArmWmgWw0
* Watch on PeerTube: https://peertube.debian.social/w/f8gUPxB7MK3FyLqzKrVDMh

### Instructions

* Download `VarnamIME.pkg` installer from the latest [release](https://github.com/varnamproject/varnam-macOS/releases).
* Double click to open the installer. You might need to explicitly allow installer to run from security settings.
* Proceed through installation steps

* After the installation is complete, open the application "Terminal"
* Copy the command below, paste it in terminal and press Enter key
  ```bash
  sudo codesign --force --deep --sign - /Library/Input\ Methods/VarnamIME.app
  ```
  It will ask for your password. Type it and press Enter key. **NOTE THAT TERMINAL WON'T SHOW THE PASSWORD YOU ARE TYPING**.
* Copy the command below, paste it in terminal and press Enter key, same as the step above
  ```bash
  sudo codesign --force --deep --sign - /Applications/VarnamApp.app
  ```
* Copy the command below, paste it in terminal and press Enter key, same as the step above
  ```bash
  /Library/Input\ Methods/VarnamIME.app/Contents/MacOS/VarnamIME -import
  ```
* Copy the command below, paste it in terminal and press Enter key, same as the step above
  ```bash
  open /Library/Input\ Methods/VarnamIME.app
  ```
* Now Varnam will be running in the background and you can switch to it from the [system tray](https://apple.stackexchange.com/questions/135370/how-can-i-set-up-a-keyboard-shortcut-for-switching-input-source).

### Enable Varnam

Sometimes Varnam wouldn't get enabled after installation. You would have to enable it manually.

* Open `System Preferences -> Keyboard -> Input Sources`.
* Click on the **+** button.
* Find `VarnamIME` from "English" sub section and click `Add`.

Now you will be able to choose [Varnam from system tray](https://apple.stackexchange.com/questions/135370/how-can-i-set-up-a-keyboard-shortcut-for-switching-input-source).

If it still doesn't work, log out and log in, do the above steps. You may also try a restart.

## Settings

To configure Varnam, open the "Varnam" app from applications list.

## Report Issues

[Read this](/docs/faq/#where-can-i-file-issues-or-get-help-).
