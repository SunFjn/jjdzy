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
 * 奇策升级界面
 * @author: lujiahao
 * @date: 2019-10-24 13:46:17
 */
var ChildLevelQice = (function (_super) {
    __extends(ChildLevelQice, _super);
    function ChildLevelQice() {
        return _super.call(this) || this;
    }
    ChildLevelQice.createInstance = function () {
        return (fairygui.UIPackage.createObject("qice", "ChildLevelQice"));
    };
    ChildLevelQice.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
        t.resCom.setType(0);
    };
    ChildLevelQice.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildLevelQice.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelQice.CG_QiCe_openQiCe_9701();
        t.refreshData();
        t.itemCtrl.clearPages();
        for (var i = 0; i < t._dataList.length; i++) {
            t.itemCtrl.addPage();
        }
        t.itemCtrl.selectedIndex = -1;
        t.itemCtrl.selectedIndex = 0;
        t.list.scrollToView(0);
    };
    ChildLevelQice.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        t._curVo = null;
        IconUtil.setImg(t.bwIcon, null);
    };
    //===================================== private method =====================================
    ChildLevelQice.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(1, t._dataList[pIndex]);
        }
    };
    ChildLevelQice.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelQice;
        var t_dataList = t_model.getVoList().concat();
        t._dataList = t_dataList;
        t._dataList.sort(function (pA, pB) {
            return pB.getSortVlaue(1) - pA.getSortVlaue(1);
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
    ChildLevelQice.prototype.refreshDataByIndex = function (pIndex) {
        var t = this;
        if (!t._dataList)
            return;
        if (pIndex < 0)
            return;
        t._curVo = t._dataList[pIndex];
        if (t._curVo) {
            var t_name = HtmlUtil.font(t._curVo.cfg.name, Color.getColorStr(t._curVo.cfg.pz));
            t.nameCom.title = t_name;
            t.tfJie.text = t._curVo.levelJie + "";
            t.tfJi.text = t._curVo.levelJi + "";
            if (t._curVo.isLevelMax)
                t.maxCtrl.selectedIndex = 1;
            else
                t.maxCtrl.selectedIndex = 0;
            t.btnShow.visible = false;
            if (t._curVo.curLevelCfg) {
                t.powerCom.title = t._curVo.curLevelCfg.cfg.zl + "";
            }
            else {
                t.powerCom.title = 0 + "";
            }
            if (t._curVo.nextLevelCfg) {
                var t_addValue = 0;
                if (t._curVo.curLevelCfg)
                    t_addValue = t._curVo.nextLevelCfg.cfg.zl - t._curVo.curLevelCfg.cfg.zl;
                else
                    t_addValue = t._curVo.nextLevelCfg.cfg.zl;
                t.tfPowerUp.text = t_addValue + "";
            }
            else {
            }
            //显示属性
            if (t._curVo.curLevelCfg) {
                t.tfProCur.text = ConfigHelp.attrString(JSON.parse(t._curVo.curLevelCfg.cfg.sx), "+", Color.getColorStr(1), Color.getColorStr(1));
            }
            if (t._curVo.nextLevelCfg) {
                t.tfProNext.text = ConfigHelp.attrString(JSON.parse(t._curVo.nextLevelCfg.cfg.sx), "+", Color.getColorStr(2), Color.getColorStr(2));
            }
            IconUtil.setImg(t.bwIcon, Enum_Path.PIC_URL + t._curVo.cfg.pic + ".png");
            //升级需求
            if (t._curVo.curLevelCfg) {
                t.tfCost.text = ConfigHelp.reTxt("需要{0}达到{1}星", t_name, t._curVo.curLevelCfg.cfg.tj);
            }
            else {
                t.tfCost.text = "";
            }
        }
        t.showConsume();
    };
    ChildLevelQice.prototype.showConsume = function () {
        var t = this;
        if (t._curVo) {
            if (t._curVo.curLevelCfg && !t._curVo.isLevelMax) {
                var t_list = t._curVo.curLevelCfg.consumeList;
                t.resCom.setItemId(t_list[0].id);
                var t_bagCount = Model_Bag.getItemCount(t_list[0].id);
                t.resCom.setLb(t_bagCount, t_list[0].count);
                t.tfConsumeName.text = FastAPI.getItemName(t_list[0].id, true);
            }
            t.btnUp.noticeImg.visible = t._curVo.checkCanLevelUp(false);
        }
        else {
        }
    };
    ChildLevelQice.prototype.getIndexById = function (pId) {
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
    ChildLevelQice.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_LEVEL_UP, t.onLevelUp, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_STAR_UP, t.onStarUp, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_INFO_UPDATE, t.onInfoUpdate, t);
        EventUtil.register(pFlag, t.itemCtrl, fairygui.StateChangeEvent.CHANGED, t.onItemClick, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildLevelQice.prototype.onLevelUp = function (pData) {
        var t = this;
        t.refreshData();
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshDataByIndex(t.getIndexById(pData.id));
        }
    };
    ChildLevelQice.prototype.onStarUp = function (pData) {
        var t = this;
        t.refreshData();
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshDataByIndex(t.getIndexById(pData.id));
        }
    };
    ChildLevelQice.prototype.onInfoUpdate = function () {
        var t = this;
        t.refreshData();
        t.refreshDataByIndex(t.itemCtrl.selectedIndex);
    };
    ChildLevelQice.prototype.onItemClick = function (e) {
        var t = this;
        if (t.itemCtrl.selectedIndex < -1)
            return;
        t.refreshDataByIndex(t.itemCtrl.selectedIndex);
    };
    ChildLevelQice.prototype.onBagUpdate = function () {
        var t = this;
        t.showConsume();
        t.refreshData();
    };
    ChildLevelQice.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                if (t._curVo) {
                    GGlobal.modelQice.CG_QiCe_upQiCeJie_9709(t._curVo.id);
                }
                break;
        }
    };
    //>>>>end
    ChildLevelQice.URL = "ui://cokk050nb5khf";
    return ChildLevelQice;
}(fairygui.GComponent));
__reflect(ChildLevelQice.prototype, "ChildLevelQice", ["IPanel"]);
