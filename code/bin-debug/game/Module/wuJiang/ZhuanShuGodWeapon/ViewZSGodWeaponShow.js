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
var ViewZSGodWeaponShow = (function (_super) {
    __extends(ViewZSGodWeaponShow, _super);
    function ViewZSGodWeaponShow() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewZSGodWeaponShow.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("bossTiShi");
        self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.surebt.addClickListener(self.OnSure, self);
        self.continuebt.addClickListener(self.OnContinue, self);
        self.isShowOpenAnimation = false;
        self.closeButton = self.view.getChild("closeButton");
        _super.prototype.childrenCreated.call(this);
    };
    ViewZSGodWeaponShow.prototype.onShown = function () {
        var self = this;
        var $arg = self._args.dropArr;
        var type = self._args.type;
        var arr1 = [];
        var arr2 = [];
        for (var i = 0; i < $arg.length; i++) {
            if ($arg[i].isBig > 0) {
                arr1.push($arg[i]);
            }
            else {
                arr2.push($arg[i]);
            }
        }
        self.rewardArr = arr1.concat(arr2);
        ;
        self.list.numItems = self.rewardArr.length;
        self.times = 11;
        Timer.instance.listen(self.timeHandler, self, 1000);
        self.vresG10.visible = false;
        if (type == 0) {
            if (!self._cost1) {
                self._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6730))[0][2]);
            }
            if (!self._cost10) {
                self._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6731))[0][2]);
            }
            var count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
            if (self.rewardArr.length > 9) {
                self.continuebt.text = "再来十次";
                if (count > 9) {
                    self.lab.text = count + "/10";
                    self.lab.color = Color.WHITEINT;
                    var v = VoItem.create(Model_ZSGodWeapon.duanzaoC);
                    ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", self.img);
                }
                else {
                    self.lab.text = "" + self._cost10;
                    if (Model_player.voMine.yuanbao >= self._cost10) {
                        self.lab.color = Color.GREENINT;
                    }
                    else {
                        self.lab.color = Color.REDINT;
                    }
                    self.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao); //元宝
                }
            }
            else {
                self.continuebt.text = "再来一次";
                if (count > 0) {
                    self.lab.text = count + "/1";
                    self.lab.color = Color.WHITEINT;
                    var v = VoItem.create(Model_ZSGodWeapon.duanzaoC);
                    ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
                }
                else {
                    self.lab.text = "" + this._cost1;
                    if (Model_player.voMine.yuanbao >= this._cost1) {
                        self.lab.color = Color.GREENINT;
                    }
                    else {
                        self.lab.color = Color.REDINT;
                    }
                    self.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao); //元宝
                }
            }
            if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK)) {
                var itemNum = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
                var curCfg = Model_ZSGodWeapon.getIsbzk_281(GGlobal.model_actCom.forgeNum);
                var nextCfg = void 0;
                var disCost = 0;
                if (self.rewardArr.length > 9) {
                    if (itemNum <= 9) {
                        self.vresG10.visible = true;
                    }
                    if (curCfg) {
                        nextCfg = Config.sbzk_281[curCfg.id + 1];
                    }
                    if (nextCfg) {
                        var arr = JSON.parse(curCfg.time);
                        var count_1 = arr[0][1] - GGlobal.model_actCom.forgeNum;
                        if (count_1 >= 10) {
                            disCost = Math.ceil(self._cost10 * (curCfg.off / 100));
                        }
                        else {
                            var one = self._cost10 / 10;
                            var total = one * count_1 * (curCfg.off / 100) + one * (10 - count_1) * (nextCfg.off / 100);
                            disCost = Math.ceil(total);
                        }
                    }
                    else {
                        disCost = Math.ceil(this._cost10 * (curCfg.off / 100));
                    }
                }
                else {
                    if (itemNum <= 0) {
                        self.vresG10.visible = true;
                    }
                    disCost = Math.ceil(this._cost1 * (curCfg.off / 100));
                }
                this.discount.text = "(" + disCost + ")";
            }
        }
        else {
            self.continuebt.text = "再来一次";
            var count = Model_Bag.getItemCount(Model_ZSGodWeapon.shenjiangC);
            self.lab.text = count + "/1";
            self.lab.color = Color.WHITEINT;
            var v = VoItem.create(Model_ZSGodWeapon.shenjiangC);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
        }
    };
    ViewZSGodWeaponShow.prototype.onHide = function () {
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.SHAOZHU_QIYUAN_SHOW);
        GGlobal.control.notify(UIConst.ZS_GODWEAPON_REWARD);
    };
    ViewZSGodWeaponShow.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewZSGodWeaponShow.prototype.OnContinue = function () {
        if (!GGlobal.layerMgr.isOpenView(UIConst.ZS_GODWEAPON)) {
            ViewCommonWarn.text("请先进入专属神兵");
        }
        else {
            if (this.rewardArr.length > 9) {
                this.onBuy10();
            }
            else {
                this.onBuy1();
            }
        }
        this.doHideAnimation();
    };
    ViewZSGodWeaponShow.prototype.onBuy1 = function () {
        if (this._args.type != 0) {
            var count = Model_Bag.getItemCount(Model_ZSGodWeapon.shenjiangC);
            if (count > 0) {
                GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 1);
            }
            else {
                View_CaiLiao_GetPanel.show(VoItem.create(Model_ZSGodWeapon.shenjiangC));
            }
        }
        else {
            var count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
            if (count > 0) {
                GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 0);
            }
            else {
                if (Model_player.voMine.yuanbao < this._cost1) {
                    ModelChongZhi.guideToRecharge();
                    return;
                }
                GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 0);
            }
        }
    };
    ViewZSGodWeaponShow.prototype.onBuy10 = function () {
        var count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
        if (count > 9) {
            GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(1, 0);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost10) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(1, 0);
        }
    };
    ViewZSGodWeaponShow.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this.rewardArr[index];
        grid.vo = v.item;
        grid.isShowExtra(v.isBig >= 1 ? 5 : v.isBig);
    };
    ViewZSGodWeaponShow.prototype.timeHandler = function () {
        var self = this;
        self.times--;
        self.surebt.text = "确定(" + self.times + ")";
        if (self.times <= 0) {
            self.doHideAnimation();
        }
    };
    return ViewZSGodWeaponShow;
}(UIModalPanel));
__reflect(ViewZSGodWeaponShow.prototype, "ViewZSGodWeaponShow");
