package com.teamtop.system.promotion;

/**
 * 晋升任务类型
 * @author hzp
 *
 */
public enum PromotionTaskType {

	REBORN(1, "转生"),
	ACTIVATE_TREASURE(2, "激活宝物"),
	ACTIVATE_GODBOOK(3, "激活天书"),
	ACTIVATE_EXCARIBUR(4, "激活神剑"),
	ACTIVATE_SPECIALTREASURE(5, "激活异宝"),
	ACTIVATE_GENERAL(6, "激活武将"),
	HERO_LEVEL(7, "玩家等级"),
	FORGE_INTENSIFY(8, "锻造强化等级"),
	FORGE_STARLEVEL(9, "锻造升星星级"),
	FORGE_GEM(10, "锻造宝石等级"),
	TREASURE_LEVEL(11, "宝物等级"),
	GODBOOK_LEVEL(12, "天书等级"),
	GENERAL_LEVEL(13, "武将等级"),
	ZHANJIA_LEVEL(14, "战甲等级"),
	ZHANGONG(15, "功勋"),
	DAILY_TASK(16, "完成每日任务"),
	EXCALIBUR_LEVEL(17, "神剑等级"),
	SPECIALTREASURE_LEVEL(18, "异宝等级"),
	BINGFA_LEVEL(19, "兵法等级"),
	ZHANJIA_JIHUO(20, "激活战甲"),
	BINGFA_JIHUO(21, "激活兵法"),
	DESTINY_LEVEL(22, "符文等级"),
	MONSTER_NUM(23, "兽灵洗练"),
	XINGXIU_DONG_LEVEL(24, "东方星宿等级"),
	XINGXIU_XI_LEVEL(25, "西方星宿等级"),
	XINGXIU_NAN_LEVEL(26, "南方星宿等级"),
	XINGXIU_BIE_LEVEL(27, "北方星宿等级"),
	LIU_LEALEAD_LEVEL(28,"刘禅亲密度等级"),
	CAO_LEALEAD_LEVEL(29,"曹冲亲密度等级"),
	SUN_LEALEAD_LEVEL(30,"孙鲁育亲密度等级"),
	;
	
	/*24：东方星宿等级
	   参数1：1            参数2：星宿等级
	25：西方星宿等级
	   参数1：1            参数2：星宿等级
	26：南方星宿等级
	   参数1：1            参数2：星宿等级
	27：北方星宿等级
	   参数1：1            参数2：星宿等级
	28：刘禅亲密度等级  
	   参数1：1            参数2：亲密度等级
	29：曹冲亲密度等级
	   参数1：1            参数2：亲密度等级
	30：孙鲁育亲密度等级
	   参数1：1            参数2：亲密度等级 */     
	   
	private int taskType;
	
	private String name;
	
	public int getTaskType() {
		return taskType;
	}

	public String getName() {
		return name;
	}

	private PromotionTaskType(int taskType, String name) {
		this.taskType = taskType;
		this.name = name;
	}
	
	public static PromotionTaskType getTaskType(int type) {
		for (PromotionTaskType pt : values()) {
			if (pt.getTaskType() == type) {
				return pt;
			}
		}
		return null;
	}

}
