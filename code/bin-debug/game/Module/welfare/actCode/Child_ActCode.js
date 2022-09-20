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
var Child_ActCode = (function (_super) {
    __extends(Child_ActCode, _super);
    function Child_ActCode() {
        return _super.call(this) || this;
    }
    Child_ActCode.createInstance = function () {
        return (fairygui.UIPackage.createObject("Welfare", "Child_ActCode"));
    };
    Child_ActCode.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.btnSure.addClickListener(self.onSure, self);
    };
    Child_ActCode.prototype.show = function () {
        this.inputName.text = "";
        IconUtil.setImg(this.n6, Enum_Path.BACK_URL + "act_code.png");
    };
    Child_ActCode.prototype.disposePanel = function () {
        this.inputName.text = "";
        IconUtil.setImg(this.n6, null);
    };
    Child_ActCode.prototype.onSure = function () {
        if (this.inputName.text == "") {
            return;
        }
        GGlobal.modelwelfare.CG_ACTIVATION_GET(this.inputName.text);
    };
    Child_ActCode.prototype.clean = function () {
    };
    Child_ActCode.URL = "ui://ye1luhg3owbuf";
    return Child_ActCode;
}(fairygui.GComponent));
__reflect(Child_ActCode.prototype, "Child_ActCode");
