class GameConfig {
	/**
	 * 是否是正式测试
	*/
	public static realTest = 0;
	public static gameName = "逐鹿中原";
	public static uid = 0;
	public static pf = "fxzjsg01";
	public static channelId;
	public static username;
	public static account;
	/**H5，链接，安卓*/
	public static codeType = 2;
	public static productKey = '87969230';
	public static productCode = '33827237067467388509055845353587';
	public constructor() {
	}

	public static initProductInof() {
		const self = GameConfig;
		switch (self.codeType) {
			case 2:
				let arg = (window as any).loginArg;
				self.productKey = arg.productKey;
				self.productCode = arg.productCode;
				self.uid = arg.uid;
				self.username = arg.username;
				self.channelId = arg.channelId;
				self.pf = arg.pf;
				self.account = arg.account;
				HLSDK.init();
				break;
		}
		HLSDK.init();
	}
}