class ArpgRoleStatePlug extends fairygui.GComponent {

	public imgState: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9eme7fg3gm";

	public static createInstance(): ArpgRoleStatePlug {
		return <ArpgRoleStatePlug><any>(fairygui.UIPackage.createObject("common", "ArpgRoleStatePlug"));
	}

	private static POOL = [];
	public static create(role): ArpgRoleStatePlug {
		let temp: ArpgRoleStatePlug = ArpgRoleStatePlug.POOL.length ? ArpgRoleStatePlug.POOL.pop() : ArpgRoleStatePlug.createInstance();
		temp.role = role;
		return temp;
	}
	public autoRemove = true;

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgState = <fairygui.GLoader><any>(this.getChild("imgState"));
	}

	_state = 0;
	/**
	 * 1 战斗中
	 * 2 已死亡
	*/
	setState = (st) => {
		let self = this;
		self._state = st;
		let url;
		let x = 0, y = 0;
		switch (st) {
			case 1: url = "rolefight";//战斗中
				IconUtil.setImg(self.imgState, Enum_Path.PIC_URL + url + ".png");
				break;
			case 2: url = "roledead";//死亡
				IconUtil.setImg(self.imgState, Enum_Path.PIC_URL + url + ".png");
				break;
			case 3: url = "collecting";//采集标志
				IconUtil.setImg(self.imgState, Enum_Path.PIC_URL + url + ".png");
				break;
			case 4: url = "godst";//金库标志
				IconUtil.setImg(self.imgState, Enum_Path.PIC_URL + url + ".png");
				y = -130;
				break;
			case 0: url = "";
				IconUtil.setImg(self.imgState, null);
				break;
		}
		this.imgState.setXY(x, y);
	}

	update(opt) {

	}

	public role: ArpgRole;
	public onAdd() {
		this.setXY(-70, 40);
		this.role.headGroup.addChild(this.displayObject);
	}
	public onRemove() {
		let a = this;
		a._state = 0;
		IconUtil.setImg(a.imgState, null);
		a.role.headGroup.removeChild(a.displayObject);
		ArpgRoleStatePlug.POOL.push(this);
	}
}