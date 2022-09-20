class ComActivityTab extends fairygui.GButton {

	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emr9to3he";

	public static createInstance(): ComActivityTab {
		return <ComActivityTab><any>(fairygui.UIPackage.createObject("common", "ActivityTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
	}

	public set checkNotice(val) {
		this.noticeImg.visible = val;
	}

	public setIcon(iconUrl) {
		IconUtil.setImg(this._iconObject.asLoader, iconUrl);
	}

	public setActivityIcon(iconID) {
		IconUtil.setImg(this._iconObject.asLoader, Enum_Path.MAINUI_URL + iconID + ".png");
	}

	/**活动 */
	public actId = 0;
	public setData(pData?: Vo_Activity) {
		let self = this;
		if (pData) {
			//有数据
			self.actId = pData.id;
			let icon = Config.xitong_001[self.actId].icon;
			if (self.actId == UIConst.DISCOUNT_SHOP) {
				icon = "4605_1";
			} else if (self.actId == UIConst.JiJin) {
				icon = UIConst.JiJin + "" + pData.qs;
			}
			if (pData.icon) {
				IconUtil.setImg(self._iconObject.asLoader, Enum_Path.ACTCOM_URL + pData.icon + "_icon.png");
			} else {
				console.log("huodong_009 no find activityIndex：" + pData.index + "activityID：" + pData.id);
			}
		} else {
			//无数据
			self.actId = 0;
			self.icon = null;
		}
	}

	public clean() {
		IconUtil.setImg(this._iconObject.asLoader, null);
	}
}