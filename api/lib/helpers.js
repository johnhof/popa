var _  = require('lodash');
var fs = require('fs');


// recurse through the components directories and init every js file with the server instance
exports.initComponents = function (path, server) {
  // use a recursive tree mapper to retrieve the object
  var resultObj = subTreeObj({}, path);

  // recursive tree for requiring js files
  function subTreeObj (currentLeaf, currentPath) {

    // for the current leaf, iterate over its matching directory
    var currentContents = exports.getDirContents(currentPath);
    _.each(currentContents, function (content) {
      if (!currentLeaf[content.name]) {
        currentLeaf[content.name] = {};
      }

      // if this is is a file, require it as a property of this leaf
      if (content.isJs) {
        var fileContent = require(content.path + '/' + content.name + content.extension);

        if (typeof fileContent === 'function') {
          currentLeaf[content.name] = _.clone(fileContent(server), true);

        } else if (Object.keys(fileContent).length) {
          console.log('adding2')
          currentLeaf[content.name] = _.clone(fileContent, true);
        }

      // if it's a directory, recurse
      } else if (!content.isFile) {
        currentLeaf[content.name] = subTreeObj(_.clone(currentLeaf[content.name], true), content.path + '/' + content.name);
      }

    });

    return currentLeaf;
  }

  return resultObj;
}


// returns the an array of directories and an array of files from an directory
exports.getDirContents = function (path) {
  var results = _.map(fs.readdirSync(path) || [], function (content) {
    if (!content) return;

    var match  = content.match(/(.*?)(\..*)$/) || []
    var result = {
      string    : path + '/' + content,
      name      : match[1] || content,
      path      : path,
      extension : match[2] || null,
      isJs      : /\.js$/.test(content),
      isFile    : !fs.statSync(path + '/' + (match[1] || content) + (match[2] || '')).isDirectory()
    };

    return result;
  });

  return results;
}

