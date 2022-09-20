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
var ViewSuperMarblesShow = (function (_super) {
    __extends(ViewSuperMarblesShow, _super);
    function ViewSuperMarblesShow() {
        var _this = _super.call(this) || this;
        _this.type = 1;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    ViewSuperMarblesShow.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("bossTiShi");
        self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.surebt.addClickListener(self.OnSure, self);
        self.continuebt.addClickListener(self.oneceMore, self);
        self.isShowOpenAnimation = false;
        self.closeButton = self.view.getChild("closeButton");
        _super.prototype.childrenCreated.call(this);
    };
    ViewSuperMarblesShow.prototype.updateMoney = function () {
        var self = this;
        var money = Model_player.voMine.yuanbao;
        if (self.type == 1) {
            self.continuebt.text = "再来一次";
            self.lab.text = self.one + "";
            self.img.url = "ui://jvxpx9embwmw3y";
            self.lab.color = money >= self.one ? Color.GREENINT : Color.REDINT;
        }
        else if (self.type == 5) {
            self.continuebt.text = "再来五次";
            self.lab.text = self.one * 5 + "";
            self.img.url = "ui://jvxpx9embwmw3y";
            self.lab.color = money >= self.one ? Color.GREENINT : Color.REDINT;
        }
    };
    ViewSuperMarblesShow.prototype.onOpen = function (arg) {
        this.rewardArr = arg.award;
        this.type = arg.type;
        this.callBackHandler = arg.callBack;
        this.one = arg.price1 ? arg.price1 : 1;
        this.ten = arg.price10;
        this.source = arg.source;
        this.itemId = arg.itemId;
        _super.prototype.onOpen.call(this, arg);
    };
    ViewSuperMarblesShow.prototype.onShown = function () {
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        this.vresG10.visible = false;
        this.updateMoney();
    };
    ViewSuperMarblesShow.prototype.onHide = function () {
        if (this.list) {
            this.list.numItems = 0;
        }
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.ACTCOMCJDZ_AWARDS);
        IconUtil.setImg(this.img, null);
    };
    ViewSuperMarblesShow.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    ViewSuperMarblesShow.prototype.oneceMore = function () {
        var self = this;
        self.doHideAnimation();
        if (self.source > 0) {
            if (GGlobal.layerMgr.isOpenView(self.source) == false) {
                ViewCommonWarn.text("请先进入" + Config.xitong_001[self.source].name);
                return;
            }
        }
        if (self.callBackHandler) {
            self.callBackHandler.run();
            self.callBackHandler = null;
        }
    };
    ViewSuperMarblesShow.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var data = this.rewardArr[index];
        grid.vo = data;
    };
    ViewSuperMarblesShow.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    /**
     * source  系统id UIConst
     * type 1  再来一次； 9999固定使用道具 其他 再来十次
     * callBack  继续抽回调
     * awards  奖励列表
     * one 一次金额
     * ten 十次金额
     * itemId  抽卡消耗的道具id
     */
    ViewSuperMarblesShow.show = function (source, type, callBack, awards, one, ten, itemId) {
        GGlobal.layerMgr.open(UIConst.ACTCOMCJDZ_AWARDS, { "source": source, "type": type, "callBack": callBack, "award": awards, "price1": one, "price10": ten, "itemId": itemId });
    };
    ViewSuperMarblesShow.isGuide = false;
    return ViewSuperMarblesShow;
}(UIModalPanel));
__reflect(ViewSuperMarblesShow.prototype, "ViewSuperMarblesShow");
