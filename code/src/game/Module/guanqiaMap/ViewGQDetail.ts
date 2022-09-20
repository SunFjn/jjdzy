class ViewGQDetail extends UIModalPanel {
    public bg: fairygui.GImage;
    public static inst: ViewGQDetail;
    public roadList:fairygui.GList;

    private roadVo:any[];

    public constructor() {
        super();
        ViewGQDetail.inst = this;
       fairygui.UIObjectFactory.setPackageItemExtension(ItemGQDetail.URL, ItemGQDetail);
        fairygui.UIObjectFactory.setPackageItemExtension(RoadItem.URL, RoadItem);
        this.loadRes("guanqiaMap", "guanqiaMap_atlas0");
    }
    public btnClose;


    protected childrenCreated() { 
        GGlobal.createPack("guanqiaMap");
        this.view = fairygui.UIPackage.createObject("guanqiaMap", "ViewGQDetail").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this); 
 
        this.btnClose.addClickListener(this.closeEventHandler, this);
 
        this.roadList.setVirtual();
        this.roadList.callbackThisObj = this;
        this.roadList.itemRenderer = this.itemRenderer;
        this.roadList.scrollItemToViewOnClick = false; 
        this.roadList.selectionMode = fairygui.ListSelectionMode.Single;
 
        super.childrenCreated();
    }

    private itemRenderer(index : number, item : RoadItem){
        let temp : RoadItemVO[] = this.roadVo[index];
        for(let i = 0; i < this.roadVo[index].length;i++){
            if(temp[i]){
                this.roadVo[index][i].index = index;
            }
        }
        item.setData(this.roadVo[index]);
    }
    private onUpdate() {
         const lib = Config.dgq_205;
         let index = 0;
         this.roadVo = [];
         let tempVO = [];
        for (let key in lib) {
            index++;
            let vo = new RoadItemVO();
            vo.init(lib[key]);
            tempVO.push(vo);
        }
        let index2 = 0;
        while(index > 0){
            index -= 3;
            if(tempVO[index2] && tempVO[index2 + 1] && tempVO[index2 + 2]){
                this.roadVo.push([tempVO[index2], tempVO[index2 + 1], tempVO[index2 + 2]]);
            } else if(tempVO[index2] && tempVO[index2 + 1]){
                this.roadVo.push([tempVO[index2], tempVO[index2 + 1]]);
            } else if(tempVO[index2]){
                this.roadVo.push([tempVO[index2]]);
            }
            index2 += 3;
        }
        this.roadList.numItems = this.roadVo.length;
         
        //向下取整
        let current = Math.floor(ModelGuanQia.curGQID / 3);  //计算当前的 item 序号 
        if(ModelGuanQia.hasPassed()){
            this.roadList.addSelection(current, true); //跳转到头像的的优先
        } else { 
            for(let i = 0; i < this.roadVo.length; i++){
                let temp : any[] = this.roadVo[i];
                for(let j = 0; j < temp.length; j++){
                    if(GGlobal.modelGuanQia.curGQNotice(temp[j])){
                        this.roadList.addSelection(i, true);   //红点     
                        return;
                    }
                    if(temp[j].ID == ModelGuanQia.curGQID){//没有找到红点，跳出循环
                        break;
                    }
                }
            } 
            if(current * 3 == ModelGuanQia.curGQID && !ModelGuanQia.hasPassed()){//因为这里是向下取整的，当挑战到最右边的位置的时候，要打开 -1 的item项目
                this.roadList.addSelection(current - 1, true);
            } else {
                this.roadList.addSelection(current, true);
            }
        }
    }
    public moveTo(id: number) {
        let index = 0;//当前所在的 item 的序号
        let vo : RoadItemVO[];
        //找到对应关卡所在的 vo 
        for(let i = 0; i < this.roadVo.length; i++){
            let temp : RoadItemVO[] = this.roadVo[i];
            for(let j = 0; j < 3; j++){
                if(temp[j]){
                    if(temp[j].ID == id){
                        index = i;
                        vo = this.roadVo[i];
                        break;
                    }
                }
            }
        }
        for(let i = 0; i < vo.length; i++){
            if(vo[i].ID == id){
                //找到要移动的 位置
                GGlobal.modelGuanQia.notify(ModelGuanQia.msg_moveTween, {index : index, pos : i});
                break;
            }
        }
        

    }
 
    private updateSingle(id: number) {
         this.roadList.numItems = this.roadVo.length;
     
    }
    public onShown() {
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_gqGetRed, this.updateSingle, this);
        GGlobal.modelGuanQia.listen(ModelGuanQia.msg_addEffect, this.addEffect, this);
        this.onUpdate();
    }
    public onHide() {
        GGlobal.layerMgr.close(this.panelId);
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_gqGetRed, this.updateSingle, this);
        GGlobal.modelGuanQia.remove(ModelGuanQia.msg_addEffect, this.addEffect, this);
        this.roadList.numItems = 0;
        if(this.eff){
			EffectMgr.instance.removeEff(this.eff);
			this.displayListContainer.removeChild(this.eff);
            this.eff = null;
		}
    }
    public static trytoOpen() { 
        if (ModuleManager.isOpen(UIConst.GUANQIAMAP, true)) {
            GGlobal.layerMgr.open(UIConst.GUANQIAMAP);
        }
    } 

    public guideClosePanel() { 
        // let btn = this.btnClose; 
        // GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
    } 
 
    private eff: Part;
    private addEffect(){ 
        if(!this.eff) {
            this.eff = EffectMgr.addEff("eff/200007/ani", this.displayListContainer, 617, 21, 1000, -1,true,1,Main.skill_part_type);
            this.eff.mc.scaleX = -1;
            this.displayListContainer.addChild(this.eff);
        }
    }
}