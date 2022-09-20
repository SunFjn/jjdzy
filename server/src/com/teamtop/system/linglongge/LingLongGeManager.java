package com.teamtop.system.linglongge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.linglongge.model.LingLongGe;
import com.teamtop.system.linglongge.model.LingLongGeNoticeModel;
import com.teamtop.system.linglongge.model.LingLongGeRankModel;
import com.teamtop.system.linglongge.model.LingLongGeRankZoneid;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityConst;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_llg_239;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_llgpoint_239;
import excel.struct.Struct_llgrank_239;

public class LingLongGeManager {
	private static LingLongGeManager ins = null;

	public static LingLongGeManager getIns() {
		if (ins == null) {
			ins = new LingLongGeManager();
		}
		return ins;
	}

	private LingLongGeManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LingLongGeConst.LINGLONGGE)) {
			return;
		}
		int configId = Config_llg_239.getIns().get(LingLongGeFunction.getIns().getTableId()).getId();
		LingLongGe linglongge = hero.getLinglongge();
		int llCoinNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), LingLongGeConst.LINGLONGBI_ID);
		int score = linglongge.getScore();
		int restTimes = getRestTimes(linglongge.getTotalBuyTimes());

		List<LingLongGeNoticeModel> awardNoticeList = LingLongGeSysCache.getAwardNoticeList();
		ArrayList<Object> noticeList = new ArrayList<Object>();
		int size = awardNoticeList.size();
		for (int i = 0; i < size; i++) {
			try {
				LingLongGeNoticeModel linglonggeModel = awardNoticeList.get(i);
				if (linglonggeModel == null) {
					continue;
				}
				noticeList.add(new Object[] { linglonggeModel.getName(), linglonggeModel.getType(),
						linglonggeModel.getAwardId(), linglonggeModel.getNum() });
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, hero.getId(), hero.getName(), "LingLongGeManager openUI");
			}
		}
		List<Struct_llgpoint_239> llgScoreTable = LingLongGeSysCache.getLlgScoreTableMap()
				.get(LingLongGeFunction.getIns().getTableId());
		ArrayList<Object> scoreAwardList = new ArrayList<Object>();
		int index = 0;
		for (Struct_llgpoint_239 struct_llgpoint_239 : llgScoreTable) {
			scoreAwardList.add(new Object[] { struct_llgpoint_239.getId(), linglongge.getScoreAwardList().get(index) });
			index++;
		}
		LingLongGeSender.sendCmd_2222(hero.getId(), configId, restTimes, noticeList.toArray(), llCoinNum,
				scoreAwardList.toArray(), score);
	}

	/**
	 * 获取必得高级道具剩余次数
	 * 
	 * @param hero
	 * @return 返回0为必得高级奖励，其他数字为必得高级道具剩余次数
	 */
	public int getRestTimes(int totalBuyTimes) {
		int highawardNeedNum = LingLongGeConst.HIGHAWARD_NEEDNUM;
		int restTimes = highawardNeedNum;
		if (totalBuyTimes != 0) {
			if (totalBuyTimes % highawardNeedNum == 0) {
				restTimes = highawardNeedNum;
			} else {
				restTimes = highawardNeedNum - totalBuyTimes % highawardNeedNum;
			}
		}
		return restTimes;
	}

	/**
	 * 购买
	 * 
	 * @param hero
	 * @param buyTimes 购买次数，1次或10次
	 * @param buyType  购买类型，0：玲珑币购买，1：元宝购买
	 */
	public void buy(Hero hero, int buyTimes, int buyType) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LingLongGeConst.LINGLONGGE)) {
			return;
		}
		if (!(buyTimes == 1 || buyTimes == 10)) {
			return;
		}
		if (!(buyType == LingLongGeConst.LINGLONGBI_BUY || buyType == LingLongGeConst.YUANBAO_BUY)) {
			return;
		}
		if (buyType == LingLongGeConst.LINGLONGBI_BUY) {
			if (!UseAddUtil.canUse(hero, LingLongGeConst.LINGLONGBI_ONECONSUME, buyTimes)) { // 玲珑币不足
				LingLongGeSender.sendCmd_2224(hero.getId(), LingLongGeConst.NOT_LINGLONGBI, null, 0, 0, 0);
				return;
			}
			UseAddUtil.use(hero, LingLongGeConst.LINGLONGBI_ONECONSUME, buyTimes,
					SourceGoodConst.LINGLONGGE_LLBBUY_CONSUME, true);
		} else {
			int[][] yuanbaoConsume;
			if (buyTimes == 1) {
				yuanbaoConsume = Config_xtcs_004.getIns().get(LingLongGeConst.YUANBAO_ONECONSUME).getOther();
			} else {
				yuanbaoConsume = Config_xtcs_004.getIns().get(LingLongGeConst.YUANBAO_TENCONSUME).getOther();
			}
			if (!UseAddUtil.canUse(hero, yuanbaoConsume)) { // 元宝不足
				LingLongGeSender.sendCmd_2224(hero.getId(), LingLongGeConst.NOT_YUANBAO, null, 0, 0, 0);
				return;
			}
			UseAddUtil.use(hero, yuanbaoConsume, SourceGoodConst.LINGLONGGE_LLBBUY_CONSUME, true);
		}
		int[][] oneReward = Config_xtcs_004.getIns().get(LingLongGeConst.LINGLONGGE_FIXAWARD).getOther();
		UseAddUtil.add(hero, oneReward, buyTimes, SourceGoodConst.LINGLONGGE_BUY_FIXAWARD, null, true); // 发放固定奖励

		List<int[]> awardList = new ArrayList<int[]>();// 抽取的奖品列表
		ArrayList<Object> awardObjList = new ArrayList<Object>();
		List<Integer[]> awardIdNoticeList = new ArrayList<Integer[]>();// 抽取的要公布的奖品列表
		LingLongGe linglongge = hero.getLinglongge();
