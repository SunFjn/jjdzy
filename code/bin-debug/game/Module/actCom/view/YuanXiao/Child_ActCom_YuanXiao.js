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
var Child_ActCom_YuanXiao = (function (_super) {
    __extends(Child_ActCom_YuanXiao, _super);
    function Child_ActCom_YuanXiao() {
        var _this = _super.call(this) || this;
        _this.costLbArr = [];
        _this.gridArr = [];
        _this.roleArr = [];
        _this.moneyType = 24;
        return _this;
    }
    Child_ActCom_YuanXiao.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_YuanXiao", "Child_ActCom_YuanXiao"));
    };
    Child_ActCom_YuanXiao.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(YuanXiaoGrid.URL, YuanXiaoGrid);
        f(YuanXiaoRole.URL, YuanXiaoRole);
        f(YuanXiaoBattleReportItem.URL, YuanXiaoBattleReportItem);
    };
    Child_ActCom_YuanXiao.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.costLbArr = [self.costLb0, self.costLb1, self.costLb2];
        self.gridArr = [self.grid0, self.grid1, self.grid2];
        self.roleArr = [self.role0, self.role1, self.role2];
    };
    Child_ActCom_YuanXiao.prototype.initView = function (pParent) {
    };
    Child_ActCom_YuanXiao.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelyuanxiao;
        var costArr = ConfigHelp.makeItemListArr(JSON.parse(Config.zyx_775[self.vo.qs].cl));
        if (self.c1.selectedIndex == 0) {
            var max = ConfigHelp.getSystemNum(7932);
            self.drawBt.visible = model.drawNum >= max;
            self.timeGroup.visible = model.drawNum <= 0;
            self.maskImg.fillAmount = model.drawNum / max;
            self.rewardGrid.visible = false;
            self.randomImg.visible = true;
            var index = 0;
            for (var i = 0; i < self.costLbArr.length; i++) {
                if (model.numArr[i] >= costArr[i].count) {
                    index++;
                }
                self.costLbArr[i].setVo(costArr[i], model.numArr[i]);
            }
            self.rewardBt.checkNotice = index >= costArr.length;
            if (model.drawNum < max) {
                if (!Timer.instance.has(self.OnDrawTime, self)) {
                    Timer.instance.listen(self.OnDrawTime, self, 1000);
                }
            }
            else {
                Timer.instance.remove(self.OnDrawTime, self);
            }
        }
        else {
            Timer.instance.remove(self.OnDrawTime, self);
            for (var i = 0; i < self.roleArr.length; i++) {
                if (model.roleDic[self.curGrid.data + 1] && i < model.roleDic[self.curGrid.data + self.moneyType].length) {
                    self.roleArr[i].setVo(self.curGrid.data + 1, model.roleDic[self.curGrid.data + self.moneyType][i]);
                }
                else {
                    self.roleArr[i].setVo(self.curGrid.data + 1, null);
                }
            }
            if (model.resTime <= 0) {
                self.resBt.text = "免费刷新";
                Timer.instance.remove(self.OnResTime, self);
            }
            else {
                self.resBt.text = "刷新";
                if (Timer.instance.has(self.OnResTime, self)) {
                    Timer.instance.listen(self.OnResTime, self, 1000);
                }
            }
            var costMoney = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[7931].other))[0];
            self.costLb.setImgUrl(costMoney.icon);
            self.costLb.setCount(costMoney.count);
            self.numLb.text = "掠夺次数(" + model.ldNum + "/" + ConfigHelp.getSystemNum(7930) + ")";
            for (var i = 0; i < costArr.length; i++) {
                self.gridArr[i].vo = costArr[i];
            }
        }
    };
    Child_ActCom_YuanXiao.prototype.OnResTime = function () {
        var self = this;
        var model = GGlobal.modelyuanxiao;
        model.resTime--;
        if (model.resTime <= 0) {
            self.resTime.text = "";
            self.resBt.text = "免费刷新";
            Timer.instance.remove(self.OnResTime, self);
        }
        else {
            self.resTime.text = DateUtil2.formatUsedTime(model.resTime, "uu分ss秒后可免费刷新");
        }
    };
    Child_ActCom_YuanXiao.prototype.OnDrawTime = function () {
        var self = this;
        var model = GGlobal.modelyuanxiao;
        var max = ConfigHelp.getSystemNum(7932);
        model.drawTime--;
        if (model.drawTime > 0) {
            if (self.timeGroup.visible) {
                self.drawTime.text = DateUtil2.formatUsedTime(model.drawTime, "uu分ss秒后可领取");
            }
        }
        else {
            self.timeGroup.visible = model.drawNum <= 0;
            if (model.drawNum < max) {
                model.drawTime = 3600;
            }
            else {
                Timer.instance.remove(self.OnDrawTime, self);
            }
        }
    };
    Child_ActCom_YuanXiao.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self.register(true);
        Model_GlobalMsg.CG_ACTTIVITY_OR_SYSTEM_DATA(pData.id);
        Timer.instance.listen(self.timeHandler, self, 1000);
    };
    Child_ActCom_YuanXiao.prototype.closePanel = function (pData) {
        var self = this;
        Timer.instance.remove(self.timeHandler, self);
        Timer.instance.remove(self.OnDrawTime, self);
        Timer.instance.remove(self.OnResTime, self);
        ConfigHelp.cleanGridEff(self.gridArr);
        for (var i = 0; i < self.costLbArr.length; i++) {
            self.costLbArr[i].clean();
            self.roleArr[i].clean();
        }
        self.register(false);
    };
    Child_ActCom_YuanXiao.prototype.register = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.ACTCOM_YUANXIAO, self.updateShow, self);
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
        EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.OnSM, self);
        EventUtil.register(pFlag, self.goBt, egret.TouchEvent.TOUCH_TAP, self.OnGo, self);
        EventUtil.register(pFlag, self.backBt, egret.TouchEvent.TOUCH_TAP, self.OnBack, self);
        EventUtil.register(pFlag, self.rewardBt, egret.TouchEvent.TOUCH_TAP, self.OnReward, self);
        EventUtil.register(pFlag, self.resBt, egret.TouchEvent.TOUCH_TAP, self.OnRes, self);
        EventUtil.register(pFlag, self.drawBt, egret.TouchEvent.TOUCH_TAP, self.OnDraw, self);
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].data = i;
            EventUtil.register(pFlag, self.gridArr[i], egret.TouchEvent.TOUCH_TAP, self.OnGrid, self);
        }
    };
    Child_ActCom_YuanXiao.prototype.OnDraw = function () {
        GGlobal.modelyuanxiao.CG_GET_YUANXIAO_CAILIAO();
    };
    Child_ActCom_YuanXiao.prototype.OnRes = function () {
        var self = this;
        var model = GGlobal.modelyuanxiao;
        if (model.resTime <= 0 || ConfigHelp.checkEnough(Config.xtcs_004[7931].other, false)) {
            model.CG_YuanXiaoLocal_refresh_11635(self.curGrid.data + self.moneyType);
        }
        else {
            ModelChongZhi.guideToRecharge();
        }
    };
    Child_ActCom_YuanXiao.prototype.OnGrid = function (evt) {
        var self = this;
        var grid = evt.target;
        if (self.curGrid && self.curGrid.hashCode == grid.hashCode)
            return;
        if (self.curGrid)
            self.curGrid.choose = false;
        grid.choose = true;
        self.curGrid = grid;
        GGlobal.modelyuanxiao.CG_YuanXiaoLocal_openBattle_11631(grid.data + self.moneyType);
    };
    Child_ActCom_YuanXiao.prototype.OnReward = function () {
        var self = this;
        if (self.rewardBt.checkNotice) {
            GGlobal.modelyuanxiao.CG_YuanXiaoLocal_make_11637();
        }
        else {
            ViewCommonWarn.text("制作材料不足");
        }
    };
    Child_ActCom_YuanXiao.prototype.OnBack = function () {
        Model_GlobalMsg.CG_ACTTIVITY_OR_SYSTEM_DATA(this.vo.id);
    };
    Child_ActCom_YuanXiao.prototype.OnGo = function () {
        var self = this;
        if (self.curGrid)
            self.curGrid.choose = false;
        self.curGrid = self.gridArr[0];
        self.curGrid.choose = true;
        GGlobal.modelyuanxiao.CG_YuanXiaoLocal_openBattle_11631(self.moneyType);
    };
    Child_ActCom_YuanXiao.prototype.OnSM = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_YUANXIAO);
    };
    Child_ActCom_YuanXiao.prototype.timeHandler = function () {
        var self = this;
        var surTime = self.vo.getSurTime();
        if (surTime > 0) {
            self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(surTime);
        }
        else {
            self.timeLb.text = "活动已结束";
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    Child_ActCom_YuanXiao.URL = "ui://ajaichn8wtx2i";
    Child_ActCom_YuanXiao.pkg = "ActCom_YuanXiao";
    return Child_ActCom_YuanXiao;
}(fairygui.GComponent));
__reflect(Child_ActCom_YuanXiao.prototype, "Child_ActCom_YuanXiao", ["IPanel"]);
