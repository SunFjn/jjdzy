package com.teamtop.system.littleLeader;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_drug_200;
import excel.config.Config_son_267;
import excel.config.Config_sonqm_267;
import excel.config.Config_sonqn_267;
import excel.config.Config_sonshow_267;
import excel.config.Config_sonsix_267;
import excel.config.Config_sonsixschool_267;
import excel.config.Config_sonskill_267;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_drug_200;
import excel.struct.Struct_son_267;
import excel.struct.Struct_sonqm_267;
import excel.struct.Struct_sonqn_267;
import excel.struct.Struct_sonshow_267;
import excel.struct.Struct_sonsix_267;
import excel.struct.Struct_sonsixschool_267;
import excel.struct.Struct_sonskill_267;
import excel.struct.Struct_sonstar_267;

public class LittleLeaderFunction {
	
	private static LittleLeaderFunction ins;
	
	private LittleLeaderFunction() {
		
	}
	
	public static synchronized LittleLeaderFunction getIns() {
		if (ins == null) {
			ins = new LittleLeaderFunction();
		}
		return ins;
	}
	
	public long getLittleLeaderStrenght(Hero hero,int index) {
		try {
			HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
			LittleLeaderModel littleLeaderModel = hero.getLittleLeader().getHasLittleLeaderModels().get(index);
			if (littleLeaderModel == null) {
				return 0;
			}
			//升星战力
			ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = LittleLeaderSysCache.leaderByStarMap.get(littleLeaderModel.getIndex());
			Struct_sonstar_267 struct_sonstar_267 = concurrentHashMap.get(littleLeaderModel.getStar());
			if (struct_sonstar_267!=null) {
				CommonUtil.arrChargeMap(struct_sonstar_267.getAttr(), attrMap);
			}
			//亲密度等级
			int qimiduLv = littleLeaderModel.getQimiduLv();
			Struct_sonqm_267 struct_sonqm_267 = Config_sonqm_267.getIns().get(qimiduLv);
			if (struct_sonqm_267!=null) {
				CommonUtil.arrChargeMap(struct_sonqm_267.getAttr(), attrMap);
			}
			//时装
			HashMap<Integer, Integer> clothesStar = littleLeaderModel.getClothesStar();
			for (int key:clothesStar.keySet()) {
				int clothid=key;
				int starNum=clothesStar.get(key);
				Struct_sonshow_267 struct_sonshow_267 = Config_sonshow_267.getIns().get(clothid);
				CommonUtil.arrChargeMap(struct_sonshow_267.getAttr(), attrMap, starNum);
			}
			//少主主动技能战力
			int littleStr=SkillFunction.getIns().getLittleLeaderKillStrByIndex(hero,index);
			//被动技能
			HashMap<Integer, Integer> otherSkillLv = littleLeaderModel.getOtherSkillLv();
			int size = otherSkillLv.size();
			for (int i = 0; i < size; i++) {
				Integer skillid = otherSkillLv.get(i);
				if (skillid>0) {
					Struct_sonskill_267 struct_sonskill_267 = Config_sonskill_267.getIns().get(skillid);
					if (struct_sonskill_267!=null) {
						CommonUtil.arrChargeMap(struct_sonskill_267.getAttr(), attrMap);
					}
				}
			}
			
			//少主学堂
			int schoolId = littleLeaderModel.getSchoolId();
			Struct_sonsixschool_267 struct_sonsixschool_267 = Config_sonsixschool_267.getIns().get(schoolId);
			if(struct_sonsixschool_267 != null) {
				CommonUtil.arrChargeMap(struct_sonsixschool_267.getAttr(), attrMap);
			}
			
			//提升升星属性百分比
			int[][] tishengStarAttr = LittleLeaderFunction.getIns().tishengStarAttr(struct_sonstar_267.getAttr(), struct_sonsixschool_267.getJc1());
			if(tishengStarAttr != null) {
				CommonUtil.arrChargeMap(tishengStarAttr, attrMap);
			}
			
			//少主六艺
			HashMap<Integer, SixArtsModel> sixArts = littleLeaderModel.getSixArts();
			if(sixArts!=null && sixArts.size()>0) {
				for(Entry<Integer,SixArtsModel> entry : sixArts.entrySet()) {
					int id = entry.getKey();
					SixArtsModel sixArt = entry.getValue();
					int level = sixArt.getLevel();
					Struct_sonsix_267 struct_sonsix_267 = LittleLeaderFunction.getIns().getStruct_sonsix_267(id,level);
					if(struct_sonsix_267 != null) {
						CommonUtil.arrChargeMap(struct_sonsix_267.getAttr(), attrMap);
					}
				}
			}
			
			//少主潜能
			int qiannengId = littleLeaderModel.getQiannengId();
			Struct_sonqn_267 struct_sonqn_267 = Config_sonqn_267.getIns().get(qiannengId);
			if(struct_sonqn_267 !=  null) {
				CommonUtil.arrChargeMap(struct_sonqn_267.getAttr(), attrMap);
			}
			//潜能提升少主升星属性百分比
			int[][] qiannengStarAttr = LittleLeaderFunction.getIns().tishengStarAttr(struct_sonstar_267.getAttr(), struct_sonqn_267.getJc1());
			if(qiannengStarAttr != null) {
				CommonUtil.arrChargeMap(qiannengStarAttr, attrMap);
			}
			//潜能丹药增加角色属性
			List<int[][]> attrList = LittleLeaderFunction.getIns().danyaoAttr(littleLeaderModel);
			if(attrList!=null && attrList.size()>0) {
				for(int[][] attr : attrList) {
					CommonUtil.arrChargeMap(attr, attrMap);
				}
			}
			
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr attr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, attr);
			FightCalcFunction.calcEquipAttr(finalAttr, attr, 0);
			return finalAttr.getStrength()+littleStr;
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderFunction.class, "getLittleLeaderStrenght has wrong");
		}
		return 0;
	}
	
	
	public void readPoint(Hero hero) {
		try {
			//是否能激活/升星
			/*boolean isCanJiHuo=false;
			boolean isAddQiMiDu=false;
			boolean isUpFashion=false;
			boolean isWashKill=false;*/
			int[][] cost=Config_xtcs_004.getIns().get(LittleLeaderConst.cost1).getOther();
			for(Struct_son_267 son_267:Config_son_267.getIns().getSortList()) {
				int star=0;
				LittleLeaderModel littleLeaderModel = hero.getLittleLeader().getHasLittleLeaderModels().get(son_267.getId());
				if (littleLeaderModel != null) {
					star=littleLeaderModel.getStar();
				}
				ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = LittleLeaderSysCache.leaderByStarMap.get(son_267.getId());
				Struct_sonstar_267 struct_sonstar_267 = concurrentHashMap.get(star);
				if (struct_sonstar_267.getNext()!=0) {
					int[][] conmuse = struct_sonstar_267.getConmuse();
					if (UseAddUtil.canUse(hero, conmuse)) {
						//isCanJiHuo=true;
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.LITTLE_LEADER, ArchiveConst.RedPoint,
								RedPointConst.HAS_RED);
						return;
						
					}
					
				}
				//亲密度
				if (littleLeaderModel != null) {
					int qimiduLv = littleLeaderModel.getQimiduLv();
					Struct_sonqm_267 struct_sonqm_267 = Config_sonqm_267.getIns().get(qimiduLv);
					if (struct_sonqm_267!=null) {
						int nextExp = struct_sonqm_267.getExp();
						if (nextExp!=0) {
							int exp=littleLeaderModel.getExp();
							int needExp=nextExp-exp;
							if (needExp>0) {
								Struct_son_267 struct_son_267 = Config_son_267.getIns().get(son_267.getId());
								List<int[]> dropArr = new ArrayList<int[]>();
								int[][] qm = struct_son_267.getQm();
								int addSumExp=0;
								for (int i = 0; i < qm.length; i++) {
									if (addSumExp>=needExp) {
										break;
									}
									int leftNeedExp=needExp-addSumExp;
									int[] js = qm[i];
									int itemid=js[0];
									int addExp=js[1];
									
									int needNum=leftNeedExp/addExp;
									int yunNum=leftNeedExp%addExp;
									if (yunNum>0) {
										needNum=needNum+1;
									}
									int hasNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
									//[type,id,num]
									if (hasNum>0) {
										if (hasNum>=needNum) {
											//道具够了
											addSumExp=addSumExp+needNum*addExp;
											dropArr.add(new int[]{GameConst.TOOL,itemid,needNum});
											
										}else {
											//道具不够
											addSumExp=addSumExp+hasNum*addExp;
											dropArr.add(new int[]{GameConst.TOOL,itemid,hasNum});
										}
									}
								}
								if (addSumExp>0) {
									exp=exp+addSumExp;
									int[][] drops = new int[dropArr.size()][];
									dropArr.toArray(drops);
									if (UseAddUtil.canUse(hero, drops)) {
										//isAddQiMiDu=true;
										RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.LITTLE_LEADER, ArchiveConst.RedPoint,
												RedPointConst.HAS_RED);
										return;
									}
								}
								
							}
						}
					}
					//携带被动技能为空
					for (int i = 0; i <littleLeaderModel.getOtherSkillLv().size(); i++) {
						Integer killid = littleLeaderModel.getOtherSkillLv().get(i);
						if (killid==0&&UseAddUtil.canUse(hero, cost)) {
							//isWashKill=true;
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.LITTLE_LEADER, ArchiveConst.RedPoint,
									RedPointConst.HAS_RED);
							return;
						}
					}
				}
			}
			//时装
			for (Struct_sonshow_267 sonshow_267:Config_sonshow_267.getIns().getSortList()) {
				int son = sonshow_267.getSon();
				LittleLeaderModel littleLeaderModel = hero.getLittleLeader().getHasLittleLeaderModels().get(son);
				if (littleLeaderModel!=null) {
					HashMap<Integer, Integer> clothesStar = littleLeaderModel.getClothesStar();
					int star=0;
					if (clothesStar!=null&&clothesStar.containsKey(sonshow_267.getId())) {
						star = clothesStar.get(sonshow_267.getId());
					}
					if (star<sonshow_267.getMax()) {
						int[][] conmuse = sonshow_267.getConmuse();
						if (UseAddUtil.canUse(hero, conmuse)) {
							//isUpFashion=true;
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.LITTLE_LEADER, ArchiveConst.RedPoint,
									RedPointConst.HAS_RED);
							return;
						}
					}
				}
			}
			//升星奖励
			LittleLeader littleLeader = hero.getLittleLeader();
			for (int rewardState:littleLeader.getStarRewardState().values()) {
				if (rewardState==GameConst.REWARD_1) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.LITTLE_LEADER, ArchiveConst.RedPoint,
							RedPointConst.HAS_RED);
					return;
				}
			}
		
			
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderFunction.class, "readPoint has wrong");
		}
		
	}
	
	
	/**
	 * 少主六艺红点
	 * @param hero
	 */
	public void sixArtRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXARTS)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			for(Integer index : hasLittleLeaderModels.keySet()) {
				boolean bool3 = redFurtherEducation(hero, index);
				if(bool3) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SIXARTS, RedPointConst.RED_1, RedPointConst.HAS_RED);
					return;
				}
				for(int id=1; id<=LittleLeaderConst.SIXART; id++) {
					boolean bool = redLv(hero, index, id);
					if(bool) {
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SIXARTS, RedPointConst.RED_1, RedPointConst.HAS_RED);
						return;
					}
				}
				boolean bool2 = redKaoShi(hero, index);
				if(bool2) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SIXARTS, RedPointConst.RED_1, RedPointConst.HAS_RED);
					return;
				}
			}
			
		}catch (Exception e) {
			LogTool.error(e, LittleLeaderFunction.class, "sixArtRedPoint has wrong");
		}
	}
	
	/**是否有进修红点*/
	public boolean redFurtherEducation(Hero hero, int index) {
		LittleLeader littleLeader=hero.getLittleLeader();
		HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
		LittleLeaderModel LittleLeaderModel = hasLittleLeaderModels.get(index);
		
		int schoolId = LittleLeaderModel.getSchoolId();
		if(schoolId == 0) {
			schoolId = 1;
		}
		Struct_sonsixschool_267 struct_sonsixschool_267 = Config_sonsixschool_267.getIns().get(schoolId);
		int next = struct_sonsixschool_267.getNext();
		if(next <= 0) {
			return false;
		}
		
		HashMap<Integer, SixArtsModel> sixArts = LittleLeaderModel.getSixArts();
		if(sixArts==null || sixArts.size()==0) {
			return false;
		}
		int[] six = struct_sonsixschool_267.getSix()[0];
		for(int i : six) {
			SixArtsModel sixArtsModel = sixArts.get(i);
			if(sixArtsModel == null) {
				return false;
			}
			if(schoolId != sixArtsModel.getSchoolId()) {
				return false;
			}
		}
		return true;
	}
	
	/**是否有六艺考试红点*/
	public boolean redKaoShi(Hero hero, int index) {
		LittleLeader littleLeader=hero.getLittleLeader();
		HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
		LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(index);
		HashMap<Integer, SixArtsModel> sixArtMap = littleLeaderModel.getSixArts();
		if(sixArtMap == null) {
			return false;
		}
		
		int schoolId = littleLeaderModel.getSchoolId();
		if(schoolId == 0) {
			schoolId = 1;
		}
		Struct_sonsixschool_267 struct_sonsixschool_267 = Config_sonsixschool_267.getIns().get(schoolId);
		int[][] six = struct_sonsixschool_267.getSix();
		int len = six[0].length;
		int flag = 0;
		int flag2 = 0;
		for(int i=0; i<len; i++) {
			int id = six[0][i];
			SixArtsModel sixArtsModel = sixArtMap.get(id);
			if(sixArtsModel == null) {
				return false;
			}
			if(schoolId == sixArtsModel.getSchoolId()) {
				flag2++;
				continue;
			}
			int level = sixArtsModel.getLevel();
			int[][] yq = struct_sonsixschool_267.getYq();
			if(yq == null) return false;
			for(int j=0; j<yq.length; j++) {
				int[] big = yq[j];
				int sysId = big[0];
				if(id == sysId) {
					int sysLv = big[1];
					if(level < sysLv) {
						return false;
					}
					flag++;
					break;
				}
			}
		}
		if(flag+flag2 >=len && flag>0) {
			int[][] consume = struct_sonsixschool_267.getConsume();
			if(consume != null) {
				if (UseAddUtil.canUse(hero, consume)) {
					return true;
				}
			}
		}
		return false;
	}
	
	/**是否有六艺升级红点*/
	public boolean redLv(Hero hero, int index, int id) {
		LittleLeader littleLeader=hero.getLittleLeader();
		HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
		LittleLeaderModel LittleLeaderModel = hasLittleLeaderModels.get(index);
		int star = LittleLeaderModel.getStar();
		
		HashMap<Integer, SixArtsModel> sixArts = LittleLeaderModel.getSixArts();
		if(sixArts == null) {
			return false;
		}
		int level = 0;
		SixArtsModel sixArt = sixArts.get(id);
		if(sixArt != null) {
			level = sixArt.getLevel()+1;
		}
		Struct_sonsix_267 struct_sonsix_267 = LittleLeaderFunction.getIns().getStruct_sonsix_267(id,level);
		if(struct_sonsix_267 == null) {
			return false;
		}
		int sysStar = struct_sonsix_267.getStar();
		if(star < sysStar) {
			return false;
		}
		int next = struct_sonsix_267.getNext();
		if(next <= 0) {
			return false;
		}
		int[][] consume = struct_sonsix_267.getConsume();
		if (UseAddUtil.canUse(hero, consume)) {
			return true;
		}
		return false;
	}
	
	/**
	 * 根据六艺等级获得少主六艺表信息
	 * @param level
	 * @return
	 */
	public Struct_sonsix_267 getStruct_sonsix_267(int id,int level) {
		int key = id*1000+level;
		Struct_sonsix_267 struct_sonsix_267 = Config_sonsix_267.getIns().get(key);
		return struct_sonsix_267;
	}
	
	/**
	 * 提升少主百分比属性（十万分比）
	 * @param attr 升星属性
	 * @param attrPro 少主学堂提升百分比
	 * @return
	 */
	public int[][] tishengStarAttr(int[][] attr, int[][] attrPro) {
		try {
			int len = attrPro.length;
			int[][] arr = new int[len][]; 
			for(int i=0; i<len; i++) {
				int[] attrPro2 = attrPro[i];
				int addId = attrPro2[0];
				for(int j=0; j<attr.length; j++) {
					int[] attr2 = attr[j];
					int id = attr2[0];
					if(addId == id) {
						float pro = attrPro2[1]/100000f;
						int val = (int)(attr2[1]*pro);
						int[] addArr = new int[] {id, val};
						arr[i] = addArr;
						break;
					}
				}
			}
			return arr;
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderFunction.class, "tishengStarAttr has wrong");
		}
		return null;
	}

	//少主服食丹药提升属性
	public List<int[][]> danyaoAttr(LittleLeaderModel littleLeaderModel){
		HashMap<Integer, Integer> swallowMap = littleLeaderModel.getSwallow();
		if(swallowMap == null) return null;
		List<int[][]> list = new ArrayList<int[][]>();
		for(Entry<Integer,Integer> entry : swallowMap.entrySet()) {
			Integer id = entry.getKey();
			Integer num = entry.getValue();
			Struct_drug_200 struct_drug_200 = Config_drug_200.getIns().get(id);
			if(struct_drug_200 != null) {
				int[][] data = CommonUtil.copyDyadicArray(struct_drug_200.getAttr());
				for(int[] d : data){
					d[1] = d[1]*num;
				}
				list.add(data);
			}
		}
		return list;
	}
	
	/**
	 * 获得潜能id
	 * @param index 少主id
	 * @return 潜能id
	 */
	public int getQiannengId(int index) {
		return index*LittleLeaderConst.POTENTIAL_BASE_LEVEL;
	}
	
	/**
	 * 潜能冲穴红点
	 * @param hero
	 * @param index
	 */
	public void qiannengRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			for(LittleLeaderModel littleLeaderModel : hasLittleLeaderModels.values()) {
				int star = littleLeaderModel.getStar();
				ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = LittleLeaderSysCache.leaderByStarMap.get(littleLeaderModel.getIndex());
				Struct_sonstar_267 struct_sonstar_267 = concurrentHashMap.get(star);
				if (struct_sonstar_267.getNext() != 0) {
					continue;
				}
				
				int id = littleLeaderModel.getQiannengId();
				Struct_sonqn_267 struct_sonqn_267 = Config_sonqn_267.getIns().get(id);
				int next = struct_sonqn_267.getNext();
				if(next <= 0) {
					continue;
				}
				
				int[][] consume = struct_sonqn_267.getConsume();
				if (!UseAddUtil.canUse(hero, consume)) {
					continue;
				}
				
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.QIANNENG, RedPointConst.RED_1, RedPointConst.HAS_RED);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderFunction.class, "qiannengRedPoint has wrong");
		}
	}
}
