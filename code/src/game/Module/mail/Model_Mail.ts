class Model_Mail extends BaseModel {
	public constructor() {
		super();
	}

	public static MAX_LETTER: number = 50;
	public static isOpenMail: boolean = false;
	public static mailVoArr: Array<Vo_Mail> = [];//数据
	public static numLetter: number;//有多少邮件
	public getMail($sid: number): Vo_Mail {
		let voMail: Vo_Mail;
		for (var i = 0; i < Model_Mail.mailVoArr.length; i++) {
			if (Model_Mail.mailVoArr[i].sid == $sid) {
				voMail = Model_Mail.mailVoArr[i];
				break;
			}
		}
		return voMail;
	}

	private static isShowNoteice: boolean = false;
	/**302 	发：有未读邮件/未领取附件，前端红点提示。不发：没有未读邮件 ** */
	public static checkNotice(): boolean {
		if (Model_Mail.isOpenMail) {
			Model_Mail.isShowNoteice = false;
			var arr: Array<Vo_Mail> = Model_Mail.mailVoArr;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].readState == 0 || arr[i].adjunctState == 1) {
					Model_Mail.isShowNoteice = true;
					break;
				}
			}
		}
		return Model_Mail.isShowNoteice;
	}

	/**302 	发：有未读邮件/未领取附件，前端红点提示。不发：没有未读邮件 ** */
	public GCShowNotice(self: Model_Mail, data: BaseBytes) {
		Model_Mail.isShowNoteice = true;
		GGlobal.control.notify(Enum_MsgType.MAIL_LIST_UPDATE);
	}


	/**304 获取所有邮件 B:1:成功。2:失败B:邮件数量[L:邮件唯一IDU:邮件标题I:邮件excel表IDI:时间
	 * B:邮件读取状态：0 未读。1 已读B:附件领取状态：0没有附件。1有附件。2附件已领]邮件详情 */
	public GCMailList(self: Model_Mail, data: BaseBytes) {
		Model_Mail.mailVoArr = [];
		let result: number = data.readByte();
		if (result == 1) {
			Model_Mail.isOpenMail = true;
			Model_Mail.numLetter = data.readByte();
			for (let i = 0, len = data.readShort(); i < len; i++) {
				let sid = data.readLong();
				let title = data.readUTF();
				let mailID = data.readInt();
				let sendDate = data.readInt();
				let readState = data.readByte();
				let adjunctState = data.readByte();
				let arr: Array<any> = [sid, mailID, sendDate, readState, adjunctState, title];
				let vo: Vo_Mail = Vo_Mail.createWithServData(arr);
				Model_Mail.mailVoArr.push(vo);
			}
		}
		Model_Mail.mailVoArr.sort(self.mailSort);
		GGlobal.control.notify(Enum_MsgType.MAIL_LIST_UPDATE);
	}

	/**邮件排序 */
	private mailSort(a: Vo_Mail, b: Vo_Mail): number {
		if (a.sendDate > b.sendDate) {
			return -1;
		} else if (a.sendDate == b.sendDate) {
			return 0;
		} else if (a.sendDate < b.sendDate) {
			return 1;
		}
	}

	/**306 	
	B-L-[B-I-I]-B-U-B-B
		
	查看一封邮件 B:1:成功。2:失败。3非本人的邮件L:邮件唯一ID[B:附件类型（1道具 2装备 3银两 4绑银，元宝，礼券，声望，经验）
	I:物品excel表IDI:物品数量]附件信息B:附件数量（最多只显示4个）U:邮件内容，数据用“_” 隔开B:邮件读取状态：0 未读。1 已读
	B:附件领取状态：0没有附件。1有附件。2附件已领 */
	public GCMailContent(self: Model_Mail, data: BaseBytes) {
		let result: number = data.readByte();
		if (result == 1) {
			let sid: number = data.readLong();
			let vo: Vo_Mail = self.getMail(sid);
			let type: number;
			let id: number;
			let count: number;
			let arr: Array<any> = [];
			for (let i = 0, len = data.readShort(); i < len; i++) {
				type = data.readByte();
				id = data.readInt();
				count = data.readInt();
				arr.push([type, id, count]);
			}
			vo.adjunct = Vo_Mail.explainAdjuncts(arr);
			vo.adjunctNum = data.readByte();
			if (vo.mailID <= 0) {
				vo.content = data.readUTF();
			} else {
				Vo_Mail.convertContentTitleSys(vo, data.readUTF());
			}
			vo.readState = data.readByte();
			vo.adjunctState = data.readByte();
			GGlobal.layerMgr.open(UIConst.MAIL_CONTENT, vo);
			GGlobal.control.notify(Enum_MsgType.MAIL_LIST_UPDATE);
		}
	}

	/**
	 * 308 	B-L 领取附件 B:0 失败。1 成功。2邮件不存在。3附件没物品。4背包格子不足。5非本人的邮件L:邮件ID
	 */
	public GCDrawMail(self: Model_Mail, data: BaseBytes) {
		let result: number = data.readByte();
		switch (result) {
			case 1:
				let vo: Vo_Mail = self.getMail(data.readLong());
				vo.adjunctState = 2;
				vo.readState = 1;
				GGlobal.control.notify(Enum_MsgType.MAIL_CONTENT_SHOW, vo);
				GGlobal.control.notify(Enum_MsgType.MAIL_LIST_UPDATE);
				break;
			case 2:
				ViewCommonWarn.text("邮件不存在");
				break;
			case 3:
				ViewCommonWarn.text("附件没物品");
				break;
			case 4:
				ViewCommonWarn.text("背包格子不足");
				break;
			case 5:
				ViewCommonWarn.text("非本人的邮件");
				break;
		}
	}
	/**310 	B 一键领取附件结果返回 B:0失败，1成功领取附件，2背包不足，3已达到金钱上限，4没有可提取的附件*/
	public GCKeyDrawMail(self: Model_Mail, data: BaseBytes) {
		let result: number = data.readByte();
		switch (result) {
			case 1:
				break;
			case 2:
				ViewCommonWarn.text("背包空间不足，请清理背包");
				break;
			case 3:
				ViewCommonWarn.text("已达到金钱上限");
				break;
			case 4:
				ViewCommonWarn.text("没有可提取的附件");
				break;
		}
	}
	/***312 收到邮件 L:邮件IDU:邮件标题I:邮件excel表IDI:时间B:邮件读取状态B:附件领取状态 */
	public GCGetNewMail(self: Model_Mail, data: BaseBytes) {
		if (Model_Mail.mailVoArr.length >= Model_Mail.MAX_LETTER) Model_Mail.mailVoArr.pop();
		let sid: number = data.readLong();
		let title = data.readUTF();
		let mailID: number = data.readInt();
		let sendDate: number = data.readInt();
		let readState: number = data.readByte();
		let adjunctState: number = data.readByte();
		let arr: Array<any> = [sid, mailID, sendDate, readState, adjunctState, title];
		let vo: Vo_Mail = Vo_Mail.createWithServData(arr);
		Model_Mail.mailVoArr.unshift(vo);
		GGlobal.control.notify(Enum_MsgType.MAIL_LIST_UPDATE);
	}

	//*************************协议处理*******************************//
	/**协议*/
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(302, this.GCShowNotice, this);
		mgr.regHand(304, this.GCMailList, this);
		mgr.regHand(306, this.GCMailContent, this);
		mgr.regHand(308, this.GCDrawMail, this);
		mgr.regHand(310, this.GCKeyDrawMail, this);
		mgr.regHand(312, this.GCGetNewMail, this);
	}

	/**303 	打开UI主界面 * */
	public openPanel() {
		this.sendSocket(303, new BaseBytes());
	}

	/**305 查看一封邮件 L:邮件唯一ID */
	public getMailContent(sId: number) {
		var ba: BaseBytes = new BaseBytes();
		ba.writeLong(sId);
		this.sendSocket(305, ba);
	}

	/**307 	L 领取附件 L:邮件唯一ID */
	public drawMail(sId: number) {
		var ba: BaseBytes = new BaseBytes();
		ba.writeLong(sId);
		this.sendSocket(307, ba);
	}

	/**309 	一键领取所有邮件的附件  */
	public keyDrawMail() {
		var ba: BaseBytes = new BaseBytes();
		this.sendSocket(309, ba);
	}

	/**313 	一键删除邮件  */
	public keyDelMail() {
		var ba: BaseBytes = new BaseBytes();
		this.sendSocket(313, ba);
	}
}