/**
 * @author: lujiahao 
 * @date: 2020-04-09 10:17:14 
 */
class XyfqItemTask extends fairygui.GComponent {

    //>>>>start
    public stateCtrl: fairygui.Controller;
    public itemList: fairygui.GList;
    public tfState: fairygui.GRichTextField;
    public tfName: fairygui.GRichTextField;
    public btnGet: Button1;
    public imageGet: fairygui.GImage;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnypr";

    public static createInstance(): XyfqItemTask {
        return <XyfqItemTask><any>(fairygui.UIPackage.createObject("xyfq", "XyfqItemTask"));
    }

    public constructor() {
        super();
    }

    private _curData: VoTaskXyfq;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    }

    //=========================================== API ==========================================
    public setData(pData: VoTaskXyfq) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            let t_state = pData.state;
            t.stateCtrl.selectedIndex = t_state;
            t.itemList.numItems = pData.rewardList.length;
            t.btnGet.noticeImg.visible = (t_state == 1);
            t.tfName.text = `抽签${pData.cfg.time}次`;
            t.itemList.scrollToView(0);
        }
        else {
            t.itemList.numItems = 0;
            t.registerEvent(false);
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
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t = this;
        if (t._curData) {
            let t_list = t._curData.rewardList;
            if (t_list) {
                pItem.isShowEff = true;
                pItem.tipEnabled = true;
                pItem.vo = t_list[pIndex];
            }
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        switch (e.currentTarget) {
            case t.btnGet:
                if (t._curData) {
                    t_model.CG_LuckSign_getTargetAward_12155(t._curData.type, t._curData.id);
                }
                break;
        }
    }
}