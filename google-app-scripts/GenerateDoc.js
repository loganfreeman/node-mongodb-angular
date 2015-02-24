/**
*
* A script that generates jsdoc for google app scripts
* @author scheng
* 
*
*/
var fse = require('fs-extra');
var fs = require('fs');
var path = require('path');
var colors = require('colors');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var webDocDir = 'docs/';

var beautify = require('js-beautify').js_beautify;

var arguments = process.argv.slice(2);
var scriptName = path.basename(process.argv[1]);
var usage = 'Usage: node ' + scriptName + ' path/to/google-app-scripts/';
if(arguments.length == 0){
    console.log(usage.green);
    process.exit(1);
}
var workspaceDir = arguments[0];



generateDoc();

var nodes = [];
var directoryid = 1;

function generateDoc() {
    fs.readdir(workspaceDir, function(err, files) {
        if (err) {
            throw err;
        }

        files
            .map(function(file) {
                return path.join(workspaceDir, file);
            })
            .filter(function(file) {
                return fs.statSync(file).isDirectory() && path.basename(file) != '.metadata';
            }).forEach(function(file) {
                console.log("%s".red, file);
                var dir = file;
                var node = {
                    "id" : directoryid++,
                    "title" : path.basename(dir),
                    "nodes" : []
                };
                nodes.push(node);
                var files = fs.readdirSync(file);

                var childid = 1;
                files.map(function(file) {
                        return path.join(dir, file);
                    })
                    .filter(function(file) {
                        return path.extname(file) === '.gs';
                    })
                    .forEach(function(file) {

                        var childnode = {
                            "id" : childid++,
                            "title" : path.basename(file),
                            "link" : webDocDir + node.title + '_' + path.basename(file) + '.html',
                            "nodes" : []
                        };

                        node.nodes.push(childnode);
                        var basename = path.basename(file);
                        var dir = path.dirname(file);
                        console.log("\t%s (%s)", dir, basename);
                        var ext = '.js';
                        var newname = (path.join(dir, basename.split('.')[0] + ext));
                        exec('cp -f \"' + file + '\" \"' + newname + '\"', function(err, stdout, stderr) {
                            if (err) {
                                console.log(err);
                            } else {

                            }
                        });

                    });
            });
            console.log('The end'.green);

            var json = beautify(JSON.stringify(nodes), { indent_size: 2 });
            // console.log(json.red);
            fs.writeFile('json/treeData.json', json, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('It\'s saved!');
                }
            });


    })
}