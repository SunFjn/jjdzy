package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_737_连续消费1.xlsx
 */
public class Struct_lxxf1_737 {
    /**天数
	 * 连续消费的天数*/
    private int tianshu;
    /**消耗*/
    private int xiaohao;
    /**补领*/
    private int[][] buling;
    /**奖励*/
    private int[][] jiangli;
    /**监控ID*/
    private int jiankong;
    /**
     * 天数
	 * 连续消费的天数
     */
    public int getTianshu() {
        return tianshu;
    }
    /**
     * 消耗
     */
    public int getXiaohao() {
        return xiaohao;
    }
    /**
     * 补领
     */
    public int[][] getBuling() {
        return buling;
    }
    /**
     * 奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_lxxf1_737(int tianshu,int xiaohao,String buling,String jiangli,int jiankong) {
        this.tianshu = tianshu;
        this.xiaohao = xiaohao;
        this.buling = ExcelJsonUtils.toObj(buling,int[][].class);
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.jiankong = jiankong;
    }
}