var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Enum_Equip = (function () {
    function Enum_Equip() {
    }
    /**武器*/ Enum_Equip.WEAPON = 0;
    /**衣服*/ Enum_Equip.CLOTHES = 1;
    /**护腕*/ Enum_Equip.CUFF = 2;
    /**裤子*/ Enum_Equip.TROUSERS = 3;
    /**鞋子*/ Enum_Equip.SHOE = 4;
    /**帽子*/ Enum_Equip.HAT = 5;
    /**项链*/ Enum_Equip.NECKLACE = 6;
    /**手镯*/ Enum_Equip.BRACELET = 7;
    /**戒指*/ Enum_Equip.RING = 8;
    /**饰品*/ Enum_Equip.DECORATIONS = 9;
    /**神装武器*/ Enum_Equip.GOD_WEAPON = 10;
    /**神装衣服*/ Enum_Equip.GOD_CLOTHES = 11;
    /**神装护腕*/ Enum_Equip.GOD_CUFF = 12;
    /**神装裤子*/ Enum_Equip.GOD_TROUSERS = 13;
    /**神装鞋子*/ Enum_Equip.GOD_SHOE = 14;
    /**神装帽子*/ Enum_Equip.GOD_HAT = 15;
    /**神装项链*/ Enum_Equip.GOD_NECKLACE = 16;
    /**神装手镯*/ Enum_Equip.GOD_BRACELET = 17;
    /**神装戒指*/ Enum_Equip.GOD_RING = 18;
    /**神装饰品*/ Enum_Equip.GOD_DECORATIONS = 19;
    return Enum_Equip;
}());
__reflect(Enum_Equip.prototype, "Enum_Equip");
