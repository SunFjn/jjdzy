class VoTuiSongMsg {
	public constructor() {
	}

	public tag: number
	public status: number 
	public cfg: Iappts_313
	public arr: Array<VoTuiSongMsg>

	public static create(tag, status, cfg){
		let v = new VoTuiSongMsg()
		v.tag = tag
		v.status = status
		v.cfg = cfg
		v.arr = []
		return v;
	}
}