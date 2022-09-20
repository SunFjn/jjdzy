class VoRunManInfo {
	public constructor() {
	}

	public type:number;
	public layerId:number;
	public layerMaxId:number;


	public copy():VoRunManInfo{
		var c = new VoRunManInfo();
		c.type = this.type
		c.layerId = this.layerId
		c.layerMaxId = this.layerMaxId
		return c;
	}
}