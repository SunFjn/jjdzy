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
var QuestGuideArrow = (function (_super) {
    __extends(QuestGuideArrow, _super);
    function QuestGuideArrow() {
        var _this = _super.call(this) || this;
        _this.lastGlobalx = 0;
        _this.lastGlobaly = 0;
        _this._tweenObj = { x: 0, y: 0 };
        _this._effTweenObj = { rotation: 0 };
        _this.specialToHide = false;
        _this.childrenCreated();
        return _this;
    }
    QuestGuideArrow.prototype.childrenCreated = function () {
        this.touchable = false;
        this.visible = false;
        this.x = fairygui.GRoot.inst.width / 2;
        this.y = fairygui.GRoot.inst.height / 2;
    };
    Object.defineProperty(QuestGuideArrow, "instance", {
        get: function () {
            if (QuestGuideArrow._instance == null) {
                QuestGuideArrow._instance = new QuestGuideArrow();
            }
            return QuestGuideArrow._instance;
        },
        enumerable: true,
        configurable: true
    });
    QuestGuideArrow.prototype.focuseTo = function (target, ax, ay, isTop) {
        if (isTop === void 0) { isTop = false; }
        var self = this;
        self._isTop = isTop;
        if (target == null) {
            egret.Tween.removeTweens(self);
            self.tween = null;
            self.visible = false;
        }
        else {
            if (self._target && target && target.hashCode == self._target.hashCode && ax == self._ax && ay == self._ay) {
                if (!self.tween) {
                    target.addChild(self);
                }
                return;
            }
            if (!self.specialToHide) {
                if (!self.eff) {
                    self.eff = EffectMgr.addEff("eff/200007/ani", self.displayListContainer, 0, 0, 1000, -1, true, 1, Main.skill_part_type);
                }
            }
            self.specialToHide = false;
            var tp = target.localToRoot(ax - GGlobal.layerMgr.offx, ay);
            self._ax = ax;
            self._ay = ay;
            var sp = self.localToRoot(0 - GGlobal.layerMgr.offx, 0);
            self.x = sp.x;
            self.y = sp.y;
            self._tweenObj.x = self.lastGlobalx = tp.x;
            self._tweenObj.y = self.lastGlobaly = tp.y;
            var num = Math.sqrt(MathUtil.dist(tp.x, tp.y, sp.x, sp.y));
            if (num < 200)
                num = 200;
            if (num > 400)
                num = 400;
            self.tween = egret.Tween.get(self);
            self.tween.to(self._tweenObj, num).call(self.onTweenComplete, self).play();
            self.visible = true;
            GGlobal.layerMgr.UI_Message.addChild(self);
        }
        self._target = target;
    };
    QuestGuideArrow.prototype.onTweenComplete = function () {
        var self = this;
        if (self._target) {
            if (self._isTop) {
                var p = self._target.localToRoot(self._ax - GGlobal.layerMgr.offx, self._ay);
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
    QuestGuideArrow.prototype.release = function () {
        var self = this;
        self.hide();
        self.passRestrict = false;
        self.auto = null;
    };
    Object.defineProperty(QuestGuideArrow.prototype, "globalPoint", {
        get: function () {
            var tp = this._target.localToGlobal(this._ax, this._ay);
            return tp;
        },
        enumerable: true,
        configurable: true
    });
    QuestGuideArrow.prototype.hide = function () {
        var self = this;
        self.visible = false;
        self._target = null;
        if (self.eff) {
            EffectMgr.instance.removeEff(self.eff);
            self.eff = null;
        }
    };
    QuestGuideArrow.CONFIG_MOUSECLICK_INTEVAL = 8000;
    QuestGuideArrow.CONFIG_MOUSEMOVE_INTEVAL = 5000;
    QuestGuideArrow.CONFIG_INTERVALMAX = 8000;
    QuestGuideArrow.CONFIG_INTERVELDEF = 3000;
    QuestGuideArrow.hideRestrict = {};
    QuestGuideArrow._hideRestrictCount = 0;
    QuestGuideArrow.notShow = 0;
    return QuestGuideArrow;
}(fairygui.GComponent));
__reflect(QuestGuideArrow.prototype, "QuestGuideArrow");
