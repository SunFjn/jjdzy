package com.teamtop.system.event.backstage.events.backstage.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.event.backstage.events.backstage.HoutaiMapper;
import com.teamtop.system.event.backstage.events.backstage.recharge.B_PayAccount;
import com.teamtop.system.event.backstage.events.backstage.register.B_Register;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfo;
import com.teamtop.util.mybatis.MybatisUtil;

/**
 * 后台功能相关数据操作处理类
 * @author hepl
 *
 */
public class HoutaiDao {
	private static HoutaiDao ins = null;
	
	public static HoutaiDao getIns(){
		if(ins == null){
			ins = new HoutaiDao();
		}
		return ins;
	}
	/**
	 * 插入注册表
	 * @param zoneid 区号
	 * @param register 注册model
	 * @throws Exception
	 */
	public void insertRegister(int zoneid, B_Register register) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			mapper.insertRegister(register);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 获取注册表记录
	 * @param zoneid 区号
	 * @return
	 * @throws Exception
	 */
	public B_Register getB_RegisterByopenid(String openid,int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		B_Register b_Register=null;
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			b_Register = mapper.getB_RegisterByopenid(openid);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return b_Register;
	}
	/**
	 * 更新注册表
	 * @param zoneid
	 * @param b_Register
	 * @throws Exception
	 */
	public void updateB_Register(int zoneid,B_Register b_Register) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			mapper.updateB_Register(b_Register);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
		
	}
	
	/**
	 * 获取角色表记录
	 * @param zoneid 区号
	 * @return
	 * @throws Exception
	 */
	public B_RoleInfo getB_RoleInfoByopenid(String openid,int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		B_RoleInfo m_RoleInfo=null;
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			m_RoleInfo = mapper.getB_RoleInfoByopenid(openid);
			
		} finally {
			MybatisUtil.closeSession(session);
		}
		return m_RoleInfo;
	}
	
	/**
	 * 插入角色表
	 * @param zoneid 区号
	 * @param m_RoleInfo 角色
	 * @throws Exception
	 */
	public void insertB_RoleInfo(int zoneid, B_RoleInfo m_RoleInfo) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			mapper.insertB_RoleInfo(m_RoleInfo);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 插入订单表数据
	 * @param zoneid
	 * @param m_PayAccount
	 * @throws Exception
	 */
	public void insertB_PayAccount(int zoneid, B_PayAccount m_PayAccount) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			mapper.insertB_PayAccount(m_PayAccount);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 获取订单表数据
	 * @param product_id 订单号
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public B_PayAccount getB_PayAccount(long product_id,int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		B_PayAccount m_PayAccount=null;
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			m_PayAccount = mapper.selectB_PayAccount(product_id);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return m_PayAccount;
	}
	/**
	 * 更新订单表数据
	 * @param zoneid
	 * @param m_PayAccount
	 * @throws Exception
	 */
	public void updateB_PayAccount(int zoneid,B_PayAccount m_PayAccount) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			mapper.updateB_PayAccount(m_PayAccount);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
		
	}
	
	public List<B_PayAccount>  selectAllB_PayAccount() throws Exception {
		List<B_PayAccount> findMany = new ArrayList<>();
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			HoutaiMapper mapper = session.getMapper(HoutaiMapper.class);
			findMany = mapper.selectAllB_PayAccount();
		}finally{
			MybatisUtil.closeSession(session);
		}
		return findMany;
	}
	
	
}
