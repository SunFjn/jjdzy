var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoTianShu = (function () {
    function VoTianShu() {
        /**
         * 已装备设置为9999
         * 激活按star
         * 未激活懒得管
        */
        this.sortIndex = 0;
        this.star = 0;
        this.starMax = 0;
        this.att = [];
        this.starAtt = [];
        this.power = 0;
        this.cd = 0;
        this.dragCount = 0; //激活的属性丹数量
        this.desc = "";
    }
    VoTianShu.prototype.initLib = function () {
        var s = this;
        var lib = Config.book_215[s.id];
        s.way = lib["way"];
        s.icon = lib["icon"];
        s.pic = lib["pic"];
        s.name = lib["name"];
        s.pin = lib["pin"];
        s.starMax = lib["star"];
        s.att = JSON.parse(lib["attr"]);
        s.starAtt = JSON.parse(lib["starattr"]);
        s.item = lib["item"];
        s.skillID = lib["skill"];
        var sklib = Config.skill_210[s.skillID];
        s.cd = sklib["cd"];
        s.desc = sklib["des"];
        s.dragCount = s.star * lib["max"];
        s.max = lib["max"];
        s.updatePower();
    };
    VoTianShu.prototype.updatePower = function () {
        var s = this;
        var lib = Config.book_215[s.id];
        var starcfg = Config.bookstar_215[s.pin * 1000 + s.star];
        s.power = starcfg ? starcfg.power : 0;
        var sklib = Config.skill_210[s.skillID];
        var sv = Vo_Skill.create(s.skillID, s.star, s.star);
        s.desc = SkillUtil.getSkillDes(sv);
        s.dragCount = s.star * lib["max"];
    };
    VoTianShu.prototype.isMaxStar = function () {
        return this.star >= this.starMax;
    };
    VoTianShu.prototype.canAcitvate = function () {
        var lib = Config.book_215[this.id];
        var item = JSON.parse(lib["item"]);
        var count = Model_Bag.getItemCount(item[0][1]);
        return count > 0;
    };
    return VoTianShu;
}());
__reflect(VoTianShu.prototype, "VoTianShu");
