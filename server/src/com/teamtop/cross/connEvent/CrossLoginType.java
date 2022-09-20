package com.teamtop.cross.connEvent;

import com.teamtop.system.hero.SystemIdConst;

import excel.config.Config_xitong_001;
import excel.struct.Struct_xitong_001;

/**
 * 跨服登陆常量
 * @author Administrator
 *
 */
public class CrossLoginType {
	/**
	 * 测试用
	 */
	public static final int TEST = 1;
	
	/**	 * 跨服BOSS-七擒孟获	 */
//	public static final int CROSS_BOSS = CrossBossConst.SYSID;
	/**	 * 跨服组队	 */
//	public static final int CROSS_TEAM_FUBEN = OpenFunctionConst.FUN_CROSS_TEAM_FU_BEN;
	/**	 * 升阶秘境	 */
//	public static final int CROSS_S_J_MI_JING = SystemIdConst.CROSS_S_J_MI_JING;
	/**	 * 烽火狼烟	 */
//	public static final int CROSS_FIREBEACON = CrossFireBeaconConst.SysId;
	
	public static String getSystemName(int type) {
		Struct_xitong_001 excel = Config_xitong_001.getIns().get( type);
		if(excel!=null) {
			return excel.getName();
		}else {
			return type+"(系统开启表没配置，赶紧配置哈)";
		}
//		
//		switch (type) {
//		case SystemIdConst.FUN_CROSS_BOSS_MH:
//			return "七擒孟获";
//		case SystemIdConst.FUN_CROSS_TEAM_FU_BEN:
//			return "跨服组队";
//		case SystemIdConst.CROSS_S_J_MI_JING:
//			return "升阶秘境";
//		case SystemIdConst.CROSS_FIRE_BEACON:
//			return "烽火狼烟";
//		case SystemIdConst.CROSS_WEN_DING_TIAN_XIA:
//			return "问鼎天下";
//		default:
//			break;
//		}
	}
}
