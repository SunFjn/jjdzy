var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_CrossKingRep = (function () {
    function Vo_CrossKingRep() {
        this.batRes = 0; //战斗结果0失败1成功
    }
    Vo_CrossKingRep.prototype.readMsg = function (data) {
        this.batRes = data.readByte();
        this.name = data.readUTF();
        this.rank = data.readByte();
        this.isUp = data.readByte();
    };
    return Vo_CrossKingRep;
}());
__reflect(Vo_CrossKingRep.prototype, "Vo_CrossKingRep");
