var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 群雄逐鹿玩家数据结构
 * @author: lujiahao
 * @date: 2019-09-29 11:05:52
 */
var VoPlayerQxzl = (function () {
    function VoPlayerQxzl() {
        this.id = 0;
        this.name = "";
        this.job = 0;
        this.weapon = 0;
        this.horseId = 0;
        this.power = 0;
        this.country = 0;
        this.stamina = 0;
        this.maxStamina = 0;
        /** 类型 0玩家 1NPC */
        this.type = 0;
    }
    //=========================================== API ==========================================
    VoPlayerQxzl.prototype.update = function (pType, pCountryId, pUid, pName, pJob, pWeapon, pStamina, pMaxStamina, pPower, pHorseId) {
        var t = this;
        var t_change = false;
        if (t.type != pType) {
            t.type = pType;
            t_change = true;
        }
        if (t.country != pCountryId) {
            t.country = pCountryId;
            t_change = true;
        }
        if (t.id != pUid) {
            t.id = pUid;
            t_change = true;
        }
        if (t.name != pName) {
            t.name = pName;
            t_change = true;
        }
        if (t.job != pJob) {
            t.job = pJob;
            t_change = true;
        }
        if (t.weapon != pWeapon) {
            t.weapon = pWeapon;
            t_change = true;
        }
        if (t.stamina != pStamina) {
            t.stamina = pStamina;
            t_change = true;
        }
        if (t.maxStamina != pMaxStamina) {
            t.maxStamina = pMaxStamina;
            t_change = true;
        }
        if (t.power != pPower) {
            t.power = pPower;
            t_change = true;
        }
        if (t.horseId != pHorseId) {
            t.horseId = pHorseId;
            t_change = true;
        }
        return t_change;
    };
    return VoPlayerQxzl;
}());
__reflect(VoPlayerQxzl.prototype, "VoPlayerQxzl");
