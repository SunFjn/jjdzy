/**
 * @author: lujiahao 
 * @date: 2019-12-09 16:44:17 
 */
class KfwzRankItem extends fairygui.GComponent {

    //>>>>start
	public gradeCtrl: fairygui.Controller;
	public tfRank: fairygui.GRichTextField;
	public tfName: fairygui.GRichTextField;
	public tfScore: fairygui.GRichTextField;
	public btnReward: Button5;
	public iconGrade: fairygui.GLoader;
	//>>>>end

    public static URL: string = "ui://me1skowlpmqq78";

    public static createInstance(): KfwzRankItem {
        return <KfwzRankItem><any>(fairygui.UIPackage.createObject("Arena", "KfwzRankItem"));
    }

    private _curData: VoRankCfgKfwz;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoRankCfgKfwz) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);
            t.tfRank.text = `${pData.rank}`;

            if (pData.name) {
                t.tfName.text = pData.name;
                t.iconGrade.visible = true;
            }
            else {
                t.tfName.text = "虚位以待";
                t.iconGrade.visible = false;
            }
            t.tfScore.text = pData.score + "";
            t.gradeCtrl.selectedIndex = pData.grade-1;
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
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        if (!t._curData)
            return;
        switch (e.currentTarget) {
            case t.btnReward:
                View_BoxReward_Show.show(t._curData.rewardList, `排名第${t._curData.rank}可领取`);
                break;
        }
    }
}