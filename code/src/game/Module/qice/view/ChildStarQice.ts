/**
 * 奇策升星面板
 * @author: lujiahao 
 * @date: 2019-10-21 21:14:42 
 */
class ChildStarQice extends fairygui.GComponent implements IPanel {

    //>>>>start
    public maxCtrl: fairygui.Controller;
    public itemCtrl: fairygui.Controller;
    public img: fairygui.GImage;
    public starCom: fairygui.GTextField;
    public nameCom: fairygui.GLabel;
    public boxMax: fairygui.GImage;
    public btnUp: Button4;
    public tfCost: fairygui.GRichTextField;
    public powerCom: fairygui.GLabel;
    public btnSuit: Button2;
    public tfPowerUp: fairygui.GTextField;
    public groupPowerUp: fairygui.GGroup;
    public tfEffect: fairygui.GRichTextField;
    public tfProCur: fairygui.GRichTextField;
    public tfProNext: fairygui.GRichTextField;
    public imgArrow: fairygui.GImage;
    public list: fairygui.GList;
    public bwIcon: fairygui.GLoader;
    public btnShow: Button2;
    public btnJh: Button2;
    public tfJH: fairygui.GRichTextField;
    public groupJh: fairygui.GGroup;
    public btnBh: Button2;
    public tfBH: fairygui.GRichTextField;
    public groupBh: fairygui.GGroup;
    public t0: fairygui.Transition;
    //>>>>end

    public static URL: string = "ui://cokk050nj82l2";

    private _dataList: VoQice[];
    private _curVo: VoQice;

    public static createInstance(): ChildStarQice {
        return <ChildStarQice><any>(fairygui.UIPackage.createObject("qice", "ChildStarQice"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    }

    //=========================================== API ==========================================
    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelQice.CG_QiCe_openQiCe_9701();

        t.refreshData();

        t.itemCtrl.clearPages();
        for (let i = 0; i < t._dataList.length; i++) {
            t.itemCtrl.addPage();
        }

        let t_selectedIndex = 0;
        t.itemCtrl.selectedIndex = -1;
        if (pData) {
            let t_targetIndex = t.getIndexById(pData);
            if (t_targetIndex > -1)
                t_selectedIndex = t_targetIndex;
        }
        t.itemCtrl.selectedIndex = t_selectedIndex;

        t.list.scrollToView(0);
    }

    closePanel(pData?: any) {
        let t = this;
        t.registerEvent(false);
        t._curVo = null;
        IconUtil.setImg(t.bwIcon, null);
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: QiceItemGrid) {
        let t = this;
        if (t._dataList) {
            pItem.setData(0, t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelQice;
        let t_dataList = t_model.getVoList().concat();
        t._dataList = t_dataList;
        t._dataList.sort((pA, pB) => {
            return pB.getSortVlaue(0) - pA.getSortVlaue(0);
        });

        if (t._curVo) {
            let t_index = t.getIndexById(t._curVo.id);
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
    }

    private refreshDataByIndex(pIndex: number) {
        let t = this;
        if (!t._dataList)
            return;
        if (pIndex < 0)
            return;
        t._curVo = t._dataList[pIndex];
        if (t._curVo) {
            t.nameCom.title = HtmlUtil.font(t._curVo.cfg.name, Color.getColorStr(t._curVo.cfg.pz));
            let t_model = GGlobal.modelQice;

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
                let t_addValue = 0;
                if (t._curVo.curStarCfg)
                    t_addValue = t._curVo.nextStarCfg.cfg.power - t._curVo.curStarCfg.cfg.power;
                else
                    t_addValue = t._curVo.nextStarCfg.cfg.power;
                t.tfPowerUp.text = t_addValue + "";
            }

            t.groupBh.visible = false;
            t.groupJh.visible = false;
            let t_effStr = "";
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
    }

    private showConsume() {
        let t = this;
        if (t._curVo) {
            let t_str = "消耗：";
            let t_list = t._curVo.consumeList;
            for (let i = 0; i < t_list.length; i++) {
                let t_item = t_list[i];
                let t_bagCount = Model_Bag.getItemCount(t_item.id);
                let t_color = Color.REDSTR;
                if (t_bagCount >= t_item.count) {
                    t_color = Color.GREENSTR;
                }
                let t_conStr = FastAPI.getItemName(t_item.id, true) + "×" + t_item.count +
                    HtmlUtil.font(`（${t_bagCount}/${t_item.count}）`, t_color);
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
    }

    private getIndexById(pId: number): number {
        let t = this;
        if (t._dataList) {
            for (let i = 0; i < t._dataList.length; i++) {
                let t_vo = t._dataList[i];
                if (t_vo && t_vo.id == pId) {
                    return i;
                }
            }
        }
        return -1;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
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
    }

    //======================================== handler =========================================
    private onStarUp(pData: { id: number }) {
        let t = this;
        t.refreshData();
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshDataByIndex(t.getIndexById(pData.id));
        }
    }

    private onHunChange(pData: { id: number }) {
        let t = this;
        t.refreshData();
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshDataByIndex(t.getIndexById(pData.id));
        }
    }

    private onSuitUpdate() {
        let t = this;
        t.refreshData();
        if (t._curVo) {
            t.refreshDataByIndex(t.getIndexById(t._curVo.id));
        }
    }

    private onInfoUpdate() {
        let t = this;
        t.refreshData();
        t.refreshDataByIndex(t.itemCtrl.selectedIndex);
    }

    private onBagUpdate() {
        let t = this;
        t.showConsume();
        t.refreshData();
    }

    private onItemClick(e: fairygui.StateChangeEvent) {
        let t = this;
        if (t.itemCtrl.selectedIndex < -1)
            return;
        t.refreshDataByIndex(t.itemCtrl.selectedIndex);
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
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
    }
}