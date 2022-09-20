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
var SanGuoZSItem = (function (_super) {
    __extends(SanGuoZSItem, _super);
    function SanGuoZSItem() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        return _this;
    }
    SanGuoZSItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanguozs", "SanGuoZSItem"));
    };
    SanGuoZSItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.battleBt.addClickListener(self.battleHandle, self);
        self.saodangBt.addClickListener(self.battleHandle, self);
    };
    SanGuoZSItem.prototype.battleHandle = function () {
        var s = this;
        SanGuoZSItem.onBattle(s.vo);
    };
    SanGuoZSItem.onBattle = function (v) {
        if (Model_SGZS.battleNum > 0 || Model_Bag.getItemCount(Model_SGZS.ITEM_ID) > 0) {
            var vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
            if (Model_SGZS.myRank < v.rank && vipcfg && vipcfg.SAODANGJJC == 1) {
                GGlobal.modelsgzs.CG_SANGUO_ZHANSHEN_SAODANG(v.roleId);
            }
            else {
                if (v.rank <= 3 && Model_SGZS.myRank > 10) {
                    ViewCommonWarn.text("进入前10可挑战");
                    return;
                }
                GGlobal.modelsgzs.CG_BATTLE_SANGUO_ZHANSHEN(v.roleId, v.rank);
            }
        }
        else {
            SanGuoZSItem.buyHandle();
        }
    };
    SanGuoZSItem.buyHandle = function () {
        if (Model_SGZS.buyNum <= 0) {
            ViewCommonWarn.text("已达购买上限");
            return;
        }
        var costNum = Config.xtcs_004[1006].num;
        ;
        ViewAlertBuy.show(costNum, Model_SGZS.buyNum, Model_SGZS.buyNum, "", Handler.create(null, SanGuoZSItem.okHandle));
    };
    SanGuoZSItem.okHandle = function (count) {
        if (Model_player.voMine.yuanbao < Config.xtcs_004[1006].num * count) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelsgzs.CG_BUYNUM_SANGUO_ZHANSHEN(count);
    };
    Object.defineProperty(SanGuoZSItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            var self = this;
            self._vo = vo;
            if (vo) {
                var headPic = Config.shezhi_707[vo.headId];
                self.rankLb.text = "" + vo.rank;
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
                    self.awatar.setPos(self.imgBg.width / 2, self.imgBg.y + 6);
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
                self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
                self.awatar.onAdd();
                self.addChild(self.battleBt);
                self.addChild(self.saodangBt);
                self.addChild(self.rankLb);
                self.addChild(self.imgDi);
                self.addChild(self.imgMin);
                self.powerLb.text = vo.power + "";
                var modH = Config.mod_200[moxing].h;
                self.boxRank.y = self.imgBg.y + 6 - modH - 30;
            }
            else {
            }
        },
        enumerable: true,
        configurable: true
    });
    SanGuoZSItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
    };
    SanGuoZSItem.URL = "ui://me1skowlqiai4";
    return SanGuoZSItem;
}(fairygui.GComponent));
__reflect(SanGuoZSItem.prototype, "SanGuoZSItem");
