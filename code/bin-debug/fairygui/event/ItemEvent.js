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
    var ItemEvent = (function (_super) {
        __extends(ItemEvent, _super);
        function ItemEvent(type, itemObject, stageX, stageY) {
            if (itemObject === void 0) { itemObject = null; }
            if (stageX === void 0) { stageX = 0; }
            if (stageY === void 0) { stageY = 0; }
            var _this = _super.call(this, type, false) || this;
            _this.itemObject = itemObject;
            _this.stageX = stageX;
            _this.stageY = stageY;
            return _this;
        }
        ItemEvent.CLICK = "___itemClick";
        return ItemEvent;
    }(egret.Event));
    fairygui.ItemEvent = ItemEvent;
    __reflect(ItemEvent.prototype, "fairygui.ItemEvent");
})(fairygui || (fairygui = {}));
