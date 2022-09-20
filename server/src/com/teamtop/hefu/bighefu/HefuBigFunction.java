package com.teamtop.hefu.bighefu;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.hefu.HefuDao;
import com.teamtop.hefu.IHefuEvent;
import com.teamtop.hefu.MoveTb;
import com.teamtop.system.crossKing.CrossKingConst;
import com.teamtop.system.crossKing.CrossKingCrossDao;
import com.teamtop.system.crossKing.model.CrossKingRank;
import com.teamtop.system.crossSelectKing.CrossSelectKingDao;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKingNode;

public class HefuBigFunction {
	
	private static Logger logger = LoggerFactory.getLogger(HefuBigFunction.class);
	/**
	 * 处理单服(执行事件)
	 * @param zoneid
	 * @param zonenum
	 * @throws Exception 
	 */
	public static void handleOneServer(int zoneid,int zonenum) throws Exception{
		
		Map<String, IHefuEvent> events = HefubigCache.getEvents();
		Iterator<Entry<String, IHefuEvent>> it = events.entrySet().iterator();
		while(it.hasNext()){
			Entry<String, IHefuEvent> next = it.next();
			String desc = next.getKey();
			IHefuEvent event = next.getValue();
			event.beforeHefu(zoneid);
			logger.info("bighefu beforeHefu done,desc:"+desc+",event:"+event);
		}
	
	}
	
	public static void removeSpecial(List<Integer> hefuZoneids) throws Exception{
		int firstZoneid = hefuZoneids.get(0);
		for(int zoneid:hefuZoneids){
			HefuDao.getIns().del_crossSelectKing(zoneid);
			HefuDao.getIns().del_tigerPassEmployer(zoneid);
			if(zoneid!=firstZoneid){
				HefuDao.getIns().del_crossMine(zoneid);
				HefuDao.getIns().del_crosszhuluheroinfo(zoneid);
			}
		}
	}
	
	/**
	 * 处理所有区的合服
	 * @throws Exception 
	 */
	public static void handleAllServer(List<Integer> hefuZoneids) throws Exception{
		logger.info("-------------------------开始执行合服后事件-------------------------");
		Map<String, IHefuEvent> events = HefubigCache.getEvents();
		Iterator<Entry<String, IHefuEvent>> it = events.entrySet().iterator();
		while(it.hasNext()){
			Entry<String, IHefuEvent> next = it.next();
			String desc = next.getKey();
			IHefuEvent event = next.getValue();
			event.afterHefu(HefubigCache.hefuZoneList.get(0));
			logger.info("hefu afterHefu done,desc:"+desc+",event:"+event);
		}
		logger.info("-------------------------转移特殊数据-------------------------");
		moveSpecialData(hefuZoneids);
		logger.info("-------------------------清空数据-------------------------");
		truncateTb(hefuZoneids);//清空数据
		logger.info("-------------------------转移数据-------------------------");
		moveData(hefuZoneids);//转移数据
		logger.info("-------------------------发送邮件-------------------------");
		//MailCache.doSend();//正式发送邮件
	}
	
	/**
	 * 特殊表的转移 有重复的主键crosskingrank  crossselectkingnode
	 * @param hefuZoneids
	 * @throws Exception
	 */
	private static void moveSpecialData(List<Integer> hefuZoneids) throws Exception{
		int firstZoneid = hefuZoneids.get(0);
		HefuDao.getIns().del_crosskingrank(firstZoneid);
		//找出crosskingrank中 最大npc序号
		int maxNpcIndex=HefuDao.getIns().getMaxNpcId(firstZoneid);
		int i=0;
		int maxNodeIndex = HefuDao.getIns().getMaxNodeIndex(firstZoneid);
		int a=0;
		
		for(int zoneid:hefuZoneids){
			if(zoneid!=firstZoneid){
				//删除crosskingrank 中的脏数据
				HefuDao.getIns().del_crossMine(zoneid);
				//乱世枭雄参与者表 改机器人的主键 
				List<CrossKingRank> termRanks = CrossKingCrossDao.getIns().findTermRank();
				if(termRanks != null) {
					for(Iterator<CrossKingRank> iter = termRanks.iterator(); iter.hasNext(); ) {
						CrossKingRank rank=iter.next();
						if(rank.getType() == CrossKingConst.KINGTYPE_NPC) {
							rank.setRid(rank.getRid()+maxNpcIndex);
							i++;
						}
					}
					//批量插入
					CrossKingCrossDao.getIns().insertOnDuplicateBatch(termRanks, null,firstZoneid);
					maxNpcIndex=i+maxNpcIndex;
					i=0;
				}
				
				List<CrossSelectKingNode> nodes = CrossSelectKingDao.getIns().findCrossSelectKingNode();
				if (nodes!=null) {
					for(Iterator<CrossSelectKingNode> iter = nodes.iterator(); iter.hasNext(); ) {
						CrossSelectKingNode node=iter.next();
						node.setId(node.getId()+maxNodeIndex);
						a++;
					}
					//批量插入
					CrossSelectKingDao.getIns().updateNodeBatchByZoneid(nodes,firstZoneid);
					maxNodeIndex=a+maxNodeIndex;
					a=0;
				}
				
			}
		}
		
	}

	/**
	 * 移动数据
	 * @param hefuZoneids
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static void moveData(List<Integer> hefuZoneids) throws Exception{
		int firstZoneid = hefuZoneids.get(0);
		Map<String, List<MoveTb>> movetbList = HefubigCache.getMovetbList();
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
								HefuDao.getIns().moveData(tbname, firstZoneid, sbField.toString(), sbVal.toString());
								count = 0;
								sbVal.setLength(0);
							}else if(j<moveSize-1){
								sbVal.append(",");
							}
						}
						if(count>0 && sbVal.length()>0){
							HefuDao.getIns().moveData(tbname, firstZoneid, sbField.toString(), sbVal.toString());
						}
						//转移后删除
						//HefuDao.getIns().truncateData(tbname, zoneid);
					}
				}
			}
		}
		
	}
	/**
	 * 清空数据
	 * @param hefuZoneids
	 * @throws Exception
	 */
	public static void truncateTb(List<Integer> hefuZoneids) throws Exception{
		List<String> truncateList = HefubigCache.getTruncateList();
		for(int zoneid:hefuZoneids){
			for(String tbname:truncateList){
				HefuDao.getIns().truncateData(tbname, zoneid);
			}
		}
		int size = hefuZoneids.size();
		List<String> truncateOtherList = HefubigCache.getTruncateOtherList();
		for(int i=1;i<size;i++){
			int zoneid = hefuZoneids.get(i);
			for(String tbname:truncateOtherList){
				HefuDao.getIns().truncateData(tbname, zoneid);
			}
		}
		
	}

}
