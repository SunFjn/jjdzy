package excel.struct;
/**
 * C_010_超级点将显示2.xlsx
 */
public class Struct_cjdjxs1_010 {
    /**序号*/
    private int xuhao;
    /**期数*/
    private int qishu;
    /**位置*/
    private int weizhi;
    /**
     * 序号
     */
    public int getXuhao() {
        return xuhao;
    }
    /**
     * 期数
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 位置
     */
    public int getWeizhi() {
        return weizhi;
    }
    public Struct_cjdjxs1_010(int xuhao,int qishu,int weizhi) {
        this.xuhao = xuhao;
        this.qishu = qishu;
        this.weizhi = weizhi;
    }
}