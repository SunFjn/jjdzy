class CommonManager {
	public constructor() {
	}



	/**获取当前包里资源 pkgname 包名 resName资源名*/
	public static getUrl(pkgname: string, resName: string): string {
		var url: string = fairygui.UIPackage.getItemURL(pkgname, resName);
		return url;
	}

	/**获取公共文件夹资源 */
	public static getCommonUrl(str: string): string {
		var url: string = fairygui.UIPackage.getItemURL(GGlobal.COMMON, str);
		return url;
	}

	/**获取战斗力数字资源 */
	public static getPowerNumUrl(str: string): string {
		var url: string = fairygui.UIPackage.getItemURL(GGlobal.NUM, "power" + str);
		return url;
	}

	/**获取货币对应的url*/
	public static getMoneyUrl(moneyType: number, itemID: number = 0): string {
		var url: string = "";
		switch (moneyType) {
			case Enum_Attr.yuanBao:
				url = "ui://jvxpx9embwmw3y";
				break;
			case Enum_Attr.TONGBI:
				url = "ui://jvxpx9emltpm59";
				break;
			case Enum_Attr.PRESTIGE:
				url = "ui://jvxpx9emf50e9x";
				break;
			case Enum_Attr.ITEM:
				if (itemID == Model_Shop.itemID) {
					url = "ui://1f2dgazv73mnh";
				}
				break;
			case Enum_Attr.BOSSJF:
				url = "ui://1f2dgazvoefgj";
				break;
		}
		return url;
	}
	public static parseChildren(source: any, target: any) {
		var children = source._children;
		for (let i = 0; i < children.length; i++) {
			var child = children[i];
			if (child._name in target && !(target[child._name] === undefined))
				continue;
			target[child._name] = child;
		}
		var controllers = source._controllers;
		for (let i = 0; i < controllers.length; i++) {
			var ctrl = controllers[i];
			if (ctrl.name in target && !(target[ctrl._name] === undefined))
				continue;
			target[ctrl.name] = ctrl;
		}
	}
	private static lstPgChMap: any = {};
	public static listPageChange(key: string, list: fairygui.GList, leftBtn: fairygui.GObject, rightBtn: fairygui.GObject, numPerPage: number, changeBackHandler: Handler = null) {
		const SELF = CommonManager;
		if (!SELF.lstPgChMap[key]) {
			var tempObj = SELF.lstPgChMap[key] = { leftBtn: leftBtn, rightBtn: rightBtn, list: list, numPerPage: numPerPage, changeBackHandler: changeBackHandler };
			leftBtn.addClickListener(SELF.onPageChange, tempObj);
			rightBtn.addClickListener(SELF.onPageChange, tempObj);
		}
	}
	private static onPageChange(evt: egret.TouchEvent) {
		const btn: fairygui.GObject = evt.target as fairygui.GObject;
		const info = <any>this;
		const leftBtn = info.leftBtn;
		const righBtn = info.rightBtn;
		const changeBackHandler: Handler = info.changeBackHandler;
		const list = info.list;
		const numPerPage = info.numPerPage;
		let curpage: number = list.getFirstChildInView();
		switch (btn.id) {
			case leftBtn.id:
				if (curpage > 0) {
					curpage = curpage - numPerPage;
					if (curpage < 0) curpage = 0;
				}
				break;
			case righBtn.id:
				if (curpage < list.numItems - 1) {
					curpage = curpage + numPerPage;
					if (curpage >= list.numItems - 1) curpage = list.numItems - 1;
				}
				break;
		}
		if (list.numItems > 0) {
			list.scrollToView(curpage, true, true);
		}

		if (changeBackHandler) {
			changeBackHandler.runWith(curpage);
		}
	}
}