/**
 * @author: lujiahao 
 * @date: 2019-12-16 14:39:48 
 */
class KfwzHeadBattle extends fairygui.GComponent {

    //>>>>start
	public dirCtrl: fairygui.Controller;
	public imgHead: fairygui.GLoader;
	public imgHeadGrid: fairygui.GLoader;
	public groupDie: fairygui.GGroup;
	public tfIndex: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://me1skowlfyft86";

    public static createInstance(): KfwzHeadBattle {
        return <KfwzHeadBattle><any>(fairygui.UIPackage.createObject("Arena", "KfwzHeadBattle"));
    }

    private _curData: VoBattlePlayerKfwz;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoBattlePlayerKfwz) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.visible = true;
            if (pData.headGrid)
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.headGrid + ""), t.imgHeadGrid);
            if (pData.head)
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.head + ""), t.imgHead);

            t.tfIndex.text = (pData.index + 1) + "";

            if(pData.isDead)
                t.groupDie.visible = true;
            else
                t.groupDie.visible = false;

            let t_flag = ~~t.data; //来自元件的自定义数据
            t.dirCtrl.selectedIndex = t_flag;
        }
        else {
            t.visible = false;
            ImageLoader.instance.removeLoader(t.imgHead);
            ImageLoader.instance.removeLoader(t.imgHeadGrid);
        }
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}