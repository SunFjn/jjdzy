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
/**
 * @author: lujiahao
 * @date: 2020-02-20 16:54:12
 */
var GGLBuyPanel = (function (_super) {
    __extends(GGLBuyPanel, _super);
    function GGLBuyPanel() {
        return _super.call(this) || this;
    }
    GGLBuyPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("ggl", "GGLBuyPanel"));
    };
    GGLBuyPanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    GGLBuyPanel.prototype.initView = function (pParent) {
    };
    GGLBuyPanel.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        t.visible = true;
        t.refreshData();
    };
    GGLBuyPanel.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        t.visible = false;
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    GGLBuyPanel.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelGGL;
        t.tfFree.visible = false;
        t.groupConsume.visible = false;
        if (t_model.freeCount > 0) {
            t.tfFree.visible = true;
            t.tfFree.text = "\u4ECA\u65E5\u514D\u8D39\u6B21\u6570\uFF1A<font color='#00ff00'>" + t_model.freeCount + "/" + t_model.maxFree + "</font>";
        }
        else {
            t.groupConsume.visible = true;
            t.resCom.setItemId(EnumGGL.CONSUME_ID);
            var t_bagCount = FastAPI.getItemCount(EnumGGL.CONSUME_ID);
            var t_need = 1;
            t.resCom.setLb(t_bagCount, t_need);
        }
    };
    GGLBuyPanel.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnBuy, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    GGLBuyPanel.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelGGL;
        switch (e.currentTarget) {
            case t.btnBuy:
                t_model.CG_ScratchTicket_draw_11791();
                break;
        }
    };
    //>>>>end
    GGLBuyPanel.URL = "ui://wnqj5rwkloxzg";
    return GGLBuyPanel;
}(fairygui.GComponent));
__reflect(GGLBuyPanel.prototype, "GGLBuyPanel", ["IPanel"]);
