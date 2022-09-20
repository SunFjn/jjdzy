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
var YanHui_ApplyListItem = (function (_super) {
    __extends(YanHui_ApplyListItem, _super);
    function YanHui_ApplyListItem() {
        return _super.call(this) || this;
    }
    YanHui_ApplyListItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "YanHui_ApplyListItem"));
    };
    YanHui_ApplyListItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YanHui_ApplyListItem.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        self.contentLb.text = HtmlUtil.fontNoSize(vo.name, Color.GREENSTR) + "前来赴宴";
        self.bt0.addClickListener(self.OnBt0, self);
        self.bt1.addClickListener(self.OnBt1, self);
    };
    YanHui_ApplyListItem.prototype.OnBt1 = function () {
        var model = GGlobal.modelYanHui;
        model.CG11483(1, this.vo.rid);
    };
    YanHui_ApplyListItem.prototype.OnBt0 = function () {
        var model = GGlobal.modelYanHui;
        model.CG11483(0, this.vo.rid);
    };
    YanHui_ApplyListItem.prototype.clean = function () {
        var self = this;
        self.bt0.removeClickListener(self.OnBt0, self);
        self.bt1.removeClickListener(self.OnBt1, self);
    };
    YanHui_ApplyListItem.URL = "ui://4x7dk3lhowxnz";
    return YanHui_ApplyListItem;
}(fairygui.GComponent));
__reflect(YanHui_ApplyListItem.prototype, "YanHui_ApplyListItem");
