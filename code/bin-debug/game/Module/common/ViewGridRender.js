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
var ViewGridRender = (function (_super) {
    __extends(ViewGridRender, _super);
    function ViewGridRender() {
        var _this = _super.call(this) || this;
        _this.tipEnabled = true;
        return _this;
    }
    ViewGridRender.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewGridRender"));
    };
    ViewGridRender.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
        this.lbName = (this.getChild("lbName"));
        this.extraImg = (this.getChild("extraImg"));
    };
    Object.defineProperty(ViewGridRender.prototype, "vo", {
        get: function () {
            if (this.grid) {
                return this.grid.vo;
            }
            return null;
        },
        set: function (v) {
            this.grid.vo = v;
            if (v != null) {
                if (v.gType == Enum_Attr.ITEM) {
                    var voi = v;
                    this.lbName.text = voi.name;
                    this.showNotice = (voi.canUse && this.grid.gridSource == 2 && Model_Bag.secCheckBag(voi));
                    if (this.showNotice) {
                        if (voi.tz == UIConst.TUJIAN) {
                            this.showNotice = Model_TuJian.checkItemVo(voi);
                        }
                    }
                    this.lbName.color = voi.qColor;
                }
                else if (v.gType == Enum_Attr.EQUIP) {
                    var voe = v;
                    this.lbName.text = voe.gridName;
                    this.lbName.color = voe.qColor;
                }
                else {
                    var voc = v;
                    this.lbName.text = voc.name;
                    this.lbName.color = voc.qColor;
                }
                this.grid.tipEnabled = this.tipEnabled;
                //显示特效
                this.grid.showEff(v.showEffect);
                this.lbNum.visible = false;
                if (v.count > 1) {
                    this.lbNum.visible = true;
                    this.lbNum.text = ConfigHelp.numToStr(v.count);
                }
                this.isShowExtra(v.extra);
            }
            else {
                this.lbName.text = "";
                this.lbNum.visible = false;
                this.grid.tipEnabled = false;
                this.grid.showEff(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewGridRender.prototype.dataChanged = function () {
        var d = this.data;
    };
    Object.defineProperty(ViewGridRender.prototype, "lbNum", {
        get: function () {
            if (this.grid) {
                return this.grid.lbNum;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGridRender.prototype, "choose", {
        set: function (value) {
            this.grid.choose = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGridRender.prototype, "isinsert", {
        set: function (value) {
            this.grid.isinsert = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGridRender.prototype, "showNotice", {
        get: function () {
            return this._showNotice;
        },
        set: function (val) {
            this.grid.checkNotice = val;
            this._showNotice = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGridRender.prototype, "selected", {
        get: function () {
            return this.grid.selectImg.visible;
        },
        //选中
        set: function (v) {
            this.grid.selectImg.visible = v;
        },
        enumerable: true,
        configurable: true
    });
    /**是否显示额外奖励 */
    ViewGridRender.prototype.isShowExtra = function (value) {
        this.extraImg.visible = true;
        switch (value) {
            case 0:
                this.extraImg.visible = false;
                break;
            case 1:
                this.extraImg.url = "ui://jvxpx9emrxjy3dl"; //额外
                break;
            case 2:
                this.extraImg.url = "ui://jvxpx9emik2r3dt"; //首通
                break;
            case 3:
                this.extraImg.url = "ui://jvxpx9emik2r3du"; //协助
                break;
            case 4:
                this.extraImg.url = "ui://jvxpx9emdr4r3fv"; //双倍
                break;
            case 5:
                this.extraImg.url = "ui://jvxpx9emc6yy3dg"; //大奖
                break;
            case 6:
                this.extraImg.url = "ui://jvxpx9emgit23fx"; //满员
                break;
            default:
                this.extraImg.visible = false;
                break;
        }
    };
    ViewGridRender.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.grid.clean();
    };
    ViewGridRender.prototype.setGrayBg = function (icon) {
        this.grid.setGrayBg(icon);
    };
    ViewGridRender.URL = "ui://jvxpx9emetorn";
    return ViewGridRender;
}(fairygui.GComponent));
__reflect(ViewGridRender.prototype, "ViewGridRender");
