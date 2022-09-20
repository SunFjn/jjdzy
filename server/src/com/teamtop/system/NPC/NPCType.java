package com.teamtop.system.NPC;
/**
 * NPC类型
     * NPC类型
	 * 1.功能NPC
	 * 2.任务NPC
	 * 3。采集NPC
	 * 4.怪物
	 * 5.精英怪物
	 * 6.boss
 * @author Administrator
 *
 */
public class NPCType {
	/** 1.功能NPC*/
	public static final int TYPE_FUN = 1;
	/** 2.任务NPC*/
	public static final int TYPE_TASK = 2;
	/** 3。采集NPC*/
	public static final int TYPE_COLLECT = 3;
	/** 4.怪物*/
	public static final int TYPE_MONSTER = 4;
	/** 5.精英怪物*/
	public static final int TYPE_JINGYING = 5;
	/** 6.boss*/
	public static final int TYPE_BOSS = 6;
	/** 8.萝卜*/
	public static final int TYPE_RADISH = 8;
	/** 9.萝卜苗*/
	public static final int TYPE_LUOBOMIAO = 9;
	/** 10.乌龟*/
	public static final int TYPE_TURTLE = 10;
	/** 12.日常任务NPC*/
	public static final int TYPE_DAILY_NPC = 12;
	/** 13. 系统 */
	public static final int TYPE_SYSTEM_NPC = 13;
	/** 14.美女守护金属性  **/
	public static final int TYPE_PROTECT_BELLE_METAL = 14;
	/** 15.美女守护木属性  **/
	public static final int TYPE_PROTECT_BELLE_WOOD = 15;
	/** 16.美女守护水属性  **/
	public static final int TYPE_PROTECT_BELLE_WATER = 16;
	/** 17.美女守护火属性  **/
	public static final int TYPE_PROTECT_BELLE_FIRE = 17;
	/** 18.美女守护土属性  **/
	public static final int TYPE_PROTECT_BELLE_TERRA = 18;
	/** 19.美女守护宝箱  **/
	public static final int TYPE_PROTECT_BELLE_CHEST = 19;
	/** 26.群雄逐鹿宝箱  **/
	public static final int TYPE_COMPETE_HEGEMONY_CHEST = 26;
	/** 27.帮会竞技boss和精英  **/
	public static final int TYPE_GANG_COMPETITION_BOSS = 27;
	/** 28.帮会竞技小怪  **/
	public static final int TYPE_GANG_COMPETITION_COMMON = 28;
	/** 29.帮会竞技玄铁令  **/
	public static final int TYPE_GANG_COMPETITION_XUAN_TIE_LING = 29;
	/** 30.帮会竞技宝箱  **/
	public static final int TYPE_GANG_COMPETITION_TREASURE_CHEST = 30;
	/** 33.反恐精英buff **/
	public static final int TYPE_CS_BUFF = 33;
	/** 33.反恐精英指挥所 **/
	public static final int TYPE_CS_FACTORY = 34;
	/** 35.炸弹 **/
	public static final int TYPE_RUNNING_MAN_BOMB = 35;
	/** 36.奔跑兄弟巡逻兵 **/
	public static final int TYPE_RUNNING_MAN_NPC = 36;
	/** 37.火柱 **/
	public static final int TYPE_RUNNING_MAN_FIRE = 37;
	/** 38.沼泽**/
	public static final int TYPE_RUNNING_MAN_SWAMP = 38;
	/** 39.宝箱 **/
	public static final int TYPE_RUNNING_MAN_CHEST = 39;
	/** 40.反恐机器人 **/
	public static final int TYPE_CS_ROBBERT = 40;
	/** 41.石破天 **/
	public static final int TYPE_SHI_PO_TIAN_ROBBERT = 41;
	/** 45.野外boss掉落的采集npc **/
	public static final int TYPE_WILD_BOSS_COLLECT = 45;
	/** 46.跨服龙舟宝箱*/
	public static final int TYPE_DRAGON_BOAT_BOX = 46;
	/** 47.跨服龙舟技能宝箱*/
	public static final int TYPE_DRAGON_BOAT_SKILL = 47;
	/** 50：最强王者NPC旗帜*/
	public static final int TYPE_COUNTRY_FLAG = 50;
	/** 51：最强王者NPC投石车*/
	public static final int TYPE_COUNTRY_CATAPULT = 51;
	/** 52：最强王者NPC战车*/
	public static final int TYPE_COUNTRY_ROBBERT = 52;
	/** 53：最强王者NPC方向标*/
	public static final int TYPE_COUNTRY_DIR = 53;
	/** 54：江湖大盗（新野外boss宝箱）*/
	public static final int TYPE_DADAO_CHEST = 54;
	/** 55：江湖大盗（新野外boss）*/
	public static final int TYPE_DADAO_BOSS = 55;
	
	
	public static final int SHOW_TYPE_BATTLE = 3;
	public static final int SHOW_TYPE_NORMAL = 2;
	/** 20游街 */
	public static final int TYPE_MARRIAGE_PARADE = 20;
	/** 科举殿试采集字 */
	public static final int TYPE_EXAM_PALACE = 22;
	
	/**
	 * 获取前端用的NPC类型
	 * @param type npc表类型
	 * @return
	 */
	public static int getClientNPCType(int type){
		if(type==TYPE_FUN || type==TYPE_TASK || type==TYPE_COLLECT || type==TYPE_RADISH || type==TYPE_LUOBOMIAO || type==TYPE_TURTLE ||
				type == TYPE_PROTECT_BELLE_FIRE || type == TYPE_PROTECT_BELLE_METAL || type == TYPE_PROTECT_BELLE_TERRA ||
				type == TYPE_PROTECT_BELLE_WATER || type == TYPE_PROTECT_BELLE_WOOD || type == TYPE_PROTECT_BELLE_CHEST || 
				type == TYPE_SYSTEM_NPC || type == TYPE_EXAM_PALACE || type == TYPE_COMPETE_HEGEMONY_CHEST || 
				type == TYPE_GANG_COMPETITION_XUAN_TIE_LING || type == TYPE_GANG_COMPETITION_TREASURE_CHEST || type==TYPE_CS_BUFF || 
				type==TYPE_CS_FACTORY  ||  type==TYPE_RUNNING_MAN_CHEST ||  type==TYPE_RUNNING_MAN_FIRE || 
				type==TYPE_RUNNING_MAN_SWAMP || type==TYPE_RUNNING_MAN_NPC || type==TYPE_CS_ROBBERT || type == TYPE_SHI_PO_TIAN_ROBBERT ||
				type==TYPE_WILD_BOSS_COLLECT || type==TYPE_DRAGON_BOAT_BOX || type==TYPE_DRAGON_BOAT_SKILL || type == TYPE_DADAO_CHEST
				){
			return SHOW_TYPE_NORMAL;
		}else if(type == TYPE_MARRIAGE_PARADE ) {
			return TYPE_MARRIAGE_PARADE ;
		}else if(type == TYPE_RUNNING_MAN_BOMB ) {
			return TYPE_RUNNING_MAN_BOMB ;
		}else{
			return SHOW_TYPE_BATTLE;
		}
	}
}
