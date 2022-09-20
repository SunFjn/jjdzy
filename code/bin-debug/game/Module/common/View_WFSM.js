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
var View_WFSM = (function (_super) {
    __extends(View_WFSM, _super);
    function View_WFSM() {
        return _super.call(this) || this;
    }
    View_WFSM.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "View_WFSM"));
    };
    View_WFSM.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.explainLb = (this.getChild("explainLb"));
    };
    Object.defineProperty(View_WFSM.prototype, "vo", {
        set: function (v) {
            this.explainLb.text = v;
        },
        enumerable: true,
        configurable: true
    });
    View_WFSM.URL = "ui://jvxpx9emah3c3aq";
    return View_WFSM;
}(fairygui.GComponent));
__reflect(View_WFSM.prototype, "View_WFSM");
