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
var ViewResource = (function (_super) {
    __extends(ViewResource, _super);
    function ViewResource() {
        return _super.call(this) || this;
    }
    ViewResource.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewResource"));
    };
    ViewResource.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ViewResource.prototype.setCount = function (v) {
        this.text = v + "";
    };
    ViewResource.prototype.setLb = function (hascount, needCount) {
        var ownCnt = hascount;
        var needCnt = needCount;
        if (typeof hascount == "string") {
            ownCnt = Number(hascount);
        }
        if (typeof needCnt == "string") {
            needCnt = Number(needCnt);
        }
        this.color = ownCnt >= needCnt ? Color.GREENINT : Color.REDINT;
        this.text = ConfigHelp.numToStr(hascount) + "/" + ConfigHelp.numToStr(needCount);
    };
    ViewResource.prototype.showBg = function (pFlag) {
        var t = this;
        t.bg.visible = pFlag;
    };
    ViewResource.prototype.setImgUrl = function (v) {
        if (v === void 0) { v = null; }
        if (v) {
            this._iconObject.visible = true;
            if (this._imgUrl != v) {
                this._imgUrl = v;
                IconUtil.setImg(this._iconObject.asLoader, Enum_Path.ICON70_URL + this._imgUrl + ".png");
            }
        }
        else {
            this._imgUrl = null;
            this._iconObject.visible = false;
            IconUtil.setImg(this._iconObject.asLoader, null);
        }
    };
    ViewResource.prototype.setImgUrl1 = function (v) {
        if (v === void 0) { v = null; }
        var self = this;
        if (v) {
            self._iconObject.visible = true;
            if (self._imgUrl != v) {
                self._imgUrl = v;
                IconUtil.setImg(self._iconObject.asLoader, v);
            }
        }
        else {
            self._imgUrl = null;
            self._iconObject.visible = false;
            IconUtil.setImg(self._iconObject.asLoader, null);
        }
    };
    ViewResource.prototype.setItemId = function (pItemId) {
        var t = this;
        var t_cfg = Config.daoju_204[pItemId];
        t._itemId = pItemId;
        if (t_cfg) {
            t.setImgUrl(t_cfg.icon);
            EventUtil.register(true, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
        }
        else {
            EventUtil.register(false, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
        }
    };
    ViewResource.prototype.onClick = function (e) {
        FastAPI.showItemTips(this._itemId);
    };
    ViewResource.prototype.setType = function (type) {
        if (type == 1) {
            var t = this.getTextField();
            t.align = fairygui.AlignType.Left;
            var ic = this.getChild("icon");
        }
        else if (type == 0) {
            var t = this.getTextField();
            t.align = fairygui.AlignType.Center;
        }
    };
    ViewResource.prototype.dispose = function () {
        this.setItemId(0);
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    ViewResource.URL = "ui://jvxpx9emn7sj6d";
    return ViewResource;
}(fairygui.GLabel));
__reflect(ViewResource.prototype, "ViewResource");
