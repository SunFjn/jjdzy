package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_shhx_266;
public class Config_shhx_266 extends ConfigBase<Struct_shhx_266> {
    private static Config_shhx_266 ins = null;
    public static Config_shhx_266 getIns(){
        if(ins==null){
            ins = new Config_shhx_266();
        }
        return ins;
    }
    private Config_shhx_266(){
        put(1,new Struct_shhx_266(1,1,"0","0"));
        put(1002,new Struct_shhx_266(1002,1,"[[4,0,250000]]","[[102,1620000],[103,46000],[104,23000]]"));
        put(2,new Struct_shhx_266(2,2,"0","0"));
        put(2002,new Struct_shhx_266(2002,2,"[[4,0,250000]]","[[102,1620000],[103,46000],[104,23000]]"));
        put(3,new Struct_shhx_266(3,3,"0","0"));
        put(3002,new Struct_shhx_266(3002,3,"[[4,0,250000]]","[[102,1620000],[103,46000],[104,23000]]"));
        put(4,new Struct_shhx_266(4,4,"0","0"));
        put(4002,new Struct_shhx_266(4002,4,"[[4,0,250000]]","[[102,1620000],[103,46000],[104,23000]]"));
    }
    public void reset(){
        ins = null;
    }
}