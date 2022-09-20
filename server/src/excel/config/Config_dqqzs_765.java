package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dqqzs_765;
public class Config_dqqzs_765 extends ConfigBase<Struct_dqqzs_765> {
    private static Config_dqqzs_765 ins = null;
    public static Config_dqqzs_765 getIns(){
        if(ins==null){
            ins = new Config_dqqzs_765();
        }
        return ins;
    }
    private Config_dqqzs_765(){
        put(1,new Struct_dqqzs_765(1));
        put(2,new Struct_dqqzs_765(2));
        put(3,new Struct_dqqzs_765(3));
        put(4,new Struct_dqqzs_765(4));
        put(5,new Struct_dqqzs_765(5));
        put(6,new Struct_dqqzs_765(6));
        put(7,new Struct_dqqzs_765(7));
        put(8,new Struct_dqqzs_765(8));
    }
    public void reset(){
        ins = null;
    }
}