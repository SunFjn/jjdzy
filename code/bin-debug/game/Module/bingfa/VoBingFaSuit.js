var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoBingFaSuit = (function () {
    function VoBingFaSuit() {
        this.isMax = false; //是否是满级
        this.isOne = false;
    }
    VoBingFaSuit.prototype.initLib = function () {
        this.update();
        var lb = this.lib;
        this.name = lb.name;
        this.type = (lb.suitid / 1000) >> 0;
    };
    VoBingFaSuit.prototype.update = function () {
        var s = this;
        s.lib = Config.booksuit_212[s.id];
        var lb = s.lib;
        s.condition = s.lib.condition;
        s.isMax = s.condition == "0";
        s.item = lb.item;
        s.isOne = s.id % 1000 == 0;
        s.attr = s.lib.attr;
        if (s.isOne)
            s.attr = Config.booksuit_212[s.id + 1].attr;
    };
    VoBingFaSuit.prototype.getLastLib = function () {
        return Config.booksuit_212[this.id - 1];
    };
    VoBingFaSuit.prototype.isNotice = function () {
        if (this.isMax)
            return false;
        var m = GGlobal.modelBingFa;
        var count = Model_Bag.getItemCount(410013);
        var vo = this;
        if (vo.item != 0) {
            var prop = JSON.parse(vo.item);
            var needCount = prop[0][2];
            if (count >= needCount) {
                if (vo.condition != "0") {
                    var isfill = true;
                    var condition = JSON.parse(vo.condition);
                    for (var k = 0; k < condition.length; k++) {
                        var id = condition[k][0];
                        var star = condition[k][1];
                        if (m.mapObj[id + ""].star < star) {
                            return false;
                        }
                    }
                }
                return true;
            }
        }
        return false;
    };
    return VoBingFaSuit;
}());
__reflect(VoBingFaSuit.prototype, "VoBingFaSuit");
