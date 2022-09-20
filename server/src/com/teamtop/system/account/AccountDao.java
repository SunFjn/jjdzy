package com.teamtop.system.account;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class AccountDao{
	private static AccountDao ins = null;
	public static AccountDao getIns(){
		if(ins==null){
			ins = new AccountDao();
		}
		return ins;
	}
	public void insert(Account account) throws Exception {
		try {			
			DaoUtil.insert(account, AccountMapper.class,account.getZoneid());
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, account.getHid(), "", "insert account table err, id="+account.getId());
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, account.getHid(), new Object[] { "account", errMsg });
			throw e;
		}
	}

	public void update(Account account) throws Exception {
		try {			
			DaoUtil.update(account, AccountMapper.class,account.getZoneid());
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, account.getHid(), "", "update account table err, id="+account.getId());
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, account.getHid(), new Object[] { "account", errMsg });
			throw e;
		}
	}

	public Account find(String openid,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		Account account = null;
		try {
			AccountMapper mapper = session.getMapper(AccountMapper.class);
			Map<String,Object> map = mapper.find(OrmSqlUtil.makeFind(Account.class, "openid",openid));
			account = OrmSqlUtil.getObjFromDB(map, Account.class);
			return account;
		}finally{
			session.close();
		}
	}
}
