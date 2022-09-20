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
var CGYLItem = (function (_super) {
    __extends(CGYLItem, _super);
    function CGYLItem() {
        var _this = _super.call(this) || this;
        _this.sid = 0;
        _this.tid = 0;
        return _this;
    }
    CGYLItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("chuangguanYL", "CGYLItem"));
    };
    CGYLItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
        this.btnGo = (this.getChild("btnGo"));
        this.btnGet = (this.getChild("btnGet"));
        this.n5 = (this.getChild("n5"));
        this.n6 = (this.getChild("n6"));
        this.btnGet.checkNotice = true;
    };
    CGYLItem.prototype.openLink = function () {
        GGlobal.layerMgr.close(UIConst.CHUANGGUANYOULI);
        GGlobal.layerMgr.open(this.sid);
    };
    CGYLItem.prototype.getHD = function () {
        GGlobal.modelChuangGuanYL.CG_LQ_4153(this.tid);
    };
    CGYLItem.prototype.clean = function () {
        var sf = this;
        this.n1.vo = null;
        sf.btnGo.removeClickListener(sf.openLink, sf);
        sf.btnGet.removeClickListener(sf.getHD, sf);
    };
    CGYLItem.prototype.setdta = function (dta) {
        if (!dta)
            return;
        var id = dta[0];
        var sf = this;
        var st = dta[1];
        var progres = dta[2];
        var m = GGlobal.modelChuangGuanYL;
        sf.tid = id;
        var cfg = Config.cgylrw_262[id];
        sf.sid = cfg.open;
        sf.n2.text = cfg.name;
        var max = cfg.cs;
        if (cfg.type == 2)
            max = ConfigHelp.getYiWanText(max);
        sf.n5.text = ConfigHelp.getYiWanText(progres) + "/" + ConfigHelp.getYiWanText(max);
        sf.n1.tipEnabled = true;
        sf.n1.isShowEff = true;
        var vo = ConfigHelp.makeItem(JSON.parse(cfg.reward)[0]);
        sf.n1.vo = vo;
        sf.btnGo.visible = st == 0;
        sf.btnGet.visible = st == 1;
        sf.n6.visible = st == 2;
        sf.n5.visible = st == 0;
        sf.btnGo.addClickListener(sf.openLink, sf);
        sf.btnGet.addClickListener(sf.getHD, sf);
    };
    CGYLItem.URL = "ui://nf66suj6lkx84";
    return CGYLItem;
}(fairygui.GComponent));
__reflect(CGYLItem.prototype, "CGYLItem");
