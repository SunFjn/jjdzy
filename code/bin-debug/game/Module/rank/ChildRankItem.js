var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ChildRankItem = (function (_super) {
    __extends(ChildRankItem, _super);
    function ChildRankItem() {
        return _super.call(this) || this;
    }
    ChildRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("rank", "ChildRankItem"));
    };
    ChildRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.labLevel.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
    };
    ChildRankItem.prototype.setTxt = function (txt, obj) {
        this.labLevel.text = txt;
        this._obj = obj;
    };
    ChildRankItem.prototype.resize = function () {
        this.x = this._obj.x + this._obj.width / 2 - this.width / 2;
    };
    ChildRankItem.URL = "ui://y2wvab26kjeze";
    return ChildRankItem;
}(fairygui.GComponent));
__reflect(ChildRankItem.prototype, "ChildRankItem");
