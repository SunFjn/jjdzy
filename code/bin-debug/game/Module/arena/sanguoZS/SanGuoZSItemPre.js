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
var SanGuoZSItemPre = (function (_super) {
    __extends(SanGuoZSItemPre, _super);
    function SanGuoZSItemPre() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    SanGuoZSItemPre.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "SanGuoZSItemPre"));
    };
    SanGuoZSItemPre.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.battleBt.addClickListener(self.battleHandle, self);
        self.saodangBt.addClickListener(self.battleHandle, self);
    };
    SanGuoZSItemPre.prototype.battleHandle = function () {
        var s = this;
        SanGuoZSItem.onBattle(s.vo);
    };
    Object.defineProperty(SanGuoZSItemPre.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            var self = this;
            self._vo = vo;
            if (vo) {
                var headPic = Config.shezhi_707[vo.headId];
                self.rankLb.text = "第" + ConfigHelp.NumberToChinese(vo.rank) + "名";
                self.qizi.url = fairygui.UIPackage.getItemURL("Arena", "qizi" + vo.rank);
                self.nameLb.text = vo.name;
                var vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
                if (vo.roleId == Model_player.voMine.id) {
                    self.saodangBt.visible = false;
                    self.battleBt.visible = false;
                }
                else {
                    self.saodangBt.visible = false;
                    if (vipcfg && vipcfg.SAODANGJJC == 1) {
                        self.saodangBt.visible = Model_SGZS.myRank < vo.rank;
                        self.battleBt.visible = Model_SGZS.myRank > vo.rank;
                    }
                    else {
                        self.battleBt.visible = true;
                    }
                }
                if (!self.awatar) {
                    self.awatar = UIRole.create();
                    self.awatar.setPos(self.imgBg.width / 2, self.imgBg.y + 100);
                    self.awatar.setScaleXY(1, 1);
                }
                var fscfg = Config.sz_739[vo.job];
                var moxing = 0;
                if (fscfg) {
                    moxing = fscfg.moxing;
                    self.awatar.setBody(moxing);
                    self.awatar.setWeapon(vo.job);
                }
                else {
                    moxing = vo.job;
                    self.awatar.setBody(moxing);
                    self.awatar.setWeapon(moxing);
                }
                self.awatar.setGodWeapon(vo.godWeapon);
                self.awatar.setHorseId(vo.horseId);
                // if (vo.horseId) {
                // 	self.awatar.setScaleXY(0.6, 0.6);
                // } else {
                // 	self.awatar.setScaleXY(1, 1);
                // }
                self.awatar.uiparent = self.displayListContainer;
                self.awatar.onAdd();
                self.addChild(self.battleBt);
                self.addChild(self.saodangBt);
                self.addChild(self.powerLb);
                self.addChild(self.nameLb);
                self.addChild(self.qizi);
                self.addChild(self.rankLb);
                self.powerLb.text = vo.power + "";
                if (vo.horseId) {
                    var modH = Config.mod_200[moxing].zh;
                    self.boxName.y = self.imgBg.y + 100 - modH - 57;
                }
                else {
                    var modH = Config.mod_200[moxing].h;
                    self.boxName.y = self.imgBg.y + 100 - modH - 57;
                }
            }
            else {
            }
        },
        enumerable: true,
        configurable: true
    });
    SanGuoZSItemPre.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
    };
    SanGuoZSItemPre.URL = "ui://me1skowleia55y";
    return SanGuoZSItemPre;
}(fairygui.GComponent));
__reflect(SanGuoZSItemPre.prototype, "SanGuoZSItemPre");
