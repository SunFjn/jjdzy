package com.teamtop.system.friends;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.system.friends.model.Friend;
import com.teamtop.system.friends.model.FriendApply;
import com.teamtop.system.friends.model.FriendModel;
import com.teamtop.system.friends.model.MsgChaModel;
import com.teamtop.system.friends.model.MsgModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class FriendManager {
	
	private static FriendManager friendManager;

	public static FriendManager getIns() {
		if (friendManager == null)
			friendManager = new FriendManager();
		return friendManager;
	}
	
	private FriendManager(){}
	
	/**
	 * 发送所有好友信息
	 * @param hero
	 */
	public void getInfo(Hero hero, int type) {
		if (!checkFriends(hero)) {
			LogTool.warn("check hero not pass. getInfo will exit.", this);
			return;
		}
		long hid = hero.getId();
		String name = hero.getName();
		try{
			Friend friend = hero.getFriend();
			Map<Long,FriendModel> friends = null;
			if(type==1){
				friends = friend.getGoodFriends();
			}else if(type==2){
				friends = friend.getBadFriends();
			}
			List<Object[]> retData = new ArrayList<Object[]>();
			//好友
			FriendFunction.getIns().genRetInfo(hero,hero.getMarryHid(),friends, retData, type);
			Object[] friendInfo = new Object[retData.size()];
			retData.toArray(friendInfo);
			//发送1700
			FriendSender.sendCmd_402(hid, type, friendInfo);
		}catch(Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hid, name, "sendAllInfo ocurs an error."));
		}
	}

	/** 
	 * 申请添加好友
	 * 
	 * @param hero
	 * @param name
	 */
	public void addFriend(Hero hero, String otherName) {
		if (!checkFriends(hero)) {
			LogTool.warn("check hero not pass. addFriends will exit.", this);
			return;
		}
		long hid = hero.getId();
		String name = hero.getName();
		try {
			if(StringUtils.isBlank(otherName)) {
				FriendSender.sendCmd_404(hid, 2);
				return;
			}
			//非法openId
			if(!IlliegalUtil.isNameIll(otherName, Integer.MAX_VALUE)){
				FriendSender.sendCmd_404(hid, 2);
				return;
			}
			//简单防注入验证
			String CHECKSQL = ".*([';]+|(--)+).*";
			if(Pattern.matches(CHECKSQL,otherName)){
				FriendSender.sendCmd_404(hid, 2);
				return;
			}
			Hero oHero = HeroDao.getIns().findHidByName(otherName);
			if (oHero == null) {
				FriendSender.sendCmd_404(hid, 3);
				return;
			}
			long oHid = oHero.getId();
			if(hid==oHid){
				FriendSender.sendCmd_404(hid, 4);
				return;
			}
			Friend friend = hero.getFriend();
			// 判断是否是好友了
			if (FriendFunction.getIns().isGoodFriend(oHid, friend)) {
				FriendSender.sendCmd_404(hid, 5);
				return;
			}
			// 判断好友列表是否满了
			if (FriendFunction.getIns().isFull(hero, FriendConst.TYPE_GOOD_FRIEND)) {
				FriendSender.sendCmd_404(hid, 6);
				return;
			}
			boolean isOnline = HeroFunction.getIns().isOnline(oHid);
			// 判断对方
			Hero otherHero;
			if (isOnline) {
				otherHero = HeroCache.getHero(oHid);
				if(!checkFriends(otherHero)) {
					FriendSender.sendCmd_404(hid, 7);
					return;
				}
			} else {
				otherHero = HeroCache.getHero(oHid, HeroConst.FIND_TYPE_FRIEND);
				if(!checkFriends(otherHero)) {
					FriendSender.sendCmd_404(hid, 7);
					return;
				}
			}
			Friend otherFriend = otherHero.getFriend();
			// 判断是否在对方黑名单中
			if (FriendFunction.getIns().isBadFriend(hid, otherFriend)) {
				FriendSender.sendCmd_404(hid, 8);
				return;
			}
			// 判断是否在自己黑名单中
			if (FriendFunction.getIns().isBadFriend(oHid, friend)) {
				FriendSender.sendCmd_404(hid, 9);
				return;
			}
			// 判断对方好友列表是否已满
			if (FriendFunction.getIns().isFull(otherHero, FriendConst.TYPE_GOOD_FRIEND)) {
				FriendSender.sendCmd_404(hid, 10);
				return;
			}
			// 添加到对方的申请列表
			List<FriendApply> applyList = otherFriend.getFriendApply();
			FriendApply applay = new FriendApply(hid, name);
			//已经在申请列表里
			if (applyList.contains(applay)) {
				FriendSender.sendCmd_404(hid, 11);
				return;
			}
			if(applyList.size() >= FriendConst.MAX_FRIENDAPPLY) {
				FriendSender.sendCmd_404(hid, 12);
				return;
			}
			applyList.add(applay);
			FriendSender.sendCmd_404(hid, 1);
			//在线通知对方
			if(isOnline){
				FriendSender.sendCmd_406(oHid, 1, new Object[]{new Object[]{hid, name,hero.getLevel(),FriendFunction.getIns().getZsLevel(hero),hero.getJob(),hero.getSex(),hero.getTotalStrength(),hero.getVipLv()}});
			}else{
				//不在线需要同步到数据库
				FriendDao.getIns().update(otherFriend);
			}
		} catch (Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hid, name, "addFriend ocurs an error."));
		}
	}
	
	
	/**
	 * 检查好友
	 * 
	 * @return
	 */
	private boolean checkFriends(Hero hero) {
		if (hero == null)
			return false;
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_FRIEND))
			return false;
		return true;
	}

	/**
	 * 处理一个好友请求
	 * @param hero
	 * @param oHid
	 * @param flag 0 接受 1 拒绝
	 */
	public void agreeAddFriend(Hero hero, int flag, long oHid) {
		if(!checkFriends(hero)) {
			//logger.warn(LogFormat.rec("check hero not pass. addFriends will exit."));
			return;
		}
		long hid = hero.getId();
		String name = hero.getName();
		try {
			boolean isOnline = HeroFunction.getIns().isOnline(oHid);
			Hero oHero;
			if(isOnline) {
				oHero = HeroCache.getHero(oHid);
			}else {
				oHero = HeroCache.getHero(oHid, HeroConst.FIND_TYPE_FRIEND);
			}
			if(oHero == null) {
				FriendSender.sendCmd_408(hid, 2, hid, oHid,"",0,0,0,0,0,0,0);
				return;
			}
			// 判断是否添加该好友
			Friend friend = hero.getFriend();
			Friend otherFriend = oHero.getFriend();
			FriendFunction friendFunction = FriendFunction.getIns();
			if(friendFunction.isGoodFriend(oHid, friend) && friendFunction.isGoodFriend(hid, otherFriend)) {
				FriendSender.sendCmd_408(hid, 3, hid, oHid,"",0,0,0,0,0,0,0);
				return;
			}
			//判断对方是否在自己黑名单中
			if(friendFunction.isBadFriend(oHid, friend)) {
				FriendSender.sendCmd_408(hid, 4, hid, oHid,"",0,0,0,0,0,0,0);
				return;
			}
			//判断是否在对方黑名单中
			if(friendFunction.isBadFriend(hid, otherFriend)) {
				FriendSender.sendCmd_408(hid, 4, hid, oHid,"",0,0,0,0,0,0,0);
				return;
			}
			//判断是否已满
			if(friendFunction.isFull(hero, FriendConst.TYPE_GOOD_FRIEND)) {
				FriendSender.sendCmd_408(hid, 5, hid, oHid,"",0,0,0,0,0,0,0);
				return;
			}
			//判断是否已满
			if(friendFunction.isFull(oHero, FriendConst.TYPE_GOOD_FRIEND)) {
				FriendSender.sendCmd_408(hid, 6, hid, oHid,"",0,0,0,0,0,0,0);
				return;
			}
			List<FriendApply> applys = friend.getFriendApply();
			FriendApply apply = new FriendApply();
			apply.setHid(oHid);
			if (!applys.contains(apply)) {
				//不在申请列表
				FriendSender.sendCmd_408(hid, 7, hid, oHid,"",0,0,0,0,0,0,0);
				return;
			}
			applys.remove(apply);
			if(flag == 1) {//拒绝
				if(isOnline){
					FriendSender.sendCmd_408(oHid, 8, hid, oHid,name,0,0,0,0,0,0,0);
				}
				FriendSender.sendCmd_408(hid, 8, hid, oHid,oHero.getName(),0,0,0,0,0,0,0);
				return;
			}
			//接受
			FriendModel model1;
			FriendModel model2;
			//放到自己好友列表
			model1 = friendFunction.getModelFromBadOrBackup(hero, oHid);
			int onlineState = isOnline?1:0;
			if(model1 == null){
				model1 = friendFunction.setFriendModel(oHid, oHero.getName(), onlineState);
				model2 = friendFunction.setFriendModel(hid, name, 1);
			}else {
				model1.setName(oHero.getName());
				model1.setOnlineState(onlineState);
				model2 = friendFunction.getModelFromBadOrBackup(oHero, hid);
				if(model2 == null)
					model2 = new FriendModel();
				model2.setHid(hid);
				model2.setName(name);
				model2.setOnlineState(1);
			}
			friend.getGoodFriends().put(oHid,model1);
			otherFriend.getGoodFriends().put(hid, model2);
			otherFriend.getFriendApply().remove(new FriendApply(hid, ""));
			//发送到前端
			FriendSender.sendCmd_408(hid, 1, hid, oHid, oHero.getName(),oHero.getLevel(),FriendFunction.getIns().getZsLevel(oHero),oHero.getJob(),oHero.getSex(),oHero.getTotalStrength(),onlineState,oHero.getLogoutTime());
//			if(friendFunction.isBadFriend(hid, otherFriend)) {
//				friendFunction.removeFromPlace(otherFriend, hid, FriendConst.TYPE_BAD_FRIEND);
//				friendFunction.removeFromPlace(friend, oHid, FriendConst.TYPE_BAD_FRIEND);
//			}
			if(isOnline) {
				FriendSender.sendCmd_408(oHid, 1, hid, hid,hero.getName(),hero.getLevel(),FriendFunction.getIns().getZsLevel(hero),hero.getJob(),hero.getSex(),hero.getTotalStrength(),1,hero.getLogoutTime());
			}else {
				//不在线需要同步到数据库
				FriendDao.getIns().update(otherFriend);
			}  
		} catch (Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hid, name, "processApply ocurs an error."));
		}
	}
	
	/**
	 * 添加到黑名单
	 * @param hero
	 * @param oHid
	 */
	public void addToBadFriend(Hero hero, long oHid) {
		if(!checkFriends(hero)) {
			//logger.warn(LogFormat.rec("check hero not pass. addFriends will exit."));
			return;
		}
		long hid = hero.getId();
		String name = hero.getName();
		try {
			Friend friend = hero.getFriend();
			FriendFunction friendFunction = FriendFunction.getIns();
			FriendModel model = friendFunction.getModelFromFriend(hero, oHid);
			//判断是否是在黑名单
			boolean isBadFriend = friendFunction.isBadFriend(oHid, friend);
			if(isBadFriend){
				FriendSender.sendCmd_410(hid, 2, oHid,"",0,0,0,0,0,0);
				return;
			}
			//是否满了
			if(friendFunction.isFull(hero, FriendConst.TYPE_BAD_FRIEND)) {
				FriendSender.sendCmd_410(hid, 4, oHid,"",0,0,0,0,0,0);
				return;
			}
			
			//非好友， 加入到黑名单
			boolean isOnline = HeroFunction.getIns().isOnline(oHid);
			Hero oHero = null;
			if(isOnline) {
				oHero = HeroCache.getHero(oHid);
			}else {
				oHero = HeroCache.getHero(oHid, HeroConst.FIND_TYPE_FRIEND);
			}
			if(oHero == null) {
				FriendSender.sendCmd_410(hid, 5, oHid,"",0,0,0,0,0,0);
				return;
			}
			if(model == null) {
				model = friendFunction.setFriendModel(oHid, oHero.getName(), isOnline? 1:0);
			}
			friendFunction.removeFromPlace(friend, oHid, FriendConst.TYPE_GOOD_FRIEND);
			//从对方好友列表删除
			Friend friend2 = oHero.getFriend();
			friendFunction.removeFromPlace(friend2, hid, FriendConst.TYPE_GOOD_FRIEND);
			friend.getBadFriends().put(oHid, model);
			FriendSender.sendCmd_410(hid, 1, oHid,oHero.getName(),oHero.getLevel(),FriendFunction.getIns().getZsLevel(oHero),oHero.getJob(),oHero.getSex(),isOnline? 1:0,0);
			//添加到对方在其他人黑名单中。。。
			List<Long> inOtherBadList = friend2.getInOtherBadList();
			if(inOtherBadList == null) {
				inOtherBadList = new ArrayList<Long>();
				friend2.setInOtherBadList(inOtherBadList);
			}
			inOtherBadList.add(hid);
			//在线则发送
			if(isOnline) {
				FriendSender.sendCmd_414(oHid, hid);
			}else{
				//不在线需要同步到数据库
				FriendDao.getIns().update(friend2);
			}
		} catch (Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hid, name,"addToBadFriend ocurs an error."));
		}
	}

	/**
	 * 删除好友
	 * @param hero
	 * @param oHid
	 * 
	 */
	public void delFriend(Hero hero, long oHid) {
		if(!checkFriends(hero)) {
			return;
		}
		long hid = hero.getId();
		String name = hero.getName();
		try{
			FriendFunction friendFunction = FriendFunction.getIns();
			Friend friend = hero.getFriend();
			if(friend == null) {
				FriendSender.sendCmd_416(hid, 2, hid, oHid);
				return;
			}
			FriendModel model = friendFunction.getModelFromFriend(hero, oHid);
			if(model == null) {
				FriendSender.sendCmd_416(hid, 3, hid, oHid);
				return;
			}
//			if(hero.getMarryHid() == oHid) {
//				FriendSender.sendCmd_416(hid, 2, hid, oHid);
//				return;
//			}
			Hero otherHero;
			boolean isOnline = HeroFunction.getIns().isOnline(oHid);
			if(isOnline) {
				otherHero = HeroCache.getHero(oHid);
			}else {
				otherHero = HeroCache.getHero(oHid, HeroConst.FIND_TYPE_FRIEND);
			}
			Friend otherFri = otherHero.getFriend();
			otherFri.getGoodFriends().remove(hid);
			//最近联系人也要删除
			List<Long> otherRecentChat = otherFri.getRecentChat();
			if(otherRecentChat.contains(hid)){
				otherRecentChat.remove(hid);
			}
			friend.getGoodFriends().remove(oHid);
			List<Long> recentChat = friend.getRecentChat();
			if(recentChat.contains(oHid)){
				recentChat.remove(oHid);
			}
			FriendSender.sendCmd_416(hid, 1, hid, oHid);
			if(isOnline){
				FriendSender.sendCmd_416(oHid, 1, hid, oHid);
			}else{
				//不在线需要同步到数据库
				FriendDao.getIns().update(otherFri);
			}
		}catch(Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hid, name,"delGoodFriend ocurs an error."));
		}
	}
	
	/**
	 * 删除黑名单
	 * @param hero
	 * @param oHid
	 */
	public void delBlack(Hero hero, long oHid) {
		if(!checkFriends(hero)) {
			return;
		}
		long hid = hero.getId();
		String name = hero.getName();
		try{
			FriendFunction friendFunction = FriendFunction.getIns();
			Friend friend = hero.getFriend();
			if(friend == null) {
				FriendSender.sendCmd_418(hid, 2, hid, oHid);
				return;
			}
			FriendModel model = friendFunction.getModelFromBadOrBackup(hero, oHid);
			if(model == null) {
				FriendSender.sendCmd_418(hid, 3, hid, oHid);
				return;
			}
			Hero otherHero;
			boolean isOnline = HeroFunction.getIns().isOnline(oHid);
			if(isOnline) {
				otherHero = HeroCache.getHero(oHid);
			}else {
				otherHero = HeroCache.getHero(oHid, HeroConst.FIND_TYPE_FRIEND);
			}
			//移除自己的黑名单
			friend.getBadFriends().remove(oHid);
			if(otherHero==null){
				FriendSender.sendCmd_418(hid, 1, hid, oHid);
				return;
			}
			Friend otherFri = otherHero.getFriend();
			//在别人的黑名单列表移除
			otherFri.getInOtherBadList().remove(hid);
			FriendSender.sendCmd_418(hid, 1, hid, oHid);
			if(isOnline){
				FriendSender.sendCmd_418(oHid, 1, hid, oHid);
			}else{
				//不在线需要同步到数据库
				FriendDao.getIns().update(otherFri);
			}
		}catch(Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hid, name,"delBlack ocurs an error."));
		}
	}
	
	/**
	 * 获取私聊信息
	 * @param hero
	 * @param friendId
	 */
	public void showMsg(Hero hero){
		long hid = hero.getId();
		MsgChaModel msgChaModel = FriendCache.getMsgModelMap().get(hid);
		if(msgChaModel==null){
			return;
		}
		List<Object> msgList = new ArrayList<Object>();
		long friendId;
		List<MsgModel> msgModelList;
		for(Entry<Long,List<MsgModel>> entry:msgChaModel.getMsgMap().entrySet()){
			friendId = entry.getKey();
			if(!FriendFunction.getIns().isGoodFriend(friendId, hero.getFriend())) {
				msgChaModel.getMsgMap().remove(friendId);
				continue;
			}
			msgModelList = entry.getValue();
			if(msgModelList==null||msgModelList.isEmpty()){
				continue;
			}
			
			List<Object> list = new ArrayList<Object>();
			Object[] object;
			for(MsgModel model:msgModelList){
				object = new Object[2];
				object[0] = model.getSendTime();
				object[1] = model.getContent();
				list.add(object);
			}
			Object[] objects = list.toArray();
			//每个好友的聊天消息列表
			Object[] msgObjects = new Object[2];
			msgObjects[0]=friendId;
			msgObjects[1]=objects;
			msgList.add(msgObjects);
			//记录到好友最近聊天
			Friend friend = hero.getFriend();
			List<Long> recentChat = friend.getRecentChat();
			if(recentChat==null){
				recentChat = new ArrayList<Long>();
				friend.setRecentChat(recentChat);
			}
			if(recentChat.contains(friendId)){
				recentChat.remove(friendId);
			}
			if(recentChat.size()>FriendConst.MAX_RECENTCHAT){
				recentChat.remove(0);
			}
			recentChat.add(friendId);
		}
		if(!msgList.isEmpty()){
			FriendSender.sendCmd_412(hid, msgList.toArray());
			FriendCache.getMsgModelMap().remove(hero.getId());
		}
	}
	
	/**
	 * 聊天
	 * @param hero
	 * @param friendId
	 */
	public void chat(Hero hero, long friendId, String content) {
		long hid = hero.getId();
//		if(!ChatManager.getIns().checkSiLiao(hero, friendId)){
//			return;
//		}
		if(!checkFriends(hero)) {
			//logger.warn(LogFormat.rec("check hero not pass. addFriends will exit."));
			return;
		}
		String name = hero.getName();
		try{
			if(StringUtils.isBlank(content)){
				FriendSender.sendCmd_420(hid, 2, friendId);
				return;
			}
			//简单防注入验证(后面聊天会入库)
			String CHECKSQL = ".*([';]+|(--)+).*";
			if(Pattern.matches(CHECKSQL, content)){
				FriendSender.sendCmd_420(hid, 2, friendId);
				return;
			}
			//内容过长
			if(content.length() > FriendConst.CONTENT_LENGTH_LIMIT) {
				FriendSender.sendCmd_420(hid, 3, friendId);
				return;
			}
			Hero otherHero;
			MsgChaModel msgChaModel = FriendCache.getMsgModelMap().get(friendId);
			List<MsgModel> msgList = null;
			boolean isOnline = HeroFunction.getIns().isOnline(friendId);
			if(isOnline) {
				otherHero = HeroCache.getHero(friendId);
			}else {
				//如果玩家不在线 那么看看自己给对方留言条数
				if(msgChaModel!=null){
					msgList = msgChaModel.getMsgMap().get(hid);
					//离线留言条数不能大于一定条数
					if(msgList!=null&&msgList.size() >= FriendConst.MAX_OFFLINE_MSG){
						FriendSender.sendCmd_420(hid, 4, friendId);
						return;
					}
				}
				otherHero = HeroCache.getHero(friendId, HeroConst.FIND_TYPE_FRIEND);
			}
			if(otherHero==null){
				FriendSender.sendCmd_420(hid, 5, friendId);
				return;
			}
			FriendFunction friendFunction = FriendFunction.getIns();
			if(!friendFunction.isGoodFriend(hero, otherHero)) {
				FriendSender.sendCmd_420(hid, 6, friendId);
				return;
			}
			int now = TimeDateUtil.getCurrentTime();
			//聊天内容监控上报
//			ChatReportEvent.addChatData(hero.getId(), hero.getOpenid(), hero.getName(), hero.getZoneid(), hero.getLoginIp(), ChatConst.siliao, content, oHero.getId(), oHero.getOpenid(), oHero.getName());
			//聊天内容写日志
//			ChatRecordFunction.getIns().addRecord(hero.getId(), hero.getOpenid(), hero.getName(), hero.getZoneid(), hero.getLoginIp(), ChatConst.siliao, content, oHero.getId(), oHero.getOpenid(), oHero.getName());
			//最近聊天
			Friend friend = hero.getFriend();
			List<Long> recentChat = friend.getRecentChat();
			if(recentChat==null){
				recentChat = new ArrayList<Long>();
				friend.setRecentChat(recentChat);
			}
			if(recentChat.contains(friendId)){
				recentChat.remove(friendId);
			}
			if(recentChat.size()>FriendConst.MAX_RECENTCHAT){
				recentChat.remove(0);
			}
			recentChat.add(friendId);
			if(isOnline){
				//好友最近聊天
				Friend otherFriend = otherHero.getFriend();
				recentChat = otherFriend.getRecentChat();
				if(recentChat==null){
					recentChat = new ArrayList<Long>();
					otherFriend.setRecentChat(recentChat);
				}
				if(recentChat.contains(hid)){
					recentChat.remove(hid);
				}
				recentChat.add(hid);
				FriendSender.sendCmd_422(friendId, hid, content);
			}else{
				if(msgChaModel==null){
					msgChaModel = new MsgChaModel();
					FriendCache.getMsgModelMap().put(friendId, msgChaModel);
				}
				if(msgList==null){
					msgList = new ArrayList<>();
					msgChaModel.getMsgMap().put(hid, msgList);
				}
				MsgModel msgModel = new MsgModel();
				msgModel.setSendTime(now);
				msgModel.setContent(content);
				msgList.add(msgModel);
			}
			FriendSender.sendCmd_420(hid, 1, friendId);
		}catch(Exception e) {
			LogTool.error(e, this, LogTool.getmsg(hid, name,"reqChat ocurs an error."));
		}
	}
	
	/**
	 * 获得最近联系人列表
	 * @param hero
	 */
	public void getRecentChatFriend(Hero hero){
		Friend friend = hero.getFriend();
		if(friend==null){
			return;
		}
		List<Long> recentChat = friend.getRecentChat();
		if(recentChat==null){
			return;
		}
		Map<Long, FriendModel> goodFriendMap = friend.getGoodFriends();
		List<Object[]> objects = new ArrayList<>();
		Object[] object;
		Long id;
		List<Long> removeIds = new ArrayList<>();
		int size = recentChat.size();
		for(int i=0;i<size;i++){
			id = recentChat.get(i);
			//不是好友的话移除最近联系人
			if(!goodFriendMap.containsKey(id)){
				removeIds.add(id);
				continue;
			}
			object = new Object[1]; 
			object[0]=id;
			objects.add(object);
		}
		//不是好友了 要移除最近联系人列表
		if(!removeIds.isEmpty()){
			for(Long removeId: removeIds){
				recentChat.remove(removeId);
			}
		}
		if(!objects.isEmpty()){
			FriendSender.sendCmd_428(hero.getId(), objects.toArray());
		}
		//离线消息
		showMsg(hero);
	}
}
