package com.teamtop.system.mail.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.mail.MailCache;
import com.teamtop.system.mail.model.Mail;
import com.teamtop.system.mail.model.MailTemp;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class MailDao {
	private static MailDao mailDao;
	public static MailDao getIns() {
		if(mailDao == null) {
			mailDao = new MailDao();
		}
		return mailDao;
	}
	
	private MailDao(){}
	
	public static void main(String[] args) throws Exception {
		System.out.println(TimeDateUtil.getCurrentTime());
		/*new GameProperties().startServer();
		new MybatisUtil().startServer();
		new AutoObjTableUtil().startServer();
//		t1();
		//t2();
		MailTemp temp = new MailTemp();
		temp.setValue(" receiverId = 1000100000000052 and  (type=2 or type = 3) and state != 2");
		temp.setTime(TimeDateUtil.getCurrentTime() - 
						MailConst.RECEIVE_TIME_MAX);
		temp.setFromNum(0);
		temp.setRowNum(10);
		List<Mail> list = MailDao.getIns().findReceiveMail(temp, 1000100000000052l);
		System.out.println(list.get(0).getContent());
		Mail mail = new Mail();
		mail.setSenderId(1l);
		mail.setReceiverId(3l);
		mail.setContent("ccccc");
		MailDao.getIns().insert(mail);
		System.out.println(mail.getId());*/
		/*Hero hero = new Hero();
		hero.setId(1000100000000052l);
		MailDao.getIns().delMailsByNoAdjuncts(hero);*/
	}
	
	/**
	 * 获取指定的邮件状态、附件状态的邮件数量
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public int findMailState(long receiverId, int isGetAdj, int isRead) throws Exception {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(receiverId));
		int result = 0;
		try {
			MailTemp temp = new MailTemp();
			temp.setReceiverId(receiverId);
			temp.setIsGetAdj(isGetAdj);
			temp.setIsRead(isRead);
			MailMapper mapper = session.getMapper(MailMapper.class);
			Integer findResult = mapper.findMailState(temp);
			if(findResult == null) return 0;
			result = findResult;
			return result;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 获取最近30封邮件
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public List<Mail> findMailList( long hid) throws Exception {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(hid));
		List<Mail> rsList = null;
		try {
			MailMapper mapper = session.getMapper(MailMapper.class);
			List<Object> findMany = mapper.findMailList(hid);
			rsList = transListToMailList( null, mapper, findMany);
		}finally{
			MybatisUtil.closeSession(session);
		}
		return rsList;
	}
	
	/**
	 * 将列表转换为邮件列表
	 * @param temp
	 * @param rsList
	 * @param mapper
	 * @return
	 * @throws Exception
	 */
	private List<Mail> transListToMailList(MailTemp temp, MailMapper mapper, List<Object> findMany) throws Exception {
		List<Mail> rsList = null;
		
		if(findMany!=null){
			for(Object obj:findMany){
				if(rsList==null) rsList = new ArrayList<Mail>();
				@SuppressWarnings("unchecked")
				Map<String,Object> map = (Map<String, Object>) obj;
				Mail t = OrmSqlUtil.getObjFromDB(map, Mail.class);
				rsList.add(t);
			}
		}
		return rsList;
	}
	
	/**
	 * 更改邮件状态
	 * @param i
	 */
	public void updateMailIsRead(long mailId, int state, long hid) throws Exception {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(hid));
		try {
			MailMapper mapper = session.getMapper(MailMapper.class);
			MailTemp mailTemp = new MailTemp();
			mailTemp.setReceiverId(hid);
			mailTemp.setId(mailId);
			mailTemp.setIsRead(state);
			mapper.updateMailIsRead(mailTemp);
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hid, "", "updateMailIsRead mail table err, mailId=" + mailId);
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hid, new Object[] { "mail", errMsg });
			throw e;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 改变邮件附件状态
	 * @param mailId
	 * @param state
	 */
	public void updateMailIsGetAdj(long mailId, int state, long hid) throws Exception {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(hid));
		try {
			MailMapper mapper = session.getMapper(MailMapper.class);
			MailTemp mailTemp = new MailTemp();
			mailTemp.setIsGetAdj(state);
			mailTemp.setId(mailId);
			mailTemp.setReceiverId(hid);
			mapper.updateMailIsGetAdj(mailTemp);
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hid, "", "updateMailIsGetAdj mail table err, mailId=" + mailId);
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hid, new Object[] { "mail", errMsg });
			throw e;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 批量改变邮件读取/附件状态
	 * @param ids	需要修改的所有邮件ID
	 * @param isGetAdj 领取附件状态，默认填0
	 * @param isRead	读取状态，默认填0
	 * @param type	设置状态   1：读状态 。2：附件状态。3：读取和附件状态
	 */
	public void updateBatchState(long[] ids, int isGetAdj, int isRead, long hid, int type) throws Exception {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(hid));
		try {
			MailMapper mapper = session.getMapper(MailMapper.class);
			//state
			StringBuilder sb = new StringBuilder();
			int len = ids.length;
			for(int i = 0; i < len; i ++) {
				sb.append(ids[i]);
				if(i != len - 1) {
					sb.append(",");
				}
			}
			MailTemp mailTemp = new MailTemp();
			mailTemp.setReceiverId(hid);
			mailTemp.setValue(sb.toString());
			if(type == 1) {
				mailTemp.setIsRead(isRead);
				mapper.updataIsRead(mailTemp);
			}else if(type==2) {
				mailTemp.setIsGetAdj(isGetAdj);
				mapper.updataIsGetAdj(mailTemp);
			}else if(type==3){
				mailTemp.setIsGetAdj(isGetAdj);
				mailTemp.setIsRead(isRead);
				mapper.updataIsReadIsGetAdj(mailTemp);
			}
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hid, "", "updateBatchState mail table err, ids=" + JSON.toJSONString(ids));
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hid, new Object[] { "mail", errMsg });
			throw e;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 获取指定的邮件状态、附件状态的邮件数量
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public int findMailNum(long receiverId) throws Exception {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(receiverId));
		int result = 0;
		try {
			MailTemp temp = new MailTemp();
			temp.setReceiverId(receiverId);
			MailMapper mapper = session.getMapper(MailMapper.class);
			Integer findResult = mapper.findMailNum(temp);
			if(findResult == null) return 0;
			result = findResult;
			return result;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 添加要发送的邮件到邮件缓存里内
	 * @param mail
	 */
	public void addMail(Mail mail){
		if(CrossZone.isCrossServer()){
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.mail.name(), mail);
			long hid = mail.getReceiverId();
			int zoneid = CommonUtil.getZoneIdById(hid);
			Channel channel = CrossCache.getChannel(zoneid);
			NettyWrite.writeXData(channel, CrossConst.CROSS_SEND_MAIL, crossData);
		}else{
			MailCache.addMailQueue(mail);
		}
	}

	/**
	 * 删除一些邮件
	 * @param time  
	 * @throws Exception
	 */
	public void deleteOverSomeDays() throws Exception {
		List<Integer> zoneList = GameProperties.zoneids;
		for( int zoneid:zoneList){
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				MailMapper mapper = session.getMapper(MailMapper.class);
				int time =TimeDateUtil.getCurrentTime()-7*24*60*60;//7天
				mapper.delSome(time);
				session.commit();
			} catch (Exception e) {
				String errMsg = LogTool.exception(e, "deleteOverSomeDays mail table err, delete seven, zoneid=" + zoneid);
				AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, 0, new Object[] { "mail", errMsg });
				throw e;
			}finally{
				MybatisUtil.closeSession(session);
			}
		}
	}
	
	/**
	 * 一键删除邮件（已读有附件且已领附件）
	 * 
	 * @param hid
	 * @param isRead
	 * @param isGetAdj
	 */
	public void oneKeyDeleteMails(long hid, int isRead, int isGetAdj) {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(hid));
		try {
			MailMapper mapper = session.getMapper(MailMapper.class);
			MailTemp mailTemp = new MailTemp();
			mailTemp.setReceiverId(hid);
			mailTemp.setIsRead(isRead);
			mailTemp.setIsGetAdj(isGetAdj);
			mapper.oneKeyDeleteMails(mailTemp);
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hid, "", "oneKeyDeleteMails mail table err, delete");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hid, new Object[] { "mail", errMsg });
			throw e;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 一键删除邮件（已读无附件）
	 * 
	 * @param hid
	 * @param isRead
	 */
	public void oneKeyDeleteMailsReaded(long hid, int isRead) {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(hid));
		try {
			MailMapper mapper = session.getMapper(MailMapper.class);
			MailTemp mailTemp = new MailTemp();
			mailTemp.setReceiverId(hid);
			mailTemp.setIsRead(isRead);
			mapper.oneKeyDeleteMailsReaded(mailTemp);
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hid, "", "oneKeyDeleteMailsReaded mail table err, delete");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hid, new Object[] { "mail", errMsg });
			throw e;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 删除某玩家所有邮件
	 * 
	 * @param time
	 * @throws Exception
	 */
	public void delAllByHid(long hid) throws Exception {
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(hid));
		try {
			MailMapper mapper = session.getMapper(MailMapper.class);
			mapper.delAllByHid(hid);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 插入一条记录
	 * @param mail
	 * @throws Exception 
	 */
	public void insert(Mail mail) throws Exception {
		try {			
			DaoUtil.insert(mail, MailMapper.class, MybatisUtil.getZoneid(mail.getReceiverId()));
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, mail.getReceiverId(), mail.getReceiver(), "insert mail table err, id="+mail.getId());
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, mail.getReceiverId(), new Object[] { "mail", errMsg });
			throw e;
		}
//		FlowMailEvent.receive(mail);//TODO 邮件流水？？
//		SystemWatchEvent.getIns().checkMail(mail);//TODO 检查违规邮件
	}
	
	/**
	 * 查邮件by heroID和mailID
	 * @param temp
	 * @param rsList
	 * @param mapper
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public Mail findMailByHidMailID(long hid, long mailID) throws Exception {
		Mail mail = null;
		SqlSession session = MybatisUtil.getSession(MybatisUtil.getZoneid(hid));
		try{
			MailTemp temp=new MailTemp();
			temp.setId(mailID);
			temp.setReceiverId(hid);
			MailMapper mapper = session.getMapper(MailMapper.class);
			Object mailObj = mapper.findMailByHidMailID(temp);
			Map<String,Object> map = (Map<String, Object>)mailObj;
			mail = OrmSqlUtil.getObjFromDB(map, Mail.class);
		}finally{
			MybatisUtil.closeSession(session);
		}
		return mail;
	}
	
}
