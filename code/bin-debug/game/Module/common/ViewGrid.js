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
var ViewGrid = (function (_super) {
    __extends(ViewGrid, _super);
    function ViewGrid() {
        var _this = _super.call(this) || this;
        _this.isShowEff = false;
        _this.tipUse = false; //是否可以使用穿戴;
        _this.gridSource = 0; //格子来源
        return _this;
    }
    ViewGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewGrid"));
    };
    ViewGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ViewGrid.create = function () {
        return ViewGrid.createInstance();
    };
    ViewGrid.prototype.showEff = function (v) {
        var self = this;
        if (v && self.vo && self.vo.showEffect) {
            if (self.effPart) {
                EffectMgr.instance.removeEff(self.effPart);
                self.effPart = null;
            }
            if (self.effPart == null) {
                var idx = 0;
                if (self.vo.quality >= 8) {
                    idx = 10055;
                }
                else {
                    idx = 10001 + (self.vo.quality - 5);
                    idx = idx > 10002 ? 10002 : idx;
                }
                self.effPart = EffectMgr.addEff("uieff/" + idx, self.displayListContainer, self.width / 2, self.height / 2, 800, -1);
            }
        }
        else {
            if (self.effPart) {
                EffectMgr.instance.removeEff(self.effPart);
                self.effPart = null;
            }
        }
    };
    ViewGrid.prototype.setEffScale = function (value) {
        var self = this;
        if (self.effPart) {
            self.effPart.mc.scaleX = self.effPart.mc.scaleY = value;
        }
    };
    Object.defineProperty(ViewGrid.prototype, "tipEnabled", {
        /**设置是否显示tip */
        set: function (bo) {
            var self = this;
            if (bo) {
                self.addClickListener(self.onTips, self);
            }
            else {
                self.removeClickListener(self.onTips, self);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewGrid.prototype.onTips = function (e) {
        var self = this;
        if (!self._vo) {
            return;
        }
        FastAPI.showItemTips(self._vo, self.gridSource);
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    Object.defineProperty(ViewGrid.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            var self = this;
            self._vo = v;
            if (v) {
                IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + v.icon + ".png");
                // ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", self.imgIcon);
                self.imgIcon.visible = true;
                IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + v.quality + ".png");
                // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + v.quality + ".png", self.bg);
                if (v.count > 1) {
                    self.lbNum.text = ConfigHelp.getYiWanText(v.count);
                }
                else {
                    self.lbNum.text = "";
                }
                self.showEff(self.isShowEff);
                self.chipImg.visible = (v.gType == Enum_Attr.ITEM && v.type == 18);
                if (v.gType == Enum_Attr.EQUIP && v.tips != "0") {
                    self.equipLb.text = v.tips;
                    self.equipLb.visible = true;
                }
                else {
                    self.equipLb.visible = false;
                }
            }
            else {
                IconUtil.setImg(self.imgIcon, null);
                // self.imgIcon.url = null;
                self.imgIcon.visible = false;
                IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_1.png");
                // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_1.png", self.bg);
                self.lbNum.text = "";
                self.noticeImg.visible = false;
                self.chipImg.visible = false;
                self.equipLb.visible = false;
                self.showEff(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGrid.prototype, "checkNotice", {
        get: function () {
            return this.noticeImg.visible;
        },
        set: function (value) {
            this.noticeImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGrid.prototype, "choose", {
        set: function (value) {
            this.selectImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGrid.prototype, "isinsert", {
        set: function (value) {
            this.isinsertImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGrid.prototype, "iconScale", {
        /**缩放格子图片的大小 */
        set: function (v) {
            var self = this;
            if (self.group) {
                self.group.scaleX = self.group.scaleY = v;
                // var num = 64 * (1 - v);
                // self.lbNum.right = 3 + num/2;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewGrid.prototype, "showText", {
        set: function (str) {
            this.lbNum.text = str;
        },
        enumerable: true,
        configurable: true
    });
    //是否需要回收
    ViewGrid.prototype.disposePanel = function () {
        this.clean();
    };
    ViewGrid.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var self = this;
        self.showEff(false);
        self.removeClickListener(self.onTips, self);
        self.gridSource = 0;
        self.checkNotice = false;
        self.choose = false;
        self.isinsert = false;
        self.chipImg.visible = false;
        IconUtil.setImg(self.imgIcon, null);
        IconUtil.setImg(self.bg, null);
    };
    ViewGrid.prototype.setGrayBg = function (icon) {
        var self = this;
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "gray" + icon + ".png", self.imgIcon);
        self.imgIcon.visible = true;
    };
    ViewGrid.URL = "ui://jvxpx9emetorm";
    ViewGrid.ROLE = 1;
    ViewGrid.BAG = 2;
    return ViewGrid;
}(fairygui.GComponent));
__reflect(ViewGrid.prototype, "ViewGrid");
/**额外功能添加 */
var ExtralFunc = (function () {
    function ExtralFunc() {
    }
    ExtralFunc.addBigAdEff = function (sysKey, target, source, childIndex) {
        if (source === void 0) { source = "uieff/10022"; }
        if (childIndex === void 0) { childIndex = -1; }
        var self = this;
        if (source == null) {
            if (self.effDic[sysKey]) {
                EffectMgr.instance.removeEff(self.effDic[sysKey]);
                self.effDic[sysKey] = null;
            }
        }
        else {
            if (!self.effDic[sysKey]) {
                var eff = self.effDic[sysKey] = EffectMgr.addEff(source, target.parent.displayListContainer, target.x + target.width / 2, target.y + target.height / 2, 800, -1);
                if (childIndex >= 0) {
                    target.parent.displayListContainer.setChildIndex(eff.mc, childIndex);
                }
            }
        }
    };
    ExtralFunc.effDic = {};
    return ExtralFunc;
}());
__reflect(ExtralFunc.prototype, "ExtralFunc");
