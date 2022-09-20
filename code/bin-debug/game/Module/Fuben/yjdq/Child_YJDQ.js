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
var Child_YJDQ = (function (_super) {
    __extends(Child_YJDQ, _super);
    function Child_YJDQ() {
        var _this = _super.call(this) || this;
        //>>>>end
        _this.tabArr = [];
        return _this;
    }
    Child_YJDQ.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "Child_YJDQ"));
    };
    Child_YJDQ.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_YJDQ.prototype.openPanel = function (pData) {
        this.show();
    };
    Child_YJDQ.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_YJDQ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        for (var i = 0; i < 4; i++) {
            var tab = (self.getChild("tab" + i));
            tab.data = i;
            self.tabArr.push(tab);
            tab.addClickListener(self.tabHandler, self);
        }
        self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
        self.battleBt.addClickListener(self.battleHandle, self);
        self.drawBt.addClickListener(self.drawHandle, self);
        self.addBt.addClickListener(self.addHandler, self);
        self.rankBt.addClickListener(self.rankHandler, self);
        self.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAdd, self);
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemove, self);
    };
    Child_YJDQ.prototype.onAdd = function () {
        IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "yjdq.jpg");
    };
    Child_YJDQ.prototype.onRemove = function () {
        IconUtil.setImg(this.backImg, null);
        GGlobal.control.remove(Enum_MsgType.YJDQ_INIT_UPDATE, this.show, this);
    };
    Child_YJDQ.prototype.rankHandler = function () {
        GGlobal.layerMgr.open(UIConst.FUBEN_YJDQ_RANK);
    };
    Child_YJDQ.prototype.addHandler = function () {
        var self = this;
        var maxNum = Config.xtcs_004[1021].num;
        var costMoney = Config.xtcs_004[1022].num;
        if (Model_YJDQ.buyNum >= maxNum) {
            ViewCommonWarn.text("购买次数不足");
            return;
        }
        var buyMax = 999;
        ViewAlertBuy.show(costMoney, maxNum - Model_YJDQ.buyNum, buyMax, "", Handler.create(null, self.okHandle));
    };
    Child_YJDQ.prototype.okHandle = function (ct) {
        var costMoney = Config.xtcs_004[1022].num;
        if (Model_player.voMine.yuanbao <= costMoney) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelyjdq.CG_YJDQ_BUY_BATTLENUM(ct);
    };
    Child_YJDQ.prototype.drawHandle = function () {
        var self = this;
        if (self.drawBt.checkNotice) {
            GGlobal.modelyjdq.CG_YJDQ_DRAWREWARD(self.c1.selectedIndex + 1);
        }
        else {
            var max = Model_YJDQ.rewardMax;
            var cfg = Config.yiqi_007[Math.floor(Model_YJDQ.dataArr[self.c1.selectedIndex][1] / max + 1) * max];
            if (!cfg) {
                ViewCommonWarn.text("奖励已领取");
            }
            else {
                ViewCommonWarn.text("未首通目标关卡");
            }
        }
    };
    Child_YJDQ.prototype.battleHandle = function () {
        var self = this;
        if (Model_YJDQ.battleNum >= 1) {
            GGlobal.modelyjdq.CG_YJDQ_BATTLEBYTYPE(self.c1.selectedIndex + 1);
        }
        else {
            self.addHandler();
        }
    };
    Child_YJDQ.prototype.tabHandler = function (event) {
        var self = this;
        var index = event.target.data;
        if (self.c1.selectedIndex == index)
            return;
        if (index + 1 > Model_YJDQ.type) {
            self.tabArr[index].selected = false;
            var arr1 = ["普通", "困难", "噩梦", "传说"];
            ViewCommonWarn.text("通关" + arr1[index - 1] + "难度100关开启");
            return;
        }
        self.tabArr[self.c1.selectedIndex].selected = false;
        self.tabArr[index].selected = true;
        self.c1.selectedIndex = index;
    };
    Child_YJDQ.prototype.setMaxPass = function () {
        var self = this;
        var arr1 = ["", "普通", "困难", "噩梦", "传说"];
        var cfg = Config.yiqi_007[Model_YJDQ.passMax];
        if (!cfg) {
            self.labMax.text = "历史最高通关：" + arr1[Model_YJDQ.type] + "0波";
        }
        else {
            self.labMax.text = "历史最高通关：" + arr1[cfg.type] + cfg.bo + "波";
        }
    };
    Child_YJDQ.prototype.updateShow = function () {
        if (Model_YJDQ.dataArr.length <= 0)
            return;
        var self = this;
        var max = Model_YJDQ.rewardMax;
        for (var i = 0; i < self.tabArr.length; i++) {
            self.tabArr[i].checkNotice(Model_YJDQ.checkNoticeByType(i));
        }
        var cfg = Config.yiqi_007[Math.floor(Model_YJDQ.dataArr[self.c1.selectedIndex][1] / max + 1) * max];
        var cfg1 = Config.yiqi_007[Model_YJDQ.dataArr[self.c1.selectedIndex][0]];
        if (!cfg) {
            self.drawImg.visible = true;
            self.drawBt.visible = false;
            cfg = Config.yiqi_007[Model_YJDQ.dataArr[self.c1.selectedIndex][1]];
            self.drawBt.checkNotice = false;
        }
        else {
            self.drawImg.visible = false;
            self.drawBt.visible = true;
            self.drawBt.enabled = self.drawBt.checkNotice = cfg.index <= Model_YJDQ.passMax;
        }
        var arr = JSON.parse(cfg.award);
        var itemVo = VoItem.create(arr[0][1]);
        itemVo.count = arr[0][2];
        self.grid.vo = itemVo;
        self.passLb.setVar("pass", "" + cfg.bo).flushVars();
        if (cfg.power <= 0) {
            self.powerLb.text = "战力飙升";
        }
        else {
            self.powerLb.text = "战力+" + cfg.power;
        }
        if (cfg1) {
            self.curPassLb.text = cfg1.bo + "";
        }
        else {
            self.curPassLb.text = "0";
        }
        if (Model_YJDQ.battleNum < 1) {
            self.battleLb.setVar("str", HtmlUtil.fontNoSize(Model_YJDQ.battleNum + "/1", Color.getColorStr(6))).flushVars();
        }
        else {
            self.battleLb.setVar("str", HtmlUtil.fontNoSize(Model_YJDQ.battleNum + "/1", Color.getColorStr(0))).flushVars();
        }
        if (Model_YJDQ.type <= 1) {
            for (var i = 0; i < self.tabArr.length; i++) {
                self.tabArr[i].visible = false;
            }
            self.tabBg.visible = false;
        }
        else {
            self.tabBg.visible = true;
            for (var i = 0; i < self.tabArr.length; i++) {
                if (i < Model_YJDQ.type) {
                    self.tabArr[i].visible = true;
                }
                else {
                    self.tabArr[i].visible = false;
                }
            }
            if (Model_YJDQ.type == 2) {
                self.tabArr[0].x = 186;
                self.tabArr[1].x = 329;
            }
            else if (Model_YJDQ.type == 3) {
                // let ge = 128; let xpot = (623-159)/2-ge=104
                self.tabArr[0].x = 117;
                self.tabArr[1].x = 255;
                self.tabArr[2].x = 398;
            }
            else {
                self.tabArr[0].x = 48;
                self.tabArr[1].x = 186;
                self.tabArr[2].x = 329;
                self.tabArr[3].x = 475;
            }
        }
        self.setMaxPass();
    };
    Child_YJDQ.prototype.show = function () {
        var self = this;
        if (!Model_YJDQ.isFirstOpen) {
            GGlobal.modelyjdq.CG_OPEN_YJDQ();
            GGlobal.control.listen(Enum_MsgType.YJDQ_INIT_UPDATE, self.show, self);
            return;
        }
        if (self.c1.selectedIndex == Model_YJDQ.type - 1) {
            self.updateShow();
        }
        else {
            self.tabArr[self.c1.selectedIndex].selected = false;
            self.c1.selectedIndex = Model_YJDQ.type - 1;
        }
        self.tabArr[self.c1.selectedIndex].selected = true;
        GGlobal.reddot.listen(ReddotEvent.CHECK_YJDQ, self.updateShow, self);
    };
    Child_YJDQ.prototype.disposePanel = function () {
        var self = this;
        GGlobal.reddot.remove(ReddotEvent.CHECK_YJDQ, self.updateShow, self);
    };
    Child_YJDQ.URL = "ui://pkuzcu87jie02";
    return Child_YJDQ;
}(fairygui.GComponent));
__reflect(Child_YJDQ.prototype, "Child_YJDQ", ["IPanel"]);
