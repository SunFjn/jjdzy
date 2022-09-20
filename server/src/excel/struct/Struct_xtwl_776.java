package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_776_许田围猎.xlsx
 */
public class Struct_xtwl_776 {
    /**序号*/
    private int id;
    /**类型
	 * Administrator:
	 * 1.普通奖励
	 * 2.高级奖励*/
    private int lx;
    /**奖励
	 * 道具类型，道具id，道具数量，*/
    private int[][] jl;
    /**坐骑模型*/
    private int mx;
    /**出场概率*/
    private int ccgl;
    /**击中概率
	 * Administrator:
	 * 每次射击获得的概率*/
    private int jzgl;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 类型
	 * Administrator:
	 * 1.普通奖励
	 * 2.高级奖励
     */
    public int getLx() {
        return lx;
    }
    /**
     * 奖励
	 * 道具类型，道具id，道具数量，
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 坐骑模型
     */
    public int getMx() {
        return mx;
    }
    /**
     * 出场概率
     */
    public int getCcgl() {
        return ccgl;
    }
    /**
     * 击中概率
	 * Administrator:
	 * 每次射击获得的概率
     */
    public int getJzgl() {
        return jzgl;
    }
    public Struct_xtwl_776(int id,int lx,String jl,int mx,int ccgl,int jzgl) {
        this.id = id;
        this.lx = lx;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.mx = mx;
        this.ccgl = ccgl;
        this.jzgl = jzgl;
    }
}