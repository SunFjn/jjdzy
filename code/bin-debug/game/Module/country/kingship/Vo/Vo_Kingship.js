var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Kingship = (function () {
    function Vo_Kingship() {
        this.sid = 0; //玩家id
        this.pos = 0;
        this.id = 0;
        this.type = 0; //0怪物1角色
        this.horseId = 0;
    }
    /**L:玩家IDI:npc系统idU:玩家名字L:玩家战力I:玩家时装B:玩家位置1魏王2魏相3魏国大将军 */
    Vo_Kingship.prototype.readMsg = function (data) {
        var self = this;
        self.sid = data.readLong();
        self.id = data.readInt();
        self.name = data.readUTF();
        self.power = data.readLong();
        self.job = data.readInt();
        self.godWeapon = data.readInt();
        self.pos = data.readByte();
        self.horseId = data.readInt();
        if (self.sid != 0) {
            self.id = self.sid;
        }
        else {
            var cfg = Config.NPC_200[self.id];
            self.name = cfg.name;
            self.job = cfg.mod;
            self.power = cfg.power;
        }
        self.type = 1;
    };
    return Vo_Kingship;
}());
__reflect(Vo_Kingship.prototype, "Vo_Kingship");
