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
var ViewActLuckTurnPrize = (function (_super) {
    __extends(ViewActLuckTurnPrize, _super);
    function ViewActLuckTurnPrize() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewActLuckTurnPrize.prototype.childrenCreated = function () {
        GGlobal.createPack("bossTiShi");
        this.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
        this.contentPane = this.view;
        var s = this;
        CommonManager.parseChildren(s.view, s);
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.surebt.addClickListener(this.OnSure, this);
        this.continuebt.addClickListener(this.OnContinue, this);
        this.isShowOpenAnimation = false;
        this.closeButton = this.view.getChild("closeButton");
        _super.prototype.childrenCreated.call(this);
    };
    ViewActLuckTurnPrize.prototype.onOpen = function (arg) {
        this.rewardArr = arg[0];
        this.type = arg[1];
        _super.prototype.onOpen.call(this, arg);
    };
    ViewActLuckTurnPrize.prototype.onShown = function () {
        var m = GGlobal.model_LuckTurn;
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        if (!this._cost1) {
            this._cost1 = m.ybMust;
        }
        if (!this._cost10) {
            this._cost10 = m.ybTen;
        }
        if (this.type == 10) {
            this.continuebt.text = "再来十次";
            this.continuebt.visible = true;
            this.surebt.x = 149;
            this.lab.text = "" + this._cost10;
            if (Model_player.voMine.yuanbao >= this._cost10) {
                this.lab.color = Color.GREENINT;
            }
            else {
                this.lab.color = Color.REDINT;
            }
            this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao); //元宝
        }
        else if (this.type == 1) {
            this.continuebt.text = "再来一次";
            this.continuebt.visible = true;
            this.surebt.x = 149;
            this.lab.text = "" + this._cost1;
            if (Model_player.voMine.yuanbao >= this._cost1) {
                this.lab.color = Color.GREENINT;
            }
            else {
                this.lab.color = Color.REDINT;
            }
            this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao); //元宝
        }
        else {
            this.continuebt.text = "";
            this.continuebt.visible = false;
            this.surebt.x = (this.width - this.surebt.width) / 2;
            this.lab.text = "";
            this.img.url = ""; //元宝
        }
    };
    ViewActLuckTurnPrize.prototype.onHide = function () {
        ViewLingLongShow.isGuide = true;
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
    };
    ViewActLuckTurnPrize.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewActLuckTurnPrize.prototype.OnContinue = function () {
        if (!GGlobal.layerMgr.isOpenView(UIConst.LUCK_TURN)) {
            GGlobal.layerMgr.open(UIConst.LUCK_TURN);
        }
        if (this.rewardArr.length > 1) {
            this.onBuy10();
        }
        else {
            this.onBuy1();
        }
        this.doHideAnimation();
    };
    ViewActLuckTurnPrize.prototype.onBuy1 = function () {
        if (Model_player.voMine.yuanbao < this._cost1) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        if (Model_LuckTurn.isMoive) {
            ViewCommonWarn.text("请稍后");
            return;
        }
        if (!Model_LuckTurn.skipTween) {
            Model_LuckTurn.isMoive = true;
        }
        GGlobal.model_LuckTurn.CG_TURN_10341(20);
    };
    ViewActLuckTurnPrize.prototype.onBuy10 = function () {
        GGlobal.model_LuckTurn.turnTenCt();
    };
    ViewActLuckTurnPrize.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this.rewardArr[index];
        grid.vo = v;
    };
    ViewActLuckTurnPrize.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    ViewActLuckTurnPrize.isGuide = false;
    return ViewActLuckTurnPrize;
}(UIModalPanel));
__reflect(ViewActLuckTurnPrize.prototype, "ViewActLuckTurnPrize");
