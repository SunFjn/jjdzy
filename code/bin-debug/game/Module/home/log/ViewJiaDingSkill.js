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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewJiaDingSkill = (function (_super) {
    __extends(ViewJiaDingSkill, _super);
    function ViewJiaDingSkill() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewJiaDingSkill.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewJiaDingSkill"));
    };
    ViewJiaDingSkill.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewJiaDingSkill").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewJiaDingSkill.prototype.eventFunction = function (type) {
        var self = this;
    };
    ViewJiaDingSkill.prototype.onShown = function () {
        var s = this;
        var data = s._args;
        var jdID = GGlobal.modelHouseKeeper.jdID;
        var lib = Config.jdjins_021[GGlobal.modelHouseKeeper.jdID];
        if (!s.awatar) {
            s.awatar = UIRole.create();
            s.awatar.uiparent = s.displayListContainer;
        }
        s.awatar.setPos(155, 295);
        s.awatar.setScaleXY(1.5, 1.5);
        s.awatar.setWeapon(0);
        s.awatar.setBody(lib.moxing);
        s.awatar.onAdd();
        s.lbInfo.text = "<font color='#FFC344'>" + data[0] + "</font><font color='#fe0000'>(-" + data[1] + ")</font>";
        s.lbName.text = lib.mingzi;
    };
    ViewJiaDingSkill.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.HOME_JIADING_UI);
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
    };
    ViewJiaDingSkill.URL = "ui://y0plc878g2m4g";
    return ViewJiaDingSkill;
}(UIModalPanel));
__reflect(ViewJiaDingSkill.prototype, "ViewJiaDingSkill");
