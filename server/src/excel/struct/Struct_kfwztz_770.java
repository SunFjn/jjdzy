package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_770_跨服王者-挑战表.xlsx
 */
public class Struct_kfwztz_770 {
    /**转生区间*/
    private int zs;
    /**胜利奖励*/
    private int[][] sljl;
    /**失败奖励*/
    private int[][] sbjl;
    /**胜利积分*/
    private int win;
    /**失败积分*/
    private int lose;
    /**连胜积分
	 * Administrator:
	 * */
    private int lsjf;
    /**每场积分上限
	 * Administrator:
	 * 每场积分上限=胜利基础积分+连胜积分*/
    private int max;
    /**
     * 转生区间
     */
    public int getZs() {
        return zs;
    }
    /**
     * 胜利奖励
     */
    public int[][] getSljl() {
        return sljl;
    }
    /**
     * 失败奖励
     */
    public int[][] getSbjl() {
        return sbjl;
    }
    /**
     * 胜利积分
     */
    public int getWin() {
        return win;
    }
    /**
     * 失败积分
     */
    public int getLose() {
        return lose;
    }
    /**
     * 连胜积分
	 * Administrator:
	 * 
     */
    public int getLsjf() {
        return lsjf;
    }
    /**
     * 每场积分上限
	 * Administrator:
	 * 每场积分上限=胜利基础积分+连胜积分
     */
    public int getMax() {
        return max;
    }
    public Struct_kfwztz_770(int zs,String sljl,String sbjl,int win,int lose,int lsjf,int max) {
        this.zs = zs;
        this.sljl = ExcelJsonUtils.toObj(sljl,int[][].class);
        this.sbjl = ExcelJsonUtils.toObj(sbjl,int[][].class);
        this.win = win;
        this.lose = lose;
        this.lsjf = lsjf;
        this.max = max;
    }
}