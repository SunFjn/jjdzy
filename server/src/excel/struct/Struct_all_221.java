package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_221_全民BOSS表.xlsx
 */
public class Struct_all_221 {
    /**boss序列*/
    private int id;
    /**boss
	 * jingyu:
	 * [1,BOSSID,数量]
	 * 1 无意义
	 * */
    private int[][] boss;
    /**开启条件
	 * jingyu:
	 * [A,B]
	 * A=等级
	 * B=转数*/
    private int[][] con;
    /**BOSS掉落*/
    private String bd;
    /**伤害第一奖励*/
    private int[][] mvp;
    /**复活时间（秒）*/
    private int time;
    /**地图*/
    private int map;
    /**是否单打
	 * Windows 用户:
	 * 
	 * 1：单打，其他玩家无法进入副本
	 * 0：非单打，其他玩家可进入副本*/
    private int single;
    /**机器人*/
    private int[][] robot;
    /**
     * boss序列
     */
    public int getId() {
        return id;
    }
    /**
     * boss
	 * jingyu:
	 * [1,BOSSID,数量]
	 * 1 无意义
	 * 
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * 开启条件
	 * jingyu:
	 * [A,B]
	 * A=等级
	 * B=转数
     */
    public int[][] getCon() {
        return con;
    }
    /**
     * BOSS掉落
     */
    public String getBd() {
        return bd;
    }
    /**
     * 伤害第一奖励
     */
    public int[][] getMvp() {
        return mvp;
    }
    /**
     * 复活时间（秒）
     */
    public int getTime() {
        return time;
    }
    /**
     * 地图
     */
    public int getMap() {
        return map;
    }
    /**
     * 是否单打
	 * Windows 用户:
	 * 
	 * 1：单打，其他玩家无法进入副本
	 * 0：非单打，其他玩家可进入副本
     */
    public int getSingle() {
        return single;
    }
    /**
     * 机器人
     */
    public int[][] getRobot() {
        return robot;
    }
    public Struct_all_221(int id,String boss,String con,String bd,String mvp,int time,int map,int single,String robot) {
        this.id = id;
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.con = ExcelJsonUtils.toObj(con,int[][].class);
        this.bd = bd;
        this.mvp = ExcelJsonUtils.toObj(mvp,int[][].class);
        this.time = time;
        this.map = map;
        this.single = single;
        this.robot = ExcelJsonUtils.toObj(robot,int[][].class);
    }
}