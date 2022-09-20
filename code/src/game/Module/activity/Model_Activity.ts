class Model_Activity extends BaseModel {

	/** 打开活动界面 I:活动类型*/
	public CG_OPENUI(type: number) {
		let ba = this.getBytes();
		ba.writeInt(type);
		this.sendSocket(2251, ba);
	}
	/** 请求某活动数据 I:活动id*/
	public CG_OPENACT(id: number) {
		let ba = this.getBytes();
		ba.writeInt(id);
		this.sendSocket(2253, ba);
	}

	public listenServ(mgr: WebSocketMgr) {
		let s = this;
		s.socket = mgr;
		mgr.regHand(2250, s.GC_LOGIN_SEND, s);
		mgr.regHand(2252, s.GC_OPENUI, s);
		mgr.regHand(2256, s.GC_ACTOPENSTATE, s);
	}
	private static activityObj: { [groupId: number]: Vo_Activity[] } = {};
	/**	登录发送类型活动数据 [I:活动类型[I:活动序号I:活动idI:活动期数I:开始时间I:结束时间]]活动数据*/
	private GC_LOGIN_SEND(s: Model_Activity, d: BaseBytes) {
		console.log("开始打印登录活动数据++++++++++++++++++++");
		for (let i = 0, len = d.readShort(); i < len; i++) {
			const groupId = d.readInt();
			console.log("大活动编号：" + groupId);
			for (var j = 0, len2 = d.readShort(); j < len2; j++) {
				s.append(groupId, d.readInt(), d.readInt(), d.readInt(), d.readInt(), d.readInt());
			}
			if (len2 > 0) GGlobal.mainUICtr.addIconWithListener(groupId);
		}
		console.log("开始打印登录活动数据结束+++++++++++++++++++++++++++");
		GGlobal.control.notify(Enum_MsgType.ACTIVITY_LOGIN_SEND);
	}

	/**	活动界面信息返回 I:活动类型[I:活动序号I:活动idI:活动期数I:开始时间I:结束时间]活动数据*/
	private GC_OPENUI(s: Model_Activity, d: BaseBytes) {
		const groupId = d.readInt();
		for (let i = 0, len = d.readShort(); i < len; i++) {
			s.append(groupId, d.readInt(), d.readInt(), d.readInt(), d.readInt(), d.readInt());
		}
		GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
	}

	/**活动开启 I:活动类型I:活动序号I:活动idI:期数I:开始时间I:结束时间B:开启状态：0：关闭，1：开启*/
	private GC_ACTOPENSTATE(s: Model_Activity, d: BaseBytes) {
		const info: { groupId: number, index: number, id: number, qishu: number, start: number, end: number }
			= { groupId: d.readInt(), index: d.readInt(), id: d.readInt(), qishu: d.readInt(), start: d.readInt(), end: d.readInt() };
		const state = d.readByte();
		if (state == 0) {
			s.castOff(info.groupId, info.id, info.qishu);
			var group = GGlobal.modelActivity.getGroup(info.groupId);
			if (!group) {
				GGlobal.mainUICtr.removeIcon(info.groupId);
			}
		} else {
			s.append(info.groupId, info.index, info.id, info.qishu, info.start, info.end);
			GGlobal.mainUICtr.addIconWithListener(info.groupId);
		}
		GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
	}


	/**活动信息 */
	private actionInfo: { [groupId: number]: Vo_Activity[] } = {};
	/**
	 * @groupId活动组ID @index子活动索引 @id子活动id @qishu子活动期数 @start子活动开始时间 @end子活动结束时间
	 */
	public append(groupId: number, index: number = -1, id: number = 0, qishu: number = 0, start: number = 0, end: number = 0) {
		const self = this;
		var actGroup = self.actionInfo[groupId];//获取相应活动组
		if (!actGroup) {
			actGroup = self.actionInfo[groupId] = [] as Vo_Activity[];
		}
		console.log("子活动index：" + index +"子活动id：" + id+"子活动期数：" + qishu);
		var act = self.getChildInGroup(id, actGroup);
		if (!act) {
			act = Vo_Activity.create();
			act.status = 1; //设置活动开启状态
			actGroup.push(act);
		}
		act.setData(groupId, index, id, qishu, start, end);
	}
	public castOff(groupId: number, id: number, qishu: number) {
		const group = this.actionInfo[groupId];
		if (group) {
			for (let i = 0, len = group.length; i < len; i++) {
				var child = group[i];
				if (child.id == id && child.qs == qishu) {
					// child.recover(); //不用对象池了，会有bug by lujiahao 2019.9.7
					child.status = 0; //设置活动关闭
					group.splice(i, 1);
					break;
				}
			}
			const len = group.length;
			if (len <= 0) {
				this.offGroup(groupId);
			}
		}
	}
	public offGroup(groupId: number) {
		const group = this.actionInfo[groupId];
		if (group) {
			delete this.actionInfo[groupId];
		}
	}
	public get(groupId: number, id: number, qishu: number | undefined = undefined) {
		const self = this;
		const group = self.actionInfo[groupId];
		if (group) {
			for (let i = 0, len = group.length; i < len; i++) {
				const child = group[i];
				if (qishu === undefined) {
					if (child.id == id) {
						return child;
					}
				} else {
					if (child.id == id && child.qs == qishu) {
						return child;
					}
				}
			}
		}
		return null;
	}
	public getGroup(groupid: number) {
		return this.actionInfo[groupid];
	}
	private getChildInGroup(id: number, actGroup: Vo_Activity[]) {
		const len = actGroup && actGroup.length;
		for (let i = 0; i < len; i++) {
			const tempAct = actGroup[i];
			if (tempAct.id == id) {
				return tempAct;
			}
		}
		return null;
	}

	public getActivityByID(id: number): Vo_Activity {
		let self = this;
		for (let key in self.actionInfo) {
			let actGroup = self.actionInfo[key];
			for (let i = 0; i < actGroup.length; i++) {
				const tempAct = actGroup[i];
				if (tempAct.id == id) {
					return tempAct;
				}
			}
		}

		return null;
	}
}