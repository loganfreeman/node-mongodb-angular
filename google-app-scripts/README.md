<h1>A script to generate a tree for all the js files in a folder</h1>
## Usage
<code>node GenerateDoc.js path/to/google-app-scripts/</code>


## jsdoc config file
<code>
	

{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "source": {
        "includePattern": ".+\\.gs(doc)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": [
                "plugins/summarize",
                "plugins/markdown"
                ],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    },
    "opts": {
        "encoding": "utf8",               // same as -e utf8
        "destination": "./docs/",          // same as -d ./out/
        "recurse": true,
        "readme": "./README.md"
    }
}

</code>