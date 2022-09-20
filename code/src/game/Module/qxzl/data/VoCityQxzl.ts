/**
 * 群雄逐鹿城池数据结构
 * @author: lujiahao 
 * @date: 2019-09-25 15:39:43 
 */
class VoCityQxzl {
    public id: number;

    /** 所属国家 */
    public countryId: number = 0;
    /** 是否庆典双倍 */
    public isDouble = 0;
    /** 驻守人数 */
    public guardCount = 0;

    /** 最大页码 */
    public maxPage = 1;

    public playerList: VoPlayerQxzl[] = [];


    constructor() {
        this.playerList.length = EnumQxzl.PER_PAGE_COUNT;
    }
    //=========================================== API ==========================================
    public get cfg(): Iqxzl_273 {
        return Config.qxzl_273[this.id];
    }

    public update(pCountryId: number, pIsDouble: number, pGuardCount: number): boolean {
        let t_change = false;
        if (this.countryId != pCountryId) {
            this.countryId = pCountryId;
            t_change = true;
        }
        if (!(pIsDouble === undefined)) {
            if (this.isDouble != pIsDouble) {
                this.isDouble = pIsDouble;
                t_change = true;
            }
        }
        if (!(pGuardCount === undefined)) {
            if (this.guardCount != pGuardCount) {
                this.guardCount = pGuardCount;
                t_change = true;
            }
        }
        return t_change;
    }

    /** 是否没人驻守 */
    public get isEmpty(): boolean {
        let t_isEmpty = true;
        for (let v of this.playerList) {
            if (v) {
                t_isEmpty = false;
                break;
            }
        }
        return t_isEmpty;
    }

    public getPlayerVoByIndex(pIndex: number): VoPlayerQxzl {
        return this.playerList[pIndex];
    }

    /** 是否国家主城 */
    public get isMainCity(): boolean {
        return this.cfg.type == 4 || this.cfg.type == 5 || this.cfg.type == 6;
    }

    private _lujiao: number;
    /** 驻守的定时鹿角奖励 */
    public get rewardLujiao(): number {
        if (this._lujiao === undefined) {
            let t_list = JSON.parse(this.cfg.lu);
            this._lujiao = ~~t_list[0][2];
        }
        return this._lujiao;
    }

    private _rewardList: IGridImpl[];
    /** 领地奖励 */
    public get rewardList(): IGridImpl[] {
        if (this._rewardList === undefined)
            this._rewardList = ConfigHelp.makeItemListArr(this.cfg.reward);
        return this._rewardList;
    }

    /** 是否属于主角国家的城池 */
    public get isMyCountryCity(): boolean {
        if (this.countryId > 0 && this.countryId == Model_player.voMine.country)
            return true;
        else
            return false;
    }

    /** 是否主角身处的城池 */
    public get isMyPosCity(): boolean {
        return GGlobal.modelQxzl.curCityId == this.id;
    }

    /** 是否主角正在驻守的城池 */
    public get isMyDefendCity(): boolean {
        return this.isMyPosCity && GGlobal.modelQxzl.isInCity == 1;
    }

    private _nearCityList: number[];
    public get nearCityList(): number[] {
        if (this._nearCityList === undefined) {
            let t_list = JSON.parse(this.cfg.behind);
            this._nearCityList = t_list[0];
        }
        return this._nearCityList;
    }

    /** 是否邻近主角位置 */
    public get isPosNear(): boolean {
        let t_posCityVo = GGlobal.modelQxzl.getCityVoById(GGlobal.modelQxzl.curCityId);
        if (t_posCityVo) {
            if (t_posCityVo.nearCityList.indexOf(this.id) > -1)
                return true;
            else
                return false;
        }
        else
            return false;
    }

    /** 是否邻近所属国家 */
    public get isCountryNear(): boolean {
        if (this.isMyCountryCity)
            return false;
        let t_myCountryCitys = GGlobal.modelQxzl.myCountryCityList;
        for (let v of t_myCountryCitys) {
            let t_nearList = v.nearCityList;
            if (t_nearList.indexOf(this.id) > -1) {
                return true;
            }
        }
        return false;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}