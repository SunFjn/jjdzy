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
var VRunManGrid = (function (_super) {
    __extends(VRunManGrid, _super);
    function VRunManGrid() {
        return _super.call(this) || this;
    }
    VRunManGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "VRunManGrid"));
    };
    VRunManGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.bg = (this.getChild("bg"));
        this.iconImg = (this.getChild("iconImg"));
        this.nameLv = (this.getChild("nameLv"));
        this.imgAct = (this.getChild("imgAct"));
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    Object.defineProperty(VRunManGrid.prototype, "vo", {
        set: function (vo) {
            this._vo = vo;
            if (vo) {
                // ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
                // ImageLoader.instance.loader(Enum_Path.GENERAL_URL + vo.pic + ".jpg", this.iconImg);
                IconUtil.setImg(this.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
                IconUtil.setImg(this.iconImg, Enum_Path.GENERAL_URL + vo.pic + ".jpg");
                this.nameLv.text = vo.name;
                this.nameLv.color = Color.getColorInt(vo.quality);
            }
            else {
                this.iconImg.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VRunManGrid.prototype, "actiVis", {
        set: function (boo) {
            this.imgAct.visible = boo;
        },
        enumerable: true,
        configurable: true
    });
    VRunManGrid.prototype.onRemove = function () {
        IconUtil.setImg(this.bg, null);
        IconUtil.setImg(this.iconImg, null);
    };
    VRunManGrid.URL = "ui://pkuzcu87em4do";
    return VRunManGrid;
}(fairygui.GComponent));
__reflect(VRunManGrid.prototype, "VRunManGrid");
