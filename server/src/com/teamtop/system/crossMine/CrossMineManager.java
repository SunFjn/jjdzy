package com.teamtop.system.crossMine;

import java.lang.reflect.Type;
import java.util.ArrayList;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.system.crossMine.model.CrossMineJoiner;
import com.teamtop.system.crossMine.model.CrossMineZhanBao;
import com.teamtop.system.crossMine.model.ZhanBao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

public class CrossMineManager {

	private static CrossMineManager ins;

	public static synchronized CrossMineManager getIns() {
		if (ins == null) {
			ins = new CrossMineManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().getUiInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "openUI has wrong");
		}
	}

	public void invitation(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().invitation(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "invitation has wrong");
		}
	}

	public void joinMine(Hero hero, long mineId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().joinMine(hero, mineId);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "joinMine has wrong");
		}
	}

	public void refreshMine(Hero hero, int type) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().refreshMine(hero, type);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "refreshMine has wrong");
		}
	}

	public void startMine(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().startMine(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "startMine has wrong");
		}
	}

	public void kickMiner(Hero hero, long minerId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().kickMiner(hero, minerId);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "kickMiner has wrong");
		}
	}

	public void leaveMine(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().leaveMine(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "leaveMine has wrong");
		}
	}

	public void gotoMine(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().gotoMine(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "gotoMine has wrong");
		}
	}

	public void searchMine(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().searchMine(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "searchMine has wrong");
		}
	}

	public void stealMine(Hero hero, long mineId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().stealMine(hero, mineId);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "stealMine has wrong");
		}

	}

	public void fightMine(Hero hero, long mineId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().fightMine(hero, mineId);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "fightMine has wrong");
		}

	}

	public void openReport(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			// [B:战斗结果 0 失败 1胜利 2顺手牵羊L:攻击者idU:攻击者名字nameB:抢夺的矿类型[B:道具类型I:道具idI:道具数量]奖励]战报数据
			CrossMineZhanBao crossMineZhanBao = CrossMineHisLocalCache.CrossMineZhanBao.get(hero.getId());
			if (crossMineZhanBao == null) {
				CrossMineSender.sendCmd_7224(hero.getId(), new Object[] {});
				return;
			}

			ArrayList<ZhanBao> zhanBaos = crossMineZhanBao.getZhanBaos();
			Object[] report = new Object[zhanBaos.size()];
			for (int i = 0; i < zhanBaos.size(); i++) {
				ZhanBao zhanBao = zhanBaos.get(i);
				int rest = 0;
				if (zhanBao.getType() == 1) {
					rest = zhanBao.getBattleRest();
				} else {
					rest = 2;
				}
				ArrayList<Object[]> list = new ArrayList<>();
				for (int k = 0; k < zhanBao.getRewards().length; k++) {
					Type type = new TypeReference<Object[]>() {
					}.getType();
					Object[] object = JSONObject.parseObject(zhanBao.getRewards()[k].toString(), type);
					list.add(object);
				}
				report[zhanBaos.size()-i-1] = new Object[] { rest, zhanBao.getQinger().getHid(), zhanBao.getQinger().getName(),
						zhanBao.getMineId(), list.toArray() };
			}
			CrossMineSender.sendCmd_7224(hero.getId(), report);
			
			CrossMineHisLocalCache.redPointPushZhanBao.remove(hero.getId());
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "openReport has wrong");
		}

	}

	/**
	 * 观看战报
	 * 
	 * @param hero
	 */
	public void lookReport(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			// [B:物品类型I:物品idI:物品数量]抢夺奖励L:胜利玩家IDI:头像IDI:将衔IDL:胜利者战力U:胜利者名字L:左边玩家IDL:右边玩家ID
			CrossMineZhanBao crossMineZhanBao = CrossMineHisLocalCache.CrossMineZhanBao.get(hero.getId());
			if (crossMineZhanBao == null) {
				return;
			}
			ArrayList<ZhanBao> zhanBaos = crossMineZhanBao.getZhanBaos();
			ZhanBao zhanBao = zhanBaos.get(zhanBaos.size() - index - 1);
			if (zhanBao.getType() == 1) {
				CrossMineJoiner qinger = zhanBao.getQinger();
				CrossMineJoiner isqinger = zhanBao.getIsqinger();
				// 是抢夺
				long winerID = 0;
				int headid = 0;
				int jiangXianID = 0;
				long winerPower = 0;
				String winerName = null;
				long leftPlayerID = qinger.getHid();
				long rightPlayerID = isqinger.getHid();
				int battleRest = zhanBao.getBattleRest();
				if (battleRest == 0) {
					// 1抢夺方胜利
					winerID = qinger.getHid();
					headid = qinger.getHerdid();
					jiangXianID = qinger.getOfficial();
					winerPower = qinger.getStrength();
					winerName = qinger.getName();
				} else {
					// 2抢夺方输了
					winerID = isqinger.getHid();
					headid = isqinger.getHerdid();
					jiangXianID = isqinger.getOfficial();
					winerPower = isqinger.getStrength();
					winerName = isqinger.getName();

				}
				CrossMineLocalIO.getIns().send(hero, qinger);
				CrossMineLocalIO.getIns().send(hero, isqinger);
				ArrayList<Object[]> list = new ArrayList<>();
				for (int i = 0; i < zhanBao.getRewards().length; i++) {
					Type type = new TypeReference<Object[]>() {
					}.getType();
					Object[] object = JSONObject.parseObject(zhanBao.getRewards()[i].toString(), type);
					list.add(object);
				}
				CrossMineSender.sendCmd_7228(hero.getId(), list.toArray(), winerID, headid, jiangXianID, winerPower,
						winerName, leftPlayerID, rightPlayerID);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "lookReport has wrong");
		}

	}

	public void getMineReward(Hero hero, long mineId) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_MINE)) {
				return;
			}
			CrossMineLocalIO.getIns().getMineReward(hero, mineId);
		} catch (Exception e) {
			LogTool.error(e, CrossMineManager.class, "getMineReward has wrong");
		}
	}

}
