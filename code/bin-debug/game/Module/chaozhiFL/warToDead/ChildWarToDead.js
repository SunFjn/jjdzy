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
var ChildWarToDead = (function (_super) {
    __extends(ChildWarToDead, _super);
    function ChildWarToDead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grids = [];
        _this.awaterPos = { x: 320, y: 388 };
        _this.gridStartPos = { x: 175, y: 490 };
        return _this;
    }
    ChildWarToDead.getInst = function () {
        return this._inst || (this._inst = fairygui.UIPackage.createObject("chaozhifanli", "ChildWarToDead"));
    };
    ChildWarToDead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onSel, self);
        self.list.itemRenderer = self.onItemRender;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        self.btnHand.addClickListener(self.onHand, self);
        self.btnLeft.displayObject.touchEnabled = true;
        self.btnRight.displayObject.touchEnabled = true;
        self.gridBigAward.isShowEff = true;
        self.gridBigAward1.isShowEff = true;
        CommonManager.listPageChange("ChildWarToDead", self.list, self.btnLeft, self.btnRight, 5);
    };
    ChildWarToDead.prototype.onItemRender = function (index, render) {
        var data = this.datas[index];
        render.data = data;
    };
    ChildWarToDead.prototype.onHand = function () {
        if (GGlobal.modelWarToDead.warHasEnd()) {
            return;
        }
        if (!this.selData) {
            return;
        }
        var qishu = GGlobal.modelWarToDead.qiShu;
        if (TimeUitl.isIn7Days()) {
            id = this.selData.id;
        }
        else if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            var id = this.selData.id - (qishu - 1) * 1000;
        }
        else {
            id = this.selData.id - (qishu - 1) * 20;
        }
        var highestLayer = GGlobal.modelWarToDead.highestLayer;
        if (id > highestLayer + 1) {
            ViewCommonWarn.text("需通关上一关卡");
        }
        else {
            if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
                GGlobal.modelWarToDead.CG4751();
            }
            else {
                GGlobal.modelWarToDead.challenge();
            }
        }
    };
    ChildWarToDead.prototype.onSel = function (evt) {
        var item = evt.itemObject;
        this.selData = item.data;
        this.list.selectedIndex = this.datas.indexOf(this.selData);
        this.showDetail();
    };
    ChildWarToDead.prototype.onUpdate = function () {
        var model = GGlobal.modelWarToDead;
        var self = this;
        self.datas = model.getAllDatas();
        self.list.numItems = self.datas.length;
        self.btnHand.checkNotice = model.checkNotice();
        self.setSel();
        self.showDetail();
    };
    ChildWarToDead.prototype.setSel = function () {
        var self = this;
        var model = GGlobal.modelWarToDead;
        var maxLayer = 0;
        for (var i = 0; i < self.datas.length; i++) {
            var data = self.datas[i];
            if (data.id > maxLayer) {
                maxLayer = data.id;
            }
        }
        var qishu = GGlobal.modelWarToDead.qiShu;
        if (qishu >= 2) {
            maxLayer = maxLayer - (qishu - 1) * 1000;
        }
        var layer = model.highestLayer ? model.highestLayer : 0; //当前关卡
        layer = Math.min(layer + 1, maxLayer); //下一关
        if (layer < 1)
            layer = 1;
        self.selData = self.datas[layer - 1];
        self.list.scrollToView(self.list.selectedIndex = layer - 1);
    };
    ChildWarToDead.prototype.showDetail = function () {
        var self = this;
        var selData = self.selData;
        var modelWarToDead = GGlobal.modelWarToDead;
        var qishu = modelWarToDead.qiShu;
        var lastLayer = self.datas[self.datas.length - 1];
        if (!lastLayer)
            return;
        self.txtZhanLi.text = "\u6218\u529B+" + lastLayer.power2;
        self.txtZhanLi1.text = "\u6218\u529B+" + lastLayer.power1;
        var curGua = 0;
        if (TimeUitl.isIn7Days()) {
            curGua = selData.id;
            self.txtHighestLayer.text = "\u901A\u5173\u7B2C" + lastLayer.id + "\u5173";
        }
        else if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            curGua = selData.id - (qishu - 1) * 1000;
            self.txtHighestLayer.text = "\u901A\u5173\u7B2C" + (lastLayer.id - (qishu - 1) * 1000) + "\u5173";
        }
        else {
            curGua = selData.id - (qishu - 1) * 20;
            self.txtHighestLayer.text = "\u901A\u5173\u7B2C" + (lastLayer.id - (qishu - 1) * 20) + "\u5173";
        }
        self.txtLayer.text = "\u7B2C" + curGua + "\u5173";
        self.txtHighestLayer1.text = "\u901A\u5173\u7B2C10\u5173";
        ConfigHelp.cleanGridEff([self.gridBigAward]);
        self.gridBigAward.vo = ConfigHelp.makeItemListArr(JSON.parse(selData.reward2))[0];
        self.gridBigAward.tipEnabled = true;
        ConfigHelp.cleanGridEff([self.gridBigAward1]);
        self.gridBigAward1.vo = ConfigHelp.makeItemListArr(JSON.parse(selData.reward1))[0];
        self.gridBigAward1.tipEnabled = true;
        var childIndex = self.getChildIndex(self["n56"]);
        ExtralFunc.addBigAdEff("ChildWarToDead", self["n40"], "uieff/10022", childIndex - 1);
        ExtralFunc.addBigAdEff("ChildWarToDead1", self["n63"], "uieff/10022", childIndex - 1);
        self.txtTJZhanLi.text = HtmlUtil.fontNoSize("\u63A8\u8350\u6218\u529B ", "#00FF00") + HtmlUtil.fontNoSize("" + selData.power, "#ff9900");
        var awars = ConfigHelp.makeItemListArr(JSON.parse(selData.reward));
        if (self.grids) {
            ConfigHelp.cleanGridview(self.grids);
        }
        self.grids = ConfigHelp.addGridview(awars, self, self.gridStartPos.x, self.gridStartPos.y, true, false, 5, 110, 0.8);
        if (modelWarToDead.highestLayer >= curGua) {
            self.iconTG.visible = true;
            self.btnHand.visible = false;
        }
        else {
            self.iconTG.visible = false;
            self.btnHand.visible = true;
        }
        self.updateAwater();
        self.showLeftTm();
    };
    ChildWarToDead.prototype.showLeftTm = function () {
        var self = this;
        var leftDay = 8 - Model_GlobalMsg.kaifuDay;
        if (leftDay > 1) {
            this.addTimer(1000 * 60 * 60);
        }
        else {
            if (leftDay <= 0) {
                var ms = Model_GlobalMsg.getServerTime();
                var actObj = ModelEightLock.originalDatas[UIConst.WARTODEAD1];
                if (!actObj) {
                    actObj = self.getActObj();
                }
                if (!actObj) {
                    self.removeTimer();
                    return;
                }
                var timePassed = actObj.end * 1000 - ms;
                var day = timePassed / (1000 * 60 * 60 * 24);
                if (day > 1) {
                    self.addTimer(1000 * 60 * 60);
                }
                else {
                    self.addTimer();
                }
            }
            else {
                self.addTimer();
            }
        }
    };
    ChildWarToDead.prototype.addTimer = function (time) {
        if (time === void 0) { time = 1000; }
        Timer.instance.listen(this.onTimer, this, time, 0, true);
    };
    ChildWarToDead.prototype.removeTimer = function () {
        Timer.instance.remove(this.onTimer, this);
        this.txtLeftTm.text = "00:00:00";
    };
    ChildWarToDead.prototype.onTimer = function () {
        var self = this;
        var ms = Model_GlobalMsg.getServerTime();
        var day = 8 - Model_GlobalMsg.kaifuDay;
        var data = DateUtil.clearHourse(new Date(ms));
        if (day <= 0) {
            var actObj = ModelEightLock.originalDatas[UIConst.WARTODEAD1];
            if (!actObj) {
                actObj = self.getActObj();
            }
            if (!actObj) {
                self.removeTimer();
                return;
            }
            var timePassed = actObj.end * 1000 - ms;
            var day = timePassed / (1000 * 60 * 60 * 24);
            if (day <= 1) {
                self.txtLeftTm.text = DateUtil.getHMSBySecond(timePassed / 1000 >> 0);
                if (timePassed < 0) {
                    self.removeTimer();
                }
            }
            else {
                var hour = (day - (day >> 0)) * 24 >> 0;
                self.txtLeftTm.text = (day >> 0) + "天" + hour + "小时";
            }
        }
        else {
            var h0 = data.getTime();
            var ax = 86400000 - (ms - h0);
            if (day <= 1) {
                self.txtLeftTm.text = DateUtil.getHMSBySecond((ax / 1000) >> 0);
                if (ax < 0) {
                    self.removeTimer();
                }
            }
            else {
                var hour = ax / (1000 * 60 * 60) >> 0;
                self.txtLeftTm.text = (day - 1) + "天" + hour + "小时";
            }
        }
    };
    ChildWarToDead.prototype.getActObj = function () {
        var arr = GGlobal.modelActivity.getGroup(UIConst.CHAOZHIFL); //Model_Activity.activityObj[UIConst.CHAOZHIFL];
        for (var i = 0; i < arr.length; i++) {
            var act = arr[i];
            if (act.id == UIConst.WARTODEAD_7OUT || act.id == UIConst.WARTODEAD_7IN) {
                return arr[i];
            }
        }
        return null;
    };
    ChildWarToDead.prototype.updateAwater = function () {
        var self = this;
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.uiparent = self._container;
            self.awatar.setPos(self.awaterPos.x, self.awaterPos.y);
            self.awatar.setScaleXY(1.2, 1.2);
        }
        var lb = Config.NPC_200[self.selData.boss];
        self.awatar.setBody(lb.mod);
        if (lb.weapon) {
            self.awatar.setWeapon(lb.mod);
        }
        else {
            self.awatar.setWeapon(null);
        }
        self.awatar.onAdd();
    };
    ChildWarToDead.prototype.open = function () {
        var self = this;
        GGlobal.modelWarToDead.listen(ModelWarToDead.msg_datas, self.onUpdate, self);
        if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            GGlobal.modelEightLock.CG4571(UIConst.WARTODEAD1);
        }
        else {
            GGlobal.modelWarToDead.openUI();
        }
        IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "cjfl.jpg");
    };
    ChildWarToDead.prototype.close = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        self.selData = null;
        self.list.scrollToView(0);
        self.removeTimer();
        GGlobal.modelWarToDead.remove(ModelWarToDead.msg_datas, self.onUpdate, self);
        ConfigHelp.cleanGridview(self.grids);
        IconUtil.setImg(self.bg, null);
        ExtralFunc.addBigAdEff("ChildWarToDead", self["n40"], null);
        ExtralFunc.addBigAdEff("ChildWarToDead1", self["n63"], null);
        if (self.gridBigAward) {
            ConfigHelp.cleanGridEff([self.gridBigAward]);
        }
        if (self.gridBigAward1) {
            ConfigHelp.cleanGridEff([self.gridBigAward1]);
        }
        self.list.numItems = 0;
    };
    ChildWarToDead.URL = "ui://qzsojhcrasooh";
    return ChildWarToDead;
}(fairygui.GComponent));
__reflect(ChildWarToDead.prototype, "ChildWarToDead", ["ICZFLView"]);
