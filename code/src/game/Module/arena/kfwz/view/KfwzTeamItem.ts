/**
 * @author: lujiahao 
 * @date: 2019-12-04 18:07:07 
 */
class KfwzTeamItem extends fairygui.GComponent {

    //>>>>start
	public imageSelect: fairygui.GImage;
	public headCom: KfwzHead;
	public btnClose: Button2;
	public flagLeader: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://me1skowln9yf74";

    public static createInstance(): KfwzTeamItem {
        return <KfwzTeamItem><any>(fairygui.UIPackage.createObject("Arena", "KfwzTeamItem"));
    }

    private _curData: VoTeamMemberKfwz;
    private _initPos;
    private _posIndex = -1;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setPos(pPosIndex: number) {
        let t = this;
        t._posIndex = pPosIndex;
    }

    public setData(pData: VoTeamMemberKfwz) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t._curData = pData;
        t.draggable = t_model.areYouLeader;
        t.resetPos();
        if (pData) {
            let t_model = GGlobal.modelKfwz;
            t.registerEvent(true);
            t.visible = true;

            if (pData.isLeader) {
                t.flagLeader.visible = true;
            }
            else {
                t.flagLeader.visible = false;
            }

            t.btnClose.visible = false;
            t.imageSelect.visible = false;
            if (t_model.areYouLeader) {
                t.btnClose.visible = true;
            }
            else {
            }
            if (pData.roleId == Model_player.voMine.id) {
                t.btnClose.visible = true;
                // t.imageSelect.visible = true;
            }

            t.headCom.setData(pData);
        }
        else {
            t.registerEvent(false);
            t.visible = false;
            t.headCom.setData(null);
        }
    }

    //===================================== private method =====================================
    private resetPos() {
        let t = this;
        if (!t._initPos) {
            t._initPos = new egret.Point(t.x, t.y);
        }
        SimpleTimer.ins().removeTimer(t.resetPos, t);
        t.x = t._initPos.x;
        t.y = t._initPos.y;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;

        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_DRAG_RESET_POS, t.onResetPos, t);

        EventUtil.register(pFlag, t.btnClose, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        EventUtil.register(pFlag, t, fairygui.DragEvent.DRAG_START, t.onDragStart, t);
        EventUtil.register(pFlag, t, fairygui.DragEvent.DRAG_END, t.onDragEnd, t);
        EventUtil.register(pFlag, t, fairygui.DropEvent.DROP, t.onDrop, t);
    }

    //======================================== handler =========================================
    private onResetPos(pData: { posIndex: number, result: boolean }) {
        let t = this;
        if (pData.posIndex == t._posIndex) {
            if (pData.result)
                SimpleTimer.ins().addTimer(t.resetPos, t, 300, 1);
            else
                t.resetPos();
        }
    }

    private onDragStart(e: fairygui.DragEvent) {
        let t = this;
        console.log("==== dragStart");
        if (e.currentTarget instanceof fairygui.GObject) {
            e.currentTarget.parent.addChildAt(e.currentTarget, e.currentTarget.parent.numChildren - 1);
        }
    }

    private onDragEnd(e: fairygui.DragEvent) {
        let t = this;
        if (t._curData && e.currentTarget instanceof fairygui.GObject) {
            let t_disCon = e.currentTarget.parent;
            let t_n = t_disCon.numChildren;
            for (let i = 0; i < t_n; i++) {
                let t_dis = t_disCon.getChildAt(i);
                if (t_dis && t_dis.visible && t_dis != e.currentTarget && t_dis.hasEventListener(fairygui.DropEvent.DROP) && t_dis.displayObject.hitTestPoint(e.stageX, e.stageY)) {
                    var dropEvt: fairygui.DropEvent = new fairygui.DropEvent(fairygui.DropEvent.DROP, { posIndex: t._posIndex });
                    t_dis.requestFocus();
                    t_dis.dispatchEvent(dropEvt);
                    return;
                }
            }
        }
        t.resetPos();
        console.log("==== dragEnd");
    }

    private onDrop(e: fairygui.DropEvent) {
        console.log("==== drop");
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_success = false;
        let t_sourceIndex: number = e.source["posIndex"];
        if (t_sourceIndex >= 0 && t._posIndex >= 0 && t._posIndex != t_sourceIndex) {
            t_success = t_model.CG_CrossTeamKing_exchange_10833(t_sourceIndex, t._posIndex);
        }

        GGlobal.control.notify(Enum_MsgType.KFWZ_DRAG_RESET_POS, { posIndex: t_sourceIndex, result: t_success });
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnClose:
                if (!t_model.isInTeam)
                    return;
                if (t_model.areYouLeader && t._curData.roleId != Model_player.voMine.id) {
                    t_model.CG_CrossTeamKing_moveMeber_10837(t._curData.posIndex); //队长踢人
                }
                else {
                    t_model.CG_CrossTeamKing_exitteam_10835(); //自己退出队伍
                }
                break;
        }
    }
}