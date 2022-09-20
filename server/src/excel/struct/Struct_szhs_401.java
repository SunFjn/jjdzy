package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-401少主护送配置表.xlsx
 */
public class Struct_szhs_401 {
    /**id*/
    private int id;
    /**品质*/
    private int pz;
    /**护送成功奖励*/
    private int[][] reward;
    /**刷新概率*/
    private int[][] up;
    /**拦截奖励*/
    private int[][] lj;
    /**升级刷新阈值*/
    private int yz;
    /**阈值增加*/
    private int addyz;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 品质
     */
    public int getPz() {
        return pz;
    }
    /**
     * 护送成功奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 刷新概率
     */
    public int[][] getUp() {
        return up;
    }
    /**
     * 拦截奖励
     */
    public int[][] getLj() {
        return lj;
    }
    /**
     * 升级刷新阈值
     */
    public int getYz() {
        return yz;
    }
    /**
     * 阈值增加
     */
    public int getAddyz() {
        return addyz;
    }
    public Struct_szhs_401(int id,int pz,String reward,String up,String lj,int yz,int addyz) {
        this.id = id;
        this.pz = pz;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.up = ExcelJsonUtils.toObj(up,int[][].class);
        this.lj = ExcelJsonUtils.toObj(lj,int[][].class);
        this.yz = yz;
        this.addyz = addyz;
    }
}