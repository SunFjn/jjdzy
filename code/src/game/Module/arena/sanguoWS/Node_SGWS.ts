class Node_SGWS {
	public constructor() {
	}

	id;
	name;
	/**进入的比赛级别*/lun;
	power;
	head;
	headicn;
	jiangxian;
	/**0没下中 1下注了*/xiazhu;
	/**初始位置*/initPos;

	//是否还没被淘汰 false被淘汰了
	public isLife(): boolean {
		let m = GGlobal.modelsgws;
		let st = GGlobal.modelsgws.state;
		let ret = false;
		ret= this.lun >= m.lun;
		return ret;
	}
}