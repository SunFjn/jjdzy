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
var QuestGuideArrow1 = (function (_super) {
    __extends(QuestGuideArrow1, _super);
    function QuestGuideArrow1() {
        var _this = _super.call(this) || this;
        _this.lastGlobalx = 0;
        _this.lastGlobaly = 0;
        _this._tweenObj = { x: 0, y: 0 };
        _this._effTweenObj = { rotation: 0 };
        _this.specialToHide = false;
        _this._guideInterval = 3000;
        return _this;
    }
    QuestGuideArrow1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.touchable = false;
        self.visible = false;
        self.x = fairygui.GRoot.inst.width / 2;
        self.y = fairygui.GRoot.inst.height / 2;
    };
    Object.defineProperty(QuestGuideArrow1, "instance", {
        get: function () {
            if (QuestGuideArrow1._instance == null) {
                QuestGuideArrow1._instance = (fairygui.UIPackage.createObject("common", "QuestGuideArrow"));
            }
            return QuestGuideArrow1._instance;
        },
        enumerable: true,
        configurable: true
    });
    QuestGuideArrow1.prototype.focuseTo = function (target, ax, ay, rotate, bgx, bgy, isTop) {
        if (rotate === void 0) { rotate = 0; }
        if (bgx === void 0) { bgx = -100; }
        if (bgy === void 0) { bgy = 50; }
        if (isTop === void 0) { isTop = true; }
        var self = this;
        self._isTop = isTop;
        if (target == null) {
            egret.Tween.removeTweens(self);
            self.tween = null;
            self.visible = false;
            self._target = target;
        }
        else {
            if (self._target && target && target.hashCode == self._target.hashCode && ax == self._ax && ay == self._ay) {
                if (!self.tween) {
                    target.addChild(self);
                }
                return;
            }
            self.arrowImg.setXY(0, 0);
            egret.Tween.get(self.guideGroup).to({ x: bgx, y: bgy }, 300);
            self._effTweenObj.rotation = rotate;
            egret.Tween.get(self.arrowImg).to(self._effTweenObj, 300);
            var tp = target.localToRoot(ax - GGlobal.layerMgr.offx, ay);
            self._ax = ax;
            self._ay = ay;
            var sp = self.localToRoot(0 - GGlobal.layerMgr.offx, 0);
            self.x = sp.x;
            self.y = sp.y;
            self._tweenObj.x = self.lastGlobalx = tp.x;
            self._tweenObj.y = self.lastGlobaly = tp.y;
            // let num = Math.sqrt(ConfigHelp.dist(tp.x, tp.y, sp.x, sp.y));
            // if (num < 200) num = 200;
            // if (num > 400) num = 400;
            // self.tween = egret.Tween.get(self);
            // self.tween.to(self._tweenObj, num).call(self.onTweenComplete, self).play();
            self._target = target;
            self.onTweenComplete();
            self.visible = true;
            // GGlobal.layerMgr.UI_Message.addChild(self);
        }
        self._guideInterval = 3000;
    };
    QuestGuideArrow1.prototype.onTweenComplete = function () {
        var self = this;
        if (self._target) {
            if (self._isTop) {
                var p = self.globalPoint();
                self.x = p.x;
                self.y = p.y;
                GGlobal.layerMgr.UI_Message.addChild(self);
                return;
            }
            self.x = self._ax;
            self.y = self._ay;
            self._target.addChild(self);
        }
    };
    QuestGuideArrow1.prototype.setText = function (v) {
        this.guideLb.text = v;
    };
    QuestGuideArrow1.prototype.release = function () {
        var self = this;
        self.hide();
        self.passRestrict = false;
        self.auto = null;
    };
    QuestGuideArrow1.prototype.globalPoint = function () {
        var self = this;
        var tp = self._target.localToRoot(self._ax - GGlobal.layerMgr.offx, self._ay);
        return tp;
    };
    QuestGuideArrow1.prototype.hide = function () {
        var self = this;
        self.removeFromParent();
        self._target = null;
        self.setXY(fairygui.GRoot.inst.width / 2, fairygui.GRoot.inst.height / 2);
    };
    QuestGuideArrow1.CONFIG_MOUSECLICK_INTEVAL = 8000;
    QuestGuideArrow1.CONFIG_MOUSEMOVE_INTEVAL = 5000;
    QuestGuideArrow1.CONFIG_INTERVALMAX = 8000;
    QuestGuideArrow1.CONFIG_INTERVELDEF = 3000;
    QuestGuideArrow1.hideRestrict = {};
    QuestGuideArrow1._hideRestrictCount = 0;
    QuestGuideArrow1.notShow = 0;
    QuestGuideArrow1.URL = "ui://jvxpx9em8xhz3g8";
    return QuestGuideArrow1;
}(fairygui.GComponent));
__reflect(QuestGuideArrow1.prototype, "QuestGuideArrow1");
