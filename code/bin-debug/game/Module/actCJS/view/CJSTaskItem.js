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
 * @date: 2019-11-21 18:19:52
 */
var CJSTaskItem = (function (_super) {
    __extends(CJSTaskItem, _super);
    function CJSTaskItem() {
        return _super.call(this) || this;
    }
    CJSTaskItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCJS", "CJSTaskItem"));
    };
    CJSTaskItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    CJSTaskItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.stateCtrl.selectedIndex = pData.state;
            var t_color = Color.REDSTR;
            if (pData.count >= pData.cfg.cs1) {
                t_color = Color.GREENSTR;
            }
            t.tfContent.text = pData.cfg.ms + HtmlUtil.font(" (" + ConfigHelp.getYiWanText(pData.count) + "/" + ConfigHelp.getYiWanText(parseInt(pData.cfg.cs1)) + ")", t_color);
        }
        else {
            t.registerEvent(false);
        }
    };
    CJSTaskItem.prototype.clean = function () {
        var t = this;
        t.setData(null);
        _super.prototype.clean.call(this);
    };
    CJSTaskItem.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    CJSTaskItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    CJSTaskItem.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnGo:
                if (!t._curData)
                    return;
                var t_openId = this._curData.cfg.open;
                if (t_openId == UIConst.CHONGZHI) {
                    //需要判断充值过没有，没有充值过的话，都是打开首充界面
                    ViewChongZhi.tryToOpenCZ();
                }
                else {
                    if (!ModuleManager.isOpen(t_openId, true))
                        return;
                    var t_cla = GGlobal.layerMgr.getClassById(t_openId);
                    if (t_cla == ViewActCom) {
                        //先关闭当前面板
                        GGlobal.layerMgr.close2(UIConst.ACTCOM);
                    }
                    GGlobal.layerMgr.open(t_openId);
                }
                break;
        }
        GGlobal.layerMgr.close2(UIConst.ACTCOM_CJS_TASK);
    };
    //>>>>end
    CJSTaskItem.URL = "ui://ehocr0vupwnza";
    return CJSTaskItem;
}(fairygui.GComponent));
__reflect(CJSTaskItem.prototype, "CJSTaskItem");
