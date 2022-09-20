package com.teamtop.system.chat;

public class ChatHistorys {
	private long hid;
	
	private ChatCrossModel chatCrossModel;

	
	public ChatHistorys() {
		super();
	}

	public ChatHistorys(long hid, ChatCrossModel chatCrossModel) {
		super();
		this.hid = hid;
		this.chatCrossModel = chatCrossModel;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public ChatCrossModel getChatCrossModel() {
		return chatCrossModel;
	}

	public void setChatCrossModel(ChatCrossModel chatCrossModel) {
		this.chatCrossModel = chatCrossModel;
	}
	


	

}
