
+++
fragment = "content"
#disabled = true
date = "2021-09-01"
weight = 100


[sidebar]
  enable = true
  sticky = true
+++
## Terms

* Corpus: A corpus is a language resource consisting of a large and structured set of texts.
* ml: Malayalam scheme identifier. Varnam scheme identifier doesn't necessarily need to be a [language code](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes). Example: `ml-inscript` scheme exists too (for Malayalam with inscript layout).
* Frequency: How much a certain word is occuring
* Confidence: When varnam predicts, it picks words sorted by the highest confidence. This value of a word increases as user chooses it more [This process is called varnam learn].
* Pack: A language pack is a new feature in Varnam. A language pack is a set of trained varnam files that can be imported into any Varnam instance. Public packs: https://kde.smc.org.in:8123/packs/ml

## Prerequisites

* Install [libvarnam fork](https://github.com/subins2000/libvarnam/tree/merge-all-mychanges) [branch merge-all-mychanges]

## Importing New Words Into Varnam

### Ordinary File [Learn]

Varnam can import Indic language words from a file :
```bash
varnamc -s ml --learn-from-file filename.txt
```
`filename.txt` can be any kind of file, an HTML web page or any digital file where there are words to learn. Varnam finds words, calculate the frequency of that word in the file and learns from it. The **frequency determines the confidence** of that word i.e if the word "ഒരിക്കൽ" (orikkal) is found in the file 100 times and "ഒരിടത്ത്" (oriTathth) is found 50 times, then after learning, `varnamc -s ml -t ori` gives :
```
ഒരിക്കൽ
ഒരിടത്ത്
ഒരി
```

### Frequency File [Learn]

A frequency file looks like this (`<word> <frequency>`) :
```
മലയാളം 120
ഒരിക്കൽ 100
ഒരിടത്ത് 50
```
This file can be imported to Varnam with the same command :
```bash
varnamc -s ml --learn-from-file word-frequency.txt
```
What's different here is that the second frequency value is already calculated. These files are available [here](https://github.com/varnamproject/libvarnam#word-corpus).

### Trained File

Importing words using the two options above can be slow depending on the number of words, because Varnam has to learn and make patterns from each of those words.

An alternative is to import trained files. A trained file is an output from an existing Varnam installation. You can get an export from your Varnam installation with :
```bash
mkdir folder
varnamc -s ml --export-full folder
```
Exporting might take a lot of time depending on the amount of words your Varnam installation have. The exported file is in JSON format. Sample :
```json
[
  {
    "word": "എന്നു",
    "confidence": 13079,
    "patterns": [
      {
        "pattern": "ennu",
        "learned": 1
      }
    ]
  },
  {
    "word": "എന്ന",
    "confidence": 12933,
    "patterns": [
      {
        "pattern": "enna",
        "learned": 1
      },
      {
        "pattern": "ennaa",
        "learned": 0
      }
    ]
  },
  ...
]
```

The exported files can be imported to another Varnam installation with :
```bash
varnamc -s ml --import-learnings-from 0.words.txt
```
This import will be considerably faster than importing using the learn methods above.

## Making A Frequency File

* Gather data from websites, social media etc. into `.txt` files. Sample :
```
ml-wikipedia-article-india.txt
ml-wikipedia-article-kerala.txt
```
  How to gather data ? See section below
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

To remove same words from first frequency report :
```
awk 'NR==FNR{a[$1]=1;next}!a[$1]' wikipedia-frequency-report.txt luca-frequency-report.txt > luca.txt
```
Now `luca.txt` will only have words from `luca-frequency-report.txt` that is not in `wikipedia-frequency-report.txt`. This file can then be renamed `ml-luca-pack` and shared. Doing so, we can assume that `ml-luca-pack` will only have **Science related words**.

To combine words from two frequency reports (`report1` & `report2`) :
```
awk '{ count[$1] += $2 } END { for(elem in count) print elem, count[elem] }' report1 report2 | sort -gr -t " " -k 2 > report
```
Now, `report` will have combined result. The frequency count will be summed up too.

### Gather Data

You will need to find ways to scrape data from websites (Python is mostly used for this) or use public datasets. Some scrapers :
* [luca.co.in scraper](https://github.com/joicemjoseph/luca-science-dictionary-scraper)
* [Newspaper website scraper](https://github.com/vanangamudi/newspaper-crawler-scripts)
* [Instagram scraper](https://gist.github.com/subins2000/3e0934fd6f62483e3d0a65852515e4f0)

Public datasets:
* [AI4Bharat-IndicNLP Dataset](https://github.com/AI4Bharat/indicnlp_corpus)
* [IndicNLP](https://indicnlp.org/)
* [SMC Corpus](https://gitlab.com/smc/corpus/-/tree/master)

## Making New Packs

Doing a Varnam export will export all the files in the database. Instead, we're gonna make separate trained files. These files are then made as packs. Example packs :
* https://kde.smc.org.in:8123/packs/ml (All Malayalam language packs)
* https://kde.smc.org.in:8123/packs/ml/ml-basic/ml-basic-1/download (Download pack ml-basic's 1st version)

Here are the steps to make a pack :
* Make a folder for our pack (`ml-basic`)
```
mkdir ml-basic
```
* Copy the frequency report file :
```
cp <path-to-frequency-report.txt> ./report
```
* Set Varnam environment variables :
```bash
export VARNAM_SUGGESTIONS_DIR=$(realpath .)
```
This makes Varnam store the learnings in the current folder. Any further varnam commands won't reflect on your system's varnam installation. The system varnam's storage (learnings) file is at `/home/<user>/.local/share/varnam/suggestions/ml.vst.learnings`.

If you do `varnamc -s ml -t hello`, you will get only 1 suggestion because the current folder's varnam learnings file doesn't have anything in it. Let's teach some words in the next step
* Make Varnam learn from the report :
```
varnamc -s ml --learn-from report
```
This will make a SQLite database file in the current folder called **`ml.vst.learnings`**
* You can also make Varnam use a specific pattern for a word :
```
varnamc -s ml --train firefox=ഫയർഫോക്സ്
```
This also gets stored in the `ml.vst.learnings` file. To import such words from a file, use `varnamc --train-from`
* Export the learnings from the file :
```
varnamc -s ml --export-full .
```
There will be sometimes be more than one output. These outputs will be different versions of our pack. The outputs are sorted according to confidence. Less important words end up on last files. So, `0.words.txt` will have the words of most importance.
* Change filenames according to our pack :
```bash
export PACK_PREFIX=ml-basic-
i=1; find . -type f -name "*words.txt" | sort -V | while read filename; do mv $filename $PACK_PREFIX$i.vpf; i=$(($i+1)); done;
```
This will change filenames like this :
```
0.words.txt -> ml-basic-1.vpf
1.words.txt -> ml-basic-2.vpf
2.words.txt -> ml-basic-3.vpf
```
VPF is Varnam Pack File. It's basically just a text file with a fancy extension
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
