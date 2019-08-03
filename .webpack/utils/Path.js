const { resolve } = require("path")

const ensureArray = (object) => {
  if (object === undefined) {
    return []
  }

  if (object instanceof Array)
    return object

  return [object]
}

const create = (prefixs = []) => {
  const prefixArray = ensureArray(prefixs) 
  return (...paths) => {
    return resolve(...prefixArray, ...ensureArray(paths))
  }
}

const extract = (folderPathOrNestedMapping) => {
  if (folderPathOrNestedMapping instanceof Object) {
    const { root: folderPath, ...nestedMapping } = folderPathOrNestedMapping
    return {folderPath, nestedMapping}
  }
  return {
    folderPath: folderPathOrNestedMapping,
    nestedMapping: {}
  }
}

const Path = (rootDirectory, mapping) => {
  const root = create(rootDirectory)

  Object.keys(mapping)
    .reduce((acc, name) => {
      const folderPathOrNestedMapping = mapping[name]

      if (folderPathOrNestedMapping === undefined) {
        throw `${name} can not be undefined`
      }

      const {folderPath, nestedMapping} = extract(folderPathOrNestedMapping)

      const absoluateFolderPath = acc(folderPath)
      acc[name] = Path(absoluateFolderPath, nestedMapping)
      
      return acc

    }, root)

  return root
}

module.exports = Path