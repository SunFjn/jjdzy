package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_323_虎牢关表.xlsx
 */
public class Struct_hlg_323 {
    /**层数*/
    private int cs;
    /**通关奖励*/
    private int[][] tg;
    /**BOSS*/
    private int boss;
    /**地图*/
    private int dt;
    /**BOSS伤害
	 * 每秒掉血X%*/
    private int sh1;
    /**BOSS固伤
	 * 纯数值*/
    private int sh2;
    /**验证时间
	 * 单位为秒*/
    private int time;
    /**
     * 层数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 通关奖励
     */
    public int[][] getTg() {
        return tg;
    }
    /**
     * BOSS
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 地图
     */
    public int getDt() {
        return dt;
    }
    /**
     * BOSS伤害
	 * 每秒掉血X%
     */
    public int getSh1() {
        return sh1;
    }
    /**
     * BOSS固伤
	 * 纯数值
     */
    public int getSh2() {
        return sh2;
    }
    /**
     * 验证时间
	 * 单位为秒
     */
    public int getTime() {
        return time;
    }
    public Struct_hlg_323(int cs,String tg,int boss,int dt,int sh1,int sh2,int time) {
        this.cs = cs;
        this.tg = ExcelJsonUtils.toObj(tg,int[][].class);
        this.boss = boss;
        this.dt = dt;
        this.sh1 = sh1;
        this.sh2 = sh2;
        this.time = time;
    }
}