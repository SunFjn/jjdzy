/**符文鉴定 */
class ChildFuWenJD extends ABActUI {
    public bg: fairygui.GLoader;
    public list: fairygui.GList;
    public txtRemainTm: fairygui.GTextField;
    public txtJDInfo: fairygui.GTextField;
    protected childrenCreated() {
        super.childrenCreated();
        this.list.itemRenderer = this.onListRender;
        this.list.callbackThisObj = this;
        const datas = GGlobal.modelEightLock.getFWJDDatas();
        this.list.numItems = datas.length;
    }
    public getView() {
        return fairygui.UIPackage.createObject("eightLock", "ChildFuWenJD");
    }
    private onListRender(index: number, render: ItemFWJD) {
        const datas = GGlobal.modelEightLock.getFWJDDatas();
        render.setData(datas[index]);
    }
    private onUpdate() {
        const act = ModelEightLock.originalDatas[UIConst.FUWENJIANDING];
        const end = act ? act.end : 0;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
            Timer.instance.listen(this.onTick, this, 1000);
        } else {
            this.txtRemainTm.text = "00:00:00";
        }
        this.txtJDInfo.text = ModelEightLock.hasJianDing + "件";
        const datas = GGlobal.modelEightLock.getFWJDDatas();
        datas.sort(this.onSort);
        this.list.numItems = datas.length;
    }
    private onSort(a: Ifwjd_264, b: Ifwjd_264) {
        let state1 = GGlobal.modelEightLock.getFWDJState(a);
        let state2 = GGlobal.modelEightLock.getFWDJState(b);
        if (!state1) state1 = 0;
        if (!state2) state2 = 0;
        if (state1 == state2) {
            return a.id - b.id;
        } else {
            if (state1 == 1) {
                return -1;
            } else if (state2 == 1) {
                return 1;
            } else {
                return state1 - state2;
            }
        }
    }
    private onTick() {
        const act = ModelEightLock.originalDatas[UIConst.FUWENJIANDING];
        const end = act ? act.end : 0;
        const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
        if (end - servTime > 0) {
            this.txtRemainTm.text = DateUtil.getMSBySecond4(end - servTime);
        } else {
            this.txtRemainTm.text = "00:00:00";
            Timer.instance.remove(this.onTick, this);
        }
    }
    public onShow() {
       if(this.list.numChildren) this.list.scrollToView(0);
        IconUtil.setImg(this.bg, "resource/image/pic/bg3.png");
        GGlobal.modelEightLock.CG4571(UIConst.FUWENJIANDING);
        GGlobal.modelEightLock.listen(ModelEightLock.msg_fwJD, this.onUpdate, this);
    }
    public onHide() {
        Timer.instance.remove(this.onTick, this);
        IconUtil.setImg(this.bg, null);
        this.list.numItems = 0;
        GGlobal.modelEightLock.remove(ModelEightLock.msg_fwJD, this.onUpdate, this);
    }
}