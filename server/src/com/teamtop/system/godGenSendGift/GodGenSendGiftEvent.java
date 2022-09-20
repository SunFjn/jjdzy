package com.teamtop.system.godGenSendGift;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.CrossZone;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.godGenSendGift.model.GodGenSendGift;
import com.teamtop.system.godGenSendGift.model.GodGenSendGiftRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_cbgmb1_729;
import excel.config.Config_xitong_001;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_cbgmb1_729;
import excel.struct.Struct_cbgrank1_729;

public class GodGenSendGiftEvent extends AbsSystemEvent {

	private static GodGenSendGiftEvent ins;

	private GodGenSendGiftEvent() {
		// TODO Auto-generated constructor stub
	}

	public static GodGenSendGiftEvent getIns() {
		if (ins == null) {
			ins = new GodGenSendGiftEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		GodGenSendGift godGenSendGiftModel = hero.getGodGenSendGift();
		if (godGenSendGiftModel == null) {
			godGenSendGiftModel = new GodGenSendGift();
			godGenSendGiftModel.setHid(hero.getId());
			godGenSendGiftModel.setAwardStateMap(new HashMap<>());
			hero.setGodGenSendGift(godGenSendGiftModel);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		Map<Integer, Integer> awardStateMap = hero.getGodGenSendGift().getAwardStateMap();
		for (Integer state : awardStateMap.values()) {
			if (state == GodGenSendGiftConst.CAN_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.GODGENSENDGIFT, 1,
						RedPointConst.HAS_RED);
				return;
			}
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// TODO Auto-generated method stub
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		int id = 0;
		int state = 0;
		try {
			int day = Config_xitong_001.getIns().get(SystemIdConst.GODGENSENDGIFT).getDay() % 1000;
			int betweenOpen = TimeDateUtil.betweenOpen();
			if (GodGenSendGiftFunction.getIns().isOldServer()) {
				day = GodGenSendGiftConst.OLD_END_DAY;
			} else {
				int openDay = GodGenSendGiftConst.NEW_OPEN_DAY;
				if (betweenOpen < openDay) {
					return;
				}
			}
			int qs = GodGenSendGiftFunction.getIns().getQs();
			GodGenSendGift godGenSendGift = hero.getGodGenSendGift();
			int heroQs = godGenSendGift.getQs();

			boolean sendAward = isSendAward();
			// 新加字段，初始化
			if (betweenOpen <= day) {
				if (heroQs == 0 && !sendAward) {
					godGenSendGift.setQs(qs);
					heroQs = qs;
				}
				// 判断期数不同则发奖励，清除数据
				if (qs == heroQs) {
					return;
				}
				godGenSendGift.setQs(qs);
			} else {
				if (heroQs == -1) {
					return;
				}
				godGenSendGift.setQs(-1);
			}
			Map<Integer, Integer> awardStateMap = godGenSendGift.getAwardStateMap();
			for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
				state = entry.getValue();
				if (state == GodGenSendGiftConst.CAN_GET) {
					id = entry.getKey();
					Struct_cbgmb1_729 struct_cbgmb1_729 = Config_cbgmb1_729.getIns().get(id);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.GODGENSENDGIFT_TARGETAWARD,
							new Object[] { MailConst.GODGENSENDGIFT_TARGETAWARD }, struct_cbgmb1_729.getReward());
				}
			}
			awardStateMap.clear();
			godGenSendGift.setTotalTimes(0);
			if (now != 0) {// 用来过零点关闭红点
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GODGENSENDGIFT, 1,
						RedPointConst.NO_RED);
			}
			GodGenSendGiftManager.getIns().openRankUI(hero);
			GodGenSendGiftManager.getIns().openTargetUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftFunction zeroPub id:" + id + " state:" + state);
		}
	}

	@Override
	public void zeroPub(int now) {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					boolean flag = checkSystemOpenDelay();
					boolean sendAward = isSendAward();
					// 邮件发放奖励
					if (flag && sendAward) {
						List<GodGenSendGiftRankModel> rankList = GodGenSendGiftSysCache.getRankList();
						int size = rankList.size();
						if (size == 0) {
							return;
						}
						int numLimit = Config_xtcs_004.getIns().get(GodGenSendGiftConst.SPECIAL_AWARD).getNum();
						int qs = getLastQs();
						Map<Integer, Map<Integer, Struct_cbgrank1_729>> config = GodGenSendGiftSysCache
								.getRankConfigMap();
						Map<Integer, Struct_cbgrank1_729> map = config.get(qs);
						for (int i = 1; i <= size; i++) {
							GodGenSendGiftRankModel rankModel = rankList.get(i - 1);
							long hid = rankModel.getHid();
							Struct_cbgrank1_729 struct_cbgrank1_729 = map.get(i);
							MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.GODGENSENDGIFT_RANKAWARD,
									new Object[] { MailConst.GODGENSENDGIFT_RANKAWARD, i },
									struct_cbgrank1_729.getReward1());
							int totalTimes = rankModel.getTotalTimes();
							if (totalTimes >= numLimit) {
								MailFunction.getIns().sendMailWithFujianData2(hid,
										MailConst.GODGENSENDGIFT_SPECIALAWARD,
										new Object[] { MailConst.GODGENSENDGIFT_SPECIALAWARD },
										struct_cbgrank1_729.getReward2());
							}
						}
						// 保存上一期排行
						GodGenSendGiftFunction.getIns().addLastRankList();
						rankList.clear();
					}
				}

				@Override
				public Object getSession() {
					return OpTaskConst.GODGENSENDGIFT_RANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "GodGenSendGiftFunction zeroPub");
		}
	}

	public boolean checkSystemOpenDelay() {
		int oldEndDay = GodGenSendGiftConst.OLD_END_DAY;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (GodGenSendGiftFunction.getIns().isOldServer() && betweenOpen <= oldEndDay + 1) {
			// 老服而且没有到跑完系统的前31天
			return true;
		} else if (!GodGenSendGiftFunction.getIns().isOldServer()) {
			// 新服
			int openDay = GodGenSendGiftConst.NEW_OPEN_DAY;
			if (betweenOpen >= openDay) {
				if (HeroFunction.getIns().checkSystemOpenDelay(SystemIdConst.GODGENSENDGIFT)) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 是否是周期第一天
	 * 
	 * @return
	 */
	public boolean isSendAward() {
		int awardCycle = GodGenSendGiftConst.AWARD_CYCLE;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (GodGenSendGiftFunction.getIns().isOldServer()) {
			// 老服按原来的方式
		} else {
			// 新服按新的方式
			int openDay = GodGenSendGiftConst.NEW_OPEN_DAY;
			if (betweenOpen >= openDay) {
				// 第八天开第一期
				betweenOpen = (betweenOpen - openDay + 1);
			} else {
				return false;
			}
		}

		if (betweenOpen != 1 && betweenOpen % awardCycle == 1) {
			return true;
		}
		return false;
	}

	/**
	 * 取得上期期数，发奖励用
	 * 
	 * @return
	 */
	public int getLastQs() {
		int awardCycle = GodGenSendGiftConst.AWARD_CYCLE;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (GodGenSendGiftFunction.getIns().isOldServer()) {
			// 老服按原来的方式
		} else {
			// 新服按新的方式
			int openDay = GodGenSendGiftConst.NEW_OPEN_DAY;
			if (betweenOpen >= openDay) {
				// 第八天开第一期
				betweenOpen = (betweenOpen - openDay + 1);
			}
		}
		return betweenOpen / awardCycle;
	}

}
