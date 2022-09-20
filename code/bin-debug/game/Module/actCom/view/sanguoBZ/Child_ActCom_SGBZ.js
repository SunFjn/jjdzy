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
var Child_ActCom_SGBZ = (function (_super) {
    __extends(Child_ActCom_SGBZ, _super);
    function Child_ActCom_SGBZ() {
        var _this = _super.call(this) || this;
        _this.boxGridArr = [];
        _this.gridArr = [];
        _this.gridLbArr = [];
        _this.drawImgArr = [];
        _this.changeTime = 31;
        return _this;
    }
    Child_ActCom_SGBZ.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComSGBZ", "Child_ActCom_SGBZ"));
    };
    Child_ActCom_SGBZ.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        for (var i = 0; i < 9; i++) {
            self.boxGridArr.push(self["boxGrid" + i]);
            if (i < 3) {
                self.gridArr.push(self["grid" + i]);
                self.gridLbArr.push(self["gridLb" + i]);
                self.drawImgArr.push(self["drawImg" + i]);
            }
        }
    };
    Child_ActCom_SGBZ.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ActCom_SGBZItem.URL, ActCom_SGBZItem);
        f(ActCom_SGBZGrid.URL, ActCom_SGBZGrid);
        f(ActCom_SGBZGrid1.URL, ActCom_SGBZGrid1);
        f(SGBZRewardGrid.URL, SGBZRewardGrid);
    };
    Child_ActCom_SGBZ.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_ActCom_SGBZ.prototype.renderHandler = function (index, item) {
        var model = GGlobal.modelsgbz;
        var index1 = model.qishu * 100 + model.lunshu * 10;
        item.setVo(Config.bzjc_753[index1 + (4 - index)]);
    };
    Child_ActCom_SGBZ.prototype.timeChangeHandler = function () {
        var self = this;
        self.changeTime--;
        if (self.changeTime <= 0) {
            Timer.instance.remove(self.timeChangeHandler, self);
            self.update();
        }
        else {
            self.timeBt.text = "继续寻宝(" + self.changeTime + ")";
        }
    };
    Child_ActCom_SGBZ.prototype.update = function () {
        var self = this;
        var model = GGlobal.modelsgbz;
        if (self.c1.selectedIndex == 1 && model.state == 0 && self.changeTime > 0) {
            self.timeBt.visible = true;
            self.timeBt.text = "继续寻宝(30)";
            Timer.instance.listen(self.timeChangeHandler, self, 1000);
            return;
        }
        self.c1.selectedIndex = model.state;
        if (model.state == 0) {
            self.list.numItems = 3;
        }
        else {
            self.list.numItems = 0;
            self.changeTime = 31;
            self.timeBt.visible = false;
            for (var i = 0; i < self.boxGridArr.length; i++) {
                if (model.rewardData[i + 1]) {
                    self.boxGridArr[i].setVo(i + 1, model.rewardData[i + 1]);
                }
                else {
                    self.boxGridArr[i].setVo(i + 1);
                }
                if (i < self.gridArr.length) {
                    var cfg = void 0;
                    if (i < model.drawStateArr.length) {
                        cfg = Config.ewjl_753[model.drawStateArr[i][0]];
                    }
                    else {
                        cfg = Config.ewjl_753[model.qishu * 10000 + (model.lunshu - 1) * 3 + i + 1];
                    }
                    var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jl));
                    self.gridArr[i].tipEnabled = false;
                    self.gridArr[i].isShowEff = true;
                    self.gridArr[i].vo = arr[0];
                    self.gridArr[i].checkNotice = i < model.drawStateArr.length && model.drawStateArr[i][1] == 1;
                    self.gridLbArr[i].text = "开启" + cfg.kqsl + "次";
                    self.drawImgArr[i].visible = i < model.drawStateArr.length && model.drawStateArr[i][1] == 2;
                }
            }
            self.expbar.value = model.drawNum;
            self.expbar.max = self.boxGridArr.length;
            var moneyArr = void 0;
            if (Config.cjxh_753[model.drawNum + 1]) {
                moneyArr = JSON.parse(Config.cjxh_753[model.drawNum + 1].xh);
            }
            else {
                moneyArr = JSON.parse(Config.cjxh_753[model.drawNum].xh);
            }
            self.moneyLb.text = "当前开启宝箱消耗：       " + moneyArr[0][2];
        }
        self.numLb.text = "当前寻宝轮数：" + HtmlUtil.fontNoSize(model.lunshu + "/" + model.maxLun, Color.getColorStr(2));
    };
    Child_ActCom_SGBZ.prototype.onLink = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_SGBZ);
    };
    Child_ActCom_SGBZ.prototype.onSure = function () {
        var self = this;
        var index = 0;
        var arr = [];
        var model = GGlobal.modelsgbz;
        for (var key in model.selectData) {
            var cfg = Config.bzjc_753[key];
            if (model.selectData[key].length >= 5 - cfg.dc) {
                index++;
                arr[4 - cfg.dc] = [parseInt(key), model.selectData[key]];
            }
            else {
                return ViewCommonWarn.text("尚有宝藏未选择必出奖励");
            }
        }
        if (index >= self.list.numItems) {
            GGlobal.layerMgr.open(UIConst.ACTCOM_SGBZ_LIST, arr);
        }
        else {
            ViewCommonWarn.text("尚有宝藏未选择必出奖励");
        }
    };
    Child_ActCom_SGBZ.prototype.onTime = function () {
        var self = this;
        if (self.vo.getSurTime() > 0) {
            self.timeLb.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(self.vo.getSurTime()), Color.getColorStr(2));
            Timer.instance.listen(self.onTime, self);
        }
        else {
            self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
            Timer.instance.remove(self.onTime, self);
        }
    };
    Child_ActCom_SGBZ.prototype.onDraw = function (arr) {
        if (arr[1] == 1) {
            GGlobal.layerMgr.close2(UIConst.REWARD_SHOW);
            GGlobal.modelsgbz.CG_CountryTreasure_getExrReward_8655(arr[0]);
        }
        else {
            ViewCommonWarn.text("未达到领取条件");
        }
    };
    Child_ActCom_SGBZ.prototype.onGrid = function (evt) {
        var self = this;
        var grid = evt.target;
        View_Reward_Show.show([grid.vo], "", "", Handler.create(self, self.onDraw, [GGlobal.modelsgbz.drawStateArr[grid.data]]), GGlobal.modelsgbz.drawStateArr[grid.data][1]);
    };
    Child_ActCom_SGBZ.prototype.openPreView = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.modelsgbz.CG_ACTCOM_SGBZ_SURREWARD();
    };
    Child_ActCom_SGBZ.prototype.changeHandler = function () {
        var self = this;
        Timer.instance.remove(self.timeChangeHandler, self);
        self.changeTime = 0;
        self.update();
    };
    Child_ActCom_SGBZ.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SGBZ);
        GGlobal.control.listen(UIConst.ACTCOM_SGBZ, self.update, self);
        if (pData.getSurTime() > 0) {
            self.timeLb.text = "活动剩余时间：" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(pData.getSurTime()), Color.getColorStr(2));
            Timer.instance.listen(self.onTime, self);
        }
        else {
            self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
        }
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].data = i;
            self.gridArr[i].addClickListener(self.onGrid, self);
        }
        self.linkLb0.addClickListener(self.openGaiLV, self);
        self.linkLb.addClickListener(self.onLink, self);
        self.sureBt.addClickListener(self.onSure, self);
        self.previewLb.addClickListener(self.openPreView, self);
        self.timeBt.addClickListener(self.changeHandler, self);
    };
    Child_ActCom_SGBZ.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 9);
    };
    Child_ActCom_SGBZ.prototype.closePanel = function (pData) {
        var self = this;
        GGlobal.control.remove(UIConst.ACTCOM_SGBZ, self.update, self);
        Timer.instance.remove(self.onTime, self);
        Timer.instance.remove(self.timeChangeHandler, self);
        self.linkLb0.removeClickListener(self.openGaiLV, self);
        self.linkLb.removeClickListener(self.onLink, self);
        self.sureBt.removeClickListener(self.onSure, self);
        self.timeBt.removeClickListener(self.changeHandler, self);
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].removeClickListener(self.onGrid, self);
            self.gridArr[i].clean();
        }
        self.list.numItems = 0;
    };
    Child_ActCom_SGBZ.URL = "ui://y9683xrpzm7h9";
    Child_ActCom_SGBZ.pkg = "ActComSGBZ";
    return Child_ActCom_SGBZ;
}(fairygui.GComponent));
__reflect(Child_ActCom_SGBZ.prototype, "Child_ActCom_SGBZ", ["IPanel"]);
