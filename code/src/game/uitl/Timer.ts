/** 时间管理 */
class Timer {
	/** 时间管理 */
	public constructor() {
	}

	protected static _instance: Timer;
	static get instance(): Timer {
		if (!Timer._instance) {
			Timer._instance = new Timer();
		}
		return Timer._instance;
	}

	public tasks: TimerInfo[] = [];
	private $temp = [];
	private $pool: TimerInfo[] = [];
	/**增加时间监听 
	 * fun 回调函数
	 * thisObj 回调函数的this
	 * time 间隔时间 毫秒
	 * startTime 开始回调时间
	 * excuteImm 是否立即执行的
	 * coverBefor 是否覆盖之前
	*/
	public listen(func: Function, thisObj: any, time: number = 0, startTime: number = 0, excuteImm: boolean = true): void {
		this.create(func, thisObj, time, startTime, excuteImm, true, true);
	}
	static listen(func: Function, thisObj: any, time: number = 0, startTime: number = 0, excuteImm: boolean = true) {
		Timer.instance.create(func, thisObj, time, startTime, excuteImm, true, true);
	}

	private create(func: Function, thisObj: any, interval: number, startTime: number = 0, excuteImm: boolean = true, repeat: boolean = true, coverBefore: boolean = true) {
		var timerInfo = this.getTimer(func, thisObj);
		if (timerInfo && coverBefore) {
			timerInfo.func = func;
			timerInfo.thisObj = thisObj;
			timerInfo.interval = interval;
			if (!startTime) {
				timerInfo.curTime = egret.getTimer();
			} else {
				timerInfo.curTime = startTime;
			}
			timerInfo.excuteImm = excuteImm;
			timerInfo.repeat = repeat;
			timerInfo.coverBefore = coverBefore;
		} else {
			var timerInfo: TimerInfo = this.$pool.pop() || new TimerInfo();
			timerInfo.func = func;
			timerInfo.thisObj = thisObj;
			timerInfo.interval = interval;
			if (!startTime) {
				timerInfo.curTime = egret.getTimer();
			} else {
				timerInfo.curTime = startTime;
			}
			timerInfo.excuteImm = excuteImm;
			timerInfo.repeat = repeat;
			timerInfo.coverBefore = coverBefore;
			this.tasks.push(timerInfo);
		}
	}
	public callLater(func: Function, interval: number, thisObj?: any, startTime: number = 0, excuteImm: boolean = false, repeat: boolean = false, coverBefore: boolean = false) {
		this.create(func, thisObj, interval, startTime, excuteImm, repeat, coverBefore);
	}

	/**删除监听 */
	public remove(func: Function, thisObj?: any): void {
		var arr = this.tasks;
		var len = arr.length;
		for (var i = len - 1; i >= 0; i--) {
			var task: TimerInfo = arr[i];
			if (thisObj) {
				if (task.func == func && task.thisObj == thisObj) {
					task.clear();
					break;
				}
			} else if (task.func == func) {
				task.clear();
				break;
			}
		}
	}
	static remove(func: Function, thisObj?: any) {
		Timer.instance.remove(func, thisObj);
	}

	private getTimer(func: Function, thisObj?: any) {
		var arr = this.tasks;
		for (let len = arr.length, i = len - 1; i >= 0; i--) {
			var task: TimerInfo = arr[i];
			if (thisObj) {
				if (task.func == func && task.thisObj == thisObj) {
					return task;
				}
			} else if (task.func == func) {
				return task;
			}
		}
	}

	/**是否有监听 */
	public has(func: Function, thisObj?: any): boolean {
		var arr = this.tasks;
		for (var i = 0; i < arr.length; i++) {
			var task: TimerInfo = arr[i];
			if (thisObj) {
				if (task.func == func && task.thisObj == thisObj) {
					return true;
				}
			} else {
				if (task.func == func) {
					return true;
				}
			}
		}
		return false;
	}

	public run() {
		const self = this;
		var now = egret.getTimer();
		var arr = this.tasks;
		var nullCounter = 0;
		for (let i = 0, len = arr.length; i < len; i++) {
			var task = self.tasks[i];
			if (task.func == null) {
				nullCounter++;
			} else {
				if (task.excuteImm) {
					task.excuteImm = false;
					task.func.length > 0 ? task.func.call(task.thisObj, now) : task.func.call(task.thisObj);
					if (!task.repeat) {
						task.clear();
						nullCounter++;
					} else {
						task.curTime = now;
					}
				} else {
					var costTime = now - task.curTime;
					if (costTime >= task.interval) {
						task.func.length > 0 ? task.func.call(task.thisObj, now) : task.func.call(task.thisObj);
						if (!task.repeat) {
							task.clear();
							nullCounter++;
						} else {
							task.curTime = now;
						}
					}
				}
			}
		}
		if (nullCounter >= 3) {
			self.cleanNull();
		}
	}
	private cleanNull(): void {
		const self = this;
		var arr = self.tasks;
		for (var i = 0, len = arr.length; i < len; i++) {
			var timer: TimerInfo = arr[i];
			if (timer.func != null) self.$temp.push(timer);
			else self.recover(timer);
		}
		self.tasks = self.$temp;
		self.$temp = arr;
		self.$temp.length = 0;
	}

	private recover(timer: TimerInfo): void {
		timer.clear();
		this.$pool.push(timer);
	}

	private static dateDic = {};
	public static interval(key, type = 0) {
		if (type == 0) {
			this.dateDic[key] = new Date(egret.getTimer());
		} else {
			let ti = 0;
			if (this.dateDic[key]) ti = this.dateDic[key];
			DEBUG && console.log(key + ":" + (egret.getTimer() - ti));
		}
	}
}
class TimerInfo {
	public func: Function;
	public thisObj: any;
	public curTime: number;
	public interval: number;
	public excuteImm: boolean;
	public repeat: boolean;
	public coverBefore: boolean;
	public clear() {
		const self = this;
		self.func = null;
		self.thisObj = null;
		self.curTime = 0;
		self.interval = 0;
		self.excuteImm = false;
		self.repeat = false;
		self.coverBefore = false;
	}
}