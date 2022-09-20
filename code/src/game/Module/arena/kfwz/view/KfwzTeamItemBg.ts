/**
 * @author: lujiahao 
 * @date: 2019-12-25 15:09:57 
 */
class KfwzTeamItemBg extends fairygui.GComponent {

    //>>>>start
	public tfPos: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://me1skowlveix8g";

    public static createInstance(): KfwzTeamItemBg {
        return <KfwzTeamItemBg><any>(fairygui.UIPackage.createObject("Arena", "KfwzTeamItemBg"));
    }

    private _curData: VoTeamMemberKfwz;
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
        t.tfPos.text = `${pPosIndex + 1}号`;
    }

    public setData(pData: VoTeamMemberKfwz) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t._curData = pData;
        if (pData) {
            t.visible = true;
        }
        else {
            t.visible = false;
        }
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}