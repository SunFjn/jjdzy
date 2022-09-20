package com.teamtop.system.redPoint;

import java.util.Map;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ativitys.coupletAct.CoupletActFunction;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.archive.ArchiveFunction;
import com.teamtop.system.country.fightNorthAndSouth.FightNSConst;
import com.teamtop.system.country.fightNorthAndSouth.FightNSFunction;
import com.teamtop.system.country.kingship.KingShipManager;
import com.teamtop.system.crossBoss.CrossBossFunction;
import com.teamtop.system.generalSoul.GeneralSoulConst;
import com.teamtop.system.generalSoul.GeneralSoulFunction;
import com.teamtop.system.godOfWar.GodOfWarFunction;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.longZhongDui.LongZhongDuiFunction;
import com.teamtop.system.monsterSpirit.MonsterSpiritConst;
import com.teamtop.system.monsterSpirit.MonsterSpiritFunction;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;

public class RedPointSchedule extends AbsScheduleExecutor {

	private static int checkSecondTime = 0;

	private static int checkMinuteTime = 0;

	public RedPointSchedule(long delay, long interval) {
		super(delay, interval, false);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void execute(int now) {
		try {
			if (checkSecondTime == 0) {
				checkSecondTime = now;
			}
			if (checkMinuteTime == 0) {
				checkMinuteTime = now;
			}
			int minute = (now - checkMinuteTime) / 5;
			if (minute == 1) {
				checkMinuteTime = now;
				try {
					Map<Long, Hero> heroMap = HeroCache.getHeroMap();
					for (Hero hero : heroMap.values()) {
						try {
							singleHandle(hero);
							RedPointFunction.getIns().sendFastRedPoint(hero);
						} catch (Exception e) {
							LogTool.error(e, RedPointSchedule.class, "RedPointSchedule execute, hid=" + hero.getId());
						}
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "RedPointSchedule Check");
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RedPointSchedule.class, "RedPointSchedule");
		}
	}

	public void singleHandle(Hero hero) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				//旧王位之争不用
				try {
					//KingShipManager.getIns().calcrecoverTime(hero);
				}catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, RedPointSchedule.class, "KingShipManager Check");
				}
				// 南征北战
				try {
					boolean redPoint = FightNSFunction.getIns().checkRedPoint(hero);
					if (redPoint) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, FightNSConst.SysId, FightNSConst.FightNS,
								RedPointConst.HAS_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "FightNSFunction Check");
				}
				// 兽灵
				try {
					boolean redPoint = MonsterSpiritFunction.getIns().checkRedPoint(hero);
					if (redPoint) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, MonsterSpiritConst.SysId,
								MonsterSpiritConst.RedPoint, RedPointConst.HAS_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "MonsterSpiritFunction Check");
				}
				// 将魂
				try {
					boolean redPoint = GeneralSoulFunction.getIns().checkRedPoint(hero);
					if (redPoint) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, GeneralSoulConst.SysId,
								GeneralSoulConst.RedPoint, RedPointConst.HAS_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "GeneralSoulConst Check");
				}
				// 图鉴
				try {
					boolean redPoint = ArchiveFunction.getIns().checkRedPoint(hero);
					if (redPoint) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, ArchiveConst.SysId, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "ArchiveConst Check");
				}
				//装备红点
				/*try {
					boolean redPonint = EquipFunction.getIns().redPonint(hero);
					if (redPonint) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, EquipConst.SYS_ID, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "EquipFunction Check");
				}*/
				//武将
				try {
					boolean redPonint = WuJiangFunction.getIns().redPonint(hero);
					if (redPonint) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, WuJiangConst.SYSID, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "WuJiangFunction Check");
				}				
				//战甲
				try {
					ZhanJiaFunction.getIns().redPonint(hero, false);
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "ZhanJiaFunction Check");
				}	
				// 三国战神
				try {
					GodOfWarFunction.getIns().checkRedPointPub(hero);
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "GodOfWarFunction Check");
				}
				try {
					GuanqiaFunction.getIns().updateRedPoint(hero);
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "GuanqiaFunction Check");
				}
				//七擒孟获
				try {
					boolean redPonint = CrossBossFunction.getIns().isReadPoint(hero);
					if (redPonint) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.FUN_CROSS_BOSS_MH, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
					}else {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.FUN_CROSS_BOSS_MH, ArchiveConst.RedPoint,
								RedPointConst.NO_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "GuanqiaFunction Check");
				}
				//隆中对红点
				try {
					boolean redPonint = LongZhongDuiFunction.getIns().checkRedPoint(hero);
					if (redPonint) {
						LongZhongDuiFunction.getIns().fastSendRedPoint(hero, RedPointConst.HAS_RED);
					}else {
						LongZhongDuiFunction.getIns().fastSendRedPoint(hero, RedPointConst.NO_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "LongZhongDuiFunction Check");
				}
				//对对联红点
				try {
					CoupletActFunction.getIns().checkCoupletTimes(hero);
				} catch (Exception e) {
					LogTool.error(e, RedPointSchedule.class, "CoupletActFunction Check");
				}

			}

			@Override
			public Object getSession() {
				return hero.getId();
			}
		});
	}

}
