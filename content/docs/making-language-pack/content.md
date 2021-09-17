+++
fragment = "content"
date = "2021-09-17"
weight = 100

[sidebar]
  enable = true
  sticky = true
+++

A language pack is a set of **Varnam Learnings File** (.VLF) that can be imported into any Varnam instance. After importing a VLF into a Varnam instance, Varnam can then give better suggestions.

A VLF file is basically a dictionary of words. Any export from Varnam is a VLF. Varnam learns each word you type locally. But we don't need user-typed custom words to be in a VLF that will be shared publicly. A public language pack should only have a general word data.

Let's see how to make a language pack from different sources of words data.

For tutorial purposes we will be making a language pack for **Malayalam** (ml).

## Terms

* Varnam Learnings File (.VLF): Words/Learnings can be exported from Varnam to be used in another Varnam instance. This export file format is the VLF.
* Corpus: A corpus is a language resource consisting of a large and structured set of texts.
* ml: Malayalam scheme identifier. Varnam scheme identifier doesn't necessarily need to be a [language code](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes). Example: `ml-inscript` scheme exists too (for Malayalam with inscript layout).
* Frequency: The number of how much a certain word occurs
* Confidence/Weight: When Varnam predicts, it picks words sorted by the highest confidence/weight. This integer value of a word increases as a user chooses it more

## Prerequisites

* [Install GoVarnam](/) with language support
* Ideally a GNU/Linux system

## Steps In Making A Pack

* Find words data
* Make Varnam Learn words
* Maybe train some patterns
* Export

If you want to upload this pack to Varnam, then

* Make `pack.json` file
* Zip it, send it

## Add Words

See [Learning docs](/docs/learning) to see all the ways to learn words in Varnam.

### Gather Data

