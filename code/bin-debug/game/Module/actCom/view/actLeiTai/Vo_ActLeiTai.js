var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_ActLeiTai = (function () {
    function Vo_ActLeiTai() {
        this._isLeiZhu = false;
    }
    Vo_ActLeiTai.prototype.readMsg = function (data) {
        var s = this;
        s.id = data.readInt();
        s.plyArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new Vo_ActLeiTaiPly();
            v.readMsg(data);
            s.plyArr[v.pos] = v;
        }
        s.cfg = Config.leitai_500[s.id];
        s.setIsZhu();
    };
    Vo_ActLeiTai.prototype.setIsZhu = function () {
        var s = this;
        var id = Model_player.voMine.id;
        if (s.plyArr[0] == null) {
            s._isLeiZhu = false;
        }
        s._isLeiZhu = (id == s.plyArr[0].plyId);
    };
    Object.defineProperty(Vo_ActLeiTai.prototype, "isLeiZhu", {
        //自己是擂主
        get: function () {
            return this._isLeiZhu;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_ActLeiTai.prototype, "isNoPly", {
        get: function () {
            var s = this;
            var ply = s.plyArr[0];
            if (!ply || ply.npcId > 0 || ply.plyId == 0) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return Vo_ActLeiTai;
}());
__reflect(Vo_ActLeiTai.prototype, "Vo_ActLeiTai");
var Vo_ActLeiTaiPly = (function () {
    function Vo_ActLeiTaiPly() {
        this.horseId = 0;
        this.power = 0;
        this.headId = 0;
        this.frameId = 0;
        this.npcCfg = null;
    }
    Vo_ActLeiTaiPly.prototype.readMsg = function (data) {
        var s = this;
        s.plyId = data.readLong();
        s.name = data.readUTF();
        s.headId = data.readInt();
        s.frameId = data.readInt();
        s.horseId = data.readInt();
        s.power = data.readLong();
        s.npcId = data.readInt();
        s.szId = data.readInt();
        s.godWeapon = data.readInt();
        s.isLei = data.readByte();
        s.pos = data.readByte();
        if (s.isLei) {
            s.pos = 0;
        }
        if (s.npcId) {
            s.npcCfg = Config.NPC_200[s.npcId];
        }
    };
    return Vo_ActLeiTaiPly;
}());
__reflect(Vo_ActLeiTaiPly.prototype, "Vo_ActLeiTaiPly");
