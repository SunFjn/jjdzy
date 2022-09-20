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
var YSTab = (function (_super) {
    __extends(YSTab, _super);
    function YSTab() {
        return _super.call(this) || this;
    }
    YSTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("yssl", "YSTab"));
    };
    YSTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    YSTab.prototype.setIdx = function (i, actId) {
        var self = this;
        self.idx = i;
        // let labels = ["激活礼","进阶礼","战力礼","寻兽礼"];
        // IconUtil.setImg(self.img, Enum_Path.IMAGE_MODULES_URL+"yssl/i"+i+".png");
        var labels = [];
        if (actId == UIConst.YSSL) {
            labels = ["激活礼", "进阶礼", "战力礼", "寻兽礼"];
            IconUtil.setImg(self.img, Enum_Path.IMAGE_MODULES_URL + "yssl/i" + i + ".png");
        }
        else if (actId == UIConst.YUNCHOUWEIWO_QCYL) {
            labels = ["奇策激活礼", "奇策进阶礼", "奇策战力礼", "奇策星数礼"];
            IconUtil.setImg(self.img, Enum_Path.IMAGE_MODULES_URL + "ycww/i" + i + ".png");
        }
        self.lbTitle.text = labels[i];
    };
    YSTab.prototype.setSelect = function (v) {
        var s = this;
        s.c1.setSelectedIndex(v ? 1 : 0);
    };
    YSTab.prototype.updateDot = function (v) {
        this.imgNotice.visible = v;
    };
    YSTab.URL = "ui://sbm40ly4ln004";
    return YSTab;
}(fairygui.GComponent));
__reflect(YSTab.prototype, "YSTab");
