package excel.struct;
/**
 * J_210_技能升级消耗.xlsx
 */
public class Struct_xiaohao_210 {
    /**等级*/
    private int dengji;
    /**铜币*/
    private int xiaohao;
    /**
     * 等级
     */
    public int getDengji() {
        return dengji;
    }
    /**
     * 铜币
     */
    public int getXiaohao() {
        return xiaohao;
    }
    public Struct_xiaohao_210(int dengji,int xiaohao) {
        this.dengji = dengji;
        this.xiaohao = xiaohao;
    }
}