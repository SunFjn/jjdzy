package com.teamtop.system.dengFengZaoJi;

import java.util.HashMap;
import java.util.Map;

public class DengFengZaoJiConst {
	/**海选人次*/
	public static final int HAIXUAN = 50;
	/**决赛人次*/
	public static final int JUESAI = 32;
	/**海选展示人数*/
	public static final int SHOW_HAIXUAN = 6;
	/**决赛展示人数*/
	public static final int SHOW_JUESAI = 5;
	/**海选挑战次数*/
	public static final int HAIXUAN_NUM = 10;
	/**决赛挑战次数*/
	public static final int JUESAI_NUM = 10;
	/**第一名需要前5名才可挑战*/
	public static final int TOPFIVE = 5;
	
	/**登峰造极海选刷新消耗*/
	public static final int DENGFENGZAOJI_HAIXUAN_SHUAXIN_COST= 8301;
	/**登峰造极-ABC档次挑战成功积分奖励*/
	public static final int DENGFENGZAOJI_ABC_BATTLE_ADD= 8302;
	/**登峰造极-海选挑战失败积分奖励*/
	public static final int DENGFENGZAOJI_BATTLE_FAIL_ADD= 8303;
	/**登峰造极-决赛下注消耗*/
	public static final int DENGFENGZAOJI_XIAZHU_COST= 8304;
	/**登峰造极猜对奖励*/
	public static final int DENGFENGZAOJI_CAIDUI_ADD= 8305;
	/**登峰造极猜错奖励*/
	public static final int DENGFENGZAOJI_CAICUO_ADD= 8306;
	/**登峰造极-决赛挑战失败积分奖励*/
	public static final int DENGFENGZAOJI_JUESAI_BATTLE_FAIL_ADD= 8307;
	/**登峰造极决赛刷新消耗*/
	public static final int DENGFENGZAOJI_JUESAI_SHUAXIN_COST= 8308;
	/**登峰造极-海选全部挑战完毕积分奖励*/
	public static final int DENGFENGZAOJI_BATTLE_ALL_SUCCESS_ADD= 8309;
	/**登峰造极-海选挑战成功奖励*/
	public static final int DENGFENGZAOJI_BATTLE_HAIXUAN_ADD= 8310;
	/**登峰造极-决赛挑战成功奖励*/
	public static final int DENGFENGZAOJI_BATTLE_JUESAI_ADD= 8311;
	/**登峰造极挑战令道具id*/
	public static int DENGFENGZAOJI_ITEM_ID = 416081;
	
	/**A档次1人，B档次2人，C档次3人*/
	@SuppressWarnings("serial")
	public static final Map<Integer, Integer> gradeMap = new HashMap<Integer, Integer>() {
	    {
	        put(1, 1);  
	        put(2, 2); 
	        put(3, 2); 
	        put(4, 3); 
	        put(5, 3); 
	        put(6, 3); 
	    }
	};
	/**每档次需挑战人数*/
	@SuppressWarnings("serial")
	public static final Map<Integer, Integer> gradeNumMap = new HashMap<Integer, Integer>() {
		{
			put(1, 5);  
			put(2, 3); 
			put(3, 0); 
		}
	};
	
	/**挑战人数对应档次*/
	@SuppressWarnings("serial")
	public static final Map<Integer, Integer> battleMap = new HashMap<Integer, Integer>() {
	    {
	        put(1, 2);  
	        put(2, 2); 
	        put(3, 2); 
	        put(4, 1); 
	        put(5, 1); 
	        put(6, 0); 
	    }
	};
}
