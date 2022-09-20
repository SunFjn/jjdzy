package com.teamtop.system.activity.ativitys.yuanXiao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ativitys.yuanXiao.model.YuanXiaoCrossJoiner;
import com.teamtop.system.activity.ativitys.yuanXiao.model.YuanXiaoEnemy;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

public class YuanXiaoFunction {
	
	private static YuanXiaoFunction ins;

	private YuanXiaoFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized YuanXiaoFunction getIns() {
		if (ins == null) {
			ins = new YuanXiaoFunction();
		}
		return ins;
	}
	
	
	
	
	/**
	 * 新建一个元宵参与者
	 * 
	 * @param hero
	 * @return
	 */
	public YuanXiaoCrossJoiner newYuanXiaoCrossJoiner(Hero hero,YuanXiaoLocal yuanXiaoLocal) {
		YuanXiaoCrossJoiner yuanXiaoCrossJoiner = new YuanXiaoCrossJoiner();
		yuanXiaoCrossJoiner.setHid(hero.getId());
		yuanXiaoCrossJoiner.setBelongZoneid(GameProperties.getFirstZoneId());
		yuanXiaoCrossJoiner.setJob(hero.getJob());
		yuanXiaoCrossJoiner.setStrength(hero.getTotalStrength());
		yuanXiaoCrossJoiner.setCountry(hero.getCountryType());
		yuanXiaoCrossJoiner.setHerdid(hero.getIcon());
		yuanXiaoCrossJoiner.setIconid(hero.getFrame());
		yuanXiaoCrossJoiner.setModel(hero.getShowModel());
		yuanXiaoCrossJoiner.getModel().setWeaponModel(GodWeaponFunction.getIns().getNowGodWeapon(hero));
		yuanXiaoCrossJoiner.setSkill(hero.getSkill());
		yuanXiaoCrossJoiner.setFinalFightAttr(hero.getFinalFightAttr());
		yuanXiaoCrossJoiner.setFigthMonsterSpirit(hero.getMonsterSpiritModel().getFightMonsterSpiri());
		//少主相关信息上传
		int withLeaderId=0;
		int withLeaderFid=0;
		int leaderStarId=0;
		int leaderSkillId=0;
		LittleLeader littleLeader=hero.getLittleLeader();
		if (littleLeader!=null) {
			withLeaderId=littleLeader.getWearType();
			if (withLeaderId!=0) {
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
				withLeaderFid=littleLeaderModel.getNowFashId();
				leaderStarId=littleLeaderModel.getStar();
				leaderSkillId=littleLeaderModel.getActivityKillLv();
			}

		}
		ArrayList<Integer> LeaderInfo=new ArrayList<>();
		LeaderInfo.add(withLeaderId);
		LeaderInfo.add(withLeaderFid);
		LeaderInfo.add(leaderStarId);
		LeaderInfo.add(leaderSkillId);
		yuanXiaoCrossJoiner.setLittleLeaderInfo(LeaderInfo);
		yuanXiaoCrossJoiner.setName(hero.getNameZoneid());
		yuanXiaoCrossJoiner.setOfficial(hero.getOfficial());
		yuanXiaoCrossJoiner.getModel().setRideModel(hero.getMountId());
		yuanXiaoCrossJoiner.setCailiaoMap(yuanXiaoLocal.getCailiaoMap());
		int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(hero.getJob(), hero.getWujiang());
		yuanXiaoCrossJoiner.setGodSkillLevel(godSkillLevel);
		yuanXiaoCrossJoiner.setLookListMap(new HashMap<>());
		return yuanXiaoCrossJoiner;
	}
	
	/**
	 * 中央服刷新抢夺列表
	 * @param type
	 */
	public boolean reshBattleList(long hid,int type,ConcurrentHashMap<Long, YuanXiaoCrossJoiner> concurrentHashMap,HashMap<Integer, ArrayList<YuanXiaoEnemy>> lookListMap) {
		try {
			int i=0;
			ConcurrentHashMap<Integer, YuanXiaoCrossJoiner> randomHash=new ConcurrentHashMap<>();
			for (YuanXiaoCrossJoiner yuanXiaoCrossJoiner: concurrentHashMap.values()) {
				int num=yuanXiaoCrossJoiner.getCailiaoMap().get(type);
				if (num>0&&hid!=yuanXiaoCrossJoiner.getHid()) {
					randomHash.put(i, yuanXiaoCrossJoiner);
					i++;
				}
			}
			int size = randomHash.size();
			if (size>0) {
				ArrayList<YuanXiaoEnemy> looklist=new ArrayList<>();
				if (size<=3) {
					for (int j = 1; j <=size; j++) {
						YuanXiaoCrossJoiner yuanXiaoCrossJoiner = randomHash.get(j);
						YuanXiaoEnemy yuanXiaoEnemy=new YuanXiaoEnemy();
						yuanXiaoEnemy.setHid(yuanXiaoCrossJoiner.getHid());
						yuanXiaoEnemy.setIsRob(0);
						looklist.add(yuanXiaoEnemy);
					}
				}else {
					List<Integer> multiRandomNumInArea = RandomUtil.getMultiRandomNumInArea(1, size, 3);
					for (int j = 0; j < multiRandomNumInArea.size(); j++) {
						Integer key = multiRandomNumInArea.get(j);
						YuanXiaoCrossJoiner yuanXiaoCrossJoiner = randomHash.get(key);
						YuanXiaoEnemy yuanXiaoEnemy=new YuanXiaoEnemy();
						yuanXiaoEnemy.setHid(yuanXiaoCrossJoiner.getHid());
						yuanXiaoEnemy.setIsRob(0);
						looklist.add(yuanXiaoEnemy);
					}
				}
				lookListMap.put(type, looklist);
				return true;
			}
			return false;
		} catch (Exception e) {
			LogTool.error(e, YuanXiaoFunction.class, "reshBattleList has wrong");
		}
		return false;
	}
	
	
	public boolean canUseCaiLiao(HashMap<Integer, Integer> myCailLiao,HashMap<Integer, Integer> useCaiLiao) {
		for (int key: useCaiLiao.keySet()) {
			Integer useNum = useCaiLiao.get(key);
			if (useNum>0) {
				if (!myCailLiao.containsKey(key)) {
					//
					return false;
				}else {
					Integer myHasNum = myCailLiao.get(key);
					if (myHasNum<useNum) {
						return false;
					}
				}
			}
		}
		return true;
	}
	
	
	public void useCaiLiao(HashMap<Integer, Integer> myCailLiao,HashMap<Integer, Integer> useCaiLiao) {
		for (int key: useCaiLiao.keySet()) {
			Integer useNum = useCaiLiao.get(key);
			if (useNum>0) {
				if (!myCailLiao.containsKey(key)) {
					//
					return ;
				}else {
					Integer myHasNum = myCailLiao.get(key);
					if (myHasNum>=useNum) {
						int leftNum=myHasNum-useNum;
						myCailLiao.put(key, leftNum);
					}
				}
			}
		}
	}
	
	
	/**
	 * 材料数量发生变化
	 */
	public void changeCaiLiaoNum(YuanXiaoLocal yuanXiaoLocal) {
		HashMap<Integer, Integer> cailiaoMap = yuanXiaoLocal.getCailiaoMap();
		YuanXiaoLocalSender.sendCmd_11640(yuanXiaoLocal.getHid(), cailiaoMap.get(YuanXiaoConst.CAILIAO_1), cailiaoMap.get(YuanXiaoConst.CAILIAO_2),
				cailiaoMap.get(YuanXiaoConst.CAILIAO_3));
		return;
		
	}
	
	
	

}
