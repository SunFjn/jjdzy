package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_kssjbuy1_338;
public class Config_kssjbuy1_338 extends ConfigBase<Struct_kssjbuy1_338> {
    private static Config_kssjbuy1_338 ins = null;
    public static Config_kssjbuy1_338 getIns(){
        if(ins==null){
            ins = new Config_kssjbuy1_338();
        }
        return ins;
    }
    private Config_kssjbuy1_338(){
        put(101,new Struct_kssjbuy1_338(101,1,"[[4,0,15000]]",1));
        put(102,new Struct_kssjbuy1_338(102,2,"[[4,0,15000]]",1));
        put(103,new Struct_kssjbuy1_338(103,3,"[[4,0,15000]]",1));
        put(201,new Struct_kssjbuy1_338(201,1,"[[4,0,100000]]",2));
        put(202,new Struct_kssjbuy1_338(202,2,"[[4,0,100000]]",2));
        put(203,new Struct_kssjbuy1_338(203,3,"[[4,0,100000]]",2));
        put(301,new Struct_kssjbuy1_338(301,1,"[[4,0,15000]]",3));
        put(302,new Struct_kssjbuy1_338(302,2,"[[4,0,15000]]",3));
        put(303,new Struct_kssjbuy1_338(303,3,"[[4,0,15000]]",3));
        put(401,new Struct_kssjbuy1_338(401,1,"[[4,0,100000]]",4));
        put(402,new Struct_kssjbuy1_338(402,2,"[[4,0,100000]]",4));
        put(403,new Struct_kssjbuy1_338(403,3,"[[4,0,100000]]",4));
        put(501,new Struct_kssjbuy1_338(501,1,"[[4,0,15000]]",5));
        put(502,new Struct_kssjbuy1_338(502,2,"[[4,0,15000]]",5));
        put(503,new Struct_kssjbuy1_338(503,3,"[[4,0,15000]]",5));
        put(601,new Struct_kssjbuy1_338(601,1,"[[4,0,100000]]",6));
        put(602,new Struct_kssjbuy1_338(602,2,"[[4,0,100000]]",6));
        put(603,new Struct_kssjbuy1_338(603,3,"[[4,0,100000]]",6));
        put(10101,new Struct_kssjbuy1_338(10101,1,"[[4,0,15000]]",101));
        put(10102,new Struct_kssjbuy1_338(10102,2,"[[4,0,15000]]",101));
        put(10103,new Struct_kssjbuy1_338(10103,3,"[[4,0,15000]]",101));
        put(20101,new Struct_kssjbuy1_338(20101,1,"[[4,0,100000]]",201));
        put(20102,new Struct_kssjbuy1_338(20102,2,"[[4,0,100000]]",201));
        put(20103,new Struct_kssjbuy1_338(20103,3,"[[4,0,100000]]",201));
    }
    public void reset(){
        ins = null;
    }
}