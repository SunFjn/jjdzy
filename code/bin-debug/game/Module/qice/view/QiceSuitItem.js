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
 * @date: 2019-10-23 17:26:59
 */
var QiceSuitItem = (function (_super) {
    __extends(QiceSuitItem, _super);
    function QiceSuitItem() {
        return _super.call(this) || this;
    }
    QiceSuitItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("qice", "QiceSuitItem"));
    };
    QiceSuitItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    QiceSuitItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            var t_strName = "";
            var t_isActive = pData.isActive;
            var t_color = "#cccccc";
            if (t_isActive) {
                //已激活
                t_strName = "当前阶段";
                t_color = Color.GREENSTR;
            }
            else {
                //未激活
                t_strName = "下一阶段";
            }
            t_strName += " " + HtmlUtil.font("\u6240\u6709\u5947\u7B56\u8FBE\u5230" + pData.requireStar + "\u661F", Color.WHITESTR);
            var t_curCount = pData.curCount;
            var t_maxCount = pData.maxCount;
            if (t_curCount >= t_maxCount) {
                t_strName += HtmlUtil.font("(" + t_curCount + "/" + t_maxCount + ")", Color.GREENSTR);
            }
            else {
                t_strName += HtmlUtil.font("(" + t_curCount + "/" + t_maxCount + ")", Color.REDSTR);
            }
            t.tfName.text = t_strName;
            var t_strContent = "";
            var t_jmValue = parseInt(pData.cfg.shjm) * 100 / 100000;
            t_strContent += "\u7206\u6C14\u65F6\u5019\u751F\u6210\u514D\u4F24\u62A4\u76FE\uFF0C\u514D\u4F24<font color='#0099ff'>" + t_jmValue + "%</font>";
            t_strContent += "\n\u62A4\u76FE\u6301\u7EED<font color='#0099ff'>" + pData.cfg.hdsj + "\u6BEB\u79D2</font>";
            t_strContent += "\n" + ConfigHelp.attrString(JSON.parse(pData.cfg.sx), "+", t_color, t_color);
            t_strContent = HtmlUtil.font(t_strContent, t_color);
            t.tfContent.text = t_strContent;
        }
        else {
        }
    };
    QiceSuitItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    QiceSuitItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    QiceSuitItem.URL = "ui://cokk050nb5khc";
    return QiceSuitItem;
}(fairygui.GComponent));
__reflect(QiceSuitItem.prototype, "QiceSuitItem");
