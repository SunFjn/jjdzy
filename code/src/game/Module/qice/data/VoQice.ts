/**
 * 奇策数据结构
 * @author: lujiahao 
 * @date: 2019-10-19 10:53:18 
 */
class VoQice {
    public id: number;

    /** 等级（初始为1级） */
    public level = 1;
    /** 星级 */
    public star = 0;
    /** 兵魂 */
    public bHun = 0;
    /** 将魂 */
    public jHun = 0;

    constructor() {
    }

    //========================================= 协议相关 ========================================
    public get cfg(): Iqc_760 {
        return Config.qc_760[this.id];
    }

    //=========================================== API ==========================================
    public update(pLevel: number, pStar: number, pBHun: number, pJHun: number): boolean {
        let t = this;
        let t_change = false;
        if (t.level != pLevel) {
            t.level = pLevel;
            t_change = true;
        }
        if (t.star != pStar) {
            t.star = pStar;
            t_change = true;
        }
        if (t.bHun != pBHun) {
            t.bHun = pBHun;
            t_change = true;
        }
        if (t.jHun != pJHun) {
            t.jHun = pJHun;
            t_change = true;
        }
        return t_change;
    }

    public get nameWithColor(): string {
        return HtmlUtil.font(this.cfg.name, Color.getColorStr(this.cfg.pz));
    }

    private _consumeList: IGridImpl[];
    /** 升星消耗 */
    public get consumeList(): IGridImpl[] {
        if (this._consumeList === undefined) {
            this._consumeList = ConfigHelp.makeItemListArr(this.cfg.sxxh);
        }
        return this._consumeList;
    }

    /** 是否拥有兵魂 */
    public get hasBh(): boolean {
        return this.cfg.max1 > 0;
    }

    /** 是否拥有将魂 */
    public get hasJh(): boolean {
        return this.cfg.max2 > 0;
    }

    /** 兵魂上限 */
    public get bhMax(): number {
        return this.star * this.cfg.max1;
    }

    /** 将魂上限 */
    public get jhMax(): number {
        return this.star * this.cfg.max2;
    }

    /** 是否已经激活 */
    public get isActive(): boolean {
        return this.star > 0;
    }

    /** 是否满星 */
    public get isStarMax(): boolean {
        if (this.star >= this.cfg.sx || !this.nextStarCfg)
            return true;
        else
            return false;
    }

    /** 是否满级 */
    public get isLevelMax(): boolean {
        if (!this.nextLevelCfg)
            return true;
        else
            return false;
    }

    public get curStarId(): number {
        return this.cfg.pz * 1000 + this.star;
    }

    public get nextStarId(): number {
        return this.curStarId + 1;
    }

    public get curStarCfg(): CfgStarQice {
        return GGlobal.modelQice.getCfgStar(this.curStarId);
    }

    public get nextStarCfg(): CfgStarQice {
        return GGlobal.modelQice.getCfgStar(this.nextStarId);
    }

    public get curLevelId(): number {
        return this.cfg.pz * 10000 + this.level;
    }

    public get nextLevelId(): number {
        return this.curLevelId + 1;
    }

    public get curLevelCfg(): CfgLevelQice {
        return GGlobal.modelQice.getCfgLevel(this.curLevelId);
    }

    public get nextLevelCfg(): CfgLevelQice {
        return GGlobal.modelQice.getCfgLevel(this.nextLevelId);
    }

    /** 阶数 */
    public get levelJie(): number {
        return ~~(this.level / 10);
    }

    /** 级数 */
    public get levelJi(): number {
        return this.level % 10;
    }

    /** 阶级文字 */
    public get levelStr(): string {
        return this.levelJie + "阶" + this.levelJi + "级";
    }

    /** 检查是否可升星 */
    public checkCanStarUp(pShowAlert: boolean): boolean {
        let t = this;
        let t_result = false;
        do {
            if (t.isStarMax) {
                pShowAlert && ViewCommonWarn.text("当前奇策已满星");
                continue;
            }
            if (!FastAPI.checkItemEnough(t.consumeList[0].id, t.consumeList[0].count, pShowAlert)) {
                continue;
            }
            t_result = true;
        } while (false);
        return t_result;
    }

    /** 检查是否可升级 */
    public checkCanLevelUp(pShowAlert: boolean): boolean {
        let t = this;
        let t_result = false;
        do {
            if (t.isLevelMax) {
                pShowAlert && ViewCommonWarn.text("当前奇策已满级");
                continue;
            }
            if (!t.isActive) {
                pShowAlert && ViewCommonWarn.text(`请先激活${t.nameWithColor}`);
                continue;
            }
            if (t.star < t.curLevelCfg.cfg.tj) {
                pShowAlert && ViewCommonWarn.text(`需要${t.nameWithColor}达到${t.curLevelCfg.cfg.tj}星}`);
                continue;
            }
            if (!FastAPI.checkItemEnough(t.curLevelCfg.consumeList[0].id, t.curLevelCfg.consumeList[0].count, pShowAlert)) {
                continue;
            }
            t_result = true;
        } while (false);
        return t_result;
    }

    /** 检查魂是否可吞噬 */
    public checkHunCanUp(pHunType: number, pShowAlert: boolean): boolean {
        let t = this;
        let t_result = false;
        let t_hunCount = 0;
        let t_hunMax = 0;
        if (pHunType == EnumQice.HUN_TYPE_BH) {
            //兵魂
            t_hunCount = t.bHun;
            t_hunMax = t.bhMax;
        }
        else {
            //将魂
            t_hunCount = t.jHun;
            t_hunMax = t.jhMax;
        }
        do {
            if (!t.isActive) {
                pShowAlert && ViewCommonWarn.text(`请先激活${t.nameWithColor}`);
                continue;
            }
            if (t_hunCount >= t_hunMax) {
                pShowAlert && ViewCommonWarn.text("已超过可吞噬上限");
                continue;
            }

            let t_cfg = Config.qcts_760[pHunType];
            if (!t_cfg)
                continue;
            let t_itemCfg = Config.daoju_204[t_cfg.id];
            if (!t_itemCfg)
                continue;
            if (!FastAPI.checkItemEnough(t_itemCfg.id, 1, pShowAlert)) {
                continue;
            }
            t_result = true;
        } while (false);
        return t_result;
    }

    /**
     * 获取排序权值
     * @param pType 类型 0升星 1升级 
     */
    public getSortVlaue(pType: number): number {
        let t = this;
        let t_value = 0;
        let t_canOp = false;
        if (pType == 0) {
            //升星
            if (t.checkCanStarUp(false)
                || t.checkHunCanUp(EnumQice.HUN_TYPE_BH, false)
                || t.checkHunCanUp(EnumQice.HUN_TYPE_JH, false)
            ) {
                t_value += 1000;
                if (!t.isActive) {
                    //可升级但未激活，就是需要激活操作，优先级要+
                    t_value += 10000;
                }
                t_canOp = true;
            }
        }
        else {
            //升级
            if (t.checkCanLevelUp(false)) {
                t_value += 1000;
                t_canOp = true;
            }
        }

        if (t_canOp) {
            t_value += (t.id % 100000);
        }
        else {
            if (t.isActive) {
                //已激活
                t_value += (t.id % 100000);
            }
            else {
                //未激活
                t_value -= (t.id % 100000);
            }
        }
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}