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
 * 奇策升星面板
 * @author: lujiahao
 * @date: 2019-10-21 21:14:42
 */
var ChildStarQice = (function (_super) {
    __extends(ChildStarQice, _super);
    function ChildStarQice() {
        return _super.call(this) || this;
    }
    ChildStarQice.createInstance = function () {
        return (fairygui.UIPackage.createObject("qice", "ChildStarQice"));
    };
    ChildStarQice.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    ChildStarQice.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildStarQice.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelQice.CG_QiCe_openQiCe_9701();
        t.refreshData();
        t.itemCtrl.clearPages();
        for (var i = 0; i < t._dataList.length; i++) {
            t.itemCtrl.addPage();
        }
        var t_selectedIndex = 0;
        t.itemCtrl.selectedIndex = -1;
        if (pData) {
            var t_targetIndex = t.getIndexById(pData);
            if (t_targetIndex > -1)
                t_selectedIndex = t_targetIndex;
        }
        t.itemCtrl.selectedIndex = t_selectedIndex;
        t.list.scrollToView(0);
    };
    ChildStarQice.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        t._curVo = null;
        IconUtil.setImg(t.bwIcon, null);
    };
    //===================================== private method =====================================
    ChildStarQice.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(0, t._dataList[pIndex]);
        }
    };
    ChildStarQice.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelQice;
        var t_dataList = t_model.getVoList().concat();
        t._dataList = t_dataList;
        t._dataList.sort(function (pA, pB) {
            return pB.getSortVlaue(0) - pA.getSortVlaue(0);
        });
        if (t._curVo) {
            var t_index = t.getIndexById(t._curVo.id);
            if (t.itemCtrl.selectedIndex != t_index) {
                t.itemCtrl.setSelectedIndex(t_index);
                // t.list.scrollToView(t_index);
            }
        }
        // for (let v of t._dataList) {
        //     console.log("===========", v.id, v.cfg.name, v.getSortVlaue(0));
        // }
        if (t_dataList) {
            t.list.numItems = t_dataList.length;
        }
        else {
            t.list.numItems = 0;
        }
    };
    ChildStarQice.prototype.refreshDataByIndex = function (pIndex) {
        var t = this;
        if (!t._dataList)
            return;
        if (pIndex < 0)
            return;
        t._curVo = t._dataList[pIndex];
        if (t._curVo) {
            t.nameCom.title = HtmlUtil.font(t._curVo.cfg.name, Color.getColorStr(t._curVo.cfg.pz));
            var t_model = GGlobal.modelQice;
            if (!t._curVo.isActive)
                t.maxCtrl.selectedIndex = 2;
            else if (t._curVo.isStarMax)
                t.maxCtrl.selectedIndex = 1;
            else
                t.maxCtrl.selectedIndex = 0;
            if (t._curVo.isActive) {
                //已激活
                t.powerCom.title = t._curVo.curStarCfg.cfg.power + "";
                t.btnShow.visible = true;
                var t_bhMax = t._curVo.bhMax;
                var t_jhMax = t._curVo.jhMax;
                t.btnUp.title = "升星";
            }
            else {
                //未激活
                t.powerCom.title = 0 + "";
                t.btnShow.visible = false;
                t_bhMax = t._curVo.cfg.max1;
                t_jhMax = t._curVo.cfg.max2;
                t.btnUp.title = "激活";
            }
            //显示属性
            if (t._curVo.curStarCfg) {
                t.tfProCur.text = ConfigHelp.attrString(JSON.parse(t._curVo.curStarCfg.cfg.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
            }
            else {
                t.tfProCur.text = ConfigHelp.attrString(JSON.parse(t._curVo.nextStarCfg.cfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            }
            if (t._curVo.nextStarCfg) {
                t.tfProNext.text = ConfigHelp.attrString(JSON.parse(t._curVo.nextStarCfg.cfg.attr), "+", Color.getColorStr(2), Color.getColorStr(2));
            }
            if (t._curVo.isStarMax) {
                t.tfPowerUp.text = t._curVo.curStarCfg.cfg.power + "";
            }
            else {
                var t_addValue = 0;
                if (t._curVo.curStarCfg)
                    t_addValue = t._curVo.nextStarCfg.cfg.power - t._curVo.curStarCfg.cfg.power;
                else
                    t_addValue = t._curVo.nextStarCfg.cfg.power;
                t.tfPowerUp.text = t_addValue + "";
            }
            t.groupBh.visible = false;
            t.groupJh.visible = false;
            var t_effStr = "";
            if (t._curVo.hasBh) {
                t_effStr += ConfigHelp.reTxt("可提升百万兵魂吞噬上限：<font color='#FFC344'>{0}</font>", t_bhMax);
                t.groupBh.visible = true;
            }
            if (t._curVo.hasJh) {
                t_effStr += ConfigHelp.reTxt("\n可提升千古将魂吞噬上限：<font color='#FFC344'>{0}</font>", t_jhMax);
                t.groupJh.visible = true;
            }
            t.tfEffect.text = t_effStr;
            t.tfBH.text = t._curVo.bHun + "/" + t_bhMax;
            t.tfJH.text = t._curVo.jHun + "/" + t_jhMax;
            t.starCom.text = ConfigHelp.getStarFontStr(t._curVo.star);
            IconUtil.setImg(t.bwIcon, Enum_Path.PIC_URL + t._curVo.cfg.pic + ".png");
            t.btnSuit.noticeImg.visible = t_model.checkSuitCanUp(false);
        }
        t.showConsume();
    };
    ChildStarQice.prototype.showConsume = function () {
        var t = this;
        if (t._curVo) {
            var t_str = "消耗：";
            var t_list = t._curVo.consumeList;
            for (var i = 0; i < t_list.length; i++) {
                var t_item = t_list[i];
                var t_bagCount = Model_Bag.getItemCount(t_item.id);
                var t_color = Color.REDSTR;
                if (t_bagCount >= t_item.count) {
                    t_color = Color.GREENSTR;
                }
                var t_conStr = FastAPI.getItemName(t_item.id, true) + "×" + t_item.count +
                    HtmlUtil.font("\uFF08" + t_bagCount + "/" + t_item.count + "\uFF09", t_color);
                if (i > 0) {
                    t_conStr = "，" + t_conStr;
                }
                t_str += t_conStr;
            }
            t.tfCost.text = t_str;
            t.btnBh.noticeImg.visible = t._curVo.checkHunCanUp(EnumQice.HUN_TYPE_BH, false);
            t.btnJh.noticeImg.visible = t._curVo.checkHunCanUp(EnumQice.HUN_TYPE_JH, false);
            t.btnUp.noticeImg.visible = t._curVo.checkCanStarUp(false);
        }
        else {
            t.tfCost.text = "";
        }
    };
    ChildStarQice.prototype.getIndexById = function (pId) {
        var t = this;
        if (t._dataList) {
            for (var i = 0; i < t._dataList.length; i++) {
                var t_vo = t._dataList[i];
                if (t_vo && t_vo.id == pId) {
                    return i;
                }
            }
        }
        return -1;
    };
    ChildStarQice.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_INFO_UPDATE, t.onInfoUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_STAR_UP, t.onStarUp, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_HUN_CHANGE, t.onHunChange, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_SUIT_UPDATE, t.onSuitUpdate, t);
        EventUtil.register(pFlag, t.itemCtrl, fairygui.StateChangeEvent.CHANGED, t.onItemClick, t);
        EventUtil.register(pFlag, t.btnBh, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnJh, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnSuit, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnShow, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildStarQice.prototype.onStarUp = function (pData) {
        var t = this;
        t.refreshData();
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshDataByIndex(t.getIndexById(pData.id));
        }
    };
    ChildStarQice.prototype.onHunChange = function (pData) {
        var t = this;
        t.refreshData();
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshDataByIndex(t.getIndexById(pData.id));
        }
    };
    ChildStarQice.prototype.onSuitUpdate = function () {
        var t = this;
        t.refreshData();
        if (t._curVo) {
            t.refreshDataByIndex(t.getIndexById(t._curVo.id));
        }
    };
    ChildStarQice.prototype.onInfoUpdate = function () {
        var t = this;
        t.refreshData();
        t.refreshDataByIndex(t.itemCtrl.selectedIndex);
    };
    ChildStarQice.prototype.onBagUpdate = function () {
        var t = this;
        t.showConsume();
        t.refreshData();
    };
    ChildStarQice.prototype.onItemClick = function (e) {
        var t = this;
        if (t.itemCtrl.selectedIndex < -1)
            return;
        t.refreshDataByIndex(t.itemCtrl.selectedIndex);
    };
    ChildStarQice.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnBh:
                if (t._curVo) {
                    GGlobal.layerMgr.open(UIConst.QICE_HUN, { id: t._curVo.id, hunType: EnumQice.HUN_TYPE_BH });
                }
                break;
            case t.btnJh:
                if (t._curVo) {
                    GGlobal.layerMgr.open(UIConst.QICE_HUN, { id: t._curVo.id, hunType: EnumQice.HUN_TYPE_JH });
                }
                break;
            case t.btnSuit:
                GGlobal.layerMgr.open(UIConst.QICE_SUIT);
                break;
            case t.btnShow:
                if (t._curVo)
                    GGlobal.modelchat.CG_CHAT_SHOW_DATA(15, t._curVo.id);
                break;
            case t.btnUp:
                if (t._curVo) {
                    GGlobal.modelQice.CG_QiCe_upQiCe_9703(t._curVo.id);
                }
                break;
        }
    };
    //>>>>end
    ChildStarQice.URL = "ui://cokk050nj82l2";
    return ChildStarQice;
}(fairygui.GComponent));
__reflect(ChildStarQice.prototype, "ChildStarQice", ["IPanel"]);
