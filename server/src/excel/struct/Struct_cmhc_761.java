package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_761_出谋划策奖励.xlsx
 */
public class Struct_cmhc_761 {
    /**id*/
    private int id;
    /**普通奖励
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String pt;
    /**高级奖励
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String gj;
    /**抽奖一次*/
    private int[][] cj1;
    /**抽奖十次*/
    private int[][] cj2;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 普通奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getPt() {
        return pt;
    }
    /**
     * 高级奖励
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getGj() {
        return gj;
    }
    /**
     * 抽奖一次
     */
    public int[][] getCj1() {
        return cj1;
    }
    /**
     * 抽奖十次
     */
    public int[][] getCj2() {
        return cj2;
    }
    public Struct_cmhc_761(int id,String pt,String gj,String cj1,String cj2) {
        this.id = id;
        this.pt = pt;
        this.gj = gj;
        this.cj1 = ExcelJsonUtils.toObj(cj1,int[][].class);
        this.cj2 = ExcelJsonUtils.toObj(cj2,int[][].class);
    }
}