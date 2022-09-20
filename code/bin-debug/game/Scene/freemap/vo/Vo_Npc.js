var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Npc = (function () {
    function Vo_Npc() {
        this.hp = 1;
        this.maxHp = 1;
    }
    Vo_Npc.prototype.init = function (id, cfgID) {
        if (cfgID === void 0) { cfgID = 0; }
        var s = this;
        s.id = id;
        s.cfgID = cfgID;
        s.cfg = Config.NPC_200[cfgID];
        if (true && !s.cfg) {
            throw new Error("没有配置NPCID：" + id);
        }
    };
    Vo_Npc.create = function (id, cfgID) {
        if (cfgID === void 0) { cfgID = 0; }
        var vo = Pool.getItemByClass("Vo_Npc", Vo_Npc);
        vo.init(id, cfgID);
        return vo;
    };
    Vo_Npc.prototype.recover = function () {
        Pool.recover("Vo_Npc", this);
    };
    return Vo_Npc;
}());
__reflect(Vo_Npc.prototype, "Vo_Npc");
