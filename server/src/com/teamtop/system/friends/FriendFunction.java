package com.teamtop.system.friends;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.friends.model.Friend;
import com.teamtop.system.friends.model.FriendApply;
import com.teamtop.system.friends.model.FriendModel;
import com.teamtop.system.friends.model.MsgChaModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

public class FriendFunction {
	private static FriendFunction friendFunction;

	public static FriendFunction getIns() {
		if(friendFunction == null) {
			friendFunction = new FriendFunction();
		}
		return friendFunction;
	}

	
	public void notice(Hero hero){
		try {
			MsgChaModel msgChaModel = FriendCache.getMsgModelMap().get(hero.getId());
			if(msgChaModel!=null&&msgChaModel.getMsgMap()!=null&&!msgChaModel.getMsgMap().isEmpty()){
				FriendSender.sendCmd_400(hero.getId(), 1);
			}
		} catch (Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hero.getId(), hero.getName(), "genRetInfo error."));
		}
	}
	
	/**
	 * 返回好友信息列表
	 * @param friends 列表
	 * @param len 长度
	 * @param retData 要返回的列表数据
	 * @param type 类型  1 好友， 2 黑名单 3 跨服好友 4 跨服黑名单
	 */
	public void genRetInfo(Hero hero,long marryHid,Map<Long, FriendModel> friends, List<Object[]> retData, int type) {
		try {
			Iterator<Long> iter = friends.keySet().iterator();
			HeroFunction heroFunction = HeroFunction.getIns();
			MsgChaModel msgChaModel = FriendCache.getMsgModelMap().get(hero.getId());
			while(iter.hasNext()) {
				long id = iter.next();
				FriendModel model = friends.get(id); 
				Hero friendHero;
				boolean isOnline = heroFunction.isOnline(id);
				int onlineState = isOnline?1:0;
				if(isOnline) {
					friendHero = HeroCache.getHero(id);
				}else {
					friendHero = HeroCache.getHero(id, HeroConst.FIND_TYPE_FRIEND);
				}
				if(friendHero == null) {
					//不存在角色时删除
					iter.remove();
					continue;
				}
				byte haveMsg = 0;
				//好友才会判断
				if(type==1&&msgChaModel!=null&&msgChaModel.getMsgMap().containsKey(id)){
					haveMsg = 1;
				}
				model.setName(friendHero.getName());
				model.setOnlineState(onlineState);
				Object[] obj = new Object[]{id, friendHero.getName(), friendHero.getLevel(), FriendFunction.getIns().getZsLevel(friendHero),friendHero.getJob(), friendHero.getSex(),friendHero.getTotalStrength(), onlineState, friendHero.getLogoutTime(),haveMsg};
				retData.add(obj);
			}
		} catch (Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hero.getId(), hero.getName(), "genRetInfo error."));
		}
	}
	
	/**
	 * 是否是在黑名单中
	 * @param hid 要比较的hid
	 * @param friend 好友对象
	 * @return true 在黑名单中， false 不在黑名单中
	 */
	public boolean isBadFriend(long hid, Friend friend) {
		Map<Long,FriendModel> badFriends = friend.getBadFriends();
		if(badFriends==null){
			return false;
		}
		FriendModel model = badFriends.get(hid);
		return model != null;
	}

	/**
	 * 判断一个角色是否在自己黑名单中
	 * @param hero 本角色对象
	 * @param otherHero 其他玩家角色对象
	 * @return
	 */
	public boolean isBadFriend(Hero hero, Hero otherHero) {
		return isBadFriend(otherHero.getId(),hero.getFriend());
	}
	
	/**
	 * 判断hid是否是hero的黑名单
	 * @param hid
	 * @param hero
	 * @return
	 */
	public boolean isBadFriend(long hid, Hero hero) {
		return isBadFriend(hid,hero.getFriend());
	}
	
	/**
	 * 判断一个角色是否是好友
	 * @param hid 要比较的hid
	 * @param friend 好友对象
	 * @return true 在好友列表中， false 不在好友列表中
	 */
	public boolean isGoodFriend(long hid, Friend friend) {
		Map<Long,FriendModel> goodFriends = friend.getGoodFriends();
		if(goodFriends==null){
			return false;
		}
		FriendModel model = goodFriends.get(hid);
		return model != null;
	}
	
	/**
	 * 判断一个角色是否是好友
	 * @param otherHero 要比较的角色
	 * @param friend 好友对象
	 * @return
	 */
	public boolean isGoodFriend(Hero otherHero, Friend friend) {
		return isGoodFriend(otherHero.getId(), friend);
	}
	
	/**
	 * 判断一个角色是否是好友
	 * @param hero 本角色对象
	 * @param otherHero 其他玩家角色对象
	 * @return
	 */
	public boolean isGoodFriend(Hero hero, Hero otherHero) {
		Friend friend = hero.getFriend();
		return isGoodFriend(otherHero.getId(),friend);
	}
	
	/**
	 * 判断hid是否是hero的好友
	 * @param hid
	 * @param hero
	 * @return
	 */
	public boolean isGoodFriend(long hid, Hero hero) {
		return isGoodFriend(hid,hero.getFriend());
	}
	
	/**
	 * 判断好友列表是否满了
	 * @param hero
	 * @param type 类型 1 好友， 2 黑名单， 3 跨服好友， 4 跨服黑名单 ...
	 * @return true 满了， false 未满
	 */
	public boolean isFull(Hero hero, int type) {
		try{
			Friend friend = hero.getFriend();
			if(friend == null) return true;
			boolean ret = true;
			switch(type) {
			case FriendConst.TYPE_GOOD_FRIEND:
				Map<Long,FriendModel> goodFriends = friend.getGoodFriends();
				ret = goodFriends.size() >= FriendConst.MAX_FRIEND;
				break;
			case FriendConst.TYPE_BAD_FRIEND:
				Map<Long,FriendModel> badFriends = friend.getBadFriends();
				ret = badFriends.size() >= FriendConst.MAX_FRIEND;
				break;
//			case FriendConst.TYPE_CHAT_BY_DAY:
//				List<Long> recentChat = hero.getFriend().getRecentChat();
//				int len = recentChat.size();
//				ret = len >= friendStructByLevel.getChat_num();
//				break;
			}
			return ret;
		}catch(Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hero.getId(), hero.getName(), "isFull error"));
		}
		return true;
		
	}

	/**
	 * 从好友列表或黑名单中获取好友对象
	 * @param hero
	 * @return
	 */
	public FriendModel getModelFromBadOrBackup(Hero hero, long hid) {
		try {
			//黑名单
			Friend friend = hero.getFriend();
			Map<Long,FriendModel> badFriends = friend.getBadFriends();
			FriendModel model = badFriends.get(hid);
			return model;

		} catch (Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hero.getId(), hero.getName(), "getModelFromBadOrBackup error"));
		}
		return null;
	}

	/**
	 * 生成一个新的好友model
	 * @param oHid
	 * @return
	 */
	public FriendModel setFriendModel(long oHid, String name, int online) {
		FriendModel model = new FriendModel();
//		model.setBlessValue(0);
		model.setHid(oHid);
		//model.setIntimacy(0);
		model.setName(name == null?"" :name);
		model.setOnlineState(online);
//		model.setRelationship(0);
		return model;
	}
	/**
	 * 从好友列表获取好友对象
	 * @param hero 角色对象
	 * @param oHid 要匹配的好友id
	 * @return
	 */
	public FriendModel getModelFromFriend(Hero hero, long oHid) {
		Map<Long,FriendModel> goodFriends = hero.getFriend().getGoodFriends();
		return goodFriends.get(oHid);
	}

	/**
	 * 将角色从好友的某个列表里面删除
	 * @param friend 自己的好友对象
	 * @param oHid 需处理的角色id
	 * @param type 类型 1 好友 2 黑名单
	 */
	public void removeFromPlace(Friend friend, long oHid, int type) {
		try {
			Map<Long,FriendModel> modelList;
			if(type == FriendConst.TYPE_GOOD_FRIEND) {
				modelList = friend.getGoodFriends();
				
			}else {
				modelList = friend.getBadFriends();
			}
			//不管好友还是黑名单都把请求信息移除
			List<FriendApply> applys = friend.getFriendApply();
			if(applys!=null&&!applys.isEmpty()){
				FriendApply apply = new FriendApply();
				apply.setHid(oHid);
				//移除请求信息
				if(applys.contains(apply)) {
					applys.remove(apply);
				}
			}
			modelList.remove(oHid);
		} catch (Exception e) {
			LogTool.error(e, this, "getModelFromBadOrBackup error");
		}
	}

	/**
	 * 判断是否在最近聊天里面
	 * @param hero
	 * @param friendId
	 * @return
	 */
	public boolean isInRecentChats(Hero hero, long friendId) {
		try {
			List<Long> recentChat = hero.getFriend().getRecentChat();
			int len = recentChat.size();
			for(int i = 0; i < len; i ++) {
				long id = recentChat.get(i);
				if(id == friendId) {
					return true;
				}
			}
			return false;
		} catch (Exception e) {
			LogTool.error(e, this, "isInrecentChats error");
		}
		return false;
	}

	/**
	 * 相互是否是最近联系人
	 * @param hero 角色
	 * @param oHero 交互的角色
	 * @return true 是 false 否
	 */
	public boolean isRecentEachOther(Hero hero, Hero oHero) {
		try {
			long oid = oHero.getId();
			if(isInRecentChats(hero, oid)) {
				return true;
			}
			if(isInRecentChats(oHero, hero.getId())) {
				return true;
			}
//			if(!canChat(hero, oid)) {
//				return false;
//			}
			hero.getFriend().getRecentChat().add(oid);
			return true;
		} catch (Exception e) {
			LogTool.error(e, this,"isRecentEachOther error");
		}
		return false;
	}

	/**
	 * 状态改变提醒在线的好友如:下线提醒朋友们青山不改绿水长流，上线提醒各位我胡汉三又回来了...
	 * @param hero 角色
	 * @param type 类型 详情查看协议
	 * @param state 状态
	 */
	public void remindFriendStateChange(Hero hero, int type) {
		try {
			Friend friend = hero.getFriend();
			if(friend == null) return;
			Map<Long, FriendModel> goodFriends = friend.getGoodFriends();
			long hid = hero.getId();
			Iterator<Long> ids = goodFriends.keySet().iterator();
			//通知好友
			while(ids.hasNext()) {
				long id = ids.next();
				if(HeroFunction.getIns().isOnline(id)) {
					FriendSender.sendCmd_424(id, hid, hero.getName(), type);
				}
			}
			List<Long> inOtherBadList = friend.getInOtherBadList();
			if(inOtherBadList == null) {
				inOtherBadList = new ArrayList<Long>();
				friend.setInOtherBadList(inOtherBadList);
				return;
			}
			int len = inOtherBadList.size();
			for(int i = 0; i < len; i ++) {
				long id = inOtherBadList.get(i);
				if(HeroFunction.getIns().isOnline(id)) {
					FriendSender.sendCmd_424(id, hid, hero.getName(), type);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this,"remindFriendStateChange error");
		}
	}

	/**
	 * 升级事件，升级后要通知所有的好友改变状态并发送礼包
	 * @param hero
	 */
	public void levelUp(Hero hero){
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_FRIEND))
				return;
			Friend friend = hero.getFriend();
			Map<Long, FriendModel> goodFriends = friend.getGoodFriends();
			long hid = hero.getId();
			Iterator<Long> ids = goodFriends.keySet().iterator();
			Map<String, Integer> dataMap = new HashMap<String,Integer>();
			int level = hero.getLevel();
			dataMap.put(FriendXData.level, level);
			while(ids.hasNext()) {
				long id = ids.next();
				//GC角色信息改变 L:好友idU:好友名称S:等级U:帮会名称B:状态 1 上线 0 下线B:性别B:类别 1 好友 2 跨服好友B:关系改变 0 好友 1 夫妻
				boolean isOnline = HeroFunction.getIns().isOnline(id);
				if(isOnline) {
					NettyWrite.writeXData(id, FriendCmd.GC_InfoChange_426, new Object[]{hid, dataMap});
				}
			}
			//发送给添加了自己为黑名单的人
			List<Long> inOtherBadList = friend.getInOtherBadList();
			if(inOtherBadList == null) {
				inOtherBadList = new ArrayList<Long>();
				friend.setInOtherBadList(inOtherBadList);
				return;
			}
			int len = inOtherBadList.size();
			for(int i = 0; i < len; i ++) {
				long id = inOtherBadList.get(i);
				if(HeroFunction.getIns().isOnline(id)) {
					NettyWrite.writeXData(id, FriendCmd.GC_InfoChange_426, new Object[]{hid, dataMap});
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this,"levelUp error");
		}
	}
	
	/**
	 * 发送好友申请和提醒
	 * @param hero
	 */
	public void sendPromptAndApply(Hero hero) {
		try {
//			if(!HeroFunction.getIns().checkSystemOpenLevel(hero, SystemIdConst.FUN_FRIEND)) return;
			Friend friend = hero.getFriend();
			if(friend == null) return;
			long hid = hero.getId();
			List<FriendApply> friendApply = friend.getFriendApply();
			if(friendApply != null && !friendApply.isEmpty()) {
				Hero oHero;
				List<Object[]> reqList = new ArrayList<Object[]>();
				Iterator<FriendApply> it = friendApply.iterator();
				while(it.hasNext()){
					FriendApply apply = it.next();
					long oHid = apply.getHid();
					if(HeroFunction.getIns().isOnline(oHid)) {
						oHero = HeroCache.getHero(oHid);
					}else {
						oHero = HeroCache.getHero(oHid, HeroConst.FIND_TYPE_FRIEND);
					}
					if(oHero==null){
						it.remove();
						continue;
					}
					Object[] object = new Object[8];
					object[0]=apply.getHid();
					object[1]=oHero.getName();
					object[2]=oHero.getLevel();
					object[3]=FriendFunction.getIns().getZsLevel(oHero);
					object[4]=oHero.getJob();
					object[5]=oHero.getSex();
					object[6]=oHero.getTotalStrength();
					object[7]=oHero.getVipLv();
					reqList.add(object);
				}
				FriendSender.sendCmd_406(hid, 0, reqList.toArray());
			}
		} catch (Exception e) {
			LogTool.error(e, this,"sendPromptAndApply error");
		}
	}
	/**
	public Object[] getFriendInfo(Hero hero){
		Object[] object = new Object[5];
		object[0]=hero.getId();
		object[1]=hero.getName();
		object[2]=hero.getJob();
		object[3]=hero.getLevel();
		object[4]=hero.getVipLv();
		return object;
	}
	*/
	/**
	 * 获得转生级别
	 * @return
	 */
	public int getZsLevel(Hero hero){
		return hero.getRebornlv();
	}
	
	/**
	 * 玩家改名
	 * @param hero
	 */
	public void changeName(Hero hero){
		Friend friend = hero.getFriend();
//		U:id好友ID key属性值(level：等级，name：名称，job:职业，online：上下线，sex：性别) value为属性值
		StringBuffer sb = new StringBuffer();
		sb.append(GameConst.s);
		sb.append(GameConst.y).append("id").append(GameConst.y).append(GameConst.m);
		sb.append(hero.getId());
		sb.append(GameConst.d);
//		sb.append(GameConst.y).append("level").append(GameConst.y).append(GameConst.m);
//		sb.append(hero.getLevel());
//		sb.append(GameConst.d);
		sb.append(GameConst.y).append("name").append(GameConst.y).append(GameConst.m);
		sb.append(GameConst.y).append(hero.getName()).append(GameConst.y);
//		sb.append(GameConst.d);
//		sb.append(GameConst.y).append("job").append(GameConst.y).append(GameConst.m);
//		sb.append(hero.getJob());
//		sb.append(GameConst.d);
//		sb.append(GameConst.y).append("online").append(GameConst.y).append(GameConst.m);
//		sb.append(1);
//		sb.append(GameConst.d);
//		sb.append(GameConst.y).append("sex").append(GameConst.y).append(GameConst.m);
//		sb.append(hero.getSex());
//		sb.append(GameConst.d);
		sb.append(GameConst.e);
		String friendData = sb.toString();
		Map<Long, FriendModel> goodFriends = friend.getGoodFriends();
		if(goodFriends!=null){
			long friendId;
			for(Long id:goodFriends.keySet()){
				if(id==null){
					continue;
				}
				friendId = id;
				//在线的话
				if(HeroFunction.getIns().isOnline(friendId)){
					FriendSender.sendCmd_426(friendId, friendData);
				}
			}
		}
		List<Long> inOtherBadList = friend.getInOtherBadList();
		if(inOtherBadList!=null&&!inOtherBadList.isEmpty()){
			for(Long id:inOtherBadList){
				if(id==null){
					continue;
				}
				//在线的话
				if(HeroFunction.getIns().isOnline(id)){
					FriendSender.sendCmd_426(id, friendData);
				}
			}
		}
	}
}
