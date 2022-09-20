package com.teamtop.gameCommon;
/**
 * 公共的游戏方法
 * @author Administrator
 *
 */
public class GameFunction {
	/**
	 * 获取真实区id，用于多个平台开服
	 * @param zoneid
	 * @return
	 */
	public static Integer getRealZoneid(int zoneid){
		/*Integer realzoneid = getZoneidMap().get(zoneid);
		if(realzoneid==null){
			return zoneid;
		}*/
		return zoneid;
	}
}
