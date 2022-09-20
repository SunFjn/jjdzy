/**
 * 群雄逐鹿玩家数据结构
 * @author: lujiahao 
 * @date: 2019-09-29 11:05:52 
 */
class VoPlayerQxzl {
    public id = 0;

    public name = "";
    public job = 0;
    public weapon = 0;
    public horseId = 0;
    public power = 0;

    public country = 0;

    public stamina = 0;
    public maxStamina = 0;

    /** 类型 0玩家 1NPC */
    public type = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public update(pType, pCountryId, pUid, pName, pJob, pWeapon, pStamina, pMaxStamina, pPower, pHorseId): boolean {
        let t = this;
        let t_change = false;

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
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}