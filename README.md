# Loggit Editor
### Code IDE built in electron

[![Build Status](https://travis-ci.com/77Z/loggit-editor.svg?branch=master)](https://travis-ci.com/77Z/loggit-editor)
![GitHub forks](https://img.shields.io/github/forks/77z/loggit-editor.svg?style=social)
![GitHub followers](https://img.shields.io/github/followers/77z.svg?label=Follow&style=social)
![GitHub stars](https://img.shields.io/github/stars/77z/loggit-editor.svg?style=social)
![GitHub top language](https://img.shields.io/github/languages/top/77z/loggit-editor.svg)

[![77Z Build Status](https://img.shields.io/badge/77Z_build-passing-green.svg)](https://77zsite.tk/builds/loggit-editor)
[Loggit Supported Versions](https://img.shields.io/badge/Loggit_Supported_Platforms-Windows_%7C%20_Linux-lightgrey)

## Get Loggit

[Releases Page](https://github.com/77Z/loggit-editor/releases/latest "Releases")

# How to run unbuilt versions
### things you WILL need:
    - Node.js
    - Git

Once you have installed those, type in your command line:
```
git clone https://github.com/77Z/loggit-editor
cd loggit-editor
npm start
```

from there, the editor will start.

# Settings.json

there is a settings.json file. It allows you to customize the editor by changing a few values.

it is located in ``%appdata%/Loggit`` folder under ``config/settings.json``

The next section will show you how to apply those things to the editor itself.

# Building

Currently, we are using an old version of ``electron-builder``. Version 20.39.0.

You can install it by running ``npm i electron-builder@20.39.0 -g``

If you install it globally, you can build Loggit by running: ``build -w``.

ooooorrr if you really, *really,* want to, you can also build for linux BUT ONLY DO IT ON THE LINUX VERSION! 
[HERE](https://github.com/77Z/loggit-for-linux "CLICK MEEE!!")
_hint, use:_ ``build -l``

# Applying settings

To apply settings, there are two keybinds. Why two? because they both do different things depending on what settings you change.

The keybinds are ``Ctrl+R`` to reload the main window, and ``Ctrl+Shift+Alt+R`` to restart the program

``Ctrl+Shift+Alt+R`` is subject to change.

It's ``Ctrl+Shift+Alt+Q`` on Linux because ``Ctrl+Shift+Alt+R`` triggers the default recording software...
