package com.teamtop.system.sixWay;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bag.BagSender;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.material.MaterialFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.config.Config_sixdao_505;
import excel.config.Config_sixdaolv_505;
import excel.config.Config_sixdaotz_505;
import excel.config.Config_sixdaoyj_505;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_sixdao_505;
import excel.struct.Struct_sixdaolv_505;
import excel.struct.Struct_sixdaoyj_505;

public class SixWayFunction {
	
	private static SixWayFunction ins = null;

	public static SixWayFunction getIns() {
		if (ins == null) {
			ins = new SixWayFunction();
		}
		return ins;
	}

	private SixWayFunction() {
		
	}
	
	
	/**
	 * 判断某个孔是否解锁
	 * @param hero
	 * @param place
	 * @return
	 */
	public boolean isJieSuo(Hero hero, int place) {
		try {
			SixWay sixWay = hero.getSixWay();
			ConcurrentHashMap<Integer, SixWayEquip> bodyData = sixWay.getBodyData();
			if (!bodyData.containsKey(place)) {
				Struct_sixdao_505 struct_sixdao_505 = Config_sixdao_505.getIns().get(place);
				if (struct_sixdao_505==null) {
					return false;
				}
				if (struct_sixdao_505.getLh()>hero.getReincarnationLevel()) {
					return false;
				}
				
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, SixWayFunction.class, "isJieSuo has wrong");
		}
		return false;
		
	}
	
	
	 /**
     * 解锁轮回印记槽
     * @param hero
     */
	public void jieSuo(Hero hero) {
		try {
			SixWay sixWay = hero.getSixWay();
			ConcurrentHashMap<Integer, SixWayEquip> bodyData = sixWay.getBodyData();
			Map<Integer, Struct_sixdao_505> map = Config_sixdao_505.getIns().getMap();
			for (Struct_sixdao_505 sixdao_505:map.values()) {
				int place = sixdao_505.getId();
				if (!bodyData.containsKey(place)) {
					if (hero.getReincarnationLevel()>=sixdao_505.getLh()) {
						SixWayEquip sixWayEquip=new SixWayEquip();
						sixWayEquip.setSixEquipId(0);
						sixWayEquip.setLevel(0);
						sixWayEquip.setStar(0);
						bodyData.put(place, sixWayEquip);
						LogTool.info("SixWay hid:"+hero.getId()+"jiesuo :"+place, SixWayFunction.class);
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, SixWayFunction.class, "jieSuo has wrong");
			return;
		}
	}
	
	/**
	 * 获取背包中同类型印记
	 * @param bagDatas
	 * @param destinyId
	 * @return
	 */
	public int getSameJinjiFromBag(ConcurrentHashMap<Integer, SixWayEquip> bagDatas,int sixwayEquipId) {
		for (int i = 1; i <=SixWayConst.BGA_SIZE; i++) {
			if (bagDatas.containsKey(i)) {
				SixWayEquip sixWayEquip=bagDatas.get(i);
				if (sixWayEquip.getSixEquipId()==sixwayEquipId&&sixWayEquip.getStar()==1) {
					return i;
				}
			}
		}
		return -1;
	}
	
	/**
	 * 获取六门印记背包空位置(1-300)
	 * @param bagDatas
	 * @return
	 */
	public int getnullDesFromBag(ConcurrentHashMap<Integer, SixWayEquip> bagDatas) {
		for (int i = 1; i <=SixWayConst.BGA_SIZE; i++) {
			if (!bagDatas.containsKey(i)) {
				return i;
			}
		}
		return -1;
	}
	
	
	/**
	 * 添加印记到背包
	 * @param bagDatas
	 * @param destinyBagData
	 * @return
	 */
	public int  putDestinyToBag(ConcurrentHashMap<Integer, SixWayEquip> bagDatas,SixWayEquip sixWayEquip) {
		for (int i = 1; i <=SixWayConst.BGA_SIZE; i++) {
			if (!bagDatas.containsKey(i)) {
				bagDatas.put(i, sixWayEquip);
				return i;
			}
		}
		return -1;
	}
	/**
	 * 激活组合
	 * @param hero
	 */
	public void updateZuHe(Hero hero) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return;
			}
			SixWay sixWay = hero.getSixWay();
			ConcurrentHashMap<Integer, SixWayEquip> bodyData = sixWay.getBodyData();
			HashMap<Integer, Integer> zuhenum = sixWay.getZuhenum();
			//每一道已经装备的装备个数
			HashMap<Integer, Integer> equipNumBysixWay=new HashMap<Integer, Integer>();
			
			//每一道最低品质的装备品质
			HashMap<Integer, Integer> lowequipBysixWay=new HashMap<Integer, Integer>();
			
			for (int part: bodyData.keySet()) {
				int index=part/10;
				if (!equipNumBysixWay.containsKey(index)) {
					equipNumBysixWay.put(index, 0);
				}
				Integer equipNum = equipNumBysixWay.get(index);
				SixWayEquip sixWayEquip = bodyData.get(part);
				if (sixWayEquip.getSixEquipId()>0) {
					Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(sixWayEquip.getSixEquipId());
					int pz = struct_sixdaoyj_505.getPz();
					if (pz>=6) {
						if (!lowequipBysixWay.containsKey(index)) {
							lowequipBysixWay.put(index, pz);
						}else {
							Integer lowPz = lowequipBysixWay.get(index);
							if (lowPz>pz) {
								lowequipBysixWay.put(index, pz);
							}
							
						}
						equipNum=equipNum+1;
						equipNumBysixWay.put(index, equipNum);
					}
				}
			}
			for (int i = 1; i <= 6; i++) {
				int zuheid=0;
				if (equipNumBysixWay.containsKey(i)) {
					Integer equipNum = equipNumBysixWay.get(i);
					if (equipNum>=2&&lowequipBysixWay.containsKey(i)) {
						if (equipNum==3) {
							equipNum=2;
						}else if (equipNum==5) {
							equipNum=4;
						}
						Integer lowPz = lowequipBysixWay.get(i);
						if (lowPz>=6) {
							//红色才可以激活组合
							zuheid=i*100+equipNum*10+lowPz;
							if (Config_sixdaotz_505.getIns().getMap().containsKey(zuheid)) {
								zuhenum.put(i, zuheid);
							}else {
								zuhenum.put(i, 0);
							}
						}
					}else {
						zuhenum.put(i, 0);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SixWayFunction.class, "updateZuHe hero hid:"+hero.getId());
		}
	}
	
	public void sendSixWayZuHe(SixWay sixWay) {
		try {
			Object[] yinjis=new Object[6];
			for (int i = 1; i <= 6; i++) {
				yinjis[i-1]=new Object[] {sixWay.getZuhenum().get(i)};
			}
			SixWaySender.sendCmd_11918(sixWay.getHid(), sixWay.getStr(), yinjis);
		} catch (Exception e) {
			LogTool.error(e, SixWayFunction.class, "sendSixWayZuHe hero hid:"+sixWay.getHid());
		}
	}
	
	/**
	 * 添加天命
	 * @param hero
	 * @param destinyId
	 * @return
	 */
	public boolean addYinJiId(Hero hero, int yinjiid) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return false;
			}
			SixWay sixWay = hero.getSixWay();
			if (sixWay==null) {
				return false;
			}
			ConcurrentHashMap<Integer, SixWayEquip> bagData = sixWay.getBagData();
			Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(yinjiid);
			
