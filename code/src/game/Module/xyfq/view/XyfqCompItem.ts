/**
 * @author: lujiahao 
 * @date: 2020-04-10 10:24:50 
 */
class XyfqCompItem extends fairygui.GComponent {

    //>>>>start
    public itemCur: QianItemGrid;
    public itemNeed: QianItemGrid;
    public pgNeed: fairygui.GProgressBar;
    public numCom: NumberCom;
    public resCom: ViewResource2;
    public tfDes: fairygui.GRichTextField;
    public btnOpen: Button1;
    //>>>>end

    public static URL: string = "ui://7hwmix0gszt5x";

    public static createInstance(): XyfqCompItem {
        return <XyfqCompItem><any>(fairygui.UIPackage.createObject("xyfq", "XyfqCompItem"));
    }

    public constructor() {
        super();
    }

    private _curData: VoQianXyfq;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.numCom.btnMin.visible = false;
        t.numCom.btnMax.visible = false;
        t.numCom.minValue = 1;
    }

    //=========================================== API ==========================================
    public setData(pData: VoQianXyfq) {
        let t = this;
        t._curData = pData;
        let t_model = GGlobal.modelXyfq;
        if (pData) {
            t.registerEvent(true);
            t.itemCur.setData(pData);

            let t_qianItem = pData.needQainItem;
            let t_consumeItem = pData.compConsume;

            let t_qianVo = t_model.getQianVoById(t_qianItem.id);
            t.itemNeed.setData(t_qianVo);

            let t_bagCount = t_qianVo.count;
            let t_maxComp = ~~(t_bagCount / t_qianItem.count);

            if (t_maxComp > 0) {
                t.numCom.maxValue = t_maxComp;
            }
            else {
                t.numCom.maxValue = 1;
            }
            t.numCom.value = 1;

            t.refreshConsume();

            let t_nameNeed = FastAPI.getItemName(t_qianItem.id, true);
            let t_nameCur = FastAPI.getItemName(pData.id, true);

            t.tfDes.text = `${t_qianItem.count}个${t_nameNeed}可合成1个${t_nameCur}`;
        }
        else {
            t.registerEvent(false);
            t.itemCur.clean();
        }
    }

    public clean() {
        this.setData(null);
        super.clean();
    }

    public dispose() {
        this.clean();
        super.dispose();
    }
    //===================================== private method =====================================
    private refreshConsume() {
        let t = this;
        if (!t._curData)
            return;
        let t_model = GGlobal.modelXyfq;
        let pData = t._curData;
        let t_qianItem = pData.needQainItem;
        let t_consumeItem = pData.compConsume;

        let t_qianVo = t_model.getQianVoById(t_qianItem.id);
        let t_bagCount = t_qianVo.count;

        let t_needQainCount = t.numCom.value * t_qianItem.count;
        t.pgNeed.max = t_needQainCount;
        t.pgNeed.value = t_bagCount;

        let t_color = Color.GREENSTR;
        if (t_needQainCount > t_bagCount)
            t_color = Color.REDSTR;
        t.pgNeed.text = HtmlUtil.font(`${t_bagCount}/${t_needQainCount}`, t_color);

        t.resCom.setItemId(pData.compConsume.id);
        t_bagCount = FastAPI.getItemCount(pData.compConsume.id);
        t_color = Color.GREENSTR;
        let t_need = pData.compConsume.count * t.numCom.value;
        if (t_need > t_bagCount)
            t_color = Color.REDSTR;
        let t_strCon = HtmlUtil.font(`${t_bagCount}/${t_need}`, t_color);
        t.resCom.setCount(t_strCon);

        t.btnOpen.noticeImg.visible = pData.checkCanComp(false, t.numCom.value);
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnOpen, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.numCom, egret.Event.CHANGE, t.onValueChange, t);
    }

    //======================================== handler =========================================
    private onValueChange(e: egret.Event) {
        let t = this;
        if (!t._curData)
            return;
        t.refreshConsume();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        switch (e.currentTarget) {
            case t.btnOpen:
                t_model.CG_LuckSign_getAward_12157(t._curData.id, t.numCom.value);
                break;
        }
    }
}