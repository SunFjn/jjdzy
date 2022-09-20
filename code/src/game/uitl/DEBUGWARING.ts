class DEBUGWARING {
	public constructor() {
	}

	public static log(str){
		if(DEBUG){
			console.log(str);
			// ViewCommonWarn.text(str);
		}
	}
}