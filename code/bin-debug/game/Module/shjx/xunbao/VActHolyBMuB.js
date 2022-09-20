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
var VActHolyBMuB = (function (_super) {
    __extends(VActHolyBMuB, _super);
    function VActHolyBMuB() {
        return _super.call(this) || this;
    }
    VActHolyBMuB.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "VActHolyBMuB"));
    };
    VActHolyBMuB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbPoint = (this.getChild("lbPoint"));
        this.list = (this.getChild("list"));
        this.btnGet = (this.getChild("btnGet"));
        this.imgHas = (this.getChild("imgHas"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnGet.addClickListener(this.onGet, this);
    };
    VActHolyBMuB.prototype.setVo = function (v, index) {
        if (index === void 0) { index = 0; }
        this._vo = v;
        var cfg = Config.ssshxbmb_268[v.id];
        var xbQuan = GGlobal.modelSHXunbao.xbQuan;
        var colors = xbQuan >= cfg.q ? Color.GREENSTR : Color.REDSTR;
        xbQuan = xbQuan >= cfg.q ? cfg.q : xbQuan;
        this.lbPoint.text = "寻宝" + HtmlUtil.fontNoSize("(" + xbQuan + "/" + cfg.q + ")", colors) + "圈";
        this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        this.list.numItems = this._listData.length;
        if (v.status == 2) {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.imgHas.visible = true;
        }
        else if (v.status == 1 || xbQuan >= cfg.q) {
            this.btnGet.checkNotice = this.btnGet.touchable = this.btnGet.visible = true;
            this.imgHas.visible = false;
        }
        else {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.imgHas.visible = false;
        }
    };
    VActHolyBMuB.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    VActHolyBMuB.prototype.onGet = function () {
        GGlobal.modelSHXunbao.CG_XUNBAO_GOAL(this._vo.id);
    };
    VActHolyBMuB.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VActHolyBMuB.URL = "ui://4aepcdbwwg9y52";
    return VActHolyBMuB;
}(fairygui.GComponent));
__reflect(VActHolyBMuB.prototype, "VActHolyBMuB");
