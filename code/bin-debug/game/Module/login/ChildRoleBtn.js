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
var ChildRoleBtn = (function (_super) {
    __extends(ChildRoleBtn, _super);
    function ChildRoleBtn() {
        return _super.call(this) || this;
    }
    ChildRoleBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("createRole", "ChildRoleBtn"));
    };
    ChildRoleBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgSel = (this.getChild("imgSel"));
    };
    Object.defineProperty(ChildRoleBtn.prototype, "vo", {
        set: function (v) {
            if (v == 1) {
                this.imgSel.url = "ui://hpazy1telg3qw";
            }
            else if (v == 2) {
                this.imgSel.url = "ui://hpazy1telg3qq";
            }
            else {
                this.imgSel.url = "ui://hpazy1telg3qt";
            }
        },
        enumerable: true,
        configurable: true
    });
    ChildRoleBtn.URL = "ui://hpazy1tefurki";
    return ChildRoleBtn;
}(fairygui.GButton));
__reflect(ChildRoleBtn.prototype, "ChildRoleBtn");
