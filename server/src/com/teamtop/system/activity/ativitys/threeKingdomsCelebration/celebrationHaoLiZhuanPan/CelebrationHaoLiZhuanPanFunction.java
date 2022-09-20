package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model.CelebrationHaoLiZhuanPan;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model.CelebrationHaoLiZhuanPanRecord;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityConst;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sghlzp_261;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_sgzpmb_261;

public class CelebrationHaoLiZhuanPanFunction {
	private static CelebrationHaoLiZhuanPanFunction ins = null;

	public static CelebrationHaoLiZhuanPanFunction getIns() {
		if (ins == null) {
			ins = new CelebrationHaoLiZhuanPanFunction();
		}
		return ins;
	}

	/**
	 * 大奖抽奖
	 * @return 是否抽中大奖，true是，false没有
	 */
	public boolean bigAward(CelebrationHaoLiZhuanPan data, List<int[]> awardList, List<Object[]> awardObjList,List<Integer[]> awardIdNoticeList) {
		int qiShu = data.getPeriods();
		
		Map<Integer, Integer> gettedBigAwardMap = data.getGettedBigAwardMap();
		int bigAwardTimes = data.getNumBigAward();
		bigAwardTimes++;
		boolean isBigAward = false;

		int[][] bigAwardArray = Config_sghlzp_261.getIns().get(qiShu).getReward1();// 配置表大奖数据

		for (int[] bigAward : bigAwardArray) {
			if(gettedBigAwardMap.get(bigAward[0]) != null)
				continue;
			if (bigAwardTimes < bigAward[4] || bigAwardTimes > bigAward[5] )//不是这个范围
				continue;
				
			int calcBigAwardPro = (int) (( bigAwardTimes - bigAward[4] + 1f) / (bigAward[5] - bigAward[4] + 1f) * ProbabilityConst.PRO_100000);
			int random = RandomUtil.getRandomNumInAreas(0, ProbabilityConst.PRO_100000);
			if( calcBigAwardPro < random) {
				continue;
			}
			
			awardList.add(new int[] { bigAward[1], bigAward[2], bigAward[3] });
			awardObjList.add(new Object[] {  bigAward[1], bigAward[2], bigAward[3] , 1 });
			awardIdNoticeList.add(new Integer[] { bigAward[2], bigAward[3]  });
			gettedBigAwardMap.put(bigAward[0], bigAward[0]);
			isBigAward = true;
		}
		if (bigAwardTimes >= Config_xtcs_004.getIns().get(XTCS004Const.CELEBRATION_HAO_LI_ZHUAN_PAN_RESET_TIMES).getNum()) {
			data.setNumBigAward(0);
			data.getGettedBigAwardMap().clear();//是否取得大奖Map重置
		} else {
			data.setNumBigAward(bigAwardTimes);
		}
		return isBigAward;
	}

	/**
	 * 添加一条记录
	 */
	public void addRecord(String name, Integer[][] noticeArr) {
		List<CelebrationHaoLiZhuanPanRecord> recordList = CelebrationHaoLiZhuanPanCache.getRecordList();
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				for (int i = 0; i < noticeArr.length; i++) {
					Integer[] arr = noticeArr[i];
					recordList.add(new CelebrationHaoLiZhuanPanRecord(name, arr[0], arr[1]));
					if (recordList.size() > CelebrationHaoLiZhuanPanConst.NUM_MAX_RECORD) {
						recordList.remove(0);
					}
				}
				ArrayList<Object[]> arrayList = new ArrayList<>();
				int size = recordList.size();
				for (int i = 0; i < size; i++) {
					CelebrationHaoLiZhuanPanRecord model = recordList.get(i);
					arrayList.add(new Object[] { model.getName(), model.getIdTool(), model.getNumTool() });
				}
				CelebrationHaoLiZhuanPanCache.setRecordArray(arrayList.toArray());
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.KINGSHIP_KEY;
			}

		});
	}

	/**
	 * 更新目标奖励状态
	 * 
	 * @param hero
	 * @param data
	 */
	public void updateTargetAwardMapState(Hero hero, CelebrationHaoLiZhuanPan model) {
		// TODO Auto-generated method stub
		try {
			Map<Integer, Integer> targetAwardStateMap = model.getTargetAwardStateMap();
			int zhuanpanNum = model.getParameter();
			Map<Integer, List<Struct_sgzpmb_261>> targetAwardConfigListMap = CelebrationHaoLiZhuanPanCache
					.getTargetAwardConfigListMap();
			List<Struct_sgzpmb_261> list = targetAwardConfigListMap.get(model.getPeriods());

			boolean flag = false;
			for (Struct_sgzpmb_261 struct_sgzpmb_261 : list) {
				int id = struct_sgzpmb_261.getId();
				if (zhuanpanNum >= struct_sgzpmb_261.getTime() && targetAwardStateMap.get(id) == null) {
					targetAwardStateMap.put(id, CelebrationHaoLiZhuanPanConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_THREEKINGDOMSCELEBRATION, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN, 1,
						RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"CelebrationHaoLiZhuanPanFunction updateTargetAwardMapState" + " qs:" + model.getPeriods()
							+ " times:" + model.getParameter() + " targetAwardStateMap:"
							+ JSON.toJSONString(model.getTargetAwardStateMap()));
		}
	}
    
	/**
     * 	红点处理
     * @param hero
     * @param data
     */
    public void redPointHandle(Hero hero,Map<Integer, Integer> targetAwardStateMap) {
    	boolean flag=false;
		for(Integer state1:targetAwardStateMap.values()) {
			if(state1==CelebrationHaoLiZhuanPanConst.CAN_GET) {
				flag=true;
			}
		}
		if(!flag) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_THREEKINGDOMSCELEBRATION, 1, RedPointConst.NO_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN, 1, RedPointConst.NO_RED);
		}
    }
}
