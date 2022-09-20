/**
 * @author: lujiahao 
 * @date: 2020-02-20 13:55:29 
 */
class GGLGridView extends fairygui.GComponent {

    //>>>>start
    public item3: GGLItem;
    public item4: GGLItem;
    public item6: GGLItem;
    public item0: GGLItem;
    public item2: GGLItem;
    public item8: GGLItem;
    public item1: GGLItem;
    public item5: GGLItem;
    public item7: GGLItem;
    //>>>>end

    public static URL: string = "ui://wnqj5rwkloxze";

    public static createInstance(): GGLGridView {
        return <GGLGridView><any>(fairygui.UIPackage.createObject("ggl", "GGLGridView"));
    }

    public constructor() {
        super();
    }

    private _dataList: VoGGLTemp[];

    public itemList: GGLItem[] = [];

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        for (let i = 0; i < 9; i++) {
            t.itemList.push(t.getChild("item" + i) as GGLItem);
        }
    }
    //========================================= 协议相关 ========================================
    //=========================================== API ==========================================
    public showData() {
        let t = this;
        let t_model = GGlobal.modelGGL;
        t._dataList = t_model.rewardList.concat();

        for (let i = 0; i < t.itemList.length; i++) {
            let t_item = t.itemList[i];
            t_item.setData(t._dataList[i]);
        }
    }

    public clear() {
        let t = this;
        for (let v of t.itemList) {
            v.clean();
        }
    }

    public showEffect(pFlag: boolean) {
        let t = this;
        let t_model = GGlobal.modelGGL;
        let t_rewardVo = t_model.rewardVo;
        for (let i = 0; i < t.itemList.length; i++) {
            let t_vo = t._dataList[i];
            let t_item = t.itemList[i];
            if (pFlag && t_vo && t_rewardVo
                && t_rewardVo.itemId == t_vo.itemId
                && t_rewardVo.itemType == t_vo.itemType
                && t_rewardVo.count == t_vo.count) {
                t_item.showEffect(true);
            }
            else {
                t_item.showEffect(false);
            }
            // //test
            // let t_item = t.itemList[i];
            // t_item.showEffect(false);
            // t_item.showEffect(true);
        }
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}