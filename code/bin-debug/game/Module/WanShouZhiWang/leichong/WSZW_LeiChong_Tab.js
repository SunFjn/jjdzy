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
var WSZW_LeiChong_Tab = (function (_super) {
    __extends(WSZW_LeiChong_Tab, _super);
    function WSZW_LeiChong_Tab() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    WSZW_LeiChong_Tab.createInstance = function () {
        return (fairygui.UIPackage.createObject("WSZWActLJCZ", "WSZW_LeiChong_Tab"));
    };
    WSZW_LeiChong_Tab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getController("button");
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
        this.n3 = (this.getChild("n3"));
        this.n6 = (this.getChild("n6"));
        this.noticeImg = (this.getChild("noticeImg"));
    };
    WSZW_LeiChong_Tab.prototype.showYlq = function (v) {
        this.n6.visible = v;
    };
    Object.defineProperty(WSZW_LeiChong_Tab.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            this._checkNotice = value;
            this.noticeImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    WSZW_LeiChong_Tab.prototype.__click = function (evt) {
        if (!this.overrideClickFunc) {
            _super.prototype.__click.call(this, evt);
        }
        else {
            this.overrideClickFunc.runWith(evt);
        }
    };
    WSZW_LeiChong_Tab.prototype.onSuperClick = function (evt) {
        _super.prototype.__click.call(this, evt);
    };
    WSZW_LeiChong_Tab.URL = "ui://61ucuudypvvx6";
    return WSZW_LeiChong_Tab;
}(fairygui.GButton));
__reflect(WSZW_LeiChong_Tab.prototype, "WSZW_LeiChong_Tab");
