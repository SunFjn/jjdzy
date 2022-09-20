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
var ViewCommonWarn = (function (_super) {
    __extends(ViewCommonWarn, _super);
    function ViewCommonWarn() {
        var _this = _super.call(this) || this;
        _this.items = [];
        _this._cleanTime = 0;
        _this._last = 0;
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onframe, _this);
        return _this;
    }
    /**支持html */
    ViewCommonWarn.text = function (str, color) {
        if (color === void 0) { color = 0xffffff; }
        if (str) {
            var v = ViewCommonWarn.getInstance();
            v.showText(str, color);
        }
    };
    ViewCommonWarn.getInstance = function () {
        if (!ViewCommonWarn._instance)
            ViewCommonWarn._instance = new ViewCommonWarn();
        return ViewCommonWarn._instance;
    };
    ViewCommonWarn.prototype.showText = function (str, color) {
        var item = WarnItem.createInstance();
        item.showText(str, color);
        item.y = 680;
        item.visible = false;
        item.x = (fairygui.GRoot.inst.width - item.width) / 2;
        GGlobal.layerMgr.UI_Message.addChild(item);
        this.items.unshift(item);
    };
    ViewCommonWarn.prototype.onframe = function () {
        var self = this;
        var items = self.items;
        var now = egret.getTimer();
        this._cleanTime += 30;
        // var dt = now - self._last;
        self._last = now;
        var speedmul = 2; // dt / 33 * 5;
        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            if (!item)
                continue;
            item.visible = true;
            var tarpos = 680 - i * 56;
            var vec = 2 + (2000 - item.lifeTime) / 1000 * speedmul;
            if (item.y - vec > tarpos) {
                item.y -= vec;
            }
            else {
                item.y = tarpos;
            }
            item.lifeTime = now - item.rebornTime;
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
                    items[i] = null;
                    item.removeFromParent();
                    item.disposePanel();
                }
            }
        }
        if (this._cleanTime % 600 == 0) {
            ArrayUitl.cleannull(items);
        }
    };
    return ViewCommonWarn;
}(egret.Sprite));
__reflect(ViewCommonWarn.prototype, "ViewCommonWarn");
var WarnItem = (function (_super) {
    __extends(WarnItem, _super);
    function WarnItem() {
        var _this = _super.call(this) || this;
        _this.tarindex = 0;
        _this.lifeTime = 0;
        _this.rebornTime = 0;
        return _this;
    }
    WarnItem.createInstance = function () {
        return Pool.getItemByCreateFun("WarnItem", WarnItem.create);
    };
    WarnItem.create = function () {
        return (GGlobal.commonpkg.createObject("commonWarn"));
    };
    WarnItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.label = (this.getChild("label"));
        this.touchable = false;
    };
    WarnItem.prototype.showText = function (str, color) {
        this.lifeTime = 0;
        this.rebornTime = egret.getTimer();
        this.state = 0;
        this.alpha = 1;
        this.label.color = color;
        this.label.text = str;
    };
    WarnItem.prototype.disposePanel = function () {
        this.lifeTime = 0;
        Pool.recover("WarnItem", this);
    };
    WarnItem.URL = "ui://jvxpx9emlqbq1a";
    return WarnItem;
}(fairygui.GComponent));
__reflect(WarnItem.prototype, "WarnItem");
