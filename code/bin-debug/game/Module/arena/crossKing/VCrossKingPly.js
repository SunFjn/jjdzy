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
var VCrossKingPly = (function (_super) {
    __extends(VCrossKingPly, _super);
    function VCrossKingPly() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.type = 1;
        return _this;
    }
    VCrossKingPly.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossKingPly"));
    };
    VCrossKingPly.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.btnChallenge.addClickListener(self.onChallenge, self);
        self.btSao.addClickListener(self.onSaoDan, self);
        self.btnChallenge.alpha = 0;
        self.btSao.visible = false;
    };
    Object.defineProperty(VCrossKingPly.prototype, "vo", {
        set: function (v) {
            var self = this;
            self._vo = v;
            if (v) {
                if (!self.awatar) {
                    self.awatar = UIRole.create();
                    self.awatar.setPos(self.imgBg.x, self.imgBg.y - 30);
                }
                self.lbName.text = v.name;
                self.lbPower.text = "战斗力：" + ConfigHelp.numToStr(v.power);
                self.lbRank.text = "排行" + v.rank;
                self.btnChallenge.touchable = true;
                var fscfg = Config.sz_739[v.job];
                var moxing = 0;
                if (fscfg) {
                    moxing = fscfg.moxing;
                    self.awatar.setBody(moxing);
                    self.awatar.setWeapon(v.job);
                }
                else {
                    moxing = v.job;
                    self.awatar.setBody(moxing);
                    self.awatar.setWeapon(moxing);
                }
                self.awatar.setGodWeapon(v.godWeapon);
                self.awatar.setHorseId(v.horseId);
                if (v.horseId) {
                    self.awatar.setScaleXY(0.6, 0.6);
                }
                else {
                    self.awatar.setScaleXY(1, 1);
                }
                self.awatar.uiparent = self.displayListContainer;
                self.awatar.onAdd();
                self.addChild(self.btnChallenge);
                //扫荡
                if (Model_CrossKing.myGrade >= 13 && Model_CrossKing.myRank < v.rank && Model_player.voMine.str > v.power) {
                    self.btSao.visible = true;
                }
                else {
                    self.btSao.visible = false;
                }
            }
            else {
                self.lbName.text = "暂无";
                self.lbPower.text = "";
                self.lbRank.text = "";
                self.btnChallenge.touchable = false;
                self.removeListen();
                self.btSao.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    VCrossKingPly.prototype.onChallenge = function () {
        var self = this;
        if (!self._vo) {
            return;
        }
        if (Model_CrossKing.battleCount > 0 || Model_Bag.getItemCount(Model_CrossKing.ITEM_ID) > 0) {
            GGlobal.modelCrossKing.CG_CHALLENGE(self.type, self._vo.index, self._vo.sid);
        }
        else {
            Model_CrossKing.onAdd();
        }
    };
    VCrossKingPly.prototype.onSaoDan = function () {
        GGlobal.modelCrossKing.CG_SAO_DAN(this._vo.sid);
    };
    VCrossKingPly.prototype.removeListen = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
    };
    VCrossKingPly.URL = "ui://me1skowlhfct3q";
    return VCrossKingPly;
}(fairygui.GComponent));
__reflect(VCrossKingPly.prototype, "VCrossKingPly");
