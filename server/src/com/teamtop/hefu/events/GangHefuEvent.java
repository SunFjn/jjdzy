package com.teamtop.hefu.events;

import java.util.List;

import com.teamtop.hefu.DelHero;
import com.teamtop.hefu.IHefuEvent;
/**
 * 军团关系<br/>
	非团长被删，则删除该成员在帮会的信息和职位；
++如果是删除长老/堂主/护法/精英，则根据军团贡献自动让后面职位的玩家补上该职位。如果是删除副团长，则职位留空<br/>
	团长被删：<br/>
	1、自动转移团长给该军团转生等级最高（如果转生等级相同，则以等级判断）的成员，并更新军团职位信息；<br/>
	2、若该军团无其他成员，则删除该军团<br/>
	删除军团申请信息；<br/>
 *
 */
public class GangHefuEvent implements IHefuEvent {

	@Override
	public void beforeDelHeros(List<DelHero> delList, int zoneid) throws Exception {
//		List<Gang> gangs = GangDao.getIns().findAllGang(zoneid);
//		if(gangs==null) return;
//		Map<Long, Gang> gangmap = new HashMap<Long, Gang>();
//		for(Gang gang:gangs){
//			gangmap.put(gang.getId(), gang);
//		}
//		for(DelHero delhero:delList){
//			long gangId = delhero.getGangId();
//			if(gangId>0){
//				Gang gang = gangmap.get(gangId);
//				if(gang!=null){
////					if(gang.getType() == GangType.HERO_GANG.ordinal()){
//						long hid = delhero.getHid();
//						GangMember gangMember = GangMemberDao.getIns().find(hid);
//						if(gangMember!=null){
//							int position = gangMember.getPosition();
//							if(position==GangConst.POSITION_LEADER){
//								//帮主
//								List<GangMember> members = GangMemberDao.getIns().findGangMemberFromGangId(gangId);
//								if(members.size()>1){
//									if(members!=null){
//										//找出帮会转生、等级最高的玩家
//										long newId = HefuDao.getIns().getGangTopHero(hid, gangId, zoneid);
//										GangMember newLeader = null;
//										for(GangMember gm:members){
//											if(gm.getHid()==newId){
//												newLeader = gm;
//											}
//										}
//										if(newLeader!=null){
//											//新帮主
//											gang.setLeader(newLeader.getHid());
//											newLeader.setPosition(GangConst.POSITION_LEADER);
//											GangDao.getIns().update(gang);
//											GangMemberDao.getIns().update(newLeader);
//										}
//									}
//								}else{
//									//删除帮会
//									GangDao.getIns().delete(gang);
//								}
//							}
//							GangMemberDao.getIns().delete(gangMember);
//						}
////					}
//				}
//			}
//		}
	}

	@Override
	public void beforeHefu(int zoneid) throws Exception {

	}

	@Override
	public void afterHefu(int firstZoneid) throws Exception {

	}

	@Override
	public void heCrossZu(int zoneid) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
