/**
 * @author: lujiahao 
 * @date: 2019-11-01 15:17:34 
 */
class BallViewGrid extends fairygui.GComponent {

    //>>>>start
	public grid: ViewGrid;
	public imgGet: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://i1mp7ufx9tdd8";

    public static createInstance(): BallViewGrid {
        return <BallViewGrid><any>(fairygui.UIPackage.createObject("balloon", "BallViewGrid"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    public setData(pData: IGridImpl) {
        let t = this;
        t.grid.isShowEff = true;
        t.grid.tipEnabled = true;
        t.grid.vo = pData;

        let t_hasGet = false;
        for (let i = 0; i < EnumBalloon.BALL_COUNT; i++) {
            let t_vo = GGlobal.modelBalloon.getVoById(i + 1);
            if (t_vo && t_vo.rewardItem && t_vo.rewardItem.id == pData.id && t_vo.rewardItem.count == pData.count) {
                t_hasGet = true;
                break;
            }
        }
        t.imgGet.visible = t_hasGet;
    }

    public clean() {
        let t = this;
        t.grid.clean();
        super.clean();
    }

    public dispose() {
        let t = this;
        t.clean();
        super.dispose();
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}