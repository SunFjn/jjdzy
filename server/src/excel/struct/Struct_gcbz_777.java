package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_777_攻城拔寨.xlsx
 */
public class Struct_gcbz_777 {
    /**通关数*/
    private int tgs;
    /**下一关*/
    private int xyg;
    /**难度
	 * 1.普通
	 * 2.困难
	 * */
    private int nd;
    /**通关奖励*/
    private int[][] tgjl;
    /**驻守奖励
	 * 每x分钟获得的奖励*/
    private int[][] zsjl;
    /**NPC*/
    private int boss;
    /**战斗地图*/
    private int dt;
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
	 * 
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
     * 驻守奖励
	 * 每x分钟获得的奖励
     */
    public int[][] getZsjl() {
        return zsjl;
    }
    /**
     * NPC
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 战斗地图
     */
    public int getDt() {
        return dt;
    }
    public Struct_gcbz_777(int tgs,int xyg,int nd,String tgjl,String zsjl,int boss,int dt) {
        this.tgs = tgs;
        this.xyg = xyg;
        this.nd = nd;
        this.tgjl = ExcelJsonUtils.toObj(tgjl,int[][].class);
        this.zsjl = ExcelJsonUtils.toObj(zsjl,int[][].class);
        this.boss = boss;
        this.dt = dt;
    }
}