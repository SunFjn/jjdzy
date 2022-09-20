class StaticPart extends Part {

	public act:string;

	public constructor() {
		super();
	}

	public setAct(v:any) {
		if(this.act) {
			this.buildmc();
		}
	}
}