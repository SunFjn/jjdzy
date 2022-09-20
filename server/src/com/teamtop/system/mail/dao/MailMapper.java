package com.teamtop.system.mail.dao;

import java.util.List;

import com.teamtop.system.mail.model.Mail;
import com.teamtop.system.mail.model.MailTemp;
import com.teamtop.util.mybatis.BaseMapper;
/**
 * 邮件mapper
 * @author Administrator
 *
 */
public interface MailMapper extends BaseMapper<Mail> {

	Integer findMailState(MailTemp temp);
	
	List<Object> findMailList(long hid) throws Exception;
	
	void updateMailIsRead(MailTemp mailTemp);

	void updateMailIsGetAdj(MailTemp mailTemp);

	void updataIsGetAdj(MailTemp mailTemp);

	void updataIsRead(MailTemp mailTemp);
	
	void updataIsReadIsGetAdj(MailTemp mailTemp);
	
	void delAllByHid(long hid);
	
	void oneKeyDeleteMails(MailTemp mailTemp);
	
	void oneKeyDeleteMailsReaded(MailTemp mailTemp);

	void delSome(int time);
	
	int findMailNum(MailTemp temp);

	void updataMail(String string);
	
	Object findMailByHidMailID(MailTemp temp) throws Exception;
	
}
