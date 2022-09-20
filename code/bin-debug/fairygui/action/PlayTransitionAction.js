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
var fairygui;
(function (fairygui) {
    var PlayTransitionAction = (function (_super) {
        __extends(PlayTransitionAction, _super);
        function PlayTransitionAction() {
            var _this = _super.call(this) || this;
            _this.playTimes = 1;
            _this.delay = 0;
            _this.stopOnExit = false;
            return _this;
        }
        PlayTransitionAction.prototype.enter = function (controller) {
            var trans = controller.parent.getTransition(this.transitionName);
            if (trans) {
                if (this._currentTransition && this._currentTransition.playing)
                    trans.changePlayTimes(this.playTimes);
                else
                    trans.play(null, null, null, this.playTimes, this.delay);
                this._currentTransition = trans;
            }
        };
        PlayTransitionAction.prototype.leave = function (controller) {
            if (this.stopOnExit && this._currentTransition) {
                this._currentTransition.stop();
                this._currentTransition = null;
            }
        };
        PlayTransitionAction.prototype.setup = function (buffer) {
            _super.prototype.setup.call(this, buffer);
            this.transitionName = buffer.readS();
            this.playTimes = buffer.readInt();
            this.delay = buffer.readFloat();
            this.stopOnExit = buffer.readBool();
        };
        return PlayTransitionAction;
    }(fairygui.ControllerAction));
    fairygui.PlayTransitionAction = PlayTransitionAction;
    __reflect(PlayTransitionAction.prototype, "fairygui.PlayTransitionAction");
})(fairygui || (fairygui = {}));
