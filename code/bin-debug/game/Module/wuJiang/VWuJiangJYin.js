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
var VWuJiangJYin = (function (_super) {
    __extends(VWuJiangJYin, _super);
    function VWuJiangJYin() {
        var _this = _super.call(this) || this;
        _this.isLocked = false;
        _this.bagEquip = null; //背包上可穿戴
        return _this;
    }
    VWuJiangJYin.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "VWuJiangJYin"));
    };
    VWuJiangJYin.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.grid.tipEnabled = false;
        this.grid.isShowEff = true;
    };
    Object.defineProperty(VWuJiangJYin.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (value) {
            this._vo = value;
            if (this.isLocked) {
                this.grid.vo = null;
                ImageLoader.instance.loader(Enum_Path.ICON70_URL + Model_WuJiang.LOCK_ICON[this._index] + ".png", this.grid.imgIcon);
                this.grid.imgIcon.visible = true;
            }
            else {
                this.grid.vo = value;
                if (value) {
                    this.labName.text = value.name;
                    this.labName.color = Color.getColorInt(value.quality);
                    this.grid.lbNum.text = value.jie + "阶";
                }
                else {
                    this.labName.text = "";
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VWuJiangJYin.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (v) {
            this._index = v;
            var open = Model_WuJiang.OPEN_GUAN[v];
            if (GGlobal.modelguanxian.guanzhi >= open) {
                this.imgLocked.visible = false;
                this.isLocked = false;
            }
            else {
                this.imgLocked.visible = true;
                this.labName.text = (open - 1) + "阶将衔激活";
                this.isLocked = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VWuJiangJYin.prototype, "checkNotice", {
        get: function () {
            return this.grid.checkNotice;
        },
        set: function (v) {
            if (this.isLocked) {
                this.grid.checkNotice = false;
            }
            else {
                this.grid.checkNotice = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    VWuJiangJYin.URL = "ui://zyx92gzwphli10";
    return VWuJiangJYin;
}(fairygui.GComponent));
__reflect(VWuJiangJYin.prototype, "VWuJiangJYin");
