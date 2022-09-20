package com.teamtop.system.wujiang;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;

public class WuJiangConst {
	
	public static final int  SKILLNUM=5;
	/**
	 * 升阶道具
	 */
	public static final int UP_JIE_ITEM=411001;
	/**
	 * 升阶经验
	 */
	public static final int UP_JIE_EXP=10;
	/**
	 * 最大星级
	 */
	public static final int MAX_STAR=20;
	/**
	 * 武将属性丹索引id
	 */
	public static final int INDEX1=1;
	/**
	 * 武将资质丹索引id
	 */
	public static final int INDEX2=2;
	/**
	 * 武将技能id基数
	 */
	public static final int SKILL_ID=110000;
	
	/***
	 * 武将红点系统id
	 */
	public static final int SYSID=3103;
	public static final int SHENJIANG = 2;//神将红点索引

	/***
	 * 武将
	 */
	public static final int SYSIDWUJIANG=3101;
	/**
	 * 将印开启 将衔等级
	 */
	public static final int JIANGYING=2901;
	/**
	 * 武将套装数量
	 */
	public static final int TAOZHUANG_NUM=4501;
	
	public static final HashMap<Integer, Integer> jiangYingMap=new HashMap<Integer, Integer>();
	 //[1, 18, 20, 25, 28, 30, 35, 38, 40, 45];
	static {
		jiangYingMap.put(GameConst.INDEX_WUJING_0, 1);
		jiangYingMap.put(GameConst.INDEX_WUJING_1, 18);
		jiangYingMap.put(GameConst.INDEX_WUJING_2, 20);
		jiangYingMap.put(GameConst.INDEX_WUJING_3, 25);
		jiangYingMap.put(GameConst.INDEX_WUJING_4, 28);
		jiangYingMap.put(GameConst.INDEX_WUJING_5, 30);
		jiangYingMap.put(GameConst.INDEX_WUJING_6, 35);
		jiangYingMap.put(GameConst.INDEX_WUJING_7, 38);
		jiangYingMap.put(GameConst.INDEX_WUJING_8, 40);
		jiangYingMap.put(GameConst.INDEX_WUJING_9, 45);
	}
	
}
