/**
 * 快捷接口集合
 * @author: lujiahao 
 * @date: 2019-08-07 21:06:33 
 */
class FastAPI {
    constructor() {
    }

    /**
     * 获取系统常数表的值
     * @param pId X_004_系统常数表.xlsx 的id
     */
    public static getSystemValue(pId: number): any {
        let t_cfg = Config.xtcs_004[pId];
        if (t_cfg.type == 1)
            return ~~t_cfg.num; //int
        else
            return t_cfg.other; //string
    }

    /**
     * 获取货币/物品的数量
     * @param pItemId 
     */
    public static getItemCount(pItemId: number): number {
        if (pItemId < 100)
            return Model_player.getCurrencyCount(pItemId);
        else
            return Model_Bag.getItemCount(pItemId);
    }

    /**
     * 是否货币
     * @param pItemId 
     */
    public static isMoney(pItemId: number): boolean {
        return pItemId < 100;
    }

    /**
     * 检查货币/物品是否足够
     * @param pItemId 货币id
     * @param pNeed 所需数量
     * @param pShowAlert 是否提示 默认false不提示
     */
    public static checkItemEnough(pItemId: number, pNeed: number, pShowAlert = false): boolean {
        let t_has = 0;
        if (pItemId < 100) {
            //货币
            t_has = Model_player.getCurrencyCount(pItemId);
        }
        else {
            //道具
            t_has = Model_Bag.getItemCount(pItemId);
        }
        if (t_has < 0)
            return false;
        switch (pItemId) {
            case Enum_Attr.yuanBao: //元宝
                t_has = Model_player.voMine.yuanbao;
                if (t_has < pNeed) {
                    if (pShowAlert) {
                        ModelChongZhi.guideToRecharge();
                    }
                    return false;
                }
                break;
            default:
                if (t_has < pNeed) {
                    if (pShowAlert) {
                        let t_cfg = Config.daoju_204[pItemId];
                        if (t_cfg) {
                            let t_itemName = this.getItemName(pItemId, true);
                            ViewCommonWarn.text(`缺少道具：${t_itemName}`);
                        }
                    }
                    return false;
                }
                break;
        }
        return true;
    }

    /**
	 * 检查等级是否足够
     * @param pNeedLevel 所需等级
     * @param pShowAlertType 0不提示 1简单文本提示 默认为0
     */
    public static checkLevelEnough(pNeedLevel: number, pShowAlertType: number = 0): boolean {
        let t_myLevel = Model_LunHui.realLv;
        if (t_myLevel >= pNeedLevel)
            return true;
        else {
            switch (pShowAlertType) {
                case 1: //简单文本提示
                    //飘字提示
                    ViewCommonWarn.text(`需要达到${pNeedLevel}级`);
                    break;
                //待扩展

                default: //默认不弹提示
                    break;
            }
            return false;
        }
    }

    /**
     * 检查条件字段
     * @param pConditionStr "[[1,100],[2,200],[3,200]]" 诸如此类的字符串
     * @param pShowAlertType 0不提示 1简单文本提示 默认为0
     */
    public static checkCondition(pConditionStr: string, pShowAlertType: number = 0): boolean {
        let t_result = true;
        let t_list: string[][] = JSON.parse(pConditionStr);
        if (t_list && t_list.length > 0) {
            for (let i = 0; i < t_list.length; i++) {
                let t_key = ~~t_list[i][0];
                let t_value = ~~t_list[i][1];
                switch (t_key) {
                    case 1: //关卡通关
                        if (GGlobal.modelGuanQia.curGuanQiaLv < t_value) {
                            if (pShowAlertType)
                                ViewCommonWarn.text(`第${t_value}关开启`);
                            return false;
                        }
                        break;
                    case 2: //通关等级
                        if (Model_player.voMine.zsID < t_value) {
                            if (pShowAlertType) {
                                let t_str = Config.zhuansheng_705[t_value].lv;
                                ViewCommonWarn.text(`${t_str}开启`);
                            }
                            return false;
                        }
                        break;
                    case 3: //玩家等级
                        if (Model_LunHui.realLv < t_value) {
                            if (pShowAlertType)
                                ViewCommonWarn.text(`需要达到${t_value}级`);
                            return false;
                        }
                        break;
                }
            }
        }
        return t_result;
    }

