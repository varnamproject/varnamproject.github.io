+++
fragment = "content"
date = "2021-12-26"
weight = 130

title = "Mac"

[sidebar]
  enable = true
  sticky = true
+++

## Install

* Download `VarnamIME.pkg` installer from the latest [release](https://github.com/varnamproject/varnam-macOS/releases).
* Double click to open the installer. You might need to explicitly allow installer to run from security settings.
* Proceed through installation steps
* After the installation is complete, open Terminal app, paste this and press Enter:
```
sudo codesign --force --deep --sign - /Library/Input\ Methods/VarnamIME.app
sudo codesign --force --deep --sign - /Applications/VarnamApp.app
/Library/Input\ Methods/VarnamIME.app/Contents/MacOS/VarnamIME -import # Import words
open /Library/Input\ Methods/VarnamIME.app # Run Varnam
```
* Now Varnam will be running in the background and you can switch to it from the [system tray](https://apple.stackexchange.com/questions/135370/how-can-i-set-up-a-keyboard-shortcut-for-switching-input-source).

### Enable Varnam

Sometimes Varnam wouldn't get enabled after installation. You would have to enable it manually.

* Open `System Preferences -> Keyboard -> Input Sources`.
* Click on the **+** button.
* Find `VarnamIME` from "English" sub section and click `Add`.

Now you will be able to choose [Varnam from system tray](https://apple.stackexchange.com/questions/135370/how-can-i-set-up-a-keyboard-shortcut-for-switching-input-source).

## Settings

To configure Varnam, open the "Varnam" app from applications list.

## Report Issues

[Read this](/docs/faq/#where-can-i-file-issues-or-get-help-).
