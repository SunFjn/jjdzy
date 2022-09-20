/**
 * 队伍列表项
 * @author: lujiahao 
 * @date: 2019-12-13 18:25:14 
 */
class KfwzTeamListItem extends fairygui.GComponent {

    public headCom: KfwzHead;
    public btnJoin: fairygui.GButton;

    public static URL: string = "ui://me1skowlp2gq84";

    public static createInstance(): KfwzTeamListItem {
        return <KfwzTeamListItem><any>(fairygui.UIPackage.createObject("Arena", "KfwzTeamListItem"));
    }

    private _curData: VoTeamListKfwz;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoTeamListKfwz) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.headCom.setData(pData);
        }
        else {
            t.registerEvent(false);
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
        EventUtil.register(pFlag, t.btnJoin, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnJoin:
                if (t._curData) {
                    t_model.cmdSendJoinTeam(t._curData.teamId);
                }
                break;
        }
    }
}