var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 快捷接口集合
 * @author: lujiahao
 * @date: 2019-08-07 21:06:33
 */
var FastAPI = (function () {
    function FastAPI() {
    }
    /**
     * 获取系统常数表的值
     * @param pId X_004_系统常数表.xlsx 的id
     */
    FastAPI.getSystemValue = function (pId) {
        var t_cfg = Config.xtcs_004[pId];
        if (t_cfg.type == 1)
            return ~~t_cfg.num; //int
        else
            return t_cfg.other; //string
    };
    /**
     * 获取货币/物品的数量
     * @param pItemId
     */
    FastAPI.getItemCount = function (pItemId) {
        if (pItemId < 100)
            return Model_player.getCurrencyCount(pItemId);
        else
            return Model_Bag.getItemCount(pItemId);
    };
    /**
     * 是否货币
     * @param pItemId
     */
    FastAPI.isMoney = function (pItemId) {
        return pItemId < 100;
    };
    /**
     * 检查货币/物品是否足够
     * @param pItemId 货币id
     * @param pNeed 所需数量
     * @param pShowAlert 是否提示 默认false不提示
     */
    FastAPI.checkItemEnough = function (pItemId, pNeed, pShowAlert) {
        if (pShowAlert === void 0) { pShowAlert = false; }
        var t_has = 0;
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
            case Enum_Attr.yuanBao://元宝
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
                        var t_cfg = Config.daoju_204[pItemId];
                        if (t_cfg) {
                            var t_itemName = this.getItemName(pItemId, true);
                            ViewCommonWarn.text("\u7F3A\u5C11\u9053\u5177\uFF1A" + t_itemName);
                        }
                    }
                    return false;
                }
                break;
        }
        return true;
    };
    /**
     * 检查等级是否足够
     * @param pNeedLevel 所需等级
     * @param pShowAlertType 0不提示 1简单文本提示 默认为0
     */
    FastAPI.checkLevelEnough = function (pNeedLevel, pShowAlertType) {
        if (pShowAlertType === void 0) { pShowAlertType = 0; }
        var t_myLevel = Model_LunHui.realLv;
        if (t_myLevel >= pNeedLevel)
            return true;
        else {
            switch (pShowAlertType) {
                case 1://简单文本提示
                    //飘字提示
                    ViewCommonWarn.text("\u9700\u8981\u8FBE\u5230" + pNeedLevel + "\u7EA7");
                    break;
                //待扩展
                default://默认不弹提示
                    break;
            }
            return false;
        }
    };
    /**
     * 检查条件字段
     * @param pConditionStr "[[1,100],[2,200],[3,200]]" 诸如此类的字符串
     * @param pShowAlertType 0不提示 1简单文本提示 默认为0
     */
    FastAPI.checkCondition = function (pConditionStr, pShowAlertType) {
        if (pShowAlertType === void 0) { pShowAlertType = 0; }
        var t_result = true;
        var t_list = JSON.parse(pConditionStr);
        if (t_list && t_list.length > 0) {
            for (var i = 0; i < t_list.length; i++) {
                var t_key = ~~t_list[i][0];
                var t_value = ~~t_list[i][1];
                switch (t_key) {
                    case 1://关卡通关
                        if (GGlobal.modelGuanQia.curGuanQiaLv < t_value) {
                            if (pShowAlertType)
                                ViewCommonWarn.text("\u7B2C" + t_value + "\u5173\u5F00\u542F");
                            return false;
                        }
                        break;
                    case 2://通关等级
                        if (Model_player.voMine.zsID < t_value) {
                            if (pShowAlertType) {
                                var t_str = Config.zhuansheng_705[t_value].lv;
                                ViewCommonWarn.text(t_str + "\u5F00\u542F");
                            }
                            return false;
                        }
                        break;
                    case 3://玩家等级
                        if (Model_LunHui.realLv < t_value) {
                            if (pShowAlertType)
                                ViewCommonWarn.text("\u9700\u8981\u8FBE\u5230" + t_value + "\u7EA7");
                            return false;
                        }
                        break;
                }
            }
        }
        return t_result;
    };
    /**
     * 显示格子tips
     * @param pVo 物品数据
     * @param pSource 物品来源
     */
    FastAPI.showItemTips = function (pVo, pSource) {
        if (pSource === void 0) { pSource = 0; }
        if (!pVo)
            return;
        var t_itemVo = null;
        if (typeof pVo == "number") {
            t_itemVo = VoItem.create(pVo);
        }
        else {
            t_itemVo = pVo;
        }
        if (t_itemVo.gType == Enum_Attr.EQUIP) {
            if (pSource == ViewGrid.ROLE) {
                GGlobal.layerMgr.open(UIConst.TIP_ROLE_EQUIP, t_itemVo); //身上装备
            }
            else if (pSource == ViewGrid.BAG) {
                GGlobal.layerMgr.open(UIConst.TIP_EQUIP, t_itemVo);
            }
            else {
                GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, t_itemVo);
            }
        }
        else if (t_itemVo.gType == Enum_Attr.ITEM) {
            if (t_itemVo.canUse) {
                if (t_itemVo.cfg.tips == 1) {
                    GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM_USE_WUJ, [t_itemVo, pSource]);
                }
                else if (t_itemVo.cfg.tips == 2) {
                    GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM_USE_SYS, [t_itemVo, pSource]);
                }
                else {
                    if (pSource == ViewGrid.BAG) {
                        if (t_itemVo.useType == 2) {
                            GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM_USE1, t_itemVo);
                        }
                        else if (t_itemVo.type == 3) {
                            GGlobal.layerMgr.open(UIConst.GIFTBAG_USE, t_itemVo);
                        }
                        else {
                            GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM_USE, t_itemVo);
                        }
                    }
                    else {
                        GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, t_itemVo);
                    }
                }
            }
            else {
                GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, t_itemVo);
            }
        }
        else {
            GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, t_itemVo);
        }
    };
    /**
     * 通过国家id获取国家的名称
     * @param pCountryId 国家id
     * @param pColor 是否带有颜色 默认false
     */
    FastAPI.getCountryName = function (pCountryId, pColor) {
        if (pColor === void 0) { pColor = false; }
        var t_strName = Model_Country.getCountryName(pCountryId);
        if (pColor) {
            return HtmlUtil.font(t_strName, this.getColorByCountry(pCountryId));
        }
        else {
            return t_strName;
        }
    };
    /**
     * 通过国家id获取颜色
     * @param pCountryId
     */
    FastAPI.getColorByCountry = function (pCountryId) {
        if (this._countryColorMap === undefined) {
            this._countryColorMap = {
                1: Color.BLUESTR,
                2: Color.REDSTR,
                3: Color.GREENSTR
            };
        }
        return this._countryColorMap[pCountryId];
    };
    /**
     * 检查物品消耗是否足够
     * @param pItemId 物品id
     * @param pNeed 需求数量
     */
    FastAPI.checkCousumeEnough = function (pItemId, pNeed) {
        var t_bagCount = Model_Bag.getItemCount(pItemId);
        if (t_bagCount >= pNeed)
            return true;
        else
            return false;
    };
    /**
     * 获取物品名称
     * @param pItemId 物品id
     * @param pWithColor 是否带颜色，默认不带颜色
     */
    FastAPI.getItemName = function (pItemId, pWithColor) {
        if (pWithColor === void 0) { pWithColor = false; }
        var t_cfg = Config.daoju_204[pItemId];
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
    };
    return FastAPI;
}());
__reflect(FastAPI.prototype, "FastAPI");
