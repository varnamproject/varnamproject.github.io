+++
fragment = "content"
date = "2021-09-17"
weight = 100

[sidebar]
  enable = true
  sticky = true
+++

## Learning Words

### Varnam Dictionary

Varnam uses a **single dictionary for a language**. This means there can be multiple schemes for the same language but the words for all of them will be common.

The storage location of the dictionary is:

* GNU/Linux: `HOME_DIRECTORY/.local/share/varnam/learnings`
* Mac: `HOME_DIRECTORY/.local/share/varnam/learnings`

### Learn A Word

Do this in a terminal:
```bash
varnamcli -s ml -learn വാക്കിവിടെ
```

The `-s ml` mentions the **scheme ID**. This word will then be added to the Malayalam dictionary.

This also will add the word to Malayalam dictionary :

```bash
varnamcli -s ml-inscript -learn വാക്കിവിടെ
```

Because both scheme `ml` and `ml-inscript` is for the Malayalam language.

### Learn From Files

Varnam has the ability to learn words from any text file.

#### Ordinary File

Varnam can import Indic language words from a file :
```bash
varnamcli -s ml -learn-from-file filename.txt
```
`filename.txt` can be any kind of file, an HTML web page or any digital file where there are words to learn. Varnam find words, calculate the frequency of that word in the file and learns from it. The **frequency determines the confidence** of that word.

That is, if the word "ഒരിക്കൽ" (orikkal) is found in the file 100 times and "ഒരിടത്ത്" (oriTathth) is found 50 times, then after learning, `varnamcli -s ml -t ori` gives :
```
ഒരിക്കൽ
ഒരിടത്ത്
ഒരി
```

#### Frequency File

A frequency file looks like this (`<word> <frequency>`) :
```
മലയാളം 120
ഒരിക്കൽ 100
ഒരിടത്ത് 50
```
This file can be imported to Varnam with the same command :
```bash
varnamcli -s ml -learn-from-file word-frequency.txt
```
What's different here is that the frequency value is mentioned. Varnam will learn words and use each frequency as the confidence value.

Some places to find such frequency files or to make frequenct files on your own:

* https://github.com/AI4Bharat/indicnlp_corpus#text-corpora
* https://github.com/AI4Bharat/indicnlp_catalog#monolingual-corpus

### IME Learning

If you use [Varnam IBus Engine](/docs/varnam-ibus-engine), there is in-built learning while you type. See [this page](/docs/varnam-ibus-engine).

## Training Words

You can make Varnam use a specific pattern for words.

### Train A Word

To train a single word:

```bash
varnamcli -s ml -train firefox=ഫയർഫോക്സ്
```

Now if we give the input "firefox" for transliteratrion:

```bash
varnamcli -s ml firefox // ഫയർഫോക്സ്
```

### Train From File

Varnam can train patterns from a file like this:
```plain
academy അക്കാഡമി
access ആക്സസ്
accident ആക്സിഡന്റ്
accord അക്കോർഡ്
account അക്കൗണ്ട്
```

Do this to train each pattern from the file:
```bash
varnamcli -s ml -train-from-file my-file.txt
```

## Export Learnings

You can export your local Varnam Learnings data to use on another system or share with others.

Simply run this to do an export:
```bash
varnamcli -s ml -export my-export
```

The export file will have the extension `.VLF` (Varnam Learnings File).

Depending on the number of words in your dictionary, the number of files generated will vary. Example:

* my-export-1.vlf
* my-export-2.vlf
* my-export-3.vlf

By default, the maximum number of words in a file will be **30,000**. The words are exported according to descending order of words.

The export format is JSON. Here's a tidied-up sample:
```json
{
  "words": [
    {
      "w": "എന്നു", // Word
      "c": 210, // Weight/Confidence
      "l": 1631129802 // Learned On
    },
    {
      "w": "സമാനപദങ്ങൾ", // Word
      "c": 25, // Weight/Confidence
      "l": 1631129802 // Learned On
    },
    {"w": "അക്കാഡമി", "c": 215, "l": 1631129802},
    {"w": "ആക്സസ്", "c": 219, "l": 1631129802},
    ...
  ],
  "patterns": [
    {"p":"academy", "w":"അക്കാഡമി"},
    {"p":"access", "w":"ആക്സസ്"},
    ...
  ]
}
```

## Import Learnings

You can import any `.vlf` file with:

```bash
varnamcli -s ml -import my-export-1.vlf
```

The above will import the one file `my-export-1.vlf`.

To import all the `.vlf` files in the folder, do this:

```bash
varnamcli -s ml -import "*.vlf"
```

The **quotes "** are important above. Without it the wildcard file matching won't work.