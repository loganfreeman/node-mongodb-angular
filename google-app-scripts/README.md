<h1>A script to generate a tree for all the js files in a folder</h1>
## Usage
<code>node GenerateDoc.js path/to/google-app-scripts/</code>

<p>
    start a web server serving the jsdoc files.
    The <code>GenerateDoc.js</code> will generate documentation files at docs directory. The web server will serve them at docs directory. The web server listens at port 3000.
    
    <code>
        cd server

        npm install 

        npm start

    </code>

</p>


## jsdoc config file

```json	
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
        "encoding": "utf8",               
        "destination": "./docs/",          
        "recurse": true,
        "readme": "./README.md"
    }
}

```