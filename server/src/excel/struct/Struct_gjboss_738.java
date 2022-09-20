package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_738_国家boss.xlsx
 */
public class Struct_gjboss_738 {
    /**层数*/
    private int cengshu;
    /**通关奖励*/
    private int[][] jiangli;
    /**击杀奖励*/
    private int[][] jisha;
    /**BOSS
	 * [[1,bossID,数量]]
	 * 1 无意义*/
    private int[][] boss;
    /**地图*/
    private int ditu;
    /**BOSS伤害
	 * 每秒掉血X%*/
    private int shanghai;
    /**BOSS固伤
	 * 纯数值*/
    private int guding;
    /**验证时间
	 * 单位为秒*/
    private int time;
    /**
     * 层数
     */
    public int getCengshu() {
        return cengshu;
    }
    /**
     * 通关奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    /**
     * 击杀奖励
     */
    public int[][] getJisha() {
        return jisha;
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
     * 地图
     */
    public int getDitu() {
        return ditu;
    }
    /**
     * BOSS伤害
	 * 每秒掉血X%
     */
    public int getShanghai() {
        return shanghai;
    }
    /**
     * BOSS固伤
	 * 纯数值
     */
    public int getGuding() {
        return guding;
    }
    /**
     * 验证时间
	 * 单位为秒
     */
    public int getTime() {
        return time;
    }
    public Struct_gjboss_738(int cengshu,String jiangli,String jisha,String boss,int ditu,int shanghai,int guding,int time) {
        this.cengshu = cengshu;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.jisha = ExcelJsonUtils.toObj(jisha,int[][].class);
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.ditu = ditu;
        this.shanghai = shanghai;
        this.guding = guding;
        this.time = time;
    }
}