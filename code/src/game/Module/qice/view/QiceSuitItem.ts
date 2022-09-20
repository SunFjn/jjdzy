/**
 * @author: lujiahao 
 * @date: 2019-10-23 17:26:59 
 */
class QiceSuitItem extends fairygui.GComponent {

    //>>>>start
	public tfName: fairygui.GRichTextField;
	public tfContent: fairygui.GRichTextField;
	public imgSource: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://cokk050nb5khc";

    private _curData: CfgSuitQice;

    public static createInstance(): QiceSuitItem {
        return <QiceSuitItem><any>(fairygui.UIPackage.createObject("qice", "QiceSuitItem"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    public setData(pData: CfgSuitQice) {
        let t = this;
        t._curData = pData;
        if (pData) {
            let t_strName = "";
            let t_isActive = pData.isActive;
            let t_color = "#cccccc";
            if (t_isActive) {
                //已激活
                t_strName = "当前阶段";
                t_color = Color.GREENSTR;
            }
            else {
                //未激活
                t_strName = "下一阶段";
            }
            t_strName += " " + HtmlUtil.font(`所有奇策达到${pData.requireStar}星`, Color.WHITESTR)

            let t_curCount = pData.curCount;
            let t_maxCount = pData.maxCount;
            if (t_curCount >= t_maxCount) {
                t_strName += HtmlUtil.font(`(${t_curCount}/${t_maxCount})`, Color.GREENSTR);
            }
            else {
                t_strName += HtmlUtil.font(`(${t_curCount}/${t_maxCount})`, Color.REDSTR);
            }
            t.tfName.text = t_strName;

            let t_strContent = "";
            let t_jmValue = parseInt(pData.cfg.shjm) * 100 / 100000;
            t_strContent += `爆气时候生成免伤护盾，免伤<font color='#0099ff'>${t_jmValue}%</font>`;
            t_strContent += `\n护盾持续<font color='#0099ff'>${pData.cfg.hdsj}毫秒</font>`;
            t_strContent += "\n" + ConfigHelp.attrString(JSON.parse(pData.cfg.sx), "+", t_color, t_color);
            t_strContent = HtmlUtil.font(t_strContent, t_color);

            t.tfContent.text = t_strContent;
        }
        else {
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
    //======================================== handler =========================================
}