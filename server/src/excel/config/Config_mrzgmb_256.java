package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_mrzgmb_256;
public class Config_mrzgmb_256 extends ConfigBase<Struct_mrzgmb_256> {
    private static Config_mrzgmb_256 ins = null;
    public static Config_mrzgmb_256 getIns(){
        if(ins==null){
            ins = new Config_mrzgmb_256();
        }
        return ins;
    }
    private Config_mrzgmb_256(){
        put(1001,new Struct_mrzgmb_256(1001,5009,0,9,"[[1,431220,1]]"));
        put(1002,new Struct_mrzgmb_256(1002,5009,0,14,"[[1,431215,1]]"));
        put(1003,new Struct_mrzgmb_256(1003,5009,0,21,"[[1,431222,1]]"));
        put(2001,new Struct_mrzgmb_256(2001,4526,1,9,"[[1,431218,1]]"));
        put(2002,new Struct_mrzgmb_256(2002,4526,1,14,"[[1,431223,1]]"));
        put(2003,new Struct_mrzgmb_256(2003,4526,1,21,"[[1,431216,1]]"));
        put(2004,new Struct_mrzgmb_256(2004,4526,2,9,"[[1,441010,1]]"));
        put(2005,new Struct_mrzgmb_256(2005,4526,2,14,"[[1,441007,1]]"));
        put(2006,new Struct_mrzgmb_256(2006,4526,2,21,"[[1,441012,1]]"));
        put(2007,new Struct_mrzgmb_256(2007,4526,3,9,"[[1,434007,1]]"));
        put(2008,new Struct_mrzgmb_256(2008,4526,3,14,"[[1,434005,1]]"));
        put(2009,new Struct_mrzgmb_256(2009,4526,3,21,"[[1,434008,1]]"));
        put(3001,new Struct_mrzgmb_256(3001,5010,1,9,"[[1,431218,1]]"));
        put(3002,new Struct_mrzgmb_256(3002,5010,1,14,"[[1,401008,1]]"));
        put(3003,new Struct_mrzgmb_256(3003,5010,1,21,"[[1,447005,1]]"));
        put(3004,new Struct_mrzgmb_256(3004,5010,2,9,"[[1,441010,1]]"));
        put(3005,new Struct_mrzgmb_256(3005,5010,2,14,"[[1,401008,1]]"));
        put(3006,new Struct_mrzgmb_256(3006,5010,2,21,"[[1,447005,1]]"));
        put(3007,new Struct_mrzgmb_256(3007,5010,3,9,"[[1,434007,1]]"));
        put(3008,new Struct_mrzgmb_256(3008,5010,3,14,"[[1,401008,1]]"));
        put(3009,new Struct_mrzgmb_256(3009,5010,3,21,"[[1,447005,1]]"));
        put(3010,new Struct_mrzgmb_256(3010,5010,4,9,"[[1,441010,1]]"));
        put(3011,new Struct_mrzgmb_256(3011,5010,4,14,"[[1,401008,1]]"));
        put(3012,new Struct_mrzgmb_256(3012,5010,4,21,"[[1,447005,1]]"));
        put(3013,new Struct_mrzgmb_256(3013,5010,5,9,"[[1,434007,1]]"));
        put(3014,new Struct_mrzgmb_256(3014,5010,5,14,"[[1,401008,1]]"));
        put(3015,new Struct_mrzgmb_256(3015,5010,5,21,"[[1,447005,1]]"));
    }
    public void reset(){
        ins = null;
    }
}