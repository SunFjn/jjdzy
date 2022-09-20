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
var TipRebirthLook = (function (_super) {
    __extends(TipRebirthLook, _super);
    function TipRebirthLook() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    TipRebirthLook.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "TipRebirthLook"));
    };
    TipRebirthLook.prototype.childrenCreated = function () {
        GGlobal.createPack("role");
        this.view = fairygui.UIPackage.createObject("role", "TipRebirthLook").asCom;
        this.contentPane = this.view;
        this.labAttrCur = (this.view.getChild("labAttrCur"));
        this.labAttrNext = (this.view.getChild("labAttrNext"));
        this.curStatus = (this.view.getChild("curStatus"));
        this.nextStatus = (this.view.getChild("nextStatus"));
        this.labTitle = (this.view.getChild("labTitle"));
        this.labCur = (this.view.getChild("labCur"));
        this.labNext = (this.view.getChild("labNext"));
        this.labPower = (this.view.getChild("labPower"));
        this.groupCur = (this.view.getChild("groupCur"));
        _super.prototype.childrenCreated.call(this);
    };
    TipRebirthLook.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.updateView();
    };
    TipRebirthLook.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        GGlobal.layerMgr.close(UIConst.TIP_REBIRTH_LOOK);
    };
    TipRebirthLook.prototype.updateView = function () {
        var zs = Model_player.voMine.zsID;
        var zhuansheng = Config.zhuansheng_705[zs];
        if (zhuansheng.nextid != 0) {
            var zhuanshengNext = Config.zhuansheng_705[zhuansheng.nextid];
            this.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(zhuanshengNext.attr), "+", null, "#15f234");
            this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(zhuansheng.attr), "+");
            // this.labNext.text = "下阶转生：" + "[color=#0bf22c]" + zhuanshengNext.lv + "[/color]"
            this.labNext.text = "下阶转生:";
            this.nextStatus.text = zhuanshengNext.lv;
            this.groupCur.x = 24;
        }
        else {
            this.groupCur.x = 158;
            this.labNext.text = "";
            this.labNext.text = "";
            this.labAttrNext.text = "";
            this.labNext.text = "";
            this.nextStatus.text = "";
        }
        this.labPower.text = "" + zhuansheng.fight;
        // this.labCur.text = "当前阶段：" + "[color=#0bf22c]" + zhuansheng.lv + "[/color]"
        // this.labCur.text = "当前阶段：" + zhuansheng.lv
        this.curStatus.text = zhuansheng.lv;
        this.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(zhuansheng.attr), "+", null, "#ffffff");
    };
    TipRebirthLook.URL = "ui://3tzqotadm20j41";
    return TipRebirthLook;
}(UIModalPanel));
__reflect(TipRebirthLook.prototype, "TipRebirthLook");
