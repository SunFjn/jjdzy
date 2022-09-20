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
var ItemLeiTai = (function (_super) {
    __extends(ItemLeiTai, _super);
    function ItemLeiTai() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    ItemLeiTai.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComLeiTai", "ItemLeiTai"));
    };
    ItemLeiTai.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btn.addClickListener(s.onReward, s);
    };
    ItemLeiTai.prototype.setVo = function (v, idx) {
        var self = this;
        self._vo = v;
        if (idx == 0) {
            self.lbTil0.text = v.cfg.name;
            self.lbTil1.text = "";
        }
        else {
            self.lbTil0.text = "";
            self.lbTil1.text = v.cfg.name;
        }
        var ply = v.plyArr ? v.plyArr[0] : null;
        if (ply && (ply.npcId > 0 || ply.szId > 0)) {
            if (!self.awatar) {
                self.awatar = UIRole.create();
                self.awatar.setPos(0, 0);
                self.awatar.uiparent = self.uirole.displayObject;
                self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
            }
            var moxing = 0;
            if (ply.npcId) {
                self.awatar.setBody(ply.npcCfg.mod);
                if (ply.npcCfg.weapon) {
                    self.awatar.setWeapon(ply.npcCfg.mod);
                }
                else {
                    self.awatar.setWeapon(null);
                }
                self.awatar.setGodWeapon(0);
                self.awatar.setHorseId(0);
                self.lbName.text = ply.npcCfg.name;
            }
            else {
                var fscfg = Config.sz_739[ply.szId];
                if (fscfg) {
                    moxing = fscfg.moxing;
                    self.awatar.setBody(moxing);
                    self.awatar.setWeapon(ply.szId);
                }
                else {
                    moxing = ply.szId;
                    self.awatar.setBody(moxing);
                    self.awatar.setWeapon(moxing);
                }
                self.awatar.setGodWeapon(ply.godWeapon);
                self.awatar.setHorseId(ply.horseId);
                if (ply.horseId) {
                    self.awatar.setScaleXY(0.6, 0.6);
                }
                else {
                    self.awatar.setScaleXY(1, 1);
                }
                var modCfg = Config.mod_200[ply.szId];
                self.lbName.text = ply ? ply.name : "";
            }
            self.awatar.onAdd();
            self.gName.visible = true;
            var len = 0; //除去空值
            for (var i = 0; i < v.plyArr.length; i++) {
                if (v.plyArr[i]) {
                    len++;
                }
            }
            self.lbCt.text = "人数:   " + len + "/3";
        }
        else {
            self.clearAwa();
            self.lbName.text = "";
            self.gName.visible = false;
            self.lbCt.text = "";
        }
    };
    Object.defineProperty(ItemLeiTai.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    ItemLeiTai.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.clearAwa();
    };
    ItemLeiTai.prototype.clearAwa = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
    };
    ItemLeiTai.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.ACTCOM_LEITAI_REWARD, this._vo);
    };
    ItemLeiTai.URL = "ui://rhfap29in0931";
    return ItemLeiTai;
}(fairygui.GButton));
__reflect(ItemLeiTai.prototype, "ItemLeiTai");
