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
var ItemShaoZhuTarget = (function (_super) {
    __extends(ItemShaoZhuTarget, _super);
    function ItemShaoZhuTarget() {
        return _super.call(this) || this;
    }
    ItemShaoZhuTarget.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "ItemShaoZhuTarget"));
    };
    ItemShaoZhuTarget.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.itemRender;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        self.btnGet.checkNotice = true;
        self.btnRec.addClickListener(self.openView, self);
        self.btnGet.addClickListener(self.getHD, self);
    };
    ItemShaoZhuTarget.prototype.openView = function () {
        GGlobal.layerMgr.open(this.panelid);
    };
    ItemShaoZhuTarget.prototype.getHD = function () {
        GGlobal.modelShaoZhuAct.CG_GET_TAGERT(this.idx);
    };
    ItemShaoZhuTarget.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._awards[idx];
    };
    ItemShaoZhuTarget.prototype.clean = function () {
        this.list.numItems = 0;
    };
    ItemShaoZhuTarget.prototype.setdata = function (data) {
        var id = data.id;
        var st = data.st;
        var pro = data.pro;
        var cfg = Config.scqrmb_272[id];
        var s = this;
        s.panelid = cfg.open;
        s.idx = id;
        s._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        s.list.numItems = s._awards.length;
        var term;
        var condition = cfg.c1;
        var type = (id / 1000) >> 0;
        if (pro >= condition) {
            term = BroadCastManager.reTxt(cfg.name + "<font color='#15f234'>({0}/{1})</font>", ConfigHelp.numToStr(pro), ConfigHelp.numToStr(condition));
        }
        else {
            term = BroadCastManager.reTxt(cfg.name + "<font color='#fe0000'>({0}/{1})</font>", ConfigHelp.numToStr(pro), ConfigHelp.numToStr(condition));
        }
        s.lab.text = term;
        s.btnRec.visible = st == 0;
        s.btnGet.visible = st == 1;
        s.imgGet.visible = st == 2;
    };
    ItemShaoZhuTarget.URL = "ui://w5ll6n5j6hpm5";
    return ItemShaoZhuTarget;
}(fairygui.GComponent));
__reflect(ItemShaoZhuTarget.prototype, "ItemShaoZhuTarget");
