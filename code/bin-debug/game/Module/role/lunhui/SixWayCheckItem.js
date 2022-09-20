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
/**
 * 套装查看item
 */
var SixWayCheckItem = (function (_super) {
    __extends(SixWayCheckItem, _super);
    function SixWayCheckItem() {
        return _super.call(this) || this;
    }
    SixWayCheckItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("lunhui", "SixWayCheckItem"));
    };
    SixWayCheckItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    SixWayCheckItem.prototype.clean = function () {
        var s = this;
    };
    SixWayCheckItem.prototype.setdata = function (cfg) {
        if (!cfg)
            return;
        var s = this;
        s.lbPower.text = "战力：" + cfg.power;
        s.nameLb.text = cfg ? ConfigHelp.createColorName(cfg.name + "(" + cfg.num + ")", cfg.pz) : "";
        // let attArr: Array<any> = JSON.parse(cfg.attr);
        // let attstr:string = "";
        // for (let i = 0; i < attArr.length; i++) {
        // 	attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
        // }
        s.proLb.text = cfg.tips;
        var name = "";
        if (cfg.type == 1) {
            name = "天道印记";
        }
        else if (cfg.type == 2) {
            name = "人道印记";
        }
        else if (cfg.type == 3) {
            name = "畜生道印记";
        }
        else if (cfg.type == 4) {
            name = "饿鬼道印记";
        }
        else if (cfg.type == 5) {
            name = "地狱道印记";
        }
        else {
            name = "修罗道印记";
        }
        s.lbContent.text = "需装备" + cfg.num + "件" + Color.getColorName(cfg.pz) + "色" + name;
        IconUtil.setImg(s.bgImg, Enum_Path.SIXWAY_URL + "p" + cfg.type + ".jpg");
        IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "k" + cfg.pz + ".png");
    };
    SixWayCheckItem.URL = "ui://ehelf5bhv97gw1y";
    return SixWayCheckItem;
}(fairygui.GComponent));
__reflect(SixWayCheckItem.prototype, "SixWayCheckItem");
