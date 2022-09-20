package com.teamtop.system.material;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.bag.BagSender;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.material.baodi.GiftBaodi;
import com.teamtop.system.material.baodi.GiftBaodiCache;
import com.teamtop.system.material.baodi.GiftBaodiData;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.config.Config_lbbd_277;
import excel.config.Config_zblbzh_335;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_lbbd_277;
import excel.struct.Struct_zblbzh_335;
import excel.struct.Struct_zhuangbei_204;

/**
 * 道具功能接口类
 * @author lobbyer
 * @date 2017年3月28日
 */
public class MaterialFunction {
	private static MaterialFunction ins;
	public static MaterialFunction getIns() {
		if(ins == null) {
			ins = new MaterialFunction();
		}
		return ins;
	}
	
	/**
	 * 使用随机礼包
	 * @author lobbyer
	 * @param hero
	 * @param sysId
	 * @param num 数量
	 * @return
	 * @date 2017年3月29日
	 */
	public boolean useGiftTools(Hero hero, int sysId, int num) {
		try {
			Map<Integer, Struct_lbbd_277> map = Config_lbbd_277.getIns().getMap();
			ConcurrentHashMap<Integer, ProbabilityEventModel> diaoLuo = getItemReward(sysId);
			if (diaoLuo == null)
				return false;
			List<int[]> rewards = new ArrayList<int[]>();
			for (int i = 0; i < num; i++) {
				if (map.containsKey(sysId)) {
					boolean giftBaodi = giftBaodi(hero, sysId, rewards);
					if (giftBaodi) {
						continue;
					}
				}
				for (ProbabilityEventModel pe : diaoLuo.values()) {
					int[] is = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if (is != null && is.length > 0) {
						if (is[0] == GameConst.TOOL) {
							int itemid = is[1];
							// 新型广播
							Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
							int[][] gb2 = struct_daoju_204.getGb2();
							if(struct_daoju_204 != null && gb2!=null &&gb2.length>0) {
								for(int[]item : gb2) {
									if(item[0] == itemid) {
										ChatManager.getIns().broadCast(ChatConst.BOX_BROAD,
												new Object[] { hero.getNameZoneid(), sysId, itemid });
										break;
									}
								}
							}
						}
						rewards.add(is);
					}
				}
			}
			int[][] dropArr = new int[rewards.size()][];
			rewards.toArray(dropArr);
			// if (!UseAddUtil.canAdd(hero, dropArr, false)) {
			// BagSender.sendCmd_208(hero.getId(), 8);
			// return false;
			// }
			UseAddUtil.add(hero, dropArr, SourceGoodConst.USE_MATERIAL, UseAddUtil.getDefaultMail(), true);
			return true;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(),"useGiftTools sysId:"+sysId+" num:"+num+" Exception!");
			return false;
		}
	}
	
	/**
	 * 获取礼包可开启数量
	 * @param hero
	 * @param sysId
	 * @param num
	 * @return
	 */
	public int getCanOpenNum(Hero hero, int sysId, int num) {
		try {
			Struct_zblbzh_335 struct_zblbzh_335 = Config_zblbzh_335.getIns().get(sysId);
			if (struct_zblbzh_335 == null) {
				return num;
			}
			int equipEmptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, BagFunction.getIns().getEquipData(hero));
			if (num > equipEmptyGrid) {
				return equipEmptyGrid;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(),"getCanOpenNum sysId:"+sysId+" num:"+num+" Exception!");
		}
		return num;
	}

	/**
	 * 礼包保底
	 * @param hero
	 * @param sysId
	 * @param num
	 * @param rewards
	 */
	public boolean giftBaodi(Hero hero, int sysId, List<int[]> rewards) {
		boolean isBaodi = false;
		try {
			Map<Integer, Struct_lbbd_277> map = Config_lbbd_277.getIns().getMap();
			Struct_lbbd_277 struct_lbbd_277 = map.get(sysId);
			GiftBaodiData giftBaodiData = hero.getGiftBaodiData();
			GiftBaodi giftBaodi = giftBaodiData.getBaodiMap().get(sysId);
			if (giftBaodi == null) {
				giftBaodi = new GiftBaodi();
				giftBaodi.setSysId(sysId);
				Set<Integer> getGoal = new HashSet<>();
				giftBaodi.setGetGoal(getGoal);
				giftBaodiData.getBaodiMap().put(sysId, giftBaodi);
			}
			int nowNum = giftBaodi.getNum();
			int first = giftBaodi.getFirst();
			Set<Integer> getGoal = giftBaodi.getGetGoal();
			int[][] reward1 = struct_lbbd_277.getReward1();
			nowNum += 1;
			if (first == 0) {
				// 首次保底
				int[] rTool = GiftBaodiCache.getTool(sysId);
				rewards.add(rTool);
				giftBaodi.setFirst(1);
				isBaodi = true;
				if (rTool[0] == GameConst.TOOL) {
					int itemid = rTool[1];
					Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
					int[][] gb2 = struct_daoju_204.getGb2();
					if(struct_daoju_204 != null && gb2!=null && gb2.length>0) {
						for(int[]item : gb2) {
							if(item[0] == itemid) {
								ChatManager.getIns().broadCast(ChatConst.BOX_BROAD,
										new Object[] { hero.getNameZoneid(), sysId, itemid });
								break;
							}
						}
					}
				}
			} else {
				for (int[] p : reward1) {
					int start = p[4];
					int end = p[5];
					if (getGoal.contains(p[0])) {
						continue;
					}
					if (nowNum >= start && nowNum <= end) {
						if (nowNum == end) {
							rewards.add(new int[] { p[1], p[2], p[3] });
							getGoal.add(p[0]);
							isBaodi = true;
							if (p[1] == GameConst.TOOL) {
								int itemid = p[2];
								Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
								int[][] gb2 = struct_daoju_204.getGb2();
								if(struct_daoju_204 != null && gb2!=null && gb2.length>0) {
									for(int[]item : gb2) {
										if(item[0] == itemid) {
											ChatManager.getIns().broadCast(ChatConst.BOX_BROAD,
													new Object[] { hero.getNameZoneid(), sysId, itemid });
											break;
										}
									}
								}
							}
							break;
						} else {
							int percent = 1000 / (p[5] - p[4]) * (nowNum - start);
							if (percent > 0) {
								int random = RandomUtil.getRandomNumInAreas(1, 1000);
								if (random < percent) {
									rewards.add(new int[] { p[1], p[2], p[3] });
									getGoal.add(p[0]);
									isBaodi = true;
									if (p[1] == GameConst.TOOL) {
										int itemid = p[2];
										Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
										int[][] gb2 = struct_daoju_204.getGb2();
										if(struct_daoju_204 != null && gb2!=null && gb2.length>0) {
											for(int[]item : gb2) {
												if(item[0] == itemid) {
													ChatManager.getIns().broadCast(ChatConst.BOX_BROAD,
															new Object[] { hero.getNameZoneid(), sysId, itemid });
													break;
												}
											}
										}
									}
									break;
								}
							}
						}
					}
				}
			}
			giftBaodi.setNum(nowNum);
			int resetLimit = GiftBaodiCache.getResetLimit(sysId);
			if (nowNum >= resetLimit) {
				giftBaodi.setNum(0);
				giftBaodi.getGetGoal().clear();
			}
		} catch (Exception e) {
			LogTool.error(e, this, "MaterialFunction giftBaodi sysId=" + sysId);
		}
		return isBaodi;
	}

	/**
	 * 使用概率礼包
	 * @author lobbyer
	 * @param goodsData
	 * @param libaodaoju
	 * @date 2017年3月29日
	 */
	public void useMaterialGift(List<int[]> goodsData,int[][] libaodaoju) {
		int len = libaodaoju.length;
		Map<Integer, ProbabilityEventModel> propMap = new HashMap<Integer, ProbabilityEventModel>();
		for(int i = 0; i < len; i ++) {
			int[] js = libaodaoju[i];
			if(js == null) continue;
			int group = js[0];
			ProbabilityEventModel model = propMap.get(js[0]);
			if(model == null) {
				model = new ProbabilityEventModel();
				propMap.put(group, model);
			}
			model.addProbabilityEvent(js[5], new int[]{js[1], js[2], js[3], js[4]});
		}
		Iterator<Integer> ite = propMap.keySet().iterator();
		while(ite.hasNext()) {
			int key = ite.next();
			ProbabilityEventModel model = propMap.get(key);
			int totalKey = model.getTotalKey();
			if(totalKey < GameConst.MAX_GAILV) {
				model.addProbabilityEvent(GameConst.MAX_GAILV - totalKey, new int[]{});
			}
			int [] data = (int[])ProbabilityEventUtil.getEventByProbability(model);
			if(data.length > 0)
				goodsData.add(data);
		}
	}
	
	/**
	 * 使用可选择道具
	 * @author lobbyer
	 * @param hero
	 * @param itemSys
	 * @param index 选择的索引
	 * @param num 使用数量
	 * @return
	 * @date 2017年3月29日
	 */
	public boolean useCanChangeTool(Hero hero, int sysId, int index, int num) {
		Struct_daoju_204 struct = Config_daoju_204.getIns().get(sysId);
		int[][] canshu = struct.getReward();
		if(canshu == null) {
			return false;
		}
		int toolId = canshu[index][2];
		int toolnum= canshu[index][3];
		Struct_daoju_204 daoju = Config_daoju_204.getIns().get(toolId);
		int type = GameConst.TOOL;
		if(daoju == null) {
			Struct_zhuangbei_204 zb = Config_zhuangbei_204.getIns().get(toolId);
			if(zb == null) {
				return false;
			}
			type = GameConst.EQUIP;
		}
		if(!UseAddUtil.canAdd(hero, type, toolnum*num, toolId, false)){
			BagSender.sendCmd_208(hero.getId(), 8);
			return false;
		}
		UseAddUtil.add(hero, type, toolnum*num, toolId, null, SourceGoodConst.USE_MATERIAL, true);
		return true;
	}
	/**
	 * 获取随机物品 
	 * @author lobbyer
	 * @param tools
	 * @param type 0所有
	 * @return 
	 * @date 2017年3月29日
	 */
	public static int[][] getRandomTypeTools(int[][] tools,int type) {
		List<int[]> randomTools = new ArrayList<int[]>();
		List<int[]> goodsData = new ArrayList<int[]>();
		int[][] newTypeTool = new int[tools.length][];
		if(type > 0) {
			for(int[] tool:tools) {
				if(tool[0] == type) randomTools.add(tool);
			}
			randomTools.toArray(newTypeTool);
		}else{
			newTypeTool = tools;
		}
		MaterialFunction.getIns().useMaterialGift(goodsData, newTypeTool);
		int len = goodsData.size();
		int[][] validData = new int[len][];
		goodsData.toArray(validData);
		return validData;
		
	}
	
	/**
	 * 获取多个随机物品
	 * @author lobbyer
	 * @param goods int[4,40180001,10,1,40000][4,40180001,10,1,60000][4,40180001,10,1,100000]
	 * @return
	 * @date 2017年3月29日
	 */
	public int[][] getMutiRandomGood(int[][] goods) {
		List<int[]> goodsData = new ArrayList<int[]>();
		MaterialFunction.getIns().useMaterialGift(goodsData, goods);
		int len = goodsData.size();
		int[][] validData = new int[len][];
		for(int i = 0; i < len; i ++) {
			validData[i] = goodsData.get(i);
		}
		return validData;
	}
	
	/**
	 * 获取随机物品
	 * @author lobbyer
	 * @param goods 传入概率型物品[[类型,系统id,数量,绑定状态,概率],[4,40180001,10,1,50000]]
	 * @return int[type,id,num,bind] 
	 * @date 2017年3月29日
	 */
	public int[] getRandomGood(int[][] goods) {
		try {
			int len = goods.length;
			ProbabilityEventModel model = new ProbabilityEventModel();
			for(int i = 0; i < len; i ++) {
				int[] js = goods[i];
				model.addProbabilityEvent(js[4], new int[]{js[0], js[1], js[2], js[3]});
			}
			Object obj = ProbabilityEventUtil.getEventByProbability(model);
			if(obj == null) return null;
			int[] data = (int[])obj;
			return data;
		} catch (Exception e) {
			LogTool.error(e, "getRandomGood Exception goods:"+goods.toString());
			return null;
		}
	}
	
	public static void main(String[] args) {
		/*int[][] tools = new int[][]{new int[]{1,1,40701502,1,0,100000},new int[]{2,1,40701503,1,0,40000},new int[]{2,1,40701504,1,0,10000}};
		int[][] randomTypeTools = getRandomTypeTools(tools,1);
		System.out.println(Arrays.deepToString(randomTypeTools));*/
		ConcurrentHashMap<Integer, ProbabilityEventModel> diaoLuo = getIns().getItemReward(400010);
		if(diaoLuo == null) return;
		List<int[]> rewards = new ArrayList<int[]>();
		for(ProbabilityEventModel pe:diaoLuo.values()){
			int[] is =(int[]) ProbabilityEventUtil.getEventByProbability(pe);
			if(is[0]>0){
				rewards.add(is);
			}
		}
		int[][] dropArr= new int[rewards.size()][];
		rewards.toArray(dropArr);
		System.out.println(Arrays.deepToString(dropArr));
	}
	
	
	public ConcurrentHashMap<Integer, ProbabilityEventModel> getItemReward(int sysId) {
		Struct_daoju_204 struct = Config_daoju_204.getIns().get(sysId);
		if(struct.getReward() == null) {
			LogTool.warn("struct.getReward() == null :"+sysId, MaterialFunction.class);
			return null;
		}
		int[][] arrays=struct.getReward();
		ProbabilityEventModel pe = null;
		ConcurrentHashMap<Integer, ProbabilityEventModel> probabilityHashMap=new ConcurrentHashMap<Integer, ProbabilityEventModel>();
		for(int[] a1:arrays) {
			int group=a1[0];
			int type = a1[1];
			int id = a1[2];
			int num = a1[3];
			int gailv = a1[4];
			if (!probabilityHashMap.containsKey(group)) {
				probabilityHashMap.put(group, ProbabilityEventFactory.getProbabilityEvent());
			}
			pe = probabilityHashMap.get(group);
			//[物品类型,物品ID,物品数量,绑定状态,掉落几率1]
			pe.addProbabilityEvent(gailv, new int[]{type,id,num});
		}
		for(ProbabilityEventModel model:probabilityHashMap.values()) {
			//总概率不足100000的时候 
			if (model.getTotalKey() < 100000) {
				model.addProbabilityEvent(100000 - model.getTotalKey(), new int[] {});
			}
		}
		return probabilityHashMap;
	}
	
	
	
	
	
	
	/**
	 * 根据jison获取相应道具
	 * {"diaoluo":[{"type":1,"id":4100,"num":3,"gailv":3000},
	 * {"type":1,"id":4200,"num":4,"gailv":3000},
	 * {"type":1,"id":4100,"num":1,"gailv":400}]}
	 * @param sysId
	 * @return
	 */
	/*@SuppressWarnings("unchecked")
	public List<ProbabilityEventModel> getDiaoLuo(int sysId) {
		Struct_daoju_204 struct = Config_daoju_204.getIns().get(sysId);
		if(struct != null) {
			Map<Object, Object> canshu = struct.getCanshu();
			if(canshu != null) {
				List<Object> objectList = (List<Object>) canshu.get(GameConst.D_DIAOLUO);
				List<ProbabilityEventModel> list = getDiaoLuo(objectList);
				return list;
			}
		}
		return null;
	}*/
	
	@SuppressWarnings("unchecked")
	public List<ProbabilityEventModel> getDiaoLuo(List<Object> objectList) {
		ProbabilityEventModel pe = null;
		int totalGailv = 0;
		List<ProbabilityEventModel> list = new ArrayList<ProbabilityEventModel>();
		for(Object obj:objectList) {
			Map<Object, Object> objs = (Map<Object, Object>) obj;
			int type = (int)objs.get(GameConst.D_TYPE);
			int id = (int)objs.get(GameConst.D_ID);
			int gailv = (int)objs.get(GameConst.D_GAILV);
			int num = (int)objs.get(GameConst.D_NUM);
			if(pe==null) pe = ProbabilityEventFactory.getProbabilityEvent();
			totalGailv += gailv;
			//[物品类型,物品ID,物品数量,绑定状态,掉落几率1]
			pe.addProbabilityEvent(gailv, new int[]{type,id,num});
			if(totalGailv>=GameConst.MAX_GAILV){
				list.add(pe);
				pe = null;
				totalGailv = 0;
			}
		}
		if(totalGailv>0 && pe!=null){
			list.add(pe);
			if (GameConst.MAX_GAILV>totalGailv) {
				pe.addProbabilityEvent(GameConst.MAX_GAILV-totalGailv, new int[]{0,0,0});
			}
		}
		return list;
	}

	/**
	 * 获取概率掉落
	 * @author lobbyer
	 * @param libaodaoju 数组[[1,4200,1,50000],[1,4201,1,50000]]
	 * @return int[type,id,num]
	 * @date 2017年5月10日
	 */
	public int[] getDiaoLuoByArr(int[][] libaodaoju) {
		int len = libaodaoju.length;
		ProbabilityEventModel model = new ProbabilityEventModel();
		for(int i = 0; i < len; i ++) {
			int[] js = libaodaoju[i];
			model.addProbabilityEvent(js[3], new int[]{js[0], js[1], js[2]});
		}
		int[] data = (int[])ProbabilityEventUtil.getEventByProbability(model);
		return data;
	}
	
}
