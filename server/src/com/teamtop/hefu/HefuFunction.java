package com.teamtop.hefu;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.mail.MailCache;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 合服
 * @author Administrator
 *
 */
public class HefuFunction {
	private static Logger logger = LoggerFactory.getLogger(HefuFunction.class);
	/**
	 * 处理单服(执行事件、删玩家关联的表)
	 * @param zoneid
	 * @param zonenum
	 * @throws Exception 
	 */
	public static void handleOneServer(int zoneid,int zonenum) throws Exception{
		//查找要删除的玩家列表
		List<DelHero> delList = getDelHeros(zoneid, zonenum);
		
		Map<String, IHefuEvent> events = HefuCache.getEvents();
		Iterator<Entry<String, IHefuEvent>> it = events.entrySet().iterator();
		while(it.hasNext()){
			Entry<String, IHefuEvent> next = it.next();
			String desc = next.getKey();
			IHefuEvent event = next.getValue();
			event.beforeDelHeros(delList, zoneid);
			logger.info("hefu beforeDelHeros done,desc:"+desc+",event:"+event);
			event.beforeHefu(zoneid);
			logger.info("hefu beforeHefu done,desc:"+desc+",event:"+event);
		}
		//删除玩家关联的表
		HefuDao.getIns().delHero(zoneid, delList);
		logger.info("handleOneServer end.del hero.delNum:"+delList.size());
	}
	/**
	 * 处理所有区的合服
	 * @throws Exception 
	 */
	public static void handleAllServer(List<Integer> hefuZoneids) throws Exception{
		logger.info("-------------------------开始执行合服后事件-------------------------");
		Map<String, IHefuEvent> events = HefuCache.getEvents();
		Iterator<Entry<String, IHefuEvent>> it = events.entrySet().iterator();
		while(it.hasNext()){
			Entry<String, IHefuEvent> next = it.next();
			String desc = next.getKey();
			IHefuEvent event = next.getValue();
			event.afterHefu(HefuCache.hefuZoneList.get(0));
			logger.info("hefu afterHefu done,desc:"+desc+",event:"+event);
		}
		logger.info("-------------------------转移数据-------------------------");
		moveData(hefuZoneids);//转移数据
		logger.info("-------------------------清空数据-------------------------");
		truncateTb(hefuZoneids);//清空数据
		logger.info("-------------------------玩家重命名-------------------------");
		changeHeroName(hefuZoneids);//玩家重命名
		logger.info("-------------------------重置指定表某字段 设置为“”,0等-------------------------");
		resetByUpdate(hefuZoneids);//重置指定表某字段 设置为"",0等
		logger.info("-------------------------发送邮件任务-------------------------");
		MailCache.doSend();//正式发送邮件
	}
	/**
	 * 移动数据
	 * @param hefuZoneids
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static void moveData(List<Integer> hefuZoneids) throws Exception{
		int firstZoneid = hefuZoneids.get(0);
		Map<String, List<MoveTb>> movetbList = HefuCache.getMovetbList();
		for(int zoneid:hefuZoneids){
			if(zoneid!=firstZoneid){
				Iterator<Entry<String, List<MoveTb>>> it = movetbList.entrySet().iterator();
				while(it.hasNext()){
					Entry<String, List<MoveTb>> next = it.next();
					//insert into gang(id,leader...) values(1,2...),(3,4...)
					StringBuilder sbField = new StringBuilder();
					StringBuilder sbVal = new StringBuilder();
					
					String tbname = next.getKey();
					List<MoveTb> fields = next.getValue();
					List<Object> moveData = HefuDao.getIns().getMoveData(tbname, zoneid);
					if(moveData!=null){
						int size = fields.size();
						for(int i=0;i<size;i++){
							MoveTb tb = fields.get(i);
							sbField.append(tb.getField());
							if(i<size-1){
								sbField.append(",");
							}
						}
						int count = 0;
						int moveSize = moveData.size();
						for(int j=0;j<moveSize;j++){
							Object obj = moveData.get(j);
							count ++;
							Map<String, Object> map = (Map<String, Object>) obj;
							sbVal.append("(");
							for(int i=0;i<size;i++){
								MoveTb tb = fields.get(i);
								if("varchar".equals(tb.getType()) || "text".equals(tb.getType())){
									sbVal.append("'").append(map.get(tb.getField())).append("'");
								}else{
									sbVal.append(map.get(tb.getField()));
								}
								if(i<size-1){
									sbVal.append(",");
								}
							}
							sbVal.append(")");
							if(count>=HefuDao.hefuBatchNum){
								//insert
								HefuDao.getIns().moveData(tbname, zoneid, sbField.toString(), sbVal.toString());
								count = 0;
								sbVal.setLength(0);
							}
							if(j<moveSize-1){
								sbVal.append(",");
							}
						}
						if(count>0 && sbVal.length()>0){
							HefuDao.getIns().moveData(tbname, firstZoneid, sbField.toString(), sbVal.toString());
						}
						//转移后删除
						HefuDao.getIns().truncateData(tbname, zoneid);
					}
				}
			}
		}
		
	}
	
	/**
	 * 重置指定表某字段 设置为"",0等
	 * @param hefuZoneids
	 * @throws Exception
	 */
	public static void resetByUpdate(List<Integer> hefuZoneids) throws Exception{
		for(int zoneid:hefuZoneids){
			HefuDao.getIns().resetByUpdate(zoneid);
		}
	}

