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
var ItemPig = (function (_super) {
    __extends(ItemPig, _super);
    function ItemPig() {
        var _this = _super.call(this) || this;
        _this.idx = 0;
        _this.cfgType = 0;
        _this._sysids = 0;
        return _this;
    }
    ItemPig.createInstance = function () {
        return (fairygui.UIPackage.createObject("shaozhuAct", "ItemPig"));
    };
    ItemPig.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.n2.callbackThisObj = self;
        self.n2.itemRenderer = self.itemRender;
        self.n2.setVirtual();
    };
    ItemPig.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._vos[idx];
    };
    ItemPig.prototype.clean = function () {
        this.n2.numItems = 0;
    };
    ItemPig.prototype.getHD = function () {
        GGlobal.modelShaoZhuAct.Cg_GET_PIG(this.idx, this.cfgType);
    };
    ItemPig.prototype.openHd = function () {
        GGlobal.layerMgr.open(this._sysids);
    };
    ItemPig.prototype.setdata = function (data) {
        var n = this;
        var m = GGlobal.modelShaoZhuAct;
        n.btnGet.addClickListener(n.getHD, n);
        n.btnGo.addClickListener(n.openHd, n);
        n.cfgType = data.type;
        var hasBuy = false;
        if (n.cfgType == ModelShaoZhuAct.GOLD) {
            n.lbTip.text = "购买金猪送财可领取";
            hasBuy = m.goldst == 1;
        }
        else {
            n.lbTip.text = "购买银猪送财可领取";
            hasBuy = m.silverst == 1;
        }
        n.lbTip.visible = !hasBuy;
        n.btnGet.checkNotice = true;
        n.btnGet.visible = data.st == 1 && hasBuy;
        n.btnGo.visible = data.st == 0 && hasBuy;
        n.imgYlq.visible = data.st == 2 && hasBuy;
        n.idx = data.id;
        var cfg = Config.pigrw_272[n.idx];
        n._sysids = cfg.open;
        var showType = data.type;
        var zz = showType == ModelShaoZhuAct.SILVER ? cfg.zz : cfg.zz1;
        var awards = showType == ModelShaoZhuAct.SILVER ? cfg.reward : cfg.reward1;
        var vos = ConfigHelp.makeItemListArr(JSON.parse(awards));
        n._vos = vos;
        n.n2.numItems = vos.length;
        n.lbBuff.text = BroadCastManager.reTxt("元宝增加+{0}%", zz);
        var color = data.count >= cfg.cs ? Color.GREENSTR : Color.REDSTR;
        n.lbpro.text = BroadCastManager.reTxt(cfg.name + "<font color='{0}'>({1}/{2})</font>", color, ConfigHelp.numToStr(data.count), ConfigHelp.numToStr(cfg.cs));
    };
    ItemPig.URL = "ui://w5ll6n5jhsa2g";
    return ItemPig;
}(fairygui.GComponent));
__reflect(ItemPig.prototype, "ItemPig");
