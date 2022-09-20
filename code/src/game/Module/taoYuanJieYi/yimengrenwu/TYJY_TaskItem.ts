/**
 * 义盟任务子界面item
 */
class TYJY_TaskItem extends fairygui.GComponent{
	public titleLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	private box0:TYJY_TaskItem2;
	private box1:TYJY_TaskItem2;
	private box2:TYJY_TaskItem2;
	public expBar: fairygui.GProgressBar;
	private _cs:number = 0;
	private boxs: TYJY_TaskItem2[];

	private _listData;

	public static URL: string = "ui://m2fm2aiyvfmx15";

	public static createInstance(): TYJY_TaskItem {
		return <TYJY_TaskItem><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_TaskItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
	}

	public clean() {
		let s = this;
		s.list.numItems = 0;
	}

	public setdata(cfg:Ityjyrw_251) {
		let s = this;
		if(!cfg)  return;
		
		let model = GGlobal.model_TYJY;
		s.titleLb.text = "任务：" + cfg.name;
		let obj = model.taskObj[cfg.id];
		s._listData = obj.arr ? obj.arr : [];
		s._cs = cfg.cs;
		s.list.numItems = this._listData ? this._listData.length : 0;

		let arr = model.taskObj[cfg.id].arr1 ? model.taskObj[cfg.id].arr1 : [];
		s.boxs = [];
		for(let i=0; i < 3; i++){
			s.boxs.push(s["box"+i]);
			s.boxs[i].setDate(i);
			s.boxs[i].cfg = cfg;
			s.boxs[i].update(arr[i]);
		}

		s.expBar.max = 3;
		let value:number = 0;
		let len:number = arr.length;
		for(let i:number = 0;i < len;i ++)
		{
			let status:number = arr[i];
			if(status <= 0)
			{
				break;
			}
			value ++;
		}
		s.expBar.value = value;
		s.expBar._titleObject.text = "";
	}

	private itemRender(idx, obj) {
		let item: TYJY_TaskItem1 = obj as TYJY_TaskItem1;
		item.setdata(this._listData[idx][0], this._listData[idx][1], this._cs);
	}
}