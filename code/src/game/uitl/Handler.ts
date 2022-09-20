class Handler {

	private static POOL: Handler[] = [];

	private static _gid: number = 1;

	public static create(caller: any, method: Function, args: Array<any> = null, once: boolean = false) {
		if (this.POOL.length) {
			return this.POOL.pop().setTo(caller, method, args, once);
		} else {
			return new Handler(caller, method, args, once);
		}
	}

	protected _id: number;
	public caller: any;
	public method: Function;
	public args: Array<any>;
	public once: boolean = false;

	constructor(caller: any, method: Function, args: Array<any> = null, once: boolean = false) {
		this.once = false;
		this._id = 0;
		this.setTo(caller, method, args, once);
	}

	public setTo(caller: any, method: Function, args: Array<any> = null, once: boolean = false): Handler {
		this._id = Handler._gid++;
		this.caller = caller;
		this.method = method;
		this.args = args;
		this.once = once;
		return this;
	}

	public run(): any {
		if (this.method == null) {
			return null;
		}
		var id = this._id;
		var result = this.method.apply(this.caller, this.args);
		if (this._id === id && this.once) {
			this.recover();
		}
		return result;
	}

	public runWith(data: any): any {
		if (this.method == null) {
			return null;
		}
		var id = this._id;
		if (data == null) {
			var result = this.method.apply(this.caller, this.args);
		} else if (!this.args && !data.unshift) {
			result = this.method.call(this.caller, data);
		} else if (this.args) {
			result = this.method.apply(this.caller, this.args.concat(data));
		} else {
			result = this.method.call(this.caller, data);
		}
		if(this._id === id && this.once) {
			this.recover();
		}
		return result;
	}

	protected clear() {
		this.caller = null;
		this.method = null;
		this.args = null;
		return this;
	}

	/**
	*清理并回收到 Handler 对象池内。
	*/
	public recover() {
		if (this._id > 0) {
			this._id = 0;
			Handler.POOL.push(this.clear());
		}
	}
}