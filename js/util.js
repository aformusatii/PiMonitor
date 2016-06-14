// Used by nodeJS
var module = {};

function traverseItems(items, itemHandler) {
    for (var prop in items) {
        if (!items.hasOwnProperty(prop)) {
            continue;
        }
        
        itemHandler(items[prop], prop);
    }
}