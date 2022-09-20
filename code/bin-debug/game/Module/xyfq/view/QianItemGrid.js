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
 * @date: 2020-04-10 10:38:36
 */
var QianItemGrid = (function (_super) {
    __extends(QianItemGrid, _super);
    function QianItemGrid() {
        return _super.call(this) || this;
    }
    QianItemGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "QianItemGrid"));
    };
    QianItemGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    QianItemGrid.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            var t_posId = pData.posId;
            t.qianIcon.url = CommonManager.getUrl("xyfq", "qian_" + t_posId);
            t.icon = CommonManager.getUrl("xyfq", "color_" + t_posId);
        }
        else {
            t.registerEvent(false);
        }
    };
    QianItemGrid.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    QianItemGrid.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    QianItemGrid.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    };
    //======================================== handler =========================================
    QianItemGrid.prototype.onClick = function (e) {
        var t = this;
        if (t._curData) {
            FastAPI.showItemTips(t._curData.id, ViewGrid.BAG);
        }
    };
    //>>>>end
    QianItemGrid.URL = "ui://7hwmix0gszt5w";
    return QianItemGrid;
}(fairygui.GLabel));
__reflect(QianItemGrid.prototype, "QianItemGrid");
