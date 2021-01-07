---
author: "Michael Henderson"
date: 2014-09-28
title: Install libvarnam
image: 'artist.jpg'
---



libvarnam is a cross platform, self learning, open source library which support transliteration and reverse transliteration for Indian languages. At the core is a C shared library providing algorithms and patterns for transliteration. libvarnam has a simple learning module built-in which can learn words to improve the transliteration experience.
```
wget http://download.savannah.gnu.org/releases/varnamproject/libvarnam/source/libvarnam-$VERSION.tar.gz
tar -xvf libvarnam-$VERSION.tar.gz
cd libvarnam-$VERSION
cmake . && make
sudo make install

```
This will install libvarnam shared libraries and varnamc command line utility. varnamc can be used to quickly try out varnam.
### Installation on Windows

In Windows, you can compile libvarnam using Visual Studio. Use the following cmake command to generate the project files.

``` 
cmake -DBUILD_TESTS=false -DBUILD_VST=false -DRUN_TESTS=false .
```
Usage
=====

### Transliterate

Usage: varnamc -s lang_code -t word

```shell
varnamc -s ml -t varnam
 വർണം
 വർണമേറിയത്
```

### Reverse Transliterate

Usage: varnamc -s lang_code -r word

```shell
varnamc -s ml -r വർണം
 varnam
```

Word corpus
===========

`libvarnam` is a learning system. It works better with a word corpus. You can obtain the word corpus and make varnam learn all the words. This will enable `libvarnam` to provide intelligent suggestions.

Here is an example of loading Malayalam word corpus:

```shell
mkdir words
cd words
wget http://download.savannah.gnu.org/releases/varnamproject/words/ml/ml.tar.gz
tar -xvf ml.tar.gz
varnamc  -s ml --learn-from .
```

This will take some time depends on how much words you are loading.

[Here are some more word corpus](http://mirror.rackdc.com/savannah/varnamproject/words/)

There is a `--import-learnings-from` option to import files which already has the learnt parameter. Importing these files don't take too much time as the word corpus.