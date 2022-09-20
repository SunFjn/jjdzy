class Vo_GCBZ {
	public cfg: Igcbz_777;
	public id = 0;
	public headID = 0;
	public frameID = 0;
	public name: string;
	public power = 0;
	public times = 0;
	public constructor() {
	}

	public static create(value) {
		let vo = new Vo_GCBZ();
		vo.cfg = Config.gcbz_777[value];
		return vo;
	}
}