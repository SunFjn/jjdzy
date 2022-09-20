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
var View_YanHuiScene_TopPanel = (function (_super) {
    __extends(View_YanHuiScene_TopPanel, _super);
    function View_YanHuiScene_TopPanel() {
        return _super.call(this) || this;
    }
    View_YanHuiScene_TopPanel.createInstance = function () {
        if (!View_YanHuiScene_TopPanel._instance)
            View_YanHuiScene_TopPanel._instance = (fairygui.UIPackage.createObject("YanHui", "View_YanHuiScene_TopPanel"));
        return View_YanHuiScene_TopPanel._instance;
    };
    View_YanHuiScene_TopPanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.gridArr = [self.grid0, self.grid1, self.grid2, self.grid3, self.grid4];
        self.fwLbArr = [self.fwLb0, self.fwLb1, self.fwLb2, self.fwLb3, self.fwLb4];
    };
    View_YanHuiScene_TopPanel.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        var max = 0;
        if (model.fwArr.length <= 0)
            return;
        self.nameLb.text = HtmlUtil.fontNoSize(model.roleName, Color.getColorStr(2)) + "的" + Config.party_298[model.yanHuiType].name;
        self.numLb.text = ConfigHelp.reTxt("参与人数：{0}/{1}", model.num, Config.party_298[model.yanHuiType].num);
        var fwArr = model.fwArr[model.yanHuiType - 1];
        for (var i = 0; i < self.gridArr.length; i++) {
            var cfg = fwArr[i][0];
            self.fwLbArr[i].text = "" + cfg.fw;
            self.gridArr[i].isShowEff = true;
            self.gridArr[i].tipEnabled = false;
            self.gridArr[i].data = i;
            self.gridArr[i].vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
            if (i == self.gridArr.length - 1) {
                max = cfg.fw;
            }
        }
        self.expBar.value = model.fwNum;
        self.expBar.max = max;
        var times = ConfigHelp.getSurTime(model.times);
        if (times > 0) {
            self.timeLb.text = "剩余时间：" + DateUtil2.formatUsedTime(times, "hh:uu:ss");
            if (!Timer.instance.has(self.timeHandler, self)) {
                Timer.instance.listen(self.timeHandler, self, 1000);
            }
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    View_YanHuiScene_TopPanel.prototype.timeHandler = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        var times = ConfigHelp.getSurTime(model.times);
        if (times > 0) {
            self.timeLb.text = "剩余时间：" + DateUtil2.formatUsedTime(times, "hh:uu:ss");
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    View_YanHuiScene_TopPanel.prototype.onShown = function () {
        var self = this;
        self.updateShow();
        self.register(true);
    };
    View_YanHuiScene_TopPanel.prototype.onHide = function () {
        var self = this;
        ConfigHelp.cleanGridEff(self.gridArr);
        Timer.instance.remove(self.timeHandler, self);
        self.register(false);
    };
    View_YanHuiScene_TopPanel.prototype.register = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.lookLb, egret.TouchEvent.TOUCH_TAP, self.onLook, self);
        EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.onSM, self);
        GGlobal.control.register(pFlag, UIConst.YANHUI, self.updateShow, self);
        for (var i = 0; i < self.gridArr.length; i++) {
            EventUtil.register(pFlag, self.gridArr[i], egret.TouchEvent.TOUCH_TAP, self.onGrid, self);
        }
    };
    View_YanHuiScene_TopPanel.prototype.onGrid = function (evt) {
        var model = GGlobal.modelYanHui;
        GGlobal.layerMgr.open(UIConst.YANHUI_FWREWARD, model.fwArr[model.yanHuiType - 1][evt.target.data]);
    };
    View_YanHuiScene_TopPanel.prototype.onSM = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.YANHUI);
    };
    View_YanHuiScene_TopPanel.prototype.onLook = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.YANHUI_BKLIST);
    };
    View_YanHuiScene_TopPanel.URL = "ui://4x7dk3lhgz25h";
    return View_YanHuiScene_TopPanel;
}(fairygui.GComponent));
__reflect(View_YanHuiScene_TopPanel.prototype, "View_YanHuiScene_TopPanel");
