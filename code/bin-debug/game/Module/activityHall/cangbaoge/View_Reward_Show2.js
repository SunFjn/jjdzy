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
var View_Reward_Show2 = (function (_super) {
    __extends(View_Reward_Show2, _super);
    function View_Reward_Show2() {
        var _this = _super.call(this) || this;
        _this.type = 1;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    View_Reward_Show2.prototype.childrenCreated = function () {
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
    View_Reward_Show2.prototype.updateMoney = function () {
        var self = this;
        var money = Model_player.voMine.yuanbao;
        var count = 0;
        if (self.itemId) {
            count = Model_Bag.getItemCount(self.itemId);
        }
        if (self.type == 1) {
            self.continuebt.text = "再来一次";
            if (count > self.one) {
                self.lab.text = count + "/" + self.one;
                IconUtil.setImg(self.img, Enum_Path.ICON70_URL + Config.daoju_204[self.itemId].icon + ".png");
                self.lab.color = Color.GREENINT;
            }
            else {
                self.lab.text = self.one + "";
                self.img.url = "ui://jvxpx9embwmw3y";
                self.lab.color = money >= self.one ? Color.GREENINT : Color.REDINT;
            }
        }
        else if (self.type == 9999) {
            self.continuebt.text = "再来一次";
            IconUtil.setImg(self.img, Enum_Path.ICON70_URL + Config.daoju_204[self.itemId].icon + ".png");
            if (count > self.one) {
                self.lab.text = count + "/" + self.one;
                self.lab.color = Color.GREENINT;
            }
            else {
                self.lab.text = self.one + "";
                self.lab.color = money >= self.one ? Color.GREENINT : Color.REDINT;
            }
        }
        else {
            self.continuebt.text = "再来十次";
            if (count > 9) {
                self.lab.text = count + "/10";
                IconUtil.setImg(self.img, Enum_Path.ICON70_URL + Config.daoju_204[self.itemId].icon + ".png");
                self.lab.color = Color.GREENINT;
            }
            else {
                self.lab.text = self.ten + "";
                self.img.url = "ui://jvxpx9embwmw3y";
                self.lab.color = money >= self.ten ? Color.GREENINT : Color.REDINT;
            }
        }
        if (GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SJZK) && self.source == UIConst.CANGBAOGE) {
            var curCfg = Model_ActivityHall.getIherooff_287(GGlobal.model_actCom.treasure);
            var nextCfg = void 0;
            var disCost = 0;
            if (self.type == 1) {
                if (count <= 0 && curCfg.off < 100) {
                    self.vresG10.visible = true;
                }
                disCost = Math.ceil(self.one * (curCfg.off / 100));
            }
            else {
                if (count <= 9 && curCfg.off < 100) {
                    self.vresG10.visible = true;
                }
                if (curCfg) {
                    nextCfg = Config.herooff_287[curCfg.id + 1];
                }
                if (nextCfg) {
                    var arr = JSON.parse(curCfg.time);
                    var count_1 = arr[0][1] - GGlobal.model_actCom.treasure;
                    if (count_1 >= 10) {
                        disCost = Math.ceil(self.ten * (curCfg.off / 100));
                    }
                    else {
                        var one = self.ten / 10;
                        var total = one * count_1 * (curCfg.off / 100) + one * (10 - count_1) * (nextCfg.off / 100);
                        disCost = Math.ceil(total);
                    }
                }
                else {
                    disCost = Math.ceil(self.ten * (curCfg.off / 100));
                }
            }
            self.discount.text = "(" + disCost + ")";
        }
    };
    View_Reward_Show2.prototype.onOpen = function (arg) {
        this.rewardArr = arg.award;
        this.type = arg.type;
        this.callBackHandler = arg.callBack;
        this.one = arg.price1 ? arg.price1 : 1;
        this.ten = arg.price10;
        this.source = arg.source;
        this.itemId = arg.itemId;
        _super.prototype.onOpen.call(this, arg);
    };
    View_Reward_Show2.prototype.onShown = function () {
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        this.vresG10.visible = false;
        this.updateMoney();
    };
    View_Reward_Show2.prototype.onHide = function () {
        if (this.list) {
            this.list.numItems = 0;
        }
        View_Reward_Show2.isGuide = true;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.REWARD_SHOW2);
        IconUtil.setImg(this.img, null);
    };
    View_Reward_Show2.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    View_Reward_Show2.prototype.oneceMore = function () {
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
    View_Reward_Show2.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var data = this.rewardArr[index];
        grid.vo = data;
    };
    View_Reward_Show2.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    View_Reward_Show2.prototype.guide_sureBt = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.surebt, self.surebt.width / 2, self.surebt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.surebt, self.surebt.width / 2, self.surebt.height, 90, -106, 35);
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
    View_Reward_Show2.show = function (source, type, callBack, awards, one, ten, itemId) {
        GGlobal.layerMgr.open(UIConst.REWARD_SHOW2, { "source": source, "type": type, "callBack": callBack, "award": awards, "price1": one, "price10": ten, "itemId": itemId });
    };
    View_Reward_Show2.isGuide = false;
    return View_Reward_Show2;
}(UIModalPanel));
__reflect(View_Reward_Show2.prototype, "View_Reward_Show2");
