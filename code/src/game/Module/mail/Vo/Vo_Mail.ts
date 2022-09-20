class Vo_Mail {
	public constructor() {
	}

	/**邮件唯一id */
	sid: number;
	/**邮件表id */
	mailID: number;
	/**邮件标题*/
	title: string;
	/**邮件内容*/
	content: string;
	/**邮件时间*/
	sendDate: number;
	/**邮件状态*/
	readState: number;
	/**邮件附件状态 0没有附件。1有附件。2附件已领*/
	adjunctState: number;
	/**邮件附件*/
	adjunct: Array<any> = [];
	/**邮件附件数量*/
	adjunctNum: number;
	/**邮件表*/
	cfg: any;
	/**邮件表参数调用接口*/
	paramCall: any;

	public initLib(id: number): void {
		this.cfg = Config.mail_206[id];
		this.title = this.cfg.title;
		this.content = this.cfg.content;
		this.paramCall = this.cfg.paramCall;
	}

	/**L:邮件唯一IDI:邮件excel表IDI:时间B:邮件读取状态：0 未读。1 已读B:附件领取状态：0没有附件。1有附件。2附件已领** */
	public static createWithServData(data: Array<any>): Vo_Mail {
		var ret: Vo_Mail = new Vo_Mail();
		ret.sid = data[0];
		ret.mailID = data[1];
		if (ret.mailID <= 0) {
			ret.title = data[5];
		} else {
			ret.initLib(ret.mailID);
		}
		ret.content = "";
		ret.sendDate = data[2];
		ret.readState = data[3];
		ret.adjunctState = data[4];

		return ret;
	}

	public static convertContentTitleSys(ret: Vo_Mail, str: string) {
		var splits: Array<any> = str.split("_");
		var ident = Number(splits.shift());
		var cfgInfo = ret.cfg;

		var rep: string = cfgInfo.content;
		ret.content = BroadCastManager.repText(rep, splits.join("_"), ret.paramCall)
	}

	public static explainAdjuncts(datalist: Array<any>): Array<any> {
		var len = datalist.length;
		var adjs: Array<any> = [];
		for (var i = 0; i < len; i++) {
			var data: Array<any> = datalist[i];
			var adj: Object = this.explainAdjunct(data);
			adjs.push(adj);
		}
		return adjs;
	}

	private static explainAdjunct(data: Array<any>): Object {
		var ret;
		var type = data[0];
		var sysid = data[1];
		var count = data[2];
		if (type == 2) {
			var voequip: VoEquip = VoEquip.create(sysid);
			voequip.count = count;
			ret = voequip;
		} else if (type == 1) {
			var voitem: VoItem = VoItem.create(sysid);
			voitem.count = count;
			ret = voitem;
		} else {
			ret = Vo_Currency.create(type);
			ret.count = count;
		}
		return ret;
	}
}