class ViewGmPanel extends UIPanelBase {

	public c1: fairygui.Controller;
	public list: fairygui.GList;
	public activityList: fairygui.GList;
	public labTitle: fairygui.GTextField;
	public tab0: fairygui.GButton;
	public tab1: fairygui.GButton;
	public tab2: fairygui.GButton;
	public tab3: fairygui.GButton;
	public tab4: fairygui.GButton;
	public tab5: fairygui.GButton;
	public proBt: fairygui.GButton;

	public static URL: string = "ui://vm9a8xq87jrg0";
	public constructor() {
		super();
		this.setSkin("GM", "", "ViewGmPanel");
		Timer.instance.listen(this.autoWork, this, 5000);
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ChildGm.URL, ChildGm);
		fairygui.UIObjectFactory.setPackageItemExtension(ViewGmTip.URL, ViewGmTip);
		fairygui.UIObjectFactory.setPackageItemExtension(ChildGmTip.URL, ChildGmTip);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_SkillTest.URL, Child_SkillTest);
		fairygui.UIObjectFactory.setPackageItemExtension(ChildActivityGm.URL, ChildActivityGm);
		fairygui.UIObjectFactory.setPackageItemExtension(GmBar.URL, GmBar);
		fairygui.UIObjectFactory.setPackageItemExtension(ChildTest.URL, ChildTest);
	}

	protected initView(): void {
		super.initView();
		this.proBt.addClickListener(this.openPro, this);
		this.c1.selectedIndex = -1;

		this.list.itemRenderer = this.renderListItem;
		this.list.callbackThisObj = this;
		this.list.setVirtual();

		this.activityList.itemRenderer = this.renderHandler;
		this.activityList.callbackThisObj = this;
		this.activityList.setVirtual();
		this.initConfig();
	}

	private openPro() {
		GGlobal.layerMgr.open(UIConst.GM_PROTOCOL);
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		var item = obj as ChildActivityGm;
		item.show(this._cfgArr[index]);
	}

	protected onShown(): void {
		this.addListen();
		this.updateSelect(0);
		this.c1.selectedIndex = 0;
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onTouchTapHandler, this);
	}


	private removeListen(): void {
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.onTouchTapHandler, this);
		GGlobal.layerMgr.close(UIConst.GM);
	}

	public gmConfig = [];
	public initConfig() {

		var self = this;
		GGlobal.modelGM.listen(Model_GM.jsonReady, self.initGMData, self);
		RES.getResByUrl(RESManager.getVersionUrl("resource/config/gm.json"), (dt) => {
			GGlobal.modelGM.notify(Model_GM.jsonReady, dt);
		}, self, RES.ResourceItem.TYPE_JSON);

		//style  bar样式 1:物品链接库（自定义） 2.无连接 有输入框 3：没有输入框 5：问鼎天下选择框
		//type 大类型
		//index 小类型
		//title 标题 最多2个
		//text 对应的初始值
		// this.gmConfig = []
		// var roleConfig = [];
		// roleConfig.push({ style: 1, type: 1, index: 10001, title: ["添加物品", "数量："], text: ["强化石", "1"] });
		// roleConfig.push({ style: 3, type: 1, index: 10002, title: ["清空背包"] });
		// //添加属性
		// roleConfig.push({ style: 2, type: 1, index: 3, title: ["添加铜币"], text: ["1000"] });
		// roleConfig.push({ style: 2, type: 1, index: 4, title: ["充值商品id"], text: ["1"] });
		// roleConfig.push({ style: 2, type: 1, index: 5, title: ["添加等级"], text: ["1"] });
		// roleConfig.push({ style: 2, type: 1, index: 6, title: ["添加经验"], text: ["1000"] });
		// roleConfig.push({ style: 2, type: 1, index: 99, title: ["增加转生"], text: ["1001"] });
		// roleConfig.push({ style: 2, type: 1, index: 9, title: ["阵魂"], text: ["100"] });
		// roleConfig.push({ style: 2, type: 1, index: 13, title: ["技能宝物点"], text: ["100"] });
		// roleConfig.push({ style: 2, type: 1, index: 0, title: ["增加货币类型", "数量"], text: ["1", "1000"] });

		// var sysConfig = []; //系统GM
		// sysConfig.push({ style: 2, type: 2, index: 1, title: ["系统重置"], text: ["1001"] });
		// sysConfig.push({ style: 1, type: 2, index: 2, title: ["个人邮件物品", "数量："], text: ["强化石", "1"] });
		// sysConfig.push({ style: 1, type: 2, index: 3, title: ["全服邮件物品", "数量："], text: ["强化石", "1"] });
		// sysConfig.push({ style: 3, type: 2, index: 4, title: ["清空所有邮件"], text: [""] });
		// sysConfig.push({ style: 2, type: 2, index: 14, title: ["开启关卡数"], text: ["10"] });
		// sysConfig.push({ style: 2, type: 2, index: 15, title: ["铜雀台"], text: ["10"] });
		// sysConfig.push({ style: 2, type: 2, index: 16, title: ["过关斩将难度", "关卡"], text: ["1", "1001"] });
		// sysConfig.push({ style: 2, type: 2, index: 17, title: ["一骑当千难度", "增加次数"], text: ["1", "1"] });
		// sysConfig.push({ style: 2, type: 2, index: 18, title: ["三国无双", "类型排行榜"], text: ["1"] });
		// sysConfig.push({ style: 2, type: 2, index: 19, title: ["后台cdkey"], text: [""] });
		// sysConfig.push({ style: 2, type: 2, index: 20, title: ["bsh指令区服id", "文本字符串"], text: ["1", "1"] });

		// var actConfig = []; //活动GM
		// actConfig.push({ style: 3, type: 3, index: 1, break: 1, title: ["查询服务器时间:"] });
		// actConfig.push({ style: 4, type: 3, index: 1, title: ["修改服务器时间:"], text: ["2017-04-04 00:01:00"] });
		// actConfig.push({ style: 3, type: 3, index: 2, break: 1, title: ["查询开服时间:"] });
		// actConfig.push({ style: 4, type: 3, index: 2, title: ["修改开服时间:"], text: ["2017-04-04 00:01:00"] });
		// actConfig.push({ style: 2, type: 3, index: 3, title: ["孟获0,1,2"], text: ["1"] });
		// actConfig.push({ style: 2, type: 3, index: 4, title: ["决斗无双状态0,1,2"], text: ["0"] });
		// actConfig.push({ style: 3, type: 3, index: 5, break: 1, title: ["查询合服时间:"] });
		// actConfig.push({ style: 4, type: 3, index: 5, title: ["修改合服时间:"], text: ["2017-04-04 00:01:00"] });
		// actConfig.push({ style: 3, type: 3, index: 6, break: 1, title: ["结束合服活动"] });
		// actConfig.push({ style: 2, type: 3, index: 7, title: ["军团战", "开1关2"], text: ["1", "1"] });
		// actConfig.push({ style: 2, type: 3, index: 7, title: ["军团战", "添加积分"], text: ["2", "100"] });
		// actConfig.push({ style: 2, type: 3, index: 8, title: ["阵营战", "开1关0"], text: ["1", "1"] });
		// actConfig.push({ style: 2, type: 3, index: 9, title: ["乱世枭雄", "0准备1开2关"], text: ["1"] });
		// actConfig.push({ style: 2, type: 3, index: 10, title: ["枭雄争霸", "0开始1准备2战斗3上传4结束"], text: ["1"] });
		// actConfig.push({ style: 2, type: 3, index: 11, title: ["乱世枭雄段位", "排名"], text: ["13", "1"] });
		// actConfig.push({ style: 2, type: 3, index: 12, title: ["吕布0,1"], text: ["1"] });

		// var battleConfig = []; //战斗GM
		// battleConfig.push({ style: 1, type: 4, index: 1, title: ["战斗"], text: ["1000"] });
		// battleConfig.push({ style: 2, type: "addEnemy", index: 2, title: ["添加敌人"], text: ["32009"] });
		// battleConfig.push({ style: 2, type: "removeEnemys", index: 2, title: ["移除关卡所有敌人"], text: [] });

		// var ontherConfig = []; //其他GM
		// ontherConfig.push({ style: 3, type: 5, index: 1, title: ["完成当前任务"] });
		// ontherConfig.push({ style: 2, type: 5, index: 2, title: ["接取任务"], text: ["1"] });
		// ontherConfig.push({ style: 2, type: 5, index: 3, title: ["热更开始区号", "结束区号"], text: ["1", "1"] });
		// ontherConfig.push({ style: 2, type: 5, index: 4, title: ["脚本开始区号", "结束区号"], text: ["1", "1"] });
		// ontherConfig.push({ style: 3, type: 5, index: 5, title: ["请求跨服"] });
		// var activityConfig = []; //活动GM
		// activityConfig.push({ style: 2, type: 6, index: 1, title: ["活动Id", "期数", "开始时间", "结束时间"], text: ["1", "1", "time", "time"] });
		// activityConfig.push({ style: 2, type: 6, index: 2, title: ["活动Id", "期数", "1开启2关闭"], text: ["1", "1", "1"] });
		// activityConfig.push({ style: 2, type: 6, index: 3, title: ["活动Id", "期数", "开始时间", "结束时间", "序号"], text: ["1", "1", "time", "time", "1"] });
		// activityConfig.push({ style: 2, type: 6, index: 4, title: ["1:战力2:正式", "轮数", "state: 状态 1：准备，2：战斗"], text: ["1", "1", "1"] });
		// activityConfig.push({ style: 2, type: 6, index: 5, title: ["获取开始的活动"], text: ["1"] });

		// this.gmConfig.push(roleConfig);
		// this.gmConfig.push(sysConfig);
		// this.gmConfig.push(actConfig);
		// this.gmConfig.push(battleConfig);
		// this.gmConfig.push(ontherConfig);
		// this.gmConfig.push(activityConfig);
	}


	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: ChildGm = obj as ChildGm;
		item.vo = this._cfgArr[index];
	}


	protected onTouchTapHandler(): void {
		this.updateSelect(this.c1.selectedIndex);
	}

	public updateSelect(index: number): void {
		this.updateConfig(index);
	}

	public static updateSeverInfo(arg1, arg2, arg3): void {
		var type: number = arg1;
		var content: string = arg2;
		var index: number = arg3;

		var slef: ViewGmPanel = (GGlobal.layerMgr.getView(UIConst.GM) as ViewGmPanel);
		var info = slef.gmConfig[type - 1];
		for (var i: number = 0; i < info.length; i++) {
			var data = info[i];
			if (data.index == index && data.break != 1) {
				if (index == 5) {
					let cStr = "";
					let cArr = content.split(":")
					for (let k = 0; k < cArr.length; k++) {
						if (cArr[k] == "" || cArr[k] == null) continue;
						let kArr = cArr[k].split("_");
						cStr += "序号" + kArr[0] + ",活动id" + kArr[1] + ",期数" + kArr[2] + ",开始时间" + DateUtil.getYMDHMS(Number(kArr[3])) + ",结束时间" + DateUtil.getYMDHMS(Number(kArr[4])) + ",状态" + kArr[5];
						if (k < cArr.length - 1) {
							cStr += ";";
						}
					}
					data.text = [cStr]
				} else {
					data.text = content;
				}
			}
		}
		slef.reflash();
	}

	public reflash(): void {
		var index: number = this.c1.selectedIndex;
		this.updateConfig(index)
	}

	private _cfgArr: Array<any>
	public updateConfig(index: number) {
		this._cfgArr = this.gmConfig[index];
		if (!this._cfgArr)
			return;
		if (index < 5) {
			this.list.numItems = this._cfgArr.length;
		} else {
			this.activityList.numItems = this._cfgArr.length;
		}
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
	}

	private initGMData(data) {
		let self = this;
		let groups = data.groups;
		for (let i = 0; i < groups.length; i++) {
			let group = groups[i];
			let title = group.title;

			self.gmConfig.push(group.data);
		}
		self.onShown();
	}

	private autoWork() {
		// GMAutoWork.autoWork();
	}
}