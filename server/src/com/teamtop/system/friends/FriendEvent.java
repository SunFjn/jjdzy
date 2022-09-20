package com.teamtop.system.friends;

import java.util.ArrayList;
import java.util.HashMap;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.friends.model.Friend;
import com.teamtop.system.friends.model.FriendApply;
import com.teamtop.system.friends.model.FriendModel;
import com.teamtop.system.hero.Hero;

public class FriendEvent extends AbsSystemEvent {
//	private static final Logger logger = LoggerFactory.getLogger(FriendEvent.class);
	private static FriendEvent friendEvent;
	public static FriendEvent getIns(){
		if(friendEvent == null) {
			friendEvent = new FriendEvent();
		}
		return friendEvent;
	}
	private FriendEvent(){}

	@Override
	public void init(Hero hero) {
		//初始化好友信息
		Friend friend = hero.getFriend();
		if(friend == null) {
			friend = new Friend();
			friend.setBadFriends(new HashMap<Long,FriendModel>());
			friend.setGoodFriends(new HashMap<Long,FriendModel>());
			friend.setFriendApply(new ArrayList<FriendApply>());
			friend.setRecentChat(new ArrayList<Long>());
			friend.setInOtherBadList(new ArrayList<Long>());
			hero.setFriend(friend);
		}
	}

	@Override
	public void login(Hero hero) {
//		init(hero);
//		FriendFunction friendFunction = FriendFunction.getIns();
		//发送好友信息
//		friendFunction.sendAllInfo(hero);
		//发送礼包信息
//		friendFunction.sendAllGift(hero);
		//上线提醒
//		friendFunction.remindFriendStateChange(hero, 1);
		//发送提醒和申请列表
//		friendFunction.sendPromptAndApply(hero);
		//红点提示
//		friendFunction.notice(hero);
	}

	@Override
	public void loginReset(Hero hero,int now) {
		zeroHero(hero,now);
	}
	
	@Override
	public void logout(Hero hero) {
		FriendFunction.getIns().remindFriendStateChange(hero, 2);
		//下线移除所有消息缓存
		FriendCache.getMsgModelMap().remove(hero.getId());
	}
	
	@Override
	public void zeroHero(Hero hero,int now) {
		Friend friend = hero.getFriend();
		if(friend == null) return;
		friend.setRecentChat(new ArrayList<Long>());
	}
	
	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		Friend friend = hero.getFriend();
		if(friend == null) {
			init(hero);
		}
		FriendFunction.getIns().levelUp(hero);
	}
	
	@Override
	public void fixTime(int cmdId, int now) {
//		updateCache();
	}
	
	/**
	 * 缓存入库，入库完移除
	 */
	public void updateCache(){
//		Map<Long, Hero> friendMap = FriendCache.getFriendHeroMap();
//		synchronized (friendMap) {
//			Iterator<Entry<Long, Hero>> it = friendMap.entrySet().iterator();
//			while(it.hasNext()){
//				Hero hero = it.next().getValue(); 
//				if(hero.getFriend() != null)
//					FriendDao.getIns().update(hero);
//				try {
//				} catch (Exception e) {
//					LogTool.error(e, this, LogTool.getmsg(hero.getId(),hero.getName(),"_updateCache updateWorkShop Exception!"));
//				}
//				it.remove();
//			}
//		}
	}

}
