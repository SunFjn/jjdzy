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
 * @date: 2019-09-26 15:11:16
 */
var QxzlHead = (function (_super) {
    __extends(QxzlHead, _super);
    function QxzlHead() {
        return _super.call(this) || this;
    }
    QxzlHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "QxzlHead"));
    };
    QxzlHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    QxzlHead.prototype.setData = function (pData) {
        var t = this;
        if (pData.head) {
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.headGrid + ""), t.imgHeadGrid);
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.head + ""), t.imgHead);
            t.lbName.text = pData.name;
        }
        else {
            t.lbName.text = HtmlUtil.font("虚位以待", 0xcccccc);
            ImageLoader.instance.removeLoader(t.imgHead);
            ImageLoader.instance.removeLoader(t.imgHeadGrid);
        }
    };
    //>>>>end
    QxzlHead.URL = "ui://6d8dzzdglxm0m";
    return QxzlHead;
}(fairygui.GComponent));
__reflect(QxzlHead.prototype, "QxzlHead");
