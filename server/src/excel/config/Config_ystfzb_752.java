package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ystfzb_752;
public class Config_ystfzb_752 extends ConfigBase<Struct_ystfzb_752> {
    private static Config_ystfzb_752 ins = null;
    public static Config_ystfzb_752 getIns(){
        if(ins==null){
            ins = new Config_ystfzb_752();
        }
        return ins;
    }
    private Config_ystfzb_752(){
        put(101,new Struct_ystfzb_752(101,444101));
        put(102,new Struct_ystfzb_752(102,444102));
        put(201,new Struct_ystfzb_752(201,444103));
        put(202,new Struct_ystfzb_752(202,444104));
        put(203,new Struct_ystfzb_752(203,444105));
        put(301,new Struct_ystfzb_752(301,444106));
        put(302,new Struct_ystfzb_752(302,444107));
        put(303,new Struct_ystfzb_752(303,444108));
        put(401,new Struct_ystfzb_752(401,444109));
        put(402,new Struct_ystfzb_752(402,444110));
        put(403,new Struct_ystfzb_752(403,444111));
        put(404,new Struct_ystfzb_752(404,444112));
        put(501,new Struct_ystfzb_752(501,444113));
        put(502,new Struct_ystfzb_752(502,444114));
        put(601,new Struct_ystfzb_752(601,444115));
        put(602,new Struct_ystfzb_752(602,444116));
        put(603,new Struct_ystfzb_752(603,444117));
        put(701,new Struct_ystfzb_752(701,444118));
        put(702,new Struct_ystfzb_752(702,444119));
        put(703,new Struct_ystfzb_752(703,444120));
        put(801,new Struct_ystfzb_752(801,444121));
        put(802,new Struct_ystfzb_752(802,444122));
        put(803,new Struct_ystfzb_752(803,444123));
        put(804,new Struct_ystfzb_752(804,444124));
    }
    public void reset(){
        ins = null;
    }
}