/**
 * @author: lujiahao 
 * @date: 2020-04-07 17:55:04 
 */
class ViewQianUse extends UIModalPanel {

    //>>>>start
    public bg: fairygui.GLoader;
    public item: QianItem;
    public numCom: NumberCom;
    public btnOpen: Button1;
    public btnRight: Button2;
    public btnLeft: Button2;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnypn";

    public static createInstance(): ViewQianUse {
        return <ViewQianUse><any>(fairygui.UIPackage.createObject("xyfq", "ViewQianUse"));
    }

    public constructor() {
        super();
        this.loadRes("xyfq", "xyfq_atlas0");
    }

    private _curVo: VoQianXyfq;
    private _qianList: VoQianXyfq[] = [];

    protected childrenCreated() {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewQianUse").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        t._qianList = t_model.getQianVoList().concat();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t._curVo = t._args;
        t.refreshData();
        t.registerEvent(true);

        IconUtil.setImg(t.bg, Enum_Path.BACK_URL + "xyfq_use_bg.png");
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t.item.clean();
        IconUtil.setImg(t.bg, null);
    }

    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        if (t._curVo) {
            let t_bagCount = t._curVo.count;
            t.item.setData(t._curVo);
            t.numCom.maxValue = t_bagCount;
            t.numCom.setValue(t_bagCount);
        }
    }

    private getCurIndex(): number {
        let t = this;
        let t_index = 0;
        if (t._curVo) {
            for (let i = 0; i < t._qianList.length; i++) {
                if (t._curVo.id == t._qianList[i].id) {
                    t_index = i;
                    break;
                }
            }
        }
        return t_index;
    }

    private getLastOrNextIndex(pDiff: number) {
        let t = this;
        let t_curIndex = t.getCurIndex();
        let t_len = t._qianList.length;
        let t_a = t_curIndex + pDiff;
        let t_targetIndex = 0;
        if (t_a >= 0) {
            t_targetIndex = t_a % t_len;
        }
        else {
            t_targetIndex = t_len - ((-t_a) % t_len);
        }
        return t_targetIndex;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnLeft, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRight, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnOpen, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);

        EventUtil.register(pFlag, t.numCom.btnMax, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.numCom.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBagUpdate() {
        let t = this;
        t.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        if (!t._curVo)
            return;
        switch (e.currentTarget) {
            case t.btnLeft:
                {
                    let t_targetIndex = t.getLastOrNextIndex(-1);
                    let t_vo = t._qianList[t_targetIndex];
                    t._curVo = t_vo;
                    t.refreshData();
                }
                break;
            case t.btnRight:
                {
                    let t_targetIndex = t.getLastOrNextIndex(1);
                    let t_vo = t._qianList[t_targetIndex];
                    t._curVo = t_vo;
                    t.refreshData();
                }
                break;

            case t.numCom.btnAdd:
            case t.numCom.btnMax:
                if (t.numCom.value >= t.numCom.maxValue) {
                    ViewCommonWarn.text("已达到可使用数量上限");
                }
                break;

            case t.btnOpen:
                let t_count = t.numCom.value;
                t_model.CG_LuckSign_openLuckSign_12159(t._curVo.rewardId, t_count);
                break;
        }
    }
}