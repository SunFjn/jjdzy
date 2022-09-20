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
var ViewBroadcastItemText = (function (_super) {
    __extends(ViewBroadcastItemText, _super);
    function ViewBroadcastItemText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.idelIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        _this.items = [];
        return _this;
    }
    /**支持html */
    ViewBroadcastItemText.text = function (str, color, pz) {
        if (color === void 0) { color = 0xed1414; }
        if (pz === void 0) { pz = 0; }
        GGlobal.layerMgr.open(UIConst.BROADCASTITEMTEXT);
        var v = GGlobal.layerMgr.getView(UIConst.BROADCASTITEMTEXT);
        v.showText(str, color, pz);
    };
    ViewBroadcastItemText.prototype.showText = function (str, color, pz) {
        var item = BroadcastItemText.createInstance();
        item.showText(str, color, pz);
        item.y = 780;
        item.visible = false;
        item.x = (fairygui.GRoot.inst.width - item.width) / 2;
        this.addChild(item);
        this.items.unshift(item);
    };
    ViewBroadcastItemText.prototype.onframe = function (e) {
        var self = this;
        var items = self.items;
        var now = egret.getTimer();
        var dt = now - self._last;
        self._last = now;
        var speedmul = dt / 33 * 5;
        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            item.visible = true;
            var tarpos = 780 - i * 35;
            var vec = 2 + (2000 - item.lifeTime) / 1000 * speedmul;
            if (item.y - vec > tarpos) {
                item.y -= vec;
            }
            else {
                item.y = tarpos;
            }
            item.lifeTime += dt;
            if (item.state == 0) {
                if (item.lifeTime >= 1000) {
                    item.state = 1;
                }
            }
            else if (item.state == 1) {
                if (item.lifeTime >= 1500) {
                    item.state = 2;
                }
            }
            else if (item.state == 2) {
                item.alpha -= 0.05;
                if (item.lifeTime >= 2000) {
                    items.pop();
                    self.removeChild(item);
                    item.disposePanel();
                    if (self.items.length == 0 && this.parent) {
                        GGlobal.layerMgr.close(UIConst.BROADCASTITEMTEXT);
                    }
                }
            }
        }
    };
    ViewBroadcastItemText.prototype.onOpen = function () {
        this._last = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
    };
    ViewBroadcastItemText.prototype.onClose = function () {
        var self = this;
        var items = self.items;
        for (var i = items.length - 1; i >= 0; i--) {
            var item = items.pop();
            self.removeChild(item);
            item.disposePanel();
        }
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
        GGlobal.layerMgr.close(UIConst.BROADCASTITEMTEXT);
    };
    ViewBroadcastItemText.prototype.resetPosition = function () {
        this.setXY(0, 0);
    };
    return ViewBroadcastItemText;
}(fairygui.GComponent));
__reflect(ViewBroadcastItemText.prototype, "ViewBroadcastItemText");
var BroadcastItemText = (function (_super) {
    __extends(BroadcastItemText, _super);
    function BroadcastItemText() {
        var _this = _super.call(this) || this;
        _this.tarindex = 0;
        return _this;
    }
    BroadcastItemText.createInstance = function () {
        var POOL = BroadcastItemText.POOL;
        if (POOL.length) {
            return POOL.pop();
        }
        return (GGlobal.commonpkg.createObject("BroadcastItemText"));
    };
    BroadcastItemText.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.label = (this.getChild("label"));
        this.touchable = false;
    };
    BroadcastItemText.prototype.showText = function (str, color, pz) {
        if (pz === void 0) { pz = 0; }
        this.lifeTime = this.state = 0;
        this.alpha = 1;
        this.label.color = color;
        if (pz > 7) {
            var names = str.split('');
            str = "";
            var colors = ["#ed1414", "#ffc344", '#da2bfa', "#66ccff"];
            for (var i = 0; i < names.length; i++) {
                var idx = i % colors.length;
                str += HtmlUtil.fontNoSize(names[i], colors[idx]);
            }
        }
        this.label.text = str;
    };
    BroadcastItemText.prototype.disposePanel = function () {
        BroadcastItemText.POOL.push(this);
    };
    BroadcastItemText.POOL = [];
    BroadcastItemText.URL = "ui://jvxpx9emomdtal";
    return BroadcastItemText;
}(fairygui.GComponent));
__reflect(BroadcastItemText.prototype, "BroadcastItemText");
