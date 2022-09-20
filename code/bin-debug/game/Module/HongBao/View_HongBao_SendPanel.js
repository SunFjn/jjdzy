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
var View_HongBao_SendPanel = (function (_super) {
    __extends(View_HongBao_SendPanel, _super);
    function View_HongBao_SendPanel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_HongBao_SendPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("HongBao", "View_HongBao_SendPanel"));
    };
    View_HongBao_SendPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var self = this;
        self.view = fairygui.UIPackage.createObject("HongBao", "View_HongBao_SendPanel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.changeBt.visible = false;
        self.zfLb.touchable = false;
    };
    View_HongBao_SendPanel.prototype.updateShow = function () {
        var self = this;
        self.tfCount.text = ConfigHelp.getSystemNum(8101) + "";
    };
    View_HongBao_SendPanel.prototype.onShown = function () {
        var self = this;
        self.zfLb.text = "恭喜发财，大吉大利";
        self.register(true);
        IconUtil.setImg(self.backBg, Enum_Path.ACTCOM_URL + "tianjianghongbao1.png");
        self.updateShow();
    };
    View_HongBao_SendPanel.prototype.onHide = function () {
        var self = this;
        self.register(false);
        IconUtil.setImg(self.backBg, null);
    };
    View_HongBao_SendPanel.prototype.register = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.btnMin, egret.TouchEvent.TOUCH_TAP, self.OnChange, self);
        EventUtil.register(pFlag, self.btnReduce, egret.TouchEvent.TOUCH_TAP, self.OnChange, self);
        EventUtil.register(pFlag, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.OnChange, self);
        EventUtil.register(pFlag, self.btnMax, egret.TouchEvent.TOUCH_TAP, self.OnChange, self);
        EventUtil.register(pFlag, self.sendBt, egret.TouchEvent.TOUCH_TAP, self.OnSend, self);
        EventUtil.register(pFlag, self.changeBt, egret.TouchEvent.TOUCH_TAP, self.OnChangeText, self);
        // EventUtil.register(pFlag, self.zfLb, egret.TextEvent.CHANGE, self.textChange, self);
        // EventUtil.register(pFlag, self.zfLb, egret.TextEvent.FOCUS_IN, self.On_FOCUS_IN, self);
        // EventUtil.register(pFlag, self.zfLb, egret.TextEvent.FOCUS_OUT, self.On_FOCUS_OUT, self);
    };
    View_HongBao_SendPanel.prototype.On_FOCUS_OUT = function () {
        if (!this.zfLb.text) {
            this.zfLb.text = "恭喜发财，大吉大利";
        }
    };
    View_HongBao_SendPanel.prototype.On_FOCUS_IN = function () {
        var self = this;
        self.zfLb.requestFocus();
        this.zfLb.text = "";
        self.zfLb.removeEventListener(egret.TextEvent.FOCUS_IN, self.On_FOCUS_IN, self);
    };
    View_HongBao_SendPanel.prototype.textChange = function () {
        var a = this;
        a.zfLb.requestFocus();
        a.zfLb.text = a.zfLb.text.replace(/\s+/g, ''); //过滤空格
        // if (a.zfLb.text.length > 10) {
        // 	a.zfLb.text = a.zfLb.text.substr(0, 10);
        // }
    };
    View_HongBao_SendPanel.prototype.OnChangeText = function () {
        var self = this;
        // self.zfLb.dispatchEvent(new egret.TextEvent(egret.TextEvent.FOCUS_IN));
    };
    View_HongBao_SendPanel.prototype.OnSend = function () {
        var self = this;
        if (GGlobal.modelHB.surNum <= 0) {
            ViewCommonWarn.text("今日已达发红包上限");
            return;
        }
        var costNum = Number(self.tfCount.text);
        if (GGlobal.modelHB.moneyNum >= costNum) {
            GGlobal.modelHB.CG_RedBoxAct_faBoxs_11763(costNum, self.zfLb.text);
        }
        else {
            ViewCommonWarn.text("银元宝不足");
        }
    };
    View_HongBao_SendPanel.prototype.OnChange = function (evt) {
        var bt = evt.target;
        var self = this;
        var model = GGlobal.modelHB;
        var costNum = Number(self.tfCount.text);
        switch (bt.id) {
            case self.btnMin.id:
                if (costNum > 1000 + ConfigHelp.getSystemNum(8101)) {
                    costNum -= 1000;
                }
                else {
                    costNum = ConfigHelp.getSystemNum(8101);
                }
                break;
            case self.btnReduce.id:
                if (costNum > 100 + ConfigHelp.getSystemNum(8101)) {
                    costNum -= 100;
                }
                else {
                    costNum = ConfigHelp.getSystemNum(8101);
                }
                break;
            case self.btnAdd.id:
                if (costNum + 100 > model.moneyNum && costNum + 100 <= ConfigHelp.getSystemNum(8103)) {
                    costNum = model.moneyNum;
                    if (costNum < ConfigHelp.getSystemNum(8101)) {
                        costNum = ConfigHelp.getSystemNum(8101);
                    }
                    ViewCommonWarn.text("银元宝不足");
                }
                else if (costNum + 100 > ConfigHelp.getSystemNum(8103)) {
                    ViewCommonWarn.text("已达单个红包发放金额上限");
                    costNum = ConfigHelp.getSystemNum(8103);
                }
                else {
                    costNum += 100;
                }
                break;
            case self.btnMax.id:
                if (costNum + 1000 > model.moneyNum && costNum + 1000 <= ConfigHelp.getSystemNum(8103)) {
                    costNum = model.moneyNum;
                    if (costNum < ConfigHelp.getSystemNum(8101)) {
                        costNum = ConfigHelp.getSystemNum(8101);
                    }
                    ViewCommonWarn.text("银元宝不足");
                }
                else if (costNum + 1000 > ConfigHelp.getSystemNum(8103)) {
                    ViewCommonWarn.text("已达单个红包发放金额上限");
                    costNum = ConfigHelp.getSystemNum(8103);
                }
                else {
                    costNum += 1000;
                }
                break;
        }
        self.tfCount.text = costNum + "";
    };
    View_HongBao_SendPanel.URL = "ui://s01exr8xqz02a";
    return View_HongBao_SendPanel;
}(UIModalPanel));
__reflect(View_HongBao_SendPanel.prototype, "View_HongBao_SendPanel");
