class FenghuoPlayer extends fairygui.GComponent {
	public constructor() {
		super();
	}

	public setWeapon(){

	}

	public setBody(){

	}

	public way() {

	}


	private static pool = [];
	public static createPlayer(): FenghuoPlayer {
		return this.pool.length?this.pool.shift():new FenghuoPlayer();
	}

}