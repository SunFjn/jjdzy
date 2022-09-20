/**
 * @author: lujiahao 
 * @date: 2019-12-10 17:12:13 
 */
class KfwzHead extends fairygui.GComponent {

    //>>>>start
	public lbName: fairygui.GRichTextField;
	public imgHead: fairygui.GLoader;
	public imgHeadGrid: fairygui.GLoader;
	public tfLevel: fairygui.GRichTextField;
	public tfPower: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://me1skowln9yf72";

    public static createInstance(): KfwzHead {
        return <KfwzHead><any>(fairygui.UIPackage.createObject("Arena", "KfwzHead"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoTeamMemberKfwz | VoLogPlayerKfwz | VoBattlePlayerKfwz | VoTeamListKfwz) {
        let t = this;
        if (pData) {
            if (pData.headGrid)
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.headGrid + ""), t.imgHeadGrid);
            if (pData.head)
                ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.head + ""), t.imgHead);

            if ("roleId" in pData) {
                if (pData["roleId"] == Model_player.voMine.id)
                    t.lbName.text = HtmlUtil.font(pData.name, Color.GREENSTR);
                else
                    t.lbName.text = pData.name;
            }
            else {
                t.lbName.text = pData.name;
            }


            if (pData instanceof VoTeamMemberKfwz) {
                t.tfLevel.text = `Lv.${pData.level}`;
                t.tfPower.text = "战力：" + ConfigHelp.getYiWanText(pData.power);
            }
            else if (pData instanceof VoTeamListKfwz) {
                t.tfLevel.text = `队伍人数：<font color='${Color.GREENSTR}'>${pData.count}/3</font>`;
                t.tfPower.text = "";
            }
            else {
                t.tfLevel.text = "";
                t.tfPower.text = "";
            }
        }
        else {
            ImageLoader.instance.removeLoader(t.imgHead);
            ImageLoader.instance.removeLoader(t.imgHeadGrid);
        }
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}