/**
 * @author: lujiahao 
 * @date: 2020-02-20 16:54:12 
 */
class GGLBuyPanel extends fairygui.GComponent implements IPanel {

    //>>>>start
    public btnBuy: Button1;
    public resCom: ViewResource2;
    public groupConsume: fairygui.GGroup;
    public tfFree: fairygui.GRichTextField;
    //>>>>end

    public static URL: string = "ui://wnqj5rwkloxzg";

    public static createInstance(): GGLBuyPanel {
        return <GGLBuyPanel><any>(fairygui.UIPackage.createObject("ggl", "GGLBuyPanel"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    initView(pParent: fairygui.GObject) {
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);
        t.visible = true;

        t.refreshData();
    }

    closePanel(pData?: any) {
        let t = this;
        t.registerEvent(false);
        t.visible = false;
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelGGL;
        t.tfFree.visible = false;
        t.groupConsume.visible = false;
        if (t_model.freeCount > 0) {
            t.tfFree.visible = true;
            t.tfFree.text = `今日免费次数：<font color='#00ff00'>${t_model.freeCount}/${t_model.maxFree}</font>`;
        }
        else {
            t.groupConsume.visible = true;
            t.resCom.setItemId(EnumGGL.CONSUME_ID);
            let t_bagCount = FastAPI.getItemCount(EnumGGL.CONSUME_ID);
            let t_need = 1;
            t.resCom.setLb(t_bagCount, t_need);
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnBuy, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelGGL;
        switch (e.currentTarget) {
            case t.btnBuy:
                t_model.CG_ScratchTicket_draw_11791();
                break;
        }
    }
}