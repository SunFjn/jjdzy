package com.teamtop.system.qiceDraw;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.bagGoodIdea.BagGoodIdeaFunction;
import com.teamtop.system.qiceDraw.model.QiCeDraw;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cmhc_761;
import excel.config.Config_cmhcmb_761;
import excel.struct.Struct_cmhc_761;
import excel.struct.Struct_cmhcmb_761;

public class QiCeDrawManager {

	private static QiCeDrawManager QiCeDrawManager;

	private QiCeDrawManager() {

		}
	
	public static synchronized QiCeDrawManager getIns() {
		if (QiCeDrawManager == null) {
			QiCeDrawManager = new QiCeDrawManager();
			}
		return QiCeDrawManager;
		}
		
	public void openUI(Hero hero) {
		if (hero == null) {
				return;
			}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, QiCeDrawConst.SysId)) {
				return;
				}
			QiCeDraw qiCeDraw = hero.getQiCeDraw();
				
			List<Object[]> targetRewardList = new ArrayList<>();
			Map<Integer, Integer> awards = qiCeDraw.getAwards();
			if (awards != null && awards.size() > 0) {
				for (Entry<Integer, Integer> entry : awards.entrySet()) {
					Integer id = entry.getKey();
					Integer value = entry.getValue();
					targetRewardList.add(new Object[] { id, value });
				}
				}
			int num = qiCeDraw.getNum();
			QiCeDrawSender.sendCmd_9752(hid, targetRewardList.toArray(), num);
		} catch (Exception e) {
			LogTool.error(e, QiCeDrawManager.class, hid, hero.getName(), "QiCeDrawManager openUI");
			}
			
	}

	public void draw(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, QiCeDrawConst.SysId)) {
				return;
				}
			int count = 0;// 抽奖次数
			int[][] cost = null;// 消耗元宝
			Struct_cmhc_761 struct_cmhc_761 = Config_cmhc_761.getIns().getSortList().get(0);
			QiCeDraw qiCeDraw = hero.getQiCeDraw();
			int beforeNum = qiCeDraw.getNum();
			int num = beforeNum;
			int n = -1;// 随机高级奖励
			if (type == 1) {// 抽奖1次
				count = QiCeDrawConst.COUNT1;
				cost = struct_cmhc_761.getCj1();
				num = num + count;
				n = num % 10;
			} else {// 抽奖10次数
				count = QiCeDrawConst.COUNT2;
				cost = struct_cmhc_761.getCj2();
				Random r = new Random();
				n = r.nextInt(count);
				num = num + count;
				}

			List<Object[]> awardList = new ArrayList<>();
			List<Object[]> targetRewardList = new ArrayList<>();
			int[][] items = new int[count][];
			int[] gbAward = null;// 广播
			int id = struct_cmhc_761.getId();
			List<List<ProbabilityEventModel>> bigList = QiCeDrawSysCache.getAwardMap().get(id);
			for (int i = 0; i < count; i++) {
				ProbabilityEventModel pm = null;
				if (i == n) {
					pm = bigList.get(QiCeDrawConst.HIGHAWARD_GAILVEVENT_KEY).get(0);// 高级奖励
					}else {
					pm = bigList.get(QiCeDrawConst.GENAWARD_GAILVEVENT_KEY).get(0);// 普通奖励
				}

				int[] getAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
				items[i] = new int[] { getAward[0], getAward[1], getAward[2] };
				awardList.add(new Object[] { getAward[0], getAward[1], getAward[2], getAward[4] });
				if (getAward[4] == 1) {
					gbAward = getAward;
				}
			}

			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), QiCeDrawConst.ITEMID);
			if (canUseNum < count) {// 扣除元宝
				if (!UseAddUtil.canUse(hero, cost)) {
					QiCeDrawSender.sendCmd_9754(hid, QiCeDrawConst.LACK_OF_MONEY, awardList.toArray(),
							targetRewardList.toArray(), num);
					return;// 元宝不足
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.QICE_DRAW, true);
			} else {// 扣除道具
				if (!UseAddUtil.canUse(hero, GameConst.TOOL, QiCeDrawConst.NUM * count, QiCeDrawConst.ITEMID)) {
					// 没道具扣
					return;
					}
				UseAddUtil.use(hero, GameConst.TOOL, QiCeDrawConst.NUM * count, QiCeDrawConst.ITEMID,
						SourceGoodConst.QICE_DRAW, true);
				}
				
			Map<Integer, Integer> awards = qiCeDraw.getAwards();
			List<Struct_cmhcmb_761> sortList = Config_cmhcmb_761.getIns().getSortList();
			for (Struct_cmhcmb_761 struct_cmhcmb_761 : sortList) {
				int cs = struct_cmhcmb_761.getPt();
				int mbId = struct_cmhcmb_761.getId();
				if (beforeNum < cs && num >= cs) {
					Integer flag = awards.get(mbId);
					if (flag == null || flag == -1) {
						flag = 1;
					} else {
						flag = flag + 1;
					}
					awards.put(mbId, flag);
				}

				Integer flag = awards.get(mbId);
				if (flag == null) {
					targetRewardList.add(new Object[] { mbId, 0 });
				} else {
					if (num >= QiCeDrawSysCache.getMaxNum()) {
						if (flag == -1) {
							flag = 0;
							awards.put(mbId, flag);
						}
						}
					targetRewardList.add(new Object[] { mbId, flag });
					}
				}

			if (num >= QiCeDrawSysCache.getMaxNum()) {
				num = 0;// 重置次数
			}
			qiCeDraw.setNum(num);
			UseAddUtil.add(hero, items, SourceGoodConst.QICE_DRAW_ADD, UseAddUtil.getDefaultMail(), false);
			QiCeDrawSender.sendCmd_9754(hid, QiCeDrawConst.SUCCESS, awardList.toArray(), targetRewardList.toArray(),
					num);
			if (gbAward != null) {
				ChatManager.getIns().broadCast(ChatConst.QICE_DRAW,
						new Object[] { hero.getName(), gbAward[1], gbAward[2] }); // 全服广播
			}
			LogTool.info(hid, hero.getName(), "QiCeDrawManager draw type=" + type + " num=" + num,
					QiCeDrawManager.class);
			// 运筹帷幄-锦囊妙计
			BagGoodIdeaFunction.getIns().awardStateHandler(hero, count);
		} catch (Exception e) {
			LogTool.error(e, QiCeDrawManager.class, hid, hero.getName(), "QiCeDrawManager draw");
			}
			
		}

	public void getAward(Hero hero, int id) {
		if (hero == null) {
				return;
			}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, QiCeDrawConst.SysId)) {
				return;
			}
			QiCeDraw qiCeDraw = hero.getQiCeDraw();
			Map<Integer, Integer> awards = qiCeDraw.getAwards();
			Integer flag = awards.get(id);
			if (flag == null || flag == 0) {
				QiCeDrawSender.sendCmd_9756(hid, QiCeDrawConst.DID_NOT_REACH, id, 0);
				return;
			}
			if (flag == -1) {
				QiCeDrawSender.sendCmd_9756(hid, QiCeDrawConst.HAVE_RECEIVE, id, flag);
				return;
			}

			Struct_cmhcmb_761 struct_cmhcmb_761 = Config_cmhcmb_761.getIns().get(id);
			if (struct_cmhcmb_761 == null) {
				QiCeDrawSender.sendCmd_9756(hid, QiCeDrawConst.PARA_FAILURE, id, flag);
				return;
			}

			int[][] reward = struct_cmhcmb_761.getGj();
			UseAddUtil.add(hero, reward, SourceGoodConst.QICE_DRAW_ADD, UseAddUtil.getDefaultMail(), true);

			if (flag > 1) {
				flag = flag - 1;// 领取次数递减
			} else {
				flag = -1;// 标记已领
				int cs = struct_cmhcmb_761.getPt();
				if (qiCeDraw.getNum() < cs) {
					flag = 0;
				}
			}
			awards.put(id, flag);
			QiCeDrawSender.sendCmd_9756(hid, QiCeDrawConst.SUCCESS, id, flag);
			LogTool.info(hid, hero.getName(), "QiCeDrawManager getAward id=" + id + " flag=" + flag,
					QiCeDrawManager.class);
		} catch (Exception e) {
			LogTool.error(e, QiCeDrawManager.class, hid, hero.getName(), "QiCeDrawManager getAward");
			}
			
		}
	}
