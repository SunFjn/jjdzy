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
var BossZCTimer = (function (_super) {
    __extends(BossZCTimer, _super);
    function BossZCTimer() {
        var _this = _super.call(this) || this;
        _this.fix = "入口关闭倒计时：";
        return _this;
    }
    BossZCTimer.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("Boss", "BossZCTimer"));
        }
        return this._inst;
    };
    BossZCTimer.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.touchable = false;
    };
    BossZCTimer.prototype.updateX = function () {
        var now = Model_GlobalMsg.getServerTime();
        if (now >= GGlobal.modelBossZc.entranceCloseTime) {
            this.hide1();
            return;
        }
        var limt = GGlobal.modelBossZc.entranceCloseTime - now;
        this.n1.text = this.fix + DateUtil.getHMSBySecond2((limt / 1000) >> 0);
        ;
    };
    BossZCTimer.prototype.setPrefix = function () {
        this.fix = GGlobal.modelBossZc.sceneState == 1 ? "入口关闭倒计时：" : "BOSS刷新倒计时：";
    };
    BossZCTimer.prototype.show1 = function () {
        if (!this.parent) {
            GGlobal.layerMgr.UI_MainBottom.addChild(this);
        }
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 2);
        var st = GGlobal.modelBossZc.sceneState;
        var now = Model_GlobalMsg.getServerTime();
        if (st == 4 || now >= GGlobal.modelBossZc.entranceCloseTime) {
            this.hide1();
        }
        else {
            Timer.instance.listen(this.updateX, this, 1000);
        }
        GGlobal.control.listen(Enum_MsgType.BOSSZC_READYTIME, this.setPrefix, this);
    };
    BossZCTimer.prototype.hide1 = function () {
        Timer.instance.remove(this.updateX, this);
        this.removeFromParent();
        GGlobal.control.remove(Enum_MsgType.BOSSZC_READYTIME, this.setPrefix, this);
    };
    BossZCTimer.URL = "ui://47jfyc6esx3835";
    return BossZCTimer;
}(fairygui.GComponent));
__reflect(BossZCTimer.prototype, "BossZCTimer");
