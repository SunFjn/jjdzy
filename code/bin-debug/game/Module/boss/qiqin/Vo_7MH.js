var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_7MH = (function () {
    function Vo_7MH() {
        this.id = 0;
        this.linkID = 0;
        this.map = 0;
        this.tagWardDta = [];
        this.sortIndex = 0;
        this.sortMxIndex = 0;
    }
    Vo_7MH.prototype.init = function () {
        var s = this;
        var l = s.lib;
        s.id = l.boss;
        s.linkID = l.id;
        s.condition = JSON.parse(l.con);
        s.map = l.map;
        s.showAward = JSON.parse(l.reward);
        s.killerAward = JSON.parse(l.killreward);
        //当前国家的BOSS击杀奖励
        s.contryWard = [JSON.parse(l.reward1), JSON.parse(l.reward2), JSON.parse(l.reward3)];
        s.personRankWard = [JSON.parse(l.reward4), JSON.parse(l.reward5), JSON.parse(l.reward6), JSON.parse(l.reward7)];
        var c = s.condition[0];
        s.sortIndex = (c[0] / 1000) >> 0;
        s.sortMxIndex = (c[1] / 1000) >> 0;
        s.head = Config.NPC_200[s.id].head;
        s.level = ((c[0] / 1000) >> 0) + "-" + ((c[1] / 1000) >> 0) + "转";
    };
    Vo_7MH.prototype.setTag = function () {
    };
    return Vo_7MH;
}());
__reflect(Vo_7MH.prototype, "Vo_7MH");
