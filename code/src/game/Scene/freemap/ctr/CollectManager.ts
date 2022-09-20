class CollectManager {
	private static NEED_TIME: number = 5000;
	private static _isCollecting: boolean = false;

	private static _npc: ARPGNpc;
	private static beginTime: number;
	private static _callBack: Handler;
	private static _obj: any;
	private static _isFinish: boolean;
	public static get isCollecting(): boolean {
		return CollectManager._isCollecting;
	}
	public static get npc(): ARPGNpc {
		return CollectManager._npc;
	}

	public static begin(npc: ARPGNpc, needTime: number = 5000, callBack: Handler = null, obj = null, label: string = ""): void {
		if (CollectManager.isCollecting) {
			return;
		}
		CollectManager._isFinish = false;
		//设置采集时间
		CollectManager.NEED_TIME = needTime;
		if (obj) {
			CollectManager._obj = obj;
			CollectManager._obj.npc = npc;
		}
		CollectManager._callBack = callBack;

		if (CollectManager._isCollecting) return;
		CollectManager._isCollecting = true;
		CollectManager._npc = npc;
		ARPGNpc.setCollectViewLabel(label);
		CollectManager.beginTime = egret.getTimer();
		CollectManager._npc.isCollect = true;
		GGlobal.control.listen(Enum_MsgType.MSG_ENTERFRAME, CollectManager.run);
	}

	/**
	 *采集中断或结束 
	 * @param $type =0是中断或结束会发送协议通知  =1不发送协议
	 */
	public static end($type = 0): void {
		var sId = GGlobal.sceneID;
		if (!CollectManager._isCollecting) return;
		CollectManager._isCollecting = false;
		CollectManager._npc.isCollect = false;
		CollectManager._callBack = null;
		GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, CollectManager.run);
		let sceneType = ModelArpgMap.getInstance().sceneType;
		if (CollectManager._isFinish) {
			switch (sceneType) {
				case EnumMapType.SANGUO_YT:
					GGlobal.modelSanGuoYT.CG_YITONG_COLLECT_RESULT_5809(CollectManager._npc.id);
					break;
				case EnumMapType.LIANGCAO:
					GGlobal.modelLiangCao.CG_BattleGoods_getBoxReward_10113(CollectManager._npc.id);
					break;
			}
		} else {
			switch (sceneType) {
				case EnumMapType.SANGUO_YT:
					GGlobal.modelSanGuoYT.CG_YITONG_STOP_COLLECT_5807(CollectManager._npc.id);
					break;
				case EnumMapType.LIANGCAO:
					GGlobal.modelLiangCao.CG_BattleGoods_stopgetbox_10111(CollectManager._npc.id);
					break;
			}
		}
	}

	public static serverEnd() {
		var sId = GGlobal.sceneID;
		if (!CollectManager._isCollecting) return;
		CollectManager._isCollecting = false;
		CollectManager._npc.isCollect = false;
		CollectManager._callBack = null;
		GGlobal.control.remove(Enum_MsgType.MSG_ENTERFRAME, CollectManager.run);
	}

	public static run(interval: number): void {
		var now = egret.getTimer();
		var rate: number = (now - CollectManager.beginTime) / CollectManager.NEED_TIME;
		CollectManager._npc.updateCollectPro(rate * 100);
		if (rate >= 1) {
			CollectManager._isFinish = true;
			var sId = GGlobal.sceneID;
			if (CollectManager._callBack != null) {
				CollectManager._callBack.run();
			} else {

			}
			CollectManager.end();
			CollectManager._curPoint = new egret.Point(CollectManager._npc.x - CameraManager.sightX - 34, CollectManager._npc.y - CameraManager.sightY - 34);
		}
	}
	private static _curPoint: egret.Point;
}