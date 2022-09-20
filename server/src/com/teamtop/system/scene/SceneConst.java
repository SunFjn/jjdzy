package com.teamtop.system.scene;
/**
 * 场景常量类
 * 类名称：SceneConst
 * 类描述：
 * 创建人：Kyle
 * 创建时间：2012-7-16 上午07:40:30
 * 修改备注：
 * @version 1.0.0
 *
 */
public class SceneConst {
	/**	 * 可视范围总长度(px)	 */
	public static final int LENGTH = 1150;
	/**	 * 可视范围总高度(px)	 */
	public static final int HIGH = 1800;
	/**	 * 用ROW行表示总长度  横行	 */
	public static final int ROW = 5;
	/**	 * 用COL列表总高度   竖行	 */
	public static final int COL = 5;
	/**	 * X轴最小格子	 */
	public static final int GRID_X_MIN = 1;
	/**	 * X轴最大格子	 */
	public static final int GRID_X_MAX = 30;
	/**	 * Y轴最小格子	 */
	public static final int GRID_Y_MIN = 1;
	/**	 * Y轴最大格子	 */
	public static final int GRID_Y_MAX = 30;
	/**	 * 可行走区域到坐标转换	 */
	public static final int CANWARL_POSX_TRANS = 32;
	/**	 * 可行走区域到坐标转换	 */
	public static final int CANWARL_POSY_TRANS = 32;
	/**
	 * 用于记录坐标xy到int上时的基数
	 * colrow = row * 10000 + col
	 * row = colrow / 10000
	 * col = colrow % 10000
	 */
	public static final int GRID_MIX = 10000;
	/**	 * 默认移动速度	 */
	public static final int SPEED_INIT = 200;
	
	/**	 * 玩家	 */
	public static final int PLAYER = 1;	
	/**	 * NPC	 */
	public static final int NPC = 2;
	/**	 * 战斗NPC	 */
	public static final int ZHANDOU_NPC = 3;
	/**	 * 掉落物	 */
	public static final int ITEM = 4;
	/**	 * 跳转点	 */
	public static final int JUMP_POINT = 5;
	/**	 * 复活点	 */
	public static final int FU_HUO_POINT = 6;
	/**	 * 开始点	 */
	public static final int START_POINT = 7;
	/**	 * 特效	 */
	public static final int MAGIC = 8;
	
	
	/**	 * 地图跳转:指定跳到那里	 */
	public static final int TRANS_SPECIFY = 1;
	/**	 * 地图跳转:在某张地图的可行走区域随机	 */
	public static final int TRANS_RANDOM_IN_SCENE = 2;
	/**	 * 地图跳转:在某张地图的指定区域随机	 */
	public static final int TRANS_RANDOM_WITH_SPECIFY_IN_SCENE = 3;
	/**	 * 地图跳转:出生点	 */
	public static final int TRANS_BORN = 4;
	/**	 * 地图跳转:进入前的点	 */
	public static final int TRANS_PRE = 5;
	/**	 * 地图跳转:不变	 */
	public static final int TRANS_NO_CHANGE = 6;
	/**	 * 地图跳转:神行马	 */
	public static final int TRANS_SHENXING = 7;
	
	
	/**	 * 地图类型:1.补给地图	 */
	public static final int IS_SUPPLY_SCENE = 1;
	/**	 * 地图类型:2.副本地图	 */
	public static final int IS_TASK_COPY_SCENE = 2;
	/**	 * 地图类型:3.世界BOSS	 */
	public static final int IS_WORLDBOSS_AREA_SCENE = 3;
	/**	 * 地图类型:4.房间	 */
	public static final int IS_ROOM = 4;
	/**	 * 地图类型:5.问鼎天下	 */
	public static final int IS_WEN_DING_TIAN_DAO = 5;
	/**	 * 地图类型:6.本服boss战场	 */
	public static final int ZCBOSS=6;
	/**	 * 地图类型:7.跨服boss战场	 */
	public static final int CROSS_ZCBOSS=7;
	/**	 * 地图类型:8.三国一统	 */	
	public static final int UNIFYCOUNTRY=8;
	/**	 * 地图类型:9.粮草抢夺	 */	
	public static final int BATTLEGOODS=9;
	/**	 * 地图类型:10.三英战吕布	 */
	public static final int THREE_HERO_FIGHT_LVBU = 10;
	/** * 地图类型:12.府邸 */
	public static final int HOUSE = 12;
	/**	 * 地图类型:11.宴会	 */
	public static final int YANHUI=11;
	
	
	/**	 * 地图ID:问鼎天下地图1	 */
	public static final int SCENE_ID_WDTX1 = 380001;
	/**	 * 地图ID:问鼎天下地图2	 */
	public static final int SCENE_ID_WDTX2 = 380002;
	/**	 * 地图ID:问鼎天下地图3	 */
	public static final int SCENE_ID_WDTX3 = 380003;
	/**	 * 地图ID:问鼎天下地图4	 */
	public static final int SCENE_ID_WDTX4 = 380004;
	/**	 * 地图ID:问鼎天下地图5	 */
	public static final int SCENE_ID_WDTX5 = 380005;
	/**	 * 地图ID:问鼎天下地图6	 */
	public static final int SCENE_ID_WDTX6 = 380006;
	/**	 * 地图ID:问鼎天下地图7	 */
	public static final int SCENE_ID_WDTX7 = 380007;
	/**  * 地图系统ID：粮草抢夺*/
	public static final int SCENE_SYSID_BATTLEGOOD=400002;
	/**  * 地图系统ID：宴会*/
	public static final int SCENE_SYSID_YANHUI = 403001;
	
	
	
	
	
