package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bwxs_740;
public class Config_bwxs_740 extends ConfigBase<Struct_bwxs_740> {
    private static Config_bwxs_740 ins = null;
    public static Config_bwxs_740 getIns(){
        if(ins==null){
            ins = new Config_bwxs_740();
        }
        return ins;
    }
    private Config_bwxs_740(){
        put(1,new Struct_bwxs_740(1,"[[1,200014,1]]","[1,431201,1,21430;1,431204,1,21430;1,431202,1,19050;1,431203,1,19050;1,431207,1,19040]"));
    }
    public void reset(){
        ins = null;
    }
}