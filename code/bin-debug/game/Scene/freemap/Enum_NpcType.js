var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Enum_NpcType = (function () {
    function Enum_NpcType() {
    }
    Enum_NpcType.COLLECT_NPC = 10;
    Enum_NpcType.JIADING = 13;
    return Enum_NpcType;
}());
__reflect(Enum_NpcType.prototype, "Enum_NpcType");
