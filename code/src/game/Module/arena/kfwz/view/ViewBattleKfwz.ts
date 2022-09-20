/**
 * 跨服王者战斗界面
 * @author: lujiahao 
 * @date: 2019-12-16 15:02:54 
 */
class ViewBattleKfwz extends UIModalPanel {

    //>>>>start
	public hpBar1: fairygui.GProgressBar;
	public head10: KfwzHeadBattle;
	public hpBar2: fairygui.GProgressBar;
	public head20: KfwzHeadBattle;
	public tfName1: fairygui.GRichTextField;
	public tfName2: fairygui.GRichTextField;
	public groupFlag1: fairygui.GGroup;
	public groupFlag2: fairygui.GGroup;
	public head12: KfwzHeadBattle;
	public head11: KfwzHeadBattle;
	public head21: KfwzHeadBattle;
	public head22: KfwzHeadBattle;
	public tfHp1: fairygui.GRichTextField;
	public tfHp2: fairygui.GRichTextField;
	public imgHead: fairygui.GLoader;
	public imgHeadGrid: fairygui.GLoader;
	public tfUpTips: fairygui.GRichTextField;
	public groupUpTips: fairygui.GGroup;
	//>>>>end

    public static URL: string = "ui://me1skowlfyft85";

    public static createInstance(): ViewBattleKfwz {
        return <ViewBattleKfwz><any>(fairygui.UIPackage.createObject("Arena", "ViewBattleKfwz"));
    }

    private _myListHead: KfwzHeadBattle[];
    private _enemyListHead: KfwzHeadBattle[];

    public constructor() {
        super();
        this.isClosePanel = false;
        this.isShowMask = false;
        this.loadRes("Arena", "Arena_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewBattleKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t._myListHead = [t.head10, t.head11, t.head12];
        t._enemyListHead = [t.head20, t.head21, t.head22];
        t.groupUpTips.visible = false;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.refreshData();
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
    }

    public dispose() {
        super.dispose();
    }
    //===================================== private method =====================================
    private onMcComplete() {
        let t = this;
        t.groupUpTips.visible = false;
        ImageLoader.instance.removeLoader(t.imgHead);
        ImageLoader.instance.removeLoader(t.imgHeadGrid);
    }

    private playUpTips(pNextVo: VoBattlePlayerKfwz) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t.groupUpTips.visible = true;

        if (pNextVo.headGrid)
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pNextVo.headGrid + ""), t.imgHeadGrid);
        if (pNextVo.head)
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pNextVo.head + ""), t.imgHead);

        let t_color = Color.GREENSTR;
        if (pNextVo.force == 2) {
            //敌方阵营
            t_color = Color.REDSTR;
        }
        t.tfUpTips.text = HtmlUtil.font(pNextVo.name, t_color) + "上阵";

        // t.mcUp.play(t.onMcComplete, t);
        egret.Tween.removeTweens(t.groupUpTips);
        t.groupUpTips.x = -t.groupUpTips.width;
        t.groupUpTips.visible = true;
        let tw = egret.Tween.get(t.groupUpTips);
        tw.to({ x: t.width - t.groupUpTips.width >> 1 }, 250)
            .wait(750)
            .to({ x: t.width }, 250)
            .call(() => {
                t.onMcComplete();
            });
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelKfwz;

        for (let i = 0; i < t._myListHead.length; i++) {
            let t_vo = t_model.myFightList[i];
            t._myListHead[i].setData(t_vo);
        }

        for (let i = 0; i < t._enemyListHead.length; i++) {
            let t_vo = t_model.enemyFightList[i];
            t._enemyListHead[i].setData(t_vo);
        }

        t.tfName1.text = t_model.myFightList[0].name;
        t.tfName2.text = t_model.enemyFightList[0].name;

        if (t_model.myBattleList.length < 2)
            t.groupFlag1.visible = false;
        else
            t.groupFlag1.visible = true;

        if (t_model.enemyBattleList.length < 2)
            t.groupFlag2.visible = false;
        else
            t.groupFlag2.visible = true;

        t.refreshHp();
    }

    private refreshHp() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_vo1 = t_model.myFightList[0];
        let t_vo2 = t_model.enemyFightList[0];
        if (t_vo1) {
            t.hpBar1.max = t_vo1.maxHp;
            t.hpBar1.value = t_vo1.curHp;

            if (t_vo1.curHp == 0 || t_vo1.maxHp == 0) {
                t.tfHp1.text = 0 + "%";
            }
            else {
                let t_value = t_vo1.curHp * 100 / t_vo1.maxHp;
                let t_str = t_value.toFixed(1);
                if (t_str.charAt(t_str.length - 1) == "0")
                    t_str = t_value.toFixed(0);
                t.tfHp1.text = t_str + "%";
            }
        }
        if (t_vo2) {
            t.hpBar2.max = t_vo2.maxHp;
            t.hpBar2.value = t_vo2.curHp;

            if (t_vo2.curHp == 0 || t_vo2.maxHp == 0) {
                t.tfHp2.text = 0 + "%";
            }
            else {
                let t_value = t_vo2.curHp * 100 / t_vo2.maxHp;
                let t_str = t_value.toFixed(1);
                if (t_str.charAt(t_str.length - 1) == "0")
                    t_str = t_value.toFixed(0);
                t.tfHp2.text = t_str + "%";
            }
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_BATTLE_PLAYER_DEAD, t.onPlayerDead, t);

        if (pFlag) {
            SimpleTimer.ins().addTimer(t.onUpdate, t, 0, 0);
        }
        else {
            SimpleTimer.ins().removeTimer(t.onUpdate, t);
        }
    }
    //======================================== handler =========================================
    /** 玩家死亡更新处理 */
    private onPlayerDead(pData: { deadVo: VoBattlePlayerKfwz, nextVo: VoBattlePlayerKfwz }) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t.refreshData();
        if (pData.nextVo) {
            t.playUpTips(pData.nextVo);
        }
        else {
            if (pData.nextVo === undefined) {
            }
            else {
                //提示某某退出
                let t_color = Color.GREENSTR;
                if (pData.deadVo.force == 2) {
                    //敌方阵营
                    t_color = Color.REDSTR;
                }
                ViewCommonWarn.text(HtmlUtil.font(pData.deadVo.name, t_color) + "退出了战斗");
            }
        }
    }

    private onUpdate() {
        let t = this;
        t.refreshHp();
    }
}