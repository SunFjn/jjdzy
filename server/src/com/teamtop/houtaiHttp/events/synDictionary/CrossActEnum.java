package com.teamtop.houtaiHttp.events.synDictionary;

import com.teamtop.system.crossBoss.CrossBossIO;
import com.teamtop.system.crossDynastyWarriors.cross.DynastyWarriorsIO;
import com.teamtop.system.crossFireBeacon.cross.CrossFireBeaconIO;
import com.teamtop.system.crossKing.cross.CrossKingCrossIO;
import com.teamtop.system.crossSJMiJing.cross.CrossSJMiJingIO;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingCrossIO;
import com.teamtop.system.crossSoloRun.cross.SoloRunIO;
import com.teamtop.system.crossTeamFuBen.cross.CrossTeamFuBenIO;
import com.teamtop.system.hero.SystemIdConst;

public enum CrossActEnum {

	SOLORUN(SystemIdConst.SOLO_RUN, "单刀赴会", SoloRunIO.class),
	DYNASTYWARRIORS(SystemIdConst.DYNASTY_WARRIORS, "三国无双", DynastyWarriorsIO.class),
	CROSSBOSS(SystemIdConst.FUN_CROSS_BOSS_MH, "跨服boss(七擒孟获)", CrossBossIO.class),
	CROSSKING(SystemIdConst.CROSS_KING, "乱世枭雄", CrossKingCrossIO.class),
	CROSSSELECTKING(SystemIdConst.CROSS_SELECT_KING, "枭雄争霸", CrossSelectKingCrossIO.class),
	CROSSTEAM(SystemIdConst.FUN_CROSS_TEAM_FU_BEN, "跨服组队", CrossTeamFuBenIO.class),
	CROSSSJMIJING(SystemIdConst.CROSS_S_J_MI_JING, "升阶秘境", CrossSJMiJingIO.class),
	CROSSFIREBEACON(SystemIdConst.CROSS_FIRE_BEACON, "烽火狼烟", CrossFireBeaconIO.class),
	;

	private int sysId;

	private String name;

	private Class<?> crossIoClazz;

	private CrossActEnum(int sysId, String name, Class<?> crossIoClazz) {
		this.sysId = sysId;
		this.name = name;
		this.crossIoClazz = crossIoClazz;
	}

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Class<?> getCrossIoClazz() {
		return crossIoClazz;
	}

	public void setCrossIoClazz(Class<?> crossIoClazz) {
		this.crossIoClazz = crossIoClazz;
	}

	public static boolean find(Object obj) {
		for (CrossActEnum cEnum : values()) {
			Class<?> clazz = cEnum.getCrossIoClazz();
			if (obj == clazz) {
				return true;
			}
		}
		return false;
	}

}
