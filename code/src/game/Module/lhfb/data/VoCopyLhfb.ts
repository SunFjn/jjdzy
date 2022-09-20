/**
 * @author: lujiahao 
 * @date: 2020-03-03 16:06:57 
 */
class VoCopyLhfb {
    /** 轮回id */
    public lunhuiId = 0;
    /** 已挑战次数 */
    public hasPass = 0;
    /** 副本星数 */
    public star = 1;

    constructor() {
    }
    //=========================================== API ==========================================
    public update(pData: { hasPass: number, star: number }): boolean {
        return ObjectUtils.modifyObject(this, pData);
    }

    /** 剩余挑战次数 */
    public get remainCount(): number {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_remain = t_model.maxChallenge - t.hasPass;
        return t_remain < 0 ? 0 : t_remain;
    }

    /** 副本名称 */
    public get name(): string {
        let t = this;
        return `${ConfigHelp.NumberToChinese(t.lunhuiId)}世轮回副本`;
    }

    /** 战斗地图id */
    public get mapId(): number {
        return 391000 + this.lunhuiId;
    }

    /** 当前的关卡数据 */
    public get levelVo(): VoLevelLhfb {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        return t_model.getLevelVoByLunhuiIdAndStar(t.lunhuiId, t.star);
    }

    /** 是否可进入 */
    public canEnter(pShowTips: boolean): boolean {
        let t = this;
        let t_myLunhuiId = Model_player.voMine.reincarnationLevel;
        if (t.lunhuiId > t_myLunhuiId) {
            if (pShowTips) {
                ViewCommonWarn.text(`需要达到${ConfigHelp.NumberToChinese(t.lunhuiId)}世轮回`);
            }
            return false;
        }
        return true;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}