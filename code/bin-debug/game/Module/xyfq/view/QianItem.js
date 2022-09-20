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
 * @date: 2020-04-07 16:12:57
 */
var QianItem = (function (_super) {
    __extends(QianItem, _super);
    function QianItem() {
        var _this = _super.call(this) || this;
        _this._curCount = 0;
        return _this;
    }
    QianItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "QianItem"));
    };
    QianItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
    };
    //=========================================== API ==========================================
    QianItem.prototype.setData = function (pData) {
        var t = this;
        t.curData = pData;
        if (pData) {
            t.registerEvent(true);
            var t_posId = pData.posId;
            t.qianIcon.url = CommonManager.getUrl("xyfq", "qian_" + t_posId);
            t.icon = CommonManager.getUrl("xyfq", "color_" + t_posId);
            var t_bagCount = pData.count;
            t.tfCount.text = t_bagCount + "";
            t._curCount = t_bagCount;
            t.noticeImg.visible = (t_bagCount > 0);
        }
        else {
            t.registerEvent(false);
            t.qianIcon.url = null;
            t.icon = null;
        }
    };
    QianItem.prototype.addCount = function (pValue) {
        var t = this;
        if (t.curData) {
            t._curCount += pValue;
            var t_bagCount = t.curData.count;
            t._curCount = t._curCount > t_bagCount ? t_bagCount : t._curCount;
            t.tfCount.text = t._curCount + "";
            t.noticeImg.visible = (t._curCount > 0);
        }
    };
    QianItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    QianItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    QianItem.prototype.registerEvent = function (pFlag) {
        var t = this;
    };
    //>>>>end
    QianItem.URL = "ui://7hwmix0gbnypm";
    return QianItem;
}(fairygui.GLabel));
__reflect(QianItem.prototype, "QianItem");
