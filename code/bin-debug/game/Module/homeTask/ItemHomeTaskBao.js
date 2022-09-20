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
var ItemHomeTaskBao = (function (_super) {
    __extends(ItemHomeTaskBao, _super);
    function ItemHomeTaskBao() {
        var _this = _super.call(this) || this;
        _this.idx = 0;
        _this._st = 0;
        return _this;
    }
    ItemHomeTaskBao.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeTask", "ItemHomeTaskBao"));
    };
    ItemHomeTaskBao.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.addClickListener(s.clickHandler, s);
    };
    ItemHomeTaskBao.prototype.clickHandler = function (e) {
        var awards = Config.fdrcbx_019[this.idx].award;
        GGlobal.layerMgr.open(UIConst.HOME_TASK_BOX, { awards: awards, idx: this.idx });
    };
    ItemHomeTaskBao.prototype.update = function (st) {
        this._st = st;
        this.ctr1.setSelectedIndex(st);
    };
    ItemHomeTaskBao.URL = "ui://oy62ymetwhzh6";
    return ItemHomeTaskBao;
}(fairygui.GButton));
__reflect(ItemHomeTaskBao.prototype, "ItemHomeTaskBao");
