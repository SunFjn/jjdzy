class ModelScene extends BaseModel {

	public static MSG_PLIST = "p_list";

	/**进入副本前的重要场景 (退出时回到此ID的场景)
	 *  关卡 或 主城
	*/
	public lastMainSceneID: number;

	public constructor() {
		super();
	}

	public listenServ(wsm: WebSocketMgr) {
		super.listenServ(wsm);
		wsm.regHand(132, this.scPlayerList, this);
	}

	/**心跳包 */
	public CG_HEARTBEAT_181() {
		var ba = this.getBytes();
		this.sendSocket(181, ba);
	}


	/**请求在线玩家列表*/
	public csPlayerList() {
		var ba = this.getBytes();
		this.socket.sendCMDBytes(131, ba);
	}

	protected scPlayerList(self: ModelScene, ba: BaseBytes) {
		var playerList = [];
		for (var i = 0, len = ba.readShort(); i < len; i++) {
			playerList.push({
				type: "player",
				id: ba.readLong(),
				name: ba.readUTF(),
				job: ba.readByte(),
				gangName: ba.readUTF(),
				shenBing: ba.readByte(),
				title: ba.readInt(),
				body: ba.readInt()
			});
		}
		self.notify(ModelScene.MSG_PLIST, playerList);
	}

	public returnMainScene() {
		if (GGlobal.layerMgr.isOpenView(UIConst.QXZL)) {
			GGlobal.layerMgr.close2(UIConst.QXZL);
		}
		if (ModelArpgMap.getInstance().isAutoExite == false) return;//在ARPG地图里面的切换不允许跳转进关卡
		var mainSceneID = this.lastMainSceneID;
		var curScenetype = GGlobal.mapscene.scenetype;
		var targetsceneid = 0;
		if (mainSceneID) {
			targetsceneid = mainSceneID;
		} else {
			targetsceneid = SceneCtrl.GUANQIA;
		}
		if (GGlobal.mapscene.scenetype != targetsceneid) {
			GGlobal.mapscene.enterScene(targetsceneid);
		}
	}
}