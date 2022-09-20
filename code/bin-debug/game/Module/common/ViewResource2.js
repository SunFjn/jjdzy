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
/**
 * @author: lujiahao
 * @date: 2019-10-28 16:23:30
 */
var ViewResource2 = (function (_super) {
    __extends(ViewResource2, _super);
    function ViewResource2() {
        return _super.call(this) || this;
    }
    ViewResource2.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewResource2"));
    };
    ViewResource2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    ViewResource2.prototype.setCount = function (v) {
        this.text = v + "";
    };
    ViewResource2.prototype.setLb = function (hascount, needCount) {
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
    ViewResource2.prototype.setImgUrl = function (v) {
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
    ViewResource2.prototype.setItemId = function (pItemId) {
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
    ViewResource2.prototype.onClick = function (e) {
        FastAPI.showItemTips(this._itemId);
    };
    ViewResource2.prototype.setType = function (type) {
        if (type == 1) {
            var t = this.getTextField();
            t.align = fairygui.AlignType.Left;
        }
        else if (type == 0) {
            var t = this.getTextField();
            t.align = fairygui.AlignType.Center;
        }
    };
    ViewResource2.prototype.dispose = function () {
        this.setItemId(0);
        _super.prototype.dispose.call(this);
    };
    //>>>>start
    //>>>>end
    ViewResource2.URL = "ui://jvxpx9emtaxk3gl";
    return ViewResource2;
}(fairygui.GLabel));
__reflect(ViewResource2.prototype, "ViewResource2");
