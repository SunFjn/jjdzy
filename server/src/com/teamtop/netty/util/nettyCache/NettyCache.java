package com.teamtop.netty.util.nettyCache;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.cross.AbsCrossControl;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCmd;
import com.teamtop.system.hero.TempData;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankCmd;

import io.netty.channel.Channel;
import io.netty.util.AttributeKey;
/**
 * base缓存
 * @author KyleCheng
 * @version 1.0
 *
 */
public class NettyCache {


	/**
	 * 用作读数据
	 */
//	public static Map<String, Method> readInvokeMethodMap = new HashMap<String, Method>();
	/**
	 * 用作写数据
	 */
	public static Map<Integer, Method> writeInvokeMethodMap = new HashMap<Integer, Method>();
	/**
	 * 协议号<->协议字段的对应关系
	 */
	public static Map<Integer,Object[]> cmd2ProtocalMap = new HashMap<Integer,Object[]>();
	/**
	 * 协议号<->方法的对应关系
	 */
	public static Map<Integer,Method> cmdToMethodCache = new HashMap<Integer, Method>();
	/**
	 * 协议号<->对象对应关系
	 */
	public static Map<Integer,Object> cmdToObject = new HashMap<Integer, Object>();
	/**
	 * 中央服与子服协议号<->方法的对应关系
	 */
	public static Map<Integer,Method> crossCmdToMethodCache = new HashMap<Integer, Method>();
	/**
	 * 中央服与子服协议号<->对象对应关系
	 */
	public static Map<Integer,Object> crossCmdToObject = new HashMap<Integer, Object>();
	/**
	 * 协议号<->方法的的反射参数(Channel)
	 */
	public static Class<?>[] connectionParamTypes = new Class[]{Channel.class,Object[].class};
	/**
	 * 协议号<->方法的的反射参数(role Id)
	 */
	public static Class<?>[] heroParamTypes = new Class[]{Hero.class,Object[].class};
	public static AttributeKey<TempData> ATTR_KEY = new AttributeKey<TempData>("tempDataKey");
	/**
	 * cmd -> CrossControl
	 */
	public static Map<Integer,AbsCrossControl> crossControlMap = new HashMap<Integer, AbsCrossControl>();

	public static Set<Integer> passCmdSet = new HashSet<>();
	static {
		passCmdSet.add(HeroCmd.GC_Login_102);
		passCmdSet.add(HeroCmd.GC_LoadAlready_104);
		passCmdSet.add(HeroCmd.GC_Create_106);
		passCmdSet.add(HeroCmd.GC_HeroData_108);
		passCmdSet.add(HeroCmd.GC_HeroAttr_110);
		passCmdSet.add(SevenWuShenRankCmd.GC_InitRank_2300);
	}
}