//		/** 大奖概率事件Map key为玲珑阁概率表id **/
//		Map<Integer, ProbabilityEventModel> bigAwardMap = new HashMap<>();
		for (int i = 1; i <= buyTimes; i++) {
			boolean isBigAward = bigAward(hero, awardList, awardObjList, awardIdNoticeList);// 大奖抽奖
			if (isBigAward) {
				continue;
			}
			int restTimes = getRestTimes(linglongge.getTotalBuyTimes() + i);
			List<ProbabilityEventModel> list;
			if (restTimes == LingLongGeConst.HIGHAWARD_NEEDNUM) {
				list = LingLongGeSysCache.getGenAndHigtAwardMap().get(LingLongGeFunction.getIns().getTableId())
						.get(LingLongGeConst.HIGHAWARD_GAILVEVENT_KEY);// 高级奖励
			} else {
				list = LingLongGeSysCache.getGenAndHigtAwardMap().get(LingLongGeFunction.getIns().getTableId())
						.get(LingLongGeConst.GENAWARD_GAILVEVENT_KEY);// 普通奖励
			}
			int[] genAward = null;
			int a=0;
			while (genAward==null||a>=100) {
				for (ProbabilityEventModel pm : list) {
					genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
				}
				a++;
			} 
			awardList.add(new int[] { genAward[0], genAward[1], genAward[2] });
			awardObjList.add(new Object[] { genAward[0], genAward[1], genAward[2], genAward[4] });
			if (genAward[4] == LingLongGeConst.AWARD_NOTICE) {
				awardIdNoticeList.add(new Integer[] { genAward[0], genAward[1], genAward[2] });
			}
		}
		int size = awardList.size();
		int[][] AwardArray = new int[size][];
		awardList.toArray(AwardArray);

		UseAddUtil.add(hero, AwardArray, SourceGoodConst.LINGLONGGE_BUY_AWARD, UseAddUtil.getDefaultMail(), false); // 发放抽取的奖励，包括普通和高级
		int totalBuyTimes = linglongge.getTotalBuyTimes();
		linglongge.setTotalBuyTimes(totalBuyTimes + buyTimes);// 更新抽奖次数
		int addScore=LingLongGeConst.BUYONE_GAINSCORE * buyTimes;
		LingLongGeFunction.getIns().refreshScoreAwardList(hero,buyTimes); // 刷新每日目标积分奖励状态列表
		int llCoinNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), LingLongGeConst.LINGLONGBI_ID);
		int restTimes = getRestTimes(linglongge.getTotalBuyTimes());
		LingLongGeSender.sendCmd_2224(hero.getId(), LingLongGeConst.SUCCESS, awardObjList.toArray(), restTimes,
				llCoinNum, linglongge.getScore());
		if (TimeDateUtil.serverOpenOverDays(7)) {
			//7日后上传跨服数据
			ArrayList<LingLongGeNoticeModel> notices =new ArrayList<LingLongGeNoticeModel>();
			for (Integer[] awardNoticeArray : awardIdNoticeList) {
				LingLongGeNoticeModel lingLongGeNoticeModel = new LingLongGeNoticeModel();
				lingLongGeNoticeModel.setHid(hero.getId());
				lingLongGeNoticeModel.setName(hero.getNameZoneid());
				lingLongGeNoticeModel.setType(awardNoticeArray[0]);
				lingLongGeNoticeModel.setAwardId(awardNoticeArray[1]);
				lingLongGeNoticeModel.setNum(awardNoticeArray[2]);
				notices.add(lingLongGeNoticeModel);
			}
			int zoneid=GameProperties.getFirstZoneId();
			LingLongGeSysCache.setScore(LingLongGeSysCache.getScore()+addScore);
			LingLongGeLocalIO.getIns().SGBuyinfo(hero.getId(),hero.getNameZoneid(), linglongge.getScore(), notices,zoneid,LingLongGeSysCache.getScore());
			int num = Config_xtcs_004.getIns().get(LingLongGeConst.SCORENEED2).getNum();
			if (linglongge.getScore()>=num&&!LingLongGeSysCache.getZoneidRewardHis().contains(hero.getId())) {
				LingLongGeSysCache.getZoneidRewardHis().add(hero.getId());
			}
		}else {
			LingLongGeFunction.getIns().refreshLingLongGeRankList(hero, 1);// 刷新每日本服玩家积分排名
			ArrayList<Object> noticeList = new ArrayList<Object>();
			for (Integer[] awardNoticeArray : awardIdNoticeList) {
				LingLongGeNoticeModel lingLongGeNoticeModel = new LingLongGeNoticeModel();
				lingLongGeNoticeModel.setHid(hero.getId());
				lingLongGeNoticeModel.setName(hero.getNameZoneid());
				lingLongGeNoticeModel.setType(awardNoticeArray[0]);
				lingLongGeNoticeModel.setAwardId(awardNoticeArray[1]);
				lingLongGeNoticeModel.setNum(awardNoticeArray[2]);
				LingLongGeFunction.getIns().refreshAwardNoticeList(hero, lingLongGeNoticeModel, 1); // 刷新获奖公告列表
				ChatManager.getIns().broadCast(ChatConst.BROCAST_LINGLONGGE_AWARD, new Object[] { hero.getName(),
						awardNoticeArray[0] == 1 ? awardNoticeArray[1] : awardNoticeArray[0], awardNoticeArray[2] }); // 全服广播
				noticeList.add(
						new Object[] { hero.getNameZoneid(), awardNoticeArray[0], awardNoticeArray[1], awardNoticeArray[2] });
			}
			Set<Long> heroIdSet = HeroCache.getHeroMap().keySet();// 获取在线玩家id
			for (long hid : heroIdSet) {
				LingLongGeSender.sendCmd_2230(hid, noticeList.toArray(),hero.getId());// 给所有在线玩家推送获奖公告
			}
		}
		// 任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_6, buyTimes);
		// 每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE8);
		//八门金锁
		EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_6, buyTimes);
		// 成就树
		AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_19, buyTimes, 0);
		DropRedPacketFunction.getIns().taskHandler(hero, 3, buyTimes);
	}

	/**
	 * 大奖抽奖
	 * 
	 * @param hero
	 * @param awardList
	 * @param awardObjList
	 * @param awardIdNoticeList
	 * @return 是否抽中大奖，true是，false没有
	 */
	public boolean bigAward(Hero hero, List<int[]> awardList, ArrayList<Object> awardObjList,
			List<Integer[]> awardIdNoticeList) {
		LingLongGe linglongge = hero.getLinglongge();
		int bigAwardTimes = linglongge.getBigAwardTimes();
		Map<Integer, Integer> gettedBigAwardMap = hero.getLinglongge().getGettedBigAwardMap();
		bigAwardTimes++;
		boolean isBigAward = false;
		for (int[] bigAwardArray : Config_llg_239.getIns().getMap().get(LingLongGeFunction.getIns().getTableId())
				.getBizhong()) {
			if (bigAwardTimes >= bigAwardArray[4] && bigAwardTimes <= bigAwardArray[5]
					&& gettedBigAwardMap.get(bigAwardArray[0]) == null) {
				ProbabilityEventModel pm = ProbabilityEventFactory.getProbabilityEvent();
				int calcBigAwardPro = calcBigAwardPro(bigAwardTimes, bigAwardArray[4], bigAwardArray[5]);
				pm.addProbabilityEvent(calcBigAwardPro,
						new int[] { bigAwardArray[1], bigAwardArray[2], bigAwardArray[3] });
				pm.addProbabilityEvent(ProbabilityConst.PRO_100000 - calcBigAwardPro, new int[] {});
				int[] genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 大奖奖励
				if (genAward.length != 0) {
					awardList.add(new int[] { genAward[0], genAward[1], genAward[2] });
					awardObjList.add(new Object[] { genAward[0], genAward[1], genAward[2], 1 });
					awardIdNoticeList.add(new Integer[] { genAward[0], genAward[1], genAward[2] });
					gettedBigAwardMap.put(bigAwardArray[0], bigAwardArray[0]);
					isBigAward = true;
				}
			}
		}
		if (bigAwardTimes >= Config_xtcs_004.getIns().get(LingLongGeConst.RESET_TIMES).getNum()) {
			hero.getLinglongge().setBigAwardTimes(0);
			hero.getLinglongge().getGettedBigAwardMap().clear();// 是否取得大奖Map重置
		} else {
			hero.getLinglongge().setBigAwardTimes(bigAwardTimes);
		}
		return isBigAward;
	}

	/**
	 * 计算大奖概率
	 * 
	 * @param bigAwardTimes
	 * @param biZhong
	 * @return
	 */
	public int calcBigAwardPro(int bigAwardTimes, int baseTimes, int biZhongTimes) {
		double pro = ((double) bigAwardTimes - (double) baseTimes + 1)
				/ ((double) biZhongTimes - (double) baseTimes + 1) * ProbabilityConst.PRO_100000;
		return (int) pro;
	}

	/**
	 * 排行榜界面
	 * 
	 * @param hero
	 */
	public void rankUI(Hero hero,int type) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LingLongGeConst.LINGLONGGE)) {
			return;
		}
		if (type==0) {
			List<Struct_llgrank_239> llgRankTableList = LingLongGeSysCache.getLlgRankTableMap()
					.get(LingLongGeFunction.getIns().getTableId());
			List<LingLongGeRankModel> lingLongGeRankList = LingLongGeSysCache.getLingLongGeRankList();
			List<Object> rankList = new ArrayList<Object>();
			int size = lingLongGeRankList.size();
			for (int i = 1; i <= size; i++) {
				LingLongGeRankModel lingLongGeRankModel = lingLongGeRankList.get(i - 1);
				for (Struct_llgrank_239 struct_llgrank_239 : llgRankTableList) {
					int[] rank = struct_llgrank_239.getRank()[0];
					int minRank = rank[0];
					int maxRank = rank[1];
					if (i >= minRank && i <= maxRank) {
						int id = struct_llgrank_239.getId();
						rankList.add(new Object[] { lingLongGeRankModel.getHid(),lingLongGeRankModel.getName(), lingLongGeRankModel.getScore(), id });
						break;
					}
				}
			}
			int configId = llgRankTableList.get(0).getLlg();
			LingLongGeSender.sendCmd_2226(hero.getId(), rankList.toArray(), configId);
			return;
		}else {
			int rank=0;
			int zoneid=GameProperties.getFirstZoneId();
			List<LingLongGeRankZoneid> zoneidRankList = LingLongGeSysCache.getZoneidRankList();
			//检测重复的区 
			List<Integer> indexs=new ArrayList<Integer>();
			Map<Integer, LingLongGeRankZoneid> zoneidRankmap=new HashMap<>();
			for (int i = 0; i < zoneidRankList.size(); i++) {
				LingLongGeRankZoneid lingLongGeRankZoneid = zoneidRankList.get(i);
				if (!zoneidRankmap.containsKey(lingLongGeRankZoneid.getZoneid())) {
					zoneidRankmap.put(lingLongGeRankZoneid.getZoneid(), lingLongGeRankZoneid);
				}else {
					//有重复的元素
					if (!indexs.contains(i)) {
						indexs.add(i);
					}
				}
			} 
			if (indexs.size()>0) {
				//有重复的元素
				zoneidRankList.clear();
				for (LingLongGeRankZoneid lingLongGeRankZoneid: zoneidRankmap.values()) {
					zoneidRankList.add(lingLongGeRankZoneid);
				}
				//重新排序
				LingLongGeLocalIO.getIns().sortRankZoneid(zoneidRankList);
			}
			
			
			List<Object> ranks = new ArrayList<Object>();
			for (int i = 1; i <=zoneidRankList.size(); i++) {
				LingLongGeRankZoneid lingLongGeRankZoneid = zoneidRankList.get(i-1);
				if (lingLongGeRankZoneid.getZoneid()==zoneid) {
					rank=i;
				}
				ranks.add(new Object[] {lingLongGeRankZoneid.getZoneid(),lingLongGeRankZoneid.getScore()});
			}
			LingLongGeSender.sendCmd_2232(hero.getId(), ranks.toArray(), rank, LingLongGeSysCache.getScore());
			return;
		}
		
	}

	/**
	 * 领取每日积分宝箱奖励
	 * 
	 * @param hero
	 * @param awardId 玲珑阁积分表id
	 */
	public void getScoreBXAward(Hero hero, int awardId) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LingLongGeConst.LINGLONGGE)) {
			return;
		}
		List<Struct_llgpoint_239> llgScoreTableList = LingLongGeSysCache.getLlgScoreTableMap()
				.get(LingLongGeFunction.getIns().getTableId());
		boolean flag = false;
		int index = 0;
		for (Struct_llgpoint_239 struct_llgpoint_239 : llgScoreTableList) {
			if (struct_llgpoint_239.getId() == awardId) {
				flag = true;
				break;
			}
			index++;
		}
		if (!flag) {// 奖励不存在
			return;
		}
	
		LingLongGe linglongge = hero.getLinglongge();
		List<Integer> scoreAwardList = linglongge.getScoreAwardList();
		int canGetNum=scoreAwardList.get(index);
		if (canGetNum<= LingLongGeConst.NOT_REACH) {
			LingLongGeSender.sendCmd_2228(hero.getId(),1,awardId,canGetNum);
			return;
		}
		
		int leftNum=canGetNum-1;
		if (leftNum==LingLongGeConst.NOT_REACH) {
			leftNum=LingLongGeConst.ALL_GET;
		}
		int[][] reward = llgScoreTableList.get(index).getReward();
		if (UseAddUtil.canAdd(hero, reward, false)) {
			scoreAwardList.set(index, leftNum);// 改变宝箱数量
			UseAddUtil.add(hero, reward, SourceGoodConst.LINGLONGGE_SCOREBX_AWARD, null, true); // 发放奖励
			LingLongGeSender.sendCmd_2228(hero.getId(),0,awardId,leftNum);
		}

	}

	public void openLastRankUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LingLongGeConst.LINGLONGGE)) {
			return;
		}
		List<LingLongGeRankModel> lastRankList = LingLongGeSysCache.getLastRankList();
		int size = lastRankList.size();
		int myLastRank = 0;
		int myLastScore = 0;
		long hid = hero.getId();
		List<Struct_llgrank_239> llgRankTableList = LingLongGeSysCache.getLlgRankTableMap()
				.get(LingLongGeFunction.getIns().getLastTableId());
		List<Object> objList = new ArrayList<Object>();
		for (int i = 1; i <= size; i++) {
			LingLongGeRankModel lingLongGeRankModel = lastRankList.get(i - 1);
			for (Struct_llgrank_239 struct_llgrank_239 : llgRankTableList) {
				int[] rank = struct_llgrank_239.getRank()[0];
				int minRank = rank[0];
				int maxRank = rank[1];
				if (i >= minRank && i <= maxRank) {
					int id = struct_llgrank_239.getId();
					objList.add(new Object[] { lingLongGeRankModel.getHid(),lingLongGeRankModel.getName(), lingLongGeRankModel.getScore(), id });
					if (lingLongGeRankModel.getHid() == hid) {
						myLastRank = i;
						myLastScore = lingLongGeRankModel.getScore();
					}
					break;
				}
			}
		}
		int configId = llgRankTableList.get(0).getLlg();
		LingLongGeSender.sendCmd_2234(hero.getId(), objList.toArray(), myLastRank, myLastScore,configId);
	}

	public void openLastZoneidRankUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, LingLongGeConst.LINGLONGGE)) {
			return;
		}
		List<LingLongGeRankZoneid> lastZoneidRankList = LingLongGeSysCache.getLastZoneidRankList();
		int size = lastZoneidRankList.size();
		List<Object[]> objList = new ArrayList<>();
		int lastZoneidRank = 0;
		int lastZoneidScore = 0;
		int zoneid=GameProperties.getFirstZoneId();
		for (int i = 0; i < size; i++) {
			LingLongGeRankZoneid rankModel = lastZoneidRankList.get(i);
			objList.add(new Object[] {rankModel.getZoneid(),rankModel.getScore()});
			if (rankModel.getZoneid() == zoneid) {
				lastZoneidRank = i + 1;
				lastZoneidRank = rankModel.getScore();
			}
		}
		int configId = Config_llg_239.getIns().get(LingLongGeFunction.getIns().getLastTableId()).getId();
		LingLongGeSender.sendCmd_2236(hero.getId(), objList.toArray(), lastZoneidRank, lastZoneidScore,configId);
	}

}
