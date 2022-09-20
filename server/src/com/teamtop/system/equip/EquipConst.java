package com.teamtop.system.equip;

import java.util.concurrent.ConcurrentHashMap;

public class EquipConst {
	/**
	 * 状态1：在背包
	 */
	public static final int IN_BAG = 1;
	/**
	 * 状态2：在仓库
	 */
	//public static final int IN_STORE = 2;
	/**
	 * 状态3 ：在身上
	 */
	public static final int ON_BODY = 3;
	/**
	 * 状态4：在市场
	 */
	//public static final int IN_MARKET = 4;
	/**
	 * 状态5：在当铺
	 */
	//public static final int IN_SHOP = 5;
	/**
	 * 状态6：在邮件中
	 */
	//public static final int IN_MAIL = 6;
	/**
	 * 装备部位，武器
	 *//*
	public static final int TYPE_WEAPON = 1;
	*//**
	 * 装备部位，头盔
	 *//*
	public static final int TYPE_HELMET = 2;
	*//**
	 * 装备部位，铠甲
	 *//*
	public static final int TYPE_CLOTH = 3;
	*//**
	 * 装备部位，项链
	 *//*
	public static final int TYPE_NECKLACE = 4;
	*//**
	 * 装备部位，手镯
	 *//*
	public static final int TYPE_BRACELET = 5;
	*//**
	 * 装备部位，戒指
	 *//*
	public static final int TYPE_RING = 6;
	*//**
	 * 装备部位，天珠
	 *//*
	public static final int TYPE_BEAD = 7;
	*//**
	 * 装备部位，神兵装备1
	 *//*
	public static final int TYPE_SHEN_BING_1 = 11;
	*//**
	 * 装备部位，神兵装备2
	 *//*
	public static final int TYPE_SHEN_BING_2 = 12;
	*//**
	 * 装备部位，神兵装备3
	 *//*
	public static final int TYPE_SHEN_BING_3 = 13;
	*//**
	 * 装备部位，神兵装备4
	 *//*
	public static final int TYPE_SHEN_BING_4 = 14;*/
	
	/**
	 * 品质，白色，1
	 */
	public static final int QA_WHITE = 1;
	/**
	 * 品质，绿色，2
	 */
	public static final int QA_GREEN = 2;
	/**
	 * 品质，蓝色，3
	 */
	public static final int QA_BLUE = 3;
	/**
	 * 品质，紫色，4
	 */
	public static final int QA_PURPLE = 4;
	/**
	 * 品质，橙色，5
	 */
	public static final int QA_ORANGE = 5;
	/**
	 * 品质，红色，6
	 */
	public static final int QA_RED = 6;
	/**
	 * 附加属性最大系数
	 */
	public static final int ATTR_ADD_MAX = 15;
	
	/**
	 * 橙装碎片道具id
	 */
	public static final int ORANGE_ITEM_ID = 4105;
	
	/**
	 * 红装（王者装备）碎片道具id
	 */
	public static final int RED_ITEM_ID = 4106;
	
	/**
	 * 登陆发送装备数据的最大数量，50个装备
	 */
	public static final int SEND_MAX_NUM = 50;
	/**
	 * 转数跟装备等级参数
	 */
	public static final int ZSLEVELCONST = 1000;
	/**
	 * 将印穿戴开启
	 */
	public static final int JIANGYINGPART=2901;
	/**
	 * 神装装备红点
	 */
	public static final int SYS_ID=1901;
	
	/**
	 * 转生装备红点
	 */
	public static final int SYS_RESBORN_ID=4104;
	
	public static final ConcurrentHashMap<Integer, Integer> indexForId;
    static
    {
    	indexForId = new ConcurrentHashMap<Integer, Integer>();
    	indexForId.put(1, 102);
    	indexForId.put(2, 103);
    	indexForId.put(3, 104);
    	indexForId.put(102, 1);
    	indexForId.put(103, 2);
    	indexForId.put(104, 3);
    }
	
}
