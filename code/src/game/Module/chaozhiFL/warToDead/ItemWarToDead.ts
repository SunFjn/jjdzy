class ItemWarToDead extends fairygui.GButton {
    public grid:ViewGrid;
    public txtLayer:fairygui.GTextField;
    public iconTG:fairygui.GImage;
    public constructor() {
        super();
    }
    public static URL = "ui://qzsojhcrasooi";
    protected constructFromXML(xml) {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        this.grid.isShowEff =true;
    }
    private _data:Ixzdd1_252 | Ixzdd2_252;
    public set data(value:Ixzdd1_252 | Ixzdd2_252) {
        this._data = value;
        var highestLayer = GGlobal.modelWarToDead.highestLayer;
        this.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(value.reward))[0];
        var id = value.id;
        const qishu = GGlobal.modelWarToDead.qiShu;
        var curGua = 0
        if(TimeUitl.isIn7Days()){
            curGua = id
        }else if(ModelEightLock.originalDatas[UIConst.WARTODEAD1]){
            curGua = id - (qishu - 1) * 1000
        }else{
            curGua = id - (qishu - 1) * 20
        }
        this.txtLayer.text = `第${curGua}关`;
        if(highestLayer >= curGua) {
            this.iconTG.visible = true;
        }else {
            this.iconTG.visible = false;
        }
    }
    public get data() {
        return this._data;
    }
    private _sel:boolean;
    public set selected(value:boolean) {
        this._sel = value;
        this.grid.choose = value;
    }
    public get selected() {
        return this._sel;
    }
    public clean() {
        if(this.grid) {
            ConfigHelp.cleanGridEff(this.grid);
        }
    }
}