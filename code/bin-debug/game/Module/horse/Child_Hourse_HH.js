var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 坐骑幻化界面
 * @author: lujiahao
 * @date: 2020-03-24 17:34:11
 */
var Child_Hourse_HH = (function (_super) {
    __extends(Child_Hourse_HH, _super);
    function Child_Hourse_HH() {
        var _this = _super.call(this) || this;
        _this._dataList = [];
        _this._openFlag = false;
        _this._modelRes = null;
        return _this;
    }
    Child_Hourse_HH.createInstance = function () {
        return (fairygui.UIPackage.createObject("horse", "Child_Hourse_HH"));
    };
    Child_Hourse_HH.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.listHorse.itemRenderer = t.onHorseItemRender;
        t.listHorse.callbackThisObj = t;
        t.listHorse.setVirtual();
        t.listCondition.itemRenderer = t.onCoditionItemRender;
        t.listCondition.callbackThisObj = t;
        // t.listCondition.setVirtual();
    };
    Child_Hourse_HH.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_Hourse_HH.prototype.openPanel = function (pData) {
        var t = this;
        var t_model = GGlobal.model_Horse;
        t.registerEvent(true);
        t.refreshData();
        var t_seletcedIndex = 0;
        if (!t._openFlag) {
            t_model.CG_Mount_openMountUnrealUI_11029();
            t.listHorse.scrollToView(t_seletcedIndex);
        }
        else {
            if (t._curVo && t._dataList) {
                for (var i = 0; i < t._dataList.length; i++) {
                    if (t._curVo.id == t._dataList[i].id) {
                        t_seletcedIndex = i;
                        break;
                    }
                }
            }
        }
        t.horseCtrl.selectedIndex = -1;
        t.horseCtrl.selectedIndex = t_seletcedIndex;
        IconUtil.setImg(t.loaderBg, Enum_Path.BACK_URL + "horseHH_bg.jpg");
        t._openFlag = true;
    };
    Child_Hourse_HH.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        t._curVo = null;
        t._dataList = null;
        t._curConditionList = null;
        t.listHorse.numItems = 0;
        t.listCondition.numItems = 0;
        t.showModel(false);
        IconUtil.setImg(t.loaderBg, null);
        t._openFlag = false;
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    Child_Hourse_HH.prototype.onHorseItemRender = function (pIndex, pItem) {
        var t = this;
        pItem.setData(t._dataList[pIndex]);
    };
    Child_Hourse_HH.prototype.onCoditionItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._curVo && t._curConditionList) {
            pItem.setData(t._curConditionList[pIndex]);
        }
    };
    Child_Hourse_HH.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.model_Horse;
        t._dataList = t_model.getHorseListByType(EnumHorse.TYPE_HH).concat();
        t._dataList.sort(function (pA, pB) {
            var t_vA = t.getSortValue(pA);
            var t_vB = t.getSortValue(pB);
            if (t_vA == t_vB) {
                return pA.id - pB.id;
            }
            else {
                return t_vB - t_vA;
            }
        });
        t.listHorse.numItems = t._dataList.length;
        t.listHorse.ensureSizeCorrect();
        t.listHorse.ensureBoundsCorrect();
        t.horseCtrl.clearPages();
        for (var _i = 0, _a = t._dataList; _i < _a.length; _i++) {
            var v = _a[_i];
            t.horseCtrl.addPage();
        }
    };
    Child_Hourse_HH.prototype.getSortValue = function (pVo) {
        /**
         * ◆骑乘中坐骑置顶
◆可激活＞已激活＞未激活
可激活坐骑按品质从高到低排
已激活坐骑按品质从高到低排
未激活坐骑按品质从低到高排
◆同条件坐骑按id从低到高排
◆未激活坐骑头像变灰
         */
        var t_value = 0;
        var t_model = GGlobal.model_Horse;
        if (pVo.id == t_model.rideId) {
            t_value += 100000000;
        }
        else {
            if (pVo.isAct) {
                //已激活
                t_value += 1000000;
                t_value += pVo.quality * 10;
            }
            else {
                //未激活
                if (pVo.checkCanAct(false)) {
                    //可激活
                    t_value += 10000000;
                    t_value += pVo.quality * 10;
                }
                else {
                    t_value -= pVo.quality * 10;
                }
            }
        }
        return t_value;
    };
    Child_Hourse_HH.prototype.refreshSelect = function () {
        var t = this;
        var t_model = GGlobal.model_Horse;
        if (t._curVo) {
            t.tfEffect.text = "\u79FB\u52A8\u901F\u5EA6+" + t._curVo.speed;
            t.btnRide.visible = false;
            t.groupRideNeed.visible = false;
            if (t._curVo.isAct) {
                //已激活
                var t_nextCfg = t._curVo.nextCfgHH;
                if (t_nextCfg) {
                    //未满级
                    t.stateCtrl.selectedIndex = 1;
                    if (t._curVo.cfgHH.next % 10 == 0) {
                        t.btnUp.title = "升阶";
                        t.tfConditon.text = "升阶条件";
                    }
                    else {
                        t.btnUp.title = "升级";
                        t.tfConditon.text = "升级条件";
                    }
                    t.btnUp.enabled = true;
                    t.tfCurAttr.text = ConfigHelp.attrString(t._curVo.cfgHH.attr, "+");
                    t.tfNextAttr.text = ConfigHelp.attrString(t._curVo.nextCfgHH.attr, "+", null, "#15f234");
                    t.refreshConsume();
                }
                else {
                    //已满级
                    t.stateCtrl.selectedIndex = 2;
                    t.btnUp.title = "已升满";
                    t.btnUp.enabled = false;
                    t.tfConditon.text = "已升满";
                    t.tfMaxAttr.text = ConfigHelp.attrString(t._curVo.cfgHH.attr, "+", null, "#15f234");
                }
                t.btnRide.visible = t._curVo.checkCanRide();
                t.btnRide.selected = t._curVo.id == t_model.rideId;
            }
            else {
                //未激活
                t.stateCtrl.selectedIndex = 0;
                t.tfMaxAttr.text = ConfigHelp.attrString(t._curVo.cfgHH.attr, "+", null, "#15f234");
                t.btnUp.title = "激活";
                t.btnUp.enabled = true;
                t.btnRide.visible = false;
                t.tfConditon.text = "激活条件";
            }
            t.groupRideNeed.visible = !t.btnRide.visible;
            var t_needJie = ~~(t._curVo.cfg.tiaojian % 1000 / 10);
            t.tfRideNeed.text = t_needJie + "\u9636\u53EF\u9A91\u4E58";
            t._curConditionList = t._curVo.hhConditionList;
            t.listCondition.numItems = t._curConditionList.length;
            if (t._curVo.isAct)
                t.tfPower.title = t._curVo.cfgHH.power + "";
            else
                t.tfPower.title = 0 + "";
            t.comJieji.title = t._curVo.jiejiStr;
            t.showModel(true);
        }
        else {
        }
        SimpleTimer.ins().addTimer(t.delayCheckReddot, t, 50, 1);
    };
    Child_Hourse_HH.prototype.refreshConsume = function () {
        var t = this;
        if (t._curVo && t._curVo.isAct && t._curVo.nextCfgHH) {
            var t_list = ConfigHelp.makeItemListArr(t._curVo.cfgHH.consume);
            var t_itemId = t_list[0].id;
            t.tfConsume.text = FastAPI.getItemName(t_itemId, true);
            var t_bagCount = FastAPI.getItemCount(t_itemId);
            var t_need = t_list[0].count;
            t.resCom.setItemId(t_itemId);
            var t_color = Color.GREENSTR;
            if (t_need > t_bagCount)
                t_color = Color.REDSTR;
            t.resCom.setCount(HtmlUtil.font(ConfigHelp.getYiWanText(t_bagCount) + "/" + t_need, t_color));
        }
    };
    Child_Hourse_HH.prototype.showModel = function (pFlag, pRemove) {
        if (pRemove === void 0) { pRemove = true; }
        var t = this;
        if (pFlag && t._curVo) {
            var t_res = "body/" + t._curVo.cfg.model + "/ride_st/ani";
            if (t._modelRes == t_res)
                return;
            if (pRemove) {
                t.showModel(false);
            }
            if (!t.awatar) {
                t.awatar = EffectMgr.addEff(t_res, t.modelIcon.displayObject, t.modelIcon.width / 2, t.modelIcon.height, 1000, -1, true);
                t._modelRes = t_res;
            }
        }
        else {
            if (t.awatar) {
                EffectMgr.instance.removeEff(t.awatar);
                t.awatar = null;
                t._modelRes = null;
            }
        }
    };
    Child_Hourse_HH.prototype.showReddot = function () {
        var t = this;
        if (t._curVo) {
            t.btnUp.noticeImg.visible = t._curVo.checkUpConditionHH(false) && t._curVo.checkConsumeHH(false);
            t.listHorse.refreshVirtualList();
        }
        else
            t.btnUp.noticeImg.visible = false;
    };
    Child_Hourse_HH.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.HORSE_HH_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.HORSE_HH_UPGRADE_CHANGE, t.onUpgradeChange, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        EventUtil.register(pFlag, t.horseCtrl, fairygui.StateChangeEvent.CHANGED, t.onHorseSelect, t);
        EventUtil.register(pFlag, t.btnRide, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnShow, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    Child_Hourse_HH.prototype.onHorseSelect = function (e) {
        var t_seletcedIndex = e.currentTarget.selectedIndex;
        if (t_seletcedIndex < 0)
            return;
        var t = this;
        t._curVo = t._dataList[t_seletcedIndex];
        t.refreshSelect();
    };
    Child_Hourse_HH.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
        // t.horseCtrl.selectedIndex = -1;
        // t.horseCtrl.selectedIndex = 0;
    };
    Child_Hourse_HH.prototype.onUpgradeChange = function (pData) {
        var t = this;
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshSelect();
        }
        SimpleTimer.ins().addTimer(t.delayCheckReddot, t, 50, 1);
    };
    Child_Hourse_HH.prototype.delayCheckReddot = function () {
        var t = this;
        t.showReddot();
    };
    Child_Hourse_HH.prototype.onBagUpdate = function () {
        var t = this;
        t.refreshConsume();
        SimpleTimer.ins().addTimer(t.delayCheckReddot, t, 50, 1);
    };
    Child_Hourse_HH.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.model_Horse;
        if (!t._curVo)
            return;
        switch (e.currentTarget) {
            case t.btnRide:
                if (t._curVo.id == t_model.rideId)
                    t_model.CG_Mount_rideUnreal_11031(0);
                else
                    t_model.CG_Mount_rideUnreal_11031(t._curVo.id);
                break;
            case t.btnShow:
                t.show2Chat(t._curVo.id);
                break;
            case t.btnUp:
                if (t._curVo.isAct)
                    t_model.CG_Mount_upMountUnrealLv_11035(t._curVo.id);
                else
                    t_model.CG_Mount_activation_11033(t._curVo.id);
                break;
        }
    };
    Child_Hourse_HH.prototype.show2Chat = function (pId) {
        var t = this;
        var t_model = GGlobal.model_Horse;
        var t_vo = t_model.getHorseVoById(pId);
        if (t_vo) {
            GGlobal.modelchat.CG_CHAT_SHOW_DATA(18, pId);
        }
    };
    //>>>>end
    Child_Hourse_HH.URL = "ui://7shc3kzddwb4t";
    return Child_Hourse_HH;
}(fairygui.GComponent));
__reflect(Child_Hourse_HH.prototype, "Child_Hourse_HH", ["IPanel"]);
