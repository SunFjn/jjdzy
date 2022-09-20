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
var ArenaExit = (function (_super) {
    __extends(ArenaExit, _super);
    function ArenaExit() {
        var _this = _super.call(this) || this;
        var lb = new fairygui.GLabel();
        lb.text = "竞技场\n退出";
        _this.addChild(lb);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchT, _this);
        _this.x = App.stage.stageWidth - 80;
        _this.y = 550;
        return _this;
    }
    ArenaExit.prototype.onTouchT = function (e) {
        // GGlobal.modelScene.returnMainScene();
    };
    return ArenaExit;
}(fairygui.GComponent));
__reflect(ArenaExit.prototype, "ArenaExit");
