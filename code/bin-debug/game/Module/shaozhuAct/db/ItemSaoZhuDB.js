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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ItemSaoZhuDB = (function (_super) {
    __extends(ItemSaoZhuDB, _super);
    function ItemSaoZhuDB() {
        var _this = _super.call(this) || this;
        _this._remaindCount = 0;
        return _this;
    }
    ItemSaoZhuDB.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "ItemSaoZhuDB"));
    };
    ItemSaoZhuDB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ItemSaoZhuDB.prototype.clean = function () {
        var s = this;
        s.n0.showEff(false);
        s.n0.tipEnabled = false;
        s.n9.removeClickListener(s.openView, s);
        s.n3.removeClickListener(s.CG_GET, s);
    };
    ItemSaoZhuDB.prototype.openView = function (e) {
        GGlobal.layerMgr.open(UIConst.CHONGZHI);
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    ItemSaoZhuDB.prototype.CG_GET = function () {
        GGlobal.modelShaoZhuAct.CG_GET_SINGLE(this._idx);
    };
    ItemSaoZhuDB.prototype.setdata = function (data) {
        var s = this;
        var cfg = Config.scdnfl_272[data.id];
        s._idx = data.id;
        s.n0.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
        this.n0.showEff(true);
        this.n0.tipEnabled = true;
        s.lbTitle.text = BroadCastManager.reTxt("<font color='#ffffff'>{0}</font><font color='#ffc334'>*{1}</font>", s.n0.vo.name, data.count);
        s.n2.text = BroadCastManager.reTxt("<font color='#ffffff'>获取上限：</font><font color='#ffc334'>{0}/{1}</font>", data.maxCount, cfg.time);
        s.n8.visible = data.maxCount >= cfg.time && data.st == 2;
        s.n3.visible = data.st == 1;
        s.n9.visible = data.st == 0 || (data.maxCount < cfg.time && data.st == 2);
        s.n3.checkNotice = true;
        s.n3.addClickListener(s.CG_GET, s);
        s.n9.addClickListener(s.openView, s);
    };
    ItemSaoZhuDB.URL = "ui://w5ll6n5jykxmc";
    return ItemSaoZhuDB;
}(fairygui.GComponent));
__reflect(ItemSaoZhuDB.prototype, "ItemSaoZhuDB");
