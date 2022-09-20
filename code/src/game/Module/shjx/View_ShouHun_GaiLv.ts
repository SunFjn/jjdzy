class View_ShouHun_GaiLv extends UIModalPanel {

	public list:fairygui.GList;

	public curStarLv:fairygui.GTextField;
	public hasCount:fairygui.GTextField;
	public curDesc:fairygui.GTextField;
	public upBtn:fairygui.GButton;
	public maxLvDesc:fairygui.GGroup;

	private xilianNum : number = 0;

	public static URL:string = "ui://4aepcdbwdm9548";

	public static createInstance():View_ShouHun_GaiLv {
		return <View_ShouHun_GaiLv><any>(fairygui.UIPackage.createObject("shouhunJX","View_ShouHun_GaiLv"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(VSHGaiLvItem.URL, VSHGaiLvItem);
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("shouhunJX", "View_ShouHun_GaiLv").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.curStarLv = <fairygui.GTextField><any>(this.view.getChild("curStarLv"));
		this.hasCount = <fairygui.GTextField><any>(this.view.getChild("hasCount"));
		this.curDesc = <fairygui.GTextField><any>(this.view.getChild("curDesc"));
		this.upBtn = <fairygui.GButton><any>(this.view.getChild("upBtn"));
		this.maxLvDesc = <fairygui.GGroup><any>(this.view.getChild("maxLvDesc"));
		this.list.itemRenderer = this.renderHander 
		this.list.callbackThisObj = this;
		super.childrenCreated();
	}

	private _listData:Ishjxxl_266[];
	protected onShown() {
		let s = this;
		GGlobal.control.listen(UIConst.SHJXXILIAN_SHUOMING, s.bagUpdate, s);
		s.upBtn.addClickListener(s.onClickUpBtn, s);
		GGlobal.modelSHJX.listen(ModelSH.msg_yijianxilian, this.xilianResult, this);//一键洗练
		s.info = s._args;
		if(s._listData == null){
			s._listData = [];
			for(let keys in Config.shjxxl_266){
				let v = Config.shjxxl_266[keys];
				s._listData.push(v);
			}
		} 
		s.list.numItems = s._listData.length;
		s.showInfo();
	}

	private bagUpdate(){ 
		let self = this; 
		self.setCurDesc(self.xilianNum,self.curIndex);
	}
	/**当前的洗练星级 */
	private curIndex : number;
	private onClickUpBtn(){
		let self = this;
		if(self.isCanUp){
			GGlobal.modelSHJX.CG5693(self.info.yj, self.info.id, self.curIndex);
		} else {
			//ViewCommonWarn.text("道具不足");
			 View_QuickBuy_Panel.show(VoItem.create(410049), this._neddCt);
		}
		
	}
	/**当前的兽魂数据 */
	private info: Ishjx_266
	private arr : number[];
	private isCanUp : boolean;
	private showInfo(){
		let self = this;
		self.isCanUp = false;
		self.arr = [];
		let data = ModelSH.servDatas[self.info.yj];
		if(data){
			for(let i = 0; i < data.datas.length; i++){
				let tempDt = data.datas[i];
				if(tempDt.position == self.info.id){
					self.xilianNum = tempDt.xiLianNum;
					let max = 0;
                    let curIndex;
					//洗练次数少于已满级的次数的时候
					if(self.xilianNum < Number(JSON.parse(Config.shjxxl_266[7].time)[0][0])){
						for (let i = 0; i < 7; i++) {
							let cfg = Config.shjxxl_266[i + 1]
							let t = Number(JSON.parse(cfg.time)[0][0])
							self.arr.push(t);
							if (self.xilianNum >= t) {
								curIndex = i + 1;
							}
							if (t > max) {
								max = t;
							}
                    	}
					} else {
						curIndex = 7;
						max = Number(JSON.parse(Config.shjxxl_266[7].time)[0][0])
					}
					let xilianNum = self.xilianNum > max ? max : self.xilianNum;
					self.curStarLv.text = "当前星级 : " + curIndex + "星";
					self.curIndex = curIndex;
					self.hasCount.text = "已洗练 : " + xilianNum + "次";
					if(curIndex == 7){
						self.upBtn.visible = false;
						self.maxLvDesc.visible = true;
						self.curDesc.visible = false;
					} else {
						self.curDesc.visible = true;
						self.upBtn.visible = true;
						self.maxLvDesc.visible = false;
						self.setCurDesc(xilianNum, curIndex);
					}
					break;
				}
			}
		}
	}

	//Model_Bag.getItemCount(410049), JSON.parse(Config.xtcs_004[5601].other)[0][2]
	// let a = [0, 150, 300, 500, 750, 1100, 1500]//对应0 10 50 200 500 800 1500次
	/**参数1：已洗练的次数，参数2：当前星级 */
	private setCurDesc(hasCount : number, star : number){
		let self = this; 
		let a = self.arr//[0, 150, 300, 500, 750, 1100, 1500]//对应0 10 50 200 500 800 1500次
		let curHasCount = Model_Bag.getItemCount(410049);//当前有的洗练石
		let xiaohao; 
		xiaohao = (a[star]) - hasCount;
		xiaohao *= Number(JSON.parse(Config.xtcs_004[5601].other)[0][2]);
		if(curHasCount >= xiaohao){ 
			self.isCanUp = true;
			self.curDesc.text = "消耗[color=#00ff00](" + curHasCount + "/" + xiaohao + ")[/color]个洗练石可直接升至[color=#FFCC00]" + (star + 1) + "星[/color]";	
			this._neddCt = 0		
		} else {
			self.isCanUp = false;
			self.curDesc.text = "消耗[color=#ff0000](" + curHasCount + "/" + xiaohao + ")[/color]个洗练石可直接升至[color=#FFCC00]" + (star + 1) + "星[/color]";
			this._neddCt = xiaohao - curHasCount
		}
	}
	private _neddCt = 0;

	private xilianResult(arg){
		let self = this; 
		self.curIndex += 1;
		self.xilianNum += arg.count;
		self.curStarLv.text = "当前星级 : " + self.curIndex + "星";
		self.hasCount.text = "已洗练 : " + self.xilianNum + "次";
 
		if(self.curIndex < 7){ 
			self.curDesc.visible = true;
			self.upBtn.visible = true;
			self.maxLvDesc.visible = false;
			self.setCurDesc(self.xilianNum, self.curIndex);
		} else {
			self.curDesc.visible = false;
			self.upBtn.visible = false;
			self.maxLvDesc.visible = true;
		}

	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.SHJXXILIAN_SHUOMING);
		GGlobal.control.remove(UIConst.SHJXXILIAN_SHUOMING, s.bagUpdate, s);
		GGlobal.modelSHJX.remove(ModelSH.msg_yijianxilian, this.xilianResult, this);//一键洗练
		s.list.numItems = 0
		s.upBtn.removeClickListener(s.onClickUpBtn, s); 
		s.arr = [];
		s.isCanUp = false;
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VSHGaiLvItem = obj as VSHGaiLvItem;
		gird.vo = this._listData[index];
	}

}
