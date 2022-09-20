package com.teamtop.system.activity.ativitys.countryTreasure;

import java.util.HashMap;

public class CountryTreasureConst {
	/***
	 * 1.系统奖池
	 */
	public static final int REWARD_SYS=1;
	/**
	 * 2.高级奖池
	 */
	public static final int REWARD_HIG=2;
	/**
	 * 3.豪华奖池
	 */
	public static final int REWARD_MOREHIG=3;
	/**
	 * 4.至尊奖池
	 */
	public static final int REWARD_MAXHIG=4;

    /**
     * 对应奖池选择物品数量
     */
	public static final HashMap<Integer, Integer> ChooseNum=new HashMap<Integer, Integer>(){
		{
			put(4,1);
			put(3,2);
			put(2,3);
		}
	};
}
