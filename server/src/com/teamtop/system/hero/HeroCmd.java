package com.teamtop.system.hero;

/**
 * HeroCmd.java
 * Hero
 */
public class HeroCmd{


	/**
	 * 登陆
	 */
	public final static int CG_Login_101 = 101;


	/**
	 * 登陆返回
	 */
	public final static int GC_Login_102 = 102;


	/**
	 * 客户端加载数据已经准备好，申请服务端初始数据
	 */
	public final static int CG_LoadAlready_103 = 103;


	/**
	 * 服务端初始数据已经发送完毕，客户端可以进入场景
	 */
	public final static int GC_LoadAlready_104 = 104;


	/**
	 * 玩家基础数据
	 */
	public final static int GC_HeroData_108 = 108;


	/**
	 * 创建账号
	 */
	public final static int CG_Create_105 = 105;


	/**
	 * 创建角色返回
	 */
	public final static int GC_Create_106 = 106;


	/**
	 * 玩家战斗属性
	 */
	public final static int GC_HeroAttr_110 = 110;


	/**
	 * 转生提升
	 */
	public final static int CG_RebornUp_113 = 113;


	/**
	 * 转生提升返回
	 */
	public final static int GC_RebornUp_114 = 114;


	/**
	 * 玩家操作后发送改变的战斗属性
	 */
	public final static int GC_ChangeFightAttr_120 = 120;


	/**
	 * GC 战斗玩家的属性数据
	 */
	public final static int GC_SendBattleAttr_130 = 130;


	/**
	 * 请求附近玩家数据
	 */
	public final static int CG_AskSceneHeros_131 = 131;


	/**
	 * 请求场景附近玩家数据
	 */
	public final static int GC_AskSceneHeros_132 = 132;


	/**
	 * CG 创建角色界面加载完毕
	 */
	public final static int CG_InCreateRoleUI_133 = 133;


	/**
	 * 请求充值
	 */
	public final static int CG_RequestRecharge_135 = 135;


	/**
	 * 申请充值返回
	 */
	public final static int GC_RequestRecharge_136 = 136;


	/**
	 * 打开充值界面
	 */
	public final static int CG_OpenRecharge_137 = 137;


	/**
	 * 返回充值界面数据
	 */
	public final static int GC_OpenRecharge_138 = 138;


	/**
	 * GC 被挤下线
	 */
	public final static int GC_OffLine_140 = 140;


	/**
	 * GC 是否被封号
	 */
	public final static int GC_FengHao_142 = 142;


	/**
	 * 前端请求改名
	 */
	public final static int CG_ChangeName_143 = 143;


	/**
	 * 改名后端返回
	 */
	public final static int GC_ChangeName_144 = 144;


	/**
	 * GC发送角色基础数据
	 */
	public final static int GC_SendBaseAttr_146 = 146;


	/**
	 * 玩家设置修改
	 */
	public final static int CG_CG_PLAYERSETTING_147 = 147;


	/**
	 * 玩家游戏设置
	 */
	public final static int GC_PLAYERSETTING_148 = 148;


	/**
	 * 操作造成伤害
	 */
	public final static int CG_OperateDamage_149 = 149;


	/**
	 * 操作技能或道具改编战力
	 */
	public final static int CG_OperateStrength_151 = 151;


	/**
	 * 服务端战斗结果更新
	 */
	public final static int GC_OperateStrength_152 = 152;


	/**
	 * CG 获取官衔
	 */
	public final static int CG_GetGuan_153 = 153;


	/**
	 * GC 获取官衔返回
	 */
	public final static int GC_GetGuan_154 = 154;


	/**
	 * CG 升级官衔
	 */
	public final static int CG_UpGuan_155 = 155;


	/**
	 * GC 升官衔返回
	 */
	public final static int GC_UpGuan_156 = 156;


	/**
	 * 发送玩法活动系统状态
	 */
	public final static int GC_ActSystemState_158 = 158;


	/**
	 * 发送系统红点
	 */
	public final static int GC_SendRedPoint_160 = 160;


	/**
	 * 零点重置
	 */
	public final static int GC_ZeroHero_162 = 162;


	/**
	 * 服务端通知提示
	 */
	public final static int GC_NoticeMsg_164 = 164;


	/**
	 * GC 通知前段IOS充值开启关卡数
	 */
	public final static int GC_IosRechargeGK_166 = 166;


	/**
	 * GC 版本号
	 */
	public final static int GC_SendVersion_168 = 168;


	/**
	 * 获取福利大厅公告
	 */
	public final static int CG_GetWelfareNotice_169 = 169;


	/**
	 * 返回福利大厅公告
	 */
	public final static int GC_GetWelfareNotice_170 = 170;


	/**
	 * CG 登录状态流水
	 */
	public final static int CG_Loginstate_171 = 171;


	/**
	 * GC 显示更新公告
	 */
	public final static int GC_Showupdate_172 = 172;


	/**
	 * CG 点开更新公告
	 */
	public final static int CG_Openupdate_173 = 173;


	/**
	 * 心跳包
	 */
	public final static int CG_Heartbeat_181 = 181;
	
	/**
	 * 系统开启 I-系统id，B-2开启 0关闭 
	 */
	public final static int GC_SystemOpen_20100 = 20100;

}