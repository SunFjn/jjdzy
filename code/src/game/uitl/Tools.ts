class Tools {
	public constructor() {
	}

	private static noticeIconDic: any = {};
	public static addNoticeIcon(parent: any, _key: string, _X: number = 0, _Y: number = 0) {
		let map = this.noticeIconDic;
		if (!parent || map[_key]) return;

		let numBgPic: fairygui.GLoader = new fairygui.GLoader();
		numBgPic.url = CommonManager.getCommonUrl("Bm_Liang");
		parent.addChild(numBgPic);
		numBgPic.x = _X;
		numBgPic.y = _Y;
		map[_key] = numBgPic;
	}

	public static removeNoticeIcon(_key:string) {
		let map = this.noticeIconDic;
		if (map[_key]) {
			var numBgPic: fairygui.GLoader = map[_key];
			if (numBgPic && numBgPic.parent) {
				numBgPic.parent.removeChild(numBgPic);
			}
			delete map[_key]
		}
	}
}