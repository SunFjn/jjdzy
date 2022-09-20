/**
 * Model_HouseKeeper
 * 家丁
 */
class Model_HouseKeeper extends BaseModel {

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(11352, this.GC_HouseKeeper_openUI_11352, this);
		mgr.regHand(11354, this.GC_HouseKeeper_upHouseKeeper_11354, this);
		mgr.regHand(11356, this.GC_HouseKeeper_upHouseKeeperLevel_11356, this);
	}

	public static costID = 410450;
	public jdID = 0;
	public jdLv = 0;
	public jdExp = 0;

	/**11351  打开界面 */
	public CG_HouseKeeper_openUI_11351(): void {
		var bates = this.getBytes();
		this.sendSocket(11351, bates);
	}

	/**11352 I-I-I 打开界面返回 I:家丁ididI:家丁等级levelI:家丁当前经验curExp*/
	public GC_HouseKeeper_openUI_11352(self: Model_HouseKeeper, data: BaseBytes): void {
		self.jdID = data.readInt();
		self.jdLv = data.readInt();
		self.jdExp = data.readInt();
		self.hasData = true
		self.checkNotice();
		GGlobal.control.notify(UIConst.HOME_JIADING);
	}

	/**11353  晋升家丁 */
	public CG_HouseKeeper_upHouseKeeper_11353(): void {
		var bates = this.getBytes();
		this.sendSocket(11353, bates);
	}

	/**11354 B-I 晋升家丁返回 B:状态 0成功 1达到上限 2条件不足 3需要的道具不足stateI:家丁idindex*/
	public GC_HouseKeeper_upHouseKeeper_11354(self: Model_HouseKeeper, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readInt();
		if (result == 0) {
			self.jdID = arg2;
			self.checkNotice();
			GGlobal.control.notify(UIConst.HOME_JIADING);
			self.notifyGlobal(HomeModel.HOME_SCENE_UPDATE);
		}
	}

	/**11355 B 升级家丁 B:类型 1升级 2一键type*/
	public CG_HouseKeeper_upHouseKeeperLevel_11355(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(11355, bates);
	}

	/**11356 B-I-I 升级家丁返回 B:0成功 1级数已满级 2材料不足stateI:家丁等级levelI:家丁当前经验curLevel*/
	public GC_HouseKeeper_upHouseKeeperLevel_11356(self: Model_HouseKeeper, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readInt();
		let arg3 = data.readInt();
		if (result == 0) {
			self.jdLv = arg2;
			self.jdExp = arg3;
			self.checkNotice();
			GGlobal.control.notify(UIConst.HOME_JIADING);
		}
	}

	hasData = false
	public checkNotice() {
		let s = this;
		if (!s.hasData) {
			return;
		}
		let reddot = GGlobal.reddot;
		let red1 = s.checkUpJie();
		let red2 = s.checkJinSheng();
		reddot.setCondition(UIConst.HOME_JIADING, 0, red1 || red2);
		reddot.setCondition(UIConst.HOME_JIADING, 1, red1);
		reddot.setCondition(UIConst.HOME_JIADING, 2, red2);
		reddot.notify(UIConst.HOME_JIADING);
	}

	public checkUpJie() {
		let cfg = Config.fdsj_019[GGlobal.homemodel.home_level];
		let model = this;
		if (Math.floor((model.jdLv + 1) / 10) > cfg.jiading) {
			return false;
		}
		let count = Model_Bag.getItemCount(Model_HouseKeeper.costID);
		if (count <= 0) {
			return false;
		}
		return true;
	}

	public checkJinSheng() {
		let model = this;
		let cfg = Config.jdjins_021[model.jdID];
		if (cfg.next > 0 && model.jdLv >= cfg.tiaojian) {
			let costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg.xiaohao))[0];
			let count = Model_Bag.getItemCount(costItem.id);
			if (count >= costItem.count) {
				return true;
			}
		}
		return false;
	}

}