You will need to find ways to scrape data from websites (Python is mostly used for this) or use public datasets. Some scrapers :
* [luca.co.in scraper](https://github.com/joicemjoseph/luca-science-dictionary-scraper)
* [Newspaper website scraper](https://github.com/vanangamudi/newspaper-crawler-scripts)
* [Instagram scraper](https://gist.github.com/subins2000/3e0934fd6f62483e3d0a65852515e4f0)

Public datasets:
* [AI4Bharat-IndicNLP Dataset](https://github.com/AI4Bharat/indicnlp_corpus)
* [IndicNLP](https://indicnlp.org/)
* [SMC Corpus](https://gitlab.com/smc/corpus/-/tree/master)

### Making A Frequency File

A Frequency file shows the frequency of words in a word corpus. A sample frequency file :
```
മലയാളം 120
ഒരിക്കൽ 100
ഒരിടത്ത് 50
```

This means the word `മലയാളം` was found **120** times, `ഒരിക്കൽ` was found **100** times etc.

Varnam can learn words from such files setting the frequency as confidence value.

Let's make one:

* Gather data from websites, social media etc. into `.txt` files. Sample :
```
ml-wikipedia-article-india.txt
ml-wikipedia-article-kerala.txt
```
  How to gather data ? See section above

* Use [this instruction](https://gitlab.com/smc/corpus/-/blob/master/tools/word-frequency-analyze.md) to make a frequency report file from the previous `.txt` files.
  * [Cleanup of `.txt` files](https://gitlab.com/smc/corpus/-/blob/master/tools/corpora-cleanup.sed) is required to make the frequency output better. This can include fixing Unicode problems, common errors like :
    * Using 0 instead of anusvaram ( ം)
    * Using [Malayalam numeral](https://en.wikipedia.org/wiki/Malayalam_script#Numeral_System) ൪ (4) instead of ർ (both are visually similar BUT **very different meanings**, `പയർ != പയ൪`).
  * The frequency calculation is a **time consuming process** depending on number of files and content, so make sure input data is alright before doing it. What that script does :
    * Remove all characters except Malayalam Unicode block characters & ZWJ & NZWJ
    * Remove unwanted newlines, whitespaces
    * Make each line have a single word
    * Sort
    * Count unique occurences (frequency) of words
    * Sort by the occurence number (frequency)
* Use a [text editor](https://askubuntu.com/questions/28847/text-editor-to-edit-large-4-3-gb-plain-text-file) to display & edit large files. The report will be big and might have errors. You will have to fix this. Some suggestions :
  * Remove words that have less frequency (Perhaps lesser than 40 or 50 ?)
  * Some words that have spelling mistakes might reach a higher frequency, find them and remove
  * Remember that errored words will later turn out to be suggestions in varnam, so be cautious ! :)
  * Remove words that are already collected. See below

The output `report.txt` will have the format we need to import to Varnam. This file can then be shared to anyone. But, since the learning process is slow, it's better to share trained files.

Depending on where the data is collected from, we can divide these frequency report files. Examples: 
* `wikipedia-frequency-report.txt` (Words sourced from wikipedia)
* `luca-frequency-report.txt` (Science related words sourced from [luca.co.in](https://luca.co.in))

#### Useful Tips

* To remove same words from first frequency report :
  ```
  awk 'NR==FNR{a[$1]=1;next}!a[$1]' wikipedia-frequency-report.txt luca-frequency-report.txt > luca.txt
  ```
  Now `luca.txt` will only have words from `luca-frequency-report.txt` that is not in `wikipedia-frequency-report.txt`. This file can then be renamed `ml-luca-pack` and shared. Doing so, we can assume that `ml-luca-pack` will only have **Science related words**.

* To combine words from two frequency reports (`report1.txt` & `report2.txt`) :
  ```
  awk '{ count[$1] += $2 } END { for(elem in count) print elem, count[elem] }' report1.txt report2.txt | sort -gr -t " " -k 2 > report-combined.txt
  ```
  Now, `report-combined.txt` will have combined result. The frequency count will be summed up too.

## Making Pack

Doing a Varnam export will export all the files in the database. Instead, we're gonna make separate trained files. These files are then made as packs.

Example packs :
* ml-basic pack: https://github.com/varnamproject/schemes/tree/master/schemes/ml/ml-basic
* ml-english pack: https://github.com/varnamproject/schemes/tree/master/schemes/ml/ml-english

Let's try making a pack called `ml-basic` for basic Malayalam words.

* Make a folder for our pack
```
mkdir ml-basic
```

* Copy the frequency report file :
```
cp <path-to-frequency-report.txt> ./report.txt
```

* Set Varnam environment variables :
```bash
export VARNAM_LEARNINGS_DIR=$(realpath .)
```
This makes Varnam store the learnings in the current folder. Any further varnam commands won't reflect on your system's varnam installation.

If you do `varnamcli -s ml -t hello`, you will get only 1 suggestion because the current folder's varnam learnings file doesn't have anything in it. Let's teach some words in the next step

* Make Varnam learn from the report :
```
varnamcli -s ml -learn-from-file report.txt
```
This will make a SQLite database file in the current folder called **`ml.vst.learnings`**

* You can also make Varnam use a specific pattern for a word :
```
varnamcli -s ml -train firefox=ഫയർഫോക്സ്
```
This also gets stored in the `ml.vst.learnings` file. See more on this [here](/docs/learning)

* Export the learnings from the file :
```
varnamcli -s ml -export "ml-basic"
```
There will be sometimes be more than one output file (Read [Export docs](/docs/learning/#export-learnings)). These outputs will be different versions of our pack. The outputs are sorted according to confidence. Less important words end up on last files. So, `ml-basic-1.vlf` will have the words of most importance.

* Make a file `pack.json` containing information about the pack :
```
{
  "identifier": "ml-basic",
  "name": "Malayalam Basic",
  "description": "Collection of Malayalam words sourced from Wikipedia",
  "lang": "ml",
  "versions": [
    {
      "identifier": "ml-basic-1",
      "version": 1,
      "description": "Words with highest confidence",
      "size": 12481353
    },
    {
      "identifier": "ml-basic-2",
      "version": 2,
      "description": "Words with confidence lesser than 95",
      "size": 11814988
    },
    {
      "identifier": "ml-basic-3",
      "version": 3,
      "description": "Words with confidence lesser than 3",
      "size": 10461558
    },
    {
      "identifier": "ml-basic-4",
      "version": 4,
      "description": "Words with confidence 1",
      "size": 7556327
    }
  ]
}
```
The value of `size` is in bytes (Use `ls -la` to get size in bytes). The description for each version can be made according to the file's contents. Open the file and find the highest confidence value (will be in the first line itself).
* That's it! You've successfully made a pack, now zip the files and send it to Varnam maintainer :
```
zip pack.zip pack.json report ml-*
```
