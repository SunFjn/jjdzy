package com.teamtop.system.crossMine;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.crossMine.model.CrossMine;
import com.teamtop.system.crossMine.model.CrossMineAward;
import com.teamtop.system.crossMine.model.CrossMineJoiner;
import com.teamtop.system.crossMine.model.CrossMineLocalDao;
import com.teamtop.system.crossMine.model.CrossMineZhanBao;
import com.teamtop.system.crossMine.model.ZhanBao;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class CrossMineLocalIO {

	private static CrossMineLocalIO ins;

	public static synchronized CrossMineLocalIO getIns() {
		if (ins == null) {
			ins = new CrossMineLocalIO();
		}
		return ins;
	}

	/**
	 * 本服上传玩家数据并下发跨服数据给前端
	 * 
	 * @param hero
	 */
	public void getUiInfo(Hero hero) {
		try {
			CrossMineJoiner crossMineJoiner = CrossMineFunction.getIns().newCrossMineJoiner(hero);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.HelpMinerId, hero.getCrossMineLocal().getHelpMinerId());
			crossData.putObject(CrossMineEnum.CrossMineJoiner, crossMineJoiner);

			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_OPENUI_LC,
					crossData);
			if (writeBlockData == null)
				return;

			CrossMine crossMine = writeBlockData.getObject(CrossMineEnum.CrossMineInfo, CrossMine.class);
			CrossMine helpcrossMine = writeBlockData.getObject(CrossMineEnum.HelpCrossMineInfo, CrossMine.class);
			long crossTime = writeBlockData.getObject(CrossMineEnum.CrossTime, Long.class);
			long tomorrowCrossTime = writeBlockData.getObject(CrossMineEnum.TomorrowCrossTime, Long.class);
			// 矿信息
			ArrayList<Object> mineInfo = new ArrayList<Object>();

			mineInfo.add(CrossMineFunction.getIns().getMineInfo(hero.getId(), crossMine, crossTime, tomorrowCrossTime));

			// fix协助状态(临时)
			if (hero.getCrossMineLocal().getHelpMinerId() != -1) {
				boolean hadBug = true;
				if (helpcrossMine != null) {
					for (CrossMineJoiner joiner : helpcrossMine.getMinersInfo()) {
						if (joiner.getHid() == hero.getId()) {
							hadBug = false;
							break;
						}
					}
				}
				if (hadBug) {
					hero.getCrossMineLocal().setHelpMinerId(-1);
					helpcrossMine = null;
				}
			}

			if (helpcrossMine != null) {
				mineInfo.add(CrossMineFunction.getIns().getMineInfo(hero.getId(), helpcrossMine, crossTime,
						tomorrowCrossTime));
			}

			boolean isOpen = CrossMineFunction.getIns().isMineOpen();

			CrossMineSender.sendCmd_7202(hero.getId(), isOpen ? 0 : 1, hero.getCrossMineLocal().getStealTimes(),
					hero.getCrossMineLocal().getFightTimes(), mineInfo.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "getUiInfo has wrong");
		}
	}

	/**
	 * 发送邀请到跨服让跨服转发到其他子服
	 * 
	 * @param hero
	 */
	public void invitation(Hero hero) {
		try {
			// boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			// if (!isOpen) {
			// // 活动未开启
			// CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
			// return;
			// }
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());

			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_INVITATION_LC,
					crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);
			CrossMineSender.sendCmd_7204(hero.getId(), state);
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "invitation has wrong");
		}
	}

	/**
	 * 加入挖矿
	 * 
	 * @param hero
	 */
	public void joinMine(Hero hero, long mineId) {
		try {
			// boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			// if (!isOpen) {
			// // 活动未开启
			// CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
			// return;
			// }
			if (hero.getCrossMineLocal().getHelpMinerId() > 0) {
				CrossMineSender.sendCmd_7206(hero.getId(), 1);
				return;
			}
			
			if(hero.getId() == mineId) {
				// 自己矿不能进
				return;
			}

			CrossMineJoiner crossMineJoiner = CrossMineFunction.getIns().newCrossMineJoiner(hero);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, mineId);
			crossData.putObject(CrossMineEnum.CrossMineJoiner, crossMineJoiner);

			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_JOIN_MINE_LC,
					crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);
			if (state == 0) {
				// 加入成功
				hero.getCrossMineLocal().setHelpMinerId(mineId);
			}
			CrossMineSender.sendCmd_7206(hero.getId(), state);
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "joinMine has wrong");
		}
	}

	/**
	 * 刷新自己的矿藏
	 * 
	 * @param hero
	 */
	public void refreshMine(Hero hero, int type) {
		try {
			boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			if (!isOpen) {
				// 活动未开启
				CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
				return;
			}

			Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(CrossMineConst.CONST_6608);
			if (type == 0) {
				// 一键
				excel = Config_xtcs_004.getIns().get(CrossMineConst.CONST_6609);
			}

			if (!UseAddUtil.canUse(hero, excel.getOther())) {
				// 道具不足
				CrossMineSender.sendCmd_7208(hero.getId(), 4, 0);
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.Type, type);

			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_MINE_REFRESH_MINE_LC, crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);
			if (state == 0) {
				UseAddUtil.use(hero, excel.getOther(), SourceGoodConst.CROSS_MINE_REFRESH, true);
				int mineId = writeBlockData.getObject(CrossMineEnum.MineId, Integer.class);
				CrossMineSender.sendCmd_7208(hero.getId(), state, mineId);
				return;
			}
			CrossMineSender.sendCmd_7208(hero.getId(), state, 1);
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "refreshMine has wrong");
		}
	}

	/**
	 * 开始开采矿藏
	 * 
	 * @param hero
	 */
	public void startMine(Hero hero) {
		try {
			boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			if (!isOpen) {
				// 活动未开启
				CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
				return;
			}
			CrossMineJoiner crossMineJoiner = CrossMineFunction.getIns().newCrossMineJoiner(hero);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.CrossMineJoiner, crossMineJoiner);

			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_START_MINE_LC,
					crossData);
			if (writeBlockData == null)
				return;
			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_5, 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_10, 1, 0);
			int mineId = writeBlockData.getObject(CrossMineEnum.mineId, Integer.class);
			if (mineId == 5) {
				// 三国战令(活动)
				WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_12, 1);
				// 宝藏碎片(活动)
				BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_4, 1);
			}
			CrossMineSender.sendCmd_7210(hero.getId(), state);
			
			
			
			
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "startMine has wrong");
		}
	}

	/**
	 * 踢出矿工
	 * 
	 * @param hero
	 */
	public void kickMiner(Hero hero, long minerId) {
		try {
			// boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			// if (!isOpen) {
			// // 活动未开启
			// CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
			// return;
			// }
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.MinerId, minerId);

			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_KICK_MINER_LC,
					crossData);
			if (writeBlockData == null)
				return;
			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);
			CrossMineSender.sendCmd_7212(hero.getId(), state, minerId);
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "kickMiner has wrong");
		}
	}

	/**
	 * 离开挖矿
	 * 
	 * @param hero
	 */
	public void leaveMine(Hero hero) {
		try {
			// boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			// if (!isOpen) {
			// // 活动未开启
			// CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
			// return;
			// }
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.HelpMinerId, hero.getCrossMineLocal().getHelpMinerId());

			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_LEAVE_MINE_LC,
					crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);
			if (state == 0) {
				hero.getCrossMineLocal().setHelpMinerId(-1);
			}

			CrossMineSender.sendCmd_7214(hero.getId(), state);
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "leaveMine has wrong");
		}
	}

	/**
	 * 前往跨服矿区
	 * 
	 * @param hero
	 */
	public void gotoMine(Hero hero) {
		try {
			boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			if (!isOpen) {
				// 活动未开启
				CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
				return;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.MineIdList, hero.getCrossMineLocal().getMineIdList());

			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_GOTO_MINE_LC,
					crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);

			Type type = new TypeReference<List<CrossMine>>() {
			}.getType();
			List<CrossMine> list = writeBlockData.getObject(CrossMineEnum.CrossMineInfos, type);
			// 矿信息
			ArrayList<Object> mineInfo = new ArrayList<Object>();
			for (CrossMine mine : list) {
				mineInfo.add(new Object[] { mine.getMineId(), mine.getHid(), mine.getStealTimes(), mine.getFightTimes(),
						CrossMineFunction.getIns().getMinersInfo(mine),
						CrossMineFunction.getIns().getMineStealAwards(mine, true),
						CrossMineFunction.getIns().getMineFightAwards(mine, true) });
			}

			int searchTimes = 1 - hero.getCrossMineLocal().getSearchTimes();
			if (searchTimes < 0) {
				searchTimes = 0;
			}
			CrossMineSender.sendCmd_7216(hero.getId(), state, searchTimes, mineInfo.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "gotoMine has wrong");
		}
	}

	/**
	 * 搜索矿藏
	 * 
	 * @param hero
	 */
	public void searchMine(Hero hero) {
		try {
			boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			if (!isOpen) {
				// 活动未开启
				CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.HelpMinerId, hero.getCrossMineLocal().getHelpMinerId());
			crossData.putObject(CrossMineEnum.MineIdList, hero.getCrossMineLocal().getMineIdList());
			crossData.putObject(CrossMineEnum.belongZoneid, GameProperties.getFirstZoneId());
			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero,
					CrossConst.CROSS_MINE_SEARCH_MINE_LC, crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);
			Type type = new TypeReference<List<CrossMine>>() {
			}.getType();
			List<CrossMine> list = writeBlockData.getObject(CrossMineEnum.CrossMineInfos, type);
			if (list.isEmpty()) {
				CrossMineSender.sendCmd_7218(hero.getId(), 2, new Object[] {});
				return;
			}
			if (hero.getCrossMineLocal().getSearchTimes() > 0) {
				Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(CrossMineConst.CONST_6607);
				if (!UseAddUtil.canUse(hero, excel.getOther())) {
					// 道具不足
					CrossMineSender.sendCmd_7218(hero.getId(), 1, new Object[] {});
					return;
				}

				UseAddUtil.use(hero, excel.getOther(), SourceGoodConst.CROSS_MINE_SEARCH, true);
			}

			List<Long> idList = hero.getCrossMineLocal().getMineIdList();
			if (idList == null) {
				idList = new ArrayList<>();
				hero.getCrossMineLocal().setMineIdList(idList);
			}

			idList.clear();

			// 矿信息
			ArrayList<Object> mineInfo = new ArrayList<Object>();
			for (CrossMine mine : list) {
				idList.add(mine.getHid());
				mineInfo.add(new Object[] { mine.getMineId(), mine.getHid(), mine.getStealTimes(), mine.getFightTimes(),
						CrossMineFunction.getIns().getMinersInfo(mine),
						CrossMineFunction.getIns().getMineStealAwards(mine, true),
						CrossMineFunction.getIns().getMineFightAwards(mine, true) });
			}

			hero.getCrossMineLocal().setSearchTimes(hero.getCrossMineLocal().getSearchTimes() + 1);
			CrossMineSender.sendCmd_7218(hero.getId(), state, mineInfo.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "invitation has wrong");
		}
	}

	/**
	 * 抢夺矿
	 * 
	 * @param hero
	 * @param goalHid
	 */
	public void fightMine(Hero hero, long goalHid) {
		try {
			boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			if (!isOpen) {
				// 活动未开启
				CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
				return;
			}

			if (hero.getId() == goalHid) {
				return;
			}
			if (!hero.getCrossMineLocal().getMineIdList().contains(goalHid)) {
				return;
			}

			// 0成功 1采矿时间已结束,矿场关闭 2今日抢夺次数已耗尽4该矿藏已被抢夺X次,给条活路吧
			if (hero.getCrossMineLocal().getFightTimes() <= 0) {
				CrossMineSender.sendCmd_7222(hero.getId(), 2, null, 0, 0, 0, 0, "", 0, 0);
				return;
			}

			Channel channel = Client_2.getIns().getCrossChannel();
			if (channel == null || !channel.isOpen()) {
				LogTool.warn("channel == null || !channel.isOpen() fightMine", CrossMineLocalIO.class);
				return;
			}
			CrossData crossData = new CrossData();
			CrossMineJoiner crossMineJoiner = CrossMineFunction.getIns().newCrossMineJoiner(hero);
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.CrossMineJoiner, crossMineJoiner);
			crossData.putObject(CrossMineEnum.fightMineid, goalHid);

			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.CROSS_MINE_FightMine, hero.getId(),
					crossData);
			if (writeBlockData == null) {
				LogTool.warn("writeBlockData == null ", CrossMineLocalIO.class);
				return;
			}
			//// 0成功 1采矿时间已结束,矿场关闭 2今日抢夺次数已耗尽 4该矿藏已被抢夺X次,给条活路吧
			int fightRest = writeBlockData.getObject(CrossMineEnum.fightRest, Integer.class);
			if (fightRest == 3) {
				// 没资源可抢
				CrossMineSender.sendCmd_7222(hero.getId(), 3, null, 0, 0, 0, 0, null, 0, 0);
				return;
			}
			if (fightRest != 0) {
				CrossMineSender.sendCmd_7222(hero.getId(), 4, null, 0, 0, 0, 0, null, 0, 0);
				return;
			} else {
				// 正常战斗
				Integer battleRest = writeBlockData.getObject(CrossMineEnum.battleRest, Integer.class);
				crossMineJoiner = writeBlockData.getObject(CrossMineEnum.CrossMineJoiner, CrossMineJoiner.class);
				Object[] rewards = writeBlockData.getObject(CrossMineEnum.qiangReward, Object[].class);
				if (rewards.length > 0) {
					UseAddUtil.add(hero, CrossMineFunction.getIns().objectToArr(rewards),
							SourceGoodConst.CROSS_MINE_FIGHT, UseAddUtil.getDefaultMail(), true);
				}
				// [B:物品类型I:物品idI:物品数量]抢夺奖励L:胜利者IDI:头像IDI:将衔IDL:胜利者战力U:胜利者名字L:左边玩家IDL:右边玩家ID
				long winerID = 0;
				int headid = 0;
				int jiangXianID = 0;
				long winerPower = 0;
				String winerName = null;
				long leftPlayerID = hero.getId();
				long rightPlayerID = crossMineJoiner.getHid();
				if (battleRest == 1) {
					// 1抢夺方胜利
					winerID = hero.getId();
					headid = hero.getIcon();
					jiangXianID = hero.getOfficial();
					winerPower = hero.getTotalStrength();
					winerName = hero.getNameZoneid();
				} else {
					// 2抢夺方输了
					winerID = crossMineJoiner.getHid();
					headid = crossMineJoiner.getHerdid();
					jiangXianID = crossMineJoiner.getOfficial();
					winerPower = crossMineJoiner.getStrength();
					winerName = crossMineJoiner.getName();

				}
				send(hero, crossMineJoiner);
				crossMineJoiner = CrossMineFunction.getIns().newCrossMineJoiner(hero);
				send(hero, crossMineJoiner);

				hero.getCrossMineLocal().setFightTimes(hero.getCrossMineLocal().getFightTimes() - 1);

				ArrayList<Object[]> list = new ArrayList<>();
				for (int i = 0; i < rewards.length; i++) {
					Type type = new TypeReference<Object[]>() {
					}.getType();
					Object[] object = JSONObject.parseObject(rewards[i].toString(), type);
					list.add(object);
				}

				CrossMineSender.sendCmd_7222(hero.getId(), 0, list.toArray(), winerID, headid, jiangXianID, winerPower,
						winerName, leftPlayerID, rightPlayerID);
				gotoMine(hero);
				CrossMineFunction.getIns().updateRedPoint(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "fightMine has wrong");
		}

	}

	/**
	 * 发生抢夺参与者的属性
	 * 
	 * @param hero
	 * @param crossMineJoiner
	 */
	public void send(Hero hero, CrossMineJoiner crossMineJoiner) {
		try {
			Map<Integer, SkillInfo> skillMap = crossMineJoiner.getSkill().getSkillMap();
			List<Object[]> attrData = new ArrayList<Object[]>();
			FinalFightAttr attr = crossMineJoiner.getFinalFightAttr();
			// 技能数据
			int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(crossMineJoiner.getJob(),
					crossMineJoiner.getWujiang());
			Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero,
					crossMineJoiner.getHid(), godSkillLevel, crossMineJoiner.getJob());
			List<Object[]> skillData = new ArrayList<Object[]>();
			for (Entry<Integer, SkillInfo> entry : skillMap.entrySet()) {
				int index = entry.getKey();
				SkillInfo skillInfo = entry.getValue();
				Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillInfo.getId()))
						.orElse(0);
				skillData.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel(), skillHurtAdd });
			}
			ShowModel showModel = crossMineJoiner.getModel();
			int fashionID = showModel.getBodyModel();
			List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(crossMineJoiner.getFinalFightAttr());
			attrData.add(new Object[] { attr.getUid(), crossMineJoiner.getJob(), attrSendData.toArray(),
					skillData.toArray(), fashionID });
			List<Object[]> extdataList = new ArrayList<>();
			int wearTreasure1 = 0;
			int baowu1Star = 0;
			int wearTreasure2 = 0;
			int baowu2Star = 0;
			int godBookid = 0;
			int godBookStar = 0;
			int wujiangStar = 0;
			int godWeapon=crossMineJoiner.getModel().getWeaponModel();

			int nowjob = crossMineJoiner.getJob();
			if (nowjob > 1000) {
				nowjob = nowjob / 1000;
			}
			WuJiang wujiang = crossMineJoiner.getWujiang();
			if (wujiang != null) {
				HashMap<Integer, WuJiangModel> wujiangs = wujiang.getWujiangs();
				if (wujiangs != null && wujiangs.containsKey(nowjob)) {
					wujiangStar = wujiangs.get(nowjob).getStar();
				}
			}
			extdataList.add(new Object[] { wearTreasure1 });
			extdataList.add(new Object[] { baowu1Star });
			extdataList.add(new Object[] { wearTreasure2 });
			extdataList.add(new Object[] { baowu2Star });
			extdataList.add(new Object[] { godBookid });
			extdataList.add(new Object[] { godBookStar });
			extdataList.add(new Object[] { wujiangStar });
			extdataList.add(new Object[] { godWeapon});
			extdataList.add(new Object[] { 0});
			// 少主信息
			int withLeaderId = 0;
			int withLeaderFid = 0;
			int leaderStarId = 0;
			int leaderSkillId = 0;
			
			LittleLeader littleLeader = crossMineJoiner.getLittleLeader();
			if (littleLeader != null) {
				withLeaderId = littleLeader.getWearType();
				if (withLeaderId != 0) {
					LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
					withLeaderFid = littleLeaderModel.getNowFashId();
					leaderStarId = littleLeaderModel.getStar();
					leaderSkillId = littleLeaderModel.getActivityKillLv();
				}

			}
			HeroSender.sendCmd_130(hero.getId(), crossMineJoiner.getHid(), crossMineJoiner.getName(), 0,
					crossMineJoiner.getCountry(), 0, crossMineJoiner.getFigthMonsterSpirit(), attrData.toArray(),
					crossMineJoiner.getStrength(), extdataList.toArray(), withLeaderId, withLeaderFid, leaderStarId,
					leaderSkillId);
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "send has wrong");
		}

	}

	/**
	 * 来自中央服 被抢夺的战报
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void LRCIsfightMine(Channel channel, CrossData crossData) {
		try {
			Integer battleRest = crossData.getObject(CrossMineEnum.battleRest, Integer.class);
			CrossMineJoiner qianer = crossData.getObject(CrossMineEnum.qianger, CrossMineJoiner.class);
			CrossMineJoiner isqianer = crossData.getObject(CrossMineEnum.isqianger, CrossMineJoiner.class);
			Integer mineId = crossData.getObject(CrossMineEnum.mineId, Integer.class);
			Object[] rewards = crossData.getObject(CrossMineEnum.qiangReward, Object[].class);
			Long fightMineid = crossData.getObject(CrossMineEnum.fightMineid, Long.class);
			int ret = 0;
			if (battleRest == 1) {
				// 1抢夺方胜利
				ret = 0;
			} else {
				// 2抢夺方输了
				ret = 1;
			}
			ZhanBao zhanBao = new ZhanBao(1, ret, qianer, isqianer, rewards, mineId);
			if (CrossMineHisLocalCache.CrossMineZhanBao.containsKey(fightMineid)) {
				CrossMineZhanBao crossMineZhanBao = CrossMineHisLocalCache.CrossMineZhanBao.get(fightMineid);
				if (crossMineZhanBao.getZhanBaos().size() >= 5) {
					crossMineZhanBao.getZhanBaos().remove(0);
					crossMineZhanBao.getZhanBaos().add(zhanBao);
				} else {
					crossMineZhanBao.getZhanBaos().add(zhanBao);
				}
			} else {
				CrossMineZhanBao crossMineZhanBao = new CrossMineZhanBao();
				crossMineZhanBao.setHid(fightMineid);
				crossMineZhanBao.setZhanBaos(new ArrayList<>());
				crossMineZhanBao.getZhanBaos().add(zhanBao);
				CrossMineHisLocalCache.CrossMineZhanBao.put(fightMineid, crossMineZhanBao);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "LRCIsfightMine has wrong");
		}

	}

	/**
	 * 偷人
	 * 
	 * @param hero
	 * @param goalHid
	 */
	public void stealMine(Hero hero, long goalHid) {
		try {
			boolean isOpen = CrossMineFunction.getIns().isMineOpen();
			if (!isOpen) {
				// 活动未开启
				CrossMineSender.sendCmd_7238(hero.getId(), isOpen ? 0 : 1);
				return;
			}

			if (hero.getId() == goalHid) {
				CrossMineSender.sendCmd_7220(hero.getId(), 1);
				return;
			}
			if (!hero.getCrossMineLocal().getMineIdList().contains(goalHid)) {
				CrossMineSender.sendCmd_7220(hero.getId(), 2);
				return;
			}

			if (hero.getCrossMineLocal().getStealTimes() <= 0) {
				CrossMineSender.sendCmd_7220(hero.getId(), 3);
				return;
			}

			Channel channel = Client_2.getIns().getCrossChannel();
			if (channel == null || !channel.isOpen()) {
				LogTool.warn("channel == null || !channel.isOpen() stealMine", CrossMineLocalIO.class);
				return;
			}

			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.name, hero.getNameZoneid());
			crossData.putObject(CrossMineEnum.stealMineId, goalHid);

			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.CROSS_MINE_stealMine, hero.getId(),
					crossData);
			if (writeBlockData == null) {
				LogTool.warn("writeBlockData == null ", CrossMineLocalIO.class);
				return;
			}
			int stealRest = writeBlockData.getObject(CrossMineEnum.stealRest, Integer.class);
			if (stealRest != 0) {
				CrossMineSender.sendCmd_7220(hero.getId(), stealRest);
				return;
			}

			hero.getCrossMineLocal().setStealTimes(hero.getCrossMineLocal().getStealTimes() - 1);

			Object[] rewards = writeBlockData.getObject(CrossMineEnum.stealReward, Object[].class);
			if (rewards.length > 0) {
				UseAddUtil.add(hero, CrossMineFunction.getIns().objectToArr(rewards), SourceGoodConst.CROSS_MINE_STEAL,
						UseAddUtil.getDefaultMail(), true);
			}

			CrossMineSender.sendCmd_7220(hero.getId(), 0);
			gotoMine(hero);
			CrossMineFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "stealMine has wrong ");
		}

	}

	/**
	 * 来自中央服 被顺手的战报
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void LRCNoticeStealMine(Channel channel, CrossData crossData) {
		try {
			// 小偷id
			Long xiaotou = crossData.getObject(CrossMineEnum.Hid, Long.class);
			String name = crossData.getObject(CrossMineEnum.name, String.class);
			// 矿类型
			Integer mineId = crossData.getObject(CrossMineEnum.mineId, Integer.class);
			// 被偷奖励
			Object[] rewards = crossData.getObject(CrossMineEnum.stealReward, Object[].class);
			// 被偷的玩家id
			Long fightMineid = crossData.getObject(CrossMineEnum.fightMineid, Long.class);
			CrossMineJoiner qinger = new CrossMineJoiner();
			qinger.setHid(xiaotou);
			qinger.setName(name);
			CrossMineJoiner isqinger = new CrossMineJoiner();
			isqinger.setHid(fightMineid);
			ZhanBao zhanBao = new ZhanBao(2, 1, qinger, isqinger, rewards, mineId);
			if (CrossMineHisLocalCache.CrossMineZhanBao.containsKey(fightMineid)) {
				CrossMineZhanBao crossMineZhanBao = CrossMineHisLocalCache.CrossMineZhanBao.get(fightMineid);
				if (crossMineZhanBao.getZhanBaos().size() >= 5) {
					crossMineZhanBao.getZhanBaos().remove(0);
					crossMineZhanBao.getZhanBaos().add(zhanBao);
				} else {
					crossMineZhanBao.getZhanBaos().add(zhanBao);
				}

			} else {
				CrossMineZhanBao crossMineZhanBao = new CrossMineZhanBao();
				crossMineZhanBao.setHid(fightMineid);
				crossMineZhanBao.setZhanBaos(new ArrayList<>());
				crossMineZhanBao.getZhanBaos().add(zhanBao);
				CrossMineHisLocalCache.CrossMineZhanBao.put(fightMineid, crossMineZhanBao);
			}

		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "LRCNoticeStealMine has wrong");
		}
	}

	/**
	 * 获取奖励
	 * 
	 * @param hero
	 */
	public void getMineReward(Hero hero, long mineId) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossMineEnum.Hid, hero.getId());
			crossData.putObject(CrossMineEnum.MineId, mineId);
			CrossData writeBlockData = CrossMineFunction.getIns().sendToCross(hero, CrossConst.CROSS_MINE_GET_AWARD_LC,
					crossData);
			if (writeBlockData == null)
				return;

			int state = writeBlockData.getObject(CrossMineEnum.State, Integer.class);
			int newPz = writeBlockData.getObject(CrossMineEnum.MineId, Integer.class);
			CrossMine crossMine = writeBlockData.getObject(CrossMineEnum.CrossMineInfo, CrossMine.class);

			if (state == 0) {
				for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
					if (miner.getHid() == hero.getId()) {
						List<int[]> awardList = new ArrayList<int[]>();
						for (CrossMineAward reward : miner.getRewards()) {
							int num = reward.getCount() - reward.getLostNum();
							if (num <= 0) {
								continue;
							}
							awardList.add(new int[] { reward.getAwardType(), reward.getAwardId(), num });
						}

						int size = awardList.size();
						int[][] AwardArray = new int[size][];
						awardList.toArray(AwardArray);
						
						if (crossMine.getHid() != hero.getId()) {
							UseAddUtil.add(hero, AwardArray, SourceGoodConst.CROSS_MINE_HELP_REWARD, UseAddUtil.getDefaultMail(),
									true);
						}else {
							UseAddUtil.add(hero, AwardArray, SourceGoodConst.CROSS_MINE_REWARD, UseAddUtil.getDefaultMail(),
									true);
						}
						break;
					}
				}
				if (crossMine.getHid() != hero.getId()) {
					// 矿工需要清除协助id
					hero.getCrossMineLocal().setHelpMinerId(-1);
				}
			}
			CrossMineSender.sendCmd_7234(hero.getId(), state, newPz);
			getUiInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, CrossMineLocalIO.class, "getMineReward has wrong");
		}
	}

	/**
	 * 收到跨服通知广播邀请信息
	 */
	public void sendInvitationInfo(Channel channel, CrossData data) {
		long hid = data.getObject(CrossMineEnum.Hid, Long.class);
		String name = data.getObject(CrossMineEnum.Name, String.class);
		int mineId = data.getObject(CrossMineEnum.MineId, Integer.class);
		Map<Long, Hero> roleCache = HeroCache.getHeroMap();
		Iterator<Hero> it = roleCache.values().iterator();
		while (it.hasNext()) {
			Hero role = it.next();
			CrossMineSender.sendCmd_7230(role.getId(), hid, name, mineId);
		}
	}

	/**
	 * 收到跨服通知广播状态信息
	 */
	public void sendNewMinerInfo(Channel channel, CrossData data) {
		long hid = data.getObject(CrossMineEnum.Hid, Long.class);
		int type = data.getObject(CrossMineEnum.Type, Integer.class);
		String name = data.getObject(CrossMineEnum.Name, String.class);
		long crossTime = data.getObject(CrossMineEnum.CrossTime, Long.class);
		long tomorrowCrossTime = data.getObject(CrossMineEnum.TomorrowCrossTime, Long.class);
		CrossMine crossMine = data.getObject(CrossMineEnum.CrossMineInfo, CrossMine.class);
		Hero hero = HeroCache.getHero(hid);

		if (type == 9) {
			// 发放奖励
			for (CrossMineJoiner miner : crossMine.getMinersInfo()) {
				if (miner.getHid() == hid) {
					List<int[]> awardList = new ArrayList<int[]>();
					for (CrossMineAward reward : miner.getRewards()) {
						int num = reward.getCount() - reward.getLostNum();
						if (num <= 0) {
							continue;
						}
						awardList.add(new int[] { reward.getAwardType(), reward.getAwardId(), num });
					}

					int size = awardList.size();
					int[][] AwardArray = new int[size][];
					awardList.toArray(AwardArray);
					int mailId = MailConst.CROSS_MINE_REWARD;
					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, AwardArray);
					if (hero == null) {
						// 玩家不在线
						try {
							CrossMineLocalDao.getIns().updataCrossMine(hid);
						} catch (Exception e) {
							e.printStackTrace();
						}
						break;
					} else {
						hero.getCrossMineLocal().setHelpMinerId(-1);
					}
					break;
				}
			}
		}
		boolean hadSend = false;
		for (CrossMineJoiner joiner : crossMine.getMinersInfo()) {
			if (joiner.getHid() == hid) {
				ArrayList<Object> rewards = new ArrayList<Object>();
				if (joiner.getRewards() != null) {
					for (CrossMineAward reward : joiner.getRewards()) {
						if (reward != null) {
							rewards.add(new Object[] { reward.getAwardType(), reward.getAwardId(), reward.getCount(),
									reward.getLostNum() });
						}
					}
				}
				hadSend = true;
				CrossMineSender.sendCmd_7236(hid, type, name, crossMine.getMineId(), crossMine.getHid(),
						crossMine.getStealTimes(), crossMine.getFightTimes(),
						CrossMineFunction.getIns().getTime(crossTime, tomorrowCrossTime, crossMine), rewards.toArray(),
						CrossMineFunction.getIns().getMinersInfo(crossMine));
				if (type == 5 || type == 6) {
					// 被顺或者被抢
					CrossMineHisLocalCache.redPointPushZhanBao.add(hid);
					if (hero == null || !hero.isOnline()) {
						CrossMineHisLocalCache.LoginPushZhanBao.add(hid);
					} else {
						CrossMineSender.sendCmd_7226(hid, 0);
					}
				}
				break;
			}
		}

		if (type == 3 && !hadSend) {
			// 被矿主踢了特殊处理
			hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_ALL);
			hero.getCrossMineLocal().setHelpMinerId(-1);
			ArrayList<Object> rewards = new ArrayList<Object>();
			CrossMineSender.sendCmd_7236(hid, type, name, crossMine.getMineId(), crossMine.getHid(),
					crossMine.getStealTimes(), crossMine.getFightTimes(),
					CrossMineFunction.getIns().getTime(crossTime, tomorrowCrossTime, crossMine), rewards.toArray(),
					CrossMineFunction.getIns().getMinersInfo(crossMine));
		}

		CrossMineFunction.getIns().updateRedPoint(hero);
	}

}
