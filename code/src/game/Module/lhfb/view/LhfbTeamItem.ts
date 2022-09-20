/**
 * @author: lujiahao 
 * @date: 2020-02-28 22:56:37 
 */
class LhfbTeamItem extends fairygui.GComponent {

    //>>>>start
    public headCom: ViewHead;
    public tfLevel: fairygui.GRichTextField;
    public tfPower: fairygui.GRichTextField;
    public leaderImg: fairygui.GImage;
    public btnExit: Button2;
    //>>>>end

    public static URL: string = "ui://3o8q23uuokqy1m";

    public static createInstance(): LhfbTeamItem {
        return <LhfbTeamItem><any>(fairygui.UIPackage.createObject("syzlb", "LhfbTeamItem"));
    }

    public constructor() {
        super();
    }

    private _curData: VoTeamMemberLhfb;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoTeamMemberLhfb) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.visible = true;
            t.registerEvent(true);
            let t_model = GGlobal.modelLhfb;
            if (pData.isLeader) {
                t.leaderImg.visible = true;
            }
            else {
                t.leaderImg.visible = false;
            }

            let t_lunhuiStr = `(${ConfigHelp.NumberToChinese(pData.lunhuiId)}世轮回)`;
            t.tfLevel.text = `Lv.${pData.level}` + t_lunhuiStr;
            t.tfPower.text = `战力：${ConfigHelp.getYiWanText(pData.power)}`;

            t.btnExit.visible = false;
            if (t_model.areYouLeader) {
                t.btnExit.visible = true;
            }
            else {
            }
            if (pData.roleId == Model_player.voMine.id) {
                t.btnExit.visible = true;
            }
            let t_name = pData.name;
            if (pData.roleId == Model_player.voMine.id) {
                t_name = HtmlUtil.font(pData.name, Color.GREENSTR);
            }
            t.headCom.setdata(pData.head, pData.level, t_name, -1, false, pData.headGrid);
        }
        else {
            t.visible = false;
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
    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnExit, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        switch (e.currentTarget) {
            case t.btnExit:
                if (!t_model.isInTeam || !t._curData)
                    return;
                if (t_model.areYouLeader && t._curData.roleId != Model_player.voMine.id) {
                    //队长踢人
                    t_model.CG_RebornFB_moveMeber_11875(t._curData.roleId);
                }
                else {
                    //自己退出队伍
                    t_model.cmdSendExitTeam(true);
                }
                break;
        }
    }
}