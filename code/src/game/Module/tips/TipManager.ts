class TipManager {
	public constructor() {
	}
	// public static Item: number = 1;
	// public static ITEM_USE: number = 2;
	// public static EQUIP: number = 3;
	// public static BODYEQUIP: number = 5;
	// public static ZHANJIA_DAN: number = 7;

	// public static WUJIANG_SKILLS: number = 8;
	// public static WUJIANG_DAN: number = 10;

	public static view_tip: Tip;
	private static targetDic: any = {};
	public static update(info: any, type: number = 1): void {
		if (!info)
			return;

		var _tip: Tip;
		switch (info.type) {
			// case TipManager.Item:
			// 	_tip = TipBagItem.instance;
			// 	break;
			// case TipManager.ITEM_USE:
			// 	_tip = TipBagItemUse.instance;
			// 	break;
			// case TipManager.EQUIP:
			// 	_tip = TipEquip.instance;
			// 	break;
			// case TipManager.BODYEQUIP:
				// _tip = TipRoleEquip.instance;
			// 	break;
			// case TipManager.ZHANJIA_DAN:
				// _tip = TipZhanJiaDan.instance;
			// 	break;
			// case TipManager.WUJIANG_SKILLS:
				// _tip = TipWuJiangSkillS.instance;
			// 	break;
			// case TipManager.WUJIANG_DAN:
				// _tip = TipWuJiangDan.instance;
			// 	break;
		}

		if (_tip != TipManager.view_tip)
			TipManager.hide();

		if (!_tip)
			return;

		TipManager.view_tip = _tip;

		_tip.show(info.data, type);
		if (TipManager.view_tip.parent == null)
			GGlobal.layerMgr.UI_Tips.addChild(TipManager.view_tip);
	}

	public static hide(): void {
		if (TipManager.view_tip) {
			TipManager.view_tip.clear();
			TipManager.view_tip = null;
			TipManager.curTargetCode = null;
		}
	}

	/**
	 * 设置控件的tip
	 *  target 目标
	 *  str {type:tip的类型, data:数据}
	 *  type 点击类型
	 */
	public static bind(target: fairygui.GObject, str: any, type: number = 1): void {
		if (TipManager.targetDic[target.hashCode] == null) {
			target.addClickListener(TipManager.rollOver, target);
			App.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, TipManager.rollOut, target);
		}
		str.clickType = type;
		TipManager.targetDic[target.hashCode] = str;
		if (TipManager.curTargetCode == target.hashCode)
			TipManager.update(str, type);
	}

	public static unBind(target: any): void {
		if (!TipManager.targetDic[target.hashCode])
			return;
		target.removeClickListener(TipManager.rollOver, target);
		App.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, TipManager.rollOut, target);
		if (TipManager.curTargetCode == target.hashCode)
			TipManager.hide();
		delete TipManager.targetDic[target.hashCode];
	}

	private static curTargetCode: any;
	private static rollOver(e: egret.TouchEvent): void {
		if (TipManager.curTargetCode == e.currentTarget.hashCode) return;
		e.stopPropagation();
		var obj: fairygui.GObject = e.currentTarget;
		if (TipManager.targetDic[obj.hashCode]) {
			TipManager.update(TipManager.targetDic[obj.hashCode], TipManager.targetDic[obj.hashCode].clickType);
			TipManager.curTargetCode = obj.hashCode;
			if (TipManager.view_tip == null)
				return;
			let type = TipManager.targetDic[obj.hashCode].type
			// if (false) {
				TipManager.view_tip.setXY((fairygui.GRoot.inst.width - TipManager.view_tip.width) / 2, (fairygui.GRoot.inst.height - TipManager.view_tip.height) / 2)
			// } else {
			// 	var point: egret.Point = obj.localToRoot(obj.x, obj.y);
			// 	TipManager.view_tip.x = (point.x + (obj.width - TipManager.view_tip.width) / 2 - obj.x);


			// 	if (TipManager.view_tip.x < 0)
			// 		TipManager.view_tip.x = 0;
			// 	if (TipManager.view_tip.x + TipManager.view_tip.width > fairygui.GRoot.inst.width) {
			// 		TipManager.view_tip.x = fairygui.GRoot.inst.width - TipManager.view_tip.width;
			// 	}

			// 	TipManager.view_tip.y = point.y - TipManager.view_tip.height - obj.y;
			// 	if (TipManager.view_tip.y < 0)
			// 		TipManager.view_tip.y = 0;
			// }
		}
	}

	private static rollOut(e: egret.TouchEvent): void {
		if (TipManager.view_tip) {
			var toBubble = e.target
			while (toBubble && toBubble != App.stage) {
				if (toBubble == TipManager.view_tip) {
					return;
				} else {
					toBubble = toBubble.parent;
				}
			}
		}
		TipManager.hide();
	}
}