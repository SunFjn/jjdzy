/**
 * @author: lujiahao 
 * @date: 2019-11-07 17:33:52 
 */
class AchieveTaskItem extends fairygui.GComponent {

    //>>>>start
    public stateCtrl: fairygui.Controller;
    public item: ViewGrid;
    public btnGo: Button0;
    public btnGet: Button1;
    public imageGet: fairygui.GImage;
    public pb: fairygui.GProgressBar;
    public tfName: fairygui.GRichTextField;
    public tfContent: fairygui.GRichTextField;
    public resCom: ViewResource2;
    //>>>>end

    public static URL: string = "ui://dllc71i9pke624";

    public static createInstance(): AchieveTaskItem {
        return <AchieveTaskItem><any>(fairygui.UIPackage.createObject("rebirth", "AchieveTaskItem"));
    }

    private _curData: VoTaskAchievement;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoTaskAchievement) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);

            t.stateCtrl.selectedIndex = pData.state;

            t.btnGet.noticeImg.visible = (pData.state == EnumAchievement.STATE_CAN_GET);

            t.tfName.text = pData.cfg.bt;
            t.tfContent.text = pData.cfg.ms;

            t.pb.max = pData.cfg.cs1;
            t.pb.value = pData.count;

            t.item.isShowEff = true;
            t.item.tipEnabled = true;
            t.item.vo = pData.rewardList[0];

            t.resCom.setItemId(pData.rewardList[1].id);
            t.resCom.setCount(pData.rewardList[1].count);
        }
        else {
            t.registerEvent(false);
            t.item.vo = null;
        }
    }

    public clean() {
        let t = this;
        t.setData(null);
        super.clean();
    }

    public dispose() {
        let t = this;
        t.clean();
        super.dispose();
    }
    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;

        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                let t_openId = t._curData.cfg.open;
                let t_cla = GGlobal.layerMgr.getClassById(t_openId);
                if (t_cla == ViewRebirthPanel) {
                    //先关闭当前面板
                    GGlobal.layerMgr.close2(UIConst.ACHIEVEMENT);
                }
                GGlobal.layerMgr.open(t_openId);
                break;

            case t.btnGet:
                GGlobal.modelAchievement.CG_Achievement_getReward_10323(0, t._curData.id);
                break;
        }
    }
}