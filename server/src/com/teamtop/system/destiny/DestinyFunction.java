package com.teamtop.system.destiny;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.bag.BagSender;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.backstage.events.backstage.flowDestiny.B_FlowDestinyEvent;
/*import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;*/
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.material.MaterialFunction;
import com.teamtop.system.material.baodi.GiftBaodi;
import com.teamtop.system.material.baodi.GiftBaodiCache;
import com.teamtop.system.material.baodi.GiftBaodiData;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bzt_261;
import excel.config.Config_bztfwtz_261;
import excel.config.Config_bztlv_261;
import excel.config.Config_bztzf_261;
import excel.config.Config_daoju_204;
import excel.config.Config_lbbd_277;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_bzt_261;
import excel.struct.Struct_bztfwtz_261;
import excel.struct.Struct_bztlv_261;
import excel.struct.Struct_bztzf_261;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_lbbd_277;
import excel.struct.Struct_xtcs_004;
/**
 * 天命心法方法
 * @author Administrator
 *
 */
public class DestinyFunction {
	private static DestinyFunction ins = null;
	public static DestinyFunction getIns(){
		if(ins == null){
			ins = new DestinyFunction();
		}
		return ins;
	}
	/**
	 * 
	 * @param hero
	 * @param vipLevel
	 */
	public void vipadd(Hero hero) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
			for (Struct_bzt_261 xitongkaiqi_104:Config_bzt_261.getIns().getSortList()) {
				int vipLimit=xitongkaiqi_104.getVip();
				int id = xitongkaiqi_104.getId();
				if (vipLimit!=0&&xitongkaiqi_104.getLv()!=0) {
					if (vipLimit!=0&&hero.getVipLv()>=vipLimit&&!concurrentHashMap.containsKey(id)) {
						DestinyFunction.getIns().jieSuoDestiny(hero,id);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DestinyFunction.class, "vipadd has wrong");
		}
		
	}
	/**
	 * 判断某个孔是否解锁
	 * @param hero
	 * @param place
	 * @return
	 */
	public boolean isJieSuo(Hero hero, int place) {
		try {
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
			if (!concurrentHashMap.containsKey(place)) {
				Struct_bzt_261 xitongkaiqi_104=Config_bzt_261.getIns().get(place);
				if (xitongkaiqi_104.getLv()==0&&xitongkaiqi_104.getXh()!=null) {
					//特殊开启方式
					int sumNum=xitongkaiqi_104.getFw();
					int[][] xh = xitongkaiqi_104.getXh();
					int getfuwenSumLevel = DestinyFunction.getIns().getfuwenSumLevel(hero);
					if (getfuwenSumLevel<sumNum||!UseAddUtil.canUse(hero, xh)) {
						return false;
					}
				}else if(xitongkaiqi_104.getVip()!=0&&xitongkaiqi_104.getLv()!=0) {
					if (hero.getVipLv()<xitongkaiqi_104.getVip() && hero.getRealLevel()<xitongkaiqi_104.getLv()) {
						//vip 和 等级 都达不了
						return  false ;
					}
					
				}else if (xitongkaiqi_104.getLv()!=0) {
					if (hero.getRealLevel()<xitongkaiqi_104.getLv()) {
						//等级 达不了
						return  false;
					}
					
				}
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, DestinyFunction.class, "isJieSuo has wrong");
		}
		return false;
		
	}

