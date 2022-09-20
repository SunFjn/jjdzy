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
var Child_DanDaoFH = (function (_super) {
    __extends(Child_DanDaoFH, _super);
    function Child_DanDaoFH() {
        var _this = _super.call(this) || this;
        _this.rewardBtArr = [];
        _this.drawImgArr = [];
        _this.surTime = 0;
        _this.showType = 0;
        _this.levelRewardArr = [];
        return _this;
    }
    Child_DanDaoFH.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "Child_DanDaoFH"));
    };
    Child_DanDaoFH.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        for (var i = 0; i < 4; i++) {
            var rewardBt = (a.getChild("rewardBt" + i));
            rewardBt.data = Model_DDFH.winNumArr[i];
            a.rewardBtArr.push(rewardBt);
            rewardBt.addClickListener(a.rewardHandle, a);
            var drawImg = (a.getChild("drawImg" + i));
            a.drawImgArr.push(drawImg);
        }
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        a.listBt.addClickListener(a.openRankHandler, a);
        a.buyBt.addClickListener(a.buyHandler, a);
        a.mathBt.addClickListener(a.mathHandler, a);
        a.checkBt.addClickListener(a.checkHandler, a);
        a.explainBt.addClickListener(a.explainHandler, a);
        a.battleGroupBt.addClickListener(a.battleGroupHandler, a);
    };
    Child_DanDaoFH.prototype.battleGroupHandler = function () {
        GGlobal.layerMgr.open(UIConst.DANDAO_FUHUI_BATTLENOTE);
    };
    Child_DanDaoFH.prototype.explainHandler = function () {
        GGlobal.layerMgr.open(UIConst.DANDAO_FUHUI_EXPLAIN);
    };
    Child_DanDaoFH.prototype.checkHandler = function () {
        var a = this;
        if (a.showType == 1) {
            ViewCommonWarn.text("活动未开启");
            return;
        }
        if (a.showType == 0) {
            ViewCommonWarn.text("活动已结束");
            return;
        }
        if (Model_DDFH.battleNum <= 0) {
            ViewCommonWarn.text("挑战次数不足");
            a.checkBt.selected = false;
            return;
        }
        if (a.checkBt.selected) {
            a.autoLb.visible = true;
            a.mathBt.visible = false;
            Model_DDFH.autoMath = true;
            if (!Timer.instance.has(a.mathTimeHandler, a)) {
                Timer.instance.listen(a.mathTimeHandler, a, 1000);
            }
        }
        else {
            a.autoLb.visible = false;
            a.mathBt.visible = true;
            Model_DDFH.autoMath = false;
            Timer.instance.remove(a.mathTimeHandler, a);
        }
    };
    Child_DanDaoFH.prototype.mathHandler = function () {
        if (this.showType == 1) {
            ViewCommonWarn.text("活动未开启");
            return;
        }
        if (this.showType == 0) {
            ViewCommonWarn.text("活动已结束");
            return;
        }
        if (Model_DDFH.battleNum > 0) {
            GGlobal.modelddfh.CG_DANDAOFH_MATHENEMY();
        }
        else {
            this.buyHandler();
            // ViewCommonWarn.text("挑战次数不足");
            this.checkBt.selected = false;
        }
    };
    Child_DanDaoFH.prototype.buyHandler = function () {
        if (Model_DDFH.buyNum <= 0) {
            ViewCommonWarn.text("已达购买上限");
            return;
        }
        var costNum = JSON.parse(Config.xtcs_004[1037].other)[0][2];
        var buyMax = 999;
        var lastBuy = Model_DDFH.buyNum;
        ViewAlertBuy.show(costNum, lastBuy, buyMax, "", Handler.create(null, this.okHandle));
    };
    Child_DanDaoFH.prototype.okHandle = function (count) {
        var costNum = JSON.parse(Config.xtcs_004[1037].other)[0][2];
        if (Model_player.voMine.yuanbao < costNum * count) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelddfh.CG_DANDAOFH_BUY_BATTLENUM(count);
    };
    Child_DanDaoFH.prototype.rewardHandle = function (event) {
        var num = event.target.data;
        var cfg = Config.ddfh_225[num];
        if (cfg) {
            var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
            var state = Model_DDFH.winRewardArr.indexOf(num) == -1 ? 1 : 2;
            var showText = Model_DDFH.winNum >= num ? null : HtmlUtil.fontNoSize("满足条件后可领取", Color.getColorStr(6));
            View_Reward_Show.show(arr, "今日胜利" + num + "场可领取" + HtmlUtil.fontNoSize("(" + Model_DDFH.winNum + "/" + num + ")", Color.getColorStr(Model_DDFH.winNum >= num ? 2 : 6)), showText, Handler.create(this, this.onDraw, [num]), state);
        }
    };
    Child_DanDaoFH.prototype.onDraw = function (num) {
        GGlobal.layerMgr.close2(UIConst.REWARD_SHOW);
        GGlobal.modelddfh.CG_DANDAOFH_DRAWWINREWARD(num);
    };
    Child_DanDaoFH.prototype.renderHandle = function (index, obj) {
        var a = this;
        var grid = obj;
        grid.isShowEff = true;
        var vo = a.levelRewardArr[index];
        grid.vo = vo;
        grid.tipEnabled = true;
    };
    Child_DanDaoFH.prototype.openRankHandler = function () {
        GGlobal.layerMgr.open(UIConst.DANDAO_FUHUI_RANK);
    };
    Child_DanDaoFH.prototype.updateShow = function () {
        if (GGlobal.sceneType == SceneCtrl.DANDAO_FUHUI)
            return;
        var a = this;
        var level = Model_DDFH.level;
        var cfg = Config.ddfhdan_225[level];
        if (!cfg)
            return;
        a.nameImg.url = CommonManager.getUrl("Arena", "gradeLb_" + (level - 1));
        a.levelImg.url = CommonManager.getUrl("Arena", "grade_" + (level - 1));
        if (Model_DDFH.myRank == 0 || Model_DDFH.myRank > 10) {
            a.myRankLb.text = "本赛季排名：10+";
        }
        else {
            a.myRankLb.text = "本赛季排名：" + Model_DDFH.myRank;
        }
        a.jifenLb.text = "本赛季积分：" + Model_DDFH.jifen;
        a.expBar.value = Model_DDFH.jifen;
        if (cfg.win <= 0) {
            a.expBar.max = Model_DDFH.jifen;
            a.expBar._titleObject.text = Model_DDFH.jifen + "/MAX";
        }
        else {
            a.expBar.max = cfg.win;
        }
        a.levelRewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
        a.list.numItems = a.levelRewardArr.length;
        var isCheck = false;
        for (var i = 0; i < 4; i++) {
            var winNum = Model_DDFH.winNumArr[i];
            if (Model_DDFH.winRewardArr.indexOf(winNum) == -1) {
                a.drawImgArr[i].visible = false;
                a.rewardBtArr[i].checkNotice = Model_DDFH.winNum >= Model_DDFH.winNumArr[i];
                if (Model_DDFH.winNum >= Model_DDFH.winNumArr[i]) {
                    isCheck = true;
                }
            }
            else {
                a.drawImgArr[i].visible = true;
                a.rewardBtArr[i].checkNotice = false;
            }
        }
        a.battleLb.text = "挑战次数：" + Model_DDFH.battleNum;
        a.winBar.max = 10;
        a.winBar.value = Model_DDFH.winNum;
        this.mathBt.checkNotice = false;
        var serverTime = Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
        if (serverTime >= Model_DDFH.overTime) {
            var date = new Date(Model_GlobalMsg.getServerTime());
            var weekDay = date.getDay();
            if (weekDay == 0 || weekDay == 6) {
                a.timeLb1.text = "跨服排名前16可参与周日的三国无双";
            }
            else {
                a.timeLb1.text = "活动已结束";
            }
            a.timeLb1.visible = true;
            a.startGroup.visible = false;
            a.checkBt.selected = false;
            a.autoLb.visible = false;
            a.mathBt.visible = true;
            Timer.instance.remove(a.mathTimeHandler, a);
        }
        else {
            if (Model_DDFH.autoMath && Model_DDFH.battleNum > 0) {
                a.autoLb.visible = true;
                a.mathBt.visible = false;
                a.checkBt.selected = true;
                if (!Timer.instance.has(a.mathTimeHandler, a)) {
                    Timer.instance.listen(a.mathTimeHandler, a, 1000);
                }
            }
            else {
                a.checkBt.selected = false;
                a.autoLb.visible = false;
                a.mathBt.visible = true;
                Model_DDFH.autoMath = false;
                Timer.instance.remove(a.mathTimeHandler, a);
            }
            a.surTime = Model_DDFH.overTime - serverTime;
            if (a.surTime > 3000) {
                a.surTime = Model_DDFH.overTime - serverTime - 3000;
                a.showType = 1;
            }
            else {
                a.surTime = Model_DDFH.overTime - serverTime;
                a.showType = 2;
                this.mathBt.checkNotice = Model_DDFH.battleNum > 0;
                if (!isCheck) {
                    isCheck = Model_DDFH.battleNum > 0;
                }
            }
            if (!Timer.instance.has(a.timeHandle, a)) {
                Timer.instance.listen(a.timeHandle, a, 1000);
            }
        }
        GGlobal.reddot.setCondition(UIConst.DANDAO_FUHUI, 0, isCheck);
        GGlobal.reddot.notifyMsg(UIConst.DANDAO_FUHUI);
    };
    Child_DanDaoFH.prototype.mathTimeHandler = function () {
        Model_DDFH.autoTime--;
        if (Model_DDFH.autoTime <= 0) {
            GGlobal.modelddfh.CG_DANDAOFH_MATHENEMY();
            Timer.instance.remove(this.mathTimeHandler, this);
        }
    };
    Child_DanDaoFH.prototype.timeHandle = function () {
        var a = this;
        a.surTime--;
        if (a.showType == 1) {
            a.timeLb1.visible = true;
            a.startGroup.visible = false;
            if (a.surTime > 3000) {
                a.timeLb1.text = "单刀赴会将于" + DateUtil.getHMSBySecond2(a.surTime) + "后开启";
            }
            else {
                a.timeLb1.text = "单刀赴会将于" + DateUtil.getMSBySec3(a.surTime) + "后开启";
            }
            if (a.surTime <= 0) {
                a.showType = 2;
                a.surTime = 3000;
            }
        }
        else {
            a.timeLb.text = "单刀赴会将于" + HtmlUtil.fontNoSize(DateUtil.getMSBySec3(a.surTime), Color.getColorStr(6)) + "后结束";
            a.startGroup.visible = true;
            a.timeLb1.visible = false;
            if (a.surTime <= 0) {
                Timer.instance.remove(a.timeHandle, a);
                var date = new Date(Model_GlobalMsg.getServerTime());
                var weekDay = date.getDay();
                if (weekDay == 0 || weekDay == 6) {
                    a.timeLb1.text = "跨服排名前16可参与周日的三国无双";
                }
                else {
                    a.timeLb1.text = "活动已结束";
                }
                a.timeLb1.visible = true;
                a.startGroup.visible = false;
            }
        }
    };
    Child_DanDaoFH.prototype.show = function () {
        var a = this;
        GGlobal.control.listen(Enum_MsgType.DANDAO_FUHUI, a.updateShow, a);
        a.updateShow();
        GGlobal.modelddfh.CG_OPEN_DANDAOFH();
        IconUtil.setImg(a.qzImg, Enum_Path.IMAGE_MODULES_URL + "area/qz.png");
    };
    Child_DanDaoFH.prototype.clean = function () {
        var a = this;
        Timer.instance.remove(a.timeHandle, a);
        Timer.instance.remove(a.mathTimeHandler, a);
        GGlobal.control.remove(Enum_MsgType.DANDAO_FUHUI, a.updateShow, a);
        this.list.numItems = 0;
        IconUtil.setImg(a.qzImg, null);
    };
    Child_DanDaoFH.URL = "ui://me1skowlc4lfc";
    return Child_DanDaoFH;
}(fairygui.GComponent));
__reflect(Child_DanDaoFH.prototype, "Child_DanDaoFH");
