class MsgCenter {
	public constructor() {
	}

	public msgMap: any = {};
	public invalidMap: any = {};
	public invalid = 0;

	/** 
	 * @msg 派发的消息
	 * @arg 派发的参数
	*/
	public notify(msg, arg = null) {
		var list: Array<any> = [];
		list = list.concat(this.msgMap[msg]);
		if (list.length > 0) {
			for (var i = list.length - 1; i >= 0; i--) {
				var listenerInfo = list[i];
				if (listenerInfo) {
					listenerInfo[0] = arg;
					listenerInfo[1].apply(listenerInfo[2], listenerInfo);
				}
			}
		}
	}

	/** 移除监听
	 * @msg 消息
	 * @listener 回调
	*/
	public remove(msg, listener: Function, thisObj = null) {
		var list: Array<any> = this.msgMap[msg];
		if (list) {
			var index = this.getIndex(listener, list, thisObj);
			if (index != -1) {
				list[index] = null;
				this.invalidMap[msg] = true;
				if (!this.invalid) {
					egret.callLater(MsgCenter.cleannull, this);
				}
				this.invalid++;

			}
		}
	}

	/** 添加
	 * @msg 消息
	 * @listener 回调
	 * @thisObj this
	*/
	public listen(msg, listener: Function, thisObj = null) {
		var list: Array<any> = this.msgMap[msg];
		if (!list) {
			list = this.msgMap[msg] = [];
		}
		var index = this.getIndex(listener, list, thisObj);
		if (index >= 0) {
			return;
		}
		if (true) {
			list.unshift([null, listener, thisObj]);
		}
	}

	/**
	 * 注册和反注册的便捷方法
	 * @param pFlag 
	 * @param pMsg 消息类型
	 * @param pListener 回调
	 * @param pThisObj 回调主体
	 */
	public register(pFlag: boolean, pMsg, pListener: Function, pThisObj: any) {
		if (pFlag)
			this.listen(pMsg, pListener, pThisObj);
		else
			this.remove(pMsg, pListener, pThisObj);
	}

	public static cleannull() {
		var self: any = this;
		var arrayutil = ArrayUitl;
		if (self.invalid) {
			self.invalid = 0;
			for (var k in self.invalidMap) {
				var invalidList: Array<any> = self.msgMap[k];
				arrayutil.cleannull(invalidList);
				delete self.invalidMap[k];
			}
		}
	}

	/** 添加
	 * @msg 消息
	 * @listener 回调
	 * @thisObj this
	*/
	public listenonce(msg, listener: Function, thisObj = null) {
		var msgCenter = this;
		msgCenter.listen(msg, function func(arg): void {
			msgCenter.remove(msg, func, msgCenter);
			listener.apply(thisObj, arg);
		}, msgCenter);
	}

	protected getIndex(listener, list: Array<any>, thisObj): number {
		for (var i = list.length - 1; i >= 0; i--) {
			var term = list[i];
			if (term && listener == term[1] && (!thisObj || (term[2] == thisObj))) {
				return i;
			}
		}
		return -1;
	}
}