    /**
     * 解锁玩家天命槽
     * @param hero
     */
	public void jieSuoDestiny(Hero hero,int place) {
		try {
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
			if (!concurrentHashMap.containsKey(place)) {
				Struct_bzt_261 xitongkaiqi_104=Config_bzt_261.getIns().get(place);
				if(xitongkaiqi_104.getVip()!=0&&xitongkaiqi_104.getLv()!=0) {
					if (hero.getVipLv()<xitongkaiqi_104.getVip() && hero.getRealLevel()<xitongkaiqi_104.getLv()) {
						//vip 和 等级 都达不了
						return;
					}
					
				}else if (xitongkaiqi_104.getLv()!=0) {
					if (hero.getRealLevel()<xitongkaiqi_104.getLv()) {
						//等级 达不了
						return;
					}
					
				}
				DestinyBagData destinyBagData=new DestinyBagData();
				destinyBagData.setDestinyId(0);
				destinyBagData.setLevel(0);
				destinyBagData.setStar(0);
				concurrentHashMap.put(place, destinyBagData);
				//八门金锁
				EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_8, 1);
			}
		} catch (Exception e) {
			LogTool.error(e, DestinyFunction.class, "jieSuoDestiny has wrong");
			return;
		}
	}
	
	/**
	 * 获取已经解锁符文锁个数
	 * @param hero
	 * @return
	 */
	public int jiesuonum(Hero hero) {
		int jiesuonum=0;
		try {
			jiesuonum=hero.getPersonalDestiny().getBodyData().get(0).size();
		} catch (Exception e) {
			LogTool.error(e, DestinyFunction.class, "jiesuonum has wrong");
		}
		return jiesuonum;
	}
	/**
	 * 获取符文总等级
	 * @param hero
	 * @return
	 */
	public int getfuwenSumLevel(Hero hero) {
		int fuwenSumLevel=0;
		try {
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
			for (DestinyBagData  destinyBagData:concurrentHashMap.values()) {
				if (destinyBagData.getDestinyId()!=0) {
					fuwenSumLevel=destinyBagData.getLevel()+fuwenSumLevel;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DestinyFunction.class, "getfuwenSumLevel has wrong");
		}
		return fuwenSumLevel;
	}
	
	/**
	 * :镶嵌XX个橙品符文
	 * @param hero
	 * @return
	 */
	public int getfuwenNumByType(Hero hero,int type) {
		int num=0;
		try {
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
			for (DestinyBagData  destinyBagData:concurrentHashMap.values()) {
				if (destinyBagData.getDestinyId()!=0) {
					Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyBagData.getDestinyId());
					int destinypz=struct_bztzf_261.getPz();
					if (destinypz>=type) {
						num=num+1;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DestinyFunction.class, "getfuwenSumLevel has wrong");
		}
		return num;
	}
	
	/**
	 * 取得指定品质符文总星级(向下兼容)
	 * 	1星神品=3星红品  用于符文大师
	 * @param hero
	 * @param type
	 *            品质
	 * @return
	 */
	public int getfuwenTotalStarByType(Hero hero,int type) {
		int totalStar=0;
		try {
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
			for (DestinyBagData  destinyBagData:concurrentHashMap.values()) {
				if (destinyBagData.getDestinyId()!=0) {
					Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyBagData.getDestinyId());
					int destinypz=struct_bztzf_261.getPz();
					if (destinypz >= type) {
						int star = destinyBagData.getStar();
						if (destinypz == DestinyConst.GOD) {
							// 神品质=3个红品质星级
							star = destinyBagData.getStar() * 3;
						}
						totalStar += star;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "getfuwenTotalStarByType type:" + type+" totalStar"+totalStar);
		}
		return totalStar;
	}
	
	/**
	 * 判断某角色身上是否有相同类型的天命心法
	 * @param goalDestinys
	 * @param type
	 * @return
	 */
	public boolean isHaveSameTypeDes(ConcurrentHashMap<Integer, DestinyBagData> goalDestinys,int type,int gridIndex){
		Set<Entry<Integer, DestinyBagData>> entryBodyDestiny = goalDestinys.entrySet();
		Iterator<Entry<Integer, DestinyBagData>> iterBodyDestiny = entryBodyDestiny.iterator();
		while(iterBodyDestiny.hasNext()){
			Entry<Integer, DestinyBagData> destinyNext = iterBodyDestiny.next();
			int index=destinyNext.getKey();
			DestinyBagData bodyDes = destinyNext.getValue();
			 Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(bodyDes.getDestinyId());
			if (struct_bztzf_261!=null) {
				if (struct_bztzf_261.getType()==type) {
					if (index!=gridIndex) {
						return true;
					}
					
				}
			}
		}
		return false;
	}
	/**
	 * 获取背包中同类型天命
	 * @param bagDatas
	 * @param destinyId
	 * @return
	 */
	public int getDestinyFromBag(ConcurrentHashMap<Integer, DestinyBagData> bagDatas,int destinyId) {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DestinyConst.DESTINY_BAG_SIZE);
		for (int i = 0; i < struct_xtcs_004.getNum(); i++) {
			if (bagDatas.containsKey(i)) {
				DestinyBagData destinyBagData=bagDatas.get(i);
				if (destinyBagData.getDestinyId()==destinyId&&destinyBagData.getStar()==1) {
					return i;
				}
			}
		}
		return -1;
	}
	
	public int getnullDesFromBag(ConcurrentHashMap<Integer, DestinyBagData> bagDatas) {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DestinyConst.DESTINY_BAG_SIZE);
		for (int i = 0; i < struct_xtcs_004.getNum(); i++) {
			if (!bagDatas.containsKey(i)) {
				return i;
			}
		}
		return -1;
	}
	
	
	/**
	 * 添加天命到背包
	 * @param bagDatas
	 * @param destinyBagData
	 * @return
	 */
	public int  putDestinyToBag(ConcurrentHashMap<Integer, DestinyBagData> bagDatas,DestinyBagData destinyBagData) {
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DestinyConst.DESTINY_BAG_SIZE);
		for (int i = 0; i < struct_xtcs_004.getNum(); i++) {
			if (!bagDatas.containsKey(i)) {
				bagDatas.put(i, destinyBagData);
				return i;
			}
		}
		return -1;
	}
	
	
	public void  readPoint(Hero hero) {
		boolean isreadpoint=false;
		//角色等级小于开启等级
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
			return ;
		}
		PersonalDestiny personalDestiny=hero.getPersonalDestiny();
		if (personalDestiny.getFeelNum()>0) {
			isreadpoint=true;
		}
		/*Struct_bztjd_261 struct_bztjd_261 = Config_bztjd_261.getIns().get(DestinyConst.LOW);
		if (personalDestiny.getCoinNum()<struct_bztjd_261.getTime()) {
			isreadpoint=true;
		}*/
		ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
		ConcurrentHashMap<Integer, DestinyBagData> bagData = personalDestiny.getBagData();
	    for (Struct_bzt_261 struct_bzt_261:Config_bzt_261.getIns().getSortList()) {
	    	if (struct_bzt_261.getVip()==0&&struct_bzt_261.getLv()==0&&!concurrentHashMap.containsKey(struct_bzt_261.getId())) {
				int getfuwenSumLevel = DestinyFunction.getIns().getfuwenSumLevel(hero);
				int sumNum=struct_bzt_261.getFw();
				int[][] xh = struct_bzt_261.getXh();
				if (getfuwenSumLevel>=sumNum&&UseAddUtil.canUse(hero, xh)) {
					isreadpoint=true;
	    		}
	    	}
		}
	    
		if (bagData.size()>100) {
			isreadpoint=true;
		}
		ArrayList<Integer> hasDestinyType=new ArrayList<>();
		for (DestinyBagData destinyData:bagData.values()) {
			int destinyId = destinyData.getDestinyId();
			Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyId);
			if (struct_bztzf_261.getType()>0&&!hasDestinyType.contains(struct_bztzf_261.getType())) {
				hasDestinyType.add(struct_bztzf_261.getType());
			}
		}
		ArrayList<Integer> equipDestinyType=new ArrayList<>();
		boolean ishasNullEquip=false;
		for (DestinyBagData destinyData:concurrentHashMap.values()) {
			int destinyId = destinyData.getDestinyId();
			if (destinyId>0) {
				Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyId);
				if (struct_bztzf_261.getType()>0&&!equipDestinyType.contains(struct_bztzf_261.getType())) {
					equipDestinyType.add(struct_bztzf_261.getType());
					if(!hasDestinyType.contains(struct_bztzf_261.getType())) {
						hasDestinyType.add(struct_bztzf_261.getType());
					}
				}
			}else if (destinyId==0) {
				ishasNullEquip=true;
			}
			
		}
		if (ishasNullEquip&&hasDestinyType.size()>equipDestinyType.size()) {
			isreadpoint=true;
		}
		boolean isUpLevel=false;
		boolean isUpStar=false;
		
		for (DestinyBagData destinyData:concurrentHashMap.values()) {
			int destinyId = destinyData.getDestinyId();
			if (destinyId==0) {
				continue;
			}
			int star=destinyData.getStar();
			int nowLevel=destinyData.getLevel();
			Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyId);
			if (struct_bztzf_261.getType()==0) {
				continue;
			}
			//等级上限=初始等级上限+星级提升等级上限*（星级-1）
			int maxLevel=struct_bztzf_261.getLv1()+(star-1)*struct_bztzf_261.getLv();
			if (nowLevel<maxLevel) {
				int vip=struct_bztzf_261.getPz();
				Struct_bztlv_261 struct_bztlv_261 = Config_bztlv_261.getIns().get(nowLevel);
				int needExp=0;
				switch (vip) {
				case 1:
					//白色
					break;
				case 2:
					//绿色
					needExp=struct_bztlv_261.getExp2();
					break;
				case 3:
					//蓝色
					needExp=struct_bztlv_261.getExp3();
					break;		
				case 4:
					//紫色色
					needExp=struct_bztlv_261.getExp4();
					break;
				case 5:
					//橙色
					needExp=struct_bztlv_261.getExp5();
					break;		
				case 6:
					//红色
					needExp=struct_bztlv_261.getExp6();
					break;
				case 8:
					// 神品质
					needExp = struct_bztlv_261.getExp8();
					break;				
				default:
					break;
				}
				if (needExp!=0&&UseAddUtil.canUse(hero, GameConst.DESTINYEXP, needExp)) {
					isUpLevel=true;
					break;
				}
			}
			if (star<struct_bztzf_261.getStar()) {
				int bagplace=DestinyFunction.getIns().getDestinyFromBag(personalDestiny.getBagData(),destinyId);
				if (bagplace>=0) {
					isUpStar=true;
					break;
				}
			}
		}
		if (isreadpoint||isUpStar||isUpLevel) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.DESTINY_SYSID, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		return;
	}
	

	/**
	 * 添加天命
	 * @param hero
	 * @param destinyId
	 * @return
	 */
	public boolean addDetinyId(Hero hero, int destinyId) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return false;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			if (personalDestiny==null) {
				return false;
			}
			ConcurrentHashMap<Integer, DestinyBagData> bagData = personalDestiny.getBagData();
			Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyId);
			
			if (struct_bztzf_261==null) {
				LogTool.warn(" destinyId is wrong:"+destinyId, DestinyFunction.class);
				return false;
			}
			int index = DestinyFunction.getIns().getnullDesFromBag(bagData);
			if (index!=-1) {
				DestinyBagData destinyBagData=new DestinyBagData();
				destinyBagData.setDestinyId(destinyId);
				destinyBagData.setStar(1);
				destinyBagData.setLevel(0);
				bagData.put(index, destinyBagData);
				// 成就树
				AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_28, 1, destinyId);
				DestinyManager.getIns().openUi(hero);
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "addDetinyId has wrong");
		}
		return false;
		
	}
	/**
	 * 添加天命
	 * @param hero
	 * @param num
	 */
	public void addDestinySuiPian(Hero hero,Integer destinyid, Integer num) {
		try {
			if (num<=0) {
				return;
			}
			List<Object[]>  addfuwenlist=new ArrayList<>();
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			if (personalDestiny==null) {
				return ;
			}
			int isman=0;
			for (int i = 0; i < num; i++) {
				DestinyBagData destinyBagData=new DestinyBagData();
				destinyBagData.setDestinyId(destinyid);
				destinyBagData.setStar(1);
				destinyBagData.setLevel(0);
				int index = DestinyFunction.getIns().getnullDesFromBag(personalDestiny.getBagData());
				if (index!=-1) {
					personalDestiny.getBagData().put(index, destinyBagData);
					addfuwenlist.add(new Object[] {index,destinyBagData.getDestinyId(),1,0});
				}else {
					isman=1;
					LogTool.warn("index!=-1:id:"+destinyBagData.getDestinyId()+" hid"+hero.getId(), DestinyManager.class);
				}
			}
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DestinyConst.DESTINY_BAG_SIZE);
			if (personalDestiny.getBagData().size()==struct_xtcs_004.getNum()) {
				isman=1;
			}
			DestinySender.sendCmd_4424(hero.getId(), addfuwenlist.toArray(), isman);
			//DestinySender.sendCmd_4412(hero.getId(), addfuwenlist.toArray(), personalDestiny.getFeelNum(), personalDestiny.getCoinNum(), personalDestiny.getYuanbaoNum(),100,personalDestiny.getLuckNum()/10);
		} catch (Exception e) {
			LogTool.error(e, DestinyConst.class, "addDestinySuiPian");
		}
		
	}
	public boolean addSuiJiDestinyid(Hero hero, int sysId, int num) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return false;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> bagData = personalDestiny.getBagData();
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DestinyConst.DESTINY_BAG_SIZE);
			int leftNum=struct_xtcs_004.getNum()-bagData.size();
			if (num>leftNum) {
				LogTool.warn("addnum>leftNum "+leftNum, DestinyManager.class);
				BagSender.sendCmd_208(hero.getId(), 9);
				return false;
			}
			List<Object[]>  addfuwenlist=new ArrayList<>();
			ConcurrentHashMap<Integer, ProbabilityEventModel> diaoLuo = MaterialFunction.getIns().getItemReward(sysId);
			if(diaoLuo == null) return false;
			List<int[]> rewards = new ArrayList<int[]>();
			int isman=0;
			Map<Integer, Struct_lbbd_277> baodiMap = Config_lbbd_277.getIns().getMap();
			for(int i = 0;i < num; i++) {
				if (baodiMap.containsKey(sysId)) {
					boolean giftBaodi = giftBaodi(hero, sysId, addfuwenlist, personalDestiny);
					if (giftBaodi) {
						continue;
					}
				}
				for(ProbabilityEventModel pe:diaoLuo.values()){
					int[] is =(int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if(is!=null&&is.length>0){
						
						Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
						int[][] gb2 = struct_daoju_204.getGb2();
						if(struct_daoju_204 != null && gb2!=null && gb2.length>0) {
							for(int[]item : gb2) {
								if(item[0] == is[1]) {
									ChatManager.getIns().broadCast(ChatConst.BOX_BROAD_2,
											new Object[] { hero.getNameZoneid(), sysId, is[1] });
									break;
								}
							}
						}
						rewards.add(is);
						DestinyBagData destinyBagData=new DestinyBagData();
						destinyBagData.setDestinyId(is[1]);
						destinyBagData.setStar(1);
						destinyBagData.setLevel(0);
						int index = DestinyFunction.getIns().getnullDesFromBag(personalDestiny.getBagData());
						if (index!=-1) {
							personalDestiny.getBagData().put(index, destinyBagData);
							addfuwenlist.add(new Object[] {index,destinyBagData.getDestinyId(),1,0});
							//符文流水
							B_FlowDestinyEvent.addFlow(hero.getId(), 0, destinyBagData.getDestinyId(), hero.getZoneid());
						}else {
							isman=1;
							LogTool.warn("index!=-1:id:"+destinyBagData.getDestinyId()+" hid"+hero.getId(), DestinyManager.class);
						}
						// 成就树
						AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_28, 1, is[1]);
					}
				}
			}
			if (personalDestiny.getBagData().size()==struct_xtcs_004.getNum()) {
				isman=1;
			}
			DestinySender.sendCmd_4424(hero.getId(), addfuwenlist.toArray(), isman);
			//DestinySender.sendCmd_4412(hero.getId(), addfuwenlist.toArray(), personalDestiny.getFeelNum(), personalDestiny.getCoinNum(), personalDestiny.getYuanbaoNum(),100,personalDestiny.getLuckNum()/10);
			//UseAddUtil.add(hero, dropArr, SourceGoodConst.USE_MATERIAL, null, true);
			return true;
		} catch (Exception e) {
			LogTool.error(e, DestinyConst.class, "addSuiJiDestinyid");
		}
		return false;
	}
	
	/**
	 * 礼包保底
	 * @param hero
	 * @param sysId
	 * @param num
	 * @param rewards
	 */
	public boolean giftBaodi(Hero hero, int sysId, List<Object[]> addfuwenlist, PersonalDestiny personalDestiny) {
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
			int[] rTool = null;
			if (first == 0) {
				// 首次保底
				rTool = GiftBaodiCache.getTool(sysId);
				giftBaodi.setFirst(1);
				isBaodi = true;
				if (rTool[0] == GameConst.TOOL) {
					int itemid = rTool[1];
					Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
					int[][] gb2 = struct_daoju_204.getGb2();
					if(struct_daoju_204 != null && gb2!=null && gb2.length>0) {
						for(int[]item : gb2) {
							if(item[0] == itemid) {
								ChatManager.getIns().broadCast(ChatConst.BOX_BROAD_2,
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
							rTool = new int[] { p[1], p[2], p[3] };
							getGoal.add(p[0]);
							isBaodi = true;
							if (p[1] == GameConst.TOOL) {
								int itemid = p[2];
								Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
								int[][] gb2 = struct_daoju_204.getGb2();
								if(struct_daoju_204 != null && gb2!=null && gb2.length>0) {
									for(int[]item : gb2) {
										if(item[0] == itemid) {
											ChatManager.getIns().broadCast(ChatConst.BOX_BROAD_2,
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
									rTool = new int[] { p[1], p[2], p[3] };
									getGoal.add(p[0]);
									isBaodi = true;
									if (p[1] == GameConst.TOOL) {
										int itemid = p[2];
										Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(sysId);
										int[][] gb2 = struct_daoju_204.getGb2();
										if(struct_daoju_204 != null && gb2!=null && gb2.length>0) {
											for(int[]item : gb2) {
												if(item[0] == itemid) {
													ChatManager.getIns().broadCast(ChatConst.BOX_BROAD_2,
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
			if (rTool != null) {
				DestinyBagData destinyBagData = new DestinyBagData();
				destinyBagData.setDestinyId(rTool[1]);
				destinyBagData.setStar(1);
				destinyBagData.setLevel(0);
				// 成就树
				AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_28, 1, rTool[1]);
				int index = DestinyFunction.getIns().getnullDesFromBag(personalDestiny.getBagData());
				if (index != -1) {
					personalDestiny.getBagData().put(index, destinyBagData);
					addfuwenlist.add(new Object[] { index, destinyBagData.getDestinyId(), 1, 0 });
				} else {
					LogTool.warn("index!=-1:id:" + destinyBagData.getDestinyId() + " hid" + hero.getId(),
							DestinyManager.class);
				}
			}
			giftBaodi.setNum(nowNum);
			int resetLimit = GiftBaodiCache.getResetLimit(sysId);
			if (nowNum >= resetLimit) {
				giftBaodi.setNum(0);
				giftBaodi.getGetGoal().clear();
			}
		} catch (Exception e) {
			LogTool.error(e, this, "DestinyFunction giftBaodi sysId=" + sysId);
		}
		return isBaodi;
	}

	/**
	 * 符文大师红点发送
	 * @param hero
	 * @param isLogin 是否登录状态
	 */
	public void destinyMasterRedPoint(Hero hero, boolean isLogin) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
			return;
		}
		PersonalDestiny personalDestiny=hero.getPersonalDestiny();
		int destinyMasterId = personalDestiny.getDestinyMasterId();
		boolean isHasRedPoint=false;
		//取得指定品质符文总星级
		int redStar = DestinyFunction.getIns().getfuwenTotalStarByType(hero,GameConst.RED);
		int state=0;
		if(destinyMasterId==0) {
			List<Struct_bztfwtz_261> sortList = Config_bztfwtz_261.getIns().getSortList();
			Struct_bztfwtz_261 struct_bztfwtz_261 = sortList.get(0);
			int star = struct_bztfwtz_261.getLv();
			if(redStar>=star) {
				isHasRedPoint=true;
				state = DestinyConst.CAN_JIHUO;
			}else {
				isHasRedPoint=false;
				state = DestinyConst.NOT_JIHUO;
			}
		}else {
			Struct_bztfwtz_261 struct_bztfwtz_261 = Config_bztfwtz_261.getIns().get(destinyMasterId);
			int nextId = struct_bztfwtz_261.getNext();
			if(nextId==0) {
				isHasRedPoint=false;
				state = DestinyConst.FULL_LV;
			}else {
				Struct_bztfwtz_261 next_struct_bztfwtz_261 = Config_bztfwtz_261.getIns().get(nextId);
				int lv = next_struct_bztfwtz_261.getLv();
				if(redStar>=lv) {
					isHasRedPoint=true;
					state = DestinyConst.CAN_LV;
				}else {
					isHasRedPoint=false;
					state = DestinyConst.NOT_LV;
				}
			}
		}
		if (isHasRedPoint) {
			if (isLogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.DESTINY_SYSID, 2,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.DESTINY_SYSID, 2,
						RedPointConst.HAS_RED);
			}
		}
		DestinySender.sendCmd_4418(hero.getId(), destinyMasterId, state, redStar);
	}
	
	
	/**
	 * 天命随机礼包
	 * @param itemid
	 * @return
	 */
	/*public int getDestinyIDByBag(int itemid){
		try {
			Struct_libao_111 struct_libao_111=Config_libao_111.getIns().getMap().get(itemid);
			int[][] gailv = struct_libao_111.getLibaodaoju();
			ProbabilityEventModel event = ProbabilityEventFactory.getProbabilityEvent();
			for(int i=0; i<gailv.length; i++){
				int[] data = gailv[i];
				event.addProbabilityEvent(data[4], data[1]);
			}
			return (Integer)ProbabilityEventUtil.getEventByProbability(event);
		} catch (Exception e) {
			logger.error(LogFormat.exception(e, "getDestinyIDByBag has wrong"));
		}
		return 0;
	}*/
	
	/**
	 * 心法经验流水
	 * @param hero
	 * @param num
	 * @param id
	 * @param bind
	 * @param add
	 * @param reason
	 */
	/*public void flowRec(Hero hero, int num, int id, int bind, boolean add,
			int reason) {
		int addFlag = SourceGoodConst.FLOW_OPER_ADD;
		if(!add){
			addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
		}
		String pf = hero.getLoginPf();
		String pd = hero.getLoginPd();
		//属性流水
		FlowHeroEvent.addAttrFlow(hero.getId(), hero.getLevel(), GameConst.DESTINY_EXP, 
				hero.getPersonalDestiny().getSwallowExp(), num, reason, hero.getZoneid(), pf, pd, addFlag);
		
	}*/

}
