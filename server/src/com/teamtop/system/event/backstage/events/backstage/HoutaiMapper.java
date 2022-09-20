package com.teamtop.system.event.backstage.events.backstage;

import java.util.List;
import com.teamtop.system.event.backstage.events.backstage.recharge.B_PayAccount;
import com.teamtop.system.event.backstage.events.backstage.register.B_Register;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfo;

/**
 * 后台功能相关功能数据操作
 * @author hepl
 *
 */
public interface HoutaiMapper {
	/**
	 * 插入注册人数
	 * @param register
	 * @throws Exception
	 */
	public void insertRegister(B_Register register) throws Exception;
	/**
	 * 获取注册记录
	 * @return
	 * @throws Exception
	 */
	public B_Register getB_RegisterByopenid(String openid) throws Exception;
	/**
	 * 更新注册记录
	 */
	public void updateB_Register(B_Register register)throws Exception;
	/***
	 * 获取角色表信息
	 */
	public B_RoleInfo getB_RoleInfoByopenid(String openid) throws Exception;
	/**
	 * 插入角色表信息
	 */
	public void insertB_RoleInfo(B_RoleInfo m_RoleInfo) throws Exception;
	/**
	 * 插入订单表数据
	 */
	public void insertB_PayAccount(B_PayAccount m_PayAccount) throws Exception;
	/**
	 * 查找订单表数据
	 */
	public B_PayAccount selectB_PayAccount(long product_id) throws Exception;
	/**
	 * 更新订单表数据
	 */
	public void updateB_PayAccount(B_PayAccount m_PayAccount) throws Exception;
	/**获取所有完成的订单*/
	public List<B_PayAccount> selectAllB_PayAccount() throws Exception;
}