	/**
	 * 清空数据
	 * @param hefuZoneids
	 * @throws Exception
	 */
	public static void truncateTb(List<Integer> hefuZoneids) throws Exception{
		List<String> truncateList = HefuCache.getTruncateList();
		for(int zoneid:hefuZoneids){
			for(String tbname:truncateList){
				HefuDao.getIns().truncateData(tbname, zoneid);
			}
		}
		int size = hefuZoneids.size();
		List<String> truncateOtherList = HefuCache.getTruncateOtherList();
		for(int i=1;i<size;i++){
			int zoneid = hefuZoneids.get(i);
			for(String tbname:truncateOtherList){
				HefuDao.getIns().truncateData(tbname, zoneid);
			}
		}
	}
	
	/**
	 * 获取要删除的玩家列表
	 * @param	zonenum	合服区数量
	 */
	public static List<DelHero> getDelHeros(int zoneid,int zonenum){
		int level = 0;
		int time = 0;
		int rmb = 0;
		List<DelHero> delHeros = new ArrayList<DelHero>(500);
//		if(zonenum>=1 && zonenum<=4){
//			time = TimeDateUtil.getNextFewDayTime(-10);//连续≥10天未登录
//			level = 50;//等级＜50级
//			yuanbao = 0;//未充值
//			List<DelHero> delHero1 = HefuDao.getIns().getDelHero(zoneid, level, yuanbao, time);
//			if(delHero1!=null){
//				delHeros.addAll(delHero1);
//			}
////			time = TimeDateUtil.getNextFewDayTime(-45);
////			level = 50;
////			yuanbao = 10;
////			List<DelHero> delHero2 = HefuDao.getIns().getDelHero(zoneid, level, yuanbao, time);
////			if(delHero2!=null){
////				delHeros.addAll(delHero2);
////			}
//		}else if(zonenum>=5 && zonenum<=8){
//			time = TimeDateUtil.getNextFewDayTime(-30);
//			level = 50;
//			yuanbao = 100;
//			List<DelHero> delHero = HefuDao.getIns().getDelHero(zoneid, level, yuanbao, time);
//			if(delHero!=null){
//				delHeros.addAll(delHero);
//			}
//		}else if(zonenum>=9 && zonenum<=16){
//			time = TimeDateUtil.getNextFewDayTime(-60);
//			level = 60;
//			yuanbao = 100;
//			List<DelHero> delHero = HefuDao.getIns().getDelHero(zoneid, level, yuanbao, time);
//			if(delHero!=null){
//				delHeros.addAll(delHero);
//			}
//		}else if(zonenum>=17){
//			time = TimeDateUtil.getNextFewDayTime(-20);
//			level = 70;
//			yuanbao = 100;
//			List<DelHero> delHero1 = HefuDao.getIns().getDelHero(zoneid, level, yuanbao, time);
//			if(delHero1!=null){
//				delHeros.addAll(delHero1);
//			}
//			time = TimeDateUtil.getNextFewDayTime(-90);
//			level = 80;
//			yuanbao = 500;
//			List<DelHero> delHero2 = HefuDao.getIns().getDelHero(zoneid, level, yuanbao, time);
//			if(delHero2!=null){
//				delHeros.addAll(delHero2);
//			}
		//未充值过且离线天数≥30天
		time = TimeDateUtil.getNextFewDayTime(-7);//连续≥30天未登录
		level = 200;//无论等级多少级，小于10000级
		rmb = 0;//未充值
		List<DelHero> delHero3 = HefuDao.getIns().getDelHero(zoneid, level, rmb, time);
		if(delHero3!=null){
			delHeros.addAll(delHero3);
		}
//		}
		return delHeros;
	}
	/**
	 * 玩家改名
	 * @param hefuZoneids
	 */
	public static void changeHeroName(List<Integer> hefuZoneids){
		List<HefuHeroName> allHeroName = new ArrayList<HefuHeroName>(10000);
		for(Integer zoneid:hefuZoneids){
			List<HefuHeroName> list = HefuDao.getIns().getAllHeroName(zoneid);
			if(list!=null){
				for(HefuHeroName hn:list){
					String name = hn.getName();
					if (name==null) {
//						logger.info(hn.getHid()+" HefuHeroName "+name);
						continue;
					}
					String[] namearr = name.split("\\.S");
					if(namearr.length>=2){
						name = namearr[0];
					}
					hn.setName(name);
				}
				allHeroName.addAll(list);
			}
		}
		int size = allHeroName.size();
		List<HefuHeroName> changeNameList = new ArrayList<HefuHeroName>();
		for(int i=0;i<size;i++){
			HefuHeroName hn = allHeroName.get(i);
			String name = hn.getName();
			if (name==null) {
//				logger.info(hn.getHid()+" HefuHeroName1 "+name);
				continue;
			}
			for(int j=i+1;j<size;j++){
				HefuHeroName hnj = allHeroName.get(j);
				if (hnj.getName()==null||name==null) {
//					logger.info(hnj.getHid()+" HefuHeroName2 "+name+" namej:"+hnj.getName());
					continue;
				}
				if(hnj.getName().equals(name)){
					int zj = CommonUtil.getZoneIdById(hnj.getHid());
					hnj.setName(name+".R"+zj);
					try {
						boolean isExist = HeroDao.getIns().existName(hnj.getName(), zj);
						if (isExist) {
							//重命名了 随机2个字母
							Random random = new Random();
							String val = "";
							int choice = random.nextInt(2) % 2 == 0 ? 65 : 97;
						    val = val+(char) (choice + random.nextInt(26))+(char) (choice + random.nextInt(26));
							hnj.setName(name+"."+val+zj);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					int z = CommonUtil.getZoneIdById(hn.getHid());
					hn.setName(name+".R"+z);
					try {
						boolean isExist = HeroDao.getIns().existName(hn.getName(), z);
						if (isExist) {
							//重命名了 随机2个字母
							Random random = new Random();
							String val = "";
							int choice = random.nextInt(2) % 2 == 0 ? 65 : 97;
						    val = val+(char) (choice + random.nextInt(26))+(char) (choice + random.nextInt(26));
						    hn.setName(name+"."+val+z);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					changeNameList.add(hnj);
					changeNameList.add(hn);
					logger.info("ChangeName.idj:"+hnj.getHid()+" namej:"+hnj.getName()+" id:"+hn.getHid()+" name:"+hn.getName());
					break;
				}
			}
		}
		int[][] changeNameKa = {{GameConst.TOOL,MailConst.MAIL_HEFU_HERO_NAME_TOOLID,1}};
		for(HefuHeroName hn:changeNameList){
			MailFunction.getIns().sendMailWithFujianData2(hn.getHid(), MailConst.MAIL_HEFU_HERO_NAME, new Object[]{MailConst.MAIL_HEFU_HERO_NAME, MailConst.MAIL_HEFU_HERO_NAME_TOOLID}, changeNameKa);
			HefuDao.getIns().updateHeroName(hn);
		}
	}
	/**
	 * 合服时间更新
	 */
	public static void updateHeFuTimeCache(int time){
		try {
			HefuCache.hefuTime=time;
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HE_FU_TIME);
			if(globalData!=null){
				globalData.setContent(Integer.toString(time));
			}
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			logger.error(LogTool.exception(e,"updateHeFuTimeCache"));
		}
	}
	
	
	public static void main(String[] args) {
		String name = "abc.R1";
		String[] namearr = name.split("\\.S");
		if(namearr.length==2){
			name = namearr[0];
		}
		System.err.println(name);
	}
}
