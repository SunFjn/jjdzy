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
    var DragEvent = (function (_super) {
        __extends(DragEvent, _super);
        function DragEvent(type, stageX, stageY, touchPointID) {
            if (stageX === void 0) { stageX = 0; }
            if (stageY === void 0) { stageY = 0; }
            if (touchPointID === void 0) { touchPointID = -1; }
            var _this = _super.call(this, type, false) || this;
            _this.touchPointID = 0;
            _this.stageX = stageX;
            _this.stageY = stageY;
            _this.touchPointID = touchPointID;
            return _this;
        }
        DragEvent.prototype.preventDefault = function () {
            this._prevented = true;
        };
        DragEvent.prototype.isDefaultPrevented = function () {
            return this._prevented;
        };
        DragEvent.DRAG_START = "__dragStart";
        DragEvent.DRAG_END = "__dragEnd";
        DragEvent.DRAG_MOVING = "__dragMoving";
        return DragEvent;
    }(egret.Event));
    fairygui.DragEvent = DragEvent;
    __reflect(DragEvent.prototype, "fairygui.DragEvent");
})(fairygui || (fairygui = {}));