	/**	 * 无飞鞋跳转时费用	 */
	public static final int CHANGE_SCENE_COST = 3*1000;
	/**	 * 飞鞋系统ID	 */
	public static final int FLYSHOES = 41047;
	/**	 * 跳转场景时离跳转点的最大距离	 */
	public static final int MAX_DISTANCE = 100000;
	/**	 * 新手村地图系统id	 */
	public static final int ID_SCENE_DONG_XI = 30010001;
	/**	 * 主城地图id	 */
	public static final int MAIN_SCENE_ID = 30010003;
	/**	 * 新手地图第一条线路的最少人数	 */
	public static final int ROLE_NUM_LINE_ONE_FIRST_SCENE = 100;
	/**	 * 分线方式:无分线	 */
	public static final int MODE_LINE_NONE = 0;
	/**	 * 分线方式:填充分线	 */
	public static final int MODE_LINE_FULL = 1;
	/**	 * 分线方式:平均分线	 */
	public static final int MODE_LINE_AVERAGE = 2;
	/**	 * 角色可视范围:左边可见格子	 */
	public static final int LEFT_CAN_SEE = 2;
	/**	 * 角色可视范围:右边可见格子	 */
	public static final int RIGHT_CAN_SEE = 2;
	/**	 * 角色可视范围:上边可见格子	 */
	public static final int UP_CAN_SEE = 2;
	/**	 * 角色可视范围:下边可见格子	 */
	public static final int DOWN_CAN_SEE = 2;
	
	/**	 * 宋江NPCID	 */
	public static final int NPCID_SONGJIANG=51043;
	/**	 * 婚宴地图	 */
	public static final int WEDDING = 30050001;
	/**	 * 人和NPC场景状态：正常	 */
	public static final int STATE_NORMAL = 0;
	/**	 * 人和NPC场景状态：战斗	 */
	public static final int STATE_BATTLE = 1;
	/**	 * 人和NPC场景状态：冻结	 */
	public static final int STATE_FROZEN = 2;
	/**	 * 相同场景跳转	 */
	public static final int CHANGE_SCENE_TYPE_SAME = 1;
	/**	 * 1.随机坐标类型 坐标判断	 */
	public static final int RANDOM_POINT_TYPE_POINT = 1;
	/**	 * 2.随机坐标类型 跳转点判断	 */
	public static final int RANDOM_POINT_TYPE_JUMPPOINT = 2;
	/**	 * 3.随机坐标类型 坐标跟调转点都判断	 */
	public static final int RANDOM_POINT_TYPE_ALL = 3;
	/**	 * 场景控制：本地	 */
	public static final int SCENE_CONTROL_LOCAL = 1;
	/**	 * 场景控制：跨服	 */
	public static final int SCENE_CONTROL_CROSS = 2;
	
	
	////////////////////地图内元素关键字
	/**	 * 场景元素，矩形随机出生点用	 */
	public static final String rdRectBorn = "rdRectBorn";
	/**	 * 场景元素，圆形随机出生点用	 */
	public static final String rdCircleBorn = "rdCircleBorn";
	/**	 * 场景元素，矩形+圆形随机出生点用	 */
	public static final String rdCircleRect = "rdCircleRect";
	
	
	
}
