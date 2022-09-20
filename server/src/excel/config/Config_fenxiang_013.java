package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fenxiang_013;
public class Config_fenxiang_013 extends ConfigBase<Struct_fenxiang_013> {
    private static Config_fenxiang_013 ins = null;
    public static Config_fenxiang_013 getIns(){
        if(ins==null){
            ins = new Config_fenxiang_013();
        }
        return ins;
    }
    private Config_fenxiang_013(){
        put(1,new Struct_fenxiang_013(1,"[[1,433001,1],[2,910260,1],[2,910261,1],[3,0,50000],[1,410001,50]]",13));
    }
    public void reset(){
        ins = null;
    }
}