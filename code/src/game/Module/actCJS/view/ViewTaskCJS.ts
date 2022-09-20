/**
 * 成就树任务面板
 * @author: lujiahao 
 * @date: 2019-11-21 18:16:56 
 */
class ViewTaskCJS extends UIModalPanel {

    //>>>>start
    public frame: fairygui.GLabel;
    public tfLayer: fairygui.GRichTextField;
    public tfCount: fairygui.GRichTextField;
    public list: fairygui.GList;
    //>>>>end

    public static URL: string = "ui://ehocr0vupwnz7";

    public static createInstance(): ViewTaskCJS {
        return <ViewTaskCJS><any>(fairygui.UIPackage.createObject("actCJS", "ViewTaskCJS"));
    }

    private _dataList: VoTaskCJS[];
    private _curLayer = 1;

    public constructor() {
        super();
        this.loadRes("actCJS", "actCJS_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("actCJS");
        this.view = fairygui.UIPackage.createObject("actCJS", "ViewTaskCJS").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);

        if (t._args && "layer" in t._args) {
            t._curLayer = t._args.layer;
        }
        t.refreshData();
        t.list.scrollToView(0);
    }

    protected onHide() {
        this.registerEvent(false);
        this.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: CJSTaskItem) {
        if (this._dataList) {
            pItem.setData(this._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelCJS;
        let t_qs = t_model.getCurQs();
        let t_voList = t_model.getTaskVoListByQsAndLayer(t_qs, t._curLayer).concat();
        t_voList.sort((pA, pB) => {
            return pB.sortValue - pA.sortValue;
        });
        t._dataList = t_voList;
        t.list.numItems = t_voList.length;

        let t_strLayer = ConfigHelp.NumberToChinese(t._curLayer);
        t.tfLayer.text = `成就树第${t_strLayer}层`;

        let t_completeCount = 0;
        for (let v of t_voList) {
            if (v.state == 1) {
                t_completeCount++;
            }
        }
        t.tfCount.text = `已点亮：${t_completeCount}/${t_voList.length}`;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.CJS_UPDATE, t.onUpdate, t);
    }

    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshData();
    }
}