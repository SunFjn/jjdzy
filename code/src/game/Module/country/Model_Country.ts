class Model_Country extends BaseModel {

	//1魏国2蜀国3吴国
	public static COUNTRY_WEI = 1
	public static COUNTRY_SHU = 2
	public static COUNTRY_WU = 3

	public static donateNumCoin = 0
	public static donateNumGold = 0

	public static getCountryName(type): string {
		switch (type) {
			case 1:
				return "魏国";
			case 2:
				return "蜀国";
			case 3:
				return "吴国";
			default:
				return "";
		}
	}

	public static getCouNameMin(type): string {
		switch (type) {
			case 1:
				return "魏";
			case 2:
				return "蜀";
			case 3:
				return "吴";
			default:
				return "";
		}
	}

	public static getCountryUrl(type): string {
		return Enum_Path.IMAGE_MODULES_URL + "country/countryb" + type + ".png";;
	}

	/**1471 随机国家 */
	public CG_RANDOM_COUNTRY(): void {
		var bates = this.getBytes();
		this.sendSocket(1471, bates);
	}
	/**1473 国家捐献 */
	public CG_COUNTRY_DONATION(): void {
		var bates = this.getBytes();
		this.sendSocket(1473, bates);
	}

	/**1475 捐献(铜钱、元宝) B:捐献类型1：铜钱2：元宝 */
	public CG_DONATION(type): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(1475, bates);
	}
	/**1477 选择国家 B:国家类型 */
	public CG_SELECT_COUNTRY(type): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(1477, bates);
	}

	/**1479 打开界面 */
	public CG_OPENUI(): void {
		var bates = this.getBytes();
		this.sendSocket(1479, bates);
	}



	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(1472, this.GC_RANDOM_COUNTRY, this);
		mgr.regHand(1474, this.GC_COUNTRY_DONATION, this);
		mgr.regHand(1476, this.GC_DONATION, this);
		mgr.regHand(1478, this.GC_SELECT_COUNTRY, this);
		mgr.regHand(1480, this.GC_OPENUI, this);
	}

	//随机国家 B:随机到的国家IdU:玩家姓名
	private GC_RANDOM_COUNTRY(self: Model_Country, data: BaseBytes): void {
		let country = data.readByte();
		Model_player.voMine.setCountry(country);
		var name = data.readUTF();
		GGlobal.control.notify(Enum_MsgType.COUNTRY_UPDATE);
		ViewCommonWarn.text("加入"+Model_Country.getCouNameMin(country)+"国成功")
	}

	//B:铜钱剩余捐献次数B:元宝剩余捐献次数
	private GC_COUNTRY_DONATION(self: Model_Country, data: BaseBytes): void {
		Model_Country.donateNumCoin = data.readByte();
		Model_Country.donateNumGold = data.readByte();
		GGlobal.control.notify(Enum_MsgType.COUNTRY_DONATE_UPDATE)
	}

	//捐献返回 B:捐献状态 1：成功2：次数不足3：铜钱不足4：元宝不足B:铜钱剩余捐献次数B:元宝剩余捐献次数
	private GC_DONATION(self: Model_Country, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 1) {
			Model_Country.donateNumCoin = data.readByte();
			Model_Country.donateNumGold = data.readByte();
			GGlobal.control.notify(Enum_MsgType.COUNTRY_DONATE_UPDATE)
		} else if (result == 2) {
			ViewCommonWarn.text("次数不足")
		} else if (result == 3) {
			ViewCommonWarn.text("铜钱不足")
		} else if (result == 4) {
			ModelChongZhi.guideToRecharge()
		} else {
			ViewCommonWarn.text("捐献失败")
		}
	}

	//返回国家 B:国家类型U:国家姓名
	private GC_SELECT_COUNTRY(self: Model_Country, data: BaseBytes): void {
		Model_player.voMine.setCountry(data.readByte());
		var name = data.readUTF();
		GGlobal.control.notify(Enum_MsgType.COUNTRY_UPDATE)
		ViewCommonWarn.text("加入国家成功")
	}
	//打开界面返回 I:君主等级I:君主头像I:君主头像框U:君主姓名U:丞相姓名U:大将军姓名
	private GC_OPENUI(self: Model_Country, data: BaseBytes): void {
		Model_Country.kingLv = data.readInt();
		Model_Country.kingHead = data.readInt();
		Model_Country.kingFrame = data.readInt();
		Model_Country.kingName = data.readUTF();//君主姓名
		Model_Country.ministerName = data.readUTF();//丞相姓名
		Model_Country.genName = data.readUTF();//大将军姓名
		GGlobal.control.notify(Enum_MsgType.COUNTRY_OPEN_UI)
	}
	public static kingLv: number;
	public static kingHead: number;
	public static kingFrame: number;
	public static kingName: string = "";
	public static ministerName: string = "";
	public static genName: string = "";

	public static checkDonate(): boolean {
		var coinCfg = Config.juanxian_712[1];
		var coinUse = ConfigHelp.SplitStr(coinCfg.USE)
		var coinCost = Number(coinUse[0][2]);
		return (Model_Country.donateNumCoin > 0 && Model_player.voMine.tongbi >= coinCost);
	}
}


