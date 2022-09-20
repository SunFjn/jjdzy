/**符文有礼 */
class ChildFuWenYL extends ABActUI {
    public bg: fairygui.GLoader;
    public txtRemainTm: fairygui.GTextField;
    public list: fairygui.GList;
    protected childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        this.list.numItems = GGlobal.modelEightLock.getFWYLDatas().length;
    }
    public getView() {
        return fairygui.UIPackage.createObject("eightLock", "ChildFuWenYL");
    }
    private onListRender(index: number, render: ItemFWYL) {
        const datas = GGlobal.modelEightLock.getFWYLDatas();
        render.setData(datas[index]);
    }
    private onTick() {
        const act = ModelEightLock.originalDatas[UIConst.FUWENYOULI];
        const end = act ? act.end : 0;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
        } else {
            this.txtRemainTm.text = "00:00:00";
            Timer.instance.remove(this.onTick, this);
        }
    }
    private onUpdate() {
        const act = ModelEightLock.originalDatas[UIConst.FUWENYOULI];
        const end = act ? act.end : 0;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
            Timer.instance.listen(this.onTick, this, 1000);
        } else {
            this.txtRemainTm.text = "00:00:00";
        }
        const datas = GGlobal.modelEightLock.getFWYLDatas();
        this.list.numItems = datas.length;
    }
    public onShow() {
        this.onUpdate();
        IconUtil.setImg(this.bg, "resource/image/pic/bg4.jpg");
    }
    public onHide() {
        IconUtil.setImg(this.bg, null);
        Timer.instance.remove(this.onTick, this);
        this.list.numItems = 0;
    }
}