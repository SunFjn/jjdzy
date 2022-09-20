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
var ItemLCQSEnter = (function (_super) {
    __extends(ItemLCQSEnter, _super);
    function ItemLCQSEnter() {
        return _super.call(this) || this;
    }
    ItemLCQSEnter.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ItemLCQSEnter"));
    };
    ItemLCQSEnter.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btnEnter.addClickListener(s.onEnter, s);
    };
    Object.defineProperty(ItemLCQSEnter.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._vo = v;
            // ImageLoader.instance.loader(Enum_Path.GUAN_QIA_URL + "lcqs" + v.name + ".png", s.imgName);
            // ImageLoader.instance.loader(Enum_Path.GUAN_QIA_URL + "lcqs" + v.icon + ".jpg", s.imgPic);
            IconUtil.setImg(s.imgName, Enum_Path.GUAN_QIA_URL + "lcqs" + v.name + ".png");
            IconUtil.setImg(s.imgPic, Enum_Path.GUAN_QIA_URL + "lcqs" + v.icon + ".jpg");
            IconUtil.setImg(s.imgBg, Enum_Path.GUAN_QIA_URL + "lcqsTilBg.png");
            var curGuan = GGlobal.model_LiuChuQS.curGuan;
            var tab = Math.floor(v.id / 1000);
            var curTab = Math.floor(curGuan / 1000);
            var isOpen = (curTab >= tab);
            s.maskBg.visible = !isOpen;
            s.btnEnter.visible = isOpen;
            s.imgNoOpen.visible = !isOpen;
        },
        enumerable: true,
        configurable: true
    });
    ItemLCQSEnter.prototype.clean = function () {
        var s = this;
        _super.prototype.clean.call(this);
        IconUtil.setImg(s.imgPic, null);
        IconUtil.setImg(s.imgName, null);
        IconUtil.setImg(s.imgBg, null);
    };
    ItemLCQSEnter.prototype.onEnter = function (e) {
        var index = Math.floor(this._vo.id / 1000);
        GGlobal.layerMgr.open(UIConst.CHILD_LCQS_PANEL, index);
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    ItemLCQSEnter.URL = "ui://7a366usasr401g";
    return ItemLCQSEnter;
}(fairygui.GComponent));
__reflect(ItemLCQSEnter.prototype, "ItemLCQSEnter");
