
exports.pathName = () => {
    const pathArray = __dirname.split("/");
    pathArray.splice(-1,1);
    const rootPath = pathArray.join("/")
    return rootPath
}