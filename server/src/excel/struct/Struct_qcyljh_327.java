package excel.struct;
/**
 * Y_327_运筹帷幄_奇策有礼激活表.xlsx
 */
public class Struct_qcyljh_327 {
    /**编号*/
    private int bianhao;
    /**送礼类型
	 * 1.奇策激活礼
	 * 2.奇策进阶礼
	 * 3.奇策战力礼
	 * 4.奇策星数礼
	 * */
    private int dengji;
    /**期数*/
    private int qishu;
    /**目标RMB*/
    private int rmb;
    /**
     * 编号
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 送礼类型
	 * 1.奇策激活礼
	 * 2.奇策进阶礼
	 * 3.奇策战力礼
	 * 4.奇策星数礼
	 * 
     */
    public int getDengji() {
        return dengji;
    }
    /**
     * 期数
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 目标RMB
     */
    public int getRmb() {
        return rmb;
    }
    public Struct_qcyljh_327(int bianhao,int dengji,int qishu,int rmb) {
        this.bianhao = bianhao;
        this.dengji = dengji;
        this.qishu = qishu;
        this.rmb = rmb;
    }
}