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
var ViewSZQiYuanShow = (function (_super) {
    __extends(ViewSZQiYuanShow, _super);
    function ViewSZQiYuanShow() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewSZQiYuanShow.prototype.childrenCreated = function () {
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
    ViewSZQiYuanShow.prototype.onShown = function () {
        var $arg = this._args;
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
        this.rewardArr = arr1.concat(arr2);
        ;
        var model = GGlobal.modelSZQiYuan;
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        if (!this._cost1) {
            this._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6101))[0][2]);
        }
        if (!this._cost10) {
            this._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6102))[0][2]);
        }
        if (this.rewardArr.length > 9) {
            this.continuebt.text = "再来十次";
            if (model.qyCount > 9) {
                this.lab.text = "" + model.qyCount + "/10";
                this.lab.color = Color.WHITEINT;
                var v = VoItem.create(Model_SZQiYuan.qiyuanId);
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
            if (model.qyCount > 0) {
                this.lab.text = "" + model.qyCount + "/1";
                this.lab.color = Color.WHITEINT;
                var v = VoItem.create(Model_SZQiYuan.qiyuanId);
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
    ViewSZQiYuanShow.prototype.onHide = function () {
        GGlobal.control.notify(Enum_MsgType.SZQIYUAN_PRAY_OVER);
        this.list.numItems = 0;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.SHAOZHU_QIYUAN_SHOW);
    };
    ViewSZQiYuanShow.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewSZQiYuanShow.prototype.OnContinue = function () {
        if (!GGlobal.layerMgr.isOpenView(UIConst.SHAOZHU)) {
            ViewCommonWarn.text("请先进入少主祈愿");
            // GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN_SHOW)
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
    ViewSZQiYuanShow.prototype.onBuy1 = function () {
        if (GGlobal.modelSZQiYuan.qyCount > 0) {
            GGlobal.modelSZQiYuan.CG_PRAY(1);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost1) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelSZQiYuan.CG_PRAY(1);
        }
    };
    ViewSZQiYuanShow.prototype.onBuy10 = function () {
        if (GGlobal.modelSZQiYuan.qyCount > 9) {
            GGlobal.modelSZQiYuan.CG_PRAY(10);
        }
        else {
            if (Model_player.voMine.yuanbao < this._cost10) {
                ModelChongZhi.guideToRecharge();
                return;
            }
            GGlobal.modelSZQiYuan.CG_PRAY(10);
        }
    };
    ViewSZQiYuanShow.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var v = this.rewardArr[index];
        grid.vo = v.item;
        grid.isShowExtra(v.isBig > 1 ? 4 : v.isBig);
    };
    ViewSZQiYuanShow.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    return ViewSZQiYuanShow;
}(UIModalPanel));
__reflect(ViewSZQiYuanShow.prototype, "ViewSZQiYuanShow");
