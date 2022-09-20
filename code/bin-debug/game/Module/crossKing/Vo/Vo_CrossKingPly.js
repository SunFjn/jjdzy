var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_CrossKingPly = (function () {
    function Vo_CrossKingPly() {
        this.index = 0;
    }
    Vo_CrossKingPly.prototype.readMsg = function (data) {
        var self = this;
        self.rank = data.readInt();
        self.sid = data.readLong();
        self.npcId = data.readInt();
        self.name = data.readUTF();
        self.power = data.readLong();
        self.isNpc = data.readByte();
        self.godWeapon = data.readInt();
        self.job = data.readInt();
        self.horseId = data.readInt();
    };
    Vo_CrossKingPly.prototype.readMsgRank = function (data) {
        this.sid = data.readLong();
        this.name = data.readUTF();
    };
    return Vo_CrossKingPly;
}());
__reflect(Vo_CrossKingPly.prototype, "Vo_CrossKingPly");
