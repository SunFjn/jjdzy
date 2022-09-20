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
var Child_SanGuoYT_ZLPItem = (function (_super) {
    __extends(Child_SanGuoYT_ZLPItem, _super);
    function Child_SanGuoYT_ZLPItem() {
        return _super.call(this) || this;
    }
    Child_SanGuoYT_ZLPItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoYiTong", "Child_SanGuoYT_ZLPItem"));
    };
    Child_SanGuoYT_ZLPItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.btn.addClickListener(self.OnBtn, self);
    };
    Child_SanGuoYT_ZLPItem.prototype.setVo = function () {
        var self = this;
        // self.nameLb.text = 
    };
    Child_SanGuoYT_ZLPItem.prototype.OnBtn = function () {
    };
    Child_SanGuoYT_ZLPItem.URL = "ui://z4ijxlqkiv4oe";
    return Child_SanGuoYT_ZLPItem;
}(fairygui.GComponent));
__reflect(Child_SanGuoYT_ZLPItem.prototype, "Child_SanGuoYT_ZLPItem");
