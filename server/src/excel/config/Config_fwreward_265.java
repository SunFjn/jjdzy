package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fwreward_265;
public class Config_fwreward_265 extends ConfigBase<Struct_fwreward_265> {
    private static Config_fwreward_265 ins = null;
    public static Config_fwreward_265 getIns(){
        if(ins==null){
            ins = new Config_fwreward_265();
        }
        return ins;
    }
    private Config_fwreward_265(){
        put(1,new Struct_fwreward_265(1,1803,"[14,0,30,100000],[1,410046,1,9000]",1));
        put(2,new Struct_fwreward_265(2,1804,"[14,0,50,100000],[1,410046,1,30000]",1));
        put(3,new Struct_fwreward_265(3,1805,"[14,0,120,100000],[1,410046,1,32000]",1));
    }
    public void reset(){
        ins = null;
    }
}