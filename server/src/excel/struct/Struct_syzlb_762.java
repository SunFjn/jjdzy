package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_762三英战吕布.xlsx
 */
public class Struct_syzlb_762 {
    /**通关数*/
    private int tgs;
    /**下一关*/
    private int xyg;
    /**难度
	 * 1.普通
	 * 2.困难
	 * 3.噩梦
	 * 4.传说*/
    private int nd;
    /**通关奖励*/
    private int[][] tgjl;
    /**BOSS
	 * [[1,bossID,数量]]
	 * 1 无意义*/
    private int[][] boss;
    /**战斗地图*/
    private int dt;
    /**场景地图*/
    private int dt2;
    /**生成点
	 * boss生成点
	 * x，y*/
    private int[][] sc;
    /**
     * 通关数
     */
    public int getTgs() {
        return tgs;
    }
    /**
     * 下一关
     */
    public int getXyg() {
        return xyg;
    }
    /**
     * 难度
	 * 1.普通
	 * 2.困难
	 * 3.噩梦
	 * 4.传说
     */
    public int getNd() {
        return nd;
    }
    /**
     * 通关奖励
     */
    public int[][] getTgjl() {
        return tgjl;
    }
    /**
     * BOSS
	 * [[1,bossID,数量]]
	 * 1 无意义
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * 战斗地图
     */
    public int getDt() {
        return dt;
    }
    /**
     * 场景地图
     */
    public int getDt2() {
        return dt2;
    }
    /**
     * 生成点
	 * boss生成点
	 * x，y
     */
    public int[][] getSc() {
        return sc;
    }
    public Struct_syzlb_762(int tgs,int xyg,int nd,String tgjl,String boss,int dt,int dt2,String sc) {
        this.tgs = tgs;
        this.xyg = xyg;
        this.nd = nd;
        this.tgjl = ExcelJsonUtils.toObj(tgjl,int[][].class);
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.dt = dt;
        this.dt2 = dt2;
        this.sc = ExcelJsonUtils.toObj(sc,int[][].class);
    }
}