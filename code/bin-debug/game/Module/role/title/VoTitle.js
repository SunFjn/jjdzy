var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoTitle = (function () {
    function VoTitle() {
        this.id = 0;
        /**称号状态（ 0：未激活、1：可激活、2：已激活、3：已穿戴）]*/
        this.state = 0;
        this.time = 0;
        this.power = 0;
        this.actPower = 0;
        this._level = 0;
        this.sortIndex = 0;
    }
    VoTitle.prototype.initLib = function (val) {
        var sf = this;
        sf.lib = val;
        sf.id = val["ID"];
        sf.name = val["name"];
        sf.power = val["fight"];
        sf.type = val["type"];
        sf.desc = val["desc"];
        sf.ttype = val["belong"];
        sf.picture = val["picture"];
        sf.email = val["email"];
        sf.condtion = JSON.parse(val["condtion"]);
        sf.attr = JSON.parse(val["attr"]);
    };
    Object.defineProperty(VoTitle.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (val) {
            this._level = val;
            var cfgPower = this.lib["fight"];
            if (val > 1) {
                this.power = cfgPower * val;
                var temp = JSON.parse(this.lib["attr"]);
                for (var i = 0; i < temp.length; i++) {
                    temp[i][1] = temp[i][1] * val;
                }
                this.attr = temp;
                this.actPower = cfgPower * val;
            }
            this.actPower = cfgPower * val;
        },
        enumerable: true,
        configurable: true
    });
    VoTitle.prototype.isMaxLevel = function () {
        if (VoTitle.maxLevel == 0)
            VoTitle.maxLevel = ConfigHelp.getSystemNum(1011);
        return this.level >= VoTitle.maxLevel;
    };
    VoTitle.prototype.setState = function (val) {
        this.state = val;
    };
    VoTitle.prototype.getSortIndex = function () {
        var val = this.state;
        this.sortIndex = 0;
        if (val == 2)
            this.sortIndex = -1000;
        else if (val == 3 || this.isNotice())
            this.sortIndex = -100000;
        this.sortIndex += this.id;
        return this.sortIndex;
    };
    VoTitle.prototype.isNotice = function () {
        var condition = this.condtion[0];
        var type = condition[0];
        var val = condition[2];
        var ok = false;
        if (type == 9) {
            var ml = Model_Bag.getItemCount(val);
            ok = ml > 0;
        }
        if (!ok) {
            var mail = this.email;
            if (mail != "0") {
                var t = JSON.parse(mail);
                var ml = Model_Bag.getItemCount(t[0][1]);
                ok = ml > 0;
            }
        }
        return ok && !this.isMaxLevel();
    };
    VoTitle.maxLevel = 0;
    return VoTitle;
}());
__reflect(VoTitle.prototype, "VoTitle");
