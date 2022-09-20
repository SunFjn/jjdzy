/**
 * @author: lujiahao 
 * @date: 2019-09-26 15:11:16 
 */
class QxzlHead extends fairygui.GComponent {

    //>>>>start
	public lbName: fairygui.GRichTextField;
	public imgHead: fairygui.GLoader;
	public imgHeadGrid: fairygui.GLoader;
	//>>>>end

    public static URL: string = "ui://6d8dzzdglxm0m";

    public static createInstance(): QxzlHead {
        return <QxzlHead><any>(fairygui.UIPackage.createObject("qxzl", "QxzlHead"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    public setData(pData: VoMvpQxzl) {
        let t = this;
        if (pData.head) {
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.headGrid + ""), t.imgHeadGrid);
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(pData.head + ""), t.imgHead);
            t.lbName.text = pData.name;
        }
        else {
            t.lbName.text = HtmlUtil.font("虚位以待", 0xcccccc);
            ImageLoader.instance.removeLoader(t.imgHead);
            ImageLoader.instance.removeLoader(t.imgHeadGrid);
        }
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}