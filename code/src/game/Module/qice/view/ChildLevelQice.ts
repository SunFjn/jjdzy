/**
 * 奇策升级界面
 * @author: lujiahao 
 * @date: 2019-10-24 13:46:17 
 */
class ChildLevelQice extends fairygui.GComponent implements IPanel {
    //>>>>start
    public maxCtrl: fairygui.Controller;
    public itemCtrl: fairygui.Controller;
    public img: fairygui.GImage;
    public nameCom: fairygui.GLabel;
    public boxMax: fairygui.GImage;
    public btnUp: Button1;
    public tfCost: fairygui.GRichTextField;
    public powerCom: fairygui.GLabel;
    public tfPowerUp: fairygui.GTextField;
    public groupPowerUp: fairygui.GGroup;
    public tfProCur: fairygui.GRichTextField;
    public tfProNext: fairygui.GRichTextField;
    public imgArrow: fairygui.GImage;
    public list: fairygui.GList;
    public bwIcon: fairygui.GLoader;
    public btnShow: Button2;
    public resCom: ViewResource;
    public tfJie: fairygui.GRichTextField;
    public tfJi: fairygui.GRichTextField;
    public tfConsumeName: fairygui.GRichTextField;
    public t0: fairygui.Transition;
    //>>>>end

    public static URL: string = "ui://cokk050nb5khf";

    private _dataList: VoQice[];
    private _curVo: VoQice;

    public static createInstance(): ChildLevelQice {
        return <ChildLevelQice><any>(fairygui.UIPackage.createObject("qice", "ChildLevelQice"));
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

        t.resCom.setType(0);
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

        t.itemCtrl.selectedIndex = -1;
        t.itemCtrl.selectedIndex = 0;

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
            pItem.setData(1, t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelQice;
        let t_dataList = t_model.getVoList().concat();
        t._dataList = t_dataList;
        t._dataList.sort((pA, pB) => {
            return pB.getSortVlaue(1) - pA.getSortVlaue(1);
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
            let t_name = HtmlUtil.font(t._curVo.cfg.name, Color.getColorStr(t._curVo.cfg.pz));
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
                let t_addValue = 0;
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
    }

    private showConsume() {
        let t = this;
        if (t._curVo) {
            if (t._curVo.curLevelCfg && !t._curVo.isLevelMax) {
                let t_list = t._curVo.curLevelCfg.consumeList;
                t.resCom.setItemId(t_list[0].id);
                let t_bagCount = Model_Bag.getItemCount(t_list[0].id);
                t.resCom.setLb(t_bagCount, t_list[0].count);
                t.tfConsumeName.text = FastAPI.getItemName(t_list[0].id, true);
            }

            t.btnUp.noticeImg.visible = t._curVo.checkCanLevelUp(false);
        }
        else {
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
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_LEVEL_UP, t.onLevelUp, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_STAR_UP, t.onStarUp, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_INFO_UPDATE, t.onInfoUpdate, t);

        EventUtil.register(pFlag, t.itemCtrl, fairygui.StateChangeEvent.CHANGED, t.onItemClick, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onLevelUp(pData: { id: number }) {
        let t = this;
        t.refreshData();
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshDataByIndex(t.getIndexById(pData.id));
        }
    }

    private onStarUp(pData: { id: number }) {
        let t = this;
        t.refreshData();
        if (t._curVo && t._curVo.id == pData.id) {
            t.refreshDataByIndex(t.getIndexById(pData.id));
        }
    }

    private onInfoUpdate() {
        let t = this;
        t.refreshData();
        t.refreshDataByIndex(t.itemCtrl.selectedIndex);
    }

    private onItemClick(e: fairygui.StateChangeEvent) {
        let t = this;
        if (t.itemCtrl.selectedIndex < -1)
            return;
        t.refreshDataByIndex(t.itemCtrl.selectedIndex);
    }

    private onBagUpdate() {
        let t = this;
        t.showConsume();
        t.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                if (t._curVo) {
                    GGlobal.modelQice.CG_QiCe_upQiCeJie_9709(t._curVo.id);
                }
                break;
        }
    }
}