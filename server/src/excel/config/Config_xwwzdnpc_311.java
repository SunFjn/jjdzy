package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xwwzdnpc_311;
public class Config_xwwzdnpc_311 extends ConfigBase<Struct_xwwzdnpc_311> {
    private static Config_xwwzdnpc_311 ins = null;
    public static Config_xwwzdnpc_311 getIns(){
        if(ins==null){
            ins = new Config_xwwzdnpc_311();
        }
        return ins;
    }
    private Config_xwwzdnpc_311(){
        put(1,new Struct_xwwzdnpc_311(1,101,34,291005,1001));
        put(2,new Struct_xwwzdnpc_311(2,102,37,291006,1002));
        put(3,new Struct_xwwzdnpc_311(3,103,40,291007,1003));
        put(4,new Struct_xwwzdnpc_311(4,104,43,291008,1004));
        put(5,new Struct_xwwzdnpc_311(5,105,43,291008,1004));
        put(6,new Struct_xwwzdnpc_311(6,106,43,291008,1004));
        put(7,new Struct_xwwzdnpc_311(7,107,43,291008,1004));
        put(8,new Struct_xwwzdnpc_311(8,201,35,291001,2001));
        put(9,new Struct_xwwzdnpc_311(9,202,38,291002,2002));
        put(10,new Struct_xwwzdnpc_311(10,203,41,291003,2003));
        put(11,new Struct_xwwzdnpc_311(11,204,43,291004,2004));
        put(12,new Struct_xwwzdnpc_311(12,205,43,291004,2004));
        put(13,new Struct_xwwzdnpc_311(13,206,43,291004,2004));
        put(14,new Struct_xwwzdnpc_311(14,207,43,291004,2004));
        put(15,new Struct_xwwzdnpc_311(15,301,36,291009,3001));
        put(16,new Struct_xwwzdnpc_311(16,302,39,291010,3002));
        put(17,new Struct_xwwzdnpc_311(17,303,42,291011,3003));
        put(18,new Struct_xwwzdnpc_311(18,304,43,291012,3004));
        put(19,new Struct_xwwzdnpc_311(19,305,43,291012,3004));
        put(20,new Struct_xwwzdnpc_311(20,306,43,291012,3004));
        put(21,new Struct_xwwzdnpc_311(21,307,43,291012,3004));
    }
    public void reset(){
        ins = null;
    }
}