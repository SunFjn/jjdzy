/**
 * @author: lujiahao 
 * @date: 2020-04-07 16:12:57 
 */
class QianItem extends fairygui.GLabel {

    //>>>>start
    public qianIcon: fairygui.GLoader;
    public tfCount: fairygui.GRichTextField;
    public groupCount: fairygui.GGroup;
    public noticeImg: fairygui.GImage;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnypm";

    public static createInstance(): QianItem {
        return <QianItem><any>(fairygui.UIPackage.createObject("xyfq", "QianItem"));
    }

    public constructor() {
        super();
    }

    public curData: VoQianXyfq;

    private _curCount = 0;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }
    //=========================================== API ==========================================
    public setData(pData: VoQianXyfq) {
        let t = this;
        t.curData = pData;
        if (pData) {
            t.registerEvent(true);
            let t_posId = pData.posId;
            t.qianIcon.url = CommonManager.getUrl("xyfq", `qian_${t_posId}`);
            t.icon = CommonManager.getUrl("xyfq", `color_${t_posId}`);

            let t_bagCount = pData.count;
            t.tfCount.text = t_bagCount + "";

            t._curCount = t_bagCount;

            t.noticeImg.visible = (t_bagCount > 0);
        }
        else {
            t.registerEvent(false);
            t.qianIcon.url = null;
            t.icon = null;
        }
    }

    public addCount(pValue: number) {
        let t = this;
        if (t.curData) {
            t._curCount += pValue;
            let t_bagCount = t.curData.count;
            t._curCount = t._curCount > t_bagCount ? t_bagCount : t._curCount;
            t.tfCount.text = t._curCount + "";
            t.noticeImg.visible = (t._curCount > 0);
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
    private registerEvent(pFlag: boolean) {
        let t = this;
    }
    //======================================== handler =========================================
}