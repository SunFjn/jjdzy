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
var ViewSG_ZPShow = (function (_super) {
    __extends(ViewSG_ZPShow, _super);
    function ViewSG_ZPShow() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewSG_ZPShow.prototype.childrenCreated = function () {
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
    ViewSG_ZPShow.prototype.onOpen = function (arg) {
        this.rewardArr = arg;
        _super.prototype.onOpen.call(this, arg);
    };
    ViewSG_ZPShow.prototype.onShown = function () {
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        if (!this._cost1) {
            this._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(4601))[0][2]);
        }
        if (!this._cost10) {
            this._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(4602))[0][2]);
        }
        if (this.rewardArr.length > 1) {
            this.continuebt.text = "再来十次";
            this.lab.text = "" + this._cost10;
            if (Model_player.voMine.yuanbao >= this._cost10) {
                this.lab.color = Color.GREENINT;
            }
            else {
                this.lab.color = Color.REDINT;
            }
            this.img.url = "ui://jvxpx9embwmw3y"; //元宝
        }
        else {
            this.continuebt.text = "再来一次";
            this.lab.text = "" + this._cost1;
            if (Model_player.voMine.yuanbao >= this._cost1) {
                this.lab.color = Color.GREENINT;
            }
            else {
                this.lab.color = Color.REDINT;
            }
            this.img.url = "ui://jvxpx9embwmw3y"; //元宝
        }
    };
    ViewSG_ZPShow.prototype.onHide = function () {
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.SG_ZHUANPAN_SHOW);
    };
    ViewSG_ZPShow.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewSG_ZPShow.prototype.OnContinue = function () {
        if (!GGlobal.layerMgr.isOpenView(UIConst.SG_ZHUANPAN_SHOW)) {
            GGlobal.layerMgr.open(UIConst.SG_ZHUANPAN_SHOW);
        }
        if (this.rewardArr.length > 1) {
            this.onBuy10();
        }
        else {
            this.onBuy1();
        }
        this.doHideAnimation();
    };
    ViewSG_ZPShow.prototype.onBuy1 = function () {
        if (Model_player.voMine.yuanbao < this._cost1) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelSGQD.CGBuy4123(1);
    };
    ViewSG_ZPShow.prototype.onBuy10 = function () {
        if (Model_player.voMine.yuanbao < this._cost10) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelSGQD.CGBuy4123(2);
    };
    ViewSG_ZPShow.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this.rewardArr[index];
        v.item.extra = v.isBig ? 5 : 0;
        grid.vo = v.item;
        // ConfigHelp.addExtraCop(grid, "ui://1xperbsyq4gk6", -2, 2);
        // if (v.isBig) {
        // 	grid.extra.visible = true;
        // } else {
        // 	grid.extra.visible = false;
        // }
    };
    ViewSG_ZPShow.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    ViewSG_ZPShow.prototype.guide_sureBt = function (arg) {
        GuideStepManager.instance.showGuide(this.surebt, this.surebt.width / 2, this.surebt.height / 2);
    };
    ViewSG_ZPShow.isGuide = false;
    return ViewSG_ZPShow;
}(UIModalPanel));
__reflect(ViewSG_ZPShow.prototype, "ViewSG_ZPShow");
