/**
 * @author: lujiahao 
 * @date: 2019-12-11 11:04:27 
 */
class KfwzLogItem extends fairygui.GComponent {

    //>>>>start
	public resultCtrl: fairygui.Controller;
	public typeCtrl: fairygui.Controller;
	public tfContent: fairygui.GRichTextField;
	public btnHide: Button2;
	public btnShow: Button2;
	public list1: fairygui.GList;
	public list2: fairygui.GList;
	//>>>>end

    public static URL: string = "ui://me1skowls0r57n";

    public static createInstance(): KfwzLogItem {
        return <KfwzLogItem><any>(fairygui.UIPackage.createObject("Arena", "KfwzLogItem"));
    }

    private _curData: VoLogKfwz;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.list1.itemRenderer = t.onItemRender1;
        t.list1.callbackThisObj = t;

        t.list2.itemRenderer = t.onItemRender2;
        t.list2.callbackThisObj = t;
    }

    //=========================================== API ==========================================
    public setData(pData: VoLogKfwz) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            if (pData.isFold)
                t.typeCtrl.selectedIndex = 0;
            else
                t.typeCtrl.selectedIndex = 1;

            t.resultCtrl.selectedIndex = pData.result;

            let t_enemyLeaderName = pData.enemyLeaderName;
            switch (pData.result) {
                case 1: //胜
                    t.tfContent.text = `你的队伍战胜了<font color='#469ff2'>${t_enemyLeaderName}</font>等人，获得<font color='#469ff2'>${pData.score}</font>积分`;
                    break;
                case 2: //负
                    t.tfContent.text = `你的队伍不敌<font color='#469ff2'>${t_enemyLeaderName}</font>等人，获得<font color='#469ff2'>${pData.score}</font>积分`;
                    break;
            }

            t.list1.numItems = t._curData.myTeamList.length;
            t.list2.numItems = t._curData.enemyTeamList.length;
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
    private onItemRender1(pIndex: number, pItem: KfwzHead) {
        let t = this;
        if (t._curData) {
            pItem.setData(t._curData.myTeamList[pIndex]);
        }
    }

    private onItemRender2(pIndex: number, pItem: KfwzHead) {
        let t = this;
        if (t._curData) {
            pItem.setData(t._curData.enemyTeamList[pIndex]);
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        // EventUtil.register(pFlag, t.btnShow, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        // EventUtil.register(pFlag, t.btnHide, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnShow:
                t._curData.isFold = false;
                GGlobal.control.notify(Enum_MsgType.KFWZ_LOG_CHANGE_SIZE);
                break;
            case t.btnHide:
                t._curData.isFold = true;
                GGlobal.control.notify(Enum_MsgType.KFWZ_LOG_CHANGE_SIZE);
                break;
            case t:
                t._curData.isFold = !t._curData.isFold;
                GGlobal.control.notify(Enum_MsgType.KFWZ_LOG_CHANGE_SIZE);
                break;
        }
    }
}