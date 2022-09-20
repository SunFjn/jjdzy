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
var BingfaItem = (function (_super) {
    __extends(BingfaItem, _super);
    function BingfaItem() {
        return _super.call(this) || this;
    }
    BingfaItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("role", "ViewBWGrid"));
    };
    BingfaItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    BingfaItem.prototype.setNotice = function (val) {
        this.noticeImg.visible = val;
    };
    BingfaItem.prototype.clean = function () {
        var self = this;
        self.selectImg.visible = false;
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.imgIcon, null);
    };
    BingfaItem.prototype.setChoose = function (val) {
        this.selectImg.visible = val;
    };
    BingfaItem.prototype.setVo = function (val, isCheck, selId) {
        if (selId === void 0) { selId = -1; }
        var s = this;
        s.vo = val;
        s.setChoose(s.vo.id == selId);
        s.sourceLb.text = val.way;
        var b = val.star == 0;
        s.sourceGroup.visible = false;
        s.maskBg.visible = b;
        s.starGroup.visible = !b;
        s.starLb.text = val.star + "";
        s.nameLb.text = HtmlUtil.fontNoSize(val.name, Color.getColorStr(val.pin));
        IconUtil.setImg(s.bg, Enum_Path.ICON70_URL + "BmG_" + val.pin + ".png");
        IconUtil.setImg(s.imgIcon, Enum_Path.ICON70_URL + val.icon + ".png");
        if (isCheck && val.star < val.starMax) {
            var i = val.item[0][1];
            var count = Model_Bag.getItemCount(i);
            s.setNotice(count > 0);
        }
        else {
            s.setNotice(false);
        }
    };
    BingfaItem.prototype.setSuitVo = function (v) {
        var s = this;
        s.setVo(v);
        s.setChoose(false);
        s.setNotice(false);
    };
    BingfaItem.URL = "ui://3tzqotadn4tus";
    return BingfaItem;
}(fairygui.GComponent));
__reflect(BingfaItem.prototype, "BingfaItem");
