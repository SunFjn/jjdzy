package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lxlc3_745;
public class Config_lxlc3_745 extends ConfigBase<Struct_lxlc3_745> {
    private static Config_lxlc3_745 ins = null;
    public static Config_lxlc3_745 getIns(){
        if(ins==null){
            ins = new Config_lxlc3_745();
        }
        return ins;
    }
    private Config_lxlc3_745(){
        put(1001,new Struct_lxlc3_745(1001,1,2,"[[1,431220,1]]",47001));
        put(1002,new Struct_lxlc3_745(1002,1,3,"[[1,431215,1]]",47002));
        put(1003,new Struct_lxlc3_745(1003,1,5,"[[1,431222,1]]",47003));
        put(2001,new Struct_lxlc3_745(2001,2,2,"[[1,433004,1]]",47004));
        put(2002,new Struct_lxlc3_745(2002,2,3,"[[1,433005,1]]",47005));
        put(2003,new Struct_lxlc3_745(2003,2,5,"[[1,431216,1]]",47006));
        put(3001,new Struct_lxlc3_745(3001,3,2,"[[1,431220,1]]",47007));
        put(3002,new Struct_lxlc3_745(3002,3,3,"[[1,431215,1]]",47008));
        put(3003,new Struct_lxlc3_745(3003,3,5,"[[1,431222,1]]",47009));
    }
    public void reset(){
        ins = null;
    }
}