    /**
     * 显示格子tips
     * @param pVo 物品数据
     * @param pSource 物品来源
     */
    public static showItemTips(pVo: IGridImpl | number, pSource: number = 0) {
        if (!pVo)
            return;
        let t_itemVo: IGridImpl = null;
        if (typeof pVo == "number") {
            t_itemVo = VoItem.create(pVo);
        }
        else {
            t_itemVo = pVo;
        }
        if (t_itemVo.gType == Enum_Attr.EQUIP) {//装备
            if (pSource == ViewGrid.ROLE) {
                GGlobal.layerMgr.open(UIConst.TIP_ROLE_EQUIP, t_itemVo)//身上装备
            }
            else if (pSource == ViewGrid.BAG) {
                GGlobal.layerMgr.open(UIConst.TIP_EQUIP, t_itemVo)
            }
            else {
                GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, t_itemVo)
            }
        } else if (t_itemVo.gType == Enum_Attr.ITEM) {
            if ((t_itemVo as VoItem).canUse) {
                if ((t_itemVo as VoItem).cfg.tips == 1) {//武将
                    GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM_USE_WUJ, [t_itemVo, pSource])
                } else if ((t_itemVo as VoItem).cfg.tips == 2) {//7系统
                    GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM_USE_SYS, [t_itemVo, pSource])
                } else {
                    if (pSource == ViewGrid.BAG) {
                        if ((t_itemVo as VoItem).useType == 2) {
                            GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM_USE1, t_itemVo)
                        } else if ((t_itemVo as VoItem).type == 3) {
                            GGlobal.layerMgr.open(UIConst.GIFTBAG_USE, t_itemVo)
                        } else {
                            GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM_USE, t_itemVo)
                        }
                    } else {
                        GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, t_itemVo)
                    }
                }
            } else {
                GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, t_itemVo)
            }
        } else {
            GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, t_itemVo)
        }
    }

    /**
     * 通过国家id获取国家的名称
     * @param pCountryId 国家id
     * @param pColor 是否带有颜色 默认false
     */
    public static getCountryName(pCountryId: number, pColor: boolean = false): string {
        let t_strName = Model_Country.getCountryName(pCountryId);
        if (pColor) {
            return HtmlUtil.font(t_strName, this.getColorByCountry(pCountryId));
        }
        else {
            return t_strName;
        }
    }

    private static _countryColorMap: { [countryId: number]: string };
    /**
     * 通过国家id获取颜色
     * @param pCountryId 
     */
    public static getColorByCountry(pCountryId: number) {
        if (this._countryColorMap === undefined) {
            this._countryColorMap = {
                1: Color.BLUESTR,
                2: Color.REDSTR,
                3: Color.GREENSTR
            };
        }
        return this._countryColorMap[pCountryId];
    }

    /**
     * 检查物品消耗是否足够
     * @param pItemId 物品id
     * @param pNeed 需求数量
     */
    public static checkCousumeEnough(pItemId: number, pNeed: number): boolean {
        let t_bagCount = Model_Bag.getItemCount(pItemId);
        if (t_bagCount >= pNeed)
            return true;
        else
            return false;
    }

    /**
     * 获取物品名称
     * @param pItemId 物品id
     * @param pWithColor 是否带颜色，默认不带颜色
     */
    public static getItemName(pItemId: number, pWithColor: boolean = false): string {
        let t_cfg = Config.daoju_204[pItemId];
        if (t_cfg) {
            if (pWithColor) {
                return HtmlUtil.font(t_cfg.name, Color.getColorStr(t_cfg.quality));
            }
            else {
                return t_cfg.name;
            }
        }
        else
            return "";
    }
}