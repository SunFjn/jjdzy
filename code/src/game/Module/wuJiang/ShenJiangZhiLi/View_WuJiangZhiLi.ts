class View_WuJiangZhiLi extends fairygui.GComponent implements IPanel {
	
	public frame:fairygui.GLabel;
	public upBtn:Button1;
	public maxDesc:fairygui.GTextField;
	public current:fairygui.GTextField;
	public curLife:fairygui.GTextField;
	public curAttack:fairygui.GTextField;
	public curDefense:fairygui.GTextField;
	public curRealHurt:fairygui.GTextField;
	public upGroup:fairygui.GGroup;
	public next:fairygui.GTextField;
	public nextLife:fairygui.GTextField;
	public nextAttack:fairygui.GTextField;
	public nextDefense:fairygui.GTextField;
	public nextRealHurt:fairygui.GTextField;
	public downGroup:fairygui.GGroup;
	public currentLevel:fairygui.GTextField;
	public currentPower:fairygui.GTextField;
	public bottomDesc:fairygui.GTextField; 
	public adorn : fairygui.GImage;

	private VOdata;
  
  
	private heroName : string;

	private oneDesc : string;
	private twoDesc : string;
	private threeDesc : string;
	private fourDesc : string;

	private heroType : number; 
	/**等级 */
	private heroLevel : number;
	/**当前神力等级 */
	private godPower : number;
	/**当前的最大可升级星级 */
	private currentMaxLevel : number;
	/**当前的星级 */
	private starLevel : number;

	public static URL:string = "ui://zyx92gzwjxbq3m";

	public static createInstance():View_WuJiangZhiLi {
		return <View_WuJiangZhiLi><any>(fairygui.UIPackage.createObject("wuJiang","View_WuJiangZhiLi"));
	}

	public constructor() {
	   super();
	//    this.loadRes("wuJiang","wuJiang_atlas0");
	}
 
	//protected constructFromXML(xml: any): void {
	//	super.constructFromXML(xml); 
	// protected childrenCreated(): void {
	// 	GGlobal.createPack("wuJiang") 
	// 	this.view = fairygui.UIPackage.createObject("wuJiang","View_WuJiangZhiLi").asCom;
	// 	this.contentPane = this.view;
	// 	this.isShowMask =  true;  
		
	// 	CommonManager.parseChildren(this.view, this); 
	// 	this.upBtn.addClickListener(this.onClickUpBtn, this);
	// 	super.childrenCreated();
	// }  
	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}
  
	private onClickUpBtn(){
		if((this.starLevel) >= this.currentMaxLevel){
			GGlobal.modelWuJiang.CGGetGodPower(this.heroType);
		} else{
			ViewCommonWarn.text("请先升级星级");
		} 
	}
 
	private isShow(group : fairygui.GGroup, isVisible : boolean){ 
		group.visible = isVisible; 
	}
 
	private setCurrentLevel(name : string, maxLevel : number, life : number, attack : number, defense : number, realHurt : number, curLevel : number){
		this.current.text = "[color=#ffee79]当前阶段: [/color][color=#fffccc]" + name + "达到" + maxLevel + "星[/color][color=#58ff31](" + curLevel + "/" + maxLevel + ")[/color]";
		if(this.godPower == 0){
			this.curLife.text = "[color=#a0a0a0]" + this.oneDesc + " +" + life + "[/color]"; 
			this.curAttack.text = "[color=#a0a0a0]" + this.twoDesc + " +" + attack + "[/color]";
			this.curDefense.text = "[color=#a0a0a0]" + this.threeDesc + " +" + defense + "[/color]";
			this.curRealHurt.text = "[color=#a0a0a0]" + this.fourDesc + " +" + realHurt + "[/color]"; 
		} else {
			this.curLife.text = "[color=#ffffff]" + this.oneDesc + "[/color][color=#58ff31] +" + life + "[/color]";
			this.curAttack.text = "[color=#ffffff]" + this.twoDesc + "[/color][color=#58ff31] +" + attack + "[/color]";
			this.curDefense.text = "[color=#ffffff]" + this.threeDesc + "[/color][color=#58ff31] +" + defense + "[/color]";
			this.curRealHurt.text = "[color=#ffffff]" + this.fourDesc + "[/color][color=#58ff31] +" + realHurt + "[/color]";
		}
	}
 
	private setNextLevel(name : string, maxLevel : number, life : number, attack : number, defense : number, realHurt : number, curLevel : number){
		if(this.starLevel >= this.currentMaxLevel){ 
			this.next.text = "[color=#ffee79]下一阶段: [/color][color=#fffccc]" + name + "达到" + maxLevel + "星[/color][color=#58ff31](" + curLevel + "/" + maxLevel + ")[/color]";
		} else {
			this.next.text = "[color=#ffee79]下一阶段: [/color][color=#fffccc]" + name + "达到" + maxLevel + "星[/color][color=#ee1515](" + curLevel + "/" + maxLevel + ")[/color]";
		}
		this.nextLife.text = "[color=#a0a0a0]" + this.oneDesc + " +" + life + "[/color]"; 
		this.nextAttack.text = "[color=#a0a0a0]" + this.twoDesc + " +" + attack + "[/color]";
		this.nextDefense.text = "[color=#a0a0a0]" + this.threeDesc + " +" + defense + "[/color]";
		this.nextRealHurt.text = "[color=#a0a0a0]" + this.fourDesc + " +" + realHurt + "[/color]"; 
	}
	/**设置等级为0的情况下的显示 */ 
	private setZeroState(name : string, maxLevel : number, life : number, attack : number, defense : number, realHurt : number, curLevel : number){
		this.current.text = "[color=#ffee79]下一阶段: [/color][color=#fffccc]" + name + "达到" + maxLevel + "星[/color][color=#ee1515](" + curLevel + "/" + maxLevel + ")[/color]";
		this.curLife.text = "[color=#a0a0a0]" + this.oneDesc + " +" + life + "[/color]"; 
		this.curAttack.text = "[color=#a0a0a0]" + this.twoDesc + " +" + attack + "[/color]";
		this.curDefense.text = "[color=#a0a0a0]" + this.threeDesc + " +" + defense + "[/color]";
		this.curRealHurt.text = "[color=#a0a0a0]" + this.fourDesc + " +" + realHurt + "[/color]"; 
	}

	openPanel(pData?: any){
		GGlobal.control.listen(Enum_MsgType.WUJIANG_SHENGJIANGZHILI,this.updateView, this);
		this.VOdata = Config.herogod_211;

		// this.heroName = "武将·" + this._args.name 
		// this.heroType = this._args.type;
		// this.godPower = Model_WuJiang.wujiangGodPower[this.heroType] || 0;
		// this.starLevel = this._args.star || 0;
		this.heroName = "武将·" + Model_WuJiang.wujiangzhiliName; 
		this.heroType = Model_WuJiang.wujiangzhiliType;
		this.godPower = Model_WuJiang.wujiangGodPower[this.heroType] || 0;
		this.starLevel = Model_WuJiang.wujiangzhiliStar || 0;
		this.updateView({id : this.heroType, level : this.godPower});
		this.upBtn.addClickListener(this.onClickUpBtn, this);
	}
   
	closePanel(pData?: any){ 
		GGlobal.control.remove(Enum_MsgType.WUJIANG_SHENGJIANGZHILI,this.updateView, this);
		this.VOdata = null;
		GGlobal.control.notify(Enum_MsgType.WUJIANG_SHENGJIANGZHILIUPDATE);
	}
  
	public updateView(arg){
		let isnoUpgrad = (!arg.level) || arg.level == 0
		let heroId = this.heroType * 100 + (isnoUpgrad ? 1 : arg.level);
		let curData = this.VOdata[heroId];
		this.godPower = Model_WuJiang.wujiangGodPower[this.heroType] || 0;
		this.currentMaxLevel = 2;
		this.currentLevel.text = (arg.level ? arg.level : 0)+ "阶神将之力";
		let max = Config.hero_211[this.heroType].star;
		this.maxDesc.visible = (curData.star == max);
		this.adorn.visible = (curData.star == max); 
		this.upBtn.visible = !(curData.star == max); 
		if(curData.star == max){//消除红点
			GGlobal.reddot.setCondition(UIConst.WUJIANGZHILI, this.heroType, false);
		}
		this.upBtn.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.WUJIANGZHILI, this.heroType);
		this.upBtn.text = (arg.level == 0 || arg.level == undefined)? "激 活" : "升 阶";	
		this.isShow(this.upGroup, true);
		this.isShow(this.downGroup, arg.level > 0);
 		 
		if(isnoUpgrad){ 
			this.currentPower.text = "战力: [color=#58ff31]0[/color]"
		} else {
			this.currentPower.text = "战力: [color=#58ff31]" + (curData.power) + "[/color]";
		}
		let nextData; 
		this.setDesc(JSON.parse(curData.attr));
		if(curData.star >= max){ 
			this.isShow(this.downGroup, false);
			this.upBtn.visible = false; 
			this.maxDesc.visible = true;
		} else if(arg.level > 0) {
			this.isShow(this.downGroup, true); 
			this.upBtn.visible = true;
			this.maxDesc.visible = false;
			nextData = this.getNextData(heroId);
			let temp = JSON.parse(nextData.attr);
			this.currentMaxLevel = nextData.star 
			this.setNextLevel(this.heroName, nextData.star,temp[0][1],temp[1][1], temp[2][1], temp[3][1], this.starLevel);
		}
		let temp = JSON.parse(curData.attr);


		if((arg.level == 0 || !arg.level)){
			this.setZeroState(this.heroName, curData.star,temp[0][1],temp[1][1], temp[2][1], temp[3][1], this.starLevel);
			if(this.starLevel >= curData.star){	//满足条件，显示绿色
				this.setCurrentLevel(this.heroName, curData.star,temp[0][1],temp[1][1], temp[2][1], temp[3][1], this.starLevel); 
			}
		} else {
			this.setCurrentLevel(this.heroName, curData.star,temp[0][1],temp[1][1], temp[2][1], temp[3][1], this.starLevel);
		}
	}
  
	private getNextData(heroId : number){
		let isGet = false;
		for(let key in this.VOdata){
			if(isGet){
				return this.VOdata[key]
			}
			if(heroId == this.VOdata[key].id){
				isGet = true;
			}
		}
	}

	private setDesc(temp){
		let data = Config.jssx_002;
		this.oneDesc = data[temp[0][0]].name;
		this.twoDesc = data[temp[1][0]].name;
		this.threeDesc = data[temp[2][0]].name;
		this.fourDesc = data[temp[3][0]].name;
	}
}