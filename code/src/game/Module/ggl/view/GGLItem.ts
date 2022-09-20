/**
 * @author: lujiahao 
 * @date: 2020-02-20 13:55:55 
 */
class GGLItem extends fairygui.GComponent {

    //>>>>start
    public item: ViewGrid;
    public p0: fairygui.GGraph;
    public p1: fairygui.GGraph;
    public p2: fairygui.GGraph;
    //>>>>end

    public static URL: string = "ui://wnqj5rwkloxzc";

    public static createInstance(): GGLItem {
        return <GGLItem><any>(fairygui.UIPackage.createObject("ggl", "GGLItem"));
    }

    public constructor() {
        super();
    }

    public pointList: egret.Point[];

    private _curData: VoGGLTemp;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        let t = this;
        CommonManager.parseChildren(t, t);

        t.pointList = [
            egret.Point.create(t.p0.x, t.p2.y),
            egret.Point.create(t.p1.x, t.p1.y),
            egret.Point.create(t.p2.x, t.p2.y)
        ];
    }

    //=========================================== API ==========================================
    public setData(pData: VoGGLTemp) {
        let t = this;
        t._curData = pData;
        if (pData) {
            if (pData.itemVo) {
                t.item.isShowEff = true;
                t.item.tipEnabled = true;
                t.item.vo = pData.itemVo;
            }
        }
        else {
            t.showEffect(false);
            t.item.vo = null;
        }
    }

    private _mc1: Part;
    private _mc2: Part;
    public showEffect(pFlag: boolean) {
        let t = this;
        if (pFlag) {
            if (!t._mc1) {
                t._mc1 = EffectMgr.addEff("uieff/10096", t.displayListContainer, t.width / 2, t.height / 2, 300, 300, false);
                t._mc1.refThis = t;
                t._mc1.refKey = "_mc1";
            }
            SimpleTimer.ins().addTimer(t.onMc1Complete, t, 300, 1);
        }
        else {
            if (t._mc1) {
                EffectMgr.instance.removeEff(t._mc1);
                t._mc1 = null;
            }
            if (t._mc2) {
                EffectMgr.instance.removeEff(t._mc2);
                t._mc2 = null;
            }
            SimpleTimer.ins().removeTimer(t.onMc1Complete, t);
        }
    }

    private onMc1Complete() {
        let t = this;
        if (t._mc1) {
            EffectMgr.instance.removeEff(t._mc1);
            t._mc1 = null;
        }
        if (!t._mc2) {
            t._mc2 = EffectMgr.addEff("uieff/10095", t.displayListContainer, t.item.x, t.item.y, 500, -1, true);
            t._mc2.refThis = t;
            t._mc2.refKey = "_mc2";
        }
    }

    public clean() {
        this.setData(null);
        super.clean();
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}