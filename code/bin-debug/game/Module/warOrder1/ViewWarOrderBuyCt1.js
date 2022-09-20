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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewWarOrderBuyCt1 = (function (_super) {
    __extends(ViewWarOrderBuyCt1, _super);
    function ViewWarOrderBuyCt1() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewWarOrderBuyCt1.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderBuyCt1"));
    };
    ViewWarOrderBuyCt1.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderBuyCt1").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewWarOrderBuyCt1.prototype.onShown = function () {
        var self = this;
        self._curActVo = self._args;
        self.registerEvent(true);
        self.refreshData();
    };
    ViewWarOrderBuyCt1.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        IconUtil.setImg(self.img, null);
    };
    //===================================== private method =====================================
    ViewWarOrderBuyCt1.prototype.refreshData = function () {
        var t = this;
        var m = GGlobal.modelWarOrder;
        var voWarO = m.getWarOrder(t._curActVo.id);
        var max = m.getBuyCtMax(t._curActVo.qs);
        var color1 = max == voWarO.buyNum ? Color.REDSTR : Color.GREENSTR;
        t.lb2.text = ConfigHelp.reTxt("(今日还可购买<font color='{0}'>{1}/{2}</font>次)", color1, max - voWarO.buyNum, max);
        var cfg = Config.kssjbuy1_338[t._curActVo.qs * 100 + voWarO.buyNum + 1];
        if (!cfg) {
            cfg = Config.kssjbuy1_338[t._curActVo.qs * 100 + voWarO.buyNum];
        }
        var cost = JSON.parse(cfg.consume)[0][2];
        var type = JSON.parse(cfg.consume)[0][0];
        IconUtil.setImg(t.img, Enum_Path.ICON70_URL + type + ".png");
        var color = Model_player.voMine.yuanbao >= cost ? Color.GREENSTR : Color.REDSTR;
        t.lb1.text = HtmlUtil.fontNoSize(cost + "", color) + "购买1级勋章等级";
        t._cost = cost;
    };
    ViewWarOrderBuyCt1.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnOk, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCancel, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        GGlobal.control.register(pFlag, Enum_MsgType.WARORDERL_OPENUI, t.refreshData, t);
    };
    ViewWarOrderBuyCt1.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnOk:
                var m = GGlobal.modelWarOrder;
                var voWarO = m.getWarOrder(t._curActVo.id);
                var max = m.getBuyCtMax(t._curActVo.qs);
                if (max - voWarO.buyNum <= 0) {
                    ViewCommonWarn.text("没有购买次数");
                    return;
                }
                if (Model_player.voMine.yuanbao < t._cost) {
                    ModelChongZhi.guideToRecharge();
                    return;
                }
                if (voWarO.levelId >= m.getLvMax(t._curActVo.qs)) {
                    ViewCommonWarn.text("勋章等级已满");
                    return;
                }
                GGlobal.modelWarOrder.CG12261(t._curActVo.groupId);
                break;
            case t.btnCancel:
                GGlobal.layerMgr.close(UIConst.WAR_ORDER_BUYCT);
                break;
        }
        // ViewMgr.close(UIConst.WAR_ORDER_BUYCT);
    };
    //>>>>end
    ViewWarOrderBuyCt1.URL = "ui://89er3bo3e7lc4";
    return ViewWarOrderBuyCt1;
}(UIModalPanel));
__reflect(ViewWarOrderBuyCt1.prototype, "ViewWarOrderBuyCt1");
