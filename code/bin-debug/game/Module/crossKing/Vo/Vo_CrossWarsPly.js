var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_CrossWarsPly = (function () {
    function Vo_CrossWarsPly() {
        this.turn = 0; //轮数0-4
        this.index = 0; //场数0-8
    }
    Vo_CrossWarsPly.prototype.readMsg = function (data) {
        var self = this;
        self.turn = data.readByte();
        self.index = data.readByte();
        self.hid1 = data.readLong();
        self.hid2 = data.readLong();
        self.name1 = data.readUTF();
        self.name2 = data.readUTF();
        self.job1 = data.readInt();
        self.job2 = data.readInt();
        self.weakean1 = data.readInt();
        self.weakean2 = data.readInt();
        self.power1 = data.readLong();
        self.power2 = data.readLong();
        self.guanxian1 = data.readByte();
        self.guanxian2 = data.readByte();
        self.head1 = data.readInt();
        self.head2 = data.readInt();
        self.frame1 = data.readInt();
        self.frame2 = data.readInt();
        self.battleRes = data.readByte();
        self.buywin = data.readByte();
        self.horseId1 = data.readInt();
        self.horseId2 = data.readInt();
    };
    Vo_CrossWarsPly.prototype.readWinMsg = function (data) {
        var self = this;
        self.turn = data.readByte();
        self.name1 = data.readUTF();
        self.power1 = data.readLong();
        self.job1 = data.readInt();
        self.weakean1 = data.readInt();
        self.horseId1 = data.readInt();
    };
    return Vo_CrossWarsPly;
}());
__reflect(Vo_CrossWarsPly.prototype, "Vo_CrossWarsPly");
