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
var BossZCPveTimer = (function (_super) {
    __extends(BossZCPveTimer, _super);
    function BossZCPveTimer() {
        var _this = _super.call(this) || this;
        _this._totalTime = 60;
        return _this;
    }
    BossZCPveTimer.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("Boss", "BossZCPveTimer"));
        }
        return this._inst;
    };
    BossZCPveTimer.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
    };
    BossZCPveTimer.prototype.updateX = function () {
        var now = Model_GlobalMsg.getServerTime();
        if (now >= this._totalTime) {
            this.hide1();
            return;
        }
        var limt = this._totalTime - now;
        this.n1.text = "挑战剩余时间：" + DateUtil.getHMSBySecond2((limt / 1000) >> 0);
        ;
    };
    BossZCPveTimer.prototype.show1 = function () {
        if (!this.parent) {
            GGlobal.layerMgr.UI_MainBottom.addChild(this);
        }
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 2);
        var st = GGlobal.modelBossZc.sceneState;
        this._totalTime = Model_GlobalMsg.getServerTime() + 60000;
        Timer.instance.listen(this.updateX, this, 1000);
    };
    BossZCPveTimer.prototype.hide1 = function () {
        Timer.instance.remove(this.updateX, this);
        this.removeFromParent();
    };
    BossZCPveTimer.URL = "ui://47jfyc6emca439";
    return BossZCPveTimer;
}(fairygui.GComponent));
__reflect(BossZCPveTimer.prototype, "BossZCPveTimer");