			if (struct_sixdaoyj_505==null) {
				LogTool.warn(" yinjiid is wrong:"+yinjiid, SixWayFunction.class);
				return false;
			}
			int index =getnullDesFromBag(bagData);
			if (index!=-1) {
				SixWayEquip sixWayEquip = new SixWayEquip();
				sixWayEquip.setSixEquipId(yinjiid);
				sixWayEquip.setStar(1);
				sixWayEquip.setLevel(0);
				bagData.put(index, sixWayEquip);
				// 成就树
				//SixWayManager.getIns().openUi(hero);
				Object[] yinjis=new Object[1];
				yinjis[0]=new Object[] {index,yinjiid,1,1};
				int leftnum=SixWayConst.BGA_SIZE-bagData.size();
				SixWaySender.sendCmd_11914(hero.getId(), yinjis, leftnum);
				//检测背包红点
				SixWayFunction.getIns().readPoint(hero,true);
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "addYinJiId has wrong");
		}
		return false;
	}
	
	
	public void  readPoint(Hero hero,boolean isAddBag) {
		//角色等级小于开启等级
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
			return ;
		}
		SixWay sixWay = hero.getSixWay();
		
		ConcurrentHashMap<Integer, SixWayEquip> bagData = sixWay.getBagData();
		ConcurrentHashMap<Integer, SixWayEquip> bodyData = sixWay.getBodyData();
		ArrayList<Integer> hasType=new ArrayList<>();
		
		for (SixWayEquip sixWayEquip:bagData.values()) {
			int sixEquipId = sixWayEquip.getSixEquipId();
			Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(sixEquipId);
			if (struct_sixdaoyj_505.getType()>0&&!hasType.contains(struct_sixdaoyj_505.getType())) {
				hasType.add(struct_sixdaoyj_505.getType());
			}
		}
		
		ArrayList<Integer> needReads=new ArrayList<>();
		
		for (int  place:bodyData.keySet()) {
			SixWayEquip sixWayEquip = bodyData.get(place);
			int  sixEquipId= sixWayEquip.getSixEquipId();
			int placeindex=place/10;
			if (sixEquipId==0&&hasType.contains(place)) {
				if (!needReads.contains(placeindex)) {
					needReads.add(placeindex);
				}
			}
			int star=sixWayEquip.getStar();
			int nowLevel=sixWayEquip.getLevel();
			if (sixEquipId>0) {
				Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(sixEquipId);
				//等级上限=初始等级上限+星级提升等级上限*（星级-1）
				int maxLevel=struct_sixdaoyj_505.getLv()+(star-1)*struct_sixdaoyj_505.getLvup();
				if (nowLevel<maxLevel) {
					int pz = struct_sixdaoyj_505.getPz();
					Struct_sixdaolv_505 struct_sixdaolv_505 = Config_sixdaolv_505.getIns().get(nowLevel);
					int needExp=0;
					switch (pz) {
					case 1:
						//白色
						break;
					case 2:
						//绿色
						needExp=struct_sixdaolv_505.getExp2();
						break;
					case 3:
						//蓝色
						needExp=struct_sixdaolv_505.getExp3();
						break;		
					case 4:
						//紫色色
						needExp=struct_sixdaolv_505.getExp4();
						break;
					case 5:
						//橙色
						needExp=struct_sixdaolv_505.getExp5();
						break;		
					case 6:
						//红色
						needExp=struct_sixdaolv_505.getExp6();
						break;
					case 8:
						// 神品质
						needExp = struct_sixdaolv_505.getExp8();
						break;				
					default:
						break;
					}
					if (needExp!=0&&UseAddUtil.canUse(hero, GameConst.SIXWAYYINJI, needExp)) {
						if (!needReads.contains(placeindex)) {
							needReads.add(placeindex);
						}
					}
					
					if (star<struct_sixdaoyj_505.getStar()) {
						int bagplace=getSameJinjiFromBag(bagData,sixEquipId);
						if (bagplace>=0) {
							if (!needReads.contains(placeindex)) {
								needReads.add(placeindex);
							}
						}
					}
				}
				
			}
			
		}
		if (isAddBag) {
			if (bagData.size()>=200||needReads.size()>0) {
				if (bagData.size()>=200) {
					RedPointFunction.getIns().updateRedPoint(hero,  SystemIdConst.SIXWAY, 7,
							RedPointConst.HAS_RED);
				}
				if (needReads.size()>0) {
					for (int i = 0; i < needReads.size(); i++) {
						Integer palce = needReads.get(i);
						RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.SIXWAY, palce,
								RedPointConst.HAS_RED);
					}
				}
			}else  {
				for (int i = 1; i <=7; i++) {
					RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.SIXWAY, i,
							RedPointConst.NO_RED);
				}
				
			}
		}else {
			if (bagData.size()>=200) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SIXWAY, 7,
						RedPointConst.HAS_RED);
			}
			if (needReads.size()>0) {
				for (int i = 0; i < needReads.size(); i++) {
					Integer palce = needReads.get(i);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SIXWAY, palce,
							RedPointConst.HAS_RED);
				}
			}
		}
		return;
	}
	
	
	public boolean addSuiJiYingJiid(Hero hero, int sysId, int num) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return false;
			}
			SixWay sixWay = hero.getSixWay();
			ConcurrentHashMap<Integer, SixWayEquip> bagData = sixWay.getBagData();
			int leftNum=SixWayConst.BGA_SIZE-bagData.size();
			if (num>leftNum) {
				LogTool.warn("addnum>leftNum "+leftNum, SixWayFunction.class);
				BagSender.sendCmd_208(hero.getId(), 10);
				return false;
			}
			List<Object[]>  addlist=new ArrayList<>();
			ConcurrentHashMap<Integer, ProbabilityEventModel> diaoLuo = MaterialFunction.getIns().getItemReward(sysId);
			if(diaoLuo == null) return false;
			List<int[]> rewards = new ArrayList<int[]>();
			int isman=0;
			for(int i = 0;i < num; i++) {
				
				for(ProbabilityEventModel pe:diaoLuo.values()){
					int[] is =(int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if(is!=null&&is.length>0){
						int yinjiid=is[1];
						Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
						int[][] gb2 = struct_daoju_204.getGb2();
						if(struct_daoju_204 != null && gb2!=null && gb2.length>0) {
							for(int[]item : gb2) {
								/*if(item[0] == is[1]) {
									ChatManager.getIns().broadCast(ChatConst.BOX_BROAD_2,
											new Object[] { hero.getNameZoneid(), sysId, is[1] });
									break;
								}*/
							}
						}
						rewards.add(is);
						SixWayEquip sixWayEquip=new SixWayEquip();
						
						sixWayEquip.setSixEquipId(yinjiid);
						sixWayEquip.setStar(1);
						sixWayEquip.setLevel(0);
						
						int index = getnullDesFromBag(bagData);
						if (index!=-1) {
							bagData.put(index, sixWayEquip);
							addlist.add(new Object[] {index,yinjiid,0,1});
							
						}else {
							isman=1;
							LogTool.warn("index!=-1:id:"+yinjiid+" hid"+hero.getId(), SixWayFunction.class);
						}
					}
				}
			}
			int leftnum=SixWayConst.BGA_SIZE-bagData.size();
			SixWaySender.sendCmd_11914(hero.getId(), addlist.toArray(), leftnum);
			//检测背包红点
			SixWayFunction.getIns().readPoint(hero,true);
			return true;
		} catch (Exception e) {
			LogTool.error(e, SixWayFunction.class, "addSuiJiYinji");
		}
		return false;
	}
	

}
