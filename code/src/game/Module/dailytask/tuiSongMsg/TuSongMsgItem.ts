class TuSongMsgItem extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public lb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public check0: fairygui.GButton;
	public check1: fairygui.GButton;

	public static URL: string = "ui://b3p8szvvq2i92o";

	public static createInstance(): TuSongMsgItem {
		return <TuSongMsgItem><any>(fairygui.UIPackage.createObject("dailytask", "TuSongMsgItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getController("c1");
		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.check0 = <fairygui.GButton><any>(this.getChild("check0"));
		this.check1 = <fairygui.GButton><any>(this.getChild("check1"));

		let s = this
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectP, s);
		s.list.addEventListener(fairygui.ItemEvent.CLICK, s.onList, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHander;
	}

	private _vo: VoTuiSongMsg;
	public set vo(v: VoTuiSongMsg) {
		let s = this
		s._vo = v;
		this.lb.text = v.cfg.name
		s.c1.selectedIndex = v.status == 0 ? 1 : 0;
		if (this._vo.arr.length > 1 && this._vo.cfg.hb == 0) {
			s.list.numItems = this._vo.arr.length;
			s.list.height = Math.ceil(this._vo.arr.length / 2) * 44
			s.height = this.list.y + this.list.height - 10;
			s.list.visible = true;

			this.check0.visible = false;
			this.check1.visible = false;
		} else {
			s.list.numItems = 0;
			s.list.visible = false;
			s.height = 48

			this.check0.visible = true;
			this.check1.visible = true;
		}
	}

	private selectP() {
		let st = this.c1.selectedIndex == 0 ? 1 : 0;
		this._vo.status = st
		if(this._vo.cfg.hb == 1){
			for(let i = 0; i < this._vo.arr.length; i++){
				this._vo.arr[i].status = st;
			}
		}
		GGlobal.modelactPreView.notify(ModelActPreView.msg_tsmsg_cge)
	}

	private onList(evt: fairygui.ItemEvent) {
		const item: fairygui.GButton = evt.itemObject as fairygui.GButton;
		let v = item.data
		v.status = item.selected ? 1 : 0
		GGlobal.modelactPreView.notify(ModelActPreView.msg_tsmsg_cge)
	}

	private renderHander(index, render: fairygui.GButton) {
		render.text = "  " + this._vo.arr[index].cfg.time1;
		render.data = this._vo.arr[index];
		render.selected = this._vo.arr[index].status ? true : false;
	}

}