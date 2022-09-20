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
var ViewLingLongShow = (function (_super) {
    __extends(ViewLingLongShow, _super);
    function ViewLingLongShow() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewLingLongShow.prototype.childrenCreated = function () {
        GGlobal.createPack("bossTiShi");
        this.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.surebt = (this.view.getChild("surebt"));
        this.continuebt = (this.view.getChild("continuebt"));
        this.lab = (this.view.getChild("lab"));
        this.img = (this.view.getChild("img"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.surebt.addClickListener(this.OnSure, this);
        this.continuebt.addClickListener(this.OnContinue, this);
        this.isShowOpenAnimation = false;
        this.closeButton = this.view.getChild("closeButton");
        _super.prototype.childrenCreated.call(this);
    };
    ViewLingLongShow.prototype.onOpen = function (arg) {
        this.rewardArr = arg;
        _super.prototype.onOpen.call(this, arg);
    };
    ViewLingLongShow.prototype.onShown = function () {
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        if (!this._cost1) {
            this._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2602))[0][2]);
        }
        if (!this._cost10) {
            this._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2603))[0][2]);
        }
        if (this.rewardArr.length > 1) {
            this.continuebt.text = "再来十次";
            if (Model_LingLong.lingLong > 9) {
                this.lab.text = "" + Model_LingLong.lingLong + "/10";
                this.lab.color = Color.WHITEINT;
                var v = VoItem.create(Model_LingLong.lingLongId);
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
            }
            else {
                this.lab.text = "" + this._cost10;
                if (Model_player.voMine.yuanbao >= this._cost10) {
                    this.lab.color = Color.GREENINT;
                }
                else {
                    this.lab.color = Color.REDINT;
                }
                this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao); //元宝
            }
        }
        else {
            this.continuebt.text = "再来一次";
            if (Model_LingLong.lingLong > 0) {
                this.lab.text = "" + Model_LingLong.lingLong + "/1";
                this.lab.color = Color.WHITEINT;
                var v = VoItem.create(Model_LingLong.lingLongId);
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
            }
            else {
                this.lab.text = "" + this._cost1;
                if (Model_player.voMine.yuanbao >= this._cost1) {
                    this.lab.color = Color.GREENINT;
                }
                else {
                    this.lab.color = Color.REDINT;
                }
                this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao); //元宝
            }
        }
    };
    ViewLingLongShow.prototype.onHide = function () {
        ViewLingLongShow.isGuide = true;
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.LING_LONG_SHOW);
    };
    ViewLingLongShow.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewLingLongShow.prototype.OnContinue = function () {
        if (!GGlobal.layerMgr.isOpenView(UIConst.LING_LONG)) {
            GGlobal.layerMgr.open(UIConst.LING_LONG);
        }
        if (this.rewardArr.length > 1) {
            this.onBuy10();
        }
        else {
            this.onBuy1();
        }
        this.doHideAnimation();
    };
    ViewLingLongShow.prototype.onBuy1 = function () {
        if (Model_LingLong.lingLong > 0) {
            GGlobal.modelLingLong.CG_BUY(1, 0);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost1) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelLingLong.CG_BUY(1, 1);
        }
    };
    ViewLingLongShow.prototype.onBuy10 = function () {
        if (Model_LingLong.lingLong > 9) {
            GGlobal.modelLingLong.CG_BUY(10, 0);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost10) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelLingLong.CG_BUY(10, 1);
        }
    };
    ViewLingLongShow.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this.rewardArr[index];
        grid.vo = v;
        // ConfigHelp.addExtraCop(grid, "ui://1xperbsyq4gk6", -2, 2);
        // if (v.isBig) {
        // 	grid.extra.visible = true;
        // } else {
        // 	grid.extra.visible = false;
        // }
    };
    ViewLingLongShow.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    ViewLingLongShow.prototype.guide_sureBt = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.surebt, self.surebt.width / 2, self.surebt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.surebt, self.surebt.width / 2, self.surebt.height, 90, -106, 35);
    };
    ViewLingLongShow.isGuide = false;
    return ViewLingLongShow;
}(UIModalPanel));
__reflect(ViewLingLongShow.prototype, "ViewLingLongShow");
