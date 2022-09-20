package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_759_异兽boss.xlsx
 */
public class Struct_ysboss_759 {
    /**通关数*/
    private int tgs;
    /**首杀奖励*/
    private int[][] ssjl;
    /**通关奖励*/
    private int[][] tgjl;
    /**BOSS
	 * [[1,bossID,数量]]
	 * 1 无意义*/
    private int[][] boss;
    /**验证时间
	 * 单位秒*/
    private int sj;
    /**地图*/
    private int dt;
    /**
     * 通关数
     */
    public int getTgs() {
        return tgs;
    }
    /**
     * 首杀奖励
     */
    public int[][] getSsjl() {
        return ssjl;
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
     * 验证时间
	 * 单位秒
     */
    public int getSj() {
        return sj;
    }
    /**
     * 地图
     */
    public int getDt() {
        return dt;
    }
    public Struct_ysboss_759(int tgs,String ssjl,String tgjl,String boss,int sj,int dt) {
        this.tgs = tgs;
        this.ssjl = ExcelJsonUtils.toObj(ssjl,int[][].class);
        this.tgjl = ExcelJsonUtils.toObj(tgjl,int[][].class);
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.sj = sj;
        this.dt = dt;
    }
}