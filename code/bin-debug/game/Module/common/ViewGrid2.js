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
var ViewGrid2 = (function (_super) {
    __extends(ViewGrid2, _super);
    function ViewGrid2() {
        return _super.call(this) || this;
    }
    ViewGrid2.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewGrid2"));
    };
    ViewGrid2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.iconImg = (this.getChild("iconImg"));
    };
    ViewGrid2.create = function () {
        return ViewGrid2.POOL.length ? ViewGrid2.POOL.pop() : ViewGrid2.createInstance();
    };
    Object.defineProperty(ViewGrid2.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            if (v) {
                // ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.iconImg);
                IconUtil.setImg(this.iconImg, Enum_Path.ICON70_URL + v.icon + ".png");
                this.iconImg.visible = true;
            }
            else {
                this.iconImg.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGrid2.prototype, "tipEnabled", {
        /**设置是否显示tip */
        set: function (bo) {
            if (bo) {
                this.addClickListener(this.onTips, this);
            }
            else {
                this.removeClickListener(this.onTips, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewGrid2.prototype.onTips = function () {
        if (!this._vo) {
            return;
        }
        GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, this._vo);
    };
    ViewGrid2.prototype.disposeGrid = function () {
        this.removeFromParent();
        ViewGrid2.POOL.push(this);
    };
    ViewGrid2.URL = "ui://jvxpx9emtw1l5d";
    ViewGrid2.POOL = [];
    return ViewGrid2;
}(fairygui.GComponent));
__reflect(ViewGrid2.prototype, "ViewGrid2");
