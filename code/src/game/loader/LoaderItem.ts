class LoaderItem {

	public static create():LoaderItem {
		var ret:LoaderItem = new LoaderItem();
		return ret;
	}

	public complete:Function;
	public tick:Function;
	public error:Function;
	public arg:any;
	public url:string;
	public self:any;
	public restype:number;
	public ctx:LoaderCtx;

	public constructor() {
	}

	public destory() {
	}
}