package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_220_个人BOSS表.xlsx
 */
public class Struct_solo_220 {
    /**boss序列*/
    private int id;
    /**boss*/
    private int[][] boss;
    /**开启条件
	 * jingyu:
	 * [A,B]
	 * A=等级
	 * B=转生id*/
    private int[][] con;
    /**BOSS掉落*/
    private String bd;
    /**复活时间（秒）*/
    private int time;
    /**地图*/
    private int map;
    /**每日可挑战次数*/
    private int fight;
    /**
     * boss序列
     */
    public int getId() {
        return id;
    }
    /**
     * boss
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * 开启条件
	 * jingyu:
	 * [A,B]
	 * A=等级
	 * B=转生id
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
     * 每日可挑战次数
     */
    public int getFight() {
        return fight;
    }
    public Struct_solo_220(int id,String boss,String con,String bd,int time,int map,int fight) {
        this.id = id;
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.con = ExcelJsonUtils.toObj(con,int[][].class);
        this.bd = bd;
        this.time = time;
        this.map = map;
        this.fight = fight;
    }
}