var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var DragDropManager = (function () {
        function DragDropManager() {
            this._agent = new fairygui.GLoader();
            this._agent.draggable = true;
            this._agent.touchable = false; //important
            this._agent.setSize(100, 100);
            this._agent.setPivot(0.5, 0.5, true);
            this._agent.align = fairygui.AlignType.Center;
            this._agent.verticalAlign = fairygui.VertAlignType.Middle;
            this._agent.sortingOrder = 1000000;
            this._agent.addEventListener(fairygui.DragEvent.DRAG_END, this.__dragEnd, this);
        }
        Object.defineProperty(DragDropManager, "inst", {
            get: function () {
                if (DragDropManager._inst == null)
                    DragDropManager._inst = new DragDropManager();
                return DragDropManager._inst;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragDropManager.prototype, "dragAgent", {
            get: function () {
                return this._agent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragDropManager.prototype, "dragging", {
            get: function () {
                return this._agent.parent != null;
            },
            enumerable: true,
            configurable: true
        });
        DragDropManager.prototype.startDrag = function (source, icon, sourceData, touchPointID) {
            if (touchPointID === void 0) { touchPointID = -1; }
            if (this._agent.parent != null)
                return;
            this._sourceData = sourceData;
            this._agent.url = icon;
            fairygui.GRoot.inst.addChild(this._agent);
            var pt = fairygui.GRoot.inst.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
            this._agent.setXY(pt.x, pt.y);
            this._agent.startDrag(touchPointID);
        };
        DragDropManager.prototype.cancel = function () {
            if (this._agent.parent != null) {
                this._agent.stopDrag();
                fairygui.GRoot.inst.removeChild(this._agent);
                this._sourceData = null;
            }
        };
        DragDropManager.prototype.__dragEnd = function (evt) {
            if (this._agent.parent == null)
                return;
            fairygui.GRoot.inst.removeChild(this._agent);
            var sourceData = this._sourceData;
            this._sourceData = null;
            var obj = fairygui.GRoot.inst.getObjectUnderPoint(evt.stageX, evt.stageY);
            while (obj != null) {
                if (obj.hasEventListener(fairygui.DropEvent.DROP)) {
                    var dropEvt = new fairygui.DropEvent(fairygui.DropEvent.DROP, sourceData);
                    obj.requestFocus();
                    obj.dispatchEvent(dropEvt);
                    return;
                }
                obj = obj.parent;
            }
        };
        return DragDropManager;
    }());
    fairygui.DragDropManager = DragDropManager;
    __reflect(DragDropManager.prototype, "fairygui.DragDropManager");
})(fairygui || (fairygui = {}));
