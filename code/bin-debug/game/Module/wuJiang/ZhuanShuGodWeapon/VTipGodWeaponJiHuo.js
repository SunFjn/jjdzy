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
var VTipGodWeaponJiHuo = (function (_super) {
    __extends(VTipGodWeaponJiHuo, _super);
    function VTipGodWeaponJiHuo() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    VTipGodWeaponJiHuo.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("wuJiang", "VTipGodWeaponJiHuo").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.btnHand.addClickListener(self.closeEventHandler, self);
        _super.prototype.childrenCreated.call(this);
    };
    VTipGodWeaponJiHuo.prototype.closeEventHandler = function () {
        var layerMgr = GGlobal.layerMgr;
        if (layerMgr.isOpenView(UIConst.ZS_GODWEAPON)) {
            var panel = layerMgr.getView(UIConst.ZS_GODWEAPON);
            panel.openPanel(10);
        }
        else {
            GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON);
        }
        _super.prototype.closeEventHandler.call(this, null);
    };
    VTipGodWeaponJiHuo.prototype.showDetail = function (vo) {
        var self = this;
        if (self.godWeaponEff) {
            EffectMgr.instance.removeEff(self.godWeaponEff);
            self.godWeaponEff = null;
        }
        if (vo.bodyIDArr[vo.bodyIDArr.length - 1] == vo.cfg.bianhao) {
            self.nameLb.text = vo.cfg.name;
            self.btnHand.text = "前往使用";
            self.jihuoLb.text = ConfigHelp.reTxt("激活神兵·{0}", vo.cfg.name);
            self.godWeaponEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.bwIcon.displayObject, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000);
        }
        else {
            var cfg = Config.sbpf_750[vo.bodyIDArr[vo.bodyIDArr.length - 1]];
            self.nameLb.text = cfg.mz;
            self.btnHand.text = "前往穿戴";
            self.jihuoLb.text = ConfigHelp.reTxt("激活神兵·{0}的新皮肤", vo.cfg.name);
            self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg.zs, self.bwIcon.displayObject, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000);
        }
    };
    VTipGodWeaponJiHuo.prototype.onShown = function () {
        this.showDetail(this._args);
    };
    VTipGodWeaponJiHuo.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.ZS_GODWEAPON_BODY_SHOW);
        if (self.godWeaponEff) {
            EffectMgr.instance.removeEff(self.godWeaponEff);
            self.godWeaponEff = null;
        }
    };
    return VTipGodWeaponJiHuo;
}(UIModalPanel));
__reflect(VTipGodWeaponJiHuo.prototype, "VTipGodWeaponJiHuo");
