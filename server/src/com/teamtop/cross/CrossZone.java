package com.teamtop.cross;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.GameProperties;

/**
 * 跨服区号
 * @author Administrator
 *
 */
public class CrossZone {
	public static List<Integer> crossZoneArr = new ArrayList<Integer>(); 
	/**	 * 玩法中央服	 */
	public static final int central = 12345678;
	/**	 * 玩法中央服2	 */
	public static final int central2 = 12345677;
	/**	 * 后台中央服	 */
	public static final int houtai = 12345679;
	/**	 * 战力提升排行中央服	 */
	public static final int rankraise = 12345680;
	/**	 * 内测服区号	 */
	public static final int SERVER_9999 = 9999;
	
	private static boolean isCrossServer = false;
	static{
		crossZoneArr.add(central);
		crossZoneArr.add(central2);
		crossZoneArr.add(houtai);
		crossZoneArr.add(rankraise);
		if(GameProperties.zoneids!=null){
			if(GameProperties.zoneids.size()==1 && crossZoneArr.contains(GameProperties.zoneids.get(0))){
				isCrossServer = true;
			}
		}
	}
	public static boolean isCrossServer(){
		return isCrossServer;
	}
	
	
}
