/**
 * @author: lujiahao 
 * @date: 2019-11-07 17:19:37 
 */
class AchieveIconBtn extends fairygui.GButton {

    //>>>>start
	public noticeImg: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://dllc71i9pke61x";

    public static createInstance(): AchieveIconBtn {
        return <AchieveIconBtn><any>(fairygui.UIPackage.createObject("rebirth", "AchieveIconBtn"));
    }

    private _type: number;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    public setData(pType: number) {
        let t = this;
        t._type = pType;
        if (pType) {
            let t_model = GGlobal.modelAchievement;
            t.registerEvent(true);

            t.icon = CommonManager.getUrl("rebirth", "icon_" + pType);

            let t_canGet = false;
            let t_chainList = t_model.getTaskChainListByType(pType);
            for (let vList of t_chainList) {
                for (let v of vList) {
                    if (v.isOpened && v.state == EnumAchievement.STATE_CAN_GET) {
                        t_canGet = true;
                        break;
                    }
                }
            }
            t.noticeImg.visible = t_canGet;
        }
        else {
            t.registerEvent(false);
        }
    }

    public clean() {
        let t = this;
        t.setData(0);
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
    }
    //======================================== handler =========================================
}