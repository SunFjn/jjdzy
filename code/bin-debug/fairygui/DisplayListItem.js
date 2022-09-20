var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var DisplayListItem = (function () {
        function DisplayListItem(packageItem, type) {
            this.packageItem = packageItem;
            this.type = type;
        }
        return DisplayListItem;
    }());
    fairygui.DisplayListItem = DisplayListItem;
    __reflect(DisplayListItem.prototype, "fairygui.DisplayListItem");
})(fairygui || (fairygui = {}));
