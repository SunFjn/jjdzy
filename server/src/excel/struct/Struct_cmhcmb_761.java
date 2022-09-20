package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_761_出谋划策目标奖励.xlsx
 */
public class Struct_cmhcmb_761 {
    /**id*/
    private int id;
    /**抽奖次数*/
    private int pt;
    /**奖励
	 * 道具类型，道具id，道具数量，*/
    private int[][] gj;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 抽奖次数
     */
    public int getPt() {
        return pt;
    }
    /**
     * 奖励
	 * 道具类型，道具id，道具数量，
     */
    public int[][] getGj() {
        return gj;
    }
    public Struct_cmhcmb_761(int id,int pt,String gj) {
        this.id = id;
        this.pt = pt;
        this.gj = ExcelJsonUtils.toObj(gj,int[][].class);
    }
}