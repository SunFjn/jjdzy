package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_508_新活动-幸运福签次数表.xlsx
 */
public class Struct_xyfqcs_508 {
    /**id*/
    private int id;
    /**抽奖次数*/
    private int[][] qs;
    /**抽签概率
	 * 签id，十万分比概率*/
    private int[][] gl;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 抽奖次数
     */
    public int[][] getQs() {
        return qs;
    }
    /**
     * 抽签概率
	 * 签id，十万分比概率
     */
    public int[][] getGl() {
        return gl;
    }
    public Struct_xyfqcs_508(int id,String qs,String gl) {
        this.id = id;
        this.qs = ExcelJsonUtils.toObj(qs,int[][].class);
        this.gl = ExcelJsonUtils.toObj(gl,int[][].class);
    }
}