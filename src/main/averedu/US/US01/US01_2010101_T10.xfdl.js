(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("form");
            this.set_titletext("상담");
            if (Form == this.constructor)
            {
                this._setFormPosition(1640,800);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMaster", this);
            obj.set_enableevent("true");
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_preload("true");
            obj.set_updatecontrol("true");
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"HAKBEON\" type=\"STRING\" size=\"10\"/><Column id=\"SANGDAM_SEQ\" type=\"STRING\" size=\"3\"/><Column id=\"SANGDAM_DT\" type=\"STRING\" size=\"8\"/><Column id=\"SANGDAM_GYOSU_CD\" type=\"STRING\" size=\"10\"/><Column id=\"SANGDAM_GYOSU_NM\" type=\"STRING\" size=\"65532\"/><Column id=\"SANGDAM_YYYY\" type=\"STRING\" size=\"4\"/><Column id=\"SANGDAM_HAKGI\" type=\"STRING\" size=\"2\"/><Column id=\"SANGDAM_HAKGI_NM\" type=\"STRING\" size=\"65532\"/><Column id=\"HAKNYEON\" type=\"STRING\" size=\"1\"/><Column id=\"DAEHAK_CD\" type=\"STRING\" size=\"10\"/><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"10\"/><Column id=\"JEONGONG_CD\" type=\"STRING\" size=\"10\"/><Column id=\"SANGDAM_SIJAK_TM\" type=\"STRING\" size=\"4\"/><Column id=\"SANGDAM_JONGRYO_TM\" type=\"STRING\" size=\"4\"/><Column id=\"SANGDAM_NAEYONG\" type=\"STRING\" size=\"4000\"/><Column id=\"BIGO\" type=\"STRING\" size=\"500\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_input", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"HAKBEON\" type=\"STRING\" size=\"10\"/><Column id=\"SANGDAM_GYOSU_CD\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsHakgi", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"32\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsHaknyeon", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"32\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsBaseYyyyHakgi", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"YYYY\" type=\"STRING\" size=\"256\"/><Column id=\"HAKGI\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("grdChucheonseo","283","34",null,null,"1357","380",null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_autofittype("col");
            obj.set_autoenter("select");
            obj.set_cellsizingtype("col");
            obj.set_autoupdatetype("itemselect");
            obj.set_cellclickbound("cell");
            obj.set_binddataset("");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"73\"/><Column size=\"250\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"No\"/><Cell col=\"1\" text=\"작성일자\"/></Band><Band id=\"body\"><Cell displaytype=\"normal\" expr=\"expr:(dataset.getRowType(currow)) == &apos;2&apos; ? &apos;+&apos;:(dataset.getRowType(currow)) == &apos;4&apos; ? &apos;U&apos;:currow+1\" edittype=\"none\" textAlign=\"center\"/><Cell col=\"1\" displaytype=\"date\" edittype=\"none\" textAlign=\"center\" text=\"bind:JAKSEONG_DT\" editmaxlength=\"8\" calendardisplaynulltype=\"none\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stc_09","7","11","150","22",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("학생 상담 목록");
            obj.set_cssclass("sta_WF_Title02");
            this.addChild(obj.name, obj);

            obj = new Static("stc_09_00","276","11","120","22",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("상담상세정보");
            obj.set_cssclass("sta_WF_Title02");
            this.addChild(obj.name, obj);

            obj = new Static("stc_13_06","279","34",null,"28","10",null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_cssclass("sta_WF_DetailBg");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_06","279","34","70","28",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("상담일자");
            obj.set_cssclass("sta_WF_DetailTi");
            this.addChild(obj.name, obj);

            obj = new Calendar("calSangdamDt","352","37","96","22",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_readonly("false");
            obj.set_enable("true");
            obj.set_cssclass("point");
            this.addChild(obj.name, obj);

            obj = new Static("stc_13_06_00_00_01_00","279","61",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_cssclass("sta_WF_DetailBg");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_06_00_01_01_00","279","61","70",null,null,"10",null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("상담내용");
            obj.set_cssclass("sta_WF_DetailTi");
            this.addChild(obj.name, obj);

            obj = new Edit("edtSangdamDt","352","64",null,null,"15","15",null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_enable("true");
            this.addChild(obj.name, obj);

            obj = new Button("btnDel",null,"5","52","22","10",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("삭제");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Static("staRowCnt","139","9","53","24",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("[총 <fc v=\'red\'><b v=\'true\'>0 </b></fc>건]");
            obj.set_usedecorate("true");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","233","0","100","35",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_text("↑\r\n35\r\n↓");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 7pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_00_00_00_00","8","27","1630","8",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_text("8");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_01","0","9","10","477",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.addChild(obj.name, obj);

            obj = new Grid("grdMaster","10","35","259",null,null,"10",null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_autofittype("col");
            obj.set_autoenter("select");
            obj.set_cellsizingtype("col");
            obj.set_autoupdatetype("itemselect");
            obj.set_cellclickbound("cell");
            obj.set_binddataset("dsMaster");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"35\"/><Column size=\"144\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"No\"/><Cell col=\"1\" text=\"상담일자\"/></Band><Band id=\"body\"><Cell expr=\"expr:(dataset.getRowType(currow)) == &apos;2&apos; ? &apos;+&apos;:(dataset.getRowType(currow)) == &apos;4&apos; ? &apos;U&apos;:currow+1\"/><Cell col=\"1\" text=\"bind:SANGDAM_DT\" displaytype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltype=\"none\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_01_00","269","9","10","477",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_06_00","450","34","50","28",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_text("년도");
            obj.set_cssclass("sta_WF_DetailTi");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Combo("cboSangdamHakgi","652","37","96","22",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_innerdataset("dsHakgi");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("CODE_NM");
            obj.set_visible("true");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_06_00_00","600","34","50","28",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_text("학기");
            obj.set_cssclass("sta_WF_DetailTi");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Spin("spnSangdamYYYY","502","37","96","22",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_06_00_00_00","750","34","50","28",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_text("학년");
            obj.set_cssclass("sta_WF_DetailTi");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Combo("cboSangdamHaknyeon","802","37","96","22",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_innerdataset("dsHaknyeon");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("CODE_NM");
            obj.set_visible("true");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_06_00_00_00_00","900","34","70","28",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_text("시작시간");
            obj.set_cssclass("sta_WF_DetailTi");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("mdtSangdamFrTm","972","37","96","22",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_format("##:##");
            obj.set_type("string");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_06_00_00_00_00_00","1070","34","70","28",null,null,null,null,null,null,this);
            obj.set_taborder("28");
            obj.set_text("종료시간");
            obj.set_cssclass("sta_WF_DetailTi");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("mdtSangdamToTm","1142","37",null,"22","15",null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_format("##:##");
            obj.set_type("string");
            obj.set_visible("true");
            this.addChild(obj.name, obj);

            obj = new Button("btnRet",null,"5","52","22","181",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("조회");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnNew",null,"5","52","22","124",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnSave",null,"5","52","22","67",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("저장");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1640,800,this,function(p){});
            obj.set_description("상담");
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item14","cboSangdamHaknyeon","value","dsMaster","HAKNYEON");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","calSangdamDt","value","dsMaster","SANGDAM_DT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","edtSangdamDt","value","dsMaster","SANGDAM_NAEYONG");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","cboSangdamHakgi","value","dsMaster","SANGDAM_HAKGI");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","spnSangdamYYYY","value","dsMaster","SANGDAM_YYYY");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item0","mdtSangdamFrTm","value","dsMaster","SANGDAM_SIJAK_TM");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","mdtSangdamToTm","value","dsMaster","SANGDAM_JONGRYO_TM");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("data","","dsMaster");
        };
        
        // User Script
        this.registerScript("US01_2010101_T10.xfdl", function() {
        /**********************************************************************
        * FormID(화면   ID명): US01_2010101_T10.xfdl(상담내역 관리(조회))
        * 작 성         일 명: jiback
        * 작 성         일 자: 2021/09/08
        * 변 경         일 자:
        * 변 경         자 명:
        * 변경 및 수정 로그 : 일자별로 변경자 및 변경사항을 간략히 기술
        */
        /**********************************************************************
                01. 전처리 공통 함수 선언
        ***********************************************************************/
        /**********************************************************************
                02. 폼 변수 정의
        ***********************************************************************/
        this.lvchkColidDs   = "SANGDAM_DT";                        // 필수 입력사항 칼럼ID  예)  "commSmcd$commName"
        this.lvchkColNameDs = "상담일자";
        /**********************************************************************
                03. 폼 로드 및 닫을때(폼이 포커스 갈때)
        ***********************************************************************/
        /**
         * 기능 : 폼 로드 완료후 초기값 Setting
         */
        this.form_onload = function(obj,e)
        {
            //폼에 공통으로 로드시 사용하는 함수.
            this.gfn_formOnload(obj.e);
            //사용자 화면  초기화 함수
            this.fn_formInit();
        };

        /**********************************************************************
                04. 공통 코드 및 콤보 데이타 조회
        ***********************************************************************/
        this.fn_formInit = function()
        {
            var strDs    = "dsHakgi|dsHaknyeon";                    // 데이터를 받을 데이터셋리스트     예) "DS_CODE01|DS_CODE02|DS_CODE03"
            var strLgcd  = "00022|00060";                           // 공통코드 중분류 코드, 데이터셋 개수와 같아야 한다. 예) "Z01|Z02|Z03"
            var strComb  = "S|S";                                   // 콤보옵션 (T:전체, S:선택, N:공백, X:해당사항없음)
            var strOptn  = "";                                      // 조건문 " AND COMM_IT02 = '" + vip + "'|||";
            var svcId    = "Init";

                // gfn_CmmnMultiComboLoad(데이터셋 리스트, 대분류코드 , 콤보 옵션);
                // 서비스 ID : 코드 조회 실행 후 CALLBACK 함수 지정.

            this.gfn_CmmnMultiComboLoad(strDs
                                      , strLgcd
                                      , strComb
                                      , strOptn
                                      , svcId);

        	// 기준연도학기
            strDs    = "dsBaseYyyyHakgi";        // 데이터를 받을 데이터셋리스트     예) "dsBaseYyyyHakgi"
            svcId    = "baseYyyyHakgiInit";
        	var strEopmuGbcd = "US";
        	var strUseYn     = "1";
            // gfn_BaseYyyyHakgiLoad(데이터셋, svcId , 업무구분, 사용구분);
            // 서비스 ID : 코드 조회 실행 후 CALLBACK 함수 지정.
            this.gfn_BaseYyyyHakgiLoad(strDs
                                      , svcId
                                      , strEopmuGbcd
                                      , strUseYn);

        };

        /**
         * 기능 : 콜백함수(후처리)
         */
        this.fn_callBack = function(sSvcId,nErrorCode, sErrorMsg)
        {

            this.gfn_clearSortAll(this.grdMaster);
            if(nErrorCode != 0)
            {
                this.gfn_alert(sErrorMsg,"에러정보","","error");
                return false;
            }else
            {
                /*sSvcId (Transaction Id)*/
                switch(sSvcId)
                {
                    case "Ret":
                            this.fn_PostRet();
                        break;
                    case "Save":
                            this.fn_PostSave();
                        break;
                    case "New":
                            this.fn_PostNew();
                        break;
                    case "Del":
                            this.fn_PostDel();
                        break;
                    default:
                        break;
                }
            }
        };

        /**********************************************************************
                05. 조회 함수 선언(마스터 함수)
        ***********************************************************************/
        this.btnRet_onclick = function(obj,e)
        {
        	if(this.fn_beforeRet())
        	{
        		var result = this.gfn_confirm( "변경된 데이터가 있습니다. 그래도 이동하시겠습니까?", "저장","", "question" );
        		if(result == 0)
        		{
        			return false;
        		}
        	}
        	this.fn_Ret(this.ds_input.getColumn(0, "HAKBEON"));
        };

        /**
         * 기능 : 마스터 조회 실행
         */
        this.fn_Ret = function(hakbeon)
        {
        	this.ds_input.setColumn(0, "HAKBEON", hakbeon);
        	this.ds_input.setColumn(0, "SANGDAM_GYOSU_CD", objApp.gds_userInfoDb.getColumn(0,"USER_ID"));

            var strSvc      = "Ret";
            var strUrl      = "/prj/US/US01/Retrieve_2010101_T10.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "dsMaster=dsMaster";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;             //생략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        /**
         * 기능 : 조회 후 실행
         */
        this.fn_PostRet = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                06. 추가 함수 선언
        ***********************************************************************/
        this.btnNew_onclick = function(obj,e)
        {
        	this.fn_New();
        };

        /**
         * 기능 : 마스터 추가 실행
         */
        this.fn_New = function()
        {
            var nRow = this.dsMaster.addRow();
        	this.dsMaster.setColumn(nRow, "HAKBEON", this.ds_input.getColumn(0, "HAKBEON"))
        	this.dsMaster.setColumn(nRow, "SANGDAM_GYOSU_CD", objApp.gds_userInfoDb.getColumn(0,"USER_ID"))
        	this.dsMaster.setColumn(nRow, "SANGDAM_YYYY",  this.dsBaseYyyyHakgi.getColumn(0, "YYYY"));
        	this.dsMaster.setColumn(nRow, "SANGDAM_HAKGI", this.dsBaseYyyyHakgi.getColumn(0, "HAKGI"));
        	this.dsMaster.setColumn(nRow, "DAEHAK_CD", this.parent.parent.parent.dsMaster.getColumn(this.parent.parent.parent.dsMaster.rowposition, "DAEHAK_CD"));
        	this.dsMaster.setColumn(nRow, "HAKGWA_CD", this.parent.parent.parent.dsMaster.getColumn(this.parent.parent.parent.dsMaster.rowposition, "HAKGWA_CD"));
        	this.dsMaster.setColumn(nRow, "JEONGONG_CD", this.parent.parent.parent.dsMaster.getColumn(this.parent.parent.parent.dsMaster.rowposition, "JEONGONG_CD"));
        	this.dsMaster.setColumn(nRow, "HAKNYEON", this.parent.parent.parent.dsMaster.getColumn(this.parent.parent.parent.dsMaster.rowposition, "HAKNYEON"));
        };

        /**
         * 기능 : 처리 후 실행
         */
        this.fn_PostNew = function()
        {
        	this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                07. 삭제 함수 선언
        ***********************************************************************/
        this.btnDel_onclick = function(obj,e)
        {
        	this.fn_Del();
        };

        /**
         * 기능 : 삭제 버튼 실행
         */
        this.fn_PreDel = function()
        {
            //멀티삭제용도
            if(this.dsMaster.rowcount < 1)
            {
                this.gfn_alert("삭제할 데이터가 없습니다.","삭제정보","","warning");
                return false;
            }
            var result = this.gfn_confirm( "현재선택행을 삭제하시겠습니까?", "삭제정보","","question" );

            if(result == 0)
            {
                return false;
            }

            //개별삭제시
            this.dsMaster.deleteRow(this.dsMaster.rowposition);
            return true;
        };

        /**
         * 기능 : Row 삭제 또는 Transaction 삭제 처리
         */
        this.fn_Del = function()
        {
            if(!this.fn_PreDel())
            {
                return false;
            }

            var strSvc      = "Del";
            var strUrl      = "/prj/US/US01/Delete_2010101_T10.do";
            var strInDs     = "dsMaster=dsMaster:u";
            var strOutDs    = "";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        this.fn_PostDel = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                08. 저장 함수 선언
        ***********************************************************************/
        this.btnSave_onclick = function(obj,e)
        {
        	this.fn_Save();
        };
        /**
         * 기능 : 저장 전 실행
         */
        this.fn_PreSave = function()
        {
            if(!this.gfn_isUpdate(this.dsMaster))
            {
                this.gfn_alert("변경된 이력이 없습니다.","저장정보","","question");
                return false;
            }

        	// 필수 입력사항 체크 =>grid 필수항목체크할거냐:true,일반 컴포넌트에 필수항목을 할거냐false)
            var chkFocusFlg = false;
            var result      = this.gfn_cmmnChkEssentialItem(this.dsMaster, this.lvchkColidDs, this.lvchkColNameDs, "", chkFocusFlg, this);

            if (result[0] != "success")
            {
                this.gfn_alert(result[0],"저장정보","","question");
                this.dsMaster.set_rowposition(result[1]); //데이터셋 변경
                return false;
            }

            var result = this.gfn_confirm( "저장 하시겠습니까?", "저장","", "question" );
            if(result == 0)
            {
                return false;
            }
            return true;
        };

        /**
         * 기능 : 저장 실행
         */
        this.fn_Save = function()
        {
            if(!this.fn_PreSave())
            {
                return false;
            }

            var strSvc      = "Save";
            var strUrl      = "/prj/US/US01/Save_2010101_T10.do";
            var strInDs     = "ds_input=ds_input:a ";
                strInDs    += "dsMaster=dsMaster:u";
            var strOutDs    = "dsMaster=dsMaster";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;             //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };
        /**
         *      기능 : 저장시 후처리
         */
        this.fn_PostSave = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                09. 기타 Control Event
        ***********************************************************************/
        /**
         *      그리드멀티 소트정열
         */
        this.grdMaster_onheaddblclick = function(obj,e)
        {
            if(e.cell != this.grdMaster.getBindCellIndex("body","CHK") && e.cell != 1)
            {
                this.gfn_gridSort(obj,e);
            }
        };

        // 시간 공백 0으로 치환
        this.mdtSangdamFrTm_onkeyup = function(obj,e)
        {
        	if (e.keycode == 13)
        	{
        		var val = obj.value;
        		var str = "";
        		str = val.replace(/ /g, '0');
        		obj.set_value(str);
        	}
        };

        // 시간 공백 0으로 치환
        this.mdtSangdamFrTm_onkillfocus = function(obj,e)
        {
        	var val = obj.value;
        	var str = "";
        	str = val.replace(/ /g, '0');
        	obj.set_value(str);
        };

        // 조회 전 사용자가 변경유무를 체크(공통처리)
        this.fn_beforeRet = function()
        {
            return this.gfn_isUpdate(this.dsMaster);
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onclose",this.form_onclose,this);
            this.addEventHandler("onload",this.form_onload,this);
            this.addEventHandler("onclick",this.form_onclick,this);
            this.grdChucheonseo.addEventHandler("onheaddblclick",this.grdChucheonseo_onheaddblclick,this);
            this.btnDel.addEventHandler("onclick",this.btnDel_onclick,this);
            this.grdMaster.addEventHandler("onheaddblclick",this.grdMaster_onheaddblclick,this);
            this.mdtSangdamFrTm.addEventHandler("onkeyup",this.mdtSangdamFrTm_onkeyup,this);
            this.mdtSangdamFrTm.addEventHandler("onkillfocus",this.mdtSangdamFrTm_onkillfocus,this);
            this.mdtSangdamToTm.addEventHandler("onkeyup",this.mdtSangdamFrTm_onkeyup,this);
            this.mdtSangdamToTm.addEventHandler("onkillfocus",this.mdtSangdamFrTm_onkillfocus,this);
            this.btnRet.addEventHandler("onclick",this.btnRet_onclick,this);
            this.btnNew.addEventHandler("onclick",this.btnNew_onclick,this);
            this.btnSave.addEventHandler("onclick",this.btnSave_onclick,this);
            this.dsMaster.addEventHandler("onrowposchanged",this.dsMaster_onrowposchanged,this);
        };
        this.loadIncludeScript("US01_2010101_T10.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
