/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var SuperMarblesPoolItem = (function (_super) {
    __extends(SuperMarblesPoolItem, _super);
    function SuperMarblesPoolItem() {
        return _super.call(this) || this;
    }
    SuperMarblesPoolItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("superMarbles", "SuperMarblesPoolItem"));
    };
    SuperMarblesPoolItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    SuperMarblesPoolItem.prototype.clean = function () {
        this.list.numItems = 0;
    };
    SuperMarblesPoolItem.prototype.update = function (idx) {
        var self = this;
        var model = GGlobal.modelSuperMarbles;
        var cfg = model.cfg[idx];
        self.lbTitle.text = BroadCastManager.reTxt("{0}等奖", idx + 1);
        ConfigHelp.createViewGridList(self.list, cfg.show, self);
    };
    SuperMarblesPoolItem.URL = "ui://gf2tw9lzx9uy5";
    return SuperMarblesPoolItem;
}(fairygui.GComponent));
__reflect(SuperMarblesPoolItem.prototype, "SuperMarblesPoolItem");
