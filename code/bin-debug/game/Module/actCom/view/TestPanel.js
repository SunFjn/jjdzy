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
var TestPanel = (function (_super) {
    __extends(TestPanel, _super);
    function TestPanel() {
        return _super.call(this) || this;
    }
    TestPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("actCom", "TestPanel"));
    };
    TestPanel.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    TestPanel.prototype.openPanel = function (pData) {
    };
    TestPanel.prototype.closePanel = function (pData) {
    };
    TestPanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.fuck0 = (this.getChild("fuck0"));
        this.fuck1 = (this.getChild("fuck1"));
    };
    //>>>>end
    TestPanel.URL = "ui://g8w9swygmvdu9";
    TestPanel.pkg = "actCom";
    return TestPanel;
}(fairygui.GComponent));
__reflect(TestPanel.prototype, "TestPanel", ["IPanel"]);
