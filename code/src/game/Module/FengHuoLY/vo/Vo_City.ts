class Vo_City {
	public constructor() {
	}
	id;
	cfg;
	state;// 0空闲 1战斗
	camp;

	ower;
	power;
	hasTakeCount;//已经掠夺的人数
	maxTakeCount;
	hp;
	head;
	headGrid;

	public static create(id){
		let vo = new Vo_City();
		vo.id = id;
		vo.cfg = Config.fhly_254[id];
		vo.maxTakeCount = vo.cfg.num;
		return vo;
	}

	_owerID;
	set owerID(val){
		let m = GGlobal.modelFengHuoLY;
		m.cityOwners[this._owerID] = 0;
		if(val != this._owerID){
			m.sceneUpdateMark = 1;
		}
		m.cityOwners[val] = 1;
		this._owerID = val;
	}

	get owerID(){
		return this._owerID;
	}

	inBattle(){
		return this.state == 1;
	}
}