package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zyx_775;
public class Config_zyx_775 extends ConfigBase<Struct_zyx_775> {
    private static Config_zyx_775 ins = null;
    public static Config_zyx_775 getIns(){
        if(ins==null){
            ins = new Config_zyx_775();
        }
        return ins;
    }
    private Config_zyx_775(){
        put(1,new Struct_zyx_775(1,"[[24,0,1],[25,0,1],[26,0,1]]","[[1,410430,1,40000,0],[1,410431,1,30000,0],[1,410432,1,20000,0],[1,410433,1,10000,1]]"));
        put(2,new Struct_zyx_775(2,"[[24,0,1],[25,0,1],[26,0,1]]","[[1,410430,1,40000,0],[1,410431,1,30000,0],[1,410432,1,20000,0],[1,410433,1,10000,1]]"));
        put(3,new Struct_zyx_775(3,"[[24,0,1],[25,0,1],[26,0,1]]","[[1,410430,1,40000,0],[1,410431,1,30000,0],[1,410432,1,20000,0],[1,410433,1,10000,1]]"));
    }
    public void reset(){
        ins = null;
    }
}