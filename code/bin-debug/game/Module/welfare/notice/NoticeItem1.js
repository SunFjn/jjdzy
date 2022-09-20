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
var NoticeItem1 = (function (_super) {
    __extends(NoticeItem1, _super);
    function NoticeItem1() {
        return _super.call(this) || this;
    }
    NoticeItem1.createInstance = function () {
        return (fairygui.UIPackage.createObject("Welfare", "NoticeItem1"));
    };
    NoticeItem1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    NoticeItem1.prototype.show = function (vo) {
        var self = this;
        if (!vo)
            return;
        self.lbTitle.text = vo.nr;
        if (vo.bg == "0") {
            IconUtil.setImg(self.bgImg, null);
            self.height = 36;
        }
        else {
            IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + vo.bg + ".jpg");
            self.height = 211;
        }
    };
    NoticeItem1.URL = "ui://ye1luhg3k2yd1g";
    return NoticeItem1;
}(fairygui.GComponent));
__reflect(NoticeItem1.prototype, "NoticeItem1");
