class LoaderCtx {

	public static create():LoaderCtx {
		var ret:LoaderCtx = new LoaderCtx();
		return ret;
	}

	public url:string;
	public items:Array<LoaderItem>;
	public priority:Number = 0;
	public restype:number = 0;

	public loader:egret.URLLoader;

	public removed:boolean;
	
	public constructor() {
		this.items = new Array<LoaderItem>();
	}
}