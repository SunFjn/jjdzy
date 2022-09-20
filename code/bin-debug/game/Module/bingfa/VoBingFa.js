var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoBingFa = (function () {
    function VoBingFa() {
        this.id = 0;
        this.power = 0;
        this.star = 0;
        this.drugCount = 0;
        this.sortIndex = 0;
    }
    VoBingFa.prototype.initLib = function () {
        var s = this;
        var l = s.lib;
        s.id = l["id"];
        s.name = l["name"];
        s.way = l["way"];
        s.icon = l["icon"];
        s.pic = l["pic"];
        s.max = l["max"];
        s.pin = l["pin"];
        s.starMax = l["star"];
        s.item = JSON.parse(l["item"]);
        s.attr = JSON.parse(l["attr"]);
        s.starattr = JSON.parse(l["starattr"]);
        s.totalAttr = JSON.parse(Config.bookstar_213[s.pin * 1000 + 1].attr);
    };
    VoBingFa.prototype.update = function () {
        var a = this;
        var l = a.lib;
        var s = a.star;
        var starcfg = Config.bookstar_213[a.pin * 1000 + s];
        a.drugCount = a.star * a.lib["max"];
        a.power = starcfg.power;
        a.totalAttr = JSON.parse(starcfg.attr);
        if (starcfg.next > 0) {
            a.totalNextAttr = JSON.parse(Config.bookstar_213[starcfg.next].attr);
        }
    };
    VoBingFa.prototype.canActivate = function () {
        var item = JSON.parse(this.lib["item"]);
        var count = Model_Bag.getItemCount(item[0][1]);
        return count > 0;
    };
    return VoBingFa;
}());
__reflect(VoBingFa.prototype, "VoBingFa");
