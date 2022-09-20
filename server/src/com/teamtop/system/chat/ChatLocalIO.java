package com.teamtop.system.chat;

import java.util.ArrayList;
import java.util.Iterator;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class ChatLocalIO {
	private static ChatLocalIO ins;
	public static synchronized ChatLocalIO getIns(){
		if(ins == null) {
			ins = new ChatLocalIO();
		}
		return ins;
	}
	
	public void SGChat(ChatCrossModel chatCrossModel) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossChatEnum.chat.name(), chatCrossModel);
		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, CrossConst.CROSS_SG_CHAT, crossData);
	}
	
	
	public void LRCchat(Channel channel,CrossData crossData) {
		ChatCrossModel chatCrossModel=crossData.getObject(CrossChatEnum.chat.name(), ChatCrossModel.class);
		//添加到聊天缓存
		ArrayList<ChatHistorys> chatHistory=ChatCache.getChaHistorys().get(ChatConst.CROSS);
		if (chatHistory==null) {
			chatHistory=new ArrayList<ChatHistorys>();
			ChatCache.getChaHistorys().put(ChatConst.CROSS, chatHistory);
			chatHistory.add(new ChatHistorys(chatCrossModel.getHid(),chatCrossModel));
		}else {
			if (chatHistory.size()>=ChatConst.WROLD_MAX_NUM) {
				chatHistory.remove(0);
			}
			chatHistory.add(new ChatHistorys(chatCrossModel.getHid(),chatCrossModel));
		}
		//广播
		Iterator<Long> iterator = HeroCache.getHeroMap().keySet().iterator();
		while(iterator.hasNext()){
			Long next = iterator.next();
			if(HeroFunction.getIns().isOnline(next)){
				Hero h= HeroCache.getHero(next);
				if (h.getChat()==null) {
					LogTool.warn("h.getChat()==null"+next, ChatManager.class);
					continue;
				}
				if (h.getChat().getBlackMap()==null) {
					LogTool.warn("h.getChat().getBlackMap()"+next, ChatManager.class);
					continue;
				}
				if(!h.getChat().getBlackMap().containsKey(chatCrossModel.getHid())){
					ChatSender.sendCmd_452(h.getId(), ChatConst.CROSS, chatCrossModel.getHid(),chatCrossModel.getHerdid(),chatCrossModel.getHerdUi(),
							chatCrossModel.getLevel() ,chatCrossModel.getStr() ,chatCrossModel.getPromotionLv(),chatCrossModel.getRebornType(),chatCrossModel.getCountryType(), chatCrossModel.getOfficial(),chatCrossModel.getTitleId(), chatCrossModel.getName(), chatCrossModel.getVipLv(),chatCrossModel.getJob(),chatCrossModel.getGodWeapon(),chatCrossModel.getIsShow(), chatCrossModel.getMsg(),chatCrossModel.getReincarnationLevel(),chatCrossModel.getMountId());
				}
			}
		}
	
		
	}
}
