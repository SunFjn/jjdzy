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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var TianShuItem = (function (_super) {
    __extends(TianShuItem, _super);
    function TianShuItem() {
        var _this = _super.call(this) || this;
        _this.sindex = 0;
        return _this;
    }
    TianShuItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewBWGrid"));
    };
    TianShuItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    TianShuItem.prototype.setSel = function (val) {
        this.selectImg.visible = val;
    };
    Object.defineProperty(TianShuItem.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (val) {
            var s = this;
            s._vo = val;
            var m = GGlobal.modeltianshu;
            s.starGroup.visible = val.star != 0;
            IconUtil.setImg(s.imgIcon, Enum_Path.ICON70_URL + s._vo.icon + ".png");
            IconUtil.setImg(s.bg, Enum_Path.ICON70_URL + "BmG_" + s._vo.pin + ".png");
            s.wearImg.visible = val.id == m.currentID;
            s.nameLb.text = HtmlUtil.fontNoSize(val.name, Color.getColorStr(s._vo.pin));
            s.sourceGroup.visible = false;
            s.maskBg.visible = val.star == 0;
            s.starLb.text = val.star + "";
            s.sourceLb.text = val.way;
            s.noticeImg.visible = Model_Bag.getItemCount(JSON.parse(val.item)[0][1]) > 0 && !val.isMaxStar();
        },
        enumerable: true,
        configurable: true
    });
    TianShuItem.prototype.setSuitVo = function (v) {
        this.vo = v;
        this.noticeImg.visible = false;
        this.setSel(false);
    };
    TianShuItem.prototype.clean = function () {
        var s = this;
        IconUtil.setImg(s.imgIcon, null);
        IconUtil.setImg(s.bg, null);
        s.noticeImg.visible = false;
        s.setSel(false);
    };
    TianShuItem.URL = "ui://3tzqotadn4tus";
    return TianShuItem;
}(fairygui.GComponent));
__reflect(TianShuItem.prototype, "TianShuItem");
