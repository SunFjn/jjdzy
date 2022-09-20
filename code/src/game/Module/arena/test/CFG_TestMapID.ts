/** 只是用来测试 */
class CFG_TestMapID {
	public constructor() {
	}

	public static LIBLIST:any[];
	public static getLibList() {
		if(!CFG_TestMapID.LIBLIST) {
			var map = {};
			CFG_TestMapID.LIBLIST = [];
			var maplib = Config.map_200;
			for(var k in maplib) {
				if(!map[maplib[k].s]) {
					map[maplib[k].s] = 1;
					CFG_TestMapID.LIBLIST.push(maplib[k]);
				}
			}
		}
		return CFG_TestMapID.LIBLIST;
	}
}