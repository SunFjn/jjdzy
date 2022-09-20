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
var VXuTianHunt = (function (_super) {
    __extends(VXuTianHunt, _super);
    function VXuTianHunt() {
        var _this = _super.call(this) || this;
        _this._frozen = false;
        return _this;
    }
    VXuTianHunt.createInstance = function () {
        return (fairygui.UIPackage.createObject("xuTian", "VXuTianHunt"));
    };
    VXuTianHunt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    VXuTianHunt.prototype.setVo = function (v) {
        var s = this;
        s.vo = v;
        if (v.type == 1) {
            s.setVoId(v.cfgId);
        }
        else {
            s.setVoBuf(v.cfgId);
        }
    };
    VXuTianHunt.prototype.setVoBuf = function (bufId) {
        var s = this;
        var buf = Config.xtwlbf_776[bufId];
        var bufArr = JSON.parse(buf.buff)[0];
        s._mx = buf.mx;
        s._frozen = true;
        s.unFrozen();
        s.buf.url = CommonManager.getUrl("xuTian", "buf" + buf.lx);
        s.buf.visible = true;
        s.grid.visible = false;
        s.cfgWith = Config.xtwlmx_776[buf.mx].jl;
    };
    VXuTianHunt.prototype.setVoId = function (huntId) {
        var s = this;
        var hunt = Config.xtwl_776[huntId];
        var item = ConfigHelp.makeItemListArr(JSON.parse(hunt.jl))[0];
        s.grid.vo = item;
        s.grid.visible = true;
        s.buf.visible = false;
        s._mx = hunt.mx;
        s._frozen = true;
        s.unFrozen();
        s.cfgWith = Config.xtwlmx_776[hunt.mx].jl;
    };
    VXuTianHunt.prototype.clean = function () {
        var self = this;
        self.grid.clean();
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
    };
    //设置冰冻
    VXuTianHunt.prototype.setFrozen = function () {
        var s = this;
        if (s._frozen) {
            return;
        }
        s._frozen = true;
        if (s.awatar) {
            EffectMgr.instance.removeEff(s.awatar);
            s.awatar = null;
        }
        if (s.vo.type == 1) {
            s.awatar = EffectMgr.addEff("body/" + s._mx + "/ride_st/ani", s.awaUI.displayObject, s.width / 2, s.height + 160, 1000, -1, true);
        }
        else {
            s.awatar = EffectMgr.addEff("body/" + s._mx + "/stand/ani", s.awaUI.displayObject, s.width / 2, s.height + 100, 1000, -1, true);
            s.awatar.mc.scaleX = s.awatar.mc.scaleY = 2;
        }
    };
    //解除冰冻
    VXuTianHunt.prototype.unFrozen = function () {
        var s = this;
        if (!s._frozen) {
            return;
        }
        s._frozen = false;
        if (s.awatar) {
            EffectMgr.instance.removeEff(s.awatar);
            s.awatar = null;
        }
        if (s.vo.type == 1) {
            s.awatar = EffectMgr.addEff("body/" + s._mx + "/ride/ani", s.awaUI.displayObject, s.width / 2, s.height + 160, 1000, -1, true);
        }
        else {
            s.awatar = EffectMgr.addEff("body/" + s._mx + "/run/ani", s.awaUI.displayObject, s.width / 2, s.height + 100, 1000, -1, true);
            s.awatar.mc.scaleX = s.awatar.mc.scaleY = 2;
        }
    };
    VXuTianHunt.URL = "ui://j0lk55yeg53a4";
    return VXuTianHunt;
}(fairygui.GComponent));
__reflect(VXuTianHunt.prototype, "VXuTianHunt");
