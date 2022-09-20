class LiangCaoHead extends fairygui.GComponent {
	public n0: fairygui.GImage;
	public headIcon: fairygui.GLoader;
	public frameIcon: fairygui.GLoader;
	public lbState: fairygui.GRichTextField;
	public imgDeaded: fairygui.GImage;
	public static URL: string = "ui://mbcu0qc0hd204";
	public static createInstance(): LiangCaoHead {
		return <LiangCaoHead><any>(fairygui.UIPackage.createObject("liangcao", "LiangCaoHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	timeUpdate = () => {
		let self = this;
		let now = Model_GlobalMsg.getServerTime();
		let time =self._time- now;
		if (time >= 0 ) {
			self.lbState.text = "复活:" + ((time / 1000) >> 0) + "s";
		} else {
			self.lbState.text = "<font color='#15f234'>已刷新</font>";
		}
	}

	clean() {
		Timer.remove(this.timeUpdate, this);
	}

	_time = 0;
	setdata = (idx) => {
		let self = this;
		let data = GGlobal.modelLiangCao.bossData;
		if (data && data[idx]) {
			let item = data[idx];
			let st = item.st;
			let id = item.id;
			let time = item.time;
			let taskst = item.taskst;
			let now = Model_GlobalMsg.getServerTime();
			if(time <= now){
				self.lbState.text = "<font color='#15f234'>已刷新</font>";
			}

			self._time = time;

			let imgkey = Config.NPC_200[id].head;
			ImageLoader.instance.loader(RoleUtil.getHeadImg(imgkey + ""), self.headIcon);
			self.imgDeaded.visible = taskst == 1;
			Timer.listen(self.timeUpdate, self, 1000);
		}
	}
}