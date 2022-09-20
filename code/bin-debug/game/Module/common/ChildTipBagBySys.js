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
var ChildTipBagBySys = (function (_super) {
    __extends(ChildTipBagBySys, _super);
    function ChildTipBagBySys() {
        return _super.call(this) || this;
    }
    ChildTipBagBySys.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ChildTipBagBySys"));
    };
    ChildTipBagBySys.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.t0 = self.getTransition("t0");
    };
    Object.defineProperty(ChildTipBagBySys.prototype, "vo", {
        set: function (v) {
            var self = this;
            var sys = v.cfg.sys;
            var tz = v.tzPas;
            if (self.godWeaponEff) {
                EffectMgr.instance.removeEff(self.godWeaponEff);
                self.godWeaponEff = null;
            }
            self.t0.setPaused(false);
            var cfg1;
            var effID = 0;
            switch (sys) {
                case UIConst.BAOWU:
                    cfg1 = Config.bao_214[tz];
                    IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                    break;
                case UIConst.TIANSHU:
                    cfg1 = Config.book_215[tz];
                    IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                    break;
                case UIConst.SHEN_JIAN:
                    cfg1 = Config.sword_216[tz];
                    effID = cfg1.tptx;
                    IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                    break;
                case UIConst.YIBAO:
                    cfg1 = Config.yb_217[tz];
                    effID = cfg1.tptx;
                    IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                    break;
                case UIConst.ZHAN_JIA:
                    cfg1 = Config.clothes_212[tz];
                    effID = cfg1.tptx;
                    IconUtil.setImg(self.pic, Enum_Path.ZHANJIA_URL + cfg1.pic + ".png");
                    break;
                case UIConst.BINGFA:
                    cfg1 = Config.book_213[tz];
                    effID = cfg1.tptx;
                    IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg1.pic + ".png");
                    break;
                case UIConst.ZS_GODWEAPON:
                    IconUtil.setImg(self.pic, null);
                    var cfg7 = Config.sb_750[tz];
                    self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg7.picture, self.pic.displayObject, self.pic.width / 2, self.pic.height / 2, 1000);
                    break;
                case UIConst.SHAOZHU:
                    IconUtil.setImg(self.pic, null);
                    var cfg8 = Config.son_267[tz];
                    self.t0.setPaused(true);
                    self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg8.zs, self.pic.displayObject, self.pic.width / 2, self.pic.height, 1000);
                    break;
                case UIConst.SHAOZHU_FASHION:
                    IconUtil.setImg(self.pic, null);
                    var cfg9 = Config.sonshow_267[tz];
                    self.t0.setPaused(true);
                    self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg9.zs, self.pic.displayObject, self.pic.width / 2, self.pic.height, 1000);
                    break;
                case UIConst.QICE_STAR:
                    var cfg10 = Config.qc_760[tz];
                    IconUtil.setImg(self.pic, Enum_Path.PIC_URL + cfg10.pic + ".png");
                    break;
                case UIConst.HORSE:
                case UIConst.HORSE_HH:
                    IconUtil.setImg(self.pic, null);
                    self.t0.setPaused(true);
                    var cfgHorse = Config.zq_773[tz];
                    self.godWeaponEff = EffectMgr.addEff("body/" + cfgHorse.model + "/ride_st/ani", self.pic.displayObject, self.pic.width / 2, self.pic.height, 1000);
                    break;
            }
            if (self.sysEff) {
                EffectMgr.instance.removeEff(self.sysEff);
                self.sysEff = null;
            }
            if (effID > 0) {
                self.sysEff = EffectMgr.addEff("uieff/" + effID, self.pic.displayObject, self.pic.width / 2, self.pic.height / 2, 1000, -1, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    ChildTipBagBySys.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self.pic, null);
        if (self.godWeaponEff) {
            EffectMgr.instance.removeEff(self.godWeaponEff);
            self.godWeaponEff = null;
        }
        if (self.sysEff) {
            EffectMgr.instance.removeEff(self.sysEff);
            self.sysEff = null;
        }
    };
    ChildTipBagBySys.URL = "ui://jvxpx9emq2i93g3";
    return ChildTipBagBySys;
}(fairygui.GComponent));
__reflect(ChildTipBagBySys.prototype, "ChildTipBagBySys");
