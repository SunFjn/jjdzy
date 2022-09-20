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
var ActTestPanel = (function (_super) {
    __extends(ActTestPanel, _super);
    function ActTestPanel() {
        return _super.call(this) || this;
    }
    /** 绑定ui的方法（静态方法） */
    ActTestPanel.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
    };
    ActTestPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("actTest", "ActTestPanel"));
    };
    ActTestPanel.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ActTestPanel.prototype.openPanel = function (pData) {
    };
    ActTestPanel.prototype.closePanel = function (pData) {
    };
    ActTestPanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.fuck0 = (this.getChild("fuck0"));
        this.fuck1 = (this.getChild("fuck1"));
        this.fuck2 = (this.getChild("fuck2"));
        this.fuck3 = (this.getChild("fuck3"));
    };
    //>>>>end
    ActTestPanel.URL = "ui://g1ngk9h3mvdu0";
    /** 设置包名（静态属性） */
    ActTestPanel.pkg = "actTest";
    return ActTestPanel;
}(fairygui.GComponent));
__reflect(ActTestPanel.prototype, "ActTestPanel", ["IPanel"]);
