package com.teamtop.system.qice;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.goodPolicyHasGift.GoodPolicyHasGiftFunction;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.qice.model.QiCeModel;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_qc_760;
import excel.config.Config_qcsj_760;
import excel.config.Config_qcts_760;
import excel.config.Config_qctz_760;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_qc_760;
import excel.struct.Struct_qcsj_760;
import excel.struct.Struct_qctz_760;

public class QiCeManager {
	private static QiCeManager ins;

	public static QiCeManager getIns() {
		if(ins == null) {
			ins = new QiCeManager();
		}
		return ins;
	}
	
	/**
	 * 获取奇策
	 * 
	 * @param hero
	 */
	public void openQiCe(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
				return;
			}
			QiCe qiCe = hero.getQiCe();
			if (qiCe == null) {
				return;
			}
			List<Object[]> sendList = new ArrayList<>();
			if (qiCe.getQiCeMap().size() > 0) {
				for (QiCeModel qiCeModel : qiCe.getQiCeMap().values()) {
					Integer dan0 = qiCeModel.getDanyao().get(QiCeConst.DAN0);// 兵魂
					Integer dan1 = qiCeModel.getDanyao().get(QiCeConst.DAN1);// 将魂
					sendList.add(new Object[] { qiCeModel.getIndex(), qiCeModel.getStar(), qiCeModel.getJieLv(), dan0,
							dan1 });
				}
			}
			int taozhuanLv = qiCe.getTaozhuangLv();
			QiCeSender.sendCmd_9702(hero.getId(), sendList.toArray(), taozhuanLv);
		} catch (Exception e) {
			LogTool.error(e, QiCeManager.class, hero.getId(), hero.getName(), "openQiCe has wrong");
		}
		
	}
	
	/**
	 * 激活/升星奇策
	 * 
	 * @param hero
	 * @param index
	 */
	public void upQiCe(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
				return;
			}
			if (!Config_qc_760.getIns().getMap().containsKey(index)) {
				return;
			}
			HashMap<Integer, QiCeModel> qiCeMap = hero.getQiCe().getQiCeMap();
			if (qiCeMap.containsKey(index)) {
				QiCeModel qiCeModel = qiCeMap.get(index);
				Struct_qc_760 struct_qc_760 = Config_qc_760.getIns().get(index);
				if (qiCeModel.getStar() >= struct_qc_760.getSx()) {
					// 达到上限
					QiCeSender.sendCmd_9704(hero.getId(), 1, index, qiCeModel.getStar());
					return;
				}
				if (!UseAddUtil.canUse(hero, struct_qc_760.getSxxh())) {
					// 激活升星需要的道具不足
					QiCeSender.sendCmd_9704(hero.getId(), 2, index, qiCeModel.getStar());
					return;
				}
				UseAddUtil.use(hero, struct_qc_760.getSxxh(), SourceGoodConst.QICE_UPSTAR, true);
				qiCeModel.setStar(qiCeModel.getStar() + 1);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.QICE_UPSTAR, SystemIdConst.QICE);
				QiCeSender.sendCmd_9704(hero.getId(), 0, index, qiCeModel.getStar());
				// 运筹帷幄_奇策有礼 奇策星数
				GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 4);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_31, 0);
				return;
			}else {
				// 激活
				Struct_qc_760 struct_qc_760 = Config_qc_760.getIns().get(index);
				if (!UseAddUtil.canUse(hero, struct_qc_760.getSxxh())) {
					// 激活升星需要的道具不足
					QiCeSender.sendCmd_9704(hero.getId(), 2, index, 0);
					return;
				}
				UseAddUtil.use(hero, struct_qc_760.getSxxh(), SourceGoodConst.QICE_JIHUO, true);
				QiCeModel qiCeModel = new QiCeModel();
				qiCeModel.setIndex(index);
				qiCeModel.setStar(1);
				qiCeModel.setJieLv(1);
				HashMap<Integer, Integer> danyao = new HashMap<>();
				danyao.put(QiCeConst.DAN0, 0);
				danyao.put(QiCeConst.DAN1, 0);
				qiCeModel.setDanyao(danyao);
				qiCeMap.put(index, qiCeModel);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.QICE_JIHUO, SystemIdConst.QICE);
				QiCeSender.sendCmd_9704(hero.getId(), 0, index, qiCeModel.getStar());
				if (struct_qc_760.getPz() >= Config_xtcs_004.getIns().get(ChatConst.BROCAST_GOODPING).getNum()) {
					ChatManager.getIns().broadCast(ChatConst.BROCAST_QICE,
							new Object[] { hero.getName(), struct_qc_760.getId() }); // 全服广播
				}
				// 运筹帷幄_奇策有礼 奇策激活
				GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 1);
				// 运筹帷幄_奇策有礼 奇策星数
				GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 4);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_30, 0);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, QiCeManager.class, hero.getId(), hero.getName(), "upQiCe has wrong");
		}
		
	}
	
	/**
	 * 升级奇策套装
	 * 
	 * @param hero
	 * @param index
	 */
	public void upQCtaozhuang(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
				return;
			}
			QiCe qiCe = hero.getQiCe();
			if (qiCe == null) {
				return;
			}
			int taozhuangLv = qiCe.getTaozhuangLv();// 套装等级
			if (isManZuTiaoJian(hero, taozhuangLv)) {
				// 满足条件
				qiCe.setTaozhuangLv(taozhuangLv + 1);
				SkillFunction.getIns().changeSkill(hero, SkillConst.skiil_site_8, QiCeConst.index,
						qiCe.getTaozhuangLv());// 可以使用爆气(岐山使用)
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.QICE_UP_TAOZHUANG, SystemIdConst.QICE);
				QiCeSender.sendCmd_9706(hero.getId(), 0, qiCe.getTaozhuangLv());
				return;
			}
			// 不满足条件
			QiCeSender.sendCmd_9706(hero.getId(), 1, qiCe.getTaozhuangLv());
		} catch (Exception e) {
			LogTool.error(e, QiCeManager.class, hero.getId(), hero.getName(), "upQCtaozhuang has wrong");
		}
		
	}
	
	/**
	 * 奇策套装是否满足升阶条件
	 * 
	 * @param hero
	 * @param nowtaozhuang 套装等级
	 * @return
	 */
	public boolean isManZuTiaoJian(Hero hero, int nowtaozhuang) {
		if (hero == null) {
			return false;
		}
		try {
			Map<Integer, Struct_qc_760> excel = Config_qc_760.getIns().getMap();
			int size = excel.size();// 全部奇策数量
			Struct_qctz_760 struct_qctz_760 = Config_qctz_760.getIns().get(nowtaozhuang);
			int maxLv = Config_qctz_760.getIns().getMap().size() - 1;// 套装满级等级
			if (nowtaozhuang >= maxLv) {
				// 套装等级已满
				return false;
			}
			HashMap<Integer, QiCeModel> qiCeMap = hero.getQiCe().getQiCeMap();
			if (size != qiCeMap.size()) {
				// 没有全部奇策道具
				return false;
			}
			Iterator<QiCeModel> iterator = qiCeMap.values().iterator();
			while (iterator.hasNext()) {
				QiCeModel model = iterator.next();
				int star = model.getStar();
				if (star < struct_qctz_760.getTj()) {
					// 不满足全部奇策道具达到要求星级
					return false;
				}
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, QiCeManager.class, hero.getId(), hero.getName(), "isManZuTiaoJian has wrong");
		}
		return false;
	}

	/**
	 * 
	 * @param hero
	 * @param eatType
	 *            0 一个 其余一键
	 * @param type
	 *            奇策表的id
	 * @param dan
	 *            奇策吞噬表的索引id
	 */
	public void eatDan(Hero hero, int eatType, int type, int dan) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
				return;
			}
			QiCeModel qiCeModel = hero.getQiCe().getQiCeMap().get(type);
			if (qiCeModel == null) {
				// 未激活
				QiCeSender.sendCmd_9708(hero.getId(), 1, type, dan, 0);
				return;
			}
			int itemid = Config_qcts_760.getIns().get(dan).getId();
			HashMap<Integer, Integer> danyao = qiCeModel.getDanyao();
			int useNum = danyao.get(dan);
			int maxNum = getMaxDanNum(hero, type)[dan - 1];
			int num=0;
			int canUseNum=0;
			
			if (useNum >= maxNum) {
				// 超过最大吞噬值
				QiCeSender.sendCmd_9708(hero.getId(), 2, type, dan, 0);
				return;
			}else {
				canUseNum = maxNum - useNum;
			}
			
			int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
			if (hasNum<=0) {
				return;
			}
			if (eatType == 0) {
				num = 1;
			} else {
				if (canUseNum > hasNum) {
					num = hasNum;
				} else {
					num = canUseNum;
				}
			}
			if (UseAddUtil.canUse(hero, GameConst.TOOL, num, itemid)) {
				UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.QICE_DAN, true);
				danyao.put(dan, danyao.get(dan) + num);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.QICE_DAN, SystemIdConst.QICE);
				QiCeSender.sendCmd_9708(hero.getId(), 0, type, dan, danyao.get(dan));
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, QiCeManager.class, hero.getId(), hero.getName(), "eatDan has wrong");
		}
		
	}
	
	/**
	 * 获得属性丹
	 * 
	 * @param hero
	 * @param type
	 *            奇策id
	 * @return danNums[0]百万兵魂 danNums[1]千万兵魂 (0代表不可吞噬)
	 */
	public int[] getMaxDanNum(Hero hero, int type) {
		if (hero == null) {
			return new int[] { 0, 0 };
		}
		try {
			int danNums[] = new int[2];
			QiCeModel qiCeModel = hero.getQiCe().getQiCeMap().get(type);
			danNums[0] = Config_qc_760.getIns().get(qiCeModel.getIndex()).getMax1() * qiCeModel.getStar();
			danNums[1] = Config_qc_760.getIns().get(qiCeModel.getIndex()).getMax2() * qiCeModel.getStar();
			return danNums;
		} catch (Exception e) {
			LogTool.error(e, QiCeManager.class, hero.getId(), hero.getName(), "getMaxDanNum has wrong");
		}
		return new int[] { 0, 0 };
	}
	
	
	
	/**
	 * 奇策升阶
	 * 
	 * @param hero
	 * @param type
	 *            奇策id
	 */
	public void upQiCeJie(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
				return;
			}
			QiCeModel qiCeModel = hero.getQiCe().getQiCeMap().get(type);
			if (qiCeModel == null) {
				// 先激活该奇策
				QiCeSender.sendCmd_9710(hero.getId(), 1, type, 0);
				return;
			}
			int star = qiCeModel.getStar();
			int jieLv = qiCeModel.getJieLv();
			int index = qiCeModel.getIndex();
			int pz = Config_qc_760.getIns().get(index).getPz();
			int excelIndex = pz * 10000 + jieLv;
			Struct_qcsj_760 struct_qcsj_760 = Config_qcsj_760.getIns().get(excelIndex);
			int tj = struct_qcsj_760.getTj();
			if (star < tj) {
				// 不满足升阶条件
				QiCeSender.sendCmd_9710(hero.getId(), 2, type, qiCeModel.getJieLv());
				return;
			}
			if (Config_qcsj_760.getIns().get(excelIndex + 1) == null) {
				// 阶数已满级
				QiCeSender.sendCmd_9710(hero.getId(), 3, type, qiCeModel.getJieLv());
				return;
			}
			if (!UseAddUtil.canUse(hero, struct_qcsj_760.getXh())) {
				// 材料不足
				QiCeSender.sendCmd_9710(hero.getId(), 4, type, 0);
				return;
			}
			UseAddUtil.use(hero, struct_qcsj_760.getXh(), SourceGoodConst.QICE_UP_JIE, true);
			qiCeModel.setJieLv(jieLv + 1);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_QICE, SystemIdConst.QICE);
			QiCeSender.sendCmd_9710(hero.getId(), 0, type, qiCeModel.getJieLv());
			// 运筹帷幄_奇策有礼 奇策进阶
			GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 2);
			return;
		} catch (Exception e) {
			LogTool.error(e, QiCeManager.class, hero.getId(), hero.getName(), "upQiCeJie has wrong");
		}
	}
		
	
	
	
}
