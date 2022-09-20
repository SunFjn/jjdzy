package com.teamtop.system.hero;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.netty.firewall.skyeye.SkyEyeRec;
import com.teamtop.system.account.Account;
import com.teamtop.system.event.backstage.events.backstage.register.B_Register;

import io.netty.channel.Channel;

/**
 * channel的临时数据
 * @author kyle
 *
 */
public class TempData {
	private Hero hero = null;
	private String openid = null;
	private int zoneid;
	private Channel channel = null;
	private boolean passTX = false;
	private Map<String, Object> attribute = new HashMap<String, Object>();
	private long heartBeatTime = 0l;
	private int syncTime = 0;//同步库的时间
	private int loginSendLen = 0;
	private int loginSendRealLen = 0;
	private int loginSendCount = 0;
	private int loginSendCompressCount = 0;
	private Account account;
	//协议监控
	private Map<Integer, SkyEyeRec> protocolWatch = new HashMap<Integer, SkyEyeRec>();
	//协议防火墙
	private Long[] firewall;
	private boolean printcmd;
	//是否发送了登陆数据
	private boolean sendLoginData;
	/**
	 * 后台账户表
	 */
	private B_Register b_Register;
	
	public int getLoginSendCompressCount() {
		return loginSendCompressCount;
	}

	public void setLoginSendCompressCount(int loginSendCompressCount) {
		this.loginSendCompressCount = loginSendCompressCount;
	}

	public int getLoginSendLen() {
		return loginSendLen;
	}

	public int getLoginSendRealLen() {
		return loginSendRealLen;
	}

	public void setLoginSendRealLen(int loginSendRealLen) {
		this.loginSendRealLen = loginSendRealLen;
	}

	public void setLoginSendLen(int loginSendLen) {
		this.loginSendLen = loginSendLen;
	}

	public int getLoginSendCount() {
		return loginSendCount;
	}

	public void setLoginSendCount(int loginSendCount) {
		this.loginSendCount = loginSendCount;
	}

	public boolean isSendLoginData() {
		return sendLoginData;
	}

	public void setSendLoginData(boolean sendLoginData) {
		this.sendLoginData = sendLoginData;
	}

	public boolean isPrintcmd() {
		return printcmd;
	}

	public void setPrintcmd(boolean printcmd) {
		this.printcmd = printcmd;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public Long[] getFirewall() {
		return firewall;
	}

	public void setFirewall(Long[] firewall) {
		this.firewall = firewall;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public Map<Integer, SkyEyeRec> getProtocolWatch() {
		return protocolWatch;
	}

	public void setProtocolWatch(Map<Integer, SkyEyeRec> protocolWatch) {
		this.protocolWatch = protocolWatch;
	}

	public void addAttribute(final String key,final Object value){
		attribute.put(key, value);
	}

	public Hero getHero() {
		return hero;
	}

	public void setHero(Hero hero) {
		this.hero = hero;
	}

	public Channel getChannel() {
		return channel;
	}
	public void setChannel(Channel channel) {
		this.channel = channel;
	}
	public boolean isPassTX() {
		return passTX;
	}
	public void setPassTX(boolean passTX) {
		this.passTX = passTX;
	}
	public Map<String, Object> getAttribute() {
		return attribute;
	}
	public void setAttribute(Map<String, Object> attribute) {
		this.attribute = attribute;
	}
	public Object getAttribute(final String key){
		return this.attribute.get(key);
	}
	public Object removeAttribute(final String key){
		Object remove = this.attribute.remove(key);
		return remove;
	}
	public TempData() {
	}
	
	public void destroy(){
		this.channel = null;
		this.attribute.clear();
		this.attribute = null;
	}
	public long getHeartBeatTime() {
		return heartBeatTime;
	}
	public void setHeartBeatTime(long heartBeatTime) {
		this.heartBeatTime = heartBeatTime;
	}
	

	public int getSyncTime() {
		return syncTime;
	}

	public void setSyncTime(int syncTime) {
		this.syncTime = syncTime;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public B_Register getB_Register() {
		return b_Register;
	}

	public void setB_Register(B_Register b_Register) {
		this.b_Register = b_Register;
	}

	
	
	

}
