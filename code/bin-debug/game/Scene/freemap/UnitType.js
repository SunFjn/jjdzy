var UnitType;
(function (UnitType) {
    UnitType[UnitType["HERO"] = 0] = "HERO";
    UnitType[UnitType["PLAYER"] = 1] = "PLAYER";
    UnitType[UnitType["NPC"] = 2] = "NPC";
    UnitType[UnitType["MONSTER"] = 3] = "MONSTER";
    UnitType[UnitType["PET"] = 4] = "PET";
    UnitType[UnitType["PORTAL"] = 5] = "PORTAL";
    UnitType[UnitType["JUMP_POINT"] = 6] = "JUMP_POINT";
    UnitType[UnitType["MAGIC"] = 9] = "MAGIC"; //特效
})(UnitType || (UnitType = {